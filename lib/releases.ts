export const GITHUB_OWNER = "Whoisraeen";
export const GITHUB_REPO = "Raeen";
export const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
export const RELEASES_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=30`;

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

export interface Release {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

export type ReleasesState =
  | { kind: "loading" }
  | { kind: "ready"; releases: Release[] }
  | { kind: "empty" }
  | { kind: "error"; message: string };

export async function fetchReleases(): Promise<ReleasesState> {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (res.status === 404) return { kind: "empty" };
    if (res.status === 403 || res.status === 429)
      return { kind: "error", message: "GitHub API rate limit reached — try again in a minute, or grab builds directly from the releases page." };
    if (!res.ok) return { kind: "error", message: `GitHub API responded ${res.status}.` };
    const releases = (await res.json()) as Release[];
    return releases.length === 0 ? { kind: "empty" } : { kind: "ready", releases };
  } catch {
    return { kind: "error", message: "Couldn't reach the GitHub API. Check your connection." };
  }
}

// The main repo's Inno Setup script emits `Raeen-{version}-Setup.exe`
// (installer/raeen.iss, OutputBaseFilename). The installer is the only thing
// users need from the site — the built-in auto-updater takes over from there.
export function findInstaller(
  releases: Release[],
): { release: Release; asset: ReleaseAsset } | null {
  // Strict: only a real setup executable qualifies — a bare portable .exe must
  // not be presented as "the installer" (the auto-update promise would be wrong).
  const isInstaller = (n: string) => /setup[^/]*\.exe$|-setup\.exe$/i.test(n);
  for (const stableOnly of [true, false]) {
    for (const r of releases) {
      if (stableOnly && r.prerelease) continue;
      const asset = r.assets.find((a) => isInstaller(a.name));
      if (asset) return { release: r, asset };
    }
  }
  return null;
}

export type Platform = "windows" | "linux" | "macos" | "other";

export function assetPlatform(name: string): Platform {
  const n = name.toLowerCase();
  if (/(win|windows|\.exe$|\.msi$)/.test(n)) return "windows";
  if (/(linux|\.appimage$|\.deb$|\.rpm$|\.tar\.(gz|xz)$)/.test(n)) return "linux";
  if (/(mac|darwin|osx|\.dmg$)/.test(n)) return "macos";
  return "other";
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
