import { REPO_URL } from "@/lib/releases";
import { Barcode } from "@/components/barcode";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line-strong">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <div className="tech bracket text-muted">Not a console — just code</div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Raeen is an independent, clean-room, open-source PS5 compatibility layer written in
              Rust. Licensed GPL-2.0-only. Not affiliated with, endorsed by, or associated with
              Sony Interactive Entertainment. &ldquo;PS5&rdquo; and &ldquo;PlayStation&rdquo; are
              trademarks of Sony Interactive Entertainment Inc. Raeen does not include or
              distribute games, firmware, keys, or any copyrighted system software.
            </p>
          </div>
          <div className="tech flex flex-col gap-2.5">
            <a className="transition-colors hover:text-accent" href={REPO_URL} target="_blank" rel="noreferrer">
              → Source code
            </a>
            <a className="transition-colors hover:text-accent" href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
              → Releases
            </a>
            <a className="transition-colors hover:text-accent" href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
              → Report an issue
            </a>
          </div>
        </div>
        <div className="mt-8 flex items-end justify-between gap-6 border-t border-line pt-4">
          <span className="tech-sm text-muted">
            RAEEN // CLEAN-ROOM PS5 COMPATIBILITY LAYER // GPL-2.0-ONLY
          </span>
          <Barcode className="opacity-70" height={18} />
        </div>
      </div>
    </footer>
  );
}
