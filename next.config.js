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

// 2. Automatically generate required public branding assets if missing
try {
  const publicDir = path.resolve('./public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const logoPath = path.join(publicDir, 'logo.png');
  if (!fs.existsSync(logoPath)) {
    const generatePng = async (svgString, width, height, outputPath) => {
      try {
        await sharp(Buffer.from(svgString))
          .resize(width, height)
          .png()
          .toFile(outputPath);
      } catch (e) {
        console.error('Failed to generate image:', outputPath, e);
      }
    };

    const logoSvg = `
    <svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#DD183B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#990F24;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="10" y="30" width="16" height="90" fill="url(#grad)" rx="4"/>
      <text x="45" y="95" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-2">VClick</text>
      <text x="210" y="95" fill="#8E8E8E" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="300" letter-spacing="-1">Digitally</text>
    </svg>
    `;

    const iconSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#DD183B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#990F24;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="#0B0B0B" rx="100"/>
      <rect x="236" y="106" width="40" height="300" fill="url(#grad)" rx="10"/>
      <text x="180" y="320" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="180" font-weight="900">V</text>
    </svg>
    `;

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

    await generatePng(logoSvg, 500, 150, logoPath);
    await generatePng(iconSvg, 192, 192, path.join(publicDir, 'icon-192.png'));
    await generatePng(iconSvg, 512, 512, path.join(publicDir, 'icon-512.png'));
    await generatePng(iconSvg, 180, 180, path.join(publicDir, 'apple-touch-icon.png'));
    await generatePng(iconSvg, 32, 32, path.join(publicDir, 'shortcut-icon.png'));
    await generatePng(iconSvg, 32, 32, path.join(publicDir, 'favicon.ico'));
    await generatePng(ogSvg, 1200, 630, path.join(publicDir, 'og-image.png'));
  }
} catch (err) {
  console.error('Error generating assets:', err);
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
