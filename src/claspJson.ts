import fs from 'fs-extra';
import { ClaspJson } from './types.js';

export function updateClaspJson(claspJsonPath: string, data: ClaspJson) {
  const json = fs.readFileSync(claspJsonPath, 'utf-8');
  const existingData = JSON.parse(json ?? '{}');
  const newData = { ...existingData, ...data };
  fs.writeFileSync(claspJsonPath, JSON.stringify(newData, null, 2));
}
