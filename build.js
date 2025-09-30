import fs from 'fs-extra';

// Créer le dossier dist
await fs.ensureDir('dist');

// Copier le HTML principal
await fs.copy('src/index.html', 'dist/index.html');

// Copier le Service Worker
await fs.copy('src/sw.js', 'dist/sw.js');

// Copier les icônes si elles existent
if (await fs.pathExists('src/icons')) {
  await fs.copy('src/icons', 'dist/icons');
}

// Copier le manifest
await fs.copy('src/manifest.json', 'dist/manifest.json');

console.log('Build terminé! Fichiers copiés:', await fs.readdir('dist'));
