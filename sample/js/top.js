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
  context.drawImage(video, 0, 0);
  context.drawImage(imgAry[0], 0, 0, canvas.width, canvas.width*aspectAry[0]);
  requestAnimationFrame(draw);
}





		canvasStart();
		function canvasStart(){
			//MouseEvent[mouseDown]
			canvas.addEventListener("mousedown", function(e){
				oldX = e.offsetX;
				oldY = e.offsetY-txy;
				canvas_mouse_event=true;
			},false);
			canvas.addEventListener("touchstart", function(e){
				e.preventDefault();
				oldX = e.changedTouches[0].pageX-offset.left;
				oldY = e.changedTouches[0].pageY-offset.top;
				canvas_mouse_event=true;
			},false);
			
			//MouseEvent[mouseMove]
			//canvas.addEventListener('mousemove', onMouseMove);
    		canvas.addEventListener('touchmove', onTouchMove);
			
			canvas.addEventListener("mousemove", function (e){
				if(canvas_mouse_event==true){
					var px = e.offsetX;
					var py =e.offsetY-txy;
					context.strokeStyle = color;
					context.lineWidth = bold_line;
					context.beginPath();
					context.lineJoin= "round";
                    context.lineCap = "round";
					context.moveTo(oldX, oldY);
					context.lineTo(px, py);
					context.closePath();
					context.stroke();
					oldX = px;
					oldY = py;
				}
			});
			
			function onMouseMove(e) {
    			e.changedTouches = [{pageX: e.offsetX+offset.left, pageY: e.offsetY+offset.top}];
				onTouchMove(e);
			}
			
			function onTouchMove(e) {
				if(canvas_mouse_event==true){
					var px = e.changedTouches[0].pageX-offset.left;
					var py = e.changedTouches[0].pageY-offset.top;
					context.strokeStyle = color;
					context.lineWidth = bold_line;
					context.beginPath();
					context.lineJoin= "round";
                    context.lineCap = "round";
					context.moveTo(oldX, oldY);
					context.lineTo(px, py);
					context.closePath();
					context.stroke();
					oldX = px;
					oldY = py;
				}
			}
			
			//MouseEvent[mouseUp]
			canvas.addEventListener("mouseup", function(e){
				canvas_mouse_event=false;
			}, false);
			canvas.addEventListener("touchend", function(e){
				canvas_mouse_event=false;
			}, false);
			
			//MouseEvent[mouseout]
			canvas.addEventListener("mouseout", function(e){
				canvas_mouse_event=false;
			}, false);
			
			$("#color_area a").click(function(){
				colorSwitch($(this).attr("id"));
			});
			
			$("#bold_line").change(function(){
				lineSwitch(this);
			});
			
			$("#clear_btn").click(function(e){
				canClear();
				e.preventDefault();
				return false;
			});
			
			//キャンパスクリア
			function canClear(){
				if(confirm("キャンパスに描いたデータを消去しますか？")){
					context.beginPath();
					context.clearRect(0, 0, canvas.width, canvas.height);
					//context.drawImage(image, 0, 0);
				}
			}
		}