"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchReleases, assetPlatform, type Release } from "@/lib/releases";

// Hero CTA: links to the download page, and once the GitHub Releases API
// responds, upgrades itself to show the latest version tag.
export function DownloadCta() {
  const [latest, setLatest] = useState<Release | null>(null);

  useEffect(() => {
    fetchReleases().then((s) => {
      if (s.kind === "ready") {
        setLatest(s.releases.find((r) => !r.prerelease) ?? s.releases[0]);
      }
    });
  }, []);

  const hasWindowsBuild =
    latest?.assets.some((a) => assetPlatform(a.name) === "windows") ?? false;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="/download/"
        className="btn-primary flex items-center gap-2.5 rounded-xl px-6 py-3.5 font-semibold text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
          <path d="M12 3v10.55l3.3-3.3 1.4 1.42L11 17.36l-5.7-5.7 1.4-1.4L10 13.54V3h2ZM5 19h14v2H5v-2Z" />
        </svg>
        {latest
          ? `Download ${latest.tag_name}${hasWindowsBuild ? " for Windows" : ""}`
          : "Download for Windows"}
      </Link>
      <Link href="/compatibility/" className="btn-ghost rounded-xl px-6 py-3.5 font-medium">
        Check game compatibility
      </Link>
    </div>
  );
}
