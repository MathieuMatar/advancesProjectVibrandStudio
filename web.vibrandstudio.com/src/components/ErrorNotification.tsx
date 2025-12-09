import { useEffect, useState } from 'react';
import './errorNotification.css';

interface ErrorNotificationProps {
  error: string | null;
  onClose: () => void;
  autoCloseDuration?: number; // in milliseconds, 0 means no auto-close
}

/**
 * ErrorNotification
 *
 * A fixed position error notification component that displays at the top-right of the page.
 *
 * Props:
 * - error: string | null — the error message to display (null to hide)
 * - onClose: () => void — callback when the close button is clicked
 * - autoCloseDuration?: number — auto-close after N milliseconds (default: 5000ms, 0 = disabled)
 *
 * Example:
 * const { error, setError } = useHook()
 * return <ErrorNotification error={error} onClose={() => setError(null)} />
 */
export function ErrorNotification({ error, onClose, autoCloseDuration = 5000 }: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      if (autoCloseDuration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, autoCloseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoCloseDuration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!error || !isVisible) return null;

  return (
    <div className="error-notification">
      <div className="error-content">
        <span className="error-message">{error}</span>
        <button className="error-close-btn" onClick={handleClose} aria-label="Close error">
          ✕
        </button>
      </div>
    </div>
  );
}

export default ErrorNotification;
