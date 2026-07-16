import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'BUILD. RANK. SCALE.';
    const description = searchParams.get('description') || 'Search Intelligence & Growth Sprints.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#050505',
            padding: '80px 80px',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Premium Radial Glow (Top Right) */}
          <div
            style={{
              position: 'absolute',
              top: '-150px',
              right: '-150px',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(193, 18, 31, 0.15) 0%, rgba(193, 18, 31, 0) 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Brutalist Grid Coordinate Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              opacity: 0.06,
            }}
          >
            {/* Horizontal Gridlines */}
            <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', top: '90%', left: 0, right: 0, height: '1px', backgroundColor: '#ffffff' }} />
            
            {/* Vertical Gridlines */}
            <div style={{ position: 'absolute', left: '10%', top: 0, bottom: 0, width: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', left: '30%', top: 0, bottom: 0, width: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', left: '70%', top: 0, bottom: 0, width: '1px', backgroundColor: '#ffffff' }} />
            <div style={{ position: 'absolute', left: '90%', top: 0, bottom: 0, width: '1px', backgroundColor: '#ffffff' }} />
          </div>

          {/* Top Panel: Branding & Slogan */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '24px', backgroundColor: '#C1121F' }} />
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', letterSpacing: '0.18em', fontFamily: 'sans-serif' }}>
                VCLICK / DIGITALLY
              </span>
            </div>
            
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#C1121F', letterSpacing: '0.3em', fontFamily: 'sans-serif' }}>
              THE NEW DIGITAL STANDARD
            </span>
          </div>

          {/* Editorial Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10, marginTop: '20px' }}>
            <h1
              style={{
                fontSize: '68px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: '-0.04em',
                fontFamily: 'sans-serif',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#8E8E8E',
                marginTop: '18px',
                maxWidth: '750px',
                lineHeight: 1.5,
                fontFamily: 'sans-serif',
              }}
            >
              {description}
            </p>
          </div>

          {/* Bottom Panel: Capabilities & Domain */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>
                SEO
              </span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>
                WEBSITE DEVELOPMENT
              </span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>
                PERFORMANCE MARKETING
              </span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>
                BRAND STRATEGY
              </span>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, color: '#C1121F', letterSpacing: '0.15em', fontFamily: 'sans-serif' }}>
              vclickdigitally.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response('Failed to generate Open Graph image', { status: 500 });
  }
}
