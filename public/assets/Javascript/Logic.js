// Declaring Game constants & Variables
// ------------------------------------------------------------------------------------------------------
let SnakeVelocity = { x: 0, y: 0 };
const foodSound = new Audio("../public/assets/Music/food.mp3");
const gameOverSound = new Audio("../public/assets/Music/GameOver.wav");
const moveSound = new Audio("../public/assets/Music/move.mp3");
const Music = new Audio("../public/assets/Music/Snake Game Music.mp3");
let speed = 3;
let Score = 0;
let LastPaintTime = 0;
let SnakeArr = [{ x: 5, y: 5 }];
let a = 3;
let b = 15;
let Food = {
  x: Math.round(a + (b - a) * Math.random()),
  y: Math.round(a + (b - a) * Math.random()),
};
let isPaused = false;

// Setting Up Game Functions
// ------------------------------------------------------------------------------------------------------
// Game Loop

function main(CurrentTime) {
  if (!isPaused) {
    //Run the game if IsPaused is false
    Music.play();
    window.requestAnimationFrame(main);
    if ((CurrentTime - LastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    LastPaintTime = CurrentTime;
    GameEngine();
  }
}

// Event listener for the "Pause" button
document.getElementById("pause-button").addEventListener("click", function () {
  isPaused = true;
  Music.pause();
  GameOver.innerHTML = "Paused";
});

// Event listener for the "Play" button
document.getElementById("play-button").addEventListener("click", function () {
  isPaused = false;
  window.requestAnimationFrame(main);
  GameOver.innerHTML = " ";
});

function IsCollided(Snake) {
  // If the snake is bumped in itself
  for (let i = 1; i < SnakeArr.length; i++) {
    if (Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y) {
      return true;
    }
  }
  if (
    Snake[0].x >= 16 ||
    Snake[0].x <= 1 ||
    Snake[0].y >= 16 ||
    Snake[0].y <= 1
  ) {
    return true;
  }
  return false;
}

function GameEngine() {
  //  Part 1 : Updating the Snake Array & Food
  //   ----------------------------------------------------------------------------------------------------
  //   If the food has been eaten by the snake, Score gets increased and the food is displayed on the new location
  if (SnakeArr[0].x === Food.x && SnakeArr[0].y === Food.y) {
    foodSound.play();
    Score += 1;
    speed += 0.2;
    if (Score > HighScoreValue) {
      HighScoreValue = Score;
      localStorage.setItem("HighScore", JSON.stringify(HighScoreValue));
      HighScoreBox.innerHTML = "High Score : " + HighScoreValue;
    }
    ScoreBox.innerHTML = "Score : " + Score;
    SnakeArr.unshift({
      x: SnakeArr[0].x + SnakeVelocity.x,
      y: SnakeArr[0].y + SnakeVelocity.y,
    }); //Increase the size of the snake whenever the food is eaten by the snake

    Food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; //Relocates the food on new location
  }

  //   Moving the Snake
  for (let i = SnakeArr.length - 2; i >= 0; i--) {
    SnakeArr[i + 1] = { ...SnakeArr[i] }; //Creating a new object where the next block of the current snake points to the new snakes current block
  }

  SnakeArr[0].x += SnakeVelocity.x;
  SnakeArr[0].y += SnakeVelocity.y;

  // If snake gets collided with itself or in wall
  // ------------------------------------------------------------------------------------------------------------
  if (IsCollided(SnakeArr)) {
    Music.pause();
    gameOverSound.play();
    SnakeVelocity = { x: 0, y: 0 };
    GameOver.innerHTML = "Game Over ! Press any key to continue";
    SnakeArr = [{ x: 5, y: 5 }];
    document.addEventListener("keydown", function (event) {
      // Check if any key is pressed (this includes letters, numbers, and special keys)
      if (event.key) {
        // Reset game state
        Score = 0;
        ScoreBox.innerHTML = "Score: " + Score;
        speed = 3;
        document.removeEventListener("keydown", arguments.callee);
      }
    });
  }

  //  Part 2 : Displaying the Snake Array & Food
  //  ----------------------------------------------------------------------------------------------------
  //  Part 2.1 - Displaying the Snake
  board.innerHTML = "";
  SnakeArr.forEach((e, index) => {
    SnakeElement = document.createElement("div");
    SnakeElement.style.gridRowStart = e.y;
    SnakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      SnakeElement.classList.add("snakehead");
    } else {
      SnakeElement.classList.add("snakebody");
    }
    board.appendChild(SnakeElement);
  });

  //  Part 2.2 - Displaying the Food
  FoodElement = document.createElement("div");
  FoodElement.style.gridRowStart = Food.y;
  FoodElement.style.gridColumnStart = Food.x;
  FoodElement.classList.add("food");
  board.appendChild(FoodElement);
}

// Main Game Logic
// -------------------------------------------------------------------------------------------------------

let HighScore = localStorage.getItem("HighScore");
if (HighScore === null) {
  HighScoreValue = 0;
  localStorage.setItem("HighScore", JSON.stringify(HighScoreValue));
} else {
  HighScoreValue = JSON.parse(localStorage.getItem("HighScore"));
  HighScoreBox.innerHTML = "High Score : " + HighScoreValue;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  if (!isPaused) {
    SnakeVelocity = { x: 0, y: 1 }; //Game starts here
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        GameOver.innerHTML = " ";
        SnakeVelocity.x = 0;
        SnakeVelocity.y = -1;
        break;

      case "ArrowDown":
        console.log("ArrowDown");
        GameOver.innerHTML = " ";
        SnakeVelocity.x = 0;
        SnakeVelocity.y = 1;
        break;

      case "ArrowLeft":
        console.log("ArrowLeft");
        GameOver.innerHTML = " ";
        SnakeVelocity.x = -1;
        SnakeVelocity.y = 0;
        break;

      case "ArrowRight":
        console.log("ArrowRight");
        GameOver.innerHTML = " ";
        SnakeVelocity.x = 1;
        SnakeVelocity.y = 0;
        break;

      default:
        break;
    }
  }
});
