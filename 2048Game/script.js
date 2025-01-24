var arr, score;

window.onload = () => {
  init();
  setupEventListeners();
};

function init() {
  arr = document.getElementsByClassName("element");
  score = document.getElementById("score");
  score.innerHTML = 0;

  for (let element of arr) {
    element.innerHTML = "";
  }

  showElement("splash");
  hideElement("game");
}

function start() {
  hideElement("splash");
  showElement("game");
  spawnRandomTile();
  spawnRandomTile();
}

function reset() {
  init();
  start();
}

function pause() {
  showElement("pause");
  hideElement("control");
}

function resume() {
  hideElement("pause");
  showElement("control");
}

function move(direction) {
  const moveOffsets = {
    left: -1,
    right: 1,
    up: -4,
    down: 4,
  };

  const boundaries = {
    left: (i) => i % 4 !== 0,
    right: (i) => (i + 1) % 4 !== 0,
    up: (i) => i >= 4,
    down: (i) => i < 12,
  };

  let canMove = false;

  for (
    let i = direction === "right" || direction === "down" ? 15 : 0;
    i >= 0 && i < 16;
    i += direction === "right" || direction === "down" ? -1 : 1
  ) {
    if (!arr[i].innerHTML) continue;

    let current = i;
    while (
      boundaries[direction](current) &&
      (arr[current + moveOffsets[direction]].innerHTML === "" ||
        arr[current + moveOffsets[direction]].innerHTML ===
          arr[current].innerHTML)
    ) {
      let next = current + moveOffsets[direction];
      if (arr[next].innerHTML === arr[current].innerHTML) {
        arr[next].innerHTML = parseInt(arr[next].innerHTML) * 2;
        score.innerHTML =
          parseInt(score.innerHTML) + parseInt(arr[next].innerHTML);
        arr[current].innerHTML = "";
        canMove = true;
        break;
      } else if (arr[next].innerHTML === "") {
        arr[next].innerHTML = arr[current].innerHTML;
        arr[current].innerHTML = "";
        current = next;
        canMove = true;
      }
    }
  }

  if (canMove) {
    spawnRandomTile();
    checkGameOver();
  }
}

function spawnRandomTile() {
  const emptyTiles = Array.from(arr).filter((tile) => tile.innerHTML === "");
  if (emptyTiles.length > 0) {
    emptyTiles[Math.floor(Math.random() * emptyTiles.length)].innerHTML = 2;
  }
}

function checkGameOver() {
  for (let i = 0; i < 16; i++) {
    if (arr[i].innerHTML === "") return;

    const neighbors = [
      i % 4 !== 3 ? i + 1 : -1, // Right
      i % 4 !== 0 ? i - 1 : -1, // Left
      i >= 4 ? i - 4 : -1, // Up
      i < 12 ? i + 4 : -1, // Down
    ];

    if (
      neighbors.some(
        (neighbor) =>
          neighbor >= 0 && arr[neighbor].innerHTML === arr[i].innerHTML
      )
    ) {
      return;
    }
  }
  alert(`Game Over! Your Score: ${score.innerHTML}`);
  reset();
}

function showElement(id) {
  document.getElementById(id).style.display = "block";
}

function hideElement(id) {
  document.getElementById(id).style.display = "none";
}

function setupEventListeners() {
  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
      move(e.code.replace("Arrow", "").toLowerCase());
    }
  });
}
