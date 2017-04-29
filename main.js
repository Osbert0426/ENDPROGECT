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
var FPS=60

//set敵人
var enemy={
x:32,
y:448,
 speedx:0,
 speedy:-64,
 pathDes:0,
 move:function(){
 if(isCollided(EnemyPath[this.pathDes].x,EnemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS)){
  this.x=EnemyPath[this.pathDes].x;
  this.y=EnemyPath[this.pathDes].y;
  this.pathDes=this.pathDes+1;
  
  if(EnemyPath[this.pathDes].x>this.x){
  this.speedx=64;
  this.speedy=0;
   }
   if(EnemyPath[this.pathDes].x<this.x){
  this.speedx=-64;
  this.speedy=0;  
   }
   if(EnemyPath[this.pathDes].y>this.y){
  this.speedx=0;
  this.speedy=64;  
   }
   if(EnemyPath[this.pathDes].y<this.y){
  this.speedx=0;
  this.speedy=-64;  
   }
  
}
  else{
this.x=this.x+this.speedx/FPS;
this.y=this.y+this.speedy/FPS;
  }
 }
};

var EnemyPath=[
 {x:32,y:32},
 {x:384,y:32},
 {x:384,y:160},
 {x:128,y:160},
 {x:128,y:352},
 {x:512,y:192},
 {x:512,y:128},
]

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
tower.x=cursor.x-cursor.x%32;
tower.y=cursor.y-cursor.y%32;
}else
{isBuilding=false;
     }
})

function draw(){
 enemy.move()
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y)
ctx.drawImage(towerbtn,560,432,100,100);
 if(isBuilding){
 ctx.drawImage(drytower,cursor.x,cursor.y)
}
ctx.drawImage(drytower,tower.x,tower.y)
}
setInterval(draw,16);
setInterval(draw,1000/FPS);

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

