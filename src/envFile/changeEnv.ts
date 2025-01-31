import fs from 'fs-extra';
import { updateClaspJson } from '../claspJson.js';
import { config } from '../config.js';
import { getEnvData } from './envFile.js';

export function changeEnv(envPath: string) {
  if (!envPath) {
    throw new Error(`envPath not found on ${envPath}`);
  }
  if (!fs.existsSync(envPath)) {
    throw new Error(`${envPath} not found`);
  }

  const envData = getEnvData(envPath);
  const scriptId = envData.GASUP_SCRIPT_ID;
  const parentIds = envData.GASUP_PARENT_ID;
  if (!scriptId) {
    throw new Error(`GASUP_SCRIPT_ID not found on ${envPath}`);
  }
  if (!parentIds) {
    throw new Error(`GASUP_PARENT_ID not found on ${envPath}`);
  }
  updateClaspJson(config.claspJsonPath, {
    scriptId,
    parentId: parentIds,
  });
}
