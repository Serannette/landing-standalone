import './Features.css';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import AppShowcase from '../../components/marketing/AppShowcase';
import CardCarousel from '../../components/marketing/CardCarousel';
import {
  IconQr,
  IconLayers,
  IconCalendar,
  IconBarChart,
  IconShieldCheck,
  IconFileSpreadsheet,
  IconPalette,
} from '../../components/ui/Icons';

const FEATURES = [
  {
    icon: IconQr,
    title: 'QR-based check-in',
    body: 'Beadles scan single-use QR codes with built-in expiry, so each badge is only valid for one check-in.',
  },
  {
    icon: IconLayers,
    title: 'Role-based access',
    body: 'Admins and students each get their own scoped dashboard and permissions.',
  },
  {
    icon: IconCalendar,
    title: 'Attendance windows & events',
    body: 'Set up events and attendance windows so scans are only accepted when and where they should be.',
  },
  {
    icon: IconBarChart,
    title: 'Real-time sync',
    body: 'Scans, events, and dashboards stay in sync instantly across every device and role.',
  },
  {
    icon: IconShieldCheck,
    title: 'Account verification & security',
    body: 'Email verification, a photo requirement for student badges, and full audit logs keep accounts trustworthy.',
  },
  {
    icon: IconFileSpreadsheet,
    title: 'Reporting',
    body: 'Generate student and attendance reports, and export them when you need the data elsewhere.',
  },
  {
    icon: IconPalette,
    title: 'Custom theming',
    body: 'Switch between light and dark mode and pick a color theme that fits your style.',
  },
];

export default function Features() {
  return (
    <div className="mkt-root">
      <MarketingHeader />

      <section className="fp-hero">
        <div className="fp-hero-inner">
          <p className="al-eyebrow">Features</p>
          <h1>Everything Apollo Light does, in one place.</h1>
          <p className="fp-lede">
            From the scan itself to the reports it feeds, here's what's built into the platform today.
          </p>
        </div>
      </section>

      <section className="fp-showcase-section">
        <div className="fp-showcase-inner">
          <p className="al-eyebrow">See it in action</p>
          <h2 className="fp-showcase-title">The screens your school will actually use.</h2>
          <p className="fp-showcase-lede">
            Swipe through the app, from a student’s QR code to the beadle’s scanner and the admin’s attendance reports.
          </p>
          <AppShowcase />
        </div>
      </section>

      <section className="fp-grid-section">
        <div className="fp-section-inner">
          <CardCarousel label="Features">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div className="fp-card" key={title}>
                <div className="fp-icon"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
