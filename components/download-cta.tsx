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
      <Link href="/download/" className="btn-solid">
        ↓{" "}
        {latest
          ? `Download ${latest.tag_name}${hasWindowsBuild ? " · Windows" : ""}`
          : "Download · Windows"}
      </Link>
      <Link href="/compatibility/" className="btn-outline">
        Compatibility list
      </Link>
    </div>
  );
}
