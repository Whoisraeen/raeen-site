import Link from "next/link";
import { REPO_URL } from "@/lib/releases";
import { ThemeSwitch } from "@/components/theme-switch";
import { LocalTime } from "@/components/local-time";

const links = [
  { href: "/download/", label: "Download" },
  { href: "/compatibility/", label: "Compat" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-background/90 backdrop-blur-sm">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center px-5">
        <Link href="/" className="flex flex-col leading-none">
          <span className="display text-lg tracking-tight">RAEEN</span>
          <span className="tech-sm mt-1 hidden text-muted sm:block">
            PS5 compat layer
          </span>
        </Link>

        <div className="absolute left-1/2 top-2.5 hidden -translate-x-1/2 md:block">
          <ThemeSwitch />
        </div>

        <div className="ml-auto flex items-center gap-5">
          <div className="tech flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="bracket transition-colors hover:text-accent">
                {l.label}
              </Link>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="bracket transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
          <div className="hidden sm:block">
            <LocalTime />
          </div>
        </div>
      </nav>
      {/* mobile reality switch */}
      <div className="flex justify-center border-t border-line pb-2 pt-2 md:hidden">
        <ThemeSwitch />
      </div>
    </header>
  );
}
