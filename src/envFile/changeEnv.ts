import fs from 'fs-extra';
import { config } from '../config.js';
import { getEnvData } from './envFile.js';
import { Env } from '../types.js';

export function changeEnv(env: Env = 'dev') {
  const envPath = config.envPaths[env];
  if (!envPath) {
    throw new Error(`envPath not found on ${envPath}`);
  }
  const claspJsonPath = config.claspJsonPath;

  for (const path of [envPath, claspJsonPath]) {
    if (!fs.existsSync(path)) {
      throw new Error(`${path} not found`);
    }
  }

  const envData = getEnvData(envPath);
  const scriptId = envData.GASUP_SCRIPT_ID;
  if (!scriptId) {
    throw new Error(`GASUP_SCRIPT_ID not found on ${envPath}`);
  }

  const data = {
    scriptId,
    rootDir: config.distDir,
    parentId: envData.GASUP_PARENT_ID,
  };

  fs.writeFileSync(claspJsonPath, JSON.stringify(data, null, 2));
}
