"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import { galleryData } from "@/lib/data";

export default function Work() {
  const [activeGallery, setActiveGallery] = useState<"street" | "timeline" | "all">("street");
  const [activeCategory, setActiveCategory] = useState<"buildings" | "animals" | "nature" | "cars">("buildings");

  const allPhotosCategories = [
    { id: "buildings", label: "Buildings/Structures" },
    { id: "animals", label: "Animals/Birds/Insects" },
    { id: "nature", label: "Nature/Scenery" },
    { id: "cars", label: "Cars" },
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
          <h2 className="mb-8 text-center text-4xl font-bold text-white md:text-5xl">
            Work
          </h2>

          {/* Main Gallery Tabs */}
          <div className="relative z-30 mb-20 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveGallery("street")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeGallery === "street"
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              Street Photography
            </button>
            <button
              onClick={() => setActiveGallery("timeline")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeGallery === "timeline"
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              Timeline Photography
            </button>
            <button
              onClick={() => setActiveGallery("all")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeGallery === "all"
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              All Photos
            </button>
          </div>

          {/* All Photos Subcategory Tabs */}
          {activeGallery === "all" && (
            <div className="relative z-30 mb-16 flex flex-wrap justify-center gap-3">
              {allPhotosCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-neutral-700 text-white"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Content */}
          <div id="street">
            {activeGallery === "street" && (
              <ImageGallery images={galleryData.street} />
            )}
          </div>

          <div id="timeline">
            {activeGallery === "timeline" && (
              <ImageGallery images={galleryData.timeline} isTimeline />
            )}
          </div>

          <div id="all-photos">
            {activeGallery === "all" && (
              <ImageGallery images={galleryData.allPhotos[activeCategory]} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
