"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Resume() {
  return (
    <section id="resume" className="bg-neutral-950 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section number + heading */}
          <p className="mb-2 font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            004 —
          </p>
          <h2 className="font-bebas text-6xl text-white md:text-7xl">
            Resume
          </h2>
          <div className="mx-auto mt-4 mb-12 h-px w-12 bg-amber-400/50" />

          <div className="mx-auto max-w-2xl border border-white/8 bg-neutral-900/40 p-10">
            <h3 className="mb-2 font-mono text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
              Awards & Achievements
            </h3>

            <div className="mb-10 flex flex-col items-center justify-center gap-3">
              <a
                href="/images/Wallmag Mobile Photography Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full max-w-md items-center gap-4 border border-amber-400/30 bg-amber-400/5 p-4 transition-all hover:bg-amber-400/10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-amber-400/20 text-2xl">
                  🏆
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bebas text-2xl text-amber-400 tracking-wide">Wallmag Mobile Photography</span>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Competition Winner • View Certificate</span>
                </div>
              </a>
            </div>

            <h3 className="mb-2 mt-8 font-mono text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
              Photography Skills
            </h3>

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 uppercase tracking-wider hover:border-amber-400/40 hover:text-amber-400 transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <a
              href="/images/@loyalmanuka.pdf"
              download
              className="inline-flex items-center gap-3 bg-amber-400 px-8 py-4 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-amber-300 uppercase"
            >
              <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

