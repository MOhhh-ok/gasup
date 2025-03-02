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

  // HTMLファイルをdistディレクトリにコピー
  for (const bundleEntry of bundleEntries) {
    const entryDir = path.dirname(bundleEntry);
    const htmlFiles = fs.readdirSync(entryDir).filter(file => file.endsWith('.html'));
    for (const htmlFile of htmlFiles) {
      fs.copyFileSync(path.join(entryDir, htmlFile), path.join(distDir, htmlFile));
    }
  }
}
