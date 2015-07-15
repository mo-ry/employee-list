//ブラウザごとに異なる接頭辞を吸収
navigator.getUserMedia = navigator.getUserMedia       ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia    ||
                         navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

//カメラを起動
function useCamera() {
  navigator.getUserMedia(
    {video: true},
    function(localMediaStream) {
      // varないとグローバル
      myVideo  = document.getElementById('myVideo'); //videoタグを取得
      src = window.URL.createObjectURL(localMediaStream);
      myVideo.src = src; //URLを指定
      myVideo.play();
    },
    function(err) {
      alert('カメラから映像を取得することができませんでした。');  
      // ?　三項演算子、長いと使わないほうがいい。orで代用できる
      console.log(err.name ? err.name : err);
    }
  );
}
//スクリーンショットを撮る
var canvas;
function takePicture(){
  // nameスペースを切る
  // useCameraに読み込むものはすべていれる、ここではいれない
    myVideo  = document.getElementById('myVideo'); //videoタグを取得
    myCanvas = document.getElementById('myCanvas'); //canvasタグを取得
    canvas = myCanvas;
    myCanvas.getContext("2d").drawImage(myVideo, 0, 0, 320, 240);
    // filename = "gazo.png"; //保存するファイルの名前を指定
    // download(filename); //ファイルを保存
    URL = canvas.toDataURL(); //canvasに描かれたもののURLを取得
    document.getElementById('photo').value = URL;
}

//撮った画像を保存。社員表では使わなくていいか
function download(filename) {
    URL = canvas.toDataURL(); //canvasに描かれたもののURLを取得
    a = document.createElement('a');
    e = document.createEvent('MouseEvent');

    //a要素のdownload属性にファイル名を設定
    a.download = filename;
    a.href = URL;

    //clickイベントを着火
    e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    
    document.getElementById('photo').value = URL;
}

function stopCamera(){
    navigator.getUserMedia(
    {video: true},
    function(localMediaStream) {
      myVideo  = document.getElementById('myVideo'); //videoタグを取得
      src = window.URL.createObjectURL(localMediaStream);
      myVideo.src = src; //URLを指定
      myVideo.stop();
    },
    function(err) {
      alert('カメラから映像を取得することができませんでした。');  
      console.log(err.name ? err.name : err);
    }
  );
}

function clearCanvas(){
  canvas.clearRect(0,0,canvas.width, canvas.height);
}

// domを読み込むのはここで
// scriptを下に書けば、contentLoadedの外にだしていい
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('ButtonforRec').addEventListener('click', useCamera, false); //clickで発生するイベントも、DOMContentLoadedの中に書かないといけないと思う
    document.getElementById('ButtonforShot').addEventListener('click', takePicture, false);
    document.getElementById('ButtonforStop').addEventListener('click', stopCamera, false);
    document.getElementById('ButtonforClear').addEventListener('click', clearCanvas, false);
});
