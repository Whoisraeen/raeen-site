"use client";

import { useMemo, useState, type CSSProperties } from "react";
import titlesData from "@/data/titles.json";

type Status = "perfect" | "playable" | "ingame" | "menus" | "boots" | "nothing" | "untested";

interface Title {
  name: string;
  entries: { id: string; region: string }[];
  status: Status;
  notes?: string;
  tested?: string;
}

const titles = titlesData as Title[];

const STATUS: Record<Status, { label: string; desc: string }> = {
  perfect: { label: "Perfect", desc: "Runs flawlessly start to finish" },
  playable: { label: "Playable", desc: "Completable with minor issues" },
  ingame: { label: "In-game", desc: "Renders gameplay, notable glitches" },
  menus: { label: "Menus", desc: "Reaches menus only" },
  boots: { label: "Boots", desc: "Boots, no meaningful progress" },
  nothing: { label: "Nothing", desc: "Fails to boot" },
  untested: { label: "Untested", desc: "No recorded report yet" },
};

const ORDER: Status[] = ["perfect", "playable", "ingame", "menus", "boots", "nothing", "untested"];

const REGIONS = ["Americas", "Europe", "Japan", "Asia", "Korea"];

// theme-adaptive status colors come from CSS vars set per reality
const stColor = (s: Status) => `var(--st-${s})`;
const chipStyle = (s: Status): CSSProperties => ({
  color: stColor(s),
  borderColor: stColor(s),
  background: `color-mix(in srgb, ${stColor(s)} 10%, transparent)`,
});

export function CompatBrowser() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [region, setRegion] = useState<string>("all");

  const counts = useMemo(() => {
    const c = Object.fromEntries(ORDER.map((s) => [s, 0])) as Record<Status, number>;
    for (const t of titles) c[t.status]++;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return titles.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (region !== "all" && !t.entries.some((e) => e.region === region)) return false;
      if (
        q &&
        !t.name.toLowerCase().includes(q) &&
        !t.entries.some((e) => e.id.toLowerCase().includes(q))
      )
        return false;
      return true;
    });
  }, [query, status, region]);

  const total = titles.length;

  return (
    <div>
      {/* Distribution panel */}
      <div className="panel ticks">
        <div className="panel-title">
          <span>Status distribution — {total} titles</span>
          <span>DB·PPSA</span>
        </div>
        <div className="p-5">
          <div className="flex h-3 border border-line-strong">
            {ORDER.map((s) =>
              counts[s] > 0 ? (
                <div
                  key={s}
                  style={{ width: `${(counts[s] / total) * 100}%`, background: stColor(s) }}
                  title={`${STATUS[s].label}: ${counts[s]}`}
                />
              ) : null,
            )}
          </div>
          <div className="tech-sm mt-4 flex flex-wrap gap-x-5 gap-y-2 text-muted">
            {ORDER.map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2" style={{ background: stColor(s) }} />
                {STATUS[s].label} <span className="opacity-60">{counts[s]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH TITLE OR PPSA ID…"
          className="flex-1 border border-line-strong bg-transparent px-4 py-2.5 text-xs tracking-widest outline-none placeholder:text-muted focus:border-accent"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-line-strong bg-transparent px-3.5 py-2.5 text-xs tracking-widest uppercase outline-none focus:border-accent [&>option]:bg-background [&>option]:text-foreground"
        >
          <option value="all">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Status chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setStatus("all")}
          className={`tech-sm border px-3 py-1.5 transition-colors ${
            status === "all"
              ? "border-line-strong bg-foreground text-background"
              : "border-line text-muted hover:border-line-strong hover:text-foreground"
          }`}
        >
          All
        </button>
        {ORDER.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(status === s ? "all" : s)}
            title={STATUS[s].desc}
            className="tech-sm border px-3 py-1.5 transition-colors"
            style={
              status === s
                ? chipStyle(s)
                : { borderColor: "var(--line)", color: "var(--muted)" }
            }
          >
            {STATUS[s].label}
          </button>
        ))}
      </div>

      <p className="tech-sm mt-5 text-muted">
        {filtered.length.toLocaleString()} / {total.toLocaleString()} TITLES
      </p>

      {/* Rows */}
      <div className="mt-3 border-t border-line-strong">
        {filtered.map((t) => (
          <div key={t.name} className="border-b border-line py-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium">{t.name}</span>
              <span className="tech-sm border px-2 py-0.5" style={chipStyle(t.status)}>
                {STATUS[t.status].label}
              </span>
              {t.tested && <span className="tech-sm text-muted">TESTED {t.tested}</span>}
              <span className="ml-auto flex flex-wrap gap-1.5">
                {t.entries.map((e) => (
                  <span
                    key={e.id}
                    className="tech-sm border border-line px-1.5 py-0.5 text-muted"
                    title={e.region}
                  >
                    {e.id}
                  </span>
                ))}
              </span>
            </div>
            {t.notes && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{t.notes}</p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="tech py-12 text-center text-muted">
            NO TITLES MATCH — CLEAR THE FILTERS
          </div>
        )}
      </div>
    </div>
  );
}
