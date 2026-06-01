"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import SoBoNoBoBanner from "./SoBoNoBoBanner";
import { galleryData, categoriesConfig } from "@/lib/data";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface EpisodeScrollProps {
  title: string;
  subtitle: string;
  badge: string;
  images: string[];
}

function EpisodeHorizontalScroll({ title, subtitle, badge, images }: EpisodeScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 450;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-16">
      {/* Title & Scroll Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">{badge}</span>
          </div>
          <h3 className="font-bebas text-3xl text-white tracking-wide">{title}</h3>
          <p className="text-xs text-neutral-400">{subtitle}</p>
        </div>
        
        {/* Scroll Buttons */}
        <div className="flex gap-2 self-end sm:self-auto">
          <button 
            onClick={() => scroll("left")}
            className="rounded-full border border-white/10 bg-neutral-900/60 p-2.5 text-white transition-all hover:bg-neutral-800 hover:border-white/20 active:scale-95"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={() => scroll("right")}
            className="rounded-full border border-white/10 bg-neutral-900/60 p-2.5 text-white transition-all hover:bg-neutral-800 hover:border-white/20 active:scale-95"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <PhotoProvider
        maskOpacity={0.9}
        speed={() => 300}
        easing={(type) => (type === 2 ? "cubic-bezier(0.36, 0, 0.66, -0.56)" : "cubic-bezier(0.34, 1.56, 0.64, 1)")}
      >
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide py-2 px-1 select-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, index) => (
            <div 
              key={index}
              className="relative aspect-[4/5] w-64 md:w-72 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-900 border border-white/5 scroll-snap-align-start group transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]"
            >
              <PhotoView src={src}>
                <div className="cursor-pointer w-full h-full relative">
                  <Image 
                    src={src}
                    alt={`${title} — Frame ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 256px, 288px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-mono text-[9px] text-amber-400/90 tracking-wider">FRAME {index + 1} / {images.length}</p>
                  </div>
                </div>
              </PhotoView>
            </div>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
}

export default function Work() {
  const [activeGallery, setActiveGallery] = useState<"street" | "timeline" | "all" | "digicam" | "sobonobo">("street");
  const [activeCategory, setActiveCategory] = useState<string>("buildings");
  const [showTabs, setShowTabs] = useState(false);

  // Listen to URL hash changes (from mobile nav dropdown links)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      switch (hash) {
        case "street":
          setActiveGallery("street");
          setShowTabs(true);
          break;
        case "timeline":
          setActiveGallery("timeline");
          setShowTabs(true);
          break;
        case "all":
          setActiveGallery("all");
          setShowTabs(true);
          break;
        case "digicam":
          setActiveGallery("digicam");
          setShowTabs(true);
          break;
        case "sobonobo":
          setActiveGallery("sobonobo");
          setShowTabs(true);
          break;
        case "buildings":
          setActiveGallery("all");
          setActiveCategory("buildings");
          setShowTabs(true);
          break;
        case "animals":
          setActiveGallery("all");
          setActiveCategory("animals");
          setShowTabs(true);
          break;
        case "nature":
          setActiveGallery("all");
          setActiveCategory("nature");
          setShowTabs(true);
          break;
        case "cars":
          setActiveGallery("all");
          setActiveCategory("cars");
          setShowTabs(true);
          break;
        case "culture":
          setActiveGallery("all");
          setActiveCategory("culture");
          setShowTabs(true);
          break;
        case "street-photos":
          setActiveGallery("all");
          setActiveCategory("street");
          setShowTabs(true);
          break;
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const allPhotosCategories = categoriesConfig;

  const galleryTabs = [
    { id: "street", label: "Street Photography", icon: "🏙️" },
    { id: "timeline", label: "Timeline", icon: "📅" },
    { id: "sobonobo", label: "SoBo → NoBo Series", icon: "🗺️" },
    { id: "digicam", label: "Digicam Vision", icon: "📸" },
    { id: "all", label: "All Photos", icon: "🖼️" },
  ] as const;

  return (
    <section id="work" className="min-h-screen bg-black pt-12 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading */}
          <p className="mb-2 text-center font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            002 —
          </p>
          <h2 className="mb-2 text-center font-bebas text-6xl text-white md:text-7xl">
            Work
          </h2>
          <div className="mx-auto mb-10 mt-4 h-px w-12 bg-amber-400/50" />

          {/* ── SoBo → NoBo Featured Banner ── */}
          <SoBoNoBoBanner onViewSeries={() => setShowTabs(false)} />

          {/* ── Divider ── */}
          <div className="relative mb-12 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-800 to-neutral-800" />
            <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">
              More Work
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-neutral-800 to-neutral-800" />
          </div>

          {/* ── Editorial Tab Cards ── */}
          <div className="relative z-30 mb-10 grid grid-cols-1 sm:grid-cols-5 gap-4">
            {galleryTabs.map((tab, i) => (
              <motion.button
                key={tab.id}
                id={tab.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => {
                  setActiveGallery(tab.id);
                  setShowTabs(true);
                }}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                  activeGallery === tab.id && showTabs
                    ? "border-amber-400/50 bg-amber-400/5 shadow-[0_0_30px_rgba(251,191,36,0.1)]"
                    : "border-white/8 bg-neutral-900/60 hover:border-white/20 hover:bg-neutral-800/60"
                }`}
              >
                {/* Active glow bar */}
                {activeGallery === tab.id && showTabs && (
                  <motion.div
                    layoutId="activeTabBar"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-t-2xl"
                  />
                )}

                <span className="mb-2 block text-2xl">{tab.icon}</span>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    activeGallery === tab.id && showTabs
                      ? "text-amber-400"
                      : "text-white group-hover:text-white"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Arrow indicator */}
                <motion.svg
                  animate={{ x: activeGallery === tab.id && showTabs ? 4 : 0 }}
                  className={`mt-2 w-4 h-4 transition-colors ${
                    activeGallery === tab.id && showTabs ? "text-amber-400" : "text-neutral-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
            ))}
          </div>

          {/* All Photos Subcategory Tabs */}
          {activeGallery === "all" && showTabs && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-30 mb-10 flex flex-wrap justify-center gap-3"
            >
              {allPhotosCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-amber-400/15 text-amber-400 border border-amber-400/40"
                      : "bg-neutral-900 border border-white/8 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* Gallery Content */}
          {showTabs && (
            <motion.div
              key={`${activeGallery}-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div id="street">
                {activeGallery === "street" && (
                  <ImageGallery key="street" images={galleryData.street} />
                )}
              </div>

              <div id="timeline">
                {activeGallery === "timeline" && (
                  <ImageGallery key="timeline" images={galleryData.timeline} isTimeline />
                )}
              </div>

              <div id="sobonobo">
                {activeGallery === "sobonobo" && (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 rounded-2xl border border-amber-500/20 bg-neutral-950/80 backdrop-blur-sm relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02]" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">FEATURED STREET SERIES</span>
                        </div>
                        <h3 className="font-bebas text-3xl text-white tracking-wide">SOBO TO NOBO</h3>
                        <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
                          Exploring the transitions of Mumbai, capturing the contrast between historical South Bombay architecture and modern North Bombay lifestyle.
                        </p>
                      </div>
                    </motion.div>

                    {/* Episode 1 */}
                    <EpisodeHorizontalScroll 
                      title="Episode 1 — 2016 Vibes" 
                      subtitle="Walking Mumbai with feelings & old visions." 
                      badge="EPISODE 01 · JAN 2026"
                      images={galleryData.timeline.find((t) => t.caption?.toLowerCase().includes("sobo to nobo | ep 1"))?.images ?? []}
                    />

                    {/* Episode 2 */}
                    <EpisodeHorizontalScroll 
                      title="Episode 2 — Chasing streets" 
                      subtitle="Somewhere between memories & motion." 
                      badge="EPISODE 02 · APR 2026"
                      images={galleryData.timeline.find((t) => t.caption?.toLowerCase().includes("sobo to nobo | ep 2"))?.images ?? []}
                    />
                  </div>
                )}
              </div>

              <div id="digicam">
                {activeGallery === "digicam" && (
                  <>
                    {/* Retro LCD screen themed header for the Digicam Vision section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 rounded-2xl border border-amber-500/20 bg-neutral-950/80 backdrop-blur-sm relative overflow-hidden"
                    >
                      {/* LCD Dot Matrix grid background pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                            <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">REC [CCD MODE]</span>
                          </div>
                          <h3 className="font-bebas text-3xl text-white tracking-wide">DIGICAM VISION</h3>
                          <p className="mt-1 text-sm text-neutral-400 max-w-xl">
                            Chasing nostalgia through the lens of a classic CCD sensor. Characterized by warm color grading, organic noise, and dreamy highlights.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 items-start md:items-end font-mono text-[10px] text-amber-500/70 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
                          <span>CAMERA: DC403 DIGICAM</span>
                          <span>SENSOR: CCD</span>
                          <span>SPECS: 44MP · F/3.2</span>
                          <span>STYLE: RETRO LO-FI</span>
                        </div>
                      </div>
                    </motion.div>
                    <ImageGallery key="digicam" images={galleryData.digicam} />
                  </>
                )}
              </div>

              <div id="all-photos">
                {activeGallery === "all" && (
                  <ImageGallery key={`all-${activeCategory}`} images={galleryData.allPhotos[activeCategory] || []} />
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
