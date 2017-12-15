let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4
let paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePosition(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {x: mouseX, y: mouseY};

}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let fps = 60;
  setInterval(function() {
    moveEverything();
    drawEverything()
  }, 1000 / fps);

  canvas.addEventListener('mousemove', (e) => {
    let mousePosition = calculateMousePosition(e);
    paddle1Y = mousePosition.y - PADDLE_HEIGHT / 2;
  })
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX - 20 < 0) {
    // ballSpeedX = -ballSpeedX;
    ballReset();
  }

  if (ballX + 20 > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY - 20 < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY + 20 > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  //BackGround
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // Paddle
  colorRect(10, paddle1Y, 10, PADDLE_HEIGHT, 'wheat');

  // Ball
  colorCircle(ballX, ballY, 10, 'cyan');

}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill()
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
