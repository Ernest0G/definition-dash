const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const startGameButton = document.getElementById("start-game-button");
const howToPlayButton = document.getElementById("how-to-play-button");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const wordInput = document.getElementById("word-input");
const partOfSpeech = document.getElementById("part-of-speech");
const definition = document.getElementById("definition");
const correctCount = document.getElementById("correct-count");
const time = document.getElementById("time");

class Game {
  static timeLeft = 60;
  static wordsGenerated = [];
  static wordsCompleted = [];
  static wordsToDefine = [];
  static correctCount = 0;
  static currentWord;
  static isGameOver = true;

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
    const url = `http://localhost:5000/randomWord/${numberOfWords}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.wordsGenerated.push(...data);
    } catch (error) {
      console.log(error);
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
    console.log(this.currentWord);
  }

  static endGame() {
    this.isGameOver = true;
    this.wordsCompleted = this.wordsGenerated.splice(0, correctCount - 1);
  }
}

startGameButton.addEventListener("click", () => {
  startContainer.style.display = "none";
  gameContainer.style.display = "flex";
  Game.startGame();
});

howToPlayButton.addEventListener("click", () => {
  modal.showModal();
  modal.style.display = "flex";
});

closeModalButton.addEventListener("click", () => {
  modal.close();
  modal.style.display = "none";
});

wordInput.addEventListener("keyup", () => {
  Game.checkInput();
});
