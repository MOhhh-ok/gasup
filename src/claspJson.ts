import { getConfig } from './config.js';
import fs from 'fs-extra';

export function getClaspJson() {
  const config = getConfig();
  const json = fs.readFileSync(config.claspJsonPath, 'utf-8');
  return JSON.parse(json ?? '{}');
}
