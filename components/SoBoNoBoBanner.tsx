"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryData } from "@/lib/data";

/* ─── EP Card shared types ─── */
interface EPCardProps {
  ep: number;
  date?: string;
  photos: string[];
  caption?: string;
  instagramUrl?: string;
  onViewSeries: () => void;
  comingSoon?: boolean;
  title?: string;
  badge?: string;
}

function EPCard({
  ep,
  date,
  photos,
  caption,
  instagramUrl,
  onViewSeries,
  comingSoon = false,
  title,
  badge,
}: EPCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [subIndex, setSubIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle banner photos
  useEffect(() => {
    if (isExpanded || comingSoon || photos.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentImg((p) => (p + 1) % photos.length);
    }, 3200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isExpanded, comingSoon, photos.length]);

  const handleViewSeries = () => {
    setIsExpanded(true);
    onViewSeries();
  };

  const goNext = () => setSubIndex((p) => Math.min(p + 1, photos.length - 1));
  const goPrev = () => setSubIndex((p) => Math.max(p - 1, 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: ep === 1 ? 0 : 0.15 }}
      className="flex flex-col self-start w-full"
    >
      {/* ── Portrait card — aspect ratio 4:5, capped to fit viewport ── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "4/5", maxHeight: "calc(100vh - 290px)" }}
      >
        {/* Background photo(s) */}
        {comingSoon ? (
          <div className="absolute inset-0 bg-neutral-900" />
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={currentImg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}
              className="absolute inset-0 z-0"
            >
              {photos[currentImg] && (
                <Image
                  src={photos[currentImg]}
                  alt={`SoBo → NoBo EP${ep} — frame ${currentImg + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  priority={ep === 1 && currentImg === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Gradient overlay — stronger at bottom for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

        {/* Coming soon center icon */}
        {comingSoon && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <svg className="w-7 h-7 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-mono tracking-widest text-white/30 uppercase">Coming Soon</p>
            </div>
          </div>
        )}

        {/* Photo dot indicators (top right) — EP1 only */}
        {!comingSoon && photos.length > 1 && !isExpanded && (
          <div className="absolute top-4 right-4 z-30 flex flex-wrap gap-1 justify-end max-w-[80px]">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentImg
                    ? "bg-amber-400 w-4 h-1.5"
                    : "bg-white/30 hover:bg-white/50 w-1.5 h-1.5"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Content overlay — bottom of card (both EP1 and EP2) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5 flex flex-col gap-2.5">
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-amber-400 backdrop-blur-sm">
              {badge || "SOBO → NOBO"}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono backdrop-blur-sm border ${
              comingSoon
                ? "bg-white/5 text-white/20 border-white/10"
                : "bg-white/10 text-white/60 border-white/10"
            }`}>
              {comingSoon ? "EP. 02 · TBA" : ep === 3 ? `${date}` : `EP. 0${ep} · ${date}`}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-2xl sm:text-3xl font-bold leading-tight tracking-tight ${
              comingSoon ? "text-white/20" : "text-white"
            }`}
            style={!comingSoon ? { textShadow: "0 2px 20px rgba(0,0,0,0.9)" } : {}}
          >
            {title ? (
              title
            ) : (
              <>
                SoBo{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  →
                </span>{" "}
                NoBo
              </>
            )}
          </h3>

          {/* Caption — EP1 only */}
          {!comingSoon && caption && (
            <p className="text-[10px] text-white/40 leading-relaxed line-clamp-1">{caption}</p>
          )}

          {/* Coming soon label — EP2 only */}
          {comingSoon && (
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              Episode 2 — Coming Soon
            </p>
          )}

          {/* CTAs — EP1 only */}
          {!comingSoon && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleViewSeries}
                className="group flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]"
              >
                View Series
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-500/10 hover:text-pink-300"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Expanded inline gallery ── */}
      <AnimatePresence>
        {isExpanded && !comingSoon && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">
              {/* Header row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-amber-400" />
                  <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">
                    {badge ? `${badge} — All Frames` : `EP. 0${ep} — All Frames`}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  {subIndex + 1} / {photos.length}
                </span>
              </div>

              {/* Inline carousel — centered active + side peeks */}
              <div className="relative flex items-center justify-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={subIndex === 0}
                  className="flex-shrink-0 rounded-full bg-neutral-800 p-2 text-white transition-all hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <div className="flex gap-2 overflow-hidden flex-1 justify-center items-center">
                  {photos.map((src, i) => {
                    const offset = i - subIndex;
                    if (Math.abs(offset) > 1) return null;
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          scale: offset === 0 ? 1 : 0.78,
                          opacity: offset === 0 ? 1 : 0.35,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSubIndex(i)}
                        style={{ aspectRatio: "4/5" }}
                        className={`relative flex-shrink-0 overflow-hidden rounded-xl cursor-pointer ${
                          offset === 0
                            ? "w-36 ring-2 ring-amber-400/60 sm:w-48"
                            : "w-20 sm:w-28"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`EP${ep} frame ${i + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <button
                  onClick={goNext}
                  disabled={subIndex === photos.length - 1}
                  className="flex-shrink-0 rounded-full bg-neutral-800 p-2 text-white transition-all hover:bg-neutral-700 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Caption */}
              {caption && (
                <p className="mt-4 text-center text-[11px] italic text-neutral-500 leading-relaxed px-4">
                  {caption}
                </p>
              )}

              {/* Collapse */}
              <button
                onClick={() => { setIsExpanded(false); setSubIndex(0); }}
                className="mx-auto mt-4 flex items-center gap-1.5 text-[11px] text-neutral-600 hover:text-white transition-colors"
              >
                <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Collapse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main banner wrapper ─── */
interface SoBoNoBoBannerProps {
  onViewSeries: () => void;
}

export default function SoBoNoBoBanner({ onViewSeries }: SoBoNoBoBannerProps) {
  const ep1 = galleryData.timeline.find((t) =>
    t.caption?.toLowerCase().includes("sobo to nobo | ep 1")
  );
  const ep2 = galleryData.timeline.find((t) =>
    t.caption?.toLowerCase().includes("sobo to nobo | ep 2")
  );

  const ep1Photos = ep1?.images ?? [];
  const ep2Photos = ep2?.images ?? [];
  const digicamPhotos = galleryData.digicam.map((d) => d.src);

  return (
    <div className="mb-20">
      {/* Series header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/30" />
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-amber-400 uppercase">
            Featured Series
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/30" />
      </motion.div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 overflow-hidden rounded-full border border-white/8 bg-white/3 py-2 backdrop-blur-sm"
      >
        <motion.p
          animate={{ x: [0, -900] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[10px] font-mono text-white/30 px-6 tracking-widest"
        >
          South Bombay &nbsp;·&nbsp; Gateway of India &nbsp;·&nbsp; Marine Drive &nbsp;·&nbsp;
          Fort &nbsp;·&nbsp; Churchgate &nbsp;·&nbsp; CST &nbsp;·&nbsp; Dadar &nbsp;·&nbsp;
          Bandra &nbsp;·&nbsp; Andheri &nbsp;·&nbsp; Jogeshwari &nbsp;·&nbsp; Borivali &nbsp;·&nbsp; North Bombay
          &nbsp;&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;&nbsp;
          South Bombay &nbsp;·&nbsp; Gateway of India &nbsp;·&nbsp; Marine Drive &nbsp;·&nbsp;
          Fort &nbsp;·&nbsp; Churchgate &nbsp;·&nbsp; CST &nbsp;·&nbsp; Dadar &nbsp;·&nbsp;
          Bandra &nbsp;·&nbsp; Andheri &nbsp;·&nbsp; North Bombay &nbsp;&nbsp;
        </motion.p>
      </motion.div>

      {/* Three EP cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
        <EPCard
          ep={1}
          date="JAN 2026"
          photos={ep1Photos}
          caption={ep1?.caption}
          instagramUrl={ep1?.instagramUrl}
          onViewSeries={onViewSeries}
        />
        <EPCard
          ep={2}
          date="APR 2026"
          photos={ep2Photos}
          caption={ep2?.caption}
          instagramUrl={ep2?.instagramUrl}
          onViewSeries={onViewSeries}
        />
        <EPCard
          ep={3}
          date="VINTAGE"
          title="CCD Bombay"
          badge="CCD BOMBAY"
          photos={digicamPhotos}
          caption="Chasing nostalgic Bombay moments through the organic grain and vintage lens of a classic CCD sensor."
          instagramUrl="https://instagram.com/loyalmanuka"
          onViewSeries={onViewSeries}
        />
      </div>
    </div>
  );
}
