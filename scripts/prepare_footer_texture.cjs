const sharp = require('sharp');
const path = require('path');

async function convert() {
  const src = 'C:\\Users\\Rahul\\.gemini\\antigravity\\brain\\672b725a-84ce-4675-8950-bfd83b4dc3fa\\tanus_footer_dark_texture_clean_1793361347398.jpg';
  const dest = 'src/assets/optimized/footer-bg-texture.webp';

  const metadata = await sharp(src).metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}`);

  await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);

  console.log(`Saved ${dest}`);
}

convert().catch(console.error);

