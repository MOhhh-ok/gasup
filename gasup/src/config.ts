import fs from 'fs';
import path from 'path';
import tsnode from 'ts-node';
import { Config } from './types.js';

const configFileName = 'gasup.config.ts';

export const defaultConfig: Config = {
  entryPoint: 'src/index.ts',
  outputFile: 'dist/bundle.js',
  appsScriptJsonPath: 'appsscript.json',
};

export async function loadConfigWithDefault() {
  const configPath = path.join(process.cwd(), configFileName);
  const config = await loadConfig(configPath);
  return {
    ...defaultConfig,
    ...config,
  };
}

async function loadConfig(configPath: string): Promise<Config> {
  try {
    const configString = fs.readFileSync(configPath, 'utf-8');
    const compiledPath = path.join(process.cwd(), '__config_compiled.js');

    const compiledCode = tsnode
      .create()
      .compile(configString, 'config_dummy.ts');
    fs.writeFileSync(compiledPath, compiledCode);
    const data = await import(compiledPath);
    fs.unlinkSync(compiledPath);
    return data.default;
  } catch (err: any) {
    return {};
  }
}
