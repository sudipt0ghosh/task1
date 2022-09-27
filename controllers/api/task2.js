const models = require("./../../models");

// get listing data orderby user name and pagination
exports.list = async function (req, res) {
  let index = req.query.index;
  let perPageData = req.query.perPage;
  let name = req.query.name;
  let page = index ? index : 1;
  let condition = name ? { name: { $like: `%${name}%` } } : null;
  models.user
    .count({
      where: condition,
    })
    .then(function (dataCount) {
      let perPage = perPageData ? parseInt(perPageData) : dataCount;
      models.user
        .findAll({
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
          // order: [["name", "ASC"]],
          offset: (page - 1) * perPage,
          limit: perPage,
        })
        .then(function (resData) {
          let totalPage = () => {
            let quotient = dataCount / perPage;
            let remainder = dataCount % perPage;
            if (remainder > 0) {
              return Math.floor(quotient) + 1;
            } else {
              return Math.floor(quotient);
            }
          };
          res.status(200).json({
            message: "USER Listing",
            data: resData,
            perpage: perPage,
            pageno: parseInt(page),
            totalPages: totalPage(),
            totalDataCount: dataCount,
          });
        });
    });
};
