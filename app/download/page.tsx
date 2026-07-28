import type { Metadata } from "next";
import { ReleaseList } from "@/components/release-list";
import { Barcode } from "@/components/barcode";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Raeen, the open-source PS5 emulator. Builds are fetched live from GitHub Releases.",
};

const requirements = [
  { k: "OS", v: "Windows 10/11 x64 (Linux support planned)" },
  { k: "CPU", v: "Modern x86-64 with FSGSBASE — Intel 8th gen / AMD Zen 2 or newer recommended" },
  { k: "GPU", v: "Vulkan 1.3 capable GPU with up-to-date drivers" },
  { k: "CONTENT", v: "Your own legally dumped games and firmware — Raeen ships none" },
];

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-14">
      <div className="flex items-end justify-between gap-6">
        <h1 className="display text-5xl sm:text-6xl">
          DOWNLOAD<span className="text-accent">.</span>
        </h1>
        <Barcode className="mb-2 hidden opacity-70 sm:block" />
      </div>
      <div className="tech mt-4 max-w-2xl leading-relaxed text-muted">
        <span className="bracket">
          Fetched live from GitHub Releases — real builds, real sizes, real download counts
        </span>
      </div>

      <div className="mt-10">
        <ReleaseList />
      </div>

      <section className="mt-14">
        <div className="panel ticks">
          <div className="panel-title">
            <span>System requirements</span>
            <span>MIN·SPEC</span>
          </div>
          <div>
            {requirements.map((r, i) => (
              <div key={r.k} className={`flex gap-6 px-5 py-3.5 text-sm ${i > 0 ? "border-t border-line" : ""}`}>
                <span className="tech w-24 shrink-0 pt-0.5">{r.k}</span>
                <span className="text-muted">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="tech-sm mt-5 leading-relaxed text-muted">
          RAEEN EXECUTES PS5 CODE NATIVELY ON YOUR CPU — NO INTERPRETER — SO A RECENT PROCESSOR
          MATTERS MORE THAN CORE COUNT. EARLY SOFTWARE: EXPECT GLITCHES.
        </p>
      </section>
    </div>
  );
}
