import Link from "next/link";
import { DownloadCta } from "@/components/download-cta";
import { HeroSchematic } from "@/components/hero-schematic";
import { Barcode } from "@/components/barcode";
import { REPO_URL } from "@/lib/releases";

const threads = [
  { n: "01", tag: "(CPU/X86/ZEN2)", label: "Native execution" },
  { n: "02", tag: "(OS/ORBIS/HLE)", label: "System reimplementation" },
  { n: "03", tag: "(GPU/AGC/VK13)", label: "AGC → Vulkan" },
  { n: "04", tag: "(RS/GPL2/TDD)", label: "Rust & tests" },
];

const stats = [
  { value: "56 FPS", label: "in-world 3D · Minecraft (PS5)" },
  { value: "2,257", label: "automated tests, all green" },
  { value: "629", label: "PS5 title IDs tracked" },
  { value: "M0–M5", label: "milestone gates closed" },
];

const facts = [
  {
    n: "01",
    title: "Native execution, no interpreter",
    body: "The PS5's CPU is an x86-64 Zen 2 — the same architecture as your PC. Raeen runs guest code directly on your processor instead of interpreting or recompiling it, which is why there is no CPU emulation tax.",
  },
  {
    n: "02",
    title: "Clean-room by design",
    body: "Zero Sony code, SDKs, keys, or firmware ship in the tree — ever. Raeen reimplements the Orbis OS surface from scratch in Rust under GPL-2.0-only. You supply your own legally obtained content.",
  },
  {
    n: "03",
    title: "AGC → Vulkan, not GNM",
    body: "PS5 games talk to the GPU through AGC (not the PS4's GNM). Raeen decodes AGC/PM4 command streams and translates them to Vulkan 1.3, with guest shaders analyzed and recompiled to SPIR-V.",
  },
  {
    n: "04",
    title: "High-level OS emulation",
    body: "System library calls are trapped with vectored exception handling and answered by high-level reimplementations — libc, libkernel, pads, video out, save data — so games never need Sony's system software.",
  },
  {
    n: "05",
    title: "Written in Rust",
    body: "The host is memory-safe Rust; unsafe code is confined to the runtime and FFI boundaries and audited with safety notes. The workspace holds its 2,257 tests green before any milestone is claimed.",
  },
  {
    n: "06",
    title: "Honest milestones",
    body: "Every claim is gated by a recorded acceptance test: real homebrew with TLS and crt0, an AGC-drawn triangle, interactive 2D with DualSense input, and a retail title reaching its menu and rendering 3D terrain.",
  },
];

