import path from 'path';
import fs from 'fs-extra';
import * as R from 'remeda';

export function addGitIgnores() {
  const filePath = path.join(process.cwd(), '.gitignore');
  const existsIgnores = read(filePath);
  const ignores = ['node_modules', '.DS_Store', '.env*', '.clasp.json'];
  const newIgnores = R.unique([...existsIgnores, ...ignores]);
  fs.writeFileSync(filePath, newIgnores.join('\n'));
}

function read(filePath: string) {
  try {
    return fs.readFileSync(filePath).toString().split('\n');
  } catch (err: any) {
    return [];
  }
}
