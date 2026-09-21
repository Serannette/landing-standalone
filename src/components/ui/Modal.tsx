import { createPortal } from 'react-dom';
import './Modal.css';
import { IconX } from './Icons';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
  // Popups that collect input (creating events, adding students, etc.)
  // should never disappear from an accidental outside click — default to
  // off. Simple confirmation dialogs can still opt back in if desired.
  closeOnOverlayClick?: boolean;
  // Every modal gets a top-right close (X) button unless explicitly hidden.
  showCloseButton?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  maxWidth = 420,
  closeOnOverlayClick = false,
  showCloseButton = true,
}: ModalProps) {
  if (!open) return null;

  // Rendered via portal straight onto <body>. Modals are sometimes opened
  // from inside elements that use `filter`/`backdrop-filter` (e.g. the
  // topbar) — either property creates a new containing block for
  // `position: fixed` descendants, which would otherwise trap this
  // overlay inside that ancestor's box instead of covering the viewport.
  return createPortal(
    <div
      className="ui-modal-overlay"
      onClick={closeOnOverlayClick ? onClose : undefined}
      aria-hidden="true"
    >
      <div
        className="ui-modal-window"
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {showCloseButton && (
          <button type="button" className="ui-modal-close" aria-label="Close" onClick={onClose}>
            <IconX size={16} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
