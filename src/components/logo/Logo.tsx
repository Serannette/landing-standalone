import './Logo.css';

type LogoProps = {
  /** 'dark' = for use on the dark cobalt sidebar. 'light' = for use on the paper canvas. */
  surface?: 'dark' | 'light';
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export default function Logo({ surface = 'light', size = 32, showWordmark = true, className = '' }: LogoProps) {
  return (
    <div className={`al-logo al-logo--${surface} ${className}`}>
      <img
        src="/import/apollo-light.svg"
        alt="Apollo Light"
        width={size}
        height={size}
        className="al-logo-mark"
        onError={(e) => {
          // Fall back to the raster logo if the SVG fails to load for any reason.
          const img = e.currentTarget;
          if (img.src.endsWith('.svg')) img.src = '/import/apollo-light.png';
        }}
      />
      {showWordmark && (
        <span className="al-logo-word">
          Apollo <b>Light</b>
        </span>
      )}
    </div>
  );
}
