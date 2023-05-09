const express = require("express");
const app = express();
const port = 5000;

app.get("/defineWord", (req, res) => {
  res.send("Defnition");
});

app.listen(port, () => {
  console.log(port);
});
