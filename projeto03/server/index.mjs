import express from "express";
import { EVENT_DATA, PLAYERS_DATA } from "./constants.mjs";

const app = express();
const port = 3000;

app.get("/event", (_, res) => {
  res.json(EVENT_DATA);
});

app.get("/players", (_, res) => {
  res.json(PLAYERS_DATA);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
