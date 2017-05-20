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
function Enemy(){
this.x=32;
this.y=448;
this.speedx=0;
this.speedy=-64;
this.pathDes=0;
 
this.EnemyHP=2;
 
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
 {x:128,y:320},
 {x:608,y:320},
 {x:608,y:128},
]

var cursor={
x:0,
y:0
}

var tower={
 
 range:128,
 aimingEnemyId:null,
 searchEmeny:function(){
  
  this.readyToShootTime=this.readyToShootTime-1/FPS
  
for(var i=0;i<enemies.length;i++){
var distance=Math.sqrt(
 Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
)
 if(distance<this.range){
  this.aimingEnemyId=i;
   return; 
  if(this.readyToShootTime<=0){
  this.Shoot(i);
   this.readyToShootTime=this.fireRate
  }
 }
   }
  this.aimingEnemyId=null;
  },
 shoot:function(id){
 ctx.beginPath();
 ctx.moveTo(this.x,this.y);
 ctx.lineTo(enemies[id].x,enemies[id].y);
 ctx.strokeStyle="red";
  ctx.lineWidth=3;
 ctx.stroke();
  enemies[id].Enemyhp=enemies[id].Enemyhp-this.damage
 },
 fireRate:1,
 readyToShootTime:1,
 damge:1
 
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

ctx.drawImage(bgImg,0,0);
 if(clock%70==0){
 var newEnemy=new Enemy();
 enemies.push(newEnemy);
 }
    
 for(var i=0;i<enemies.length;i++){
  if(enemies[i].hp<1){
     enemies.splice(i,1);
   
   score=score+25
   money=money+10
   
     }else{
 enemies[i].move();
 ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y)
 }
}
  ctx.fillText("HP:"+HP,20,20)
 
ctx. fillText("money:"+money,100,20)
ctx. fillText("score:"+score,100,20)
 
ctx.drawImage(towerbtn,560,432,100,100);
 if(isBuilding){
 ctx.drawImage(drytower,cursor.x,cursor.y)
}
ctx.drawImage(drytower,tower.x,tower.y)
 
 tower.searchEmeny();
 if(tower.aimingEnemyId!=null){
    var id=tower.aimingEnemyId
    ctx.drawImage(crosshairImage,enemies[id].x,enemies[id].y)
  }
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

