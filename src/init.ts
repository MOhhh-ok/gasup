import { initEnvFiles } from './envFile/envFile.js';
import { addGitIgnores } from './gitignore.js';

export function init() {
  initEnvFiles();
  addGitIgnores();
}
