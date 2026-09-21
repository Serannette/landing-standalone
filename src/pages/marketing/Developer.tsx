import { useEffect, useState } from 'react';
import './Developer.css';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { IconExternalLink } from '../../components/ui/Icons';

const TYPING_LINES = [
  'BUILDING SECURE SOFTWARE SYSTEMS',
  'EXPLORING CLOUD, SECURITY, AND AI',
  'LEARNING THROUGH REAL-WORLD PROJECTS',
  'DESIGNING FOR SCALE AND RELIABILITY',
  'GAME DEVELOPMENT??',
];

export default function Developer() {
  const [status, setStatus] = useState<'scanning' | 'granted'>('scanning');
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setStatus('granted'), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let lineIndex = 0;
    let text = '';
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPING_LINES[lineIndex % TYPING_LINES.length];

      if (phase === 'typing') {
        if (text.length < current.length) {
          text = current.slice(0, text.length + 1);
          setTypedText(text);
          timeoutId = setTimeout(tick, 38);
        } else {
          phase = 'pausing';
          timeoutId = setTimeout(tick, 1500);
        }
        return;
      }

      if (phase === 'pausing') {
        phase = 'deleting';
        timeoutId = setTimeout(tick, 1500);
        return;
      }

      // deleting
      if (text.length > 0) {
        text = current.slice(0, text.length - 1);
        setTypedText(text);
        timeoutId = setTimeout(tick, 22);
      } else {
        phase = 'typing';
        lineIndex = (lineIndex + 1) % TYPING_LINES.length;
        timeoutId = setTimeout(tick, 38);
      }
    };

    timeoutId = setTimeout(tick, 38);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="mkt-root">
      <MarketingHeader />

      <section className="dv-hero">
        <div className="dv-hero-inner">
          <div className="dv-intro">
            <div className="dv-boot-tag">
              <span className="dv-blink-dot" />
              System boot // developer profile
            </div>

            <h1 className="dv-name">
              Raphael Jake<span className="dv-accent-dot">.</span>
              <br />
              <span className="dv-name-gradient">Caasi</span>
            </h1>

            <div className="dv-typing-row">
              <span className="dv-typing-text">{typedText}</span>
              <span className="dv-typing-cursor" />
            </div>

            <p className="dv-lede">
              Built Apollo Light end to end — from the QR scanning flow to the role-based
              dashboards schools use every day.
            </p>

            <div className="dv-cta-row">
              <a
                href="https://rjake.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="dv-portfolio-link"
              >
                Visit portfolio <IconExternalLink size={15} />
              </a>
              <a href="mailto:Raphaeljakecaasi@gmail.com" className="dv-connect-link">
                Connect
              </a>
            </div>
          </div>

          <div className="dv-badge-wrap dv-badge-in">
            <div className="dv-badge-rotate">
              <div className="dv-badge-hole" />
              <div className="dv-badge">
                <div className="dv-badge-scanline" />
                <div className="dv-badge-noise" />

                <div className="dv-badge-row">
                  <span>University of Southeastern Philippines</span>
                  <span className="dv-badge-id">
                    <span className={`dv-status-dot ${status === 'granted' ? 'is-granted' : 'is-scanning'}`} />
                    ID
                  </span>
                </div>

                <div className="dv-badge-photo">
                  <img src="/announcements/images/jake/profile.jpg" alt="Raphael Jake Caasi" />
                </div>

                <div className="dv-badge-name">
                  <p>Raphael Jake Caasi</p>
                  <span>IT Student — Information Security</span>
                </div>

                <div className="dv-badge-meta">
                  <div>
                    <span>Clearance</span>
                    <span>Level 4 // Full-Stack &amp; Security</span>
                  </div>
                  <div>
                    <span>ID_NO</span>
                    <span>RJC-2026-0417</span>
                  </div>
                  <div>
                    <span>Status</span>
                    <span className={`dv-badge-status ${status === 'granted' ? 'is-granted' : 'is-scanning'}`}>
                      {status === 'granted' ? 'Access Granted' : 'Verifying…'}
                    </span>
                  </div>
                </div>

                <div className="dv-badge-barcode">
                  {Array.from({ length: 34 }).map((_, i) => (
                    <span key={i} style={{ height: `${((i * 37) % 100) / 4 + 25}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
