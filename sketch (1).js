var cnv;

var colorPicker;
var penWidthSlider;
var eraserButton;
var dropdown;
var tool = 'pen';
var instructions = '';

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y + 60);
}

function setup() {
  let penButtonX = 290;
  let penButtonY = 140;

  cnv = createCanvas(windowWidth * 0.7, windowHeight * 0.7); 
  centerCanvas();

  dropDown();

  colorPicker = createColorPicker('black');
  colorPicker.position(450, 140);

  penWidthSlider = createSlider(1, 40, 20);
  penWidthSlider.position(580, 140);  

  clearCanvas();

  var saveImgButton = createButton('Save Image');
  saveImgButton.position(windowWidth * 0.9, 80);
  saveImgButton.mousePressed(saveImage);

  penEraserButton = createButton('Pen/Eraser');
  penEraserButton.position(penButtonX, penButtonY);
  penEraserButton.mousePressed(drawPenEraser);
  
  penEraserButton.mouseOver(displayInstructions);
  penEraserButton.mouseOut(hideInstructions);
  instructions = createElement('h6', instructions);
  instructions.position(penButtonX - 55, penButtonY);
}

function displayInstructions() {
  instructions.html('Click once for eraser. Click again for pen.');
}

function hideInstructions() {
  instructions.html('');
}

function drawPenEraser() {
  if(tool == "eraser") {
    tool = "pen";
  } else {
    tool = "eraser";
  }
}

function draw() {
  let chosenColor = colorPicker.value();
  stroke(chosenColor);

  let chosenPenWidth = penWidthSlider.value();
  strokeWeight(chosenPenWidth);

  if(mouseIsPressed) { 
    if(tool == 'pen') {
      line(mouseX,mouseY,pmouseX,pmouseY);   
    } else {
      erase();
      line(mouseX,mouseY,pmouseX,pmouseY);
      noErase();      
    }
  }
}

function dropDown() {
  dropdown = createSelect();
  dropdown.position(830, 140);  
  dropdown.option('white');
  dropdown.option('blue');
  dropdown.option('red');
  dropdown.option('green');
  dropdown.option('black');
  dropdown.changed(changeBackground); 
}

/* function changeBackground() {
    document.body.style.background = dropdown.value();
} */

function changeBackground() {
    background(255);
  if (dropdown.value() == 'blue') {
    background(0, 0, 255);
  } else if (dropdown.value() == 'red') {
    background(255,0,0);
  } else if (dropdown.value() == 'green') {
    background(0,255,0);
  } else if (dropdown.value() == 'black') {
    background(0,0,0);
  }
}

function clearCanvas() {
  var clearButton = createButton("Clear Canvas");
  clearButton.mousePressed(clear);
  clearButton.position(990, 140);
}

function saveImage() {
  save("My_Image" + ".png");
}

let previousState;
function keyPressed(e) {
  // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
  if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
    undoToPreviousState();
  }
}

function undoToPreviousState() {
  // if previousState doesn't exist 
  // return without doing anything
  if (!previousState) {
    return;
  }
  // else draw the background (in this case white)
  // and draw the previous state
  background(255);
  image(previousState, 0, 0);
  // then set previous state to null
  previousState = null;
}

function mousePressed() {
  // the moment input is detect save the state
  saveState();
}

function saveState() {
  // save state by taking image of background
  // for more info look at reference for get
  previousState = get();
}