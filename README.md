## Bear Basket Drop - A Simple JavaScript Game

This is an emoji-catching game where a bear character catches falling emojis using a basket. The goal is to catch as many emojis as possible and avoid the negative items. 

### Features
- **Canvas-based Game**: The game runs on an HTML5 canvas, making it interactive and visually engaging.
- **Basket (Bear SVG)**: The player controls a basket in the form of a cute bear to catch falling emojis.
- **Falling Items**: Emojis such as 🎨, 🖌️, 📙, 🎧, etc., fall from the top of the canvas. Positive emojis add to the score, while negative ones (like 💣,🩴and 🧱) decrease the score.
- **Scoring System**: Each positive emoji gives +1 score, while negative emojis deduct 1 point.
- **Birthday Message**: If the score reaches a certain threshold, a special birthday message will be displayed.

### Game Setup

1. **HTML File**:
   - A basic HTML structure that contains a `<canvas>` element.
   - The canvas is where the game graphics are drawn.

2. **JavaScript (game.js)**:
   - **Canvas Setup**: Defines the width and height of the canvas, which is used to position the falling emojis and the basket.
   - **Basket Movement**: The player can move the basket left and right by pressing the arrow keys.
   - **Falling Emojis**: Emojis fall at random positions and speeds. Each emoji has a score value.
   - **Game Loop**: A loop is used to update the canvas, move the falling items, and check for collisions between the basket and emojis.

### How to Play
1. Open the game in a web browser.
2. Use the **left** and **right arrow keys** to move the basket.
3. Try to catch the positive emojis and avoid the negative ones.
4. Collect as many points as possible.

### How to Run
1. Clone the repository or download the game files.
2. Open the `index.html` file in a browser.
3. Enjoy playing the game!
   OR
Go to the link below!

https://sara-codess.github.io/Basket_Game/
