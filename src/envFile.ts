import fs from 'fs-extra';
import { getClaspJson } from './claspJson.js';
import { getConfig } from './config.js';

export function initEnvFiles() {
  const config = getConfig();
  const claspJson = getClaspJson();
  const scriptId = claspJson.scriptId;
  const envPath = config.envPaths['dev'];
  addToEnvFile(envPath, {
    GASUP_SCRIPT_ID: scriptId,
  });
}

export function addToEnvFile(envPath: string, _items: Record<string, string>) {
  let envString = '';
  try {
    envString = fs.readFileSync(envPath, 'utf-8');
  } catch (e) {}
  const newEnvString = addToEnvString(envString.trim(), _items);
  fs.writeFileSync(envPath, newEnvString);
}

// 環境変数を変更する
export function addToEnvString(
  envString: string,
  _items: Record<string, string>
) {
  const items = { ..._items };
  const newLines = [];
  for (const line of envString.split('\n')) {
    if (isCommentLine(line)) {
      newLines.push(line);
    } else {
      const { key, value } = parseLine(line);
      if (key) {
        if (items[key]) {
          newLines.push(`${key}=${items[key]}`);
          delete items[key];
        } else {
          newLines.push(`${key}=${value}`);
        }
      } else {
        newLines.push('');
      }
    }
  }
  newLines.push('');
  for (const [key, value] of Object.entries(items)) {
    if (!key) continue;
    newLines.push(`${key}=${value}`);
  }
  return newLines.join('\n');
}

function isCommentLine(line: string) {
  return line.startsWith('#');
}

function parseLine(line: string) {
  const [key, ...values] = line.split('=');
  return { key, value: values.join('=') };
}
