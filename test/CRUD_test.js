'use strict'
var expect = require('expect.js');

describe('CRUD', function() {
  describe('Object equal', function() {
    it('should return equal string', function() {
      const crud = require('../CRUD');
      let testCRUD = new crud('test');
      expect(testCRUD.table_id).to.be('test_id');
      expect(testCRUD.table_name).to.be('test_name');
    });
  });
});

describe('CRUD', function() {
  describe('Promise equal', function() {
    it('should return Promise type', function() {
      const crud = require('../CRUD');
      let testCRUD = new crud('test');
      const func = ['getAll', 'add', 'update', 'delete'];
      expect(testCRUD[func[0]]().then).to.be.a('function');
      expect(testCRUD[func[1]]().then).to.be.a('function');
      expect(testCRUD[func[2]]([]).then).to.be.a('function');
      expect(testCRUD[func[3]]([]).then).to.be.a('function');
    });
  });
});
