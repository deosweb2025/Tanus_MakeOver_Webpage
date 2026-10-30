const sharp = require('sharp');

async function findBounds(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  
  let top = 0;
  for (let y = 100; y < 800; y++) {
    // Check if row is not dark bar (average brightness > 35)
    let sum = 0;
    for (let x = 200; x < info.width - 200; x += 10) {
      const idx = (y * info.width + x) * info.channels;
      sum += (data[idx] + data[idx+1] + data[idx+2]) / 3;
    }
    const avg = sum / ((info.width - 400) / 10);
    if (avg > 40) {
      top = y;
      break;
    }
  }

  let bottom = info.height;
  for (let y = info.height - 100; y > 1500; y--) {
    let sum = 0;
    for (let x = 200; x < info.width - 200; x += 10) {
      const idx = (y * info.width + x) * info.channels;
      sum += (data[idx] + data[idx+1] + data[idx+2]) / 3;
    }
    const avg = sum / ((info.width - 400) / 10);
    if (avg > 40) {
      bottom = y;
      break;
    }
  }

  console.log(`${file}: top=${top}, bottom=${bottom}, height=${bottom - top}`);
}

async function run() {
  await findBounds('src/assets/images/pic39.jpeg');
  await findBounds('src/assets/images/pic40.jpeg');
  await findBounds('src/assets/images/pic41.jpeg');
  await findBounds('src/assets/images/pic42.jpeg');
}

run();
