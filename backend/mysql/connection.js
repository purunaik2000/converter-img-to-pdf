var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'img2pdf'
});
 
connection.connect(err=>{
  if(err) console.log(err.message);
});
 
module.exports = connection;
// connection.end();