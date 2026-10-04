"use client";

import { motion } from "framer-motion";
import { contactInfo } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-2 font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            005 —
          </p>
          <h2 className="font-bebas text-6xl text-white md:text-7xl">
            Get In Touch
          </h2>
          <div className="mx-auto mt-4 mb-6 h-px w-12 bg-amber-400/50" />

          <p className="mb-12 text-base text-neutral-500">
            Seeking clients and projects related to photography. Let&apos;s connect and create something amazing together!
          </p>

          {/* Two Column Layout: Form Left, Contact Options Right */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form - Left */}
            <form
              action="https://formspree.io/f/mqedqkwj"
              method="POST"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-left text-sm font-medium text-neutral-400">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-left text-sm font-medium text-neutral-400">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-left text-sm font-medium text-neutral-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder-neutral-600 transition-colors focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 px-6 py-4 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-amber-300 uppercase"
              >
                Send Message
              </button>
            </form>

            {/* Contact Information - Right */}
            <div className="flex flex-col justify-center space-y-8 text-center">
              {/* Contact Information Section */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Contact Information
                </h3>
                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex flex-col items-center gap-2 text-neutral-300 transition-colors hover:text-white"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Email</p>
                      <p className="text-sm">{contactInfo.email}</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-neutral-300 transition-colors hover:text-white"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Instagram</p>
                      <p className="text-sm">@loyalmanuka</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Follow Me Section */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Follow Me
                </h3>
                <div className="flex flex-wrap justify-center gap-3">

                  {/* Instagram */}
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-800/60 px-4 py-2.5 text-white transition-all hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="font-mono text-xs tracking-widest uppercase">Instagram</span>
                  </a>

                  {/* Threads */}
                  <a
                    href={contactInfo.threads}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads"
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-800/60 px-4 py-2.5 text-white transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 192 192">
                      <path d="M141.537 88.988a66 66 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.232c8.25.053 14.476 2.452 18.502 7.129 2.932 3.405 4.894 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.42 12.458-.675 22.231-5.436 29.049-14.15 5.178-6.605 8.453-15.16 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.805 96.957 192h.113c24.96-.171 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553zm-41.357 36.081c-10.443.568-21.287-4.1-21.82-14.18-.398-7.48 5.322-15.827 22.564-16.823 1.972-.113 3.905-.168 5.805-.168 6.27 0 12.137.606 17.482 1.776-1.99 24.823-13.58 28.79-24.031 29.395z"/>
                    </svg>
                    <span className="font-mono text-xs tracking-widest uppercase">Threads</span>
                  </a>

                  {/* Reddit */}
                  <a
                    href={contactInfo.reddit}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Reddit"
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-800/60 px-4 py-2.5 text-white transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    <span className="font-mono text-xs tracking-widest uppercase">Reddit</span>
                  </a>

                  {/* Wallmag */}
                  <a
                    href={contactInfo.wallmag}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Wallmag"
                    className="flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-2.5 text-amber-400 transition-all hover:border-amber-400/60 hover:bg-amber-400/15"
                  >
                    <span className="text-sm leading-none">🏆</span>
                    <span className="font-mono text-xs tracking-widest uppercase">Wallmag</span>
                  </a>

                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 border-t border-white/8 pt-8">
            <p className="font-mono text-[11px] tracking-widest text-neutral-600 uppercase">© 2026 loyalmanuka. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
