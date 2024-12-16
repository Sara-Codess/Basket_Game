const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Basket (Bear SVG) properties
const basketWidth = 80;
const basketHeight = 80;
let basketX = (canvasWidth - basketWidth) / 2; // Center horizontally
const basketY = canvasHeight - basketHeight - 10;

// Basket movement
let basketSpeed = 7;
let moveLeft = false;
let moveRight = false;

// Falling item properties
const items = [];
const emojis = [
    { emoji: "🎨", score: 1 }, // Painting color palette
    { emoji: "🖌️", score: 1 }, // Paint brush
    { emoji: "📚", score: 1 }, // Book
    { emoji: "🎧", score: 1 }, // Headphones
    { emoji: "🎵", score: 1 }, // Music note
    { emoji: "⭐", score: 1 }, // Star
    { emoji: "🩴", score: -1 }, // Flip-flop sandals
    { emoji: "🧱", score: -1 }, // Brick
    { emoji: "💣", score: -1 }  // Bomb
];
let score = 0;

// Load basket image
const basketImg = new Image();
basketImg.src = 'data:image/svg+xml;base64,' + btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 446.4 686.5" height="5cm" width="auto">
    <title>Curious Bear</title>
    <g id="bear">
      <ellipse cx="223.2" cy="637.6" rx="223.2" ry="29" fill="#3F1C0C" opacity="0.3"/>
      <g id="body">
        <path d="M376.3,460.3c0,63.2-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.1H260.5a19.1,19.1,0,0,1-19-19V553.2a124.2,124.2,0,0,1-30.5.3v62a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.6l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3c0-125.3,67.4-226.9,150.6-226.9S376.3,335,376.3,460.3Z" fill="#e07320"/>
        <path d="M211,596.9v18.4a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.7l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3q0-4.6.1-9.2c1.6,61.6,19.6,117,47.5,156.4l0.5,0.8a19,19,0,0,0,15.2,7.7H192A19.1,19.1,0,0,0,211,596.9Z" fill="#af571d"/>
        <path d="M376.3,459.3c0,63.1-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.2H260.5a19.1,19.1,0,0,1-19-19V594.9a19.1,19.1,0,0,0,19,19H314a18.9,18.9,0,0,0,13-5.2l4.5-6.5h0c26.3-39.1,43-92.7,44.6-152.2Q376.3,454.7,376.3,459.3Z" fill="#af571d"/>
        <path id="body-stroke" d="M376.3,460.3c0,63.2-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.1H260.5a19.1,19.1,0,0,1-19-19V553.2a124.2,124.2,0,0,1-30.5.3v62a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.6l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3c0-125.3,67.4-226.9,150.6-226.9S376.3,335,376.3,460.3Z" fill="none" stroke="#3f1c0d" stroke-miterlimit="10" stroke-width="10"/>
        <path id="arm-right" d="M294.1,283h0a41.6,41.6,0,0,1,56.7,15.2l67.1,116.3a41.6,41.6,0,0,1-15.2,56.7h0A41.6,41.6,0,0,1,346.1,456L322,414.3Z" fill="#e07320"/>
        <path id="arm-right-shadow" d="M325,410.8s15.1,34.1,20.8,45.2c7,13.6,21.7,20.7,36,20.7a41.1,41.1,0,0,0,20.6-5.5A41.6,41.6,0,0,0,422,425.6a41.3,41.3,0,0,1-40.2,32c-14.4,0-25.5-10.5-35-22.6C332.9,417.4,325,410.8,325,410.8Z" fill="#af571d"/>
        <path id="arm-right-stroke" d="M294.1,283h0a41.6,41.6,0,0,1,56.7,15.2l67.1,116.3a41.6,41.6,0,0,1-15.2,56.7h0A41.6,41.6,0,0,1,346.1,456L322,414.3" fill="none" stroke="#3f1c0d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/>
        <path id="arm-left" d="M152.4,283h0a41.6,41.6,0,0,0-56.7,15.2L28.6,414.5a41.6,41.6,0,0,0,15.2,56.7h0A41.6,41.6,0,0,0,100.5,456l25.5-42.1Z" fill="#e07320"/>
        <path id="arm-left-shadow" d="M121.2,410.8s-15.1,34.1-20.8,45.2c-7,13.6-21.7,20.7-36,20.7a41.1,41.1,0,0,1-20.6-5.5,41.6,41.6,0,0,1-19.6-45.5,41.3,41.3,0,0,0,40.2,32c14.4,0,25.5-10.5,35-22.6C113.3,417.4,121.2,410.8,121.2,410.8Z" fill="#af571d"/>
        <path id="arm-left-stroke" d="M152.4,283h0a41.6,41.6,0,0,0-56.7,15.2L28.6,414.5a41.6,41.6,0,0,0,15.2,56.7h0A41.6,41.6,0,0,0,100.5,456l24.1-41.7" fill="none" stroke="#3f1c0d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/>
        <path id="neck-shadow" d="M351.9,300.1c-33.4,19.3-78.7,27.6-128.6,27.6s-95.2-8.3-128.6-27.6l1.1-1.9a41.6,41.6,0,0,1,40.4-20.5c25-27.9,56-44.4,89.5-44.4s64.3,16.4,89.3,44.1a41.6,41.6,0,0,1,40.2,20.4Z" fill="#af571d"/>
        <path id="belly" d="M304.8,435.8c0,46.9-36.5,85-81.5,85s-81.5-38-81.5-85S179.5,332,224.5,332,304.8,388.9,304.8,435.8Z" fill="#ee9e5c"/>
        <path d="M299.4,504.7a33,33,0,0,1-.4,4.9c-3.7,24.9-35.1,44.4-73.4,44.4s-69.8-19.5-73.4-44.5a32.7,32.7,0,0,1-.3-4.8h0a2.4,2.4,0,0,1,4.5-1.2c10.3,18.9,37.4,32.4,69.3,32.4s58.9-13.5,69.3-32.4a2.4,2.4,0,0,1,4.5,1.2h0Z" fill="#af571d"/>
        <path d="M165.7,533.3c39.9,27.3,80.5,27.7,120,0" fill="none" stroke="#3f1c0d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/>
      </g>
      <g id="head" class="head">
      <g id="ears" class="ears">
        <g>
          <circle cx="92.2" cy="53.9" r="48.9" fill="#e07320" stroke="#3f1c0d" stroke-miterlimit="10" stroke-width="10"/>
          <circle cx="93.1" cy="53.9" r="31.9" fill="#ee9e5c"/>
        </g>
        <g>
          <circle cx="351.6" cy="53.9" r="48.9" fill="#e07320" stroke="#3f1c0d" stroke-miterlimit="10" stroke-width="10"/>
          <circle cx="352.5" cy="53.9" r="31.9" fill="#ee9e5c"/>
        </g>
      </g>
      <path d="M409.6,176.9c0,94.7-83.5,130.1-186.4,130.1S36.8,271.6,36.8,176.9,120.3,5.4,223.2,5.4,409.6,82.2,409.6,176.9Z" fill="#e07320"/>
      <path id="head-stroke" d="M409.6,176.9c0,94.7-83.5,130.1-186.4,130.1S36.8,271.6,36.8,176.9,120.3,5.4,223.2,5.4,409.6,82.2,409.6,176.9Z" fill="none" stroke="#3f1c0d" stroke-miterlimit="10" stroke-width="10"/>
      <g id="eyes" class="eyes">
        <circle cx="291.1" cy="138" r="16.8" fill="#3f1c0c"/>
        <circle cx="287.3" cy="134.2" r="4.8" fill="#884d3a"/>
        <circle cx="155.3" cy="138" r="16.8" fill="#3f1c0c"/>
        <circle cx="152.3" cy="134.2" r="4.8" fill="#884d3a"/>
        <path d="M117.1,106.7l0.5-2.2,0.3-1.1,0.6-1.5a23.6,23.6,0,0,1,1.6-3.5l1.1-1.9,1.3-1.9,0.7-1,0.8-.9,1.7-1.9a33.4,33.4,0,0,1,14.1-8.3,36.2,36.2,0,0,1,5.3-1.1l2.6-.2h4.8l2.1,0.4,1.9,0.4,1.7,0.5,1.5,0.5,1.2,0.5,2.2,1.1a3.2,3.2,0,0,1-1.7,6h-0.4l-2-.2h-6.9l-1.7.2h-0.9l-0.9.2-1.9.3c-1.3.4-2.6,0.6-3.8,1.1a40.3,40.3,0,0,0-3.8,1.5,39.5,39.5,0,0,0-6.9,4.3l-1.4,1.3-0.7.6-0.6.7-1.2,1.3-1,1.3-1,1.2-0.8,1.1-0.7.9-0.6,1-1.2,1.9A3.2,3.2,0,0,1,117.1,106.7Z" fill="#3f1c0d"/>
        <path d="M323.4,109.2l-1.2-1.9-0.6-1-0.7-.9-0.8-1.1-1-1.2-1-1.3-1.2-1.3-0.6-.7-0.7-.6-1.4-1.3a31.6,31.6,0,0,0-10.7-5.8c-1.3-.5-2.6-0.7-3.8-1.1l-1.9-.3-0.9-.2h-0.9l-1.7-.2h-6.9l-2,.2h-0.4a3.2,3.2,0,0,1-1.7-6l2.2-1.1,1.2-.5,1.5-.5,1.7-.5,1.9-.4,2.1-.4h4.8l2.6,0.2a36.2,36.2,0,0,1,5.3,1.1,35.1,35.1,0,0,1,14.1,8.3l1.7,1.9,0.8,0.9,0.7,1,1.3,1.9,1.1,1.9a23.6,23.6,0,0,1,1.6,3.5l0.6,1.5,0.3,1.1,0.5,2.2A3.2,3.2,0,0,1,323.4,109.2Z" fill="#3f1c0d"/>
      </g>
      <g>
        <path class="snout" d="M308.5,230c0,43.6-40.2,52.6-87.3,52.6s-83.3-9-83.3-52.6,38.2-79,85.3-79S308.5,186.3,308.5,230Z" fill="#ee9e5c"/>
        <g class="nose">
          <path d="M197.6,187.5c0-11.1,11.5-11.7,25.6-11.7s25.6,0.7,25.6,11.7-11.5,20-25.6,20S197.6,198.6,197.6,187.5Z" fill="#3f1c0c"/>
          <path d="M227.5,201a13.9,13.9,0,0,1,.2,1.7v4.6a109.6,109.6,0,0,1-.4,14.3c-0.1,1.3-.3,2.6-0.5,3.9s-0.4,2.6-.7,3.8a34.2,34.2,0,0,1-.9,3.5,32.6,32.6,0,0,1-1.2,3,23.6,23.6,0,0,1-1.3,2.4l-1.2,1.8-1.2,1.4a2,2,0,0,1-3.5-1.6v-0.2s0.1-.6.3-1.7,0.2-1.1.3-1.8,0.3-1.5.4-2.4,0.1-.9.2-1.3,0.2-.9.2-1.4,0.3-2,.4-3.1,0.3-2.2.3-3.3,0.1-2.3.1-3.5a101.1,101.1,0,0,0-1-13.1q-0.4-2.7-.6-4.3a13.9,13.9,0,0,1-.2-1.7A5,5,0,0,1,227.5,201Z" fill="#3f1c0d"/>
          <path d="M233.7,244.2l-1.4.2-3.8.3H223l-3.1-.3-3.2-.4a46.8,46.8,0,0,1-6.2-1.4,53.2,53.2,0,0,1-5.3-1.9l-2-1-1.5-1-1.2-1a2.1,2.1,0,0,1,1.3-3.6h3.2l2,0.2,2.4,0.4,2.6,0.4L218,236l5.8,0.9,5.1,1,3.6,0.9,1.4,0.4A2.6,2.6,0,0,1,233.7,244.2Z" fill="#3f1c0d"/>
          <ellipse cx="223.4" cy="183.3" rx="11.7" ry="3.5" fill="#884d3a"/>
        </g>
      </g>
    </g>
      
      
      <g id="basket" transform="translate(150, 500)">
  <!-- Circular bottom of the basket -->
  <path d="M-80,-90 a140,50 0 0,1 275,0" fill="#af571d" stroke="#3f1c0d" stroke-width="3"/>
  <!-- Basket body -->
  <path d="M-80,-90 v70 a140,50 0 0,0 280,0 v-70 z" fill="#af571d" stroke="#3f1c0d" stroke-width="3"/>
  <!-- Smaller and lighter "X" Lines -->
  <path d="M-60,-70 L40,-30" stroke="#f1b07a" stroke-width="1.5"/> <!-- Diagonal line 1 -->
  <path d="M40,-70 L-60,-30" stroke="#f1b07a" stroke-width="1.5"/> <!-- Diagonal line 2 -->
  <path d="M-40,-70 L20,-30" stroke="#f1b07a" stroke-width="1.5"/> <!-- Diagonal line 3 -->
  <path d="M20,-70 L-40,-30" stroke="#f1b07a" stroke-width="1.5"/> <!-- Diagonal line 4 -->
  <path d="M-20,-70 L20,-30" stroke="#f1b07a" stroke-width="1.5"/> <!-- Diagonal line 3 -->

  <!-- Decorations -->
  <path d="M-40,0 Q -60 -20, -80 0 Z" fill="#e07320"/>
  <path d="M100,0 Q 120 -20, 140 0 Z" fill="#e07320"/>
