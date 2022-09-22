const express = require("express");
const apiRouter = express.Router();
const authApiRouter = express.Router();
const configs = require("./../config.json");
const models = require("./../models");
const jwt = require("jsonwebtoken");

// route middleware to verify a token
authApiRouter.use(function (req, res, next) {
  try {
  // let authorization = req.header("Authorization");
  // authorization = authorization.split(" ");
  // const token = authorization[1];
  //or
  // let token = req.headers["auth-token"];
  let token = req.headers["auth-token"] || req.headers.authorization.split(" ")[1]
  
  if (!token) return res.status(401).send("Access Denied");
  
    jwt.verify(token, configs.secretKey, function (err, verified) {
      if (err) {
        res.status(400).json({
          error: true,
          errors: [{ message: "Unable to Process Token" }],
        });
      } else {
        models.reg_log
          .findOne({
            where: {
              id: verified.id,
            },
          })
          .then(function (obj) {
            if (obj) {
              req.data = obj;
              // console.log(req.data.id);
              next();
            } else {
              res.status(400).json({
                error: true,
                errors: [{ message: "User invalid" }],
              });
            }
          })
          .catch(function (err) {
            res.status(400).json({
              error: true,
              errors: [{ message: "User invalid" }],
              errorData: err,
            });
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("error..");
  }
});

module.exports = function (app) {
  //app controller
  let data = require("./../controllers/api/appController");

  apiRouter.post("/addUserData", data.addUserData);
  apiRouter.post("/addSubjectData", data.addSubjectData);
  apiRouter.post("/addMarksData", data.addMarksData);
  // ------------------------------------------------------------------------------------------------
  //task1
  let task1 = require("./../controllers/api/task1");

  apiRouter.get("/allData", task1.alldata);
  apiRouter.get("/allDataByName", task1.alldataByName);
  apiRouter.get("/passfail", task1.passfail);

  //task2
  let task2 = require("./../controllers/api/task2");
  apiRouter.get("/list", task2.list);

  //task3
  let task3 = require("./../controllers/api/task3");
  apiRouter.post("/register", task3.register);
  apiRouter.post("/login", task3.login);
  //-------------------Authorised Route---------------------------------
  authApiRouter.get("/verifyUser", task3.verify);

  //task4
  let task4 = require("./../controllers/api/task4");
  apiRouter.post("/add-employee-data", task4.addEmployeeData);
  apiRouter.get("/management-tree", task4.managementTree);
  apiRouter.put("/empUpdate",task4.updateEmp);
  apiRouter.get("/all",task4.all);
  // --------------------------------------------------------------------------------------------------
  app.use("/api", apiRouter);
  app.use("/api", authApiRouter);
};
