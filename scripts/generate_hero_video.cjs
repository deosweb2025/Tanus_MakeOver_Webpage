const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createCinematicVideo() {
  const videoDir = path.resolve(__dirname, '../src/assets/video');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const images = ['pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg'];
  const frames = [];

  console.log('1. Preparing 1920x1080 cinematic frames...');
  for (let i = 0; i < images.length; i++) {
    const f = images[i];
    const inputPath = path.resolve(__dirname, '../src/assets/images', f);
    const outputPath = path.join(videoDir, `frame_${i + 1}.jpg`);

    const meta = await sharp(inputPath).metadata();
    const cropW = meta.width;
    const cropH = Math.round(meta.width * 9 / 16);
    // Vertical centering offset around 10-12% so mukut and eyes are balanced
    const cropTop = Math.round(meta.height * 0.11);

    await sharp(inputPath)
      .extract({ left: 0, top: cropTop, width: cropW, height: cropH })
      .resize(1920, 1080, {
        fit: 'fill',
        kernel: sharp.kernel.lanczos3
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.06
      })
      .sharpen({
        sigma: 1.2,
        m1: 1.1,
        m2: 0.5
      })
      .jpeg({ quality: 96 })
      .toFile(outputPath);

    frames.push(outputPath);
    console.log(`- Frame ${i + 1} prepared: ${outputPath}`);
  }

  console.log('2. Compiling cinematic video with ffmpeg (3 images changing every 2s with crossfade)...');

  // We want:
  // Image 1: 0s to 2s
  // Image 2: 2s to 4s
  // Image 3: 4s to 6s
  // Total duration: 6 seconds
  // With 0.4s smooth cinematic crossfade between them!
  // Filter complex with xfade:
  // [0:v] loop image 1 for 2.4s (72 frames at 30fps)
  // [1:v] loop image 2 for 2.4s
  // [2:v] loop image 3 for 2.4s
  // xfade image 1 -> image 2 at offset 2.0s
  // xfade -> image 3 at offset 4.0s
  const outputMp4 = path.join(videoDir, 'hero-cinematic.mp4');

  const filter = [
    // Input 0: frame 1 with subtle slow zoom (Ken Burns)
    `[0:v]scale=2048:1152,zoompan=z='min(zoom+0.0006,1.06)':d=72:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v0]`,
    // Input 1: frame 2 with subtle pan/zoom
    `[1:v]scale=2048:1152,zoompan=z='min(zoom+0.0006,1.06)':d=72:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v1]`,
    // Input 2: frame 3 with subtle pan/zoom
    `[2:v]scale=2048:1152,zoompan=z='min(zoom+0.0006,1.06)':d=72:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v2]`,
    // Transition v0 to v1 at 2.0s
    `[v0][v1]xfade=transition=fade:duration=0.4:offset=2.0[t1]`,
    // Transition t1 to v2 at 4.0s
    `[t1][v2]xfade=transition=fade:duration=0.4:offset=4.0,format=yuv420p[outv]`
  ].join(';');

  const args = [
    '-y',
    '-loop', '1', '-t', '2.4', '-i', frames[0],
    '-loop', '1', '-t', '2.4', '-i', frames[1],
    '-loop', '1', '-t', '2.4', '-i', frames[2],
    '-filter_complex', filter,
    '-map', '[outv]',
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '19',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-t', '6.0',
    outputMp4
  ];

  console.log('Running ffmpeg rendering...');
  cp.execFileSync(ffmpeg.path, args, { stdio: 'inherit' });

  const stat = fs.statSync(outputMp4);
  console.log(`Cinematic video created successfully: ${outputMp4} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

createCinematicVideo().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
