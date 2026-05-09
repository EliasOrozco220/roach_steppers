let myImg;
let particles = []; // Array to store multiple instances
var ballx = 300; // width/2 ?
var bally = 300;
var ballSize = 80;
var score =0;
var img1, img2, beginImg;
var  c; // our text color as a variable, set in setup
var gameState ="begin";

function preload() {

  img1 = loadImage('https://raw.githubusercontent.com/EliasOrozco220/roach-steppers/86036cb83b25366b97aae117cb2b951ed39724ae/download-removebg-preview.png'); //target
  img2 = loadImage('https://raw.githubusercontent.com/EliasOrozco220/roach-steppers/193d95806675877e068ab798682b0b012d391079/Screen_Shot_2026-05-08_at_1.47.32_PM-removebg-preview%20(1).png'); //user
  beginImg = loadImage('https://raw.githubusercontent.com/EliasOrozco220/roach-steppers/34ec124ca0dd18776c74bb9db9c1927c97fb9bfe/step.jpeg');
}

function setup() {
  createCanvas(900, 500);
  let c =color(200, 100, 100); //text color
  fill(c);
  textAlign(CENTER);
  textSize(20); 
  // Create 10 different starting points and speeds
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
} // end of setup


function draw() {
  
if(gameState =="begin"){
  background(beginImg);
  beginGame();
}
  
if(gameState =="L1"){
  background(220);
  levelOne();
}
if(gameState =="Win"){
    background(50);
  win();
}
  text(("Score: " + score), width/2, 40);
} // end of draw

function beginGame(){
 if (mouseIsPressed === true) {
  gameState="L1";  
 } // end of if mousIsPressed
} // end of beginGame


function levelOne(){
  text("level 1", width/2, height-20);
  var distToBall = dist(ballx+20, bally+20, mouseX, mouseY);
  // Loop through every particle in our array
  for (let p of particles) {
    // 1. Update position
    p.x += p.speedX;
    p.y += p.speedY;
    
    // 2. Wrap around the screen edges
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
    
    // 3. Draw the same image variable at the unique x, y coordinates
    image(img1, p.x, p.y, 50, 50); 
  }
  if (distToBall<ballSize/2){
    ballx= random(width-5);
    bally = random(height-5);
    score = score +1;
  } // end if
  if (score>=30){
    gameState= "Win";
  }
  image(img1, ballx, bally, 40, 40);
  image(img2, mouseX-20, mouseY-20, 100, 100);
} // end level 

function win(){
  text("You Won", width/2, height/2);
} // end win
