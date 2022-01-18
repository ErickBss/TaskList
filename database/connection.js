const mysql = require('mysql');

function createConnection(){
   return mysql.createConnection(
      {
          host: 'localhost',
          user: 'root',
          password: '12345678',
          database: 'db_dolist',
          insecureAuth: 'true',
        multipleStatements: 'true'
      }
   );
}

module.exports = function() {
    return createConnection
}