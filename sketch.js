var cat,catRunningImg;
var rat,ratRunningImg;
var ground;
var eatingImg;
var rod,iron_rod,rod_group;
var cheese,cheese_group;
var mud,mud_group,mudImg;
var gameState = 'play';
var score = 0;
var restart,restartImg
var brick,brickImg,brick_group

function preload(){

  catRunningImg = loadAnimation('cat_first.png','cat_last.png');
  ratRunningImg = loadAnimation('rat_first.png','rat_last.png');
  eatingImg = loadImage('cat_eating_mouse.png');
  cheeseImg = loadImage('cheese.png');
  iron_rod = loadImage('iron_nail.png')
  mudImg = loadImage('mud.png')
  restartImg = loadImage('restart.png')
  brickImg = loadImage('bricks.png')
}

function setup(){

  createCanvas(800,400)

  ground = createSprite(405,355,810,100);
  ground.shapeColor = rgb(186, 87, 20);

  rat = createSprite(280,280,20,20)
  rat.addAnimation('rat_running',ratRunningImg)
  rat.scale = 0.3

  cat = createSprite(70,260,20,20)
  cat.addAnimation('cat_running',catRunningImg)
 

  TheEnd = createSprite(280,200)  
  TheEnd.addImage('end',eatingImg)
  TheEnd.scale = 1.1;
  TheEnd.visible = false;

  restart = createSprite(530,248)
  restart.addImage('restart',restartImg)
  restart.visible = false;
  restart.scale = 0.7

  rod_group = new Group();
  mud_group = new Group();
  cheese_group = new Group();
  brick_group = new Group();

}

function draw(){

  background(0)
    
  fill('orange');
  rect(0,0,810,410);

  fill('black');
  rect(0,300,800,40);

if (gameState==='play'){

  if (keyDown('space')&&rat.collide(ground)){
    rat.velocityY = -12.5;
  }

  ifTouch();

  textSize(20)
  text('Score = '+score,50,50);

  rat.velocityY = rat.velocityY + 0.8;
  cat.velocityY = cat.velocityY + 1;

  brick_group.collide(ground)

  createRod();
  createMud();
  createCheese();
  createBricks();

}

if (gameState==='end'){
  
  rod_group.destroyEach();
  cheese_group.destroyEach();
  mud_group.destroyEach();

  cat.visible = false;
  rat.visible = false;
  
  fill('cyan')
  cat.velocityY = 0
  rat.velocityY = 0
  rect(150,50,500,800)
  TheEnd.visible = true;

  fill('red')
  textSize(30)
  text('Game Over !!',330,85)
  line(150,95,650,95)
  line(400,95,400,350)
  fill('red')
  textSize(18)
  text('Score = '+score,480,137)
  text("Click this button to restart",440,211)
  text("Try Again",470,174)
  restart.visible = true;
  fill('black');
  rect(0,300,800,40);   
  
  if (mousePressedOver(restart)){
    reset();
  }
  
}

  rat.collide(ground)
  cat.collide(ground)

  drawSprites();
}

function createRod(){

  if (frameCount%150===0){

    rod = createSprite(900,290)
    rod.velocityX = -10
    rod.addImage('rod',iron_rod)
    rod.scale = 0.10
    rod.lifetime = 250
    rod_group.add(rod);

  }
}

function createMud(){

  if (frameCount%300===0){

    mud = createSprite(900,300)
    mud.velocityX = -10
    mud.addImage('mud',mudImg)
    mud.lifetime = 250
    mud_group.add(mud);
    mud.scale = 0.09;

  }

}


function createCheese(){

  if (frameCount%127===0){

    cheese = createSprite(900,290)
    cheese.velocityX = -7
    cheese.addImage('cheese',cheeseImg)
    cheese.lifetime = 250
    cheese_group.add(cheese);
    cheese.scale = 0.09;

  }

}

function createBricks(){

  if (frameCount%550===0){

    brick = createSprite(770,0)
    brick.velocityX = -8
    brick.addImage('brick',brickImg)
    brick.lifetime = 250
    brick_group.add(brick);
    brick.scale = 0.12;
    brick.velocityY = 23
    brick_group.add(brick)
    

  }

}


function ifTouch(){

  if (rat.isTouching(rod_group)||rat.isTouching(mud_group)||rat.collide(brick_group)){
    gameState = 'end';
  }

  if (cat.isTouching(rod_group)||cat.isTouching(mud_group)||cat.isTouching(cheese_group)||cat.isTouching(brick_group)){
    cat.velocityY = -16;
  }

  if (rat.isTouching(cheese_group)){
    cheese.destroy();
    score+=10;
  }  

}

function reset(){

  cat.visible = true
  rat.visible = true
  restart.visible = false
  TheEnd.visible = false
  rod_group.destroyEach();
  cheese_group.destroyEach();
  mud_group.destroyEach();
  brick_group.destroyEach();
  score = 0
  rat.x = 280
  cat.x = 70
  rat.y = 280
  cat.y = 260
  gameState = 'play'

}
