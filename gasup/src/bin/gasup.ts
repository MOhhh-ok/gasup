import { execSync } from 'child_process';
import { program } from 'commander';
import { bundle } from '../bundle.js';
import { loadConfigWithDefault } from '../config.js';
import { init } from '../init.js';

program
  .name('gasup')
  .description('CLI tool for Google Apps Script bundling')
  .version('0.4.4');

// Main command (bundle execution)
program
  .description('Bundle your Google Apps Script project')
  .action(async () => {
    try {
      const config = await loadConfigWithDefault();
      console.log('📦 Bundling with esbuild...');
      await bundle(config);
      console.log('✅ Bundle completed');
    } catch (error) {
      console.error('❌ Bundle failed:', error);
      process.exit(1);
    }
  });

// init subcommand
program
  .command('init')
  .description('Initialize gasup configuration file')
  .action(async () => {
    try {
      await init();
    } catch (error) {
      console.error('❌ Init failed:', error);
      process.exit(1);
    }
  });

// config subcommand
program
  .command('config')
  .description('Display current configuration')
  .action(async () => {
    try {
      const config = await loadConfigWithDefault();
      console.log('📋 Current configuration:');
      console.log(JSON.stringify(config, null, 2));
    } catch (error) {
      console.error('❌ Config display failed:', error);
      process.exit(1);
    }
  });

program.parse();
