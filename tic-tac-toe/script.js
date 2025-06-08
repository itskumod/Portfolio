const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatusText();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? 'X' : 'O';

  if (checkWin(currentClass)) {
    statusText.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
    endGame();
  } else if (isDraw()) {
    statusText.textContent = "Draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
    setStatusText();
  }
}

function setStatusText() {
  statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

restartBtn.addEventListener('click', startGame);

// Initialize game on first load
startGame();
