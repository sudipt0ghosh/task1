const models = require("./../../models");

//add user table data
exports.addUserData = async function (req, res) {
  let info = {
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const user = await models.user.create(info);
    res.status(200).send(user);
    console.log(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured",
    });
  }
};

//add subject table data
exports.addSubjectData = async function (req, res) {
  let info = {
    subjectName: req.body.subjectName,
  };
  try {
    const subj = await models.subject.create(info);
    res.status(200).send(subj);
    console.log(subj);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured",
    });
  }
};

//add marks table data
exports.addMarksData = async function (req, res) {
  let info = {
    marks: req.body.marks,
    userId: req.body.userId,
    subjectId: req.body.subjectId,
  };
  try {
    const marks = await models.marks.create(info);
    res.status(200).send(marks);
    console.log(marks);
  } catch (err) {
    res.status(500).send({
      message: err.message || "error occured",
    });
  }
};

