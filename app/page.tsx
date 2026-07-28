import Link from "next/link";
import { DownloadCta } from "@/components/download-cta";
import { REPO_URL } from "@/lib/releases";

const stats = [
  { value: "56 FPS", label: "in-world 3D in Minecraft (PS5)" },
  { value: "2,257", label: "automated tests, all green" },
  { value: "629", label: "PS5 title IDs tracked" },
  { value: "M0–M5", label: "milestone gates closed" },
];

const facts = [
  {
    title: "Native execution, no interpreter",
    body: "The PS5's CPU is an x86-64 Zen 2 — the same architecture as your PC. Raeen runs guest code directly on your processor instead of interpreting or recompiling it, which is why there is no CPU emulation tax.",
  },
  {
    title: "Clean-room by design",
    body: "Zero Sony code, SDKs, keys, or firmware ship in the tree — ever. Raeen reimplements the Orbis OS surface from scratch in Rust under GPL-2.0-only. You supply your own legally obtained content.",
  },
  {
    title: "AGC → Vulkan, not GNM",
    body: "PS5 games talk to the GPU through AGC (not the PS4's GNM). Raeen decodes AGC/PM4 command streams and translates them to Vulkan 1.3, with guest shaders analyzed and recompiled to SPIR-V.",
  },
  {
    title: "High-level OS emulation",
    body: "System library calls are trapped with vectored exception handling and answered by high-level reimplementations — libc, libkernel, pads, video out, save data — so games never need Sony's system software.",
  },
  {
    title: "Written in Rust",
    body: "The host is memory-safe Rust; unsafe code is confined to the runtime and FFI boundaries and audited with safety notes. The workspace holds its 2,257 tests green before any milestone is claimed.",
  },
  {
    title: "Honest milestones",
    body: "Every claim is gated by a recorded acceptance test: real homebrew with TLS and crt0, an AGC-drawn triangle, interactive 2D with DualSense input, and a retail title reaching its menu and rendering 3D terrain.",
  },
];

const milestones = [
  {
    tag: "M0",
    title: "Formats",
    body: "ELF, SELF, PKG and .sprx parsing with unknown SCE segments logged.",
  },
  {
    tag: "M1",
    title: "Real homebrew",
    body: "Compiler-produced homebrew runs: crt0 stack, TLS relocations, observable printf/write.",
  },
  {
    tag: "M2",
    title: "First triangle",
    body: "Real Vulkan draw driven by AGC/PM4 with the SPIR-V shader path.",
  },
  {
    tag: "M3",
    title: "Interactive 2D",
    body: "Pad input through libScePad, VideoOut flip, guest-drawn framebuffer on screen.",
  },
  {
    tag: "M4",
    title: "Commercial title to menu",
    body: "A user-owned retail 2D title reaches its interactive menu with working save data.",
  },
  {
    tag: "M5",
    title: "Recognizable 3D",
    body: "In-world textured 3D terrain and HUD at ~56 FPS — glitches allowed, honesty required.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-3" />
          Open source · GPL-2.0 · Windows first, Linux next
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Play PS5, <span className="gradient-text">natively.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Raeen is a clean-room PS5 emulator and compatibility layer written in Rust. It runs
          guest code directly on your x86-64 CPU and translates the PS5&rsquo;s AGC graphics
          commands to Vulkan — no interpreter, no Sony code.
        </p>
        <div className="mt-9">
          <DownloadCta />
        </div>
      </section>

      {/* Stats */}
      <section className="card grid grid-cols-2 divide-white/8 lg:grid-cols-4 lg:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-6">
            <div className="gradient-text text-3xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Facts */}
      <section className="pt-24">
        <h2 className="text-3xl font-bold tracking-tight">How Raeen works</h2>
        <p className="mt-3 max-w-2xl text-muted">
          The facts — no marketing, straight from the architecture.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="pt-24">
        <h2 className="text-3xl font-bold tracking-tight">Milestones, all gated by tests</h2>
        <p className="mt-3 max-w-2xl text-muted">
          A milestone only counts when its recorded acceptance test passes. All six gates are
          closed — and Raeen is still early: one retail title renders recognizable 3D, not
          hundreds.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m) => (
            <div key={m.tag} className="card card-hover p-6">
              <div className="flex items-center gap-3">
                <span className="gradient-text font-mono text-sm font-bold">{m.tag}</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  Closed
                </span>
              </div>
              <h3 className="mt-3 font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-24">
        <div className="card relative overflow-hidden p-10 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40rem 18rem at 50% -30%, rgba(79,124,255,0.18), transparent 70%)",
            }}
            aria-hidden
          />
          <h2 className="text-3xl font-bold tracking-tight">Get Raeen</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Builds are published straight to GitHub Releases. Bring your own legally dumped
            games and firmware — Raeen ships none.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/download/" className="btn-primary rounded-xl px-6 py-3.5 font-semibold text-white">
              Go to downloads
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost rounded-xl px-6 py-3.5 font-medium"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
