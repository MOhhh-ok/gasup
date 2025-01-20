import { execSync } from 'child_process';
import { copyFileSync } from 'fs';
import path from 'path';
import { getConfig } from './config.js';

export function build() {
  execSync('tsc', { stdio: 'inherit' });
  const config = getConfig();
  copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
