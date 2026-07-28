import type { Metadata } from "next";
import { CompatBrowser } from "@/components/compat-browser";
import { Barcode } from "@/components/barcode";
import { REPO_URL } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Compatibility",
  description:
    "PS5 game compatibility with the Raeen emulator — searchable database of titles with honest, test-backed statuses.",
};

export default function CompatibilityPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <div className="flex items-end justify-between gap-6">
        <h1 className="display text-5xl sm:text-6xl">
          COMPATIBILITY<span className="text-accent">.</span>
        </h1>
        <Barcode className="mb-2 hidden opacity-70 sm:block" />
      </div>
      <div className="tech mt-4 max-w-3xl leading-relaxed text-muted">
        <span className="bracket">
          Every status is backed by a recorded run — nothing is guessed
        </span>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Raeen is early: most of the catalog is honestly marked untested. Ran a game yourself?{" "}
        <a className="underline transition-colors hover:text-accent" href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
          Report your result on GitHub
        </a>{" "}
        and it lands in this list.
      </p>
      <div className="mt-10 pb-10">
        <CompatBrowser />
      </div>
    </div>
  );
}
