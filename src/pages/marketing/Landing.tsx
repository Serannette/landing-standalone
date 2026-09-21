import { Link } from 'react-router-dom';
import './Landing.css';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import QrVisual from '../../components/marketing/QrVisual';
import RoleSlideshow from '../../components/marketing/RoleSlideshow';
import {
  IconQr,
  IconBarChart,
  IconLayers,
  IconShieldCheck,
  IconZap,
  IconRefreshCw,
} from '../../components/ui/Icons';

const HIGHLIGHTS = [
  {
    icon: IconQr,
    title: 'QR-based check-in',
    body: 'Students show a single-use QR badge; beadles scan it in seconds — no rosters, no paperwork.',
  },
  {
    icon: IconBarChart,
    title: 'Real-time attendance sync',
    body: 'Every scan lands instantly in the database, so dashboards never fall behind what happened in the room.',
  },
  {
    icon: IconLayers,
    title: 'Role-based dashboards',
    body: 'Admins and students each get a scoped view built around what they actually need to do.',
  },
  {
    icon: IconShieldCheck,
    title: 'Audit logging',
    body: 'Every scan and change is recorded, so schools can always answer "who checked in, and when?"',
  },
];

export default function Landing() {
  return (
    <div className="mkt-root">
      <MarketingHeader />

      <section className="lp-hero">
        <div className="lp-hero-grid-overlay" />

        <div className="lp-hero-inner">
          <div className="lp-hero-copy">
            <div className="lp-badge">QR Attendance</div>
            <h1 className="lp-tagline">
              Presence captured<br /><em>at the speed of light.</em>
            </h1>
            <p className="lp-subline">
              Every second counts. So why waste them?
              <br />
              Secure QR-powered attendance for schools. Fast, reliable, and always up to date.
            </p>

            <div className="lp-cta-row">
              <Link to="/login" className="al-btn-primary lp-cta-btn">
                <span>Login</span>
              </Link>
              <Link to="/features" className="lp-cta-secondary">
                See features
              </Link>
            </div>

            <div className="lp-icon-strip">
              <div className="lp-icon-chip" title="Scan to log in under 400ms">
                <span className="lp-icon-chip-icon"><IconZap size={18} /></span>
                <span className="lp-icon-chip-label">Instant scans</span>
              </div>
              <div className="lp-icon-chip" title="Reliable, always available">
                <span className="lp-icon-chip-icon"><IconShieldCheck size={18} /></span>
                <span className="lp-icon-chip-label">Reliable</span>
              </div>
              <div className="lp-icon-chip" title="Live database sync">
                <span className="lp-icon-chip-icon"><IconRefreshCw size={18} /></span>
                <span className="lp-icon-chip-label">Live sync</span>
              </div>
              <div className="lp-icon-chip" title="One year in service">
                <span className="lp-icon-chip-icon lp-icon-chip-num">1</span>
                <span className="lp-icon-chip-label">Year in service</span>
              </div>
            </div>

            <RoleSlideshow />
          </div>

          <div className="lp-hero-visual">
            <QrVisual />
          </div>
        </div>
      </section>

      <section className="lp-highlights">
        <div className="lp-section-inner">
          <p className="al-eyebrow lp-eyebrow">What's inside</p>
          <h2 className="lp-section-title">Everything a school needs to track attendance, live.</h2>

          <div className="lp-highlight-grid">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
              <div className="lp-highlight-card" key={title}>
                <div className="lp-highlight-icon"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>

          <Link to="/features" className="lp-more-link">See all features →</Link>
        </div>
      </section>

      <section className="lp-cta-section">
        <div className="lp-section-inner lp-cta-inner">
          <h2>Ready to bring Apollo Light to your school?</h2>
          <p>Reach out and we'll get your school set up.</p>
          <div className="lp-cta-row">
            <Link to="/support" className="al-btn-primary lp-cta-btn">
              <span>Contact support</span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
