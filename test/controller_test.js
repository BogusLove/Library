var expect = require('expect.js');


describe('Object equal', function() {
  it('should return object', function() {
    const contr = require('../routes/index');
    expect(contr).to.not.be.empty();
  });
});

describe('Controller', function() {
  describe('Object equal', function() {
    it('should return object', function() {
      const contr = require('../controller');
      expect(contr).to.be.an('object');
    });
  });
});

describe('Controller', function() {
  describe('CRUD_classes', function() {
    it('should return a similar parent', function() {
      const contr = require('../controller');
      expect(contr.type.__proto__).to.be(contr.category.__proto__);
      expect(contr.type.__proto__).to.be(contr.rubric.__proto__);
      expect(contr.type.__proto__).to.be(contr.publisher.__proto__);
      expect(contr.type.__proto__).to.be(contr.country.__proto__);
    });
  });
});

describe('Controller', function() {
  describe('Author methods', function() {
    it('should return an equal methods', function() {
      const author = require('../controller').author;
      const func = ['getMain', 'getAll', 'add', 'update', 'delete'];
      expect(Object.keys(author).join('')).to.be(func.join(''));
    });
  });
});

describe('Controller', function() {
  describe('Library methods', function() {
    it('should return an equal methods', function() {
      const library = require('../controller').library;
      const func = ['getAll', 'getByName', 'add', 'update', 'delete'];
      expect(Object.keys(library).join('')).to.be(func.join(''));
    });
  });
});

describe('Controller', function() {
  describe('Book sample methods', function() {
    it('should return an equal methods', function() {
      const book = require('../controller').book;
      const func = ['getAll', 'getByID', 'getRubrics', 'getAllMany', 'delete'];
      func.forEach(item => expect(Object.keys(book)).to.contain(item));
    });
  });
});

describe('Controller', function() {
  describe('Book_* methods', function() {
    it('should return an equal methods', function() {
      const contr = require('../controller');
      const func = ['getAll', 'add', 'update', 'delete'];
      func.forEach(item => {
        expect(contr['book_author']).to.have.property(item);
        expect(contr['book_rubric']).to.have.property(item);
        expect(contr['book_library']).to.have.property(item);
      });
    });
  });
});

describe('Controller', function() {
  describe('Admin methods', function() {
    it('should return an equal methods', function() {
      const admin = require('../controller').admin;
      expect(admin).to.have.property('get');
    });
  });
});
