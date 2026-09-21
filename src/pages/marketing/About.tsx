import './About.css';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { IconQr, IconUsers, IconBarChart } from '../../components/ui/Icons';

const STEPS = [
  {
    icon: IconQr,
    title: 'Student shows their QR badge',
    body: 'Every student gets a unique, single-use QR code tied to their account — no printouts or manual sign-in sheets.',
  },
  {
    icon: IconUsers,
    title: 'Beadle scans it',
    body: 'Beadles run the scanner during events and class periods, verifying attendance in the moment, not after the fact.',
  },
  {
    icon: IconBarChart,
    title: 'Attendance logs in real time',
    body: 'Every scan syncs instantly to the database, so admin and student dashboards stay accurate the whole day.',
  },
];

export default function About() {
  return (
    <div className="mkt-root">
      <MarketingHeader />

      <section className="ab-hero">
        <div className="ab-hero-inner">
          <p className="al-eyebrow">About Apollo Light</p>
          <h1>Attendance, without the paperwork.</h1>
          <p className="ab-lede">
            Apollo Light is a QR-powered attendance system built for schools. It replaces manual
            roll calls and paper sign-in sheets with a scan that logs instantly — accurate,
            auditable, and available the moment it happens.
          </p>
        </div>
      </section>

      <section className="ab-section">
        <div className="ab-section-inner">
          <h2>Who it's for</h2>
          <div className="ab-audience-grid">
            <div className="ab-audience-card">
              <h3>Schools &amp; admins</h3>
              <p>Manage departments, events, and reporting across an entire school from one dashboard.</p>
            </div>
            <div className="ab-audience-card">
              <h3>Beadles</h3>
              <p>Run the scanner at events and class periods, and keep attendance current in the moment.</p>
            </div>
            <div className="ab-audience-card">
              <h3>Students</h3>
              <p>Carry a personal QR badge and see their own attendance history and upcoming events.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-section ab-how">
        <div className="ab-section-inner">
          <h2>How it works</h2>
          <div className="ab-steps">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div className="ab-step" key={title}>
                <div className="ab-step-icon"><Icon size={20} /></div>
                <div>
                  <p className="ab-step-index">Step {i + 1}</p>
                  <h3>{title}</h3>
                  <p className="ab-step-body">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
