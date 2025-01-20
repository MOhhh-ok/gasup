import { initConfig } from './config.js';
import { initEnvFiles } from './envFile.js';
import { addGitIgnores } from './gitignore.js';

export function init() {
  initConfig();
  initEnvFiles();
  addGitIgnores();
}
