import type { Metadata } from "next";
import { CompatBrowser } from "@/components/compat-browser";
import { REPO_URL } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Compatibility",
  description:
    "PS5 game compatibility with the Raeen emulator — searchable database of titles with honest, test-backed statuses.",
};

export default function CompatibilityPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-16">
      <h1 className="text-4xl font-bold tracking-tight">
        Game <span className="gradient-text">compatibility</span>
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Every status here is backed by a recorded run of the emulator — nothing is guessed.
        Raeen is early: most of the catalog is honestly marked untested. Ran a game yourself?{" "}
        <a
          className="text-accent hover:underline"
          href={`${REPO_URL}/issues`}
          target="_blank"
          rel="noreferrer"
        >
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
