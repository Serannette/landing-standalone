import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

type Options = {
  /** Number of slides. */
  count: number;
  /** Element that receives pointer, wheel and keyboard-free gestures. */
  stageRef: RefObject<HTMLElement | null>;
  /** Pixel distance between the start of one slide and the next. */
  getStride: () => number;
  /** Position every slide for a (fractional) position. Runs on every animation frame. */
  render: (pos: number, stride: number) => void;
  /** Fires when the nearest slide changes. */
  onIndex?: (index: number) => void;
  /** Fires the first time the person drags or scrolls it. */
  onInteract?: () => void;
};

const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Infinite, position-based carousel engine.
 *
 * The carousel has one continuous `pos` (in slides). Dragging changes `pos` in
 * proportion to distance, releasing projects it forward using the release
 * velocity (so a long or fast swipe travels several slides), and it then eases
 * to the nearest whole slide. Slides are wrapped by the caller's `render`, so
 * the carousel loops forever in both directions.
 */
export function useInfiniteCarousel(options: Options) {
  const latest = useRef(options);
  useLayoutEffect(() => {
    latest.current = options;
  });

  const pos = useRef(0);
  const index = useRef(-1);
  const anim = useRef(0);

  const setPos = useCallback((p: number) => {
    const { count, getStride, render, onIndex } = latest.current;
    pos.current = p;
    render(p, getStride());
    const i = mod(Math.round(p), count);
    if (i !== index.current) {
      index.current = i;
      onIndex?.(i);
    }
  }, []);

  const animateTo = useCallback(
    (target: number, duration?: number) => {
      cancelAnimationFrame(anim.current);
      const from = pos.current;
      const dist = Math.abs(target - from);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finish = () => setPos(mod(target, latest.current.count));
      if (reduce || dist < 0.001) {
        finish();
        return;
      }
      const ms = duration ?? Math.min(950, 360 + 110 * dist);
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        const eased = 1 - Math.pow(1 - t, 3);
        if (t < 1) {
          setPos(from + (target - from) * eased);
          anim.current = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      anim.current = requestAnimationFrame(tick);
    },
    [setPos],
  );

  const goTo = useCallback(
    (i: number) => {
      const n = latest.current.count;
      const base = Math.round(pos.current);
      // Shortest way round the loop.
      const delta = mod(i - base + n / 2, n) - n / 2;
      animateTo(base + delta);
    },
    [animateTo],
  );
  const next = useCallback(() => animateTo(Math.round(pos.current) + 1), [animateTo]);
  const prev = useCallback(() => animateTo(Math.round(pos.current) - 1), [animateTo]);

  useLayoutEffect(() => {
    setPos(0);
  }, [setPos]);

  useEffect(() => {
    const stage = options.stageRef.current;
    if (!stage) return;

    let down = false;
    let dragging = false;
    let startX = 0;
    let startPos = 0;
    let samples: { x: number; t: number }[] = [];
    let wheelTimer = 0;

    const swallowClick = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
    };

    function onDown(e: PointerEvent) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      cancelAnimationFrame(anim.current);
      down = true;
      dragging = false;
      startX = e.clientX;
      startPos = pos.current;
      samples = [{ x: e.clientX, t: e.timeStamp }];
    }

    function onMove(e: PointerEvent) {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 6) {
        dragging = true;
        stage!.setPointerCapture(e.pointerId);
        stage!.classList.add('is-dragging');
        latest.current.onInteract?.();
      }
      if (!dragging) return;
      setPos(startPos - dx / latest.current.getStride());
      samples.push({ x: e.clientX, t: e.timeStamp });
      while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift();
    }

    function onUp(e: PointerEvent) {
      if (!down) return;
      down = false;
      if (!dragging) {
        // A tap that interrupted a glide: settle on the nearest slide.
        if (Math.abs(pos.current - Math.round(pos.current)) > 0.001) animateTo(Math.round(pos.current));
        return;
      }
      dragging = false;
      stage!.classList.remove('is-dragging');
      if (stage!.hasPointerCapture(e.pointerId)) stage!.releasePointerCapture(e.pointerId);
      // The release must not click whatever slide is under the cursor.
      stage!.addEventListener('click', swallowClick, { capture: true, once: true });
      window.setTimeout(() => stage!.removeEventListener('click', swallowClick, true), 0);

      const stride = latest.current.getStride();
      const dx = e.clientX - startX;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.t - first.t;
      // If the pointer rested before release there is no momentum to carry over.
      const rested = e.timeStamp - last.t > 80;
      const velocity = dt > 0 && !rested ? (last.x - first.x) / dt : 0; // px per ms, negative = towards next
      const projected = pos.current - (velocity * 260) / stride; // ~260ms of momentum
      const maxJump = latest.current.count; // a fling can travel at most one lap
      let target = Math.round(Math.min(Math.max(projected, startPos - maxJump), startPos + maxJump));
      // A deliberate short drag should still move one slide.
      if (target === Math.round(startPos) && Math.abs(dx) > 50) target += dx < 0 ? 1 : -1;
      animateTo(target);
    }

    // Trackpad / shift-wheel horizontal scrolling.
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      cancelAnimationFrame(anim.current);
      latest.current.onInteract?.();
      setPos(pos.current + e.deltaX / latest.current.getStride());
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => animateTo(Math.round(pos.current)), 140);
    }

    const ro = new ResizeObserver(() => setPos(pos.current));
    ro.observe(stage);

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(anim.current);
      window.clearTimeout(wheelTimer);
      ro.disconnect();
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('wheel', onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateTo, setPos]);

  return { goTo, next, prev };
}
