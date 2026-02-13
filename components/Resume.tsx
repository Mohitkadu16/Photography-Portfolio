"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Resume() {
  return (
    <section id="resume" className="bg-black py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-12 text-4xl font-bold text-white md:text-5xl">
            Resume
          </h2>

          <div className="mx-auto max-w-2xl rounded-lg bg-neutral-900 p-8">
            <h3 className="mb-6 text-2xl font-semibold text-white">
              Photography Skills
            </h3>

            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href="/mohit-kadu-resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-transform hover:scale-105"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
