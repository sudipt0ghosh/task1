module.exports = (sequelize, Datatypes) => {
  const subject = sequelize.define("subject", {
    subjectName: Datatypes.STRING,
  });
  subject.associate = function (models) {
    //
  };
  return subject;
};
