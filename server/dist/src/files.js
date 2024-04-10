import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const local = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.resolve(__dirname, '../../../client');
local.use('/', express.static(staticPath));
// local.get('/', (req: Request, res: Response) => {
//     const indexPath = path.resolve(__dirname, '../../../client/index.html');
//     res.sendFile(indexPath);
// });
export default local;
//# sourceMappingURL=files.js.map