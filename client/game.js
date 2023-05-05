
const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const startGameButton = document.getElementById('start-game-button');
const howToPlayButton = document.getElementById('how-to-play-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const wordInput = document.getElementById('word-input');

const definitionCategory = document.getElementById('definition');
const definition = document.getElementById('definition');
const correctCount = document.getElementById('correct-count');
const time = document.getElementById('time');


let inputValue = wordInput.value;
let isGameOver = true;
let testWord = 'word'

class Game {
    static timeLeft = 30;
    static wordsGenerated = [];
    static wordsCompleted = {};
    static correctCount = 0;

    static startGame() {
        this.generateWords();
        isGameOver = false;
        wordInput.focus();
        const gameClock = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                time.textContent = this.timeLeft;
            } else {
                clearInterval(gameClock);
                this.endGame();
            }
        }, 1000);
    }


    static endGame() {
        isGameOver = true;
    }

    static generateWords() {

    }

    static checkInput(input) {
        if (input === testWord) {
            this.timeLeft += 6;
            this.correctCount++;
            correctCount.textContent = this.correctCount;
            wordInput.value = '';
            inputValue = '';
        }
    }
}


startGameButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    Game.startGame();
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
    if (event.key === 'Backspace') {
        inputValue = inputValue.slice(0, inputValue.length - 1)
    } else {
        inputValue += event.key;
    }
    Game.checkInput(inputValue);
})