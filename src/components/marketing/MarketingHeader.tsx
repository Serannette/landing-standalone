import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './marketing-base.css';
import './MarketingHeader.css';
import Logo from '../logo/Logo';
import { IconMenu, IconX } from '../ui/Icons';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/developer', label: 'Developer' },
];

function getScrollY() {
  return Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
}

export default function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenYRef = useRef(0);
  const touchingPanelRef = useRef(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // The app scrolls inside <body> (global overflow rules), not the window, so a plain
    // window 'scroll' listener never fires. Listen in the capture phase so a scroll in
    // any container is caught, and read whichever scroller is actually moving.
    function onScroll() {
      const y = getScrollY();
      setScrolled(y > 8);
      // A finger resting on a nav link can trigger tiny rubber-band "scroll" events on
      // mobile even though nothing actually moved, so ignore scroll while a touch is
      // active on the panel, and otherwise only close once the page has genuinely
      // scrolled a real distance from where the menu was opened.
      if (touchingPanelRef.current) return;
      setMenuOpen((open) => (open && Math.abs(y - menuOpenYRef.current) > 12 ? false : open));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  // Smoothly scroll back to the top of the page on every route change, like a page transition.
  useEffect(() => {
    const behavior: ScrollBehavior = 'smooth';
    window.scrollTo({ top: 0, left: 0, behavior });
    if (typeof document.documentElement.scrollTo === 'function') {
      document.documentElement.scrollTo({ top: 0, behavior });
    } else {
      document.documentElement.scrollTop = 0;
    }
    if (typeof document.body.scrollTo === 'function') {
      document.body.scrollTo({ top: 0, behavior });
    } else {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  function toggleMenu() {
    setMenuOpen((v) => {
      const next = !v;
      if (next) menuOpenYRef.current = getScrollY();
      return next;
    });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`mh-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'mh-header--menu-open' : ''}`}>
      <div className="mh-inner">
        <Link to="/" className="mh-brand" onClick={closeMenu}>
          <Logo surface="dark" size={32} showWordmark={false} />
          <span className="mh-wordmark">Apollo <b>Light</b></span>
        </Link>

        <nav className="mh-nav mh-nav--desktop">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `mh-nav-link${isActive ? ' is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="mh-login-btn mh-login-btn--desktop">
          Login
        </Link>

        <button
          type="button"
          className="mh-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </div>

      <div
        className={`mh-mobile-panel ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        onTouchStart={() => { touchingPanelRef.current = true; }}
        onTouchEnd={() => { touchingPanelRef.current = false; }}
        onTouchCancel={() => { touchingPanelRef.current = false; }}
      >
        <nav className="mh-nav mh-nav--mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) => `mh-nav-link${isActive ? ' is-active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/login" className="mh-login-btn" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>
          Login
        </Link>
      </div>
    </header>
  );
}
