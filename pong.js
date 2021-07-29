// variable declarations
var cnv;

var gameButtonDiv;
var gamebutton;

var ballX;
var ballY;
var ballWidth = 20;
var ballHeight = 20;

var ballSpeed = 5;
var ballDirectionX = -1;
var ballDirectionY = -1;

var paddleWidth = 20;
var paddleHeight = 100;
var pSpeed = 10;

var p1X;
var p1Y;

var p2X;
var p2Y;

var p1Score = 0;
var p2Score = 0;

var paddleCollisionsCount = 0;

var page = 0; // start screen

var ballPaddleSound;
var ballWallSound;

var playMode = true;

// create sound effects when the ball hits paddle and wall
function preload() {
  soundFormats('wav', 'mp3');
  ballPaddleSound = loadSound('Sounds/ball_hits_paddle.wav');
  ballPaddleSound.setVolume(0.5);
  ballWallSound = loadSound('Sounds/ball_hits_wall.mp3');
}

function setup() {

  // create and centers the canvas
  cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  centerCanvas();
  
  // player 1 and 2 initial paddle position
  p2X = width * 0.95;
  p1X = width - p2X;

  p1Y = height * 0.5;
  p2Y = height * 0.5;

  //initial ball position
  rectMode(CENTER);
  ballX = width / 2;
  ballY = height / 2;

  // Centers the text on the screen
  textAlign(CENTER);

/* Create div element with a class to format the unordered list and text*/
  gameButtonDiv = createDiv();
  gameButtonDiv.class("game-button");   

/* Create an unordered list element with the gameButton as the child of gameButtonDiv (using html content)*/
  gameButton = createElement("ul");
  gameButtonDiv.child(gameButton);

  /* Create a homeButton list item element that is the child of homeButton*/ 
  homeButton = createButton("Home");
  homeButtonLi = createElement("li");
  homeButtonA = createA("./index.html", "");
  homeButtonA.child(homeButton);
  homeButtonLi.child(homeButtonA);
  gameButton.child(homeButtonLi);
  homeButton.style('background-color', '#ffffff');
  homeButton.style('border-radius', '5px');

  // sets the framerate of the drawings
  frameRate(60);

  preload();
}

function draw() {

  // Display the start screens
  if (page == 0) {
    startScreen();

  // Display the game screen 
  } else if (page == 1) {
    if (playMode){
      pong();
    }
  }

  // Starts the game screen
  // 32 is the 'space' key
  if (keyCode == 32) {
    page = 1;
  } 
}

// Pauses the game screen
// 80 is the 'p' key
function keyPressed() {
  if (keyCode == 80)
    playMode = !playMode;
}

// Centers the canvas
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// Displays the start with screen text / instructions
function startScreen() {
  background(39,174,96);
  fill(92,0,168);
  textSize(120);
  text("PONG GAME", width / 2, height /4);

/*   fill(53, 73, 94); */
  fill(0, 16, 168);
  textSize(40);
  text("Press space to start", width /2 , height /2 - 50);
  text("Press 'p' to pause / play", width /2 , height /2);

  textSize(50);
  fill(168, 0, 0);
  text("Controls", width /2 , height /2 + 120);

  textSize(40);
  fill(0, 16, 168);
  text("Player 1 : W and S keys", width /2 , height /2 + 180);
  text("Player 2 : Up and Down arrow keys", width /2 , height /2 + 230);
}

// Create pong game movement and actions (paddles and ball)
function pong() {
  background(0);

  // draws the ball
  fill(255,255,0);
  ellipse(ballX, ballY, ballWidth, ballHeight);

  // draws the players paddle
  fill(255);
  rect(p1X, p1Y, paddleWidth, paddleHeight); 
  rect(p2X, p2Y, paddleWidth, paddleHeight); 

  // paddle movement
  p1Move();
  p2Move();

  //physics (overall moves diagonally)
  ballX = ballX + (ballDirectionX * ballSpeed); //moves horizontally
  ballY = ballY + (ballDirectionY * ballSpeed); //moves vertically

  wallCollisions();
  paddleCollisions();

  playerScores();
  }

