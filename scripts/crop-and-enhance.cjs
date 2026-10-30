const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'optimized');

const filesToCrop = [
  { name: 'pic39.jpeg', out: 'pic39.webp', title: '_FOS1454.JPG' },
  { name: 'pic40.jpeg', out: 'pic40.webp', title: '_FOS1467.JPG' },
  { name: 'pic41.jpeg', out: 'pic41.webp', title: '_FOS1536.JPG' },
  { name: 'pic42.jpeg', out: 'pic42.webp', title: '_FOS1558.JPG' }
];

async function cropAndEnhance() {
  console.log('Starting cropping and quality enhancement for screenshot photos...');

  for (const item of filesToCrop) {
    const inputPath = path.join(inputDir, item.name);
    const outputPath = path.join(outputDir, item.out);

    // Crop box: left 0, top 360, width 1080, height 1615
    // Enhancing: subtle sharpen, balanced saturation & brightness, ultra-quality WebP
    await sharp(inputPath)
      .extract({ left: 0, top: 360, width: 1080, height: 1615 })
      .modulate({
        brightness: 1.04,
        saturation: 1.08,
      })
      .sharpen({
        sigma: 1.1,
        m1: 0.8,
        m2: 1.8
      })
      .webp({ quality: 92, effort: 5 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ Cropped & enhanced ${item.name} (${item.title}) -> ${item.out} (${Math.round(stats.size/1024)} KB)`);
  }

  console.log('All 4 screenshot images successfully cropped and quality-enhanced!');
}

cropAndEnhance();
