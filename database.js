var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'deepak',      
  database: 'user' 
}); 
conn.connect(function(err) {
  if (err){
    console.log(err);
  };
  console.log('Database is connected successfully !');
});
module.exports = conn;