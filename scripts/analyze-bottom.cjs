const sharp = require('sharp');

async function inspectBottom() {
  const file = 'src/assets/images/pic39.jpeg';
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  
  // Check bottom from y=1800 to 2339
  for (let y = 1800; y < 2340; y += 30) {
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

inspectBottom();
