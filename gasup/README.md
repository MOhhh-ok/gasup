# Gasup

A simple CLI tool for bundling Google Apps Script projects with esbuild and the esbuild-gas-plugin.

## Features

- **Simple bundling**: Bundle your TypeScript/JavaScript code into a single file optimized for Google Apps Script
- **Watch mode**: Automatically rebuild when files change during development
- **Easy configuration**: Interactive wizard to create configuration files
- **esbuild-gas-plugin integration**: Automatically handles GAS-specific optimizations
- **File management**: Automatically copies `appsscript.json` and HTML files to the output directory

## Installation

Install gasup as a dev dependency:

```bash
npm install -D gasup
```

## Quick Start

1. **Initialize your project** (creates `gasup.config.ts`):
   ```bash
   npx gasup init
   ```

2. **Bundle your project**:
   ```bash
   npx gasup
   ```

3. **Push to Google Apps Script**:
   ```bash
   clasp push
   ```

## Commands

### `gasup`
Bundles your Google Apps Script project using the current configuration.

```bash
# Using npx
npx gasup

# Using pnpm
pnpm gasup

# Using yarn
yarn gasup
```

### `gasup --watch`
Watches for file changes and automatically rebuilds your project.

```bash
# Using npx
npx gasup --watch

# Using pnpm
pnpm gasup --watch

# Using yarn
yarn gasup --watch
```

### `gasup init`
Interactive wizard to create a `gasup.config.ts` configuration file.

```bash
# Using npx
npx gasup init

# Using pnpm
pnpm gasup init

# Using yarn
yarn gasup init
```

The wizard will ask for:
- Entry point (default: `src/index.ts`)
- Output file (default: `dist/bundle.js`)
- appsscript.json path (default: `appsscript.json`)

### `gasup config`
Displays the current configuration.

```bash
# Using npx
npx gasup config

# Using pnpm
pnpm gasup config

# Using yarn
yarn gasup config
```

## Using npm scripts (Recommended)

Add these scripts to your `package.json` for easier access:

```json
{
  "scripts": {
    "build": "gasup",
    "dev": "gasup --watch",
    "init": "gasup init",
    "config": "gasup config"
  }
}
```

Then you can run:

```bash
npm run init    # Initialize configuration
npm run build   # Bundle your project
npm run dev     # Watch mode for development
npm run config  # Show configuration
```

## Configuration

Create a `gasup.config.ts` file in your project root:

```typescript
import { Config } from 'gasup';

const config: Config = {
  entryPoint: 'src/index.ts',
  outputFile: 'dist/bundle.js',
  appsScriptJsonPath: 'appsscript.json',
};

export default config;
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entryPoint` | `string` | `'src/index.ts'` | Path to your main TypeScript/JavaScript file |
| `outputFile` | `string` | `'dist/bundle.js'` | Path for the bundled output file |
| `appsScriptJsonPath` | `string` | `'appsscript.json'` | Path to your appsscript.json file |

## Project Structure

```
your-project/
├── src/
│   └── index.ts          # Your main entry point
├── dist/
│   ├── bundle.js         # Bundled output (auto-generated)
│   └── appsscript.json   # Copied from root (auto-generated)
├── appsscript.json       # Google Apps Script configuration
├── gasup.config.ts       # Gasup configuration (optional)
└── package.json
```

## How it works

1. **Bundling**: Uses esbuild with the esbuild-gas-plugin to bundle your code
2. **Optimization**: Automatically applies Google Apps Script-specific optimizations
3. **File copying**: Copies `appsscript.json` and any HTML files to the output directory
4. **Watch mode**: Monitors file changes and automatically rebuilds when needed
5. **Ready for deployment**: The bundled file is ready to be pushed to Google Apps Script

## Examples

### Basic usage
```bash
# Initialize configuration
npx gasup init

# Bundle your project
npx gasup

# Push to Google Apps Script
clasp push
```

### Development with watch mode
```bash
# Start watch mode for development
npx gasup --watch

# In another terminal, push changes
clasp push
```

### Using npm scripts
```bash
# Add to package.json scripts
npm run init
npm run dev      # Watch mode
npm run build    # One-time build
clasp push
```

### Custom configuration
```typescript
// gasup.config.ts
import { Config } from 'gasup';

const config: Config = {
  entryPoint: 'src/main.ts',
  outputFile: 'build/script.js',
  appsScriptJsonPath: 'gas/appsscript.json',
};

export default config;
```

## Requirements

- Node.js 18+
- Google Apps Script project set up with clasp
- TypeScript or JavaScript source files

## License

MIT
