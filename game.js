// game.js

// Access the canvas and get the 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Colors
const backgroundColor = '#f0f8ff';
const basketColor = '#8b0000';
const itemColor = '#008000';

// Basket properties
const basketWidth = 80;
const basketHeight = 20;
let basketX = (canvasWidth - basketWidth) / 2;
const basketY = canvasHeight - basketHeight - 10;

// Basket movement
let basketSpeed = 5;
let moveLeft = false;
let moveRight = false;

// Falling item properties
const itemRadius = 10;
let items = [];
let score = 0;

// Listen for keyboard events to control the basket
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') moveLeft = true;
  if (e.key === 'ArrowRight') moveRight = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') moveLeft = false;
  if (e.key === 'ArrowRight') moveRight = false;
});

// Draw basket on the canvas
function drawBasket() {
  ctx.fillStyle = basketColor;
  ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
}

// Update basket position based on keyboard input
function updateBasket() {
  if (moveLeft && basketX > 0) {
    basketX -= basketSpeed;
  }
  if (moveRight && basketX + basketWidth < canvasWidth) {
    basketX += basketSpeed;
  }
}

// Generate random falling items
function createItem() {
  const x = Math.random() * (canvasWidth - itemRadius * 2) + itemRadius;
  const y = -itemRadius;
  items.push({ x, y });
}

// Draw falling items on the canvas
function drawItems() {
  ctx.fillStyle = itemColor;
  items.forEach(item => {
    ctx.beginPath();
    ctx.arc(item.x, item.y, itemRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });
}

// Update items (falling downwards)
function updateItems() {
  items.forEach(item => {
    item.y += 0.8; // Speed of falling items
  });

  // Remove items that fall out of the canvas
  items = items.filter(item => item.y < canvasHeight + itemRadius);
}

// Check for collisions between the basket and falling items
function checkCollisions() {
  items = items.filter(item => {
    if (
      item.y + itemRadius >= basketY && // Item reaches the basket's Y position
      item.x > basketX &&              // Item is within the basket's left edge
      item.x < basketX + basketWidth   // Item is within the basket's right edge
    ) {
      score++; // Increase the score
      return false; // Remove the item from the array
    }
    return true; // Keep the item in the array
  });
}

// Draw background
function drawBackground() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// Draw the current score on the screen
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Main game loop
let itemSpawnTimer = 0;

function gameLoop() {
  drawBackground();
  drawBasket();
  drawItems();
  drawScore();

  updateBasket();
  updateItems();
  checkCollisions();

  // Spawn items every 60 frames (~1 second)
  if (itemSpawnTimer % 60 === 0) createItem();
  itemSpawnTimer++;

  requestAnimationFrame(gameLoop); // Call gameLoop on the next frame
}

// Start the game
gameLoop();
