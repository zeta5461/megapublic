# S01E03 local publication candidate

The proposed decision is in support-kb/src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx.
The standalone desk render is support-kb/rendered/0002-dedupe-by-cause.html.
The original exported KB pages and supporting source/data are retained for provenance.

## Rebuild

Node 24.22.1 was used. From support-kb, run:

```
npm ci --ignore-scripts --no-audit --no-fund --registry https://registry.npmjs.org
npm run build
```

This renders static HTML using the supplied Svelte components and mdsvex layout.
The export includes no original package manifest; the renderer configuration is added for this challenge.
Interactive controls are not hydrated. Local builds were checked structurally; no browser visual check or course acceptance is claimed.

Do not publish without Piotr's explicit approval. Only zeta5461/megapublic is authorized.
