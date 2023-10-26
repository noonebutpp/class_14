var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var PLAY = 1; 
var END = 0;
var gamestate = PLAY;
var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");

  cloudImg = loadImage("cloud.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");

  
 
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(100,180,40,20);
  ground.addImage("ground",groundImage);
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  //create obstacle and cloud group
  obstaclegroup = new Group();
  cloudgroup = new Group();

}

function draw() {
  //set background color
  background("white");
  text("score="+score,500,100);
  console.log(trex.y)
  
  if(gamestate===PLAY){
    ground.velocityX=-4;

    score = score+Math.round(frameCount/60);

    if (ground.x < 0){
       ground.x = ground.width/2;
     }

  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  spawnClouds();
  spawnobstacles();

  if(obstaclegroup.isTouching(trex)){
    gamestate = END;
  }
}  

else if(gamestate===END){
  ground.velocityX=0;
  cloudgroup.setVelocityXEach(0);
  obstaclegroup.setVelocityXEach(0);
  trex.velocityX = 0;
}
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 if(frameCount%60===0){
  cloud=createSprite(600,30,30,10)
  cloud.velocityX=-3;
  cloud.addImage("cloud",cloudImg);
  cloud.scale=0.5;
  cloud.y=Math.round(random(10,70));
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=200;
  cloudgroup.add(cloud);
 }
  
}

function spawnobstacles(){
  if(frameCount%150===0){
    obstacles=createSprite(600,160,50,30);
    obstacles.velocityX=-6;
    obstacles.scale=0.5;
    var randomnumber = Math.round(random(1,6))
    switch(randomnumber){
      case 1: obstacles.addImage("obstacle",obstacle1Img);
      break;
      case 2: obstacles.addImage("obstacle",obstacle2Img);
      break;
      case 3: obstacles.addImage("obstacle",obstacle3Img);
      break;
      case 4: obstacles.addImage("obstacle",obstacle4Img);
      break;
      case 5: obstacles.addImage("obstacle",obstacle5Img);
      break;
      case 6: obstacles.addImage("obstacle",obstacle6Img);
      break;

    }
    obstacles.lifetime=300;
    obstaclegroup.add(obstacles);
  }
}



