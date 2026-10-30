const sharp = require('sharp');
const path = require('path');

async function inspectScreenshot() {
  const file = 'src/assets/images/pic39.jpeg';
  const img = sharp(file);
  const meta = await img.metadata();
  console.log(`Metadata for ${file}:`, meta.width, 'x', meta.height);
  
  // Let's sample pixel rows at the top to see where the black bar ends
  const { data, info } = await sharp(file)
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log('Channels:', info.channels);
  
  // Find top boundary of the image (below black header bar)
  // Usually the phone status bar + action bar is around y=0 to y=250-350
  for (let y = 50; y < 700; y += 20) {
    let r = 0, g = 0, b = 0;
    for (let x = 100; x < 900; x += 10) {
      const idx = (y * info.width + x) * info.channels;
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
    }
    const count = 80;
    console.log(`y=${y}: avg RGB = (${(r/count).toFixed(0)}, ${(g/count).toFixed(0)}, ${(b/count).toFixed(0)})`);
  }
}

inspectScreenshot();
