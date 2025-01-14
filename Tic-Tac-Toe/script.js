const board = document.getElementById("board");
const squares = document.querySelectorAll(".square");
const players = ["X", "O"];
let currentPlayer = players[0];
let gameOver = false;

const endMessage = document.createElement("h2");
endMessage.textContent = "X's turn";
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    if (squares[i].textContent !== "" || gameOver) {
      return;
    }
    squares[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      endMessage.textContent = `Game Over! ${currentPlayer} wins!`;
      gameOver = true;
      return;
    }
    if (checkTie()) {
      endMessage.textContent = `Game Over! It is a tie!`;
      gameOver = true;
      return;
    }
    currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    if (currentPlayer == players[0]) {
      endMessage.textContent = `X's turn!`;
    } else {
      endMessage.textContent = `O's turn!`;
    }
  });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (
      squares[a].textContent == currentPlayer &&
      squares[b].textContent == currentPlayer &&
      squares[c].textContent == currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent == "") {
      return false;
    }
  }
  return true;
}

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = "X's turn";
  currentPlayer = players[0];
  gameOver = false;
}
