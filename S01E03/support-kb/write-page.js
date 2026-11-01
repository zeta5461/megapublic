import { writeFileSync, mkdirSync } from 'node:fs';
import { renderPage } from './dist/render.js';
mkdirSync('rendered', { recursive: true });
writeFileSync('rendered/0002-dedupe-by-cause.html', renderPage());
