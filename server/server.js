const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 5000;
const apiKey = process.env.WORDS_API_KEY;

app.use(express.json());
app.use(cors());

app.get("/randomWord/:numberOfWords", async (req, res) => {
  const numberOfWords = Number(req.params.numberOfWords);
  const wordsGenerated = [];
  const url = `https://wordsapiv1.p.rapidapi.com/words/?random=true&hasDetails=definitions&difficulty=easy&lettersMax=4`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };
  try {
    for (let i = 0; i < numberOfWords; i++) {
      const response = await fetch(url, options);
      const result = await response.json();
      wordsGenerated.push({
        word: result.word,
        definition: result.results[0].definition,
        partOfSpeech: result.results[0].partOfSpeech,
      });
    }
    res.send(wordsGenerated);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(port);
});
