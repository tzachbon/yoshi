import path from 'path';

export const SRC_DIR = 'src';
export const BUILD_DIR = 'dist';
export const TARGET_DIR = 'target';
export const SERVERLESS_DIR = 'serverless';
export const SERVERLESS_SCOPE_DIR = (scopeName: string) =>
  `${SERVERLESS_DIR}/${scopeName}`;
export const SERVERLESS_SCOPE_BUILD_DIR = (scopeName: string = '') =>
  `${SERVERLESS_SCOPE_DIR(scopeName)}/dist`;
export const SERVER_CHUNKS_DIR = 'chunks';
export const DOCKER_FILE = 'Dockerfile';
export const DOCKER_IGNORE = '.dockerignore';
export const TEMPLATES = 'templates';

export const ROUTES_DIR = path.join(SRC_DIR, 'routes');
export const SERVER_CHUNKS_BUILD_DIR = path.join(BUILD_DIR, SERVER_CHUNKS_DIR);
export const TEMPLATES_DIR = path.join(SRC_DIR, TEMPLATES);
export const PUBLIC_DIR = path.join(SRC_DIR, 'assets');
export const STATICS_DIR = path.join(BUILD_DIR, 'statics');
export const ES_DIR = path.join(BUILD_DIR, 'esm');
export const CJS_DIR = path.join(BUILD_DIR, 'cjs');
export const TYPES_DIR = path.join(BUILD_DIR, 'types');
export const ROUTES_BUILD_DIR = path.join(BUILD_DIR, 'routes');
export const TEMPLATES_BUILD_DIR = path.join(STATICS_DIR, TEMPLATES);
export const ASSETS_DIR = path.join(STATICS_DIR, 'assets');

export const NODE_PLATFORM_DEFAULT_CONFIGS_DIR = 'test/configs';

export const POM_FILE = 'pom.xml';
export const SERVER_ENTRY = 'server';
export const TSCONFIG_FILE = 'tsconfig.json';

export const STATS_FILE = path.join(TARGET_DIR, 'webpack-stats.json');
export const SERVER_LOG_FILE = path.join(TARGET_DIR, 'server.log');
export const SERVER_BUNDLE = path.join(BUILD_DIR, 'server.js');
