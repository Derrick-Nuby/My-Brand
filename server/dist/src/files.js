import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const local = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.resolve(__dirname, '../../../client');
local.use('/', express.static(staticPath));
export default local;
//# sourceMappingURL=files.js.map