"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fetchReleases,
  findInstaller,
  formatBytes,
  type Release,
  type ReleaseAsset,
} from "@/lib/releases";

// Hero CTA. Once the GitHub Releases API responds, the primary button becomes
// a DIRECT download of the Inno Setup installer — the auto-updater handles
// everything after that, so the installer is all the site needs to hand out.
export function DownloadCta() {
  const [installer, setInstaller] = useState<{
    release: Release;
    asset: ReleaseAsset;
  } | null>(null);

  useEffect(() => {
    fetchReleases().then((s) => {
      if (s.kind === "ready") setInstaller(findInstaller(s.releases));
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        {installer ? (
          <a href={installer.asset.browser_download_url} className="btn-solid">
            ↓ Download {installer.release.tag_name} · Windows
          </a>
        ) : (
          <Link href="/download/" className="btn-solid">
            ↓ Download · Windows
          </Link>
        )}
        <Link href="/compatibility/" className="btn-outline">
          Compatibility list
        </Link>
      </div>
      {installer && (
        <p className="tech-sm mt-3 text-muted">
          {installer.asset.name} · {formatBytes(installer.asset.size)} · installs once,
          auto-updates itself
        </p>
      )}
    </div>
  );
}
