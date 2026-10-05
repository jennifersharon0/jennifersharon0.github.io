/**
 * Génère les images optimisées du site à partir des fichiers sources
 * placés à la racine du projet (Photo_Profil.png, Cv_PFE.pdf).
 *
 *   npm run images
 *
 * À relancer uniquement si la photo ou le CV source change.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC_PHOTO = 'Photo_Profil.png';
const SRC_CV = 'Cv_PFE.pdf';

await mkdir('public/img', { recursive: true });
await mkdir('public/cv', { recursive: true });

// Portrait 4:5, recadré sur le visage (le sujet occupe le centre-bas de l'image source)
const portrait = sharp(SRC_PHOTO).extract({ left: 0, top: 90, width: 1085, height: 1356 });

for (const width of [480, 800]) {
  await portrait.clone().resize({ width }).webp({ quality: 80 }).toFile(`public/img/portrait-${width}.webp`);
  await portrait.clone().resize({ width }).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/img/portrait-${width}.jpg`);
}

// Aperçu de partage (Open Graph, 1200 × 630) : photo à droite sur fond papier
const ogPhoto = await sharp(SRC_PHOTO)
  .extract({ left: 0, top: 160, width: 1085, height: 1140 })
  .resize({ width: 600, height: 630, fit: 'cover', position: 'centre' })
  .toBuffer();

const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f5f3ee"/>
  <rect x="0" y="0" width="10" height="630" fill="#2f45c9"/>
  <text x="70" y="250" font-family="Georgia, serif" font-size="66" fill="#15171c">Jennifer</text>
  <text x="70" y="330" font-family="Georgia, serif" font-size="66" fill="#15171c">Ouedraogo</text>
  <text x="72" y="400" font-family="Consolas, monospace" font-size="26" fill="#2f45c9">Big Data &amp; Artificial Intelligence</text>
  <text x="72" y="450" font-family="Arial, sans-serif" font-size="24" fill="#4a4f5a">Data Science &amp; IA · CESI École d'Ingénieurs</text>
</svg>`);

await sharp(ogText)
  .composite([{ input: ogPhoto, left: 600, top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/img/og-image.jpg');

await copyFile(SRC_CV, 'public/cv/Jennifer_Ouedraogo_CV.pdf');

console.log('Images et CV générés dans public/');
