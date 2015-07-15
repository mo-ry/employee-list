var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost', //接続先ホスト
  user     : 'test',      //ユーザー名
  password : 'test',  //パスワード
  database : 'shain'    //DB名
});

//node_modules/mysql/Readme.mdから
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

exports.AddData = function(n, b, a, st, t, se, p, y, pho, user){
  connection.query(' UPDATE shaininfo SET name = "'+n+'", birth = "' +b+ '", address = "' +a+ '", station = "' +st+ '", teiki = "' +t+ '", section = "' +se+ '", position = "' +p+ '", year = "' +y+ '", photo = "' +pho+ '" where number = "' +user+ '";', function(err, result) {
    if (err)
        console.log(err); // 一行なら{}つけなくてもいい。複数行ならつける
  });
}

exports.ChangeData = function(a, st, t, se, p, user){
  connection.query(' UPDATE shaininfo SET address = "' +a+ '", station = "' +st+ '", teiki = "' +t+ '", section = "' +se+ '", position = "' +p+ '" where number = "' +user+ '";', function(err, result) {
    if (err)
        console.log(err); // 一行なら{}つけなくてもいい。複数行ならつける
  });
}

exports.DeleteData = function(user){
  connection.query(' DELETE from shaininfo where number = "' +user+ '";', function(err, result) {
    if (err)
        console.log(err); // 一行なら{}つけなくてもいい。複数行ならつける
  });
}

exports.GetAll = function(cb){
  connection.query('SELECT * from shaininfo', function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}

/**whereで指定してログインさせる場合**/
exports.GetNumberPassword = function(user, pass, cb){
  connection.query('SELECT number, password from shaininfo where number = "'+user+'" and password = "'+pass+'";', function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}

/**for文でログインさせる場合**/
// exports.GetNumberPassword = function(cb){
//   connection.query('SELECT number, password from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }


exports.GetName = function(user, cb){
  connection.query('SELECT name from shaininfo WHERE number = "'+user+'"', function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}

exports.GetSectionPosition = function(user, cb){
  connection.query('SELECT section, position from shaininfo WHERE number = "'+user+'"', function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}

exports.FindByAll = function(key, cb){
  connection.query('SELECT * from shaininfo WHERE number = "'+key+'" OR name = "'+key+'" OR birth = "'+key+'" OR address = "'+key+'" OR station = "'+key+'" OR teiki = "'+key+'" OR section = "'+key+'" OR position = "'+key+'" OR year = "'+key+'"' , function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}

exports.GetAllNumber = function(cb){
  connection.query('SELECT number from shaininfo', function(err, rows, fields) {
    if (err)
      console.log(err);
    cb(err,rows,fields);
  });
}


// exports.GetAllName = function(user, cb){
//   connection.query('SELECT name from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }

// exports.GetAllBirth = function(user, cb){
//   connection.query('SELECT birth from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }


// exports.GetAllAddress = function(user, cb){
//   connection.query('SELECT address from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }

// exports.GetAllStation = function(user, cb){
//   connection.query('SELECT station from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }


// exports.GetAllTeiki = function(user, cb){
//   connection.query('SELECT teiki from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }

// exports.GetAllSection = function(user, cb){
//   connection.query('SELECT section from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }


// exports.GetAllPosition = function(user, cb){
//   connection.query('SELECT position from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }

// exports.GetAllPhoto = function(user, cb){
//   connection.query('SELECT photo from shaininfo', function(err, rows, fields) {
//     if (err)
//       console.log(err);
//     cb(err,rows,fields);
//   });
// }
