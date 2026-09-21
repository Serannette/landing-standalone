import './SwipeHint.css';
import { IconArrowLeft, IconArrowRight } from '../ui/Icons';

/** Small "swipe or drag" cue with nudging arrows. Calms down once the person has interacted. */
export default function SwipeHint({ done = false }: { done?: boolean }) {
  return (
    <div className={`sw-hint${done ? ' is-done' : ''}`} aria-hidden="true">
      <IconArrowLeft size={14} className="sw-arrow sw-arrow--l" />
      <span className="sw-text">Swipe or drag</span>
      <IconArrowRight size={14} className="sw-arrow sw-arrow--r" />
    </div>
  );
}
