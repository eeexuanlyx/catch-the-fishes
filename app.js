/*-------------- Constants -------------*/
const holesElement = document.querySelectorAll(".hole");
const scoreElement = document.querySelector("#score");
const messageElement = document.querySelector("#message");
const baitElement = document.querySelector("#bait");
const timerElement = document.querySelector("#timer");
const startButtonElement = document.querySelector(".button-start");
const pauseButtonElement = document.querySelector(".button-pause");
const resetButtonElement = document.querySelector(".button-reset");

/*---------- Variables (state) ---------*/
let score = 0;
let message = "";
let bait = "10";
let timeUp = false;
let gameStarted = false;
let gameOver = false;
/*----- Cached Element References  -----*/

/*-------------- Functions -------------*/

function init() {
  score = 0;
  message = "";
  bait = 10;
  gameStarted = false;
  gameOver = false;
  render();
  baitElement.textContent = 10;
  scoreElement.textContent = 0;
  messageElement.textContent = "Click Start to begin!";
}

function render() {
  updateMessage();
}

function updateMessage() {
  if (bait === 0 && score < 5) {
    gameOver = true;
    gameStarted = false;
    messageElement.textContent = "Game Over, you lose! Try again?";
  }
  if (score > 4) {
    gameOver = true;
    gameStarted = false;
    messageElement.textContent = "Game Over, you win!";
  }
}

function startGame() {
  if (!gameStarted) {
    init();
    gameStarted = true;
    fishAppears();
  }
  if (gameOver && !gameStarted) {
    //If game not started, then the start button can be clicked
    //Prevents clicking of start button twice
    init();
    gameStarted = true;
    fishAppears();
  }
}

function resetGame() {
  init();
  gameOver = true;
}

function pauseGame() {
  switch (pauseButtonElement.textContent.toLowerCase()) {
    case "pause":
      gameOver = true; //to pause fishes from coming out
      pauseButtonElement.textContent = "Resume";
      resetButtonElement.disabled = true;
      messageElement.textContent = "Game Paused, click resume!";
      break;
    case "resume":
      gameOver = false;
      // to spawn the fish again
      fishAppears();
      pauseButtonElement.textContent = "Pause";
      resetButtonElement.disabled = false;
      messageElement.textContent = "Game Resumed, continue catching!";
      break;
  }
}

function fishAppears() {
  const time = randomTime(300, 1000);
  const idx = Math.floor(Math.random() * holesElement.length);
  holesElement[idx].classList.add("fish");
  setTimeout(() => {
    holesElement[idx].classList.remove("fish");
    if (!gameOver) fishAppears();
  }, time);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//reduce the bait whenever the user attemps to catch
//if user catches the fish, 1 point is added
function handleFishClick(e) {
  if (!gameOver) {
    if (bait !== 0) {
      bait -= 1;
    }
    baitElement.textContent = bait;
    if (e.target.classList.contains("fish")) {
      score += 1;
      this.classList.remove("fish");
      scoreElement.textContent = score;
      messageElement.textContent = "Great Catch!";
    } else {
      messageElement.textContent = "Aww... you missed!";
    }
    render();
  }
}

/*----------- Event Listeners ----------*/
init();
holesElement.forEach((hole) => hole.addEventListener("click", handleFishClick));
startButtonElement.addEventListener("click", startGame);
pauseButtonElement.addEventListener("click", pauseGame);
resetButtonElement.addEventListener("click", resetGame);
