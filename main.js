//畫布設定
var bgImg=document.createElement("img");
var enemyImg=document.createElement("img");
var towerbtn=document.createElement("btn");
bgImg.src="images/map3.png";
enemyImg.src="images/jason.gif"
towerbtn.src="images/map3.png";
var canvas=document.getElementById("game-canvas");
var ctx=canvas.getContext("2d");

//set敵人
var enemy={
x:96,
y:448
}
function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y)

}
setInterval(draw,16);




ctx.drawImage(towerbtn,560,432,400,50);
