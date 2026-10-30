const sharp = require('sharp');
const fs = require('fs');

async function createBanner() {
  const W = 2560;
  const H = 1440;

  console.log('Generating widescreen 16:9 master hero image (2560x1440)...');

  // 1. Prepare the bride portrait from pic1.jpeg
  // Original is 4672 x 7008
  // Resize pic1 to fit H=1440 without cropping: width is ~960px
  const brideResized = await sharp('src/assets/images/pic1.jpeg')
    .resize(null, H, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const bW = brideResized.info.width;
  const bH = brideResized.info.height;
  console.log('Bride resized:', bW, 'x', bH);

  // 2. Create smooth horizontal fade mask for the bride's left edge
  // The bride will sit on the right: left = W - bW.
  // Left 40% of the bride image fades smoothly into the dark luxury background
  const mask = Buffer.alloc(bW * bH * 4);
  const fadeWidth = Math.round(bW * 0.42);

  for (let y = 0; y < bH; y++) {
    for (let x = 0; x < bW; x++) {
      const idx = (y * bW + x) * 4;
      let alpha = 255;
      if (x < fadeWidth) {
        const t = x / fadeWidth;
        alpha = Math.round(255 * (t * t * (3 - 2 * t)));
      }
      mask[idx] = 255;
      mask[idx + 1] = 255;
      mask[idx + 2] = 255;
      mask[idx + 3] = alpha;
    }
  }

  // Apply alpha mask to bride
  const brideRaw = await sharp(brideResized.data).ensureAlpha().raw().toBuffer();
  for (let i = 0; i < brideRaw.length; i += 4) {
    const maskAlpha = mask[i + 3] / 255;
    brideRaw[i + 3] = Math.round(brideRaw[i + 3] * maskAlpha);
  }

  const brideFadedPng = await sharp(brideRaw, {
    raw: { width: bW, height: bH, channels: 4 }
  }).png().toBuffer();

  // 3. Create dark luxury background with subtle warm gold atmospheric gradients
  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldGlow" cx="72%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0.22" />
          <stop offset="45%" stop-color="#8c6714" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#0e0c0a" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="softAmber" cx="30%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#b8860b" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#0a0908" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0a0908" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#0a0908" stop-opacity="0.75" />
          <stop offset="65%" stop-color="#0a0908" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#0a0908" stop-opacity="0" />
        </linearGradient>
      </defs>
      <!-- Base Background -->
      <rect width="${W}" height="${H}" fill="#0e0c0a" />
      <!-- Ambient Glow Behind Bride -->
      <rect width="${W}" height="${H}" fill="url(#goldGlow)" />
      <rect width="${W}" height="${H}" fill="url(#softAmber)" />
      <!-- Film Vignette Left Side for Crisp Typography Readability -->
      <rect width="${W}" height="${H}" fill="url(#leftFade)" />
    </svg>
  `);

  const bgBuffer = await sharp(bgSvg).png().toBuffer();

  // 4. Composite bride onto right side of widescreen canvas
  const brideLeftPos = W - bW; // right-aligned
  const outputPath = 'src/assets/optimized/hero-banner.webp';

  await sharp(bgBuffer)
    .composite([
      { input: brideFadedPng, left: brideLeftPos, top: 0 },
    ])
    // Master sharpening for jewelry, mukut, and Chandan art
    .sharpen({
      sigma: 1.2,
      m1: 1.2,
      m2: 0.6,
      x1: 2,
      y2: 10,
      y3: 20
    })
    .webp({ quality: 96, effort: 6 })
    .toFile(outputPath);

  const finalMeta = await sharp(outputPath).metadata();
  console.log('Successfully created:', outputPath, finalMeta.width, 'x', finalMeta.height, finalMeta.size, 'bytes');
}

createBanner().catch(console.error);
