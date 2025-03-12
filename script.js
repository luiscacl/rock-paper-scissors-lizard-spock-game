// Import confetti data
import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

// Getting DOM elements
const userIcons = document.querySelector(
  ".section-one-user-choice .icons"
).children;
const computerIconsData = document.querySelector(
  ".section-two-computer-choice .icons"
).children;
const computerIcons = Array.from(computerIconsData).filter(
  (el) => el.tagName !== "SPAN"
);
const results = document.querySelector(".results");
const userScore = document.querySelector(".section-one-user-choice .score");
const computerScore = document.querySelector(
  ".section-two-computer-choice .score"
);
const resetButton = document.querySelector("#reset-icon");

const choices = {
  rock: { defeats: ["scissors", "lizard"] },
  paper: { defeats: ["rock", "spock"] },
  scissors: { defeats: ["paper", "lizard"] },
  lizard: { defeats: ["paper", "spock"] },
  spock: { defeats: ["scissors", "rock"] },
};

let userChoice = "";
let computerChoice = "";

let userScoreCounter = 0;
let computerScoreCounter = 0;

for (let i = 0; i < userIcons.length; i++) {
  const icon = userIcons[i];
  // iconId++;

  icon.addEventListener("click", updateItemColor);
  icon.addEventListener("click", changeItemColor.bind(null, icon));
  icon.addEventListener("click", decideWinner);
}

function updateItemColor() {
  // ITEMS FORM USER
  for (let i = 0; i < userIcons.length; i++) {
    const icon = userIcons[i];

    if (icon.title === userChoice) {
      icon.style.color = "#1E90FF";
      break;
    }
  }

  // ITEMS FROM COMPUTER
  for (let i = 0; i < computerIcons.length; i++) {
    const icon = computerIcons[i];

    if (icon.title === computerChoice) {
      icon.style.color = "#EB2B34";
      break;
    }
  }
}

function changeItemColor(choice) {
  // ITEMS FORM USER
  userChoice = choice.title;
  choice.style.color = "black";

  // ITEMS FROM COMPUTER
  let randomComputerIcon =
    computerIcons[Math.floor(Math.random() * computerIcons.length)];
  computerChoice = randomComputerIcon.title;
  randomComputerIcon.style.color = "black";
}

function decideWinner() {
  if (userChoice === computerChoice) {
    results.innerHTML = "IT'S A TIE";
    stopConfetti();
    removeConfetti();
  } else if (
    choices[userChoice.toLowerCase()].defeats.indexOf(
      computerChoice.toLowerCase()
    ) >= 0
  ) {
    results.innerHTML = "YOU WON!";
    userScoreCounter++;
    computerScoreCounter--;
    startConfetti();
  } else {
    results.innerHTML = "YOU LOST!";
    userScoreCounter--;
    computerScoreCounter++;
    stopConfetti();
    removeConfetti();
  }

  userScore.innerHTML = `You ${userScoreCounter} points <span class="user-choice">--${userChoice}</span>`;
  computerScore.innerHTML = `Computer ${computerScoreCounter} points <span class="user-choice">--${computerChoice}</span>`;
}

resetButton.addEventListener("click", () => {
  userScoreCounter = 0;
  computerScoreCounter = 0;
  stopConfetti();
  removeConfetti();
  updateItemColor();

  userScore.innerHTML = `You ${userScoreCounter} points`;
  computerScore.innerHTML = `Computer ${computerScoreCounter} points`;
  results.innerHTML = "";
});
