import type { Metadata } from "next";
import { ReleaseList } from "@/components/release-list";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Raeen, the open-source PS5 emulator. Builds are fetched live from GitHub Releases.",
};

const requirements = [
  { k: "OS", v: "Windows 10/11 x64 (Linux support planned)" },
  { k: "CPU", v: "Modern x86-64 with FSGSBASE (Intel 8th gen / AMD Zen 2 or newer recommended)" },
  { k: "GPU", v: "Vulkan 1.3 capable GPU with up-to-date drivers" },
  { k: "Content", v: "Your own legally dumped games and firmware — Raeen ships none" },
];

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-16">
      <h1 className="text-4xl font-bold tracking-tight">
        Download <span className="gradient-text">Raeen</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every build below is fetched live from GitHub Releases — what you see is exactly what
        the project has published, with real sizes and download counts.
      </p>

      <div className="mt-10">
        <ReleaseList />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">System requirements</h2>
        <div className="card mt-5 divide-y divide-white/8">
          {requirements.map((r) => (
            <div key={r.k} className="flex gap-6 px-6 py-4 text-sm">
              <span className="w-20 shrink-0 font-semibold text-foreground/85">{r.k}</span>
              <span className="text-muted">{r.v}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          Raeen executes PS5 code natively on your CPU — there is no interpreter — so a recent
          processor matters more than raw core count. Emulation is early software: expect
          glitches, and check the compatibility list before expecting a specific game to run.
        </p>
      </section>
    </div>
  );
}
