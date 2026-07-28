"use client";

import { useEffect, useState } from "react";

const REALITIES = [
  { id: "lab", label: "LAB REALITY" },
  { id: "cyber", label: "CYBER 2160" },
  { id: "blueprint", label: "BLUEPRINT" },
] as const;

type RealityId = (typeof REALITIES)[number]["id"];

export function ThemeSwitch() {
  const [reality, setReality] = useState<RealityId>("lab");

  useEffect(() => {
    const saved = localStorage.getItem("raeen-reality") as RealityId | null;
    if (saved && REALITIES.some((r) => r.id === saved)) setReality(saved);
  }, []);

  useEffect(() => {
    if (reality === "lab") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = reality;
    localStorage.setItem("raeen-reality", reality);
  }, [reality]);

  const cycle = () => {
    const i = REALITIES.findIndex((r) => r.id === reality);
    setReality(REALITIES[(i + 1) % REALITIES.length].id);
  };

  const current = REALITIES.find((r) => r.id === reality)!;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button onClick={cycle} className="pill" title="Cycle visual reality">
        <span className="node" style={{ width: 5, height: 5 }} />
        Change reality
      </button>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      <span className="tech-sm text-muted">{current.label}</span>
    </div>
  );
}