const milestones = [
  { tag: "M0", title: "Formats", body: "ELF, SELF, PKG and .sprx parsing; unknown SCE segments logged." },
  { tag: "M1", title: "Real homebrew", body: "Compiler-produced homebrew: crt0 stack, TLS relocations, observable printf/write." },
  { tag: "M2", title: "First triangle", body: "Real Vulkan draw driven by AGC/PM4 with the SPIR-V shader path." },
  { tag: "M3", title: "Interactive 2D", body: "Pad input through libScePad, VideoOut flip, guest-drawn framebuffer on screen." },
  { tag: "M4", title: "Commercial title to menu", body: "A user-owned retail 2D title reaches its interactive menu with working save data." },
  { tag: "M5", title: "Recognizable 3D", body: "In-world textured 3D terrain and HUD at ~56 FPS — glitches allowed, honesty required." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      {/* ── Hero ── */}
      <section className="relative grid gap-10 pb-10 pt-12 lg:grid-cols-[1fr_auto] lg:gap-4">
        <div className="relative z-10">
          <h1 className="display text-[13vw] leading-[0.98] sm:text-7xl lg:text-[5.2rem]">
            PLAY PS5,
            <br />
            NATIVELY<span className="text-accent">.</span>
          </h1>
          <div className="tech mt-6 flex items-center gap-3 text-muted">
            <span className="node" />
            <span>Clean-room emulator — Rust / Vulkan / zero Sony code</span>
          </div>
          <div className="mt-10">
            <DownloadCta />
          </div>

          {/* Core threads (bottom-left of hero, like the reference) */}
          <div className="mt-14 max-w-sm">
            <div className="tech bracket text-muted">Core threads of the stack</div>
            <div className="mt-4 border-t border-line-strong">
              {threads.map((t) => (
                <div key={t.n} className="flex items-baseline gap-3 border-b border-line py-2.5">
                  <span className="tech-sm text-muted">{t.n}.</span>
                  <span className="tech-sm hatch flex-1 self-center" style={{ height: 8 }} />
                  <span className="tech-sm text-muted">{t.tag}</span>
                  <span className="tech">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative lg:w-[560px] xl:w-[640px]">
          <HeroSchematic />

          {/* Identity panel, reference-style */}
          <div className="panel ticks mt-8 lg:absolute lg:-right-1 lg:top-0 lg:mt-0 lg:w-64">
            <div className="panel-title">
              <span>RAEEN</span>
              <span>/PS5</span>
            </div>
            <div className="tech-sm space-y-1.5 p-3 leading-relaxed">
              <div>RAE (LIGHT · GRACE)</div>
              <div>+ EN (ENGINE)</div>
              <div className="text-muted">→ A MACHINE FOR PLAY</div>
              <div className="hairline my-2 opacity-40" />
              <div className="flex justify-between text-muted">
                <span>GPL-2.0</span>
                <span>RUST</span>
                <span>VK 1.3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="panel ticks">
        <div className="panel-title">
          <span>Telemetry — measured, not promised</span>
          <span>REV·2026-07</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-5 py-5 ${i > 0 ? "border-l border-line" : ""}`}>
              <div className="display text-3xl">{s.value}</div>
              <div className="tech-sm mt-2 text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Facts ── */}
      <section className="pt-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-4xl sm:text-5xl">HOW IT WORKS</h2>
          <Barcode className="mb-1 hidden opacity-70 sm:block" />
        </div>
        <div className="tech mt-3 text-muted">
          <span className="bracket">The facts — no marketing, straight from the architecture</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.n} className="panel">
              <div className="panel-title">
                <span>{f.n} /{"/".repeat(2)} FACT</span>
                <span className="node" style={{ background: "var(--panel-title-fg)", width: 5, height: 5 }} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="pt-24">
        <h2 className="display text-4xl sm:text-5xl">MILESTONES</h2>
        <div className="tech mt-3 max-w-2xl leading-relaxed text-muted">
          <span className="bracket">
            A gate only counts when its recorded acceptance test passes — all six are closed
          </span>
        </div>
        <div className="mt-8 border-t border-line-strong">
          {milestones.map((m) => (
            <div
              key={m.tag}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line py-4 sm:grid-cols-[3rem_14rem_1fr_auto]"
            >
              <span className="display text-lg text-accent">{m.tag}</span>
              <span className="font-semibold">{m.title}</span>
              <span className="col-span-2 text-sm leading-relaxed text-muted sm:col-span-1">
                {m.body}
              </span>
              <span className="tech-sm hidden border border-line-strong px-2 py-1 sm:inline">
                CLOSED
              </span>
            </div>
          ))}
        </div>
        <p className="tech-sm mt-4 text-muted">
          NOTE — RAEEN IS EARLY SOFTWARE: ONE RETAIL TITLE RENDERS RECOGNIZABLE 3D, NOT HUNDREDS.
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="pt-24">
        <div className="panel ticks">
          <div className="panel-title">
            <span>Acquire — builds publish straight to GitHub Releases</span>
            <span>∞</span>
          </div>
          <div className="flex flex-col items-start gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="display text-4xl">GET RAEEN</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Bring your own legally dumped games and firmware — Raeen ships none. Emulation is
                early software: expect glitches, and check the compatibility list first.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/download/" className="btn-solid">
                ↓ Downloads
              </Link>
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-outline">
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
