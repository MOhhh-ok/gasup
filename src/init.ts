import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Config } from './types.js';

const defaultConfig: Config = {
  entryPoint: 'src/index.ts',
  outputFile: 'dist/bundle.js',
  appsScriptJsonPath: 'appsscript.json',
};

export async function init() {
  console.log('🚀 Gasup Configuration Wizard');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  try {
    // Entry point
    const entryPoint = await question(
      `Entry point (default: ${defaultConfig.entryPoint}): `
    );

    // Output file
    const outputFile = await question(
      `Output file (default: ${defaultConfig.outputFile}): `
    );

    // appsscript.json path
    const appsScriptJsonPath = await question(
      `appsscript.json path (default: ${defaultConfig.appsScriptJsonPath}): `
    );

    rl.close();

    // Create config object
    const config: Config = {
      entryPoint: entryPoint || defaultConfig.entryPoint,
      outputFile: outputFile || defaultConfig.outputFile,
      appsScriptJsonPath: appsScriptJsonPath || defaultConfig.appsScriptJsonPath,
    };

    // Generate config file content
    const configContent = generateConfigFile(config);

    // Write to file
    const configPath = path.join(process.cwd(), 'gasup.config.ts');
    fs.writeFileSync(configPath, configContent);

    console.log('');
    console.log('✅ Configuration file created: gasup.config.ts');
    console.log('');
    console.log('Configuration:');
    console.log(JSON.stringify(config, null, 2));
    console.log('');
    console.log('You can now run `gasup` to bundle your project.');

  } catch (error) {
    rl.close();
    console.error('❌ Failed to create configuration file:', error);
    process.exit(1);
  }
}

function generateConfigFile(config: Config): string {
  return `import { Config } from 'gasup';

const config: Config = {
  entryPoint: '${config.entryPoint}',
  outputFile: '${config.outputFile}',
  appsScriptJsonPath: '${config.appsScriptJsonPath}',
};

export default config;
`;
}