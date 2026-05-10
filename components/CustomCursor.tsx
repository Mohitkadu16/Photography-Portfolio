"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onEnter = () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "rgba(245,158,11,0.8)";
      dot.style.background = "#ffffff";
    };
    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(245,158,11,0.5)";
      dot.style.background = "#F59E0B";
    };

    document.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[10px] w-[10px] rounded-full bg-amber-400 transition-colors duration-150"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-9 w-9 rounded-full border border-amber-400/50 transition-all duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
