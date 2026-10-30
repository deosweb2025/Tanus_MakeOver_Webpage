const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImages() {
  const images = [
    {
      src: 'C:\\Users\\Rahul\\.gemini\\antigravity\\brain\\672b725a-84ce-4675-8950-bfd83b4dc3fa\\tanus_bengali_bride_mobile_1793359784864.jpg',
      dest: 'src/assets/optimized/hero-slide-mobile-1.webp'
    },
    {
      src: 'C:\\Users\\Rahul\\.gemini\\antigravity\\brain\\672b725a-84ce-4675-8950-bfd83b4dc3fa\\tanus_reception_bride_mobile_1793359785592.jpg',
      dest: 'src/assets/optimized/hero-slide-mobile-2.webp'
    },
    {
      src: 'C:\\Users\\Rahul\\.gemini\\antigravity\\brain\\672b725a-84ce-4675-8950-bfd83b4dc3fa\\bengali_bridal_luxury_mobile_campaign_1793359807477.jpg',
      dest: 'src/assets/optimized/hero-slide-mobile-3.webp'
    }
  ];

  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    const metadata = await sharp(item.src).metadata();
    console.log(`Image ${i+1}: ${metadata.width}x${metadata.height}`);
    
    // Convert to webp with high quality, resizing if needed (up to 1080 width for crisp retina screens)
    await sharp(item.src)
      .resize({ width: Math.min(metadata.width, 1080) })
      .webp({ quality: 85, effort: 6 })
      .toFile(item.dest);
    
    console.log(`Saved ${item.dest}`);
  }
}

processImages().catch(console.error);

