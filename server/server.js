const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

app.get("/defineWord/:word", async (req, res) => {
  const word = req.params.word;
  const url = `https://api.datamuse.com/words?sp=${word}&md=d`;
  try {
    const response = await fetch(url)
    const result = await response.json();
    res.send(result);
  } catch (error) {
    console.log(error)
  }
});

app.get("/randomWord/:numberOfWords", async (req, res) => {
  const numberOfWords = Number(req.params.numberOfWords);
  const url = `https://api.datamuse.com/words?random=true`;
  const wordsGenerated = [];
  try {
    for (let i = 0; i < numberOfWords; i++) {
      const response = await fetch(url, options)
      const result = await response.json();
      wordsGenerated.push(result)
    }
    console.log(wordsGenerated)
    //res.send(result);
  } catch (error) {
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(port);
});
