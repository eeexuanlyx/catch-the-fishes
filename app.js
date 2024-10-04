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
  timeUp = false;
  gameStarted = false;
  gameOver = false;
  render();
  messageElement.textContent = "Click Start to begin!";
  baitElement.textContent = 10;
  scoreElement.textContent = 0;
}

function render() {
  updateMessage();
}

function updateMessage() {
  if (bait === 0 && score < 5) {
    gameOver = true;
    gameStarted = false;
    messageElement.textContent = "Game Over, you lose!";
  }
  if (score > 4) {
    gameOver = true;
    gameStarted = false;
    messageElement.textContent = "Game Over, you win!";
  }
}

function startGame() {
  if (gameStarted === false) {
    init();
    gameStarted = true;
    fishAppears();
  }
  if (gameOver === true && gameStarted === false) {
    //if game not started, then the start button can be clicked
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
  switch (pauseButtonElement.textContent) {
    case "Pause":
      gameOver = true; //to pause fishes from coming out
      pauseButtonElement.textContent = "Resume";
      break;
    case "Resume":
      gameOver = false;
      // to spawn the fish again
      fishAppears();
      pauseButtonElement.textContent = "Pause";
      break;
  }
}

function fishAppears() {
  const time = randomTime(300, 1000);
  const idx = Math.floor(Math.random() * holesElement.length); //to spawn fish randomly
  holesElement[idx].classList.add("fish");
  setTimeout(() => {
    holesElement[idx].classList.remove("fish");
    if (!timeUp && gameOver === false) fishAppears();
  }, time);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function handleFishClick(e) {
  if (gameOver === false) {
    if (bait !== 0) {
      bait -= 1;
    }
    baitElement.textContent = bait;
    if (e.target.classList.contains("fish")) {
      score += 1;
      this.classList.remove("fish");
      scoreElement.textContent = score;
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
