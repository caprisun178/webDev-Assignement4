const options = document.querySelectorAll(".throw-option");
const playAgainBtn = document.getElementById("playAgainBtn");

const computerImg = document.getElementById("computerImg");
const computerText = document.getElementById("computerText");
const outcomeText = document.getElementById("outcomeText");

const winsCount = document.getElementById("winsCount");
const lossesCount = document.getElementById("lossesCount");
const tiesCount = document.getElementById("tiesCount");
const resetScoreBtn = document.getElementById("resetScoreBtn");

let locked = false;

let wins = 0;
let losses = 0;
let ties = 0;

const pics = {
  rock: "images/rock.PNG",
  paper: "images/paper.PNG",
  scissors: "images/scissors.PNG",
  question: "images/question-mark.PNG"
};

function clearSelected() {
  options.forEach((opt) => {
    const b = opt.querySelector(".throw-btn");
    b.classList.remove("selected");
  });
}

function updateScore() {
  if (winsCount) winsCount.textContent = wins;
  if (lossesCount) lossesCount.textContent = losses;
  if (tiesCount) tiesCount.textContent = ties;
}

function resetGameScreen() {
  locked = false;
  clearSelected();

  if (computerImg) computerImg.src = pics.question;
  if (computerText) computerText.textContent = "Waiting...";
  if (outcomeText) outcomeText.textContent = "Choose rock, paper, or scissors to start.";
}

function winner(player, comp) {
  if (player === "rock" && comp === "rock") return "tie";
  if (player === "rock" && comp === "paper") return "loss";
  if (player === "rock" && comp === "scissors") return "win";

  if (player === "paper" && comp === "rock") return "win";
  if (player === "paper" && comp === "paper") return "tie";
  if (player === "paper" && comp === "scissors") return "loss";

  if (player === "scissors" && comp === "rock") return "loss";
  if (player === "scissors" && comp === "paper") return "win";
  if (player === "scissors" && comp === "scissors") return "tie";

  return "tie";
}

function doComputerTurn(playerChoice) {
  locked = true;

  if (computerText) computerText.textContent = "Thinking...";
  if (outcomeText) outcomeText.textContent = "Computer is choosing...";

  const arr = ["rock", "paper", "scissors"];
  let i = 0;

  const shuffleTimer = setInterval(() => {
    const show = arr[i % 3];
    if (computerImg) computerImg.src = pics[show];
    i++;
  }, 500);

  setTimeout(() => {
    clearInterval(shuffleTimer);

    const compChoice = arr[Math.floor(Math.random() * 3)];
    if (computerImg) computerImg.src = pics[compChoice];
    if (computerText) computerText.textContent = compChoice;

    const result = winner(playerChoice, compChoice);

    if (result === "win") {
      wins++;
      if (outcomeText) outcomeText.textContent = "You win!";
    } else if (result === "loss") {
      losses++;
      if (outcomeText) outcomeText.textContent = "You lose!";
    } else {
      ties++;
      if (outcomeText) outcomeText.textContent = "Tie!";
    }

    updateScore();
    locked = false;
  }, 3000);
}

options.forEach((opt) => {
  const btn = opt.querySelector(".throw-btn");

  btn.addEventListener("click", () => {
    if (locked) return;

    clearSelected();
    btn.classList.add("selected");

    const playerChoice = opt.dataset.throw;
    doComputerTurn(playerChoice);
  });
});

if (playAgainBtn) {
  playAgainBtn.addEventListener("click", () => {
    resetGameScreen();
  });
}

if (resetScoreBtn) {
  resetScoreBtn.addEventListener("click", () => {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScore();
  });
}

updateScore();
resetGameScreen();