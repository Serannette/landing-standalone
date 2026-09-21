import { useEffect, useState } from 'react';
import './RoleSlideshow.css';

const ROLE_SLIDES = [
  { title: 'Built for speed.', sub: '' },
  { title: 'Instant by design.', sub: '' },
  { title: 'Fast. Secure. Reliable.', sub: '' },
  { title: 'Attendance. At light speed.', sub: '' },
  { title: 'Scan. Verify. Done.', sub: '' },
];

export default function RoleSlideshow() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const holdMs = 2400;
    const wipeMs = 500;
    const hold = setTimeout(() => setPhase('out'), holdMs);
    const advance = setTimeout(() => {
      setIndex((i) => (i + 1) % ROLE_SLIDES.length);
      setPhase('in');
    }, holdMs + wipeMs);
    return () => {
      clearTimeout(hold);
      clearTimeout(advance);
    };
  }, [index]);

  const slide = ROLE_SLIDES[index];

  return (
    <div className="al-role-hint al-role-slideshow" style={{ textAlign: 'center' }}>
      <div className={`al-role-slide al-role-slide--${phase}`} key={index}>
        <b className="al-role-title" style={{ color: 'var(--al-yellow, #FFD700)' }}>
          {slide.title}
        </b>
      </div>
    </div>
  );
}
