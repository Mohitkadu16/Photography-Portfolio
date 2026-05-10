"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { bioText, contactInfo } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-black py-20">
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
            003 —
          </p>
          <h2 className="font-bebas text-6xl text-white md:text-7xl">
            About
          </h2>
          <div className="mx-auto mt-4 mb-12 h-px w-12 bg-amber-400/50" />

          {/* Profile image with amber ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-amber-400/30 ring-offset-4 ring-offset-black">
              <Image
                src="/images/profile.jpg"
                alt="loyalmanuka profile"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 text-lg leading-relaxed text-neutral-400"
          >
            {bioText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-neutral-500"
          >
            <svg className="h-4 w-4 text-amber-400/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-mono text-xs tracking-widest uppercase">{contactInfo.location}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

