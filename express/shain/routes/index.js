// sesstion, loginしてるかどうか

var express = require('express');
var router = express.Router();
var sql = require('../mysql.js');
var u;  //ユーザ名を保存する変数

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.html', { title: 'Express' });
});

router.post('/confirm', function (req, res) {
  u = req.param('user');
  var p = req.param('pass');
  var b = 0;

  // 社員番号とパスワードをDBから取ってきて、入力したものと一致してたら、登録ページに。
  sql.GetNumberPassword(u, p, function(err, rows, field){
    if(rows.length != 0){
      b = 1;
    }
    // エラーの処理も書く

  /**for文でログインさせる場合**/
  // sql.GetNumberPassword(function(err, rows, field){
  // 	for(i=0; i<rows.length; i++){
  // 		if(u==rows[i].number && p == rows[i].password){
  // 			b = 1;
  // 		}
  // 	}
    //ユーザ名とパスワードが一致していれば
  	if(b==1){
      // ユーザの部署と役職をチェック
      // rowの変数名も変える
      sql.GetSectionPosition(u, function(err,row,field){  
        //名前が登録されているかチェックして、名前が登録されていれば変更画面、登録されていなければ登録画面へ
        sql.GetName(u, function(errs,rows,fields){
          // mySQLで返りちをひとつに
          console.log(rows[0].name);
          //名前が登録されていなければ
          if(rows[0].name == null){
            /**nameがnullで、sectionが人事というパターンはありえない**/
            // //人事なら
            // if(row[0].section == '人事'){
            //   res.render('choose_reg.html', { title: 'Express' });    
            // }
            // //人事以外なら
            // else{
              res.render('register.html', { title: 'Express' });    
            // }
          }
          //すでに名前が入力されていたら
          else{
            //人事なら
            // sectionは別テーブルに
            if(row[0].section == '人事'){
              res.render('choose_cha.html', { title: 'Express' });    
            }
            //人事以外なら
            else{
              res.render('change.html', { title: 'Express' });    
            }
          }
        });
      });
  	}
  	else{
        res.render('login.html', { title: 'Express' });
  	}
  });

});

/**このパターンは使わない**/
// router.post('/pre_register', function (req, res) {
//   res.render('register.html', { title: 'Express' });      
// });

router.post('/pre_change', function (req, res) {
  res.render('change.html', { title: 'Express' });      
});

// 表示はget
// 登録はpost
// 更新はput
router.post('/register', function (req, res) {
  // req.bodyがいい
    var n = req.param('name');
    var b = req.param('birth');
    var a = req.param('address');
    var st = req.param('station');
    var t = req.param('teiki');
    var se = req.param('section');
    var p = req.param('position');
    var y = req.param('year');
    var pho = req.param('photo');

// オブジェクトで一気に入れる
    sql.AddData(n,b,a,st,t,se,p,y,pho,u);

    res.render('complete.html', { title: 'Express' });
});


router.post('/change', function (req, res) {
    var a = req.param('address');
    var st = req.param('station');
    var t = req.param('teiki');
    var se = req.param('section');
    var p = req.param('position');

    sql.ChangeData(a,st,t,se,p,u);
    res.render('complete.html', { title: 'Express' });
});

// getでいい
router.post('/search_address', function (req, res) {
  res.render('search_address.html', { datas: 'a', n : 'a'});
});

