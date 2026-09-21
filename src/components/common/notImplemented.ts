type Listener = (feature?: string) => void;

const listeners = new Set<Listener>();

/**
 * Displays the "Not Implemented" modal.
 * Example:
 * notImplemented("Export Scan Log");
 */
export function notImplemented(feature?: string): void {
  listeners.forEach((listener) => {
    listener(feature);
  });
}

/**
 * Registers a listener for the Not Implemented modal.
 * Returns an unsubscribe function.
 */
export function subscribeNotImplemented(
  listener: Listener
): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}