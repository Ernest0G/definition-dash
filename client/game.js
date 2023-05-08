
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
let setCurrentWord = {};
class Game {
    static timeLeft = 30;
    static wordsGenerated = [];
    static wordsCompleted = [];
    static wordsToDefine = [];
    static correctCount = 0;

    static startGame() {
        this.wordsToDefine.push(...this.generateWords(1));
        console.log(this.wordsToDefine)
        this.getWordDefinition();
        this.setCurrentWord();
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

    static generateWords(numberOfWords) {
        let words = [];

        for (let i = 0; i < numberOfWords; i++) {
            fetch(`https://random-word-api.herokuapp.com/word`)
                .then(response => response.json())
                .then(data => {
                    words.push(...data)
                })
        }

        return words;
    }

    static generateRandomNumber(length) {
        return Math.floor(Math.random() * length)
    }

    static async getWordDefinition() {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.wordsToDefine[correctCount]}`
        console.log(this.wordsToDefine[0])
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const wordData = data[this.generateRandomNumber(data.length)];
                const meanings = wordData.meanings;
                const randomMeaningsIndex = this.generateRandomNumber(meanings.length)
                const randomMeaning = meanings[randomMeaningsIndex]
                const definitions = randomMeaning.definitions;
                const randomDefinitionIndex = this.generateRandomNumber(definitions.length);
                const randomDefinition = definitions[randomDefinitionIndex].definition;

                this.wordsGenerated.push({
                    word: wordData.word,
                    definition: randomDefinition,
                    partOfSpeech: randomMeaning.partOfSpeech
                })
            })
        console.log(this.wordsGenerated)
    }

    static checkInput(input) {
        if (input === setCurrentWord.word && !isGameOver) {
            inputValue = '';
            wordInput.value = '';
            this.timeLeft += 6;
            this.correctCount++;
            correctCount.textContent = this.correctCount;
            this.setCurrentWord();
        }
    }

    static setCurrentWord() {
        const currentWord = this.wordsGenerated[correctCount];
        definitionCategory.textContent = currentWord.partOfSpeech;
        definition.textContent = currentWord.definition;

    }

    static endGame() {
        isGameOver = true;
        this.wordsCompleted = this.wordsGenerated.splice(0, correctCount - 1)
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