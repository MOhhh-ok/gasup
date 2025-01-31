import esbuild from 'esbuild';
import { GasPlugin } from 'esbuild-gas-plugin';
import fs from 'fs-extra';
import path from 'path';
import { Config } from './types.js';

export async function bundle(config: Config) {
  const { bundleEntries, bundleOutfile, appsScriptJsonPath, distDir } = config;

  await esbuild.build({
    entryPoints: bundleEntries,
    bundle: true,
    outfile: bundleOutfile,
    plugins: [GasPlugin as any],
  });

  fs.copyFileSync(appsScriptJsonPath, path.join(distDir, 'appsscript.json'));
}
