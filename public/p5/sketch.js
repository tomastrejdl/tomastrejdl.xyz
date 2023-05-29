let letters, rows, columns;
let directions = [];
let verticalOffsets = [];
let speedMultipliers = [];
let locationOfRedX;

const SPACING_X = 12;
const SPACING_Y = 20;
const CLICK_TARGET_TOLERANCE = 4;

let pauseTimeout = 0;
const PAUSE_COOLDOWN = 500;
const PAUSE_MAX_TIMEOUT = 120;
let pauseLastUsed = 0;
let xMargin;

let frameCountOffset = 0;

let isRunning = true;
let isEnded = false;

let resetButton,
  hintButton,
  progressBar,
  rechargingSpan,
  showHint = false;

let myFont;
function preload() {
  myFont = loadFont("VT323-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  resetButton = createButton("↻");
  resetButton.position(windowWidth - 30, 5);
  resetButton.mousePressed(regenerate);
  resetButton.attribute("title", "Restart Game");

  hintButton = createButton("💡");
  hintButton.position(windowWidth - 60, 5);
  hintButton.mousePressed(displayHint);
  hintButton.attribute("title", "Show Hint");

  progressBar = createElement("progress");
  progressBar.position(5, windowHeight - 20);
  progressBar.attribute("value", 1);
  progressBar.attribute("max", 1);

  rechargingSpan = createSpan(" ");
  rechargingSpan.attribute("style", "font-size: 12px; color: white;");
  rechargingSpan.position(10, windowHeight - 20);

  textFont(myFont);

  rows = floor(windowHeight / SPACING_X);
  columns = floor(windowWidth / SPACING_Y);
  console.log("window: ", windowWidth, "x", windowHeight);
  console.log(`Rows x Columns: ${rows}x${columns}`);
  xMargin = (windowWidth - columns * SPACING_Y) / 2;

  regenerate();
}

function regenerate() {
  isRunning = true;
  isEnded = false;
  showHint = false;
  pauseTimeout = 0;
  pauseLastUsed = frameCount;
  progressBar.attribute("value", 1);
  hintButton.removeAttribute("disabled");
  frameCountOffset = frameCount;

  for (let i = 0; i < columns; i++) {
    directions[i] = random([-1, 1]);
    verticalOffsets[i] = random(-0.5 * windowHeight, 0.5 * windowHeight);
    speedMultipliers[i] = random(1, 2);
  }

  letters = Array(ceil(rows));
  for (let i = 0; i <= rows; i++) {
    letters[i] = Array(floor(columns));
    for (let j = 0; j < columns; j++) {
      letters[i][j] = round(random(1));
    }
  }

  console.log(letters);

  locationOfTwo = {
    x: floor(random(columns)),
    y: floor(random(rows)),
  };
  console.log(`Location of 2: [${locationOfTwo.x},${locationOfTwo.y}]`);
}

function displayHint() {
  showHint = true;
  hintButton.attribute("disabled", true);
}

function draw() {
  background(0);

  pauseTimeout--;

  progressBar.attribute("value", -pauseTimeout / PAUSE_COOLDOWN);

  if (pauseTimeout < 0 && pauseTimeout > -PAUSE_COOLDOWN) {
    rechargingSpan.html("Recharging...");
  } else {
    rechargingSpan.html("Click to freeze frame");
  }

  if (
    -pauseTimeout >= PAUSE_COOLDOWN - 30 &&
    -pauseTimeout <= PAUSE_COOLDOWN + 30
  ) {
    push();
    stroke("#00ff00");
    strokeWeight(7);
    rect(1, windowHeight - 20, 165, 20);
    pop();
  }

  if (isRunning && pauseTimeout < 0) {
    for (let i = 0; i < columns; i++) {
      if (directions[i] == 0) {
        verticalOffsets[i]++;
        if (verticalOffsets[i] > 0.5 * windowHeight) {
          directions[i] = 1;
        }
      } else {
        verticalOffsets[i]--;
        if (verticalOffsets[i] < -0.5 * windowHeight) {
          directions[i] = 0;
        }
      }
    }
  } else {
    progressBar.attribute("value", pauseTimeout / PAUSE_MAX_TIMEOUT);
  }

  if (
    isRunning &&
    mouseIsPressed &&
    frameCount > pauseLastUsed + PAUSE_COOLDOWN
  ) {
    pauseTimeout = PAUSE_MAX_TIMEOUT;
    pauseLastUsed = frameCount;
    progressBar.attribute("value", 1);
  }

  if (showHint) {
    push();
    stroke(255, 255, 255);
    rect(
      locationOfTwo.x * SPACING_Y -
        CLICK_TARGET_TOLERANCE -
        (0.04 * (frameCount - frameCountOffset)) / 2,
      (locationOfTwo.y - 1) * SPACING_X +
        verticalOffsets[locationOfTwo.x] * speedMultipliers[locationOfTwo.x] -
        CLICK_TARGET_TOLERANCE -
        (0.025 * (frameCount - frameCountOffset)) / 2,
      SPACING_X +
        CLICK_TARGET_TOLERANCE * 2 +
        0.025 * (frameCount - frameCountOffset),
      SPACING_Y +
        CLICK_TARGET_TOLERANCE * 2 +
        0.04 * (frameCount - frameCountOffset)
    );
    pop();
  }

  if (
    mouseIsPressed &&
    mouseX >=
      locationOfTwo.x * SPACING_Y -
        CLICK_TARGET_TOLERANCE -
        (0.04 * (frameCount - frameCountOffset)) / 2 &&
    mouseX <=
      locationOfTwo.x * SPACING_Y +
        SPACING_Y +
        CLICK_TARGET_TOLERANCE +
        (0.04 * (frameCount - frameCountOffset)) / 2 &&
    mouseY >=
      (locationOfTwo.y - 1) * SPACING_X +
        verticalOffsets[locationOfTwo.x] * speedMultipliers[locationOfTwo.x] -
        CLICK_TARGET_TOLERANCE -
        (0.025 * (frameCount - frameCountOffset)) / 2 &&
    mouseY <=
      (locationOfTwo.y - 1) * SPACING_X +
        verticalOffsets[locationOfTwo.x] * speedMultipliers[locationOfTwo.x] +
        SPACING_X +
        CLICK_TARGET_TOLERANCE +
        (0.025 * (frameCount - frameCountOffset)) / 2
  ) {
    // NEXT LEVEL
    console.log("FOUND THE 2!");
    isRunning = false;
    isEnded = true;
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j <= rows; j++) {
      const xCoord = xMargin + i * SPACING_Y;
      const yCoord = j * SPACING_X + verticalOffsets[i] * speedMultipliers[i];
      const distance =
        Math.sqrt((xCoord - mouseX) ** 2 + (yCoord - mouseY) ** 2) * 2;

      if (i == locationOfTwo.x && j == locationOfTwo.y) {
        push();
        fill(255 - distance, 0, 0);
        textSize(16 + 0.05 * (frameCount - frameCountOffset));
        translate(
          -0.02 * (frameCount - frameCountOffset),
          4 + 0.025 * (frameCount - frameCountOffset)
        );
        text("2", xCoord, yCoord);
        pop();
      } else {
        fill(0, 255 - distance, 0);
        text(letters[j][i], xCoord, yCoord);
      }
    }
  }
  
  if(isEnded) {
    fill(0, 0, 0);
    rect(0, 0, windowWidth, windowHeight);
    if(frameCount % floor(random(2, 5)) == 0) {
      fill(255, 255, 255);
      text("ERROR IN THE MATRIX", windowWidth/2-40 - mouseX/4, windowHeight/2 - mouseY/4);  
    }
  }
}
