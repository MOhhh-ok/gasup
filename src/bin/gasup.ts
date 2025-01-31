import { execSync } from 'child_process';
import { program } from 'commander';
import { build } from '../build.js';
import { bundle } from '../bundle.js';
import { loadConfigWithDefault } from '../config.js';
import { deploy } from '../deploy.js';
import { changeEnv } from '../envFile/changeEnv.js';

program
  .option('--config', 'display current configuration')
  .option('--env <envpath>', 'apply env to clasp')
  .option('--bundle', 'bundle')
  .option('--build', 'build')
  .option('--push', 'push')
  .option('--deploy', 'deploy')
  .parse();

async function main() {
  const opts = program.opts();
  const config = await loadConfigWithDefault();

  if (opts.config) {
    console.log({ config });
    return;
  }

  if (opts.env?.startsWith('--')) {
    throw new Error('env option is required');
  }
  if (opts.env) {
    console.log(`apply ${opts.env} to clasp`);
    changeEnv(opts.env, config);
  }

  if (opts.build) {
    console.log('build with tsc');
    build(config);
  }

  if (opts.bundle) {
    console.log('bundle with esbuild');
    await bundle(config);
  }

  if (opts.push) {
    console.log('push');
    execSync('clasp push', { stdio: 'inherit' });
  }

  if (opts.deploy) {
    console.log(`deploy`);
    deploy();
  }

  console.log('gasup done');
}

main().catch((err: any) => {
  console.error(err.message);
  process.exit(1);
});
