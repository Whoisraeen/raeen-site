// Annotated technical centerpiece: a stylized APU die with callout lines.
// Pure SVG + CSS vars, so it re-inks itself in every reality.

const callouts = [
  {
    // top left → CPU block
    at: "left-0 top-[6%] text-left",
    lines: ["Where guest code runs", "unmodified — native x86-64,", "no interpreter, no JIT tax"],
  },
  {
    // right → arena
    at: "right-0 top-[30%] text-right",
    lines: ["Identity-mapped guest arena,", "syscalls trapped + answered", "by Rust HLE"],
  },
  {
    // bottom left → GPU block
    at: "left-[2%] bottom-[8%] text-left",
    lines: ["AGC / PM4 command streams", "decoded and translated", "to Vulkan 1.3 + SPIR-V"],
  },
  {
    // bottom right → tests
    at: "right-[4%] bottom-[2%] text-right",
    lines: ["Foundation held green by", "2,257 automated tests"],
  },
];

export function HeroSchematic() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <svg viewBox="0 0 640 520" className="w-full" aria-hidden>
        <g stroke="var(--line)" fill="none">
          <circle cx="320" cy="260" r="235" strokeDasharray="2 6" />
          <circle cx="320" cy="260" r="180" strokeDasharray="1 4" />
          <circle cx="320" cy="260" r="120" />
        </g>

        {/* crosshair */}
        <g stroke="var(--line)" strokeWidth="1">
          <path d="M320 8v40M320 472v40M68 260h40M532 260h40" />
        </g>

        {/* die */}
        <g>
          <rect x="220" y="160" width="200" height="200" fill="var(--bg-soft)" stroke="var(--line-strong)" strokeWidth="1.5" />
          {/* pins */}
          <g stroke="var(--line-strong)">
            {Array.from({ length: 9 }, (_, i) => 232 + i * 22).map((x) => (
              <path key={x} d={`M${x} 160v-10M${x} 360v10`} />
            ))}
            {Array.from({ length: 9 }, (_, i) => 172 + i * 22).map((y) => (
              <path key={y} d={`M220 ${y}h-10M420 ${y}h10`} />
            ))}
          </g>
          {/* blocks */}
          <rect x="232" y="172" width="108" height="82" fill="none" stroke="var(--line-strong)" />
          <rect x="348" y="172" width="60" height="82" fill="none" stroke="var(--line-strong)" strokeDasharray="3 3" />
          <rect x="232" y="262" width="176" height="52" fill="none" stroke="var(--line-strong)" />
          <rect x="232" y="322" width="176" height="26" fill="none" stroke="var(--line)" />
          {/* block grid texture */}
          <g stroke="var(--line)">
            {Array.from({ length: 5 }, (_, i) => 250 + i * 18).map((x) => (
              <path key={x} d={`M${x} 178v70`} />
            ))}
          </g>
          <g
            fill="var(--fg)"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="9"
            letterSpacing="1.5"
          >
            <text x="238" y="248">ZEN2 ×8</text>
            <text x="354" y="248">ARENA</text>
            <text x="238" y="292">RDNA — AGC/PM4</text>
            <text x="238" y="340" fill="var(--muted)">FSGSBASE·TLS·VEH</text>
          </g>
          {/* accent dot: the flower of the machine */}
          <circle cx="378" cy="188" r="5" fill="var(--accent)" />
        </g>

        {/* callout lines with square nodes */}
        <g stroke="var(--line-strong)" fill="var(--line-strong)">
          {/* top-left → CPU block */}
          <path d="M286 200 L216 132 L118 132" fill="none" />
          <rect x="282" y="196" width="7" height="7" />
          {/* right → arena */}
          <path d="M408 213 L484 213 L520 240" fill="none" />
          <rect x="404" y="209" width="7" height="7" />
          {/* bottom-left → GPU row */}
          <path d="M262 288 L170 388 L112 388" fill="none" />
          <rect x="258" y="284" width="7" height="7" />
          {/* bottom-right → substrate */}
          <path d="M392 335 L462 448 L528 448" fill="none" />
          <rect x="388" y="331" width="7" height="7" />
        </g>
      </svg>

      {/* annotation labels (overlaid on ≥sm, stacked below on mobile) */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {callouts.map((c) => (
          <div key={c.at} className={`tech-sm absolute max-w-[190px] leading-relaxed ${c.at}`}>
            {c.lines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:hidden">
        {callouts.map((c) => (
          <div key={c.at} className="tech-sm flex items-start gap-2 text-muted">
            <span className="node mt-0.5 shrink-0" />
            <span>{c.lines.join(" ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
