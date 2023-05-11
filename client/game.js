//Start Menu Elements
const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const gameSetUpButton = document.getElementById("game-setup-button");
const howToPlayButton = document.getElementById("how-to-play-button");
const howToPLayModal = document.getElementById("how-to-play-modal");
const closeHowToPlayModalButton = document.getElementById(
  "close-how-to-play-modal"
);
const startOptionsModal = document.getElementById("start-options-modal");
const startGameButton = document.getElementById("start-game-button");
const closeStartOptionsModalButton = document.getElementById(
  "close-start-options-modal"
);
const difficultySelector = document.getElementById("difficulty");

//Game Screen ELements
const wordInput = document.getElementById("word-input");
const partOfSpeech = document.getElementById("part-of-speech");
const definition = document.getElementById("definition");
const correctCount = document.getElementById("correct-count");
const time = document.getElementById("time");

class Game {
  static timeLeft = 60;
  static wordsGenerated = [];
  static wordsCompleted = [];
  static correctCount = 0;
  static currentWord;
  static isGameOver = true;
  static gameDifficulty;

  static async startGame() {
    await this.generateWords(4);
    await this.setCurrentWord();

    this.isGameOver = false;
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

  static async generateWords(numberOfWords) {
    const url = `http://localhost:5000/randomWord/${numberOfWords}/${this.gameDifficulty}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.wordsGenerated.push(...data);
    } catch (error) {
      console.log({ error: error.message });
    }
  }

  static skipWord() {
    this.timeLeft -= 3;
  }

  static checkInput() {
    if (wordInput.value === this.currentWord.word && !this.isGameOver) {
      wordInput.value = "";
      this.timeLeft += 6;
      this.correctCount++;
      correctCount.textContent = this.correctCount;
      this.setCurrentWord();
      //I need to make sure there are generated words ahead of time
      if (this.correctCount >= this.wordsGenerated.length - 2) {
        this.generateWords(3).then(() => {
          this.setCurrentWord();
        });
      }
    }
  }

  static async setCurrentWord() {
    this.currentWord = this.wordsGenerated[this.correctCount];
    partOfSpeech.textContent = this.currentWord.partOfSpeech;
    definition.textContent = this.currentWord.definition;
  }

  static endGame() {
    this.isGameOver = true;
    this.wordsCompleted = this.wordsGenerated.splice(0, correctCount - 1);
  }
}

gameSetUpButton.addEventListener("click", () => {
  startOptionsModal.showModal();
  startOptionsModal.style.display = "flex";
});

closeStartOptionsModalButton.addEventListener("click", () => {
  startOptionsModal.close();
  startOptionsModal.style.display = "none";
});

howToPlayButton.addEventListener("click", () => {
  howToPLayModal.showModal();
  howToPLayModal.style.display = "flex";
});

closeHowToPlayModalButton.addEventListener("click", () => {
  howToPLayModal.close();
  howToPLayModal.style.display = "none";
});

startGameButton.addEventListener("click", () => {
  startOptionsModal.close();
  startOptionsModal.style.display = "none";
  Game.gameDifficulty = difficultySelector.value;
  startContainer.style.display = "none";
  gameContainer.style.display = "flex";
  Game.startGame();
});

wordInput.addEventListener("keyup", () => {
  Game.checkInput();
});
