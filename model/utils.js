const mysql = require('mysql2');


// mysql connection

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin@123',
    database : 'userflow',
  });
  
  connection.connect(()=>{
      console.log('DB is connect..')
  })
  
  module.exports = connection;

