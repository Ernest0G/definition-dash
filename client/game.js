import randomWords from 'random-words'

const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const startGameButton = document.getElementById('start-game-button');
const howToPlayButton = document.getElementById('how-to-play-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');

const definitionCategory = document.getElementById('definition').innerText;
const definition = document.getElementById('definition').innerText;
const correctCount = document.getElementById('correct-count').innerText;
const time = document.getElementById('time').innerText;
const wordInput = document.getElementById('word-input');

let userInput = '';
let timeLeft = 30;
const wordsGenerated = [...randomWords(20)];

while (timeLeft != 0) {
    timeLeft--;
}

startGameButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
});

howToPlayButton.addEventListener('click', () => {
    modal.showModal();
    modal.style.display = 'flex';
});

closeModalButton.addEventListener('click', () => {
    modal.close();
    modal.style.display = 'none';
});

wordInput.addEventListener('keydown', (event) => {
    userInput
})