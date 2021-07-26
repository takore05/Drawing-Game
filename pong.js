var cnv;

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

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {

  cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  centerCanvas();
  
  // player 1 and 2 initial paddle position
  p2X = width * 0.96;
  p1X = width - p2X;

  p1Y = height * 0.5;
  p2Y = height * 0.5;

  //initial ball position
  rectMode(CENTER);
  ballX = width / 2;
  ballY = height / 2;

/*   textAlign(CENTER); */
}

 function draw() {
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
  } else if (ballY <= 0) {
    ballDirectionY = ballDirectionY * -1;
  }
}

function paddleCollisions() {
  // player 1's paddle collision
  if (ballX >= p1X - 10 && ballX <= p1X + 10 && ballY >= p1Y - 50 && ballY <= p1Y + 50) {
    ballDirectionX = ballDirectionX * -1;

  // player 2's paddle collision  
  } else if (ballX >= p2X - 10 && ballX <= p2X + 10 && ballY >= p2Y - 50 && ballY <= p2Y + 50)  {
    ballDirectionX = ballDirectionX * -1;
  }
}

function playerScores() {

  // creates the scoring board
  fill(255);
  textSize(40);
  text(p1Score, width * 0.15, height * 0.10);
  text(p2Score, width * 0.83, height * 0.10);

  // increments the players scores

  // p1 missed, ball went outside left wall
  if (ballX <= 0) {
    p2Score += 1;
    ballX = width / 2;
    ballY = height / 2;

  // p2 missed, ball went outside right wall
  } else if (ballX >= width) {
    p1Score += 1;
    ballX = width / 2;
    ballY = height / 2;
  }
}
