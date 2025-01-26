import esbuild from 'esbuild';
import { GasPlugin } from 'esbuild-gas-plugin';
import fs from 'fs-extra';
import path from 'path';
import { config } from './config.js';

export async function bundle() {
  await esbuild.build({
    entryPoints: config.bundleEntries,
    bundle: true,
    outfile: config.bundleOutfile,
    plugins: [GasPlugin as any],
  });

  fs.copyFileSync(
    config.appsScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
