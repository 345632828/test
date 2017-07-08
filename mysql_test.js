var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'c3216726',
  port: 3306 ,
  database : 'test'
  });

connection.connect();

//$sql = 'CREATE DATABASE my_db';
$sql = 'USE test';

connection.query($sql,function(err){
 if (err) throw err;
        console.log('USE test');
});


$sql = `INSERT INTO pets (id,name,gender,birth,createdAt,updatedAt,version) VALUES 
(2,2,3,4,5,6,7)`;

connection.query($sql,function(err){
 if (err) throw err;
        console.log('USE INSERT');
});

 
connection.end();




