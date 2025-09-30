import fs from 'fs-extra';

// Copie tous les fichiers de src vers dist
await fs.copy('src', 'dist');
