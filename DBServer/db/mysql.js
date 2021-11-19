const mysql = require("mysql");

const db = mysql.createPool({
  user: process.env.MYSQLUSER,
  host: process.env.MYSQLHOST,
  password: process.env.MYSQLPASS,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

module.exports = db;
