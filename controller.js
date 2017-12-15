const CRUD = require('./CRUD');
const Sequelize = require('sequelize');
const DB_config = require('./config');
const sequelize = new Sequelize(DB_config);

const controllers = {
  type: new CRUD('type'),
  rubric: new CRUD('rubric'),
  publisher: new CRUD('publisher'),
  category: new CRUD('category'),
  country: new CRUD('country'),
  author: {
    getMain: function () {
      return sequelize
        .query('select author.author_id, author.author_fullname from author;');
    },
    getAll: function () {
      return sequelize
        .query('select author.author_id, author.author_fullname, country.country_name, author.author_country_id from author join country on author.author_country_id = country.country_id;');
    },
    add: function (param) {
      return sequelize
        .query('insert into author(author_fullname, author_country_id) values(:fullname, :country)', {
          replacements: {
            fullname: param[0],
            country: param[1]
          }
        });
    },
    update: function (param) {
      return sequelize
        .query('update author set author.author_fullname = :name, author.author_country_id = :country_id where author.author_id = :author_id', {
          replacements: {
            author_id: param[0],
            name: param[1],
            country_id: param[2]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from author where author.author_id = :id', {
          replacements: {
            id: param
          }
        });
    }
  },
  library: {
    getAll: function () {
      return sequelize
        .query('select * from library;');
    },
    add: function (param) {
      return sequelize
        .query('insert into library(library_name, library_address, library_schedule, library_image) values(:name, :address, :schedule, :image)', {
          replacements: {
            name: param[0],
            address: param[1],
            schedule: param[2],
            image: param[3]
          }
        });
    },
    update: function (param) {
      return sequelize
        .query('update library set library_name = :name, library_address = :address, library_schedule = :schedule where library.library_id = :id', {
          replacements: {
            id: param[0],
            name: param[1],
            address: param[2],
            schedule: param[3]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from library where library.library_id = :id', {
          replacements: {
            id: param
          }
        });
    }
  },
  book: {
    getMain: function () {
      return sequelize
        .query('select book_id, book_name from book');
    },
    getByID: function (param) {
      return sequelize
        .query('select * from book where book_id = :id', {
          id: param[0]
        });
    },
    getAll: function () {
      return sequelize
        .query('select book_id, book_name, book_year, book_image, t.*, p.*, c.* from book b join type t on t.type_id = b.book_type_id join publisher p on p.publisher_id = b.book_publisher_id join category c on c.category_id = b.book_category_id')
    },
    getRubrics: function () {
      return sequelize
        .query('select b.book_id, group_concat(r.rubric_name) as rubrics from book b join book_rubric br on b.book_id = br.book_id join rubric r on r.rubric_id = br.rubric_id group by b.book_name;');
    },
    getLibraries: function () {
      return sequelize
        .query('select b.book_id, group_concat(l.library_name) as libraries from book b join book_library bl on b.book_id = bl.book_id join library l on l.library_id = bl.library_id group by b.book_name;');
    },
    getAuthors: function () {
      return sequelize
        .query('select b.book_id, group_concat(a.author_fullname) as author from book b join book_author ba on b.book_id = ba.book_id join author a on a.author_id = ba.author_id group by b.book_name;');
    },
    getAllMany: function () {
      return sequelize
        .query('select b.*, group_concat(r.rubric_name) as rubrics, group_concat(a.author_fullname) as author, group_concat(l.library_name) as library from book b join book_rubric br on b.book_id = br.book_id join rubric r on r.rubric_id = br.rubric_id join book_author ba on b.book_id = ba.book_id join author a on a.author_id = ba.author_id join book_library bl on b.book_id = bl.book_id join library l on l.library_id = bl.library_id group by b.book_name;');
    },
    add: function (param) {
      return sequelize
        .query('insert into book(book_name, book_year, book_type_id, book_publisher_id, book_category_id, book_image)' +
                      ' values(:book_name, :book_year, :book_type_id, :book_publisher_id, :book_category_id, :book_image)', {
          replacements: {
            book_name: param[0],
            book_year: param[1],
            book_type_id: param[2],
            book_publisher_id: param[3],
            book_category_id: param[4],
            book_image: param[5]
          }
        });
    },
    update: function (param) {
      return sequelize
        .query('update book b set b.book_name = :book_name, b.book_year = :book_year, b.book_type_id = :book_type_id, b.book_publisher_id = :book_publisher_id, b.book_category_id = :book_category_id, b.book_image = :book_image where b.book_id = :book_id', {
          replacements: {
            book_id: param[0],
            book_name: param[1],
            book_year: param[2],
            book_type_id: param[3],
            book_publisher_id: param[4],
            book_category_id: param[5],
            book_image: param[6]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from book where book.book_id = :id', {
          replacements: {
            id: param
          }
        });
    }
  },
  book_author: {
    getAll: function () {
      return sequelize
        .query('select ba.*, b.book_name, a.author_fullname from book_author ba join book b on b.book_id = ba.book_id join author a on a.author_id = ba.author_id;');
    },
    add: function (param) {
      return sequelize
        .query('insert into book_author(book_id, author_id) values(:book_id, :author_id)', {
          replacements: {
            book_id: param[0],
            author_id: param[1]
          }
        });
    },
    update: function (param) {
      return sequelize
        .query('update book_author set book_id = :new_book_id, author_id = :new_author_id where book_id = :book_id and author_id = :author_id', {
          replacements: {
            new_book_id: param[0],
            new_author_id: param[1],
            book_id: param[2],
            author_id: param[3]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from book_author where book_id = :book_id and author_id = :author_id', {
          replacements: {
            book_id: param[0],
            author_id: param[1]
          }
        });
    }
  },
  book_rubric: {
    getAll: function () {
      return sequelize
        .query('select br.*, b.book_name, r.rubric_name from book_rubric br join book b on b.book_id = br.book_id join rubric r on r.rubric_id = br.rubric_id;');
    },
    add: function (param) {
      return sequelize
        .query('insert into book_rubric(book_id, rubric_id) values(:book_id, :rubric_id)', {
          replacements: {
            book_id: param[0],
            rubric_id: param[1]
          }
        });
    },
    update: function (param) {
      return sequelize
        .query('update book_rubric set book_id = :new_book_id, rubric_id = :new_rubric_id where book_id = :book_id and rubric_id = :rubric_id', {
          replacements: {
            new_book_id: param[0],
            new_rubric_id: param[1],
            book_id: param[2],
            rubric_id: param[3]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from book_rubric where book_id = :book_id and rubric_id = :rubric_id', {
          replacements: {
            book_id: param[0],
            rubric_id: param[1]
          }
        });
    }
  },
  book_library: {
    getAll: function () {
      return sequelize
        .query('select bl.*, b.book_name, l.library_name from book_library bl join book b on b.book_id = bl.book_id join library l on l.library_id = bl.library_id;');
    },
    add: function (param) {
      return sequelize
        .query('insert into book_library(book_id, library_id) values(:book_id, :library_id)', {
          replacements: {
            book_id: param[0],
            library_id: param[1]
          }
      });
    },
    update: function (param) {
      return sequelize
        .query('update book_library set book_id = :new_book_id, library_id = :new_library_id where book_id = :book_id and library_id = :library_id', {
          replacements: {
            new_book_id: param[0],
            new_library_id: param[1],
            book_id: param[2],
            library_id: param[3]
          }
        });
    },
    delete: function (param) {
      return sequelize
        .query('delete from book_library where book_id = :book_id and library_id = :library_id', {
          replacements: {
            book_id: param[0],
            library_id: param[1]
          }
        });
    }
  },
  admin: {
    get: function (param) {
      return sequelize
        .query('select exists(select admin_id from admin where admin_name = :name and admin_password = :password) as exist;', {
          replacements: {
            name: param[0],
            password: param[1]
          }
        });
    }
  }
};

module.exports = controllers;
