const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", pickCell);
});

let grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let turn = "X";

function checkWinner() {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    // Row
    if (grid[i][0] && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return grid[i][0];
    }

    // Column
    if (grid[0][i] && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
      return grid[0][i];
    }
  }

  // Check diagonals
  if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return grid[0][0];
  }
  if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return grid[0][2];
  }

  return null;
}

let winner = null;

function pickCell(e) {
  if (!winner) {
    const target = e.target.id.split("-");
    const cell = document.getElementById(e.target.id);

    // Make sure that cell isn't already claimed
    if (grid[target[0]][target[1]] == null) {
      // Change the array
      grid[target[0]][target[1]] = turn;
      // Change the html
      cell.innerText = turn;

      turn = turn == "X" ? "O" : "X";
    }

    winner = checkWinner();
    if (winner) {
      const wl = document.getElementById("winner");
      wl.innerText = winner + " " + "Won!";

      const pa = document.getElementById("play-again");
      pa.innerHTML = '<a href="/games/tic-tac-toe.html">Play Again?</a>';
    }
  }
}
