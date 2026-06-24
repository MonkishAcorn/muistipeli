import { createBoard, resetGameBoard } from './board.js';

function startGame() {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);

    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }

    resetGameBoard();
    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    document.getElementById('restart-button')
        .addEventListener('click', startGame);
});