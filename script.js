//your code here
// Variables to keep track of game state
let snake = ["pixel21", "pixel20"]; // Starting position of snake's head and body
let food = null; // Food pixel location
let direction = "right"; // Direction of snake's movement
let score = 0;

// Create the food pixel in a random location
function createFood() {
  const randomIndex = Math.floor(Math.random() * 1600) + 1;
  food = "pixel" + randomIndex;
  document.getElementById(food).classList.add("food");
}

// Move the snake every 100ms
setInterval(() => {
  // Get the current position of the snake's head
  const currentHead = snake[0];

  // Calculate the new position of the snake's head based on its direction
  let newHead = null;
  switch (direction) {
    case "right":
      newHead = "pixel" + (parseInt(currentHead.slice(5)) + 1);
      break;
    case "left":
      newHead = "pixel" + (parseInt(currentHead.slice(5)) - 1);
      break;
    case "up":
      newHead = "pixel" + (parseInt(currentHead.slice(5)) - 40);
      break;
    case "down":
      newHead = "pixel" + (parseInt(currentHead.slice(5)) + 40);
      break;
  }

  // Check for collision with food
  if (newHead === food) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById(food).classList.remove("food");
    createFood();
  } else {
    // Remove the tail of the snake if it didn't collide with food
    const tail = snake.pop();
    document.getElementById(tail).classList.remove("snakeBodyPixel");
  }

  // Check for collision with walls or snake's body
  if (
    parseInt(newHead.slice(5)) < 1 ||
    parseInt(newHead.slice(5)) > 1600 ||
    snake.includes(newHead)
  ) {
    alert("Game Over!");
    location.reload();
  }

  // Add the new head of the snake
  snake.unshift(newHead);
  document.getElementById(newHead).classList.add("snakeBodyPixel");
}, 100);

// Change direction of snake based on arrow key presses
document.addEventListener("keydown", (event) => {
  switch (event.code) {

		      case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
});

