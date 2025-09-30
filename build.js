import { execSync } from 'child_process';
import fs from 'fs-extra';
import { workboxBuild } from 'workbox-build';

// Créer le dossier dist
await fs.ensureDir('dist');

// Copier et optimiser le fichier HTML principal
let html = await fs.readFile('src/index.html', 'utf8');

// Minifier le CSS et JS (simplifié)
html = html.replace(/<style>[\s\S]*?<\/style>/, match => {
  return match.replace(/\s+/g, ' ').replace(/;?\s*}/g, '}').replace(/\s*{\s*/g, '{');
});

await fs.writeFile('dist/index.html', html);

// Générer le service worker
await workboxBuild.generateSW({
  globDirectory: 'dist',
  globPatterns: ['**/*.{html,js,css}'],
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: /^https:\/\/script\.googleapis\.com\/.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 300 // 5 minutes
      }
    }
  }]
});

console.log('Build terminé!');
