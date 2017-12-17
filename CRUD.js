const Sequelize = require('sequelize');
const DB_config = require('./config');
const sequelize = new Sequelize(DB_config);
function CRUD(table) {
  this.table = table;
  this.table_id = table + '_id';
  this.table_name = table + '_name';
};
CRUD.prototype.getAll = function () {
  return sequelize.query('select * from ' + this.table);
};
CRUD.prototype.add = function (param) {
  return sequelize.query('insert into ' + this.table + '(' + this.table_name+ ') values(:param)', {replacements: {param: param }});
};
CRUD.prototype.update = function (param) {
  return sequelize.query('update ' + this.table + ' set ' + this.table_name + ' = :name where ' + this.table_id + ' = :id', {replacements: {id: param[0], name: param[1]}});
};
CRUD.prototype.delete = function (param) {
  return sequelize.query('delete from ' + this.table + ' where ' + this.table_id +' = :id', {replacements: {id: param}});
};
module.exports = CRUD;
