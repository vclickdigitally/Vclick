import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VClick Digitally';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '8px solid #DD183B',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ width: '12px', height: '40px', background: '#DD183B' }} />
          <span style={{ fontSize: '48px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>
            VCLICK / DIGITALLY
          </span>
        </div>
        <p style={{ fontSize: '20px', color: '#8E8E8E', maxWidth: '600px', textAlign: 'center', lineHeight: 1.5 }}>
          Enterprise Growth Agency - SEO, Next.js Development, and Visual Product Design.
        </p>
      </div>
    ),
    { ...size }
  );
}
