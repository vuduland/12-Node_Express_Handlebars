const db = require('../config/orm');

const burger = {
  all: function (cb) {
    db.all('burger_db', function (res) {
      cb(res);
    });
  },
  create: function (name, cb) {
    db.create('burger_db', ['burger_name', 'devoured'], [name, false], cb);
  },
  update: function (id, cb) {
    var condition = `id = ${id}`;
    db.update(
      'burger_db',
      {
        devoured: true
      },
      condition,
      cb
    );
  }
};

module.exports = burger;
