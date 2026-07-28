// Deterministic decorative barcode (no randomness — SSG-safe).
const PATTERN = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2];

export function Barcode({ className, height = 22 }: { className?: string; height?: number }) {
  let x = 0;
  const bars = PATTERN.map((w, i) => {
    const bar = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={height} /> : null;
    x += w + 1;
    return bar;
  });
  return (
    <svg
      viewBox={`0 0 ${x} ${height}`}
      className={className}
      style={{ height }}
      fill="var(--line-strong)"
      aria-hidden
    >
      {bars}
    </svg>
  );
}
