"use strict"
process.env.NODE_ENV = 'test';
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const crud = require("../CRUD");
const table = "table1";
const testCRUD = new crud(table);

chai.use(chaiAsPromised);

describe("8", function() {
  it("should return Promise type", function() {
    expect(testCRUD.getAll().then).to.be.a("function");
  });
});

describe("10", function() {
  it("should return equal string", function() {
    expect(testCRUD.add("qwerty").then).to.be.a("function");
  });
});

describe("11", function() {
  it("should return equal string", function() {
    expect(testCRUD.update(["1", "reqwrcr"]).then).to.be.a("function");
  });
});

describe("12", function() {
  it("should return equal string", function() {
    expect(testCRUD.delete("1").then).to.be.a("function");
  });
});
