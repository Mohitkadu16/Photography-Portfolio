"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

const floatingCards = [
  { src: "/images/timeline/sobo-nobo ep1/sobo-nobo 1.jpg",  top: "6%",  left: "37%", rotate: -12, depth: 0.022, z: 3 },
  { src: "/images/timeline/sobo-nobo ep1/sobo-nobo 4.jpg",  top: "30%", left: "55%", rotate: 8,   depth: 0.038, z: 5 },
  { src: "/images/timeline/sobo-nobo ep1/sobo-nobo 7.jpg",  top: "3%",  left: "68%", rotate: -5,  depth: 0.028, z: 2 },
  { src: "/images/timeline/sobo-nobo ep2/sobo-nobo ep2 1.webp", top: "50%", left: "40%", rotate: 13,  depth: 0.048, z: 4 },
  { src: "/images/timeline/sobo-nobo ep2/sobo-nobo ep2 4.webp", top: "52%", left: "63%", rotate: -9,  depth: 0.032, z: 6 },
  { src: "/images/timeline/sobo-nobo ep2/sobo-nobo ep2 7.webp", top: "16%", left: "81%", rotate: 6,   depth: 0.018, z: 1 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* BG hero image — subtle on mobile, more visible on desktop */}
      <div className="absolute inset-0 opacity-20 md:opacity-65">
        <Image
          src="/images/hero.png"
          alt="Photography hero"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/70 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
      </div>

      {/* ── DESKTOP/TABLET ONLY: Floating parallax cards ── */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className="absolute hidden overflow-hidden rounded-lg shadow-2xl shadow-black/60 md:block"
          style={{ top: card.top, left: card.left, zIndex: card.z, width: "150px", height: "200px" }}
          initial={{ opacity: 0, scale: 0.85, rotate: card.rotate }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: card.rotate,
            x: mouse.x * card.depth,
            y: mouse.y * card.depth,
          }}
          transition={
            i === 0
              ? { duration: 0.8, delay: i * 0.12 }
              : {
                  opacity: { duration: 0.8, delay: i * 0.12 },
                  scale:   { duration: 0.8, delay: i * 0.12 },
                  x: { type: "spring", stiffness: 80, damping: 25 },
                  y: { type: "spring", stiffness: 80, damping: 25 },
                  rotate: { duration: 0 },
                }
          }
          whileHover={{ scale: 1.06, zIndex: 20 }}
        >
          <Image src={card.src} alt={`SoBo to NoBo ${i + 1}`} fill className="object-cover" sizes="150px" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="font-mono text-[8px] tracking-widest text-white/50 uppercase">SoBo · NoBo</p>
          </div>
        </motion.div>
      ))}

      {/* ── Hero content ── */}
      {/*
        Mobile  → centered, full width, padding 6 (24px)
        Desktop → left-aligned, max-w-xl, padding 16 (64px)
      */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center md:items-start md:justify-center md:px-16 md:text-left md:max-w-xl">

        {/* Metadata line */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-neutral-500 uppercase"
        >
          <span className="hidden h-px w-5 bg-amber-400 md:inline-block" />
          MUMBAI · STREET · EST. 2024
        </motion.p>

        {/* Giant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-bebas leading-none text-white text-[clamp(3.5rem,12vw,8rem)]"
        >
          loyalmanuka
        </motion.h1>

        {/* Amber italic subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-bebas italic text-amber-400 leading-none text-[clamp(1.6rem,5vw,3.8rem)]"
        >
          Through My Lens.
        </motion.p>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 h-6 font-mono text-xs text-amber-400/75 md:text-sm"
        >
          <TypeAnimation
            sequence={[
              "Cinematic Street Photographer", 2200,
              "Visual Storyteller",            2200,
              "Urban Lifestyle Photographer",  2200,
              "Mumbai Through My Lens",        2200,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
        >
          <a
            href="#work"
            className="flex items-center gap-2 bg-amber-400 px-6 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-amber-300 uppercase"
          >
            <span>▶</span> VIEW WORK
          </a>
          <a
            href="#about"
            className="border border-white/40 px-6 py-3 font-mono text-xs tracking-widest text-white transition-all hover:border-white hover:bg-white/5 uppercase"
          >
            ABOUT ME
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-600 uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-neutral-600 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

