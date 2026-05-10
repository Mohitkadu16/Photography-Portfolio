"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const totalDuration = 1800;
    const steps = 100;
    const interval = totalDuration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none"
        >
          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-bebas text-[clamp(6rem,18vw,14rem)] leading-none text-white tabular-nums"
          >
            {String(count).padStart(2, "0")}
          </motion.div>

          {/* Brand name */}
          <motion.p
            animate={{
              opacity: count > 40 ? 1 : 0,
              y: count > 40 ? 0 : 12,
            }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-mono text-xs tracking-[0.5em] text-neutral-500 uppercase"
          >
            loyalmanuka
          </motion.p>

          {/* Amber progress line at bottom */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-amber-400 transition-all"
            style={{ width: `${count}%`, transitionDuration: "60ms" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
