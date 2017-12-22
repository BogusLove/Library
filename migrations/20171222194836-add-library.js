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
  return db.createTable('library', {
    library_id: { type: 'int', primaryKey: true },
    library_name: 'string',
    library_address: 'string',
    library_schedule: 'string',
    library_image: 'string'
  });
};

exports.down = function(db) {
  return db.dropTable('library');
};

exports._meta = {
  "version": 1
};
