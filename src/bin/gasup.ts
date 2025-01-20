import { program } from 'commander';
import { build } from '../build.js';
import { bundle } from '../bundle.js';
import { changeEnv } from '../changeEnv.js';
import { init } from '../init.js';

program
  .option('--init', 'init')
  .option('--env <env>', 'change env')
  .option('--bundle', 'bundle')
  .option('--build', 'build')
  .parse();

function main() {
  if (program.opts().init) {
    init();
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
    bundle();
  }

  console.log('gasup done');
}

try {
  main();
} catch (err: any) {
  console.error(err.message);
  process.exit(1);
}
