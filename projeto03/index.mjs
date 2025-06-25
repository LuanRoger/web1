import express from "express";
import { INDEX_PATH } from "./constants.mjs";
import { serverStaticFilesMiddleware } from "./middlewares.mjs";

const app = express();
const port = 3000;

app.use(serverStaticFilesMiddleware);

app.get("/", (_, res) => {
  res.sendFile(INDEX_PATH);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
