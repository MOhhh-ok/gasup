import esbuild from 'esbuild';
import { GasPlugin } from 'esbuild-gas-plugin';
import fs from 'fs';
import path from 'path';
import { Config } from './types.js';

export async function bundle(config: Config) {
  const { appsScriptJsonPath, entryPoint, outputFile } = config;

  const bundleEntries = [entryPoint];

  await esbuild.build({
    entryPoints: bundleEntries,
    bundle: true,
    outfile: outputFile,
    plugins: [GasPlugin as any],
  });

  const distDir = path.dirname(outputFile);

  fs.copyFileSync(appsScriptJsonPath, path.join(distDir, 'appsscript.json'));

  // Copy HTML files to dist directory
  for (const bundleEntry of bundleEntries) {
    const entryDir = path.dirname(bundleEntry);
    const htmlFiles = fs.readdirSync(entryDir).filter(file => file.endsWith('.html'));
    for (const htmlFile of htmlFiles) {
      fs.copyFileSync(path.join(entryDir, htmlFile), path.join(distDir, htmlFile));
    }
  }
}
