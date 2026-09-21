import { useRef, useState, type KeyboardEvent } from 'react';
import './AppShowcase.css';
import eventsImg from '../../assets/screens/events.png';
import qrImg from '../../assets/screens/qr-code.png';
import homeImg from '../../assets/screens/home.png';
import scannerImg from '../../assets/screens/qr-scanner.png';
import eventCreationImg from '../../assets/screens/event-creation.png';
import beadlesImg from '../../assets/screens/beadles.png';
import reportsImg from '../../assets/screens/reports.png';
import { IconArrowLeft, IconArrowRight } from '../ui/Icons';
import SwipeHint from './SwipeHint';
import { useInfiniteCarousel } from './useInfiniteCarousel';

type Screen = {
  id: string;
  label: string;
  role: string;
  body: string;
  image: string;
  alt: string;
};

const SCREENS: Screen[] = [
  {
    id: 'events',
    label: 'Events page',
    role: 'Student',
    body: 'Every event a student can check in to, with required events flagged and the in/out times and status on each card.',
    image: eventsImg,
    alt: 'Events page listing events with required badge, time in and time out windows, and completion status',
  },
  {
    id: 'qr',
    label: 'QR page',
    role: 'Student',
    body: 'A personal check-in QR code with the student ID, name, and department. Download it or open it full screen.',
    image: qrImg,
    alt: 'QR code page showing a personal check-in QR code with student ID, name, and department',
  },
  {
    id: 'home',
    label: 'Home page',
    role: 'Student',
    body: 'Upcoming events and the last few check-ins at a glance, with each scan marked on time or late.',
    image: homeImg,
    alt: 'Home page with upcoming events and a list of recent scans',
  },
  {
    id: 'scanner',
    label: 'QR scanner page',
    role: 'Beadle',
    body: 'Point the camera at a student’s QR code, confirm the name that appears, and record the scan. Every scan lands in the log below.',
    image: scannerImg,
    alt: 'QR scanner page with a live camera view, a detected student name, and Dismiss and Scan buttons',
  },
  {
    id: 'event-creation',
    label: 'Event creation',
    role: 'Admin',
    body: 'Set the date, then separate time in and time out windows, so scans are only accepted when they should be.',
    image: eventCreationImg,
    alt: 'Create an event form with title, description, date, and time in and time out windows',
  },
  {
    id: 'beadles',
    label: 'Beadle page',
    role: 'Admin',
    body: 'Manage beadle accounts in one place: who they are, their school and course, and what they can access.',
    image: beadlesImg,
    alt: 'Beadles page listing beadle accounts with email, school, course, and active status',
  },
  {
    id: 'reports',
    label: 'Report page',
    role: 'Admin',
    body: 'Attendance counts for present, late, incomplete, absent, and excused, searchable and ready to export as CSV or PDF.',
    image: reportsImg,
    alt: 'Attendance report with status counts, search, and CSV and PDF export buttons',
  },
];

export default function AppShowcase() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const n = SCREENS.length;

  const { goTo, next, prev } = useInfiniteCarousel({
    count: n,
    stageRef,
    getStride: () => {
      const stage = stageRef.current;
      const slide = stage?.querySelector<HTMLElement>('.sc-slide');
      if (!stage || !slide) return 300;
      return slide.offsetWidth + (parseFloat(getComputedStyle(stage).getPropertyValue('--gap')) || 0);
    },
    // Lay every slide out around the centre. `d` is how many slides away from
    // the centre it is (wrapped so the carousel loops), so slides glide,
    // scale and fade continuously while dragging.
    render: (pos, stride) => {
      const stage = stageRef.current;
      if (!stage) return;
      stage.querySelectorAll<HTMLElement>('.sc-slide').forEach((el, i) => {
        let d = i - pos;
        d -= n * Math.round(d / n);
        const a = Math.min(Math.abs(d), 1);
        el.style.transform = `translateX(${d * stride}px) scale(${1 - 0.12 * a})`;
        el.style.opacity = String(1 - 0.55 * a);
        el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
        const cap = el.querySelector<HTMLElement>('.sc-cap');
        if (cap) {
          const c = Math.max(0, 1 - Math.abs(d) * 1.8);
          cap.style.opacity = String(c);
          cap.style.transform = `translateY(${(1 - c) * -6}px)`;
        }
      });
    },
    onIndex: setActive,
    onInteract: () => setInteracted(true),
  });

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setInteracted(true);
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setInteracted(true);
      prev();
    }
  }

  return (
    <div className="sc-carousel" role="region" aria-roledescription="carousel" aria-label="App screens" onKeyDown={onKeyDown}>
      <div className="sc-stage">
        <button
          type="button"
          className="sc-nav sc-nav--prev"
          aria-label="Previous screen"
          onClick={() => {
            setInteracted(true);
            prev();
          }}
        >
          <IconArrowLeft size={20} />
        </button>

        <div className="sc-track" ref={stageRef} tabIndex={0} aria-label="Swipe to browse screens">
          {SCREENS.map((s, i) => (
            <figure
              key={s.id}
              className={`sc-slide${i === active ? ' is-active' : ''}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.label}`}
              aria-hidden={i !== active}
              onClick={() => {
                if (i !== active) goTo(i);
              }}
            >
              <div className="sc-phone">
                <div className="sc-phone-screen">
                  <img src={s.image} alt={s.alt} className="sc-shot" draggable={false} />
                </div>
              </div>
              <figcaption className="sc-cap">
                <span className="sc-cap-head">
                  <span className="sc-cap-label">{s.label}</span>
                  <span className="sc-cap-role">{s.role}</span>
                </span>
                <span className="sc-cap-body">{s.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="sc-nav sc-nav--next"
          aria-label="Next screen"
          onClick={() => {
            setInteracted(true);
            next();
          }}
        >
          <IconArrowRight size={20} />
        </button>
      </div>

      <div className="sc-hint-row">
        <SwipeHint done={interacted} />
      </div>

      <div className="sc-dots" role="tablist" aria-label="Choose a screen">
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.label}
            className={`sc-dot${i === active ? ' is-active' : ''}`}
            onClick={() => {
              setInteracted(true);
              goTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
