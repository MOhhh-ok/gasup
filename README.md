# Gasup

Gasup is a command-line interface (CLI) tool designed to simplify the process.

- building
- bundling
- pushing
- deploying
- change development, staging, production

It offers an easy way to automate tasks and manage your deployments without the need to manually interact with the Apps Script dashboard.

## Installation

To get started with gasup, you need clasp first.

Then you can install gasup like below.

```
npm i -g gasup
```

## Usage

### Build

Simple build.

```
gasup --build
```

This command compiles your code with tsc.

### Bundle

Bundle with esbuild into one file. This allows you to use libraries that are not natively available in Google Apps Script.

```
gasup --bundle
```

### Push

Simply push using "clasp push".

```
gasup --push
```

### Deploy

Deploy to the latest deployment. If no previous deployments exist, a new deployment will be created.

```
gasup --deploy
```

### Change Environment

If you need to switch between different environments (e.g., development, staging, production), you can use the --env flag to modify the appsscript.json file accordingly.

```
gasup --env <target>
```

Target options:

- dev : Development environment
- stag : Staging environment
- prod : Production environment

Default environment files:

.env, .env.staging, .env.production

Environment file details:

```env
GASUP_SCRIPT_ID=xxx
GASUP_PARENT_ID=yyy,zzz
```

### Chain

Chan command is available like below.

```
gasup --env dev --build --push --deploy
```

### Config

The config file will below.

```ts
// gasup.config.ts
import { Config } from 'gasup';

const config:Config = {
  srcDir: './src';
}

export default config;
```

```ts
export interface Config {
  envPaths?: Record<Env, string>;
  claspJsonPath?: string;
  appsScriptJsonPath?: string;
  bundleEntries?: string[];
  bundleOutfile?: string;
  srcDir?: string;
  distDir?: string;
}
```

## License

MIT
