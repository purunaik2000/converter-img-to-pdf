var mysql      = require('mysql');
// Dev-connection
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'img2pdf'
// });

// Prod-connection
var connection = mysql.createConnection({
  host     : 'img2pdf.cytvbvbmlzrr.ap-south-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'img2pdf123',
  database : 'img2pdf'
});
 
connection.connect(err=>{
  if(err) console.log(err.message);
});
 
module.exports = connection;
// connection.end();