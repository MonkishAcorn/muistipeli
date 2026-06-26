import { createBoard, resetGameBoard } from './board.js';

function startGame() {
    const cardCount = parseInt(
        document.getElementById('card-count').value,
        10
    );

    resetGameBoard();
    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    document.getElementById('restart-button')
        .addEventListener('click', startGame);
});