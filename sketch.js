var cnv;
var cnvWidth;
var cnvHeight;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y + 10);
}

function setup() {
  cnvWidth = windowWidth / 2;
  cnvHeight = windowHeight / 2;
  cnv = createCanvas(1000, 600);
  centerCanvas();
}

function windowResized() {
  resizeCanvas(cnvWidth, cnvHeight);
  centerCanvas();
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}