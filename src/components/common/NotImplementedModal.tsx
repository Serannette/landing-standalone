import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { IconWrench } from '../ui/Icons';
import { subscribeNotImplemented } from './notImplemented';
import './NotImplementedModal.css';

export default function NotImplementedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeNotImplemented((featureName?: string) => {
      setFeature(featureName ?? null);
      setIsOpen(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="nim-overlay"
      onClick={() => setIsOpen(false)}
      aria-hidden="true"
    >
      <div
        className="nim-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nim-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="nim-icon-badge">
          <IconWrench size={20} />
        </div>

        <p className="nim-eyebrow">Coming Soon</p>

        <h2 id="nim-title">Feature Not Implemented</h2>

        <p className="nim-message">
          {feature ? (
            <>
              <strong>{feature}</strong> is not available yet.
            </>
          ) : (
            <>This feature is not available yet.</>
          )}{' '}
          It will be added in a future update.
        </p>

        <Button
          variant="primary"
          fullWidth
          onClick={() => setIsOpen(false)}
        >
          Okay
        </Button>
      </div>
    </div>
  );
}