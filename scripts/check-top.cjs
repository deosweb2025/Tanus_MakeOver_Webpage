const sharp = require('sharp');

async function testThreshold(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  console.log(`Checking ${file}:`);
  for (let y = 300; y < 420; y += 10) {
    let r = 0, g = 0, b = 0;
    for (let x = 100; x < info.width - 100; x += 10) {
      const idx = (y * info.width + x) * info.channels;
      r += data[idx];
      g += data[idx+1];
      b += data[idx+2];
    }
    const count = (info.width - 200) / 10;
    console.log(`  y=${y}: (${(r/count).toFixed(0)}, ${(g/count).toFixed(0)}, ${(b/count).toFixed(0)})`);
  }
}

async function run() {
  await testThreshold('src/assets/images/pic39.jpeg');
  await testThreshold('src/assets/images/pic40.jpeg');
  await testThreshold('src/assets/images/pic41.jpeg');
  await testThreshold('src/assets/images/pic42.jpeg');
}

run();
