import { execSync } from 'child_process';
import { copyFileSync } from 'fs';
import path from 'path';
import { config } from './config.js';

export function build() {
  execSync('tsc', { stdio: 'inherit' });
  copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
