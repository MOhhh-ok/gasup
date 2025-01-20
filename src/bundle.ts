import { getConfig } from './Config.js';
import esbuild from 'esbuild';
import { GasPlugin } from 'esbuild-gas-plugin';
import fs from 'fs-extra';
import path from 'path';

export async function bundle() {
  console.log('bundle with esbuild');
  const config = await getConfig();
  await esbuild
    .build({
      entryPoints: config.bundleEntries,
      bundle: true,
      outfile: config.bundleOutfile,
      plugins: [GasPlugin as any],
    })
    .catch((e: any) => {
      throw new Error(e);
    });

  fs.copyFileSync(
    config.appScriptJsonPath,
    path.join(config.distDir, 'appsscript.json')
  );
}
