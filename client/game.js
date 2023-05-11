const startContainer = document.getElementById("start-container");
const gameContainer = document.getElementById("game-container");
const startGameButton = document.getElementById("start-game-button");
const howToPlayButton = document.getElementById("how-to-play-button");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");
const wordInput = document.getElementById("word-input");
const definitionPartOfSpeech = document.getElementById(
  "definition-part-of-speech"
);
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
  static inputValue = wordInput.value;
  static isGameOver = true;

  static async startGame() {
    await this.generateWords(5);
    // await this.getWordDefinition(5).then(() => {
    //   this.setCurrentWord();
    // })
    console.log(this.wordsGenerated)
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

  static async testAPI() {
    //This generates a random word and also defines it
    const url = `https://api.datamuse.com/words?max=10&random=true`;
    const response = await fetch(url);
    const words = await response.json();
    console.log(words)
    return words.map(wordObj => wordObj.word);
  }

  static async generateWords(numberOfWords) {
    try {
      const response = await fetch(`http://localhost:5000/randomWord/${numberOfWords}`);
      const data = await response.json();
      this.wordsToDefine.push(...data);
      console.log({ 'Words Generated': this.wordsToDefine })
    } catch (error) {
      console.log(error)
    }

  }

  static generateRandomNumber(length) {
    return Math.floor(Math.random() * length);
  }

  static async getWordDefinition(defineCount) {
    for (let i = this.correctCount; i < this.correctCount + defineCount; i++) {
      const url = `http://localhost:5000/defineWord/${this.wordsToDefine[i]}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      // this.wordsGenerated.push({
      //   word: wordData.word,
      //   definition: randomDefinition,
      //   partOfSpeech: randomMeaning.partOfSpeech,
      // });
    }
  }

  static skipWord() {
    this.timeLeft -= 3;
  }

  static checkInput(input) {
    if (input === this.currentWord.word && !this.isGameOver) {
      this.inputValue, wordInput.value = "";
      this.timeLeft += 6;
      this.correctCount++;
      correctCount.textContent = this.correctCount;
      this.setCurrentWord();
      //I need to make sure there are generated words and definitions ahead of time
      if (this.correctCount >= this.wordsGenerated.length - 2) {
        this.generateWords(3).then(() => {
          this.getWordDefinition(3);
        });

      }
    }
  }

  static async setCurrentWord() {
    this.currentWord = this.wordsGenerated[this.correctCount];
    definitionPartOfSpeech.textContent = this.currentWord.partOfSpeech;
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
  Game.testAPI()
});

closeModalButton.addEventListener("click", () => {
  modal.close();
  modal.style.display = "none";
});

wordInput.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    Game.inputValue = Game.inputValue.slice(0, Game.inputValue.length - 1);
  } else {
    Game.inputValue += event.key;
  }
  Game.checkInput(Game.inputValue);
});
