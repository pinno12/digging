var mysql=require('mysql');
var connection=mysql.createConnection({
  
  host: "database.car0gcrfpnrp.ap-northeast-2.rds.amazonaws.com",
    user: "pinno12",
    password: "32453245",
    database:'weight'
    


});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 