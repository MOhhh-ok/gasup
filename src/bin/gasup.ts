import { program } from 'commander';
import { build } from '../build.js';
import { bundle } from '../bundle.js';
import { changeEnv } from '../changeEnv.js';
import { init } from '../init.js';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { deploy } from '../deploy.js';

program
  .option('--init', 'init')
  .option('--env <env>', 'change env')
  .option('--bundle', 'bundle')
  .option('--build', 'build')
  .option('--push', 'push')
  .option('--deploy', 'deploy')
  .parse();

async function main() {
  if (program.opts().init) {
    inquirer
      .prompt({
        type: 'confirm',
        name: 'do',
        message: 'This action will overwrite some files. Are you sure?',
      })
      .then((res) => {
        if (!res.do) return;
        console.log('init gasup');
        init();
        console.log('init done');
      });
    return;
  }

  if (program.opts().env) {
    changeEnv(program.opts().env);
    console.log(`env changed to ${program.opts().env}`);
  }

  if (program.opts().build) {
    console.log('build with tsc');
    build();
  }

  if (program.opts().bundle) {
    console.log('bundle with esbuild');
    await bundle();
  }

  if (program.opts().push) {
    console.log('push');
    execSync('clasp push', { stdio: 'inherit' });
  }

  if (program.opts().deploy) {
    console.log(`deploy`);
    deploy();
  }

  console.log('gasup done');
}

try {
  await main();
} catch (err: any) {
  console.error(err.message);
  process.exit(1);
}
