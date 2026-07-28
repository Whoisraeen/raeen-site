"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tech-sm text-right leading-relaxed">
      <div className="text-muted">Local time</div>
      {/* suppressHydrationWarning: value is client-clock-dependent by design */}
      <div suppressHydrationWarning>{time || "--:--"}</div>
    </div>
  );
}
