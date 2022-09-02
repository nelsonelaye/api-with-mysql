require("dotenv").config();
const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "firstapidatabase",
});

mysqlConnection.connect((err)=>{
    if(err){
        return console.log(err.message)
    }

    return console.log("connected to database")
})

module.exports = mysqlConnection;
