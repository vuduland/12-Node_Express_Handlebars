const connection = require('./connection');

function printQuestionMarks(num) {
  const arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  const arr = [];

  for (var key in ob) {
    arr.push(`${key} = ${ob[key]}`);
  }

  return arr.toString();
}

const db = {
  all: function(tableInput, cb) {
    const queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table} ${cols.toString()} VALUES ${printQuestionMarks(
      vals.length
    )}`;

    // queryString += ` (${cols.toString()}) VALUES (${printQuestionMarks(
    //   vals.length
    // )})`;
    // queryString += ' (';
    // queryString += cols.toString();
    // queryString += ') ';
    // queryString += 'VALUES (';
    // queryString += printQuestionMarks(vals.length);
    // queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      cb(result);
    });
  },
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table} SET ${objToSql(
      objColVals
    )} WHERE ${condition}`;

    // queryString += ' SET ';
    // queryString += objToSql(objColVals);
    // queryString += ' WHERE ';
    // queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      cb(result);
    });
  }
};

module.exports = db;

// example from online, but makes connection inside it
// class User {
//   static CreateTable() {
//     const sql = `
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY,
//         name TEXT,
//         age INTEGER
//       )
//     `;

//     console.log('Preparing to create the users table...');

//     return new Promise(function(resolve) {
//       db.run(sql, function() {
//         console.log('...users table created!');
//         resolve('Success');
//       });
//     });
//   }
// }