router.post('/result', function (req, res) {
    var all = req.param('all');
    console.log(all);
    var num = req.param('number');
    console.log(num);
    var n = req.param('name');
    console.log(n);
    var b = req.param('birth');
    console.log(b);
    var a = req.param('address');
    var st = req.param('station');
    var t = req.param('teiki');
    var se = req.param('section');
    var p = req.param('position');
    var y = req.param('year');
    var pho = req.param('photo');
    var k = req.param('keyword');

// =[];
    var Datas = new Array();
    var Num = new Array();
    var N = new Array();
    var B = new Array();
    var A = new Array();
    var St = new Array();
    var T = new Array();
    var Se = new Array();
    var P = new Array();
    var Pho = new Array();
    var Y = new Array();

    //キーワードがある場合
    // null or ""
    // null, から, 0はfalse. if(k)でいい
    if(k != ""){
      sql.FindByAll(k, function(err, rows, fields){
        for(i=0;i<rows.length;i++){
          Datas[i] = rows[i];
        }
        //すべてがチェックされている場合
        if(all != null){
            num = 'number';
            n = 'name';
            b = 'birth';
            a = 'address';
            st = 'station';
            t = 'teiki';
            se = 'section';
            p = 'position';
            y = 'year';
            pho = 'photo';

// rows[i]は変数に
// いらない,Datas[i].number が使える
            for(i=0;i<rows.length;i++){
              Num[i]=rows[i].number;
              N[i]=rows[i].name;
              B[i]=rows[i].birth;
              A[i]=rows[i].address;
              St[i]=rows[i].station;
              T[i]=rows[i].teiki;
              Se[i]=rows[i].section;
              P[i]=rows[i].position;
              Y[i]=rows[i].year;
              Pho[i]=rows[i].photo;
            }
        }
        else{
          //社員番号がチェックされている場合
          // Dataまわすのと、添え字まわすのをわける
          // 配列を扱うファンクションがたくさんある
          if(num != null){
            for(i=0;i<rows.length;i++){
              Num[i]=rows[i].number;
            }
          }

          if(n != null){
            for(i=0;i<rows.length;i++){
              N[i]=rows[i].name;
            }
          }

          if(b != null){
            for(i=0;i<rows.length;i++){
              B[i]=rows[i].birth;
            }
          }

          if(a != null){
            for(i=0;i<rows.length;i++){
              A[i]=rows[i].address;
            }
          }

          if(st != null){
            for(i=0;i<rows.length;i++){
              St[i]=rows[i].station;
            }
          }

          if(t != null){
            for(i=0;i<rows.length;i++){
              T[i]=rows[i].teiki;
            }
          }

          if(se != null){
            for(i=0;i<rows.length;i++){
              Se[i]=rows[i].section;
            }
          }

          if(p != null){
            for(i=0;i<rows.length;i++){
              P[i]=rows[i].position;
            }
          }

          if(y != null){
            for(i=0;i<rows.length;i++){
              Y[i]=rows[i].year;
            }
          }
          if(pho != null){
            for(i=0;i<rows.length;i++){
              Pho[i]=rows[i].photo;
            }
          }
        }
        res.render('Search_address', 
          { number: num,
            name : n,
            birth : b,
            address : a,
            station : st,
            teiki : t,
            section : se,
            position : p,
            year : y,
            photo : pho,
            Datas : rows,
            Number: Num,
            Name : N,
            Birth : B,
            Address : A,
            Station : St,
            Teiki : T,
            Section : Se,
            Position : P,
            Year : Y,
            Photo : Pho
          }
        );
      });
    }
    //キーワードがない場合
    else{
      sql.GetAll(function (err, rows, fields){
        for(i=0;i<rows.length;i++){
          Datas[i] = rows[i];
        }
        //すべてがチェックされている場合
        if(all != null){

            num = 'number';
            n = 'name';
            b = 'birth';
            a = 'address';
            st = 'station';
            t = 'teiki';
            se = 'section';
            p = 'position';
            y = 'year';
            pho = 'photo';

            for(i=0;i<rows.length;i++){
              Num[i]=rows[i].number;
              N[i]=rows[i].name;
              B[i]=rows[i].birth;
              A[i]=rows[i].address;
              St[i]=rows[i].station;
              T[i]=rows[i].teiki;
              Se[i]=rows[i].section;
              P[i]=rows[i].position;
              Y[i]=rows[i].year;
              Pho[i]=rows[i].photo;
            }
        }
        else{
          if(num != null){
            for(i=0;i<rows.length;i++){
              Num[i]=rows[i].number;
            }
          }

          if(n != null){
            for(i=0;i<rows.length;i++){
              N[i]=rows[i].name;
            }
          }

          if(b != null){
            for(i=0;i<rows.length;i++){
              B[i]=rows[i].birth;
            }
          }

          if(a != null){
            for(i=0;i<rows.length;i++){
              A[i]=rows[i].address;
            }
          }

          if(st != null){
            for(i=0;i<rows.length;i++){
              St[i]=rows[i].station;
            }
          }

          if(t != null){
            for(i=0;i<rows.length;i++){
              T[i]=rows[i].teiki;
            }
          }

          if(se != null){
            for(i=0;i<rows.length;i++){
              Se[i]=rows[i].section;
            }
          }

          if(p != null){
            for(i=0;i<rows.length;i++){
              P[i]=rows[i].position;
            }
          }

          if(y != null){
            for(i=0;i<rows.length;i++){
              Y[i]=rows[i].year;
            }
          }
          if(pho != null){
            for(i=0;i<rows.length;i++){
              Pho[i]=rows[i].photo;
            }
          }
        }
        res.render('Search_address', 
          { number: num,
            name : n,
            birth : b,
            address : a,
            station : st,
            teiki : t,
            section : se,
            position : p,
            year : y,
            photo : pho,
            Datas : rows,
            Number: Num,
            Name : N,
            Birth : B,
            Address : A,
            Station : St,
            Teiki : T,
            Section : Se,
            Position : P,
            Year : Y,
            Photo : Pho
          }
        );
      });
    }
});

router.post('/delete', function (req, res) {
  sql.GetAllNumber(function (err, rows, fields){
    var user = {};
    for(i=0;i<rows.length;i++){
      user[i] = req.param(''+rows[i].number+'');
      if(user[i] != null){
        sql.DeleteData(user[i]);
      }
    }
    res.render('search_address.html');
  });
});

module.exports = router;