"use client";

import { motion } from "framer-motion";
import { skills, gear } from "@/lib/data";

export default function SkillsGear() {
  return (
    <section id="skills" className="bg-neutral-900 py-12">
      <h2 className="mb-8 text-center text-4xl font-bold text-white md:text-5xl">
        Skills & Gear
      </h2>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-lg bg-neutral-800 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white text-center">Skills</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-700 px-3 py-1 text-sm text-neutral-200 items-center justify-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Gear */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg bg-neutral-800 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white text-center">Device/Gear</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {gear.map((item, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-700 px-3 py-1 text-sm text-neutral-200 items-center justify-center"
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
