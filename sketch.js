//Variable declaration
var cnv;

var colorPicker;

var backgroundPicker;

var penWidthSlider;
var eraserButton;
/* var dropdown; */
var tool = 'pen';
var instructions = '';

var drawingToolsDiv;
var drawingTools;

var saveImgButton;
var clearButton;

/* Centering and positioning the canvas on the drawing pages */
/*function centerCanvas(cnvYStart) {
  let x = (windowWidth - width) / 2;
  let y = (((windowHeight - height) / 2) + ((windowHeight - cnvYStart) / 2) );
  cnv.position(x, y);
}*/

/* Resizes the canvas for different window sizes */
function windowResized() {
  resizeCanvas(windowWidth * 0.7 ,windowHeight * 0.7);
/*   saveImgButtonPosition = saveImgButton.position(); */
  //centerCanvas(saveImgButtonPosition.y);
  //cnv.center();
}

/* Creation of canvas */
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
  

  /* default sets background to be white instead of transparent before changing background colors*/
  background(255);
  backgroundPicker = createColorPicker('white');
  backgroundPicker.changed(updateBG);

  backgroundPickerLi = createElement("li", "Background Colors </br>");
  backgroundPickerLi.child(backgroundPicker);
  drawingTools.child(backgroundPickerLi);
  backgroundPicker.style('background-color', '#ffffff');
  backgroundPicker.style('border-radius', '5px');

/*   dropDown(); */

  /* Create a colorPicker list item element that is the child of drawingTools (part of tool bar)*/ 
  colorPicker = createColorPicker('black');
  colorPickerLi = createElement("li", "Pen Colors </br>");
  colorPickerLi.child(colorPicker);
  drawingTools.child(colorPickerLi);
  colorPicker.style('background-color', '#ffffff');
  colorPicker.style('border-radius', '5px');
  

  /* Create a penWidthSlider list item element that is the child of drawingTools (part of tool bar)*/ 
  penWidthSlider = createSlider(5, 55, 30);
  penWidthSliderLi = createElement("li", "Pen/Eraser Widths </br>");
  penWidthSliderLi.child(penWidthSlider);
  drawingTools.child(penWidthSliderLi);
  penWidthSlider.style('background-color', '#ffffff');

  /* Create a penEraserButton list item element that is the child of drawingTools (part of tool bar)*/
  penEraserButton = createButton('Pen/Eraser');
  penEraserButtonLi = createElement("li", "Pen/Eraser </br>");
  penEraserButtonLi.child(penEraserButton);
  drawingTools.child(penEraserButtonLi);
  penEraserButton.style('background-color', '#ffffff');
  penEraserButton.style('border-radius', '5px');

  /* Activates the pen / eraser function with mouse click */
  penEraserButton.mousePressed(drawPenEraser);

  /* Position of the pen/eraser button hover text to let users know which tool is active */
  penEraserButton.mouseOver(displayInstructions);
  penEraserButton.mouseOut(hideInstructions);
  instructions = createElement('h4', instructions);
  penEraserButtonPosition = penEraserButton.position();
  instructions.position(penEraserButtonPosition.x - 250, penEraserButtonPosition.y);

  /* Clears the canvas + removes the background color also (so need to change background before drawing) */
  clearCanvas();


  /* Create a button and label using a saveImgButton list item element that is the child of drawingTools (part of tool bar)*/ 
  saveImgButton = createButton('Save');
  saveImgButtonLi = createElement("li", "Save Image</br>");
  saveImgButtonLi.child(saveImgButton);
  drawingTools.child(saveImgButtonLi);

  saveImgButton.mousePressed(saveImage);
  saveImgButton.style('background-color', '#ffffff');
  saveImgButton.style('border-radius', '5px');


  
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

function draw() {
/* Choosing color of pen to draw with*/   
  let chosenColor = colorPicker.value();
  stroke(chosenColor);

/* Choosing pen/eraser width to draw or erase with*/
  let chosenPenWidth = penWidthSlider.value();
  strokeWeight(chosenPenWidth);

/* When mouse is pressed choosing to draw or erase on drawing canvas */
  if(mouseIsPressed) { 
    /* makes sure that when the pen is clicked outside the canvas it does not draw. It only can within the canvas dimensions */
    if(mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {

      /* Drawing on canvas */
      if(tool == 'pen') {
        line(mouseX,mouseY,pmouseX,pmouseY);   

      /* Erasing canvas */  
      } else {
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

 /* Create a drop down menu to choose background colors */

/* function dropDown() {
  dropdown = createSelect(); */

/* Create a dropdown list item element that is the child of drawingTools (part of tool bar) */ 
/*   dropdownLi = createElement("li", "Background Colors </br>");
  dropdownLi.child(dropdown);
  drawingTools.child(dropdownLi); */

// Options for drop down menu 
/*   dropdown.option('white');
  dropdown.option('blue');
  dropdown.option('red');
  dropdown.option('green');
  dropdown.option('black');
  dropdown.changed(changeBackground); 
} */

/* function changeBackground() {
    document.body.style.background = dropdown.value();
} */

/* Function that changes background color depending on the color chosen */
/* function changeBackground() {
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
} */

/* Clears the canvas + removes the background color also (so need to change background before drawing) */
function clearCanvas() {
  clearButton = createButton("Clear");
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