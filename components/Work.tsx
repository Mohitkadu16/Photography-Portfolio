"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import SoBoNoBoBanner from "./SoBoNoBoBanner";
import { galleryData } from "@/lib/data";

export default function Work() {
  const [activeGallery, setActiveGallery] = useState<"street" | "timeline" | "all">("street");
  const [activeCategory, setActiveCategory] = useState<"buildings" | "animals" | "nature" | "cars">("buildings");
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
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const allPhotosCategories = [
    { id: "buildings", label: "Buildings/Structures" },
    { id: "animals", label: "Animals/Birds/Insects" },
    { id: "nature", label: "Nature/Scenery" },
    { id: "cars", label: "Cars" },
  ] as const;

  const galleryTabs = [
    { id: "street", label: "Street Photography", icon: "🏙️" },
    { id: "timeline", label: "Timeline", icon: "📅" },
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
          <h2 className="mb-10 text-center text-4xl font-bold text-white md:text-5xl">
            Work
          </h2>

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
          <div className="relative z-30 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              <div id="all-photos">
                {activeGallery === "all" && (
                  <ImageGallery key={`all-${activeCategory}`} images={galleryData.allPhotos[activeCategory]} />
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
