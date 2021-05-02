var bgimage,backgroundimg;
var spy,spyimg;
var slab, slabGroup;
var invisGround,armyGround;
var army1,army2,army3,army4,army5,army6,army7,army8,army9,army10,armyGroup;
var edges;
var score = 0;
var gameOver = "GAME OVER";
var ALIVE = 0;
var DEAD = 1;
var gameState = ALIVE;

function preload(){
  bgimage= loadImage("background.png");
  spyimg = loadImage("spy.png");
}

function setup() {
  createCanvas(700,900);
  backgroundimg = createSprite(350, 450, 800, 900);
  backgroundimg.addImage("background",bgimage);

  spy = createSprite(350,750,40,40);
  spy.addImage("ball",spyimg);
  spy.scale =0.05;

  invisGround = createSprite(350,835,650,20);
  invisGround.shapeColor="black";

  armyGround = createSprite(350,915,800,40);
  armyGround.visible = false;

  army1 = createSprite(110,870,40,40);
  army1.shapeColor = "red";
  army2 = createSprite(170,870,40,40);
  army2.shapeColor= "red";
  army3 = createSprite(230,870,40,40);
  army3.shapeColor= "red";
  army4 = createSprite(290,870,40,40);
  army4.shapeColor= "red";
  army5 = createSprite(350,870,40,40);
  army5.shapeColor= "red";
  army6 = createSprite(410,870,40,40);
  army6.shapeColor= "red";
  army7 = createSprite(470,870,40,40);
  army7.shapeColor= "red";
  army8 = createSprite(530,870,40,40);
  army8.shapeColor= "red";
  army9 = createSprite(590,870,40,40);
  army9.shapeColor= "red";
  army10 = createSprite(50,870,40,40);
  army10.shapeColor= "red";
  army11 = createSprite(650,870,40,40);
  army11.shapeColor= "red";

  //spy.debug=true;
  spy.setCollider("circle",0,0,400);

  slabGroup = createGroup();
  armyGroup = createGroup();

}

function draw() {

background("white");

  army1.collide(armyGround);
  army2.collide(armyGround);
  army3.collide(armyGround);
  army4.collide(armyGround);
  army5.collide(armyGround);
  army6.collide(armyGround);
  army7.collide(armyGround);
  army8.collide(armyGround);
  army9.collide(armyGround);
  army10.collide(armyGround);
  army11.collide(armyGround);

  edges = createEdgeSprites();

if(gameState === ALIVE){
  spy.velocityY = spy.velocityY + 1;
  army1.velocityY = army1.velocityY +1;
  army2.velocityY = army2.velocityY +1;
  army3.velocityY = army3.velocityY +1;
  army4.velocityY = army4.velocityY +1;
  army5.velocityY = army5.velocityY +1;
  army6.velocityY = army6.velocityY +1;
  army7.velocityY = army7.velocityY +1;
  army8.velocityY = army8.velocityY +1;
  army9.velocityY = army9.velocityY +1;
  army10.velocityY = army10.velocityY +1;
  army11.velocityY = army11.velocityY +1;

  armyGroup.add(army1)
  armyGroup.add(army2)
  armyGroup.add(army3)
  armyGroup.add(army4)
  armyGroup.add(army5)
  armyGroup.add(army6)
  armyGroup.add(army7)
  armyGroup.add(army8)
  armyGroup.add(army9)
  armyGroup.add(army10)
  armyGroup.add(army11)

  spawnSlabs();

  if(spy.isTouching(invisGround)){
    spy.velocityY = -20;
  }

  if(spy.isTouching(slabGroup)){
    spy.velocityY = -18;
  }

  if(keyWentDown(LEFT_ARROW)){
    spy.velocityX = -7;
  }

  if(keyWentDown(RIGHT_ARROW)){
    spy.velocityX = 7;
  }
  
  if(keyWentDown(DOWN_ARROW)){
    spy.velocityX = 0;
  }

  if(slabGroup.isTouching(invisGround)){
    invisGround.x = 2000;
  }

  if(invisGround.x === 2000){
    score = score + Math.round(getFrameRate()/60);
    jumpRandomBalls();
  }

  if(frameCount > 210){
  }
   if(armyGroup.isTouching(spy)){
    gameState = DEAD;
  }
}

  else if(gameState === DEAD){
    text("GAME OVER",175,225);
    score = score;
    slabGroup.setVelocityYEach(0);
    slabGroup.setVelocityXEach(0);
    slabGroup.setLifetimeEach(-1);
    armyGroup.setVelocityYEach(0);
    armyGroup.setLifetimeEach(-1);
    spy.velocityY = 0;
    spy.velocityX = 0;

  }

  if(gameState === DEAD && keyWentDown("space")){
    invisGround.x = 350;
    slabGroup.destroyEach();
    score = 0;
    spy.y = 0;
    spy.x = 350;
    gameState = ALIVE;
  }
  //console.log(frameCount);  

  spy.bounceOff(edges[1]);
  spy.bounceOff(edges[2]);
  spy.bounceOff(edges[0]);

  slabGroup.bounceOff(edges[1]);
  slabGroup.bounceOff(edges[0]);
  
  drawSprites();

  textSize(30);
  fill("black");
  text("Score: " + score,450,100)

  textSize(50);
  if(gameState === DEAD){
    text("GAME OVER",235,295);
  }
  textSize(30);
  if(gameState === DEAD){
    text("Press space to restart",240,335);
  }
}

function spawnSlabs(){
  if(frameCount%45 === 0){
    slab = createSprite(Math.round(random(100,600)),100,100,20);
    slab.velocityY = 5;

    var rand = Math.round(random(1,7));

    switch(rand){
      case 1: slab.shapeColor=rgb(153,50,204);
      break;
      case 2: slab.shapeColor=rgb(255,215,0);
              slab.velocityX = Math.round(random(2.5,5));
      break;
      case 3: slab.shapeColor=rgb(139,0,139);
              slab.velocityX = Math.round(random(-2.5,-5));
      break;
      case 4: slab.shapeColor=rgb(34,139,34);
              slab.velocityX = Math.round(random(5,-5));
      break;
      case 5: slab.shapeColor=rgb(128,0,0);
      break;
      case 6: slab.shapeColor=rgb(139,69,19);
      break
      case 7: slab.shapeColor=rgb(75,0,130);
      break
      default: break;
    }

    slab.lifetime = 205;
    slabGroup.add(slab);
    }
  }

  function jumpRandomBalls(){
    if(frameCount > 210){
    if(frameCount%110 === 0){
     var rand2 = Math.round(random(1,11))

     switch(rand2){
       case 1: army1.velocityY = army1.velocityY - Math.round(random(30,40));
       break;
       case 2: army2.velocityY = army2.velocityY - Math.round(random(30,40));
       break;
       case 3: army3.velocityY = army3.velocityY - Math.round(random(30,40));
       break;
       case 4: army4.velocityY = army4.velocityY - Math.round(random(30,40));
       break;
       case 5: army5.velocityY = army5.velocityY - Math.round(random(30,40));
       break;
       case 6: army6.velocityY = army6.velocityY - Math.round(random(30,40));
       break;
       case 7: army7.velocityY = army7.velocityY - Math.round(random(30,40));
       break;
       case 8: army8.velocityY = army8.velocityY - Math.round(random(30,40));
       break;
       case 9: army9.velocityY = army9.velocityY - Math.round(random(30,40));
       break;
       case 10: army10.velocityY = army10.velocityY - Math.round(random(30,40));
       break;
       case 11: army11.velocityY = army11.velocityY - Math.round(random(30,40));
       break;
       default: break;
     }
    }
    }
  }