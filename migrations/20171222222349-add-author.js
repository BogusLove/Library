'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('author', {
    id: { type: 'int', primaryKey: true },
    author_fullname: 'string',
    country: 'int'
  });
};

exports.down = function(db) {
  return db.dropTable('author');
};

exports._meta = {
  "version": 1
};
