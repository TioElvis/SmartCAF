import { join } from 'node:path';

export const TEMPLATES_ROOT = join(__dirname, 'templates'); // -> dist/lib/templates

export const ACCESS_TOKEN_EXPIRES = 1 * 60 * 60;
export const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60;
