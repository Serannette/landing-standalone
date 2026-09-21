import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { IconWrench } from '../ui/Icons';
import './MarketingFooter.css';
import apolloIndustriesLogo from '../../assets/logos/apollo-industries-white.png';

export default function MarketingFooter() {
  const [buildingOpen, setBuildingOpen] = useState(false);

  return (
    <footer className="mf-footer">
      <div className="mf-inner">
        <div className="mf-col mf-col-brand">
          <img
            src={apolloIndustriesLogo}
            alt="Apollo Industries"
            className="mf-brand-logo"
          />
          <p className="mf-tagline">
            Where innovation finds purpose, and possibilities become reality.
          </p>
        </div>

        <div className="mf-col">
          <span className="mf-col-title">Contact</span>
          <a href="mailto:Raphaeljakecaasi@gmail.com" className="mf-contact-link">
            Raphaeljakecaasi@gmail.com
          </a>
          <Link to="/support" className="mf-contact-link">
            Support center
          </Link>
        </div>

        <div className="mf-col">
          <span className="mf-col-title">Company</span>
          <button type="button" className="mf-contact-link mf-contact-btn" onClick={() => setBuildingOpen(true)}>
            About
          </button>
          <button type="button" className="mf-contact-link mf-contact-btn" onClick={() => setBuildingOpen(true)}>
            Features
          </button>
        </div>
      </div>

      <div className="mf-bottom">
        <span className="mf-copyright">© 2026 Apollo Industries. All rights reserved.</span>
        <span className="mf-handle">@apollo2026</span>
        <a
          href="https://rjake.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="al-dev-credit mf-dev-credit"
        >
          <span className="al-dev-credit-text">
            Developed by <b>Raphael Jake Caasi</b>
          </span>
        </a>
      </div>

      <Modal open={buildingOpen} onClose={() => setBuildingOpen(false)} closeOnOverlayClick maxWidth={380}>
        <div className="mf-building-modal">
          <div className="mf-building-icon">
            <IconWrench size={20} />
          </div>
          <p className="mf-building-eyebrow">Under construction</p>
          <h2>We're still building this world</h2>
          <p className="mf-building-message">
            This page isn't ready yet — watch out for it in a future update.
          </p>
          <Button variant="primary" fullWidth onClick={() => setBuildingOpen(false)}>
            Got it
          </Button>
        </div>
      </Modal>
    </footer>
  );
}