</g>

    </g>
  </svg>
`);

// Event listeners for basket movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moveLeft = true;
    if (e.key === "ArrowRight") moveRight = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") moveLeft = false;
    if (e.key === "ArrowRight") moveRight = false;
});

// Generate random emoji
function generateItem() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    items.push({
        emoji: emoji.emoji,
        score: emoji.score,
        x: Math.random() * (canvasWidth - 20),
        y: -20,
        speed: 2 + Math.random() * 2
    });
}

// Update items and basket position
function updateGame() {
    if (moveLeft) basketX = Math.max(0, basketX - basketSpeed);
    if (moveRight) basketX = Math.min(canvasWidth - basketWidth, basketX + basketSpeed);

    // Update falling items
    for (let i = items.length - 1; i >= 0; i--) {
        items[i].y += items[i].speed;

        // Check for collision with basket
        if (
            items[i].x < basketX + basketWidth &&
            items[i].x + 20 > basketX &&
            items[i].y < basketY + basketHeight &&
            items[i].y + 20 > basketY
        ) {
            score += items[i].score;
            items.splice(i, 1); // Remove item
        } else if (items[i].y > canvasHeight) {
            items.splice(i, 1); // Remove item if it falls off-screen
        }
    }
}

// Draw items, basket, and score
function drawGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw basket
    ctx.drawImage(basketImg, basketX, basketY, basketWidth, basketHeight);

    // Draw falling items
    items.forEach((item) => {
        ctx.font = "32px Arial";
        ctx.fillText(item.emoji, item.x, item.y);
    });

    // Draw score
    document.getElementById("scoreboard").textContent = `Score: ${score}`;
}

// Game loop
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Start game
setInterval(generateItem, 1000);
gameLoop();
