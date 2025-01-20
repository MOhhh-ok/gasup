import fs from 'fs-extra';
import { getConfig } from './config.js';
import { getAppsScript } from './appsScript.js';

export function initEnvFiles() {
  const config = getConfig();
  const appsScript = getAppsScript();
  const scriptId = appsScript.scriptId;
  const envPath = config.envPaths['dev'];
  addToEnvFile(envPath, {
    SCRIPT_ID: scriptId,
  });
}

export function addToEnvFile(envPath: string, _items: Record<string, string>) {
  const envString = fs.readFileSync(envPath, 'utf-8');
  const newEnvString = addToEnvString(envString, _items);
  fs.writeFileSync(envPath, newEnvString);
}

// 環境変数を追加する。安全のため、既存の環境変数は上書きしない
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
        newLines.push(`${key}=${value}`);
      } else {
        newLines.push('');
      }
      delete items[key];
    }
  }
  newLines.push('');
  for (const [key, value] of Object.entries(items)) {
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
