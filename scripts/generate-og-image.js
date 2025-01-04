import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function generateOGImage() {
  const svgBuffer = readFileSync(join(projectRoot, 'public/images/og-image.svg'));
  
  await sharp(svgBuffer)
    .resize(1200, 630)
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4'
    })
    .toFile(join(projectRoot, 'public/images/og-image.jpg'));
    
  console.log('OpenGraph image generated successfully!');
}

generateOGImage().catch(console.error); 