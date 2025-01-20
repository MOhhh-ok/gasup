import { copyFileSync } from 'fs';
import { getConfig } from './config.js';
import fs from 'fs-extra';
import path from 'path';

export interface AppsScript {
  scriptId: string;
  rootDir: string;
}

export function getAppsScript(): AppsScript {
  const config = getConfig();
  const json = fs.readFileSync(config.appsScriptJsonPath, 'utf-8');
  return JSON.parse(json ?? '{}');
}

export function copyAppsScript() {
  const config = getConfig();
  copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
