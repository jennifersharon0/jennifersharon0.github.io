/**
 * Génère les images optimisées du site à partir de la photo source
 * (public/img/photo portfolio.png).
 *
 *   npm run images
 *
 * À relancer uniquement si la photo change.
 * Le CV n'est pas traité ici : le fichier publié est directement public/cv/<nom>.pdf
 * (chemin défini par `cvFile` dans src/content/profile.ts).
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC_PHOTO = 'public/img/photo portfolio.png';

// Palette du site (voir src/styles/tokens.css)
const BURGUNDY = '#5b1a3a';
const GOLD = '#c9a24d';
const IVORY = '#faf7f2';

await mkdir('public/img', { recursive: true });

const { width: W, height: H } = await sharp(SRC_PHOTO).metadata();

// Portrait 4:5 : pleine largeur, cadré depuis le haut (le visage est dans le tiers supérieur)
const portraitHeight = Math.min(H, Math.round((W * 5) / 4));
const portrait = sharp(SRC_PHOTO).extract({ left: 0, top: Math.min(40, H - portraitHeight), width: W, height: portraitHeight });

for (const width of [480, 800]) {
  await portrait.clone().resize({ width }).webp({ quality: 80 }).toFile(`public/img/portrait-${width}.webp`);
  await portrait.clone().resize({ width }).jpeg({ quality: 82, mozjpeg: true }).toFile(`public/img/portrait-${width}.jpg`);
}

// Aperçu de partage (Open Graph, 1200 × 630) : panneau bordeaux à gauche, photo à droite
const ogCropHeight = Math.min(H - 100, Math.round((W * 630) / 600));
const ogPhoto = await sharp(SRC_PHOTO)
  .extract({ left: 0, top: 100, width: W, height: ogCropHeight })
  .resize({ width: 600, height: 630, fit: 'cover', position: 'top' })
  .toBuffer();

const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BURGUNDY}"/>
  <rect x="70" y="190" width="56" height="3" fill="${GOLD}"/>
  <text x="70" y="270" font-family="Georgia, serif" font-size="64" fill="${IVORY}">Jennifer</text>
  <text x="70" y="345" font-family="Georgia, serif" font-size="64" fill="${IVORY}">OUEDRAOGO</text>
  <text x="72" y="410" font-family="Consolas, monospace" font-size="25" fill="${GOLD}">Data Science &amp; Machine Learning</text>
  <text x="72" y="458" font-family="Arial, sans-serif" font-size="23" fill="${IVORY}">Data Science &amp; IA · CESI École d'Ingénieurs</text>
</svg>`);

await sharp(ogText)
  .composite([{ input: ogPhoto, left: 600, top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/img/og-image.jpg');

console.log('Images générées dans public/img/');
