const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      context    = canvas.getContext("2d");


var fileAry = ['img/test.png'];

var numFiles = fileAry.length;
var loadedCounter = 0;
var imgAry = [];
var aspectAry = [];



loadImgs();



function loadImgs(){

    var img = new Image();

    img.addEventListener('load', function(){
    	var imgAspect =  img.height / img.width;
        loadedCounter++;
        imgAry.push(img);
        aspectAry.push(imgAspect);
        if(numFiles == loadedCounter){
            requestAnimationFrame(draw);
        } else {
            loadImgs();
        }
    }, false);

    img.src = fileAry[imgAry.length];
}


navigator.getUserMedia(medias, successCallback, errorCallback);

// requestAnimationFrame(draw);

function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};

function draw() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // context.drawImage(video, 0, 0);
  context.drawImage(imgAry[0], 0, 0, canvas.width, canvas.width*aspectAry[0]);
  requestAnimationFrame(draw);
}