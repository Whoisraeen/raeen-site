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

const platformLabel: Record<Platform, string> = {
  windows: "WIN",
  linux: "LINUX",
  macos: "MACOS",
  other: "FILE",
};

function AssetRow({ asset }: { asset: Release["assets"][number] }) {
  const p = assetPlatform(asset.name);
  return (
    <a
      href={asset.browser_download_url}
      className="group flex items-center gap-4 border border-line-strong px-4 py-3 transition-colors hover:bg-foreground hover:text-background"
    >
      <span className="tech-sm w-12 shrink-0 border border-current px-1 py-0.5 text-center">
        {platformLabel[p]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-mono text-sm">{asset.name}</div>
        <div className="tech-sm mt-1 opacity-70">
          {formatBytes(asset.size)} · {asset.download_count.toLocaleString()} downloads
        </div>
      </div>
      <span className="tech shrink-0">↓ GET</span>
    </a>
  );
}

function ReleaseCard({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <div className="panel ticks">
      <div className="panel-title">
        <span>
          {latest ? "LATEST // " : ""}
          {release.name || release.tag_name}
          {release.prerelease ? " // PRE-RELEASE" : ""}
        </span>
        <span>{formatDate(release.published_at)}</span>
      </div>
      <div className="p-5">
        {release.body && (
          <p className="mb-5 line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-muted">
            {release.body}
          </p>
        )}
        <div className="grid gap-2.5">
          {release.assets.length > 0 ? (
            release.assets.map((a) => <AssetRow key={a.name} asset={a} />)
          ) : (
            <p className="text-sm text-muted">
              No binary assets on this release —{" "}
              <a className="underline hover:text-accent" href={release.html_url} target="_blank" rel="noreferrer">
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
          className="tech-sm mt-4 inline-block text-muted transition-colors hover:text-accent"
        >
          → Full release notes on GitHub
        </a>
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="panel ticks">
      <div className="panel-title">
        <span>STATUS — AWAITING FIRST PUBLIC BUILD</span>
        <span className="animate-pulse">●</span>
      </div>
      <div className="p-8 sm:p-12">
        <h2 className="display text-3xl">FIRST PUBLIC BUILD IS ON THE WAY</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Raeen&rsquo;s milestone gates are closed and the first public release is being prepared.
          The moment it lands on GitHub Releases, the downloads appear here automatically — no
          site update needed.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-solid">
            Watch the repo
          </a>
          <a href={`${REPO_URL}#readme`} target="_blank" rel="noreferrer" className="btn-outline">
            Build from source
          </a>
        </div>
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
      <div className="panel">
        <div className="panel-title">
          <span>QUERYING GITHUB RELEASES…</span>
          <span className="animate-pulse">▮▯▯</span>
        </div>
        <div className="animate-pulse space-y-3 p-6">
          <div className="h-4 w-2/3 bg-line" />
          <div className="h-4 w-1/2 bg-line" />
          <div className="h-12 border border-line" />
        </div>
      </div>
    );
  }

  if (state.kind === "empty") return <ComingSoon />;

  if (state.kind === "error") {
    return (
      <div className="panel ticks">
        <div className="panel-title">
          <span>ERROR — RELEASES UNAVAILABLE</span>
          <span>⚠</span>
        </div>
        <div className="p-8">
          <p className="max-w-lg text-sm leading-relaxed text-muted">{state.message}</p>
          <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer" className="btn-outline mt-6">
            Open releases on GitHub
          </a>
        </div>
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
