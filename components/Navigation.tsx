"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const [isAllPhotosDropdownOpen, setIsAllPhotosDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const workSubLinks = [
    { hash: "street", label: "Street Photography", icon: "🏙️" },
    { hash: "timeline", label: "Timeline", icon: "📅" },
    { hash: "sobonobo", label: "SoBo → NoBo Series", icon: "🗺️" },
    { hash: "digicam", label: "Digicam Vision", icon: "📸" },
    { hash: "all", label: "All Photos", icon: "🖼️" },
  ];

  const navLinks = [
    { href: "#skills", label: "Skills & Gear" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ];

  const allPhotosSubLinks = [
    { href: "#buildings", label: "Buildings / Structures" },
    { href: "#animals", label: "Animals / Birds / Insects" },
    { href: "#nature", label: "Nature / Scenery" },
    { href: "#cars", label: "Cars / Vehicles" },
    { href: "#culture", label: "Culture / Festivals" },
    { href: "#street-photos", label: "Street / Urban Life" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsWorkDropdownOpen(false);
    setIsAllPhotosDropdownOpen(false);
  };

  const handleGalleryNav = (hash: string) => {
    closeMobileMenu();
    // Set the hash so Work.tsx picks it up via hashchange
    window.location.hash = hash;
    // Scroll the work section into view
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const Chevron = ({ open }: { open: boolean }) => (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </motion.svg>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="font-bebas text-2xl text-white transition-opacity hover:opacity-70"
          >
            loyalmanuka
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              if (link.label === "Work") {
                return (
                  <div key={link.href} className="relative group py-4">
                    <a
                      href={link.href}
                      data-text={link.label.toUpperCase()}
                      className="glitch-link font-mono text-xs font-medium tracking-widest text-neutral-300 transition-colors hover:text-white uppercase flex items-center gap-1 cursor-pointer"
                    >
                      {link.label.toUpperCase()}
                      <svg className="w-3 h-3 text-neutral-500 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>

                    {/* Desktop Hover Dropdown Menu */}
                    <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-1 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      {/* Invisible bridge to prevent mouse-leave when moving cursor down */}
                      <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                      
                      <div className="rounded-xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-md">
                        {workSubLinks.map((sub) => (
                          <button
                            key={sub.hash}
                            onClick={() => handleGalleryNav(sub.hash)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium font-mono text-neutral-400 hover:bg-amber-400/10 hover:text-amber-400 transition-all"
                          >
                            <span>{sub.icon}</span>
                            <span>{sub.label.toUpperCase()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-text={link.label.toUpperCase()}
                  className="glitch-link font-mono text-xs font-medium tracking-widest text-neutral-300 transition-colors hover:text-white uppercase"
                >
                  {link.label.toUpperCase()}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) =>
                link.label === "Work" ? (
                  <div key={link.href}>
                    {/* Work row with chevron */}
                    <div className="flex items-center justify-between">
                      <a
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </a>
                      <button
                        onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Toggle Work sub-menu"
                      >
                        <Chevron open={isWorkDropdownOpen} />
                      </button>
                    </div>

                    {/* Work sub-links */}
                    <AnimatePresence>
                      {isWorkDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 overflow-hidden border-l border-neutral-700 pl-3"
                        >
                          {/* Street Photography */}
                          <button
                            onClick={() => handleGalleryNav("street")}
                            className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            Street Photography
                          </button>

                          {/* Timeline */}
                          <button
                            onClick={() => handleGalleryNav("timeline")}
                            className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            Timeline
                          </button>

                          {/* SoBo → NoBo Series */}
                          <button
                            onClick={() => handleGalleryNav("sobonobo")}
                            className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            SoBo → NoBo Series
                          </button>

                          {/* Digicam Vision */}
                          <button
                            onClick={() => handleGalleryNav("digicam")}
                            className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            Digicam Vision
                          </button>

                          {/* All Photos with nested dropdown */}
                          <div>
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => handleGalleryNav("all")}
                                className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                All Photos
                              </button>
                              <button
                                onClick={() => setIsAllPhotosDropdownOpen(!isAllPhotosDropdownOpen)}
                                className="p-2 text-neutral-500 hover:text-white transition-colors"
                                aria-label="Toggle All Photos sub-menu"
                              >
                                <Chevron open={isAllPhotosDropdownOpen} />
                              </button>
                            </div>

                            {/* All Photos sub-categories */}
                            <AnimatePresence>
                              {isAllPhotosDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-4 overflow-hidden border-l border-neutral-800 pl-3"
                                >
                                  {allPhotosSubLinks.map((sub) => (
                                    <button
                                      key={sub.href}
                                      onClick={() => handleGalleryNav(sub.href.slice(1))}
                                      className="block w-full text-left rounded-md px-3 py-2 text-xs font-medium text-neutral-500 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                      {sub.label}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
