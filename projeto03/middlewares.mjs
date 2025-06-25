import express from "express";
import { join } from "path";
import { __dirname } from "./constants.mjs";

export const serverStaticFilesMiddleware = express.static(
  join(__dirname, "static")
);
