const models = require("./../../models");

exports.addEmployeeData = async (req, res) => {
  let info = {
    parent_id: req.body.parent_id,
    management_roll: req.body.management_roll,
  };
  try {
    const data = await models.employee.create(info);
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured",
    });
  }
};

exports.managementTree = async (req, res) => {
  const management_roll = req.query.management_roll;
  await models.employee
    .findAll({
      where: { management_roll: management_roll },
    })
    .then((data) => {
      models.employee
        .findAll({
          where: { parent_id: data[0].id },
        })
        .then((data) => {
          res.send(data);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateEmp = async (req, res) => {
  let id = req.query.id;
  let pid = req.query.pid;
  let updt = await models.employee.update(
    { parent_id: pid },
    { where: { id: id } }
  );
  console.log(updt);
  res.send(updt);
};

exports.all = async (req, res) => {
  let all = await models.employee.findAll({});
  console.log(all);
  res.send(all);
};
