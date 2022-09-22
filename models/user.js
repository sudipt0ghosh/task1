module.exports = (sequelize, Datatypes) => {
  const user = sequelize.define("user", {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
  });
  user.associate = function (models) {
    user.hasMany(models.marks);
  };
  return user;
};
