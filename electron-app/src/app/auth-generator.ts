import { app } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';

fs.ensureDirSync(path.join(app.getPath('userData'), 'data'));

const idPath = path.join(app.getPath('userData'), 'data', 'id.txt');
if (!fs.existsSync(idPath)) {
  global.AUTH_ID = nanoid();
  fs.writeFile(idPath, global.AUTH_ID);
} else {
  global.AUTH_ID = fs.readFileSync(idPath).toString();
}

console.log(`\n\nAUTH ID: ${global.AUTH_ID}\n\n`);
