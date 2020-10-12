var bananaImage, foodGroup;
var obstacleImage, obstableGroup;
var backImage, back_ground;
var score;
var player, monkey;
var i_ground;
var playerI

function preload(){
  backImage = loadImage("jungle.jpg");
  player = loadAnimation("Monkey_01.png",
                         "Monkey_02.png",
                         "Monkey_03.png",
                         "Monkey_04.png",
                         "Monkey_05.png",
                         "Monkey_06.png",
                         "Monkey_07.png",
                         "Monkey_08.png",
                         "Monkey_09.png",
                         "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  foodGroup = new Group();


}



function setup() {
  createCanvas(500, 500);
  
  //create background
  back_ground = createSprite(200, 200, 1, 1);
  back_ground.addImage(backImage)
  back_ground.velocityX = -4;
  back_ground.x = back_ground.width/2;
  
  //create monkey
  monkey = createSprite(80, 400, 1, 1);
  monkey.addAnimation("MonkeyPlayer", player);
  monkey.scale = 0.15;
  
  //create invisible ground
  i_ground = createSprite(250, 420, 500, 10);
  i_ground.visible = false;
  
  //create groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  //create score
  score = 0;


}

function draw() {
  background(220);

  
      //make background move
  if(back_ground.x <0){
  back_ground.x = back_ground.width/2;
  }
  
  //to make monkey jump when space key is pressed
  if(keyDown("space")&&monkey.y>=350){
        
  monkey.velocityY = -15;
  }
      
  //add gravity to monkey
  monkey.velocityY = monkey.velocityY + 1;
  
  
  //spawn bananas
  food();
  
  //spawn obstacles
  obstacles();
  
  //destroy bananas
  if(bananaGroup.isTouching(monkey)){
  
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  //decrease size of monkey
  if(obstacleGroup.isTouching(monkey)){
  
    monkey.scale = monkey.scale - 0.1;
  
    
  }
    
  
  //increase size of monkey
  switch(score){
    case 10: monkey.scale = 0.16;
      break;
    case 20: monkey.scale = 0.17;
      break;
    case 30: monkey.scale = 0.19;
      break;
    case 40: monkey.scale = 0.19;
      break;
    default: break;
  }
    
  //make monkey collide with ground
  monkey.collide(i_ground);
  
  drawSprites();
  
  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 120, 50);
  
  
}

function food(){
  
    if(World.frameCount %80 ===0){
      
      var banana = createSprite(500, 200, 1, 1);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(300, 250));
      banana.velocityX = -4;
      banana.lifetime = 125;
      banana.scale = 0.05;
      bananaGroup.add(banana);
      
    }
}

function obstacles(){
  
    if(World.frameCount %300 === 0){
      
      var obstacle = createSprite(500, 390, 150, 150);
      //obstacle.debug = true;
      obstacle.setCollider("circle", 0, 0, obstacle.width);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -4;
      obstacle.lifetime = 125;
      obstacle.scale = 0.15;
      obstacleGroup.add(obstacle);
    }
}