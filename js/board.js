import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let attempts = 0;
let seconds = 0;
let timer = null;

const attemptCounter = document.getElementById('attempt-counter');
const timerDisplay = document.getElementById('timer');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => handleCardFlip(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;
    if (cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;

    attempts++;
    attemptCounter.textContent = attempts;

    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchedPairs++;

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    const totalPairs = gameBoard.children.length / 2;

    if (matchedPairs === totalPairs) {
        stopTimer();

        const score = Math.max(0, 1000 - (attempts * 10) - (seconds * 2));

        setTimeout(() => {
            alert(`Onneksi olkoon! Löysit kaikki parit!

Yrityksiä: ${attempts}
Aika: ${seconds} s
Pisteet: ${score}`);
        }, 100);
    }

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

export function resetGameBoard() {
    gameBoard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;

    attempts = 0;
    attemptCounter.textContent = attempts;

    startTimer();
}

function startTimer() {
    clearInterval(timer);

    seconds = 0;
    timerDisplay.textContent = seconds;

    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}