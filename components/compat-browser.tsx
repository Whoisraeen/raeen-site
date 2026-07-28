"use client";

import { useMemo, useState } from "react";
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

const STATUS: Record<Status, { label: string; desc: string; chip: string; dot: string }> = {
  perfect: {
    label: "Perfect",
    desc: "Runs flawlessly start to finish",
    chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  playable: {
    label: "Playable",
    desc: "Completable with minor issues",
    chip: "border-green-400/40 bg-green-400/10 text-green-300",
    dot: "bg-green-400",
  },
  ingame: {
    label: "In-game",
    desc: "Renders gameplay, notable glitches",
    chip: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    dot: "bg-amber-400",
  },
  menus: {
    label: "Menus",
    desc: "Reaches menus only",
    chip: "border-orange-400/40 bg-orange-400/10 text-orange-300",
    dot: "bg-orange-400",
  },
  boots: {
    label: "Boots",
    desc: "Boots, no meaningful progress",
    chip: "border-red-400/40 bg-red-400/10 text-red-300",
    dot: "bg-red-400",
  },
  nothing: {
    label: "Nothing",
    desc: "Fails to boot",
    chip: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    dot: "bg-rose-500",
  },
  untested: {
    label: "Untested",
    desc: "No recorded report yet",
    chip: "border-white/15 bg-white/5 text-foreground/60",
    dot: "bg-white/30",
  },
};

const ORDER: Status[] = ["perfect", "playable", "ingame", "menus", "boots", "nothing", "untested"];

const REGIONS = ["Americas", "Europe", "Japan", "Asia", "Korea"];

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
      {/* Distribution bar */}
      <div className="card p-6">
        <div className="flex h-3 overflow-hidden rounded-full">
          {ORDER.map((s) =>
            counts[s] > 0 ? (
              <div
                key={s}
                className={STATUS[s].dot}
                style={{ width: `${(counts[s] / total) * 100}%` }}
                title={`${STATUS[s].label}: ${counts[s]}`}
              />
            ) : null,
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {ORDER.map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${STATUS[s].dot}`} />
              {STATUS[s].label}
              <span className="text-foreground/50">{counts[s]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-muted"
            aria-hidden
          >
            <path d="M10 2a8 8 0 1 0 4.9 14.3l5 5 1.4-1.4-5-5A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or PPSA title ID…"
            className="w-full rounded-xl border border-white/10 bg-white/4 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-accent/50 focus:bg-white/6"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 [&>option]:bg-[#0b0d16]"
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
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            status === "all"
              ? "border-accent/60 bg-accent/15 text-foreground"
              : "border-white/12 bg-white/4 text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {ORDER.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(status === s ? "all" : s)}
            title={STATUS[s].desc}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              status === s ? STATUS[s].chip : "border-white/12 bg-white/4 text-muted hover:text-foreground"
            }`}
          >
            {STATUS[s].label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        {filtered.length.toLocaleString()} of {total.toLocaleString()} titles
      </p>

      {/* Rows */}
      <div className="mt-3 grid gap-2.5">
        {filtered.map((t) => (
          <div key={t.name} className="card card-hover px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium">{t.name}</span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${STATUS[t.status].chip}`}
              >
                {STATUS[t.status].label}
              </span>
              {t.tested && <span className="text-xs text-muted">tested {t.tested}</span>}
              <span className="ml-auto flex flex-wrap gap-1.5">
                {t.entries.map((e) => (
                  <span
                    key={e.id}
                    className="rounded-md border border-white/10 bg-white/4 px-2 py-0.5 font-mono text-[11px] text-foreground/65"
                    title={e.region}
                  >
                    {e.id}
                  </span>
                ))}
              </span>
            </div>
            {t.notes && (
              <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted">{t.notes}</p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-muted">
            No titles match — try clearing the filters.
          </div>
        )}
      </div>
    </div>
  );
}
