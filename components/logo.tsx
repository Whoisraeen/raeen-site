export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="raeen-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" />
          <stop offset="0.6" stopColor="#9f6bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#raeen-g)" opacity="0.16" />
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="8"
        fill="none"
        stroke="url(#raeen-g)"
        strokeWidth="1.6"
      />
      <path
        d="M11 23V9h6.2c2.9 0 4.8 1.7 4.8 4.3 0 2-1.1 3.4-2.9 4l3.1 5.7h-3.2l-2.7-5.2H13.8V23H11Zm2.8-7.6h3.1c1.5 0 2.3-.8 2.3-2.1s-.8-2-2.3-2h-3.1v4.1Z"
        fill="url(#raeen-g)"
      />
    </svg>
  );
}
