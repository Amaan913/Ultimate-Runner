var play = 1
var END = 0;
var gameState = "play";
var score;
var wizard , wizard_running ,wizard_collided
var bg, backImg ,background2 , invisibleGround
var jump, jumpImg
var death ,deathImg,play,playImg
var gameOverImg,restartImg
var obstaclesGroup,obstacle1
var jumpSound,deathSound




function preload(){
wizard_running = loadAnimation("run (1).png","run (2).png","run (3).png",
"run (4).png","run (5).png","run (6).png","run (7).png","run (8).png")
wizard_collided = loadImage("die (8).png")
backImg = loadImage("bg.png")

jumpSound = loadSound("jump.mp3")
deathSound = loadSound("death.mp3")
jumpImg = loadAnimation("jump (1).png","jump (2).png",
"jump (3).png","jump (4).png","jump (5).png","jump (6).png","jump (7).png",
"jump (8).png")
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
gameOverImg=loadImage("gameover.jpg")
restartImg=loadImage("restart.png")



}

function setup() {
createCanvas(600,400);
background("black")

bg=createSprite(200,200);
bg.addImage("Background",backImg);
invisibleGround=createSprite(300,334,650,1)
invisibleGround.visible=false



bg.scale=1



obstaclesGroup= new Group()


wizard=createSprite(100,280,12,5)
wizard.addAnimation("Running",wizard_running) ;
wizard.addImage("Collided",wizard_collided) ;
wizard.scale=0.15

gameOver=createSprite(300,140)
gameOver.addImage(gameOverImg)
gameOver.scale=0.5

restart=createSprite(300,260)
restart.addImage(restartImg)
restart.scale=0.1

score=0
wizard.setCollider("rectangle",0,0,700,600);


}



function draw() {
  background(180);

  
  if (gameState==="play"){

    wizard.collide(invisibleGround)
    gameOver.visible= false;
    restart.visible=false;
    

    
    //make background move and infinite 

    bg.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
   
    bg.velocityX = -4;

    if (bg.x < 0){
      bg.x = bg.width/2;
    }

    //spawn obstacles
    spawnObstacles()


    //make person jump

    if((keyDown("space")&& wizard.y >= 220)) {
      wizard.velocityY = -12; 
      jumpSound.play()
       
     } 
     
     wizard.velocityY = wizard.velocityY+0.8

     if(wizard.isTouching(obstaclesGroup)){
      gameState="END"
      deathSound.play()
    
  }
}

  if (gameState === "END") {

    restart.visible= true;
    gameOver.visible= true;
    wizard.changeImage("Collided", wizard_collided)

    bg.velocityX = 0;
    wizard.velocityY = 0
    wizard.velocityX = 0
//set lifetime of the game objects so that they are never destroyed until the game 
//resets
    obstaclesGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }

  }
  
  

   
    
 drawSprites()

 fill(25);
  text("Score: "+ score, 500,390);
}

function spawnObstacles() {
  if (frameCount % 60 === 0){
  var obstacle = createSprite(600,300,10,40);
  obstacle.velocityX = -(6 + score/100);
   
  
   //generate random obstacles
   var rand = Math.round(random(1,4));
   switch(rand) {
     case 1: obstacle.addImage(obstacle1);
             break;
     case 2: obstacle.addImage(obstacle2);
             break;
     case 3: obstacle.addImage(obstacle3);
             break;
     case 4: obstacle.addImage(obstacle4);
             break;
     default: break;
     
   }
   obstacle.scale=0.1
   obstacle.depth=wizard.depth
   wizard.depth=wizard.depth+1
     obstaclesGroup.add(obstacle);
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,1);
    obstacle.lifetime = 600;
  }
    
}


function reset() {
  gameState="play" ;
  gameOver.visible= false;
  restart.visible=false;
  obstaclesGroup.destroyEach()
  score=0

  wizard.changeAnimation("Running",wizard_running)
}

