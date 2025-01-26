import { copyFileSync } from 'fs';
import fs from 'fs-extra';
import path from 'path';
import { config } from './config.js';

export interface AppsScript {
  scriptId: string;
  rootDir: string;
}

export function getAppsScript(): AppsScript {
  const json = fs.readFileSync(config.appsScriptJsonPath, 'utf-8');
  return JSON.parse(json ?? '{}');
}

export function copyAppsScript() {
  copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
