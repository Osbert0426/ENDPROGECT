//畫布設定
var bgImg=document.createElement("img");
var enemyImg=document.createElement("img");
var towerbtn=document.createElement("img");
var drytower=document.createElement("img");

bgImg.src="images/map3.png";
enemyImg.src="images/jason.gif"
towerbtn.src="images/tower-btn.png";
drytower.src="images/tower.png";

var canvas=document.getElementById("game-canvas");
var ctx=canvas.getContext("2d");
var isBuilding = false;


//set敵人
var enemy={
x:96,
y:448
};

var cursor={
x:0,
y:0
}

var tower={
 
}

$("#game-canvas").on("mousemove",function(event){
cursor.x=event.offsetX
cursor.y=event.offsetY
})
$("#game-canvas").on("click",function(event){
if(isCollided(cursor.x,cursor.y,560,432,100,100)){
isBuilding=true;   }
else if(isBuilding&&!isCollided(cursor.x,cursor.y,560,432,100,100)){
tower.x=cursor.x-cusor.x%32;
tower.y=cursor.y-cusor.x%32;
}else
{isBuilding=faise;
     }
})

function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y)
ctx.drawImage(towerbtn,560,432,100,100);
 if(isBuilding){
 ctx.drawImage(drytower,cursor.x,cursor.y)
}
ctx.drawImage(drytower,tower.x,tower.y)
}
setInterval(draw,16);


function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}


