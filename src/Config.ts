import { readFileSync } from 'fs';
import fs from 'fs-extra';
import path from 'path';

export type Env = 'dev' | 'stag' | 'prod';
const configPath = 'gasup.json';

export interface Config {
  envPaths?: Record<Env, string>;
  claspJsonPath?: string;
  appScriptJsonPath?: string;
  bundleEntries?: string[];
  bundleOutfile?: string;
  srcDir?: string;
  distDir?: string;
}

export const defaultConfig: Config = {
  envPaths: {
    dev: '.env',
    stag: '.env.stag',
    prod: '.env.prod',
  },
  claspJsonPath: '.clasp.json',
  appScriptJsonPath: 'appsscript.json',
  bundleEntries: [path.join('src', 'index.ts')],
  bundleOutfile: path.join('dist', 'bundle.js'),
  srcDir: 'src',
  distDir: 'dist',
};

export async function getConfig(): Promise<Config> {
  try {
    console.log('getConfig', configPath);
    // const require = createRequire(import.meta.url);
    const res = readFileSync(path.join(process.cwd(), configPath));
    const data = JSON.parse(res.toString());
    console.log('data', data);
    return {
      ...defaultConfig,
      ...data,
      envPaths: { ...defaultConfig.envPaths, ...(data.envPaths ?? {}) },
    };
  } catch (e) {
    console.error(e);
    return defaultConfig;
  }
}

export async function saveDefaultConfig() {
  const config = { ...defaultConfig };
  await fs.writeFile(
    path.join(process.cwd(), configPath),
    JSON.stringify(config, null, 2)
  );
}
