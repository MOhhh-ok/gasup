import dotenv from 'dotenv';
import fs from 'fs-extra';
import { Env, getConfig } from './Config.js';

export async function changeEnv(env: Env = 'dev') {
  const config = await getConfig();
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

  dotenv.config({ path: envPath });
  const scriptId = process.env.SCRIPT_ID;
  if (!scriptId) {
    throw new Error(`SCRIPT_ID not found on ${envPath}`);
  }

  const data = {
    scriptId,
    rootDir: config.distDir,
  };

  fs.writeFileSync(claspJsonPath, JSON.stringify(data, null, 2));
  console.log(`env changed to ${env}`);
}
