import dotenv from 'dotenv';
import fs from 'fs-extra';
import { EnvObject } from '../types.js';
import { addToEnvString } from './addToEnvString.js';

export function getEnvData(envPath: string): EnvObject {
  try {
    const envString = fs.readFileSync(envPath, 'utf-8');
    const data = dotenv.parse(envString);
    return {
      GASUP_SCRIPT_ID: data.GASUP_SCRIPT_ID,
      GASUP_PARENT_ID: data.GASUP_PARENT_ID?.split(','),
    };
  } catch (err: any) {
    return {};
  }
}

export function addToEnvFile(envPath: string, _items: Record<string, string>) {
  let envString = '';
  try {
    envString = fs.readFileSync(envPath, 'utf-8');
  } catch (e) {}
  const newEnvString = addToEnvString(envString.trim(), _items);
  fs.writeFileSync(envPath, newEnvString);
}
