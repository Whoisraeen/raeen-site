import { REPO_URL } from "@/lib/releases";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="font-medium text-foreground/85">Raeen</p>
            <p>
              An independent, clean-room, open-source PS5 compatibility layer written in Rust.
              Licensed GPL-2.0-only.
            </p>
            <p>
              Not affiliated with, endorsed by, or associated with Sony Interactive Entertainment.
              &ldquo;PS5&rdquo; and &ldquo;PlayStation&rdquo; are trademarks of Sony Interactive
              Entertainment Inc. Raeen does not include or distribute games, firmware, keys, or any
              copyrighted system software — you must supply your own legally obtained content.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <a className="transition hover:text-foreground" href={REPO_URL} target="_blank" rel="noreferrer">
              Source code
            </a>
            <a className="transition hover:text-foreground" href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
              Releases
            </a>
            <a className="transition hover:text-foreground" href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
              Report an issue
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
