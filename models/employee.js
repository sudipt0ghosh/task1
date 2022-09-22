module.exports = (sequelize, Datatypes) => {
  const employee = sequelize.define("employee", {
    parent_id: Datatypes.INTEGER,
    management_roll: Datatypes.STRING,
  });
  employee.associate = function (models) {
    // employee.hasMany(models.employee, {as: 'children', foreignKey: 'parent_id'});
  };
  return employee;
};
