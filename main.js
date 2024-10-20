const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function handleClick(event, index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (isBoardFull()) {
        statusElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < winPatterns.length; i++) {
        const pattern = winPatterns[i];
        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;

    // Clear the board UI by removing child elements
    clearBoard();
    createBoard();
}

function clearBoard() {
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', (event) => handleClick(event, i));
        boardElement.appendChild(cellElement);
    }
}

createBoard();
statusElement.textContent = `Player ${currentPlayer}'s turn`;
