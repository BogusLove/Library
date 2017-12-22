const controller = require("./controller");
const fs = require("fs");
module.exports = {
  execute: function(res, table, command, params) {
    controller[table][command](params)
      .then(() => res.redirect("/" + table +"_editor"))
      .catch((err) => res.render("error", {message: err.message, error: err}));
  },
  promise: function(book_id, items, table) {
    let promises = [];
    if (typeof(items) != "string") {
      items.forEach(item => {
        promises.push(controller[table].add([book_id, item]));
      });
    } else {
      promises.push(controller[table].add([book_id, items]));
    }
    return promises;
  },
  uploadImage: function(req, name) {
    let path = "";
    const base = "./public/images/";
    const images = "/images/";
    if (req.files.image) {
      let new_image = req.files.image;
      const fileName = name;
      path = base + fileName;
      if (fs.existsSync(path)) fs.unlinkSync(path);
      return new Promise((resolve, reject) => {
        new_image.mv(base + fileName, (err) => {
          if (err) reject(err);
          else resolve(images + fileName);
        });
      });
    } else return new Promise((resolve) => {
        resolve(images + "noImage.jpeg");
    });
  }
};
