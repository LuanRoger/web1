const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

const messages = [];

app.use(express.json());
app.use(cors());

app.get("/mensagens", (req, res) => {
  if (messages.length === 0) {
    res.status(404).send("No messages found");
    return;
  }

  res.json(messages);
});

app.post("/mensagens", (req, res) => {
  if (!req.body) {
    res.status(400).send("Bad Request: Body is missing");
    return;
  }

  const { texto } = req.body;
  if (!texto) {
    res.status(400).send("Bad Request: Missing text in body");
    return;
  }
  messages.push({ texto });

  res.json(messages);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
