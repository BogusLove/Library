'use strict'
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const crud = require('../CRUD');
const table = "table1";
const testCRUD = new crud(table);

// sequelize.query("create database :db; use :db; create table :table(name varchar(20));", {replacements: {db: DB, table: table}})
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

chai.use(chaiAsPromised);

describe('getAll', function() {
  it('should return Promise type', function() {
    expect(testCRUD.getAll().then).to.be.a('function');
  });
});

describe('add', function() {
  it('should return equal string', function() {
    expect(testCRUD.add('qwerty').then).to.be.a('function');
  });
});

describe('update', function() {
  it('should return equal string', function() {
    expect(testCRUD.update(['1', 'reqwrcr']).then).to.be.a('function');
  });
});

describe('delete', function() {
  it('should return equal string', function() {
    expect(testCRUD.delete('1').then).to.be.a('function');
  });
});
