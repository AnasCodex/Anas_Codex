"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MotionDirector = dynamic(() => import("./motion-director"), { ssr: false });
export function ScrollMotion() {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setScrolling(true);
    window.addEventListener("scroll", start, { once: true, passive: true });
    if (scrollY > 0) start();
    return () => window.removeEventListener("scroll", start);
  }, []);
  return scrolling ? <MotionDirector /> : null;
}