// moves player 1's paddle 
// 87 is 'w' and 83 is 's' in JS Event keyCode
function p1Move() {
  if(keyIsDown(87)) {
      p1Y -= pSpeed;
  } else if(keyIsDown(83)) {
      p1Y += pSpeed;
  }
}

// moves player 2's paddle
function p2Move() {
  if(keyIsDown(UP_ARROW)) {
    p2Y -= pSpeed;
  } else if(keyIsDown(DOWN_ARROW)) {
    p2Y += pSpeed;
  }
}

function wallCollisions() {
  // collisions with the top and bottom walls makes the ball change directions
  if(ballY >= height) {
    ballDirectionY = ballDirectionY * -1;
    ballWallSound.play();
  } else if (ballY <= 0) {
    ballDirectionY = ballDirectionY * -1;
    ballWallSound.play();
  }

  // keeps both players paddles within the top and bottom walls
  if(p1Y + paddleHeight/2 >= height) {
    p1Y = height - paddleHeight/2;
  } else if (p1Y - paddleHeight/2 <= 0){
    p1Y = paddleHeight/2;
  }

  if(p2Y + paddleHeight/2 >= height) {
    p2Y = height - paddleHeight/2;
  } else if (p2Y - paddleHeight/2 <= 0){
    p2Y = paddleHeight/2;
  }
}

function paddleCollisions() {
  let changeSpeed = false;

  // player 1's paddle collision
  if (ballX >= p1X - 10 && ballX <= p1X + 10 && ballY >= p1Y - 50 && ballY <= p1Y + 50) {
    ballDirectionX = ballDirectionX * -1;
    ballPaddleSound.play();
    paddleCollisionsCount += 1;
    
    /* ensures that the ball doesn't collide with the paddle in the next frame (fixes the glitch where it looks like it's stuck on the paddle) */
    ballX = ballX + (ballDirectionX * paddleWidth);
    ballY = ballY + (ballDirectionY * paddleWidth);

    // increases the speed after 7 or 15 paddle collisions during each round
    if (paddleCollisionsCount == 7 || paddleCollisionsCount == 15) {
      changeSpeed = true;
    }

  // player 2's paddle collision  
  } else if (ballX >= p2X - 10 && ballX <= p2X + 10 && ballY >= p2Y - 50 && ballY <= p2Y + 50)  {
    ballDirectionX = ballDirectionX * -1;
    ballPaddleSound.play();
    paddleCollisionsCount += 1;

    /* ensures that the ball doesn't collide with the paddle in the next frame (fixes the glitch where it looks like it's stuck on the paddle) */
    ballX = ballX + (ballDirectionX * paddleWidth);
    ballY = ballY + (ballDirectionY * paddleWidth);  

    // increases the speed after 7 or 15 paddle collisions during each round
    if (paddleCollisionsCount == 7 || paddleCollisionsCount == 15) {
      changeSpeed = true;
    }
  }

  // changes the speed of the ball as a round progresses
  if (changeSpeed) {
    ballSpeed += 3;
    changeSpeed = false;
  }
}

function playerScores() {

  // creates the scoring board
  fill(255);
  textSize(50);
  text(p1Score, width * 0.15, height * 0.10);
  text(p2Score, width * 0.83, height * 0.10);

  // increments the players scores

  // p1 missed, ball went outside left wall also resets the number of paddle collisions with the ball and ball speed returns to default
  if (ballX <= 0) {
    p2Score += 1;
    ballX = width / 2;
    ballY = height / 2;
    paddleCollisionsCount = 0;
    ballSpeed = 5;

  // p2 missed, ball went outside right wall also resets the number of paddle collisions with the ball and ball speed returns to default
  } else if (ballX >= width) {
    p1Score += 1;
    ballX = width / 2;
    ballY = height / 2;
    paddleCollisionsCount = 0;
    ballSpeed = 5;
  }
}
