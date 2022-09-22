module.exports = (sequelize, Datatypes) => {
  const reg_log = sequelize.define("reg_log", {
    username: Datatypes.STRING,
    password: Datatypes.STRING,
  });

  reg_log.associate = function (models) {
    //
  };
  return reg_log;
};
