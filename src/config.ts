import fs from 'fs-extra';
import path from 'path';
import tsnode from 'ts-node';
import { Config } from './types.js';

const configFileName = 'gasup.config.ts';

export const defaultConfig: Config = {
  claspJsonPath: '.clasp.json',
  appsScriptJsonPath: 'appsscript.json',
  bundleEntries: [path.join('src', 'index.ts')],
  bundleOutfile: path.join('dist', 'bundle.js'),
  srcDir: 'src',
  distDir: 'dist',
};

export const config = loadConfigWithDefault();

function loadConfigWithDefault() {
  const configPath = path.join(process.cwd(), configFileName);
  const config = loadConfig(configPath);
  return {
    ...defaultConfig,
    ...config,
  };
}

function loadConfig(configPath: string): Config {
  try {
    const configString = fs.readFileSync(configPath, 'utf-8');
    const compiledPath = path.join(__dirname, '__config_compiled.js');

    const compiledCode = tsnode
      .create()
      .compile(configString, 'config_dummy.ts');
    fs.writeFileSync(compiledPath, compiledCode);
    const data = require(compiledPath);
    fs.unlinkSync(compiledPath);
    return data.default;
  } catch (err: any) {
    return {};
  }
}
