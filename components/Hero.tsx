"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Photography hero"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Name/Handle */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
            loyalmanuka
          </h1>

          {/* Typing Effect for Job Titles */}
          <div className="mb-6 h-12 text-xl text-neutral-200 md:text-2xl">
            <TypeAnimation
              sequence={[
                "Cinematic Street Photographer",
                2000,
                "Visual Storyteller",
                2000,
                "Urban Lifestyle Photographer",
                2000,
                "Mumbai Through My Lens",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-300 md:text-base">
            <a href="#street" className="transition-colors hover:text-white">Street</a>
            <span>•</span>
            <a href="#timeline" className="transition-colors hover:text-white">Timeline</a>
            <span>•</span>
            <a href="#all" className="transition-colors hover:text-white">All Photos</a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#work" className="block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-12 w-8 rounded-full border-2 border-white/50"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mt-2 h-2 w-2 rounded-full bg-white/50"
              />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
