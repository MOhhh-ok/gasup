import { program } from 'commander';
import { bundle } from '../bundle.js';
import { changeEnv } from '../changeEnv.js';
import { saveDefaultConfig } from '../Config.js';

program
  .option('--init', 'init')
  .option('--env <env>', 'change env')
  .option('--bundle', 'bundle')
  .parse();

async function main() {
  if (program.opts().init) {
    await init();
  }

  if (program.opts().change) {
    await changeEnv(program.opts().change);
  }

  if (program.opts().bundle) {
    await bundle();
  }

  console.log('done');
}

main().catch((err: any) => {
  console.error(err.message);
  process.exit(1);
});

async function init() {
  await saveDefaultConfig();
}
