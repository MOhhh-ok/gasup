import { getConfig } from './config.js';
import esbuild from 'esbuild';
import { GasPlugin } from 'esbuild-gas-plugin';
import fs from 'fs-extra';
import path from 'path';

export async function bundle() {
  const config = getConfig();
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
