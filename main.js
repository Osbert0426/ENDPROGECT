//畫布設定
var bgImg=document.createElement("img");
var enemyImg=document.createElement("img");
var towerbtn=document.createElement("img");
var drytower=document.createElement("img");
var crosshairImage=document.createElement("img");

crosshairImage.src="images/crosshair.png";
bgImg.src="images/map3.png";
enemyImg.src="images/jason.gif"
towerbtn.src="images/tower-btn.png";
drytower.src="images/tower.png";

var canvas=document.getElementById("game-canvas");
var ctx=canvas.getContext("2d");
var isBuilding = false;
var FPS=60;
var clock = 0;
var HP=100;
var score=0;
var money=25;

ctx.fillstyle="white";
ctx.font="24px Arial";

//set敵人
var enemies=[];
var Towers=[];
function Enemy(){
this.x=32;
this.y=448;
this.speedx=0;
this.speedy=-64;
this.pathDes=0;
 
this.EnemyHP=20;
 
this.move=function(){
 if(isCollided(EnemyPath[this.pathDes].x,EnemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS)){
 if(this.pathDes===EnemyPath.length-1){
 this.EnemyHP=0;
 HP=HP-10;
 }
this.x=EnemyPath[this.pathDes].x;
this.y=EnemyPath[this.pathDes].y;
this.pathDes=this.pathDes+1;
  
if(EnemyPath[this.pathDes].x>this.x){
this.speedx=64;
this.speedy=0;s
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
{x:128,y:320},
{x:608,y:320},
{x:608,y:128},
]

var cursor={
x:0,
y:0
}

var Tower(x,y){
this.x=x;
this.y=y;
this.range=128;
this.aimingEnemyId=null;
this.this.searchEmeny:function(){
  
this.readyToShootTime=this.readyToShootTime-1/FPS
  
for(var i=0;i<enemies.length;i++){
var distance=Math.sqrt(
Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
)
if(distance<this.range){
this.aimingEnemyId=i;
if(this.readyToShootTime<=0){
this.shoot(i);
this.readyToShootTime=this.fireRate
return; 
}
}
}
this.aimingEnemyId=null;
};
this.shoot:function(id){
ctx.beginPath();
ctx.moveTo(this.x,this.y);
ctx.lineTo(enemies[id].x,enemies[id].y);
ctx.strokeStyle="red";
ctx.lineWidth=3;
ctx.stroke();
enemies[id].EnemyHp=enemies[id].EnemyHp-this.damage
console.log(enemies[id].EnemyHp)
};
this.fireRate=1;
this.readyToShootTime=1;
this.damage=10
 
}

var towers=[];

$("#game-canvas").on("mousemove",function(event){
cursor.x=event.offsetX
cursor.y=event.offsetY
})
$("#game-canvas").on("click",function(event){
if(isCollided(cursor.x,cursor.y,560,432,100,100)&&money>20){
isBuilding=true;  
}
else if(isBuilding&&!isCollided(cursor.x,cursor.y,560,432,100,100)){
money=money-20
var newTower=newTower(cursor.x-cursor.x%32,cursor.y-cursor.y%32);
towers.push(newTower)
isBuilding=false

}else
{isBuilding=false;
     }
})

function draw(){

ctx.drawImage(bgImg,0,0);
if(clock%70==0){
var newEnemy=new Enemy();
enemies.push(newEnemy);
}
    
for(var i=0;i<enemies.length;i++){
if(enemies[i].EnemyHp<1){
enemies.splice(i,1);
   
score=score+25
money=money+10
   
}else{
enemies[i].move();
ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y)
}
}
ctx.fillText("HP:"+HP,20,20)
 
ctx. fillText("money:"+money,180,20)
ctx. fillText("score:"+score,350,20)
 
ctx.drawImage(towerbtn,560,432,100,100);
if(isBuilding){
ctx.drawImage(drytower,cursor.x,cursor.y)
}
for(var i=0;i<towers.leogth;i++){
ctx.drawImage(drytower,towers[i].x,towers[i].y)
 
towers[i].searchEmeny();
if(towers[i].aimingEnemyId!=null){
var id=towers[i].aimingEnemyId
ctx.drawImage(crosshairImage,enemies[id].x,enemies[id].y)
}}
clock++;
}
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

