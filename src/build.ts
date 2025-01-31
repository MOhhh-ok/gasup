import { execSync } from 'child_process';
import { copyFileSync } from 'fs';
import path from 'path';
import { Config } from './types.js';

export function build(config: Config) {
  execSync('tsc', { stdio: 'inherit' });
  copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
