"use client";

import { useEffect, useState } from "react";
import {
  fetchReleases,
  assetPlatform,
  formatBytes,
  formatDate,
  REPO_URL,
  type Platform,
  type Release,
  type ReleasesState,
} from "@/lib/releases";

const platformMeta: Record<Platform, { label: string; icon: string }> = {
  windows: { label: "Windows", icon: "M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9ZM11.5 4.2 21 3v8.5h-9.5V4.2Zm0 15.6L21 21v-8.5h-9.5v7.3Z" },
  linux: { label: "Linux", icon: "M12 2c-2.2 0-3.6 1.8-3.6 4 0 1.5.2 2.6-.6 4-1 1.6-2.6 3.4-2.6 5.6C5.2 18.9 7 22 12 22s6.8-3.1 6.8-6.4c0-2.2-1.6-4-2.6-5.6-.8-1.4-.6-2.5-.6-4 0-2.2-1.4-4-3.6-4Z" },
  macos: { label: "macOS", icon: "M17.5 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.7ZM14.9 5.3c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.9-1 3 1 .1 2.1-.6 2.8-1.5Z" },
  other: { label: "Other", icon: "M12 2 2 7v10l10 5 10-5V7L12 2Z" },
};

function AssetRow({ asset }: { asset: Release["assets"][number] }) {
  const p = platformMeta[assetPlatform(asset.name)];
  return (
    <a
      href={asset.browser_download_url}
      className="card-hover flex items-center gap-4 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-foreground/70" aria-hidden>
        <path d={p.icon} />
      </svg>
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-sm">{asset.name}</div>
        <div className="mt-0.5 text-xs text-muted">
          {p.label} · {formatBytes(asset.size)} · {asset.download_count.toLocaleString()}{" "}
          downloads
        </div>
      </div>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-accent" aria-hidden>
        <path d="M12 3v10.55l3.3-3.3 1.4 1.42L11 17.36l-5.7-5.7 1.4-1.4L10 13.54V3h2ZM5 19h14v2H5v-2Z" />
      </svg>
    </a>
  );
}

function ReleaseCard({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold tracking-tight">
          {release.name || release.tag_name}
        </h2>
        {latest && (
          <span className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#9ab4ff]">
            Latest
          </span>
        )}
        {release.prerelease && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
            Pre-release
          </span>
        )}
        <span className="ml-auto text-sm text-muted">{formatDate(release.published_at)}</span>
      </div>
      {release.body && (
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed whitespace-pre-line text-muted">
          {release.body}
        </p>
      )}
      <div className="mt-5 grid gap-3">
        {release.assets.length > 0 ? (
          release.assets.map((a) => <AssetRow key={a.name} asset={a} />)
        ) : (
          <p className="text-sm text-muted">
            No binary assets on this release —{" "}
            <a className="text-accent hover:underline" href={release.html_url} target="_blank" rel="noreferrer">
              view it on GitHub
            </a>
            .
          </p>
        )}
      </div>
      <a
        href={release.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm text-muted transition hover:text-foreground"
      >
        Full release notes on GitHub →
      </a>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="card p-10 text-center sm:p-14">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-accent" aria-hidden>
          <path d="M12 8v5l3.5 2 .8-1.4-2.8-1.6V8H12Zm0-6a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">First public build is on the way</h2>
      <p className="mx-auto mt-3 max-w-lg text-muted">
        Raeen&rsquo;s milestone gates are closed and the first public release is being prepared.
        The moment it lands on GitHub Releases, the downloads appear here automatically — no
        site update needed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-primary rounded-xl px-6 py-3 font-semibold text-white"
        >
          Watch the repo on GitHub
        </a>
        <a
          href={`${REPO_URL}#readme`}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost rounded-xl px-6 py-3 font-medium"
        >
          Build from source
        </a>
      </div>
    </div>
  );
}

export function ReleaseList() {
  const [state, setState] = useState<ReleasesState>({ kind: "loading" });

  useEffect(() => {
    fetchReleases().then(setState);
  }, []);

  if (state.kind === "loading") {
    return (
      <div className="grid gap-5">
        {[0, 1].map((i) => (
          <div key={i} className="card animate-pulse p-8">
            <div className="h-6 w-48 rounded bg-white/8" />
            <div className="mt-4 h-4 w-full rounded bg-white/5" />
            <div className="mt-2 h-4 w-2/3 rounded bg-white/5" />
            <div className="mt-6 h-14 rounded-xl bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  if (state.kind === "empty") return <ComingSoon />;

  if (state.kind === "error") {
    return (
      <div className="card p-10 text-center">
        <h2 className="text-xl font-bold">Couldn&rsquo;t load releases</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">{state.message}</p>
        <a
          href={`${REPO_URL}/releases`}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost mt-6 inline-block rounded-xl px-6 py-3 font-medium"
        >
          Open releases on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {state.releases.map((r, i) => (
        <ReleaseCard key={r.tag_name} release={r} latest={i === 0} />
      ))}
    </div>
  );
}
