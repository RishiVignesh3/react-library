/** Short relative / absolute label for capture timestamps. */
export function formatCaptureTime(ms: number): string {
  const d = new Date(ms);
  const now = Date.now();
  const diffSec = Math.floor((now - ms) / 1000);
  if (diffSec < 60) {
    return 'just now';
  }
  if (diffSec < 3600) {
    return `${Math.floor(diffSec / 60)}m ago`;
  }
  if (diffSec < 86400) {
    return `${Math.floor(diffSec / 3600)}h ago`;
  }
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
