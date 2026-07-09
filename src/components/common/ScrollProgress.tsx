"use client";

import { useRef, useEffect } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / winHeight;
      el.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        ref={ref}
        className="h-full bg-navy-600 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
