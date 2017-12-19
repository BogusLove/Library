'use strict'
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const crud = require('../CRUD');
const testCRUD = new crud('test');

chai.use(chaiAsPromised);

describe('getAll', function() {
  it('should return Promise type', function() {
    expect(testCRUD.getAll().then).to.be.a('function');
  });
});

describe('add', function() {
  it('should return equal string', function() {
    expect(testCRUD.add().then).to.be.a('function');
  });
});

describe('update', function() {
  it('should return equal string', function() {
    expect(testCRUD.update([]).then).to.be.a('function');
  });
});

describe('delete', function() {
  it('should return equal string', function() {
    expect(testCRUD.delete().then).to.be.a('function');
  });
});
