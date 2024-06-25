// app.js

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let fireworksContainer = document.querySelector("#fireworks");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  fireworksContainer.innerHTML = '';  // clear fireworks and confetti
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  triggerCelebration();
}

const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const triggerCelebration = () => {
  for (let i = 0; i < 20; i++) {  // Increase number of fireworks
    createFirework();
  }
  for (let i = 0; i < 200; i++) {  // Increase number of confetti
    createConfetti();
  }
}

const createFirework = () => {
  let firework = document.createElement("div");
  firework.className = "firework";
  firework.style.left = Math.random() * 100 + "vw";
  firework.style.top = Math.random() * 100 + "vh";
  fireworksContainer.appendChild(firework);
  setTimeout(() => firework.remove(), 1000); // remove after animation
}

const createConfetti = () => {
  let confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = Math.random() * 100 + "vw";
  fireworksContainer.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2000); // remove after animation
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
