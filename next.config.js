import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. Clean up duplicate workspace parent lockfile if it exists
try {
  const parentLock = path.resolve('../package-lock.json');
  if (fs.existsSync(parentLock)) {
    fs.unlinkSync(parentLock);
  }
} catch (err) {
  // Silent fail
}

// 2. Automatically generate required public branding assets
try {
  const publicDir = path.resolve('./public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const downloadsDir = 'C:\\Users\\DELL\\Downloads';
  const assetsToCopy = [
    { src: 'Header Vclick Digitally logo..svg', dest: 'Header Vclick Digitally logo.svg' },
    { src: 'Mobile Header Vclick Digitally logo.svg', dest: 'Mobile Header Vclick Digitally logo.svg' },
    { src: 'Footer Vclick Digitally logo.svg', dest: 'Footer Vclick Digitally logo.svg' },
    { src: 'Fav Icon.svg', dest: 'Fav Icon.svg' },
    { src: 'Apple touch icon.svg', dest: 'Apple touch icon.svg' },
    { src: 'Android Icon (512 x 512 px).svg', dest: 'Android Icon (512 x 512 px).svg' }
  ];

  // Copy files from Downloads if they exist
  for (const asset of assetsToCopy) {
    const srcPath = path.join(downloadsDir, asset.src);
    const destPath = path.join(publicDir, asset.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // Generate PNGs/ICO using sharp
  const generatePng = async (inputPath, width, height, outputPath) => {
    try {
      if (fs.existsSync(inputPath)) {
        await sharp(inputPath)
          .resize(width, height)
          .png()
          .toFile(outputPath);
      }
    } catch (e) {
      console.error('Failed to generate image:', outputPath, e);
    }
  };

  const headerLogoSvg = path.join(publicDir, 'Header Vclick Digitally logo.svg');
  const favIconSvg = path.join(publicDir, 'Fav Icon.svg');
  const appleIconSvg = path.join(publicDir, 'Apple touch icon.svg');
  const androidIconSvg = path.join(publicDir, 'Android Icon (512 x 512 px).svg');

  // Perform generations
  if (fs.existsSync(headerLogoSvg)) {
    await generatePng(headerLogoSvg, 500, 150, path.join(publicDir, 'logo.png'));
  }
  if (fs.existsSync(favIconSvg)) {
    await generatePng(favIconSvg, 32, 32, path.join(publicDir, 'favicon.ico'));
    await generatePng(favIconSvg, 32, 32, path.join(publicDir, 'shortcut-icon.png'));
  }
  if (fs.existsSync(appleIconSvg)) {
    await generatePng(appleIconSvg, 180, 180, path.join(publicDir, 'apple-touch-icon.png'));
  }
  if (fs.existsSync(androidIconSvg)) {
    await generatePng(androidIconSvg, 192, 192, path.join(publicDir, 'icon-192.png'));
    await generatePng(androidIconSvg, 512, 512, path.join(publicDir, 'icon-512.png'));
  }

  // Generate fallback og-image if not present
  const ogImagePath = path.join(publicDir, 'og-image.png');
  if (!fs.existsSync(ogImagePath)) {
    const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0B0B0B"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#DD183B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#990F24;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="100" y="240" width="30" height="150" fill="url(#grad)" rx="8"/>
      <text x="160" y="340" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="90" font-weight="900" letter-spacing="-3">VClick</text>
      <text x="460" y="340" fill="#8E8E8E" font-family="system-ui, -apple-system, sans-serif" font-size="90" font-weight="300" letter-spacing="-2">Digitally</text>
      <text x="160" y="440" fill="#8E8E8E" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="400" letter-spacing="1">ENTERPRISE GROWTH AGENCY</text>
    </svg>
    `;
    await sharp(Buffer.from(ogSvg))
      .resize(1200, 630)
      .png()
      .toFile(ogImagePath);
  }
} catch (err) {
  console.error('Error generating assets:', err);
}

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withBundleAnalyzer(nextConfig);
