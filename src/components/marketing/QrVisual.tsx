import { useEffect, useRef } from 'react';
import './QrVisual.css';

const QR_PATTERN = [
  1,1,1,0,0,1,0,1,1,1,1,
  1,0,1,0,1,0,1,0,0,0,1,
  1,0,1,0,0,0,1,0,1,1,1,
  1,1,1,0,1,1,0,0,0,0,0,
  0,0,0,0,0,1,1,1,0,1,0,
  1,1,0,1,1,0,0,1,1,0,1,
  0,0,1,0,0,1,1,0,1,0,0,
  1,1,1,0,1,0,0,0,0,1,1,
  1,0,1,0,0,1,1,1,0,0,1,
  1,0,1,0,1,0,0,1,0,1,0,
  1,1,1,0,1,1,0,1,1,1,1,
];
const ANCHORS = new Set([0,1,2,9,10,11,12,13,20,21,22,99,100,101,108,109,110,111,112,119,120,121]);

export default function QrVisual() {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const photons: HTMLDivElement[] = [];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'al-photon';
      p.style.left = `${10 + Math.random() * 80}%`;
      p.style.setProperty('--dx', `${Math.random() * 30 - 15}px`);
      p.style.animationDelay = `${Math.random() * 2.4}s`;
      shell.appendChild(p);
      photons.push(p);
    }
    return () => photons.forEach((p) => p.remove());
  }, []);

  return (
    <div className="al-qr-shell" ref={shellRef}>
      <div className="al-qr-frame-corner tl" />
      <div className="al-qr-frame-corner tr" />
      <div className="al-qr-frame-corner bl" />
      <div className="al-qr-frame-corner br" />
      <div className="al-pulse-ring" />
      <div className="al-qr-grid">
        {QR_PATTERN.map((v, i) => (
          <div key={i} className={`al-qr-cell${v ? (ANCHORS.has(i) ? ' anchor' : ' on') : ''}`} />
        ))}
      </div>
      <div className="al-scan-beam" />
    </div>
  );
}
