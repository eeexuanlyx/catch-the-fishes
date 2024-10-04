/*-------------- Constants -------------*/
const holesElement = document.querySelectorAll(".hole");
const scoreElement = document.querySelector("#score");
const messageElement = document.querySelector("#message");
const baitElement = document.querySelector("#bait");
const timerElement = document.querySelector("#timer");
const startButtonElement = document.querySelector(".button-start");
const stopButtonElement = document.querySelector(".button-stop");
const resetButtonElement = document.querySelector(".button-reset");

/*---------- Variables (state) ---------*/
let lastHole;
let score = 0;
let message = "";
let bait = "10";
let timeUp = false;
let currentHole = "";
/*----- Cached Element References  -----*/

/*-------------- Functions -------------*/
function startGame() {
  fishAppears();
}

function fishAppears() {
  const time = randomTime(300, 1000);
  const idx = Math.floor(Math.random() * holesElement.length);
  holesElement[idx].classList.add("fish");
  setTimeout(() => {
    holesElement[idx].classList.remove("fish");
    if (!timeUp) fishAppears();
  }, time);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function handleFishClick(e) {
  bait -= 1;
  baitElement.textContent = bait;
  if (e.target.classList.contains("fish")) {
    score += 1;
    this.classList.remove("fish");
    scoreElement.textContent = score;
  }
}

function checkScore() {
  if (score === 10) {
    messageElement.textContent = "You Win!";
  }
}

/*----------- Event Listeners ----------*/
holesElement.forEach((hole) => hole.addEventListener("click", handleFishClick));
startButtonElement.addEventListener("click", startGame);
