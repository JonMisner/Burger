const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dinosql4",
  database: "burgers_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;