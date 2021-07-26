//Variable declaration
var cnv;

/* var colorPicker; */
var penWidthSlider;
var eraserButton;

/* var dropdownBackground; */

var backgroundPicker;

var dropdownPens;

var tool = 'pen';
var penStyle = 'rainbowPen';

var instructions = '';

var drawingToolsDiv;
var drawingTools;

var saveImgButton;

/* let randomSizes; */
var img1;
var img2;
var img3;
var img4;

/* Centering and positioning the canvas on the drawing pages*/
/* function centerCanvas(cnvYStart) {
  let x = (windowWidth - width) / 2;
  let y = (((windowHeight - height) / 2) + ((windowHeight - cnvYStart) / 2) );
  cnv.position(x, y);
} */

/* Resizes the canvas for different window sizes */
function windowResized() {
  resizeCanvas(windowWidth * 0.7, windowHeight * 0.7);
/*   penEraserButtonPosition = penEraserButton.position(); 
  instructions.position(penEraserButtonPosition.x - 275, penEraserButtonPosition.y);   */
/*   saveImgButtonPosition = saveImgButton.position();
  //centerCanvas(saveImgButtonPosition.y);
  //cnv.center();
*/
}

/* Loads images for different pen types */
function setup() {

  /* Create div element with a class to format the unordered list and text*/
  drawingToolsDiv = createDiv();
  drawingToolsDiv.class("drawing-materials");   

  canvasDiv = createDiv();
  cnv = createCanvas(windowWidth * 0.7, windowHeight * 0.7);   
  cnv.parent(canvasDiv); 

  /* Create an unordered list element with the drawtools as the child of drawingToolsDiv (using html content)*/
  drawingTools = createElement("ul");
  drawingToolsDiv.child(drawingTools);

  /* Create a homeButton list item element that is the child of drawingTools (part of tool bar)*/ 
  homeButton = createButton("Home");
  homeButtonLi = createElement("li", "Home </br>");
  homeButtonA = createA("./index.html", "");
  homeButtonA.child(homeButton);
  homeButtonLi.child(homeButtonA);
  drawingTools.child(homeButtonLi);
  homeButton.style('background-color', '#ffffff');
  homeButton.style('border-radius', '5px');

/*   dropdownBackground(); */

/* Create a background color picker list item element that is the child of drawingTools (part of tool bar)*/ 

/* default sets background to be white instead of transparent before changing background colors*/
  background(255);
  backgroundPicker = createColorPicker('white');
  backgroundPicker.changed(updateBG);

  backgroundPickerLi = createElement("li", "Background Colors </br>");
  backgroundPickerLi.child(backgroundPicker);
  drawingTools.child(backgroundPickerLi);
  backgroundPicker.style('background-color', '#ffffff');
  backgroundPicker.style('border-radius', '5px');

  dropdownPens();

/* Create a colorPicker list item element that is the child of drawingTools (part of tool bar)*/ 
/*   colorPicker = createColorPicker('black');
  colorPickerLi = createElement("li", "Pen Colors </br>");
  colorPickerLi.child(colorPicker);
  drawingTools.child(colorPickerLi); */

  /* Create a penWidthSlider list item element that is the child of drawingTools (part of tool bar)*/ 
  penWidthSlider = createSlider(5, 55, 30);
  penWidthSliderLi = createElement("li", "Pen/Eraser Widths </br>");
  penWidthSliderLi.child(penWidthSlider);
  drawingTools.child(penWidthSliderLi);
  penWidthSlider.style('background-color', '#ffffff');
  penWidthSlider.style('border-radius', '5px');

  /* Create a penEraserButton list item element that is the child of drawingTools (part of tool bar)*/
  penEraserButton = createButton('Pen/Eraser');
  penEraserButtonLi = createElement("li", "Pen/Eraser</br>");
  penEraserButtonLi.child(penEraserButton); 
  drawingTools.child(penEraserButtonLi);
  penEraserButton.style('background-color', '#ffffff');
  penEraserButton.style('border-radius', '5px');

  /* Activates the pen / eraser function with mouse click */
  penEraserButton.mousePressed(drawPenEraser);

  /* Position of the pen/eraser button hover text to let users know which tool is active */
  penEraserButton.mouseOver(displayInstructions);
  penEraserButton.mouseOut(hideInstructions);
  instructions = createElement('h6', instructions);  
  penEraserButtonLi.child(instructions);  
  penEraserButtonPosition = penEraserButton.position();
  instructions.position(penEraserButtonPosition.x - 250, penEraserButtonPosition.y);

  /* Clears the canvas + removes the background color also (need to change background before drawing) */
  clearCanvas();

  /* Create a button and label using a saveImgButton list item element that is the child of drawingTools (part of tool bar)*/ 
  var saveImgButton = createButton('Save');
  saveImgButtonLi = createElement("li", "Save Image</br>");
  saveImgButtonLi.child(saveImgButton);
  drawingTools.child(saveImgButtonLi);

  saveImgButton.mousePressed(saveImage);
  saveImgButton.style('background-color', '#ffffff');
  saveImgButton.style('border-radius', '5px');

  preload(); 
}

/* Displays instructions when hovering over the pen/eraser button */
function displayInstructions() {
  instructions.html('Click once for eraser. Click again for pen.');
}

/* Hides instructions when not using pen/eraser button */
function hideInstructions() {
  instructions.html('');
}

/* Creates the toggle between pen or eraser function after using the tool in it's current state */
function drawPenEraser() {
  if(tool == "eraser") {
    tool = "pen";
  } else {
    tool = "eraser";
  }
}

// pen type images
function preload() {
  img1 = loadImage('Images/smile.png');
  img2 = loadImage('Images/pikachu.png');
  img3 = loadImage('Images/star.png');  
  img4 = loadImage('Images/heart.png');
}

// create rainbow pen brush
function rainbowPen() {
  if(mouseIsPressed){   
    colorMode(HSB);
    stroke((5*frameCount)  % 255, 100, 200);
    fill((5*frameCount) % 255, 255, 100);
    circle(mouseX, mouseY, random(0, 50));
/*     randomSizes = random(0, 50); */
  }  
}

// create emoji pen brush
function smileBrush() {
  if (mouseIsPressed) {
    image(img1, mouseX, mouseY, 40, 40);
  }
}

// create character pen brush
function characterPen() {
  var imageWidth = random(0,100);  
  if (mouseIsPressed) {
    image(img2, mouseX, mouseY, imageWidth, imageWidth);    
  }
}

// create star pen brush
function starPen() {
  if (mouseIsPressed) {
    image(img3, mouseX, mouseY, 40, 40);
  }
}

// create heart pen brush
function heartPen() {
  if (mouseIsPressed) {
    image(img4, mouseX, mouseY, 40, 40);
  }
}

function draw() {
/* Choosing color of pen to draw with*/   
/*   let chosenColor = colorPicker.value();
  stroke(chosenColor); */

  /* Choosing pen/eraser width to draw or erase with*/
  let chosenPenWidth = penWidthSlider.value();
  strokeWeight(chosenPenWidth);

  /* When mouse is pressed choosing to draw or erase on drawing canvas */
  if(mouseIsPressed) { 
    /* makes sure that when the pen is clicked outside the canvas it does not draw. It only can within the canvas dimensions */
    if(mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    /* Making tool change to switch between different pen types when drawing */
      if(tool == 'pen') {
        if (penStyle == "rainbowPen") {
          rainbowPen();
        } else if (penStyle == "smileBrush") {
          smileBrush();       
        } else if (penStyle == "characterPen") {
          characterPen();
        } else if (penStyle == "starPen") {
          starPen();
        } else if (penStyle == "heartPen") {
          heartPen();
        }
      /* Making tool change to erase canvas */  
      } else if (tool == 'eraser') {
        erase();
        line(mouseX,mouseY,pmouseX,pmouseY);
        noErase();      
      }
    }
  }
}

// updates the background color to the one chosen
function updateBG () {
  background(backgroundPicker.color());   
}

/* function dropdownBackground() {
  dropdownBG = createSelect(); */

/*colordropdown list icolort that is the child of drawingTools (part of tool bar) */ 
/*   dropdownLi = createElement("li", "Background Colors </br>");
  dropdownLi.child(dropdownBG);
  drawingTools.child(dropdownLi); */

// Options for drop down menu 
/*   dropdownBG.option('white');
  dropdownBG.option('blue');
  dropdownBG.option('red');
  dropdownBG.option('green');
  dropdownBG.option('black');
  dropdownBG.changed(changeBackground); 
} */

/* Function that changes background color depending on the color chosen */
/* function changeBackground() {
  colorMode(HSB);
  background(255);
  if (dropdownBG.value() == 'blue') {
    background(255, 204, 100);
  } else if (dropdownBG.value() == 'red') {
    background(0, 100, 100);
  } else if (dropdownBG.value() == 'green') {
    background(120, 100, 50);
  } else if (dropdownBG.value() == 'black') {
 background(0,0,0);
  }
}  */

 /* Create a drop down menu to choose different pen types */
function dropdownPens() {
  dropdownPens = createSelect();

  /* Create a dropdown list item element that is the child of drawingTools (part of tool bar) */ 
  dropdownLi = createElement("li", "Pen Varieties</br>");
  dropdownLi.child(dropdownPens);
  drawingTools.child(dropdownLi);
  dropdownPens.style('background-color', '#ffffff');
  dropdownPens.style('border-radius', '5px');



  // Options for pen type drop down menu 
  dropdownPens.option('Rainbow Pen');
  dropdownPens.option('Emoji Pen');
  dropdownPens.option('Character Pen');
  dropdownPens.option('Star Pen');
  dropdownPens.option('Heart Pen');
  dropdownPens.changed(changePenType); 
}

/* Function that changes pen types depending on the option chosen */
function changePenType() {
  if (dropdownPens.value() == 'Rainbow Pen') {
    penStyle = "rainbowPen";
   } else if (dropdownPens.value() == 'Emoji Pen') {
    penStyle = "smileBrush";
  } else if (dropdownPens.value() == 'Character Pen') {
    penStyle = "characterPen";    
  } else if (dropdownPens.value() == 'Star Pen') {
    penStyle = "starPen";
  } else if (dropdownPens.value() == 'Heart Pen') {
    penStyle = "heartPen";   
  } 
}

/* Clears the canvas + removes the background color also (so need to change background before drawing) */
function clearCanvas() {
  var clearButton = createButton("Clear");
  clearButtonLi = createElement("li", "Clear Canvas </br>");
  clearButtonLi.child(clearButton);
  drawingTools.child(clearButtonLi);

  clearButton.mousePressed(clear);
  clearButton.style('background-color', '#ffffff');
  clearButton.style('border-radius', '5px');

}

/* Saves the canvas drawing */
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