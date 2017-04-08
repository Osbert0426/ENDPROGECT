//畫布設定
var bgImg=document.createElement("img");
var enemyImg=document.createElement("img");
bgImg.src="images/map.png";
var canvas=document.getElementById("game-canvas");
var ctx=canvas.getContext("2d");

//set敵人
var enemy={
x:96,
y:448


}

function draw(){
ctx.drawImage(bgImg,0,0);
}

setTimeout(draw,1000);



