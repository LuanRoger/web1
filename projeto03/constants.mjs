import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const PAGE_INDEX = "/static/index.html";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const INDEX_PATH = join(__dirname, PAGE_INDEX);
