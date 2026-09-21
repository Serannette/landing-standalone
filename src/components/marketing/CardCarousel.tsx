import { Children, useRef, useState, type ReactNode } from 'react';
import './CardCarousel.css';
import SwipeHint from './SwipeHint';
import { useInfiniteCarousel } from './useInfiniteCarousel';
import { IconArrowLeft, IconArrowRight } from '../ui/Icons';

type Props = {
  children: ReactNode;
  label: string;
};

/** Infinite carousel of cards: swipe, drag, arrows, dots, or keyboard. */
export default function CardCarousel({ children, label }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const count = Children.count(children);

  const { goTo, next, prev } = useInfiniteCarousel({
    count,
    stageRef,
    getStride: () => {
      const stage = stageRef.current;
      const item = stage?.querySelector<HTMLElement>('.cc-item');
      if (!stage || !item) return 320;
      return item.offsetWidth + (parseFloat(getComputedStyle(stage).getPropertyValue('--gap')) || 0);
    },
    // Cards keep their order and wrap: one that leaves on the left re-enters
    // on the right, so the row never ends.
    render: (pos, stride) => {
      const stage = stageRef.current;
      if (!stage) return;
      stage.querySelectorAll<HTMLElement>('.cc-item').forEach((el, i) => {
        let d = i - pos;
        d -= count * Math.floor((d + 1.5) / count);
        el.style.transform = `translateX(${d * stride}px)`;
      });
    },
    onIndex: setActive,
    onInteract: () => setInteracted(true),
  });

  return (
    <div className="cc" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={stageRef}
        className="cc-track"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            setInteracted(true);
            next();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setInteracted(true);
            prev();
          }
        }}
      >
        {Children.map(children, (child, i) => (
          <div className="cc-item" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="cc-controls">
        <SwipeHint done={interacted} />

        <div className="cc-dots" role="tablist" aria-label="Choose a card">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to card ${i + 1}`}
              className={`cc-dot${i === active ? ' is-active' : ''}`}
              onClick={() => {
                setInteracted(true);
                goTo(i);
              }}
            />
          ))}
        </div>

        <div className="cc-arrows">
          <button
            type="button"
            className="cc-arrow"
            aria-label="Previous"
            onClick={() => {
              setInteracted(true);
              prev();
            }}
          >
            <IconArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="cc-arrow"
            aria-label="Next"
            onClick={() => {
              setInteracted(true);
              next();
            }}
          >
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
