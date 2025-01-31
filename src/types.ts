export type Env = 'dev' | 'stag' | 'prod';

export interface Config {
  claspJsonPath?: string;
  appsScriptJsonPath?: string;
  bundleEntries?: string[];
  bundleOutfile?: string;
  srcDir?: string;
  distDir?: string;
}

export interface EnvObject {
  GASUP_SCRIPT_ID?: string;
  GASUP_PARENT_ID?: string[];
}

export interface ClaspJson {
  scriptId?: string;
  rootDir?: string;
  parentId?: string[];
}
