"use strict"
const express = require("express");
const router = express.Router();
const controller = require("../controller");
const DB_config = require("../config");
const Sequelize = require("sequelize");
const expressHbs = require("express-handlebars");
const fs = require("fs");
const app = require("../app");
const execute = require('../methods').execute;
const promise = require('../methods').promise;
const uploadImage = require('../methods').uploadImage;
////////////////////MAIN///////////////////////////
router.get("/", (req, res, next) =>  {
  res.render("index", {admin: req.session.user ? true : false});
});
router.post("/sign_in", (req, res, next) => {
  controller.admin
    .get([req.body.admin, req.body.password])
    .then(result => {
      req.session.user = result[0][0];
      res.redirect("/");
    })
    .catch((err) => res.send("error", {message: err.message, error: err}));
});
router.post("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) res.render("error", {message: err.message, error: err});
    else res.redirect("/");
  });
});
router.post("/search", (req, res, next) => {
  const table = req.body.table;
  const query = req.body.query;
  if (table && table === "library" || table === "book"){
    if (query){
      controller[table]
        .getByName(query)
        .then(result => {
          if (table === "book"){
            res.redirect("/update_form/" + result[0][0]["book_id"]);
          }
          if (table === "library") {
            console.log(result[0][0]);
            res.render("tables/update_library_form", {
              items: result[0],
              table: "library",
              admin: req.session.user ? true : false
            });
          }
        })
        .catch((err) => res.render("error", {message: err.message, error: err}));
    } else {
      res.redirect("/" + table + "_editor");
    }
  } else {
    res.redirect("/");
  }
});
/////////////////TABLE TYPE////////////////////////
router.get("/type_editor", (req, res, next) => {
  controller.type
    .getAll()
    .then((result) => res.render("tables/type_editor", {
      items: result[0],
      table: "type",
      admin: req.session.user ? true : false
    }))
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
router.post("/add_type", (req, res, next) => {
  req.body.name !== "" ? execute(res, "type", "add", [req.body.name]) : res.redirect("tables/type_editor");
});
router.post("/update_type/:id", (req, res, next) => {
  execute(res, "type", "update", [req.params.id, req.body.name_to_update]);
});
router.post("/delete_type/:id", (req, res, next) => {
  execute(res, "type", "delete", [req.params.id]);
});
//////////////////TABLE RUBRIC///////////////////////////
router.get("/rubric_editor", (req, res, next) => {
  controller.rubric
    .getAll()
    .then((result) => res.render("tables/rubric_editor", {
      items: result[0],
      table: "rubric",
      admin: req.session.user ? true : false
    }))
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
router.post("/add_rubric", (req, res, next) => {
  req.body.name !== "" ? execute(res, "rubric", "add", [req.body.name]) : res.redirect("tables/rubric_editor");
});
router.post("/update_rubric/:id", (req, res, next) => {
  execute(res, "rubric", "update", [req.params.id, req.body.name_to_update]);
});
router.post("/delete_rubric/:id", (req, res, next) => {
  execute(res, "rubric", "delete", [req.params.id]);
});
////////////////////TABLE PUBLISHER////////////////////////////
/* istanbul ignore next */
router.get("/publisher_editor", (req, res, next) => {
  controller.publisher
    .getAll()
    .then((result) => res.render("tables/publisher_editor", {
      items: result[0],
      table: "publisher",
      admin: req.session.user ? true : false
    }))
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
router.post("/add_publisher", (req, res, next) => {
  req.body.name !== "" ? execute(res, "publisher", "add", [req.body.name]) : res.redirect("tables/publisher_editor");
});
router.post("/update_publisher/:id", (req, res, next) => {
  execute(res, "publisher", "update", [req.params.id, req.body.name_to_update]);
});
router.post("/delete_publisher/:id", (req, res, next) => {
  execute(res, "publisher", "delete", [req.params.id]);
});
/////////////////////TABLE CATEGORY//////////////////////////
/* istanbul ignore next */
router.get("/category_editor", (req, res, next) => {
  controller.category
    .getAll()
    .then((result) => res.render("tables/category_editor", {
      items: result[0],
      table: "category",
      admin: req.session.user ? true : false
    }))
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
router.post("/add_category", (req, res, next) => {
  req.body.name !== "" ? execute(res, "category", "add", [req.body.name]) : res.redirect("tables/category_editor");
});
router.post("/update_category/:id", (req, res, next) => {
  execute(res, "category", "update", [req.params.id, req.body.name_to_update]);
});
router.post("/delete_category/:id", (req, res, next) => {
  execute(res, "category", "delete", [req.params.id]);
});
////////////////////TABLE COUNTRY////////////////////////////
/* istanbul ignore next */
router.get("/country_editor", (req, res, next) => {
  controller.country
    .getAll()
    .then((result) => res.render("tables/country_editor", {
      items: result[0],
      table: "country",
      admin: req.session.user ? true : false
    }))
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
router.post("/add_country", (req, res, next) => {
  req.body.name !== "" ? execute(res, "country", "add", [req.body.name]) : res.redirect("tables/country_editor");
});
router.post("/update_country/:id", (req, res, next) => {
  execute(res, "country", "update", [req.params.id, req.body.name_to_update]);
});
router.post("/delete_country/:id", (req, res, next) => {
  execute(res, "country", "delete", [req.params.id]);
});
//////////////////AUTHOR TABLE////////////////////////
/* istanbul ignore next */
router.get("/author_editor", (req, res, next) =>  {
  Promise.all([
    controller.author.getAll(),
    controller.country.getAll()
  ]).then(result => {
      let authors = result[0][0];
      let countries = result[1][0];
      authors.map(item => {
        item["countries"] = countries;
      });
      res.render("tables/author_editor", {
        author: authors,
        countries: countries,
        table: "author",
        admin: req.session.user ? true : false,
        helpers: {
          list: function (items) {
            var out = "";
            for(var i = 0, l = items.length; i<l; i++) {
              out = out + '<option type="text" readonly value="' + items[i]['country_id'] + '">' + items[i]['country_name'] + '</option>';
            }
            return out;
          }
        }
      })
    })
    .catch(err => res.render("error", {message: err.message, error: err}));
});
router.post("/add_author", (req, res, next) =>  {
    execute(res, "author", "add", [req.body.name, req.body.country]);
});
router.post("/update_author/:id", (req, res, next) =>  {
  execute(res, "author", "update", [req.params.id, req.body.fullname_to_update, req.body.country_to_update]);
});
router.post("/delete_author/:id", (req, res, next) =>  {
  execute(res, "author", "delete", [req.params.id]);
});
//////////////////LIBRARY TABLE///////////////////
/* istanbul ignore next */
router.get("/library_editor", (req, res, next) =>  {
  controller.library
    .getAll()
    .then((result) => {
      let chunk = [];
      const size = 2;
      for(let i = 0; i < result[0].length; i+=size){
        chunk.push(result[0].slice(i, i + size));
      };
      res.render("tables/library_editor", {
        items: chunk,
        table: "library",
        admin: req.session.user ? true : false
      });
    })
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
/* istanbul ignore next */
router.post("/add_library", (req, res, next) =>  {
  uploadImage(req, req.body.name)
    .then(result => {
      execute(res, "library", "add", [req.body.name, req.body.address, req.body.schedule, result]);
    });
});
/* istanbul ignore next */
router.post("/update_library/:id", (req, res, next) =>  {
  execute(res, "library", "update", [
    req.params.id,
    req.body.name_to_update,
    req.body.address_to_update,
    req.body.schedule_to_update
  ]);
});
router.post("/delete_library/:id", (req, res, next) =>  {
  execute(res, "library", "delete", [req.params.id]);
});
//////////////////BOOK TABLE////////////////////
/* istanbul ignore next */
router.get("/book_editor", (req, res, next) => {
  Promise.all([
    controller.type.getAll(),
    controller.rubric.getAll(),
    controller.publisher.getAll(),
    controller.category.getAll(),
    controller.country.getAll(),
    controller.author.getAll(),
    controller.library.getAll(),
    controller.book.getAll(),
    controller.book.getAuthors(),
    controller.book.getRubrics(),
    controller.book.getLibraries()
  ]).then(result => {
    let books = result[7][0];
    let authors = result[8][0];
    let rubrics = result[9][0];
    let libraries = result[10][0];
    books.map((book) => {
      authors.forEach((author) => {
        book["book_id"] === author["book_id"] ? book["author_fullname"] = author["author"].split(",") : 0;
      });
      rubrics.forEach((rubric) => {
        book["book_id"] === rubric["book_id"] ? book["rubrics"] = rubric["rubrics"].split(",") : 0;
      });
      libraries.forEach((library) => {
        book["book_id"] === library["book_id"] ? book["libraries"] = library["libraries"].split(",") : 0;
      });
    });
    let chunk = [];
    const size = 4;
    for(let i = 0; i < result[7][0].length; i+=size){
      chunk.push(result[7][0].slice(i, i + size));
    };
    res.render("tables/book_editor", {
      table: "book",
      type: result[0][0],
      rubric: result[1][0],
      publisher: result[2][0],
      category: result[3][0],
      country: result[4][0],
      author: result[5][0],
      library: result[6][0],
      book: chunk,
      admin: req.session.user ? true : false
    });
  })
  .catch(err => res.render("error", {message: err.message, error: err}))
});
/* istanbul ignore next */
router.post("/add_book", (req, res, next) => {
  uploadImage(req, req.body.name)
    .then(img =>
      controller.book.add([
          req.body.name,
          req.body.year,
          req.body.type,
          req.body.publisher,
          req.body.category,
          img
        ])
    )
    .then(result => {
      const id = result[0];
      return Promise.all([
          promise(id, req.body.library, "book_library"),
          promise(id, req.body.author, "book_author"),
          promise(id, req.body.rubric, "book_rubric")
      ])
    })
    .then(result => res.redirect("/book_editor"))
    .catch(err => res.render("error", {message: err.message, error: err}));
});
/* istanbul ignore next */
router.post("/update_book/:id", (req, res, next) => {
  if (!req.files.image) {
    controller.book.update([
      req.params.id,
      req.body.name_to_update,
      req.body.year_to_update,
      req.body.type_to_update,
      req.body.publisher_to_update,
      req.body.category_to_update,
      req.body.current_image
    ]).then(result => res.redirect("/update_form/" + req.params.id));
  } else {
    uploadImage(req, req.body.name_to_update)
      .then(img => {
        controller.book.update([
          req.params.id,
          req.body.name_to_update,
          req.body.year_to_update,
          req.body.type_to_update,
          req.body.publisher_to_update,
          req.body.category_to_update,
          req.body.current_image
        ]).then(result => res.redirect("/update_form/" + req.params.id));
      })
      .catch(err => res.render("error", {message: err.message, error: err}));
  }
});
router.post("/delete_book/:id", (req, res, next) => {
  execute(res, "book", "delete", [req.params.id]);
});
/* istanbul ignore next */
router.get("/update_form/:id", (req, res, next) => {
  Promise.all([
    controller.type.getAll(),
    controller.rubric.getAll(),
    controller.publisher.getAll(),
    controller.category.getAll(),
    controller.country.getAll(),
    controller.author.getAll(),
    controller.library.getAll(),
    controller.book.getAll(),
    controller.book.getAuthors(),
    controller.book.getRubrics(),
    controller.book.getLibraries()
  ]).then(result => {
    let books = result[7][0];
    let authors = result[8][0];
    let rubrics = result[9][0];
    let libraries = result[10][0];
    books.map((book) => {
      authors.forEach((author) => {
        book["book_id"] == author["book_id"] ? book["author_fullname"] = author["author"].split(",") : 0;
      });
      rubrics.forEach((rubric) => {
        book["book_id"] == rubric["book_id"] ? book["rubrics"] = rubric["rubrics"].split(",") : 0;
      });
      libraries.forEach((library) => {
        book["book_id"] == library["book_id"] ? book["libraries"] = library["libraries"].split(",") : 0;
      });
    });
    res.render("tables/update_book_form", {
      table: "book",
      type: result[0][0],
      rubric: result[1][0],
      publisher: result[2][0],
      category: result[3][0],
      country: result[4][0],
      author: result[5][0],
      library: result[6][0],
      admin: req.session.user ? true : false,
      book: books.find(function(item){return item["book_id"] == req.params.id ? item : 0}),
      helpers: {
        list: function (items, url, id) {
          var out = "";
          for(var i = 0, l = items.length; i<l; i++) {
            out = out + '<div class="input-group"><a href="'+ url + id + '" class="list-group-item list-group-item-action">' + items[i] + '</a></div>';
          }
          return out;
        },
        userList: function (items) {
          var out = "";
          for(var i = 0, l = items.length; i<l; i++) {
            out = out + '<li class="list-group-item">'+ items[i] +'</li>';
          }
          return out;
        }
      }
    });
  })
});
/////////////////BOOK_AUTHOR TABLE/////////////////////
/* istanbul ignore next */
router.get("/book_author_editor/:id", (req, res, next) => {
  Promise.all([
    controller.book_author.getAll(),
    controller.author.getMain()
  ]).then((result) => {
      let books = result[0][0]
        .filter(function(item){
          return item["book_id"] == req.params.id ? item : 0
        });
      books.map((book) => book["authors"] = result[1][0]);
      res.render("tables/book_author_editor", {
        table: "book_author",
        book: books[0],
        items: books,
        author: result[1][0],
        admin: req.session.user ? true : false,
        helpers: {
          list: function (items) {
            var out = "";
            for(var i = 0, l = items.length; i<l; i++) {
              out = out + '<option value="' + items[i]['author_id'] + '">' + items[i]['author_fullname'] + '</option>';
            };
            return out;
          }
        }
      });
    })
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
/* istanbul ignore next */
router.post("/add_book_author", (req, res, next) => {
  controller.book_author
    .add([
      req.body.book_id,
      req.body.author_to_add
    ]);
  res.redirect("/book_author_editor/" + req.body.book_id)
});
/* istanbul ignore next */
router.post("/update_book_author/:book_id/:author_id", (req, res, next) => {
  controller.book_author
    .update([
      req.body.book_to_update,
      req.body.author_to_update,
      req.params.book_id,
      req.params.author_id
  ]);
  res.redirect("/book_author_editor/" + req.params.book_id);
});
/* istanbul ignore next */
router.post("/delete_book_author/:book_id/:author_id", (req, res, next) => {
  controller.book_author
    .delete([
      req.params.book_id,
      req.params.author_id
    ]);
  res.redirect("/book_author_editor/" + req.params.book_id);
});
/////////////////////BOOK_LIBRARY TABLE/////////////////////
/* istanbul ignore next */
router.get("/book_library_editor/:id", (req, res, next) => {
  Promise.all([
    controller.book_library.getAll(),
    controller.library.getAll()
  ]).then((result) => {
      let books = result[0][0]
        .filter(function(item){
          return item["book_id"] == req.params.id ? item : 0
        });
      books.map((book) => book["libraries"] = result[1][0]);
      res.render("tables/book_library_editor", {
        table: "book_library",
        items: books,
        book: books[0],
        library: result[1][0],
        admin: req.session.user ? true : false,
        helpers: {
          list: function (items) {
            var out = "";
            for(var i = 0, l = items.length; i<l; i++) {
              out = out + '<option value="' + items[i]['library_id'] + '">' + items[i]['library_name'] + '</option>';
            };
            return out;
          }
        }
      });
    })
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
/* istanbul ignore next */
router.post("/add_book_library", (req, res, next) => {
  controller.book_library
    .add([
      req.body.book_id,
      req.body.library_to_add
    ]);
  res.redirect("/book_library_editor/" + req.body.book_id)
});
/* istanbul ignore next */
router.post("/update_book_library/:book_id/:library_id", (req, res, next) => {
  controller.book_library
    .update([
      req.body.book_to_update,
      req.body.library_to_update,
      req.params.book_id,
      req.params.library_id
  ]);
  res.redirect("/book_library_editor/" + req.params.book_id);
});
/* istanbul ignore next */
router.post("/delete_book_library/:book_id/:library_id", (req, res, next) => {
  controller.book_library
    .delete([
      req.params.book_id,
      req.params.library_id
    ]);
  res.redirect("/book_library_editor/" + req.params.book_id);
});
////////////////BOOK_RUBRIC TABLE//////////////////////////
/* istanbul ignore next */
router.get("/book_rubric_editor/:id", (req, res, next) => {
  Promise.all([
    controller.book_rubric.getAll(),
    controller.rubric.getAll()
  ]).then((result) => {
      let books = result[0][0]
        .filter(function(item){
          return item["book_id"] == req.params.id ? item : 0
        });
      books.map((book) => book["rubrics"] = result[1][0]);
      res.render("tables/book_rubric_editor", {
        table: "book_rubric",
        items: books,
        book: books[0],
        rubric: result[1][0],
        admin: req.session.user ? true : false,
        helpers: {
          list: function (items) {
            var out = "";
            for(var i = 0, l = items.length; i<l; i++) {
              out = out + '<option value="' + items[i]['rubric_id'] + '">' + items[i]['rubric_name'] + '</option>';
            };
            return out;
          }
        }
      });
    })
    .catch((err) => res.render("error", {message: err.message, error: err}));
});
/* istanbul ignore next */
router.post("/add_book_rubric", (req, res, next) => {
  controller.book_rubric
    .add([
      req.body.book_id,
      req.body.rubric_to_add
    ]);
  res.redirect("/book_rubric_editor/" + req.body.book_id);
});
/* istanbul ignore next */
router.post("/update_rubric_author/:book_id/:rubric_id", (req, res, next) => {
  controller.book_rubric
    .update([
      req.body.book_to_update,
      req.body.rubric_to_update,
      req.params.book_id,
      req.params.rubric_id
  ]);
  res.redirect("/book_rubric_editor/" + req.params.book_id);
});
/* istanbul ignore next */
router.post("/delete_book_rubric/:book_id/:rubric_id", (req, res, next) => {
  controller.book_rubric
    .delete([
      req.params.book_id,
      req.params.rubric_id
    ]);
  res.redirect("/book_rubric_editor/" + req.params.book_id);
});

module.exports = router;
