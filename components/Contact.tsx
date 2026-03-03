"use client";

import { motion } from "framer-motion";
import { contactInfo } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="bg-neutral-900 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Get In Touch
          </h2>

          <p className="mb-12 text-xl text-neutral-300">
            Seeking clients and projects related to photography. Let's connect and create something amazing together!
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
                  className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
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
                  className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
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
                  className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
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
                <div className="flex justify-center gap-4">
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-all hover:bg-neutral-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 border-t border-neutral-800 pt-8 text-sm text-neutral-500">
            <p>© 2026 loyalmanuka. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
