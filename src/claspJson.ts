import fs from 'fs-extra';
import { config } from './config.js';

export interface ClaspJson {
  scriptId?: string;
  rootDir?: string;
  parentId?: string[];
}

export function getClaspJson(): ClaspJson {
  const json = fs.readFileSync(config.claspJsonPath, 'utf-8');
  return JSON.parse(json ?? '{}');
}
