import { render } from 'svelte/server';
import Page from './src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx';
export function renderPage() {
  const result = render(Page);
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + result.head + '</head><body>' + result.body + '</body></html>';
}
