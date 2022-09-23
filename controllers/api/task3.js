const models = require("./../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("./../../config.json");

exports.register = async function (req, res) {
  req.check("username", "UserName required").not().isEmpty();
  req.check("password", "Password required").not().isEmpty();
  let loginVlErr = req.validationErrors();
  if (loginVlErr) {
    res.status(400).json({
      errors: loginVlErr,
      error: true,
    });
  } else {
    const hashPass = await bcrypt.hash(req.body.password, 10);

    let regData = {
      username: req.body.username,
      password: hashPass,
    };

    try {
      const reg_log = await models.reg_log.create(regData);
      res.status(200).send(reg_log);
    } catch (err) {
      res.status(500).send({
        message: err.message || "error occured",
      });
    }
  }
};

exports.login = async function (req, res) {
  req.check("username", "UserName required").not().isEmpty();
  req.check("password", "Password required").not().isEmpty();
  let loginVlErr = req.validationErrors();
  if (loginVlErr) {
    res.status(400).json({
      errors: loginVlErr,
      error: true,
    });
  } else {
    try {
      let registerd_username = await models.reg_log.findOne({
        where: { username: req.body.username },
      });

      bcrypt.compare(
        req.body.password,
        registerd_username.password,
        function (err, isMatch) {
          if (isMatch) {
            const token = jwt.sign(
              { id: registerd_username.id },
              configs.secretKey
            );

            res.header("auth-token", token).send("login \n" + token);

            console.log("login");
          } else {
            console.log("wrong password");
            res.send("wrong password");
          }
          if (err) {
            res.send(err);
          }
        }
      );
    } catch (err) {
      console.log("user not found...");
      res.send("user not found...");
    }
  }
};

exports.verify = async (req, res) => {
  try {
    let data = await models.reg_log.findOne({
      where: { id: req.data.id },
    });
    console.log(data);
    if (data) {
      res.status(404).send(data);
    } else {
      res.status(200).json({message:"User not found"});
    }
  } catch {
    res.status(404).send("tokens not found");
  }
};
