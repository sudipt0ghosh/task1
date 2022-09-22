module.exports = (sequelize, Datatypes) => {
  const marks = sequelize.define("marks", {
    marks: Datatypes.INTEGER,
    userId: Datatypes.INTEGER,
    subjectId: Datatypes.INTEGER,
  });
  marks.associate = function (models) {
    marks.belongsTo(models.subject);
    marks.belongsTo(models.user);
  };
  return marks;
};
