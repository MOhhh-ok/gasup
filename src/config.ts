import { readFileSync } from 'fs';
import fs from 'fs-extra';
import path from 'path';

export type Env = 'dev' | 'stag' | 'prod';
const configPath = 'gasup.json';

export interface Config {
  envPaths?: Record<Env, string>;
  claspJsonPath?: string;
  appsScriptJsonPath?: string;
  bundleEntries?: string[];
  bundleOutfile?: string;
  srcDir?: string;
  distDir?: string;
}

export const defaultConfig: Config = {
  envPaths: {
    dev: '.env',
    stag: '.env.staging',
    prod: '.env.production',
  },
  claspJsonPath: '.clasp.json',
  appsScriptJsonPath: 'appsscript.json',
  bundleEntries: [path.join('src', 'index.ts')],
  bundleOutfile: path.join('dist', 'bundle.js'),
  srcDir: 'src',
  distDir: 'dist',
};

export function initConfig() {
  const config = getConfig();
  fs.writeFileSync(
    path.join(process.cwd(), configPath),
    JSON.stringify(config, null, 2)
  );
}

export function getConfig(): Config {
  try {
    const res = readFileSync(path.join(process.cwd(), configPath));
    const data = JSON.parse(res.toString());
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
