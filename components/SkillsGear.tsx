"use client";

import { motion } from "framer-motion";
import { skills, gear } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function SkillsGear() {
  return (
    <section id="skills" className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section number + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            001 —
          </p>
          <h2 className="font-bebas text-6xl text-white md:text-7xl">
            Skills &amp; Gear
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-amber-400/50" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Skills */}
          <motion.div
            variants={cardVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-none border border-white/8 bg-neutral-900/40 p-8"
          >
            <h3 className="mb-6 font-mono text-xs tracking-[0.3em] text-neutral-400 uppercase">
              Photography Skills
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-200 transition-all hover:border-amber-400/40 hover:text-amber-400 uppercase tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Gear */}
          <motion.div
            variants={cardVariants}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-none border border-white/8 bg-neutral-900/40 p-8"
          >
            <h3 className="mb-6 font-mono text-xs tracking-[0.3em] text-neutral-400 uppercase">
              Device / Gear
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {gear.map((item, index) => (
                <span
                  key={index}
                  className="border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-200 transition-all hover:border-amber-400/40 hover:text-amber-400 uppercase tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
