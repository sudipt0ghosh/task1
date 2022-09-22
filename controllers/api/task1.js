const models = require("./../../models");

//get all tables data
exports.alldata = async function (req, res) {
    let data = await models.user.findAll({
      include: [
        {
          model: models.marks,
          require: true,
          include: [
            {
              model: models.subject,
              require: true,
            },
          ],
        },
      ],
    });
    // console.log(data);
    res.send(data);
  };
  
  // get all tables data by user name
  exports.alldataByName = async function (req, res) {
    const name = req.query.name;
    var condition = name ? { name: { $like: `%${name}%` } } : null;
    const data = await models.user.findAll({
      where: condition,
      include: [
        {
          model: models.marks,
          require: true,
          include: [
            {
              model: models.subject,
              require: true,
            },
          ],
        },
      ],
    });
    // console.log(data);
    res.status(200).send(data);
  };
  
  // get pass fail from all tables
  exports.passfail = async function (req, res) {
    const mark = req.query.mark;
    var cond = mark ? mark : 30; 
    // let cond = { $gte: 30 };
    console.log(cond);
    let data = await models.marks.findAll({
      where: {
        marks: {$gte: cond},
      },
      include: [
        {
          model: models.subject,
          require: true,
        },
        {
          model: models.user,
          require: true,
        },
      ],
    });
    // console.log(data);
    res.send(data);
  };
  