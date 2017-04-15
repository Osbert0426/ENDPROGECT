//畫布設定
var bgImg=document.createElement("img");
var enemyImg=document.createElement("img");
var towerbtn=document.createElement("img");
var drytower=document.createElement("img");

bgImg.src="images/map3.png";
enemyImg.src="images/jason.gif"
towerbtn.src="images/tower-btn.png";


var canvas=document.getElementById("game-canvas");
var ctx=canvas.getContext("2d");


//set敵人
var enemy={
x:96,
y:448
};

var cursur={
x:0,
y:0
}

$("#game-canvas").on("mousemove",function(event){
cursur.x=event.offsetX
cursur.y=event.offsetY
})
function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y)
ctx.drawImage(towerbtn,560,432,100,100);
 ctx.drawImage(drytower,cursur.x,cursur.y,)
  
  
}
setInterval(draw,16);





