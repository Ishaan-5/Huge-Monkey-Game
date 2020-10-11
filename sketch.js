var bananaImage, obstacleImage, backgroundImage, banana, obstacle, backGround, ground;
var player, playerImage;
var obstacleGroup, bananaGroup, score;
var gameState, START, END, deathCounter;
function preload() {
  
   bananaImage = loadImage("banana.png");
   playerImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
   obstacleImage = loadImage("stone.png");
   backgroundImage = loadImage("jungle.jpg");
}
  

function setup() {
  createCanvas(800, 400);
  backGround = createSprite(0, 0, 800, 400);
  backGround.addImage(backgroundImage);
  backGround.scale = 1.5;
  backGround.x = backGround.width/2;
  backGround.velocityX = -7;
  player = createSprite(50, 380, 10, 10);
  player.addAnimation("running", playerImage);
  player.scale = 0.2;
  ground = createSprite(400, 380, 800, 10);
  ground.visible = false;
  obstacleGroup = new Group();
  bananaGroup = new Group();
  score = 0;
  START = 1;
  END = 0;
  gameState = START;
  deathCounter = 0;
  
  
}

function draw() {
  background(220);
  
  
  if(gameState === START) {
    if(backGround.x<100) {
    
    backGround.x = backGround.width/2;
  }
  if(keyDown("space") && player.isTouching(ground)) {
    
    player.velocityY = -40;
  }
  else
    {
      player.collide(ground);
    }
  
  player.velocityY = player.velocityY+0.8;
  

  
  if(bananaGroup.isTouching(player)) {
    score = score+2;
    bananaGroup.destroyEach();
    
  }
  
  switch(score) {
      
    case 10: player.scale=0.4;
      break;
    case 20: player.scale=0.8;
      break;
    case 30: player.scale=1.6;
      break;
    case 40: player.scale=3.2;
      break;
    default: break;
      
  }
  
  if(obstacleGroup.isTouching(player)) {
    
    score = 0;
    player.scale = 0.2;
    deathCounter = deathCounter+1;
    obstacleGroup.destroyEach()
    
  }
    
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  
    
  }
  
  if(deathCounter === 2) {
    
    gameState = END;
  }
  
  if(gameState === END) {
    
    obstacleGroup.setVelocityEach(0);
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    textSize(30);
    text("YOU LOST", 400, 200);
  }
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 500, 50);
  text("DeathCounter: "+deathCounter, 200, 50);
}

function spawnObstacles() {
  
  if(frameCount % 240 === 0) {
    obstacle = createSprite(800, 380, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -4;
    obstacle.lifetime = 210;
    obstacleGroup.add(obstacle);
    
  }

}

function spawnBananas() {
  
  if(frameCount % 90 === 0) {
    
    banana = createSprite(800, Math.round(random(280, 320)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -5;
    banana.lifetime = 165;
    bananaGroup.add(banana);
  }
}