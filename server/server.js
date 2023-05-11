const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

app.get("/randomWord/:numberOfWords", async (req, res) => {
  try {
    const numberOfWords = Number(req.params.numberOfWords);
    const wordsGenerated = [];
    const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };
    const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true?limit=${numberOfWords}`)
    const result = await response.json();
    console.log(...result)
    wordsGenerated.push(...result)
    console.log(wordsGenerated)
    res.send(wordsGenerated);
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
});

// app.get("/defineWord/:word", async (req, res) => {
//   const word = req.params.word;
//   console.log(word)
//   const url = `https://api.datamuse.com/words?sp=${word}&md=d`;
//   try {
//     const response = await fetch(url)
//     const result = await response.json();
//     res.send(result);
//   } catch (error) {
//     console.log(error)
//   }
// });



app.listen(port, () => {
  console.log(port);
});
