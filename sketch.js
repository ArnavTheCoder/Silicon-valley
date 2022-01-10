var spaceship,spaceship_right,spaceship_left,spaceship_up;
var asteroid;
var backgroundImage;
var laser,laserImage;
var background_2;
var astreoidGroup,laserGroup;
var gamestate = "start"
var score = 0
var health = 3


function preload(){
spaceship_right = loadImage("Images/Spaceship_1.png");
spaceship_left = loadImage("Images/Spaceship_2.png");
spaceship_up = loadImage("Images/Spaceship_3.png")
backgroundImage = loadImage("Images/Background.jpg");
laserImage = loadImage("Images/Laser.jpg");
background_2 = loadImage("Images/Background_start.jpg");
asteroid_img = loadAnimation("Images/Asteroid_1.png","Images/Asteroid_2.png","Images/Asteroid_3.png");
gameOverImage = loadImage("Images/Game_over.jpg");
game_won = loadImage("Images/Game_won.png");
reset_button = loadImage("Images/Reset_Button.jpg");
laser_sound = loadSound("Laser Gun Sound Effect.mp3");
victory_sound = loadSound("Victory sound effect.mp3");
losing_sound = loadSound("Losing sound effect.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
 spaceship = createSprite(300, height-300, 50, 50);
spaceship.addImage("spaceship1",spaceship_up);
spaceship.scale = 1;

astreoidGroup = new Group();
laserGroup = new Group();  
}


function draw() {
if(gamestate === "start"){
  background(background_2);
  textSize(50);
  fill("cyan");
  text("Hello I am Bob!",1550,900);
  textSize(60);
  fill("cyan");
  text("Our Planet Nebula 100-adf is in trouble",800,1900);
  fill("cyan");
  text("We need your help to shoot the asteriods before it hits our planet",2000,1900);
  textSize(50);
  if(keyDown("enter")){
    gamestate = "play"
  }
}
else if (gamestate === "play"){
  background(backgroundImage);
  spawnAsteroids(); 
  drawSprites();
  textSize(70);
  fill("cyan");
  text("Score :" + score,4700,100);
  text("Health :" + health,4700,200)
   if(laserGroup.isTouching(astreoidGroup)){
    astreoidGroup.destroyEach();
    laserGroup.destroyEach();
    score = score+10
    }
    if(spaceship.isTouching(astreoidGroup)){
    health = health-1
    astreoidGroup.destroyEach();
      }
    
    if(keyDown("d")){
      spaceship.x += 20
      spaceship.addImage("spaceship1",spaceship_right);
    }
    
    if(keyDown("a")){
      spaceship.x -= 20
      spaceship.addImage("spaceship1",spaceship_left);
    }
    
    if(keyDown("w")){
      spaceship.y -= 20
      spaceship.addImage("spaceship1",spaceship_up);
    
    }
    if(keyDown("s")){
      spaceship.y += 20
      spaceship.addImage("spaceship1",spaceship_up);
    
    }
    if(keyDown("right")){
      shootLasers();
      laser.addImage("laser",laserImage);
      laser.velocityX = +20
      laser_sound.play();
    }
    if(keyDown("left")){
      shootLasers();
      laser.addImage("laser",laserImage);
      laser.velocityX = -20
      laser_sound.play();
    }


  
  
}

if(health === 0){
  background(gameOverImage);
  astreoidGroup.destroyEach();
  losing_sound.play();
  gamestate = 0

}

if(score === 150){
background(game_won)
astreoidGroup.destroyEach();
victory_sound.play();

}

}

function spawnAsteroids(){
  if(frameCount % 60 === 0){
    asteroid = createSprite(random(width-100,10),random(10,height-100),50,50);
    asteroid.addAnimation("asteroid_img",asteroid_img);
    asteroid.scale = 2
    asteroid.velocityX = -20;
    astreoidGroup.add(asteroid);
  }

  
}

function shootLasers(){
    laser = createSprite(spaceship.x+100,spaceship.y,20,20);
    laser.addImage("laser",laserImage);
    laser.scale = 0.3
    laser.depth = spaceship.depth;
    spaceship.depth = spaceship.depth+2;
    laserGroup.add(laser);

}


