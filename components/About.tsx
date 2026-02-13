"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { bioText, contactInfo } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-neutral-900 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-12 text-4xl font-bold text-white md:text-5xl">
            About
          </h2>

          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/images/profile.jpg"
                alt="loyalmanuka profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="mb-6 text-lg leading-relaxed text-neutral-300">
            {bioText}
          </p>

          <div className="flex items-center justify-center gap-2 text-neutral-400">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{contactInfo.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
