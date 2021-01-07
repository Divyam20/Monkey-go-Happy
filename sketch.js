var monkey , monkey_running
var banana ,bananaImage, boulder, boulderImage , background1,background1Image;
var bananaGroup, boulderGroup
var score,ground,music;

function preload(){
  
  
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",)
  
  bananaImage = loadImage("banana.png");
  boulderImage = loadImage("stone.png");
  
  background1Image = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400,400);  
  
  bananaGroup = createGroup();
  boulderGroup = createGroup();
  
  monkey = createSprite(50,260);
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(230,290,400,10);
  background1 = createSprite(300,200);
  background1.addImage('ground',background1Image);
  background1.depth = background1.depth - 10;
  background1.velocityX = -3;
   ground.visible = false;
}


function draw() {
 
  banana();
  boulder();
 
  score = Math.ceil(frameCount/35);
  
  if(background1.x < 0){
    background1.x = background1.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    monkey.scale = monkey.scale+0.01;
  } 
  if(boulderGroup.isTouching(monkey)){
    boulderGroup.destroyEach();
    monkey.scale = monkey.scale - 0.02
  }
  monkey.collide(ground)
  drawSprites();
  textSize(22);
  text('Survival Time: '+score,200,30);
  if(monkey.scale > 0.17){
    bananaGroup.visible = false;
    boulderGroup.visible = false;
    monkey.visible = false;
    ground.visible = false;
    textSize(25);
    text('YOU WIN!!!',100,200); 
  }
}


function banana(){
  
  if (frameCount % 80 === 0) {
    
    var banana = createSprite(400,Math.round(random(120,200)));
    banana.addImage('bananaImage',bananaImage);
    banana.velocityX = -5;
    bananaGroup.add(banana);
    banana.scale = 0.08;
    banana.lifetime = 100;
  }
}

function boulder(){
  if (frameCount % 300 === 0) {
    
    var boulder = createSprite(350,260)
    boulder.addImage('boulder',boulderImage);
    boulder.scale = 0.2
    boulder.velocityX = -5;
    boulder.lifetime = 100;
    boulderGroup.add(boulder);
  }
}