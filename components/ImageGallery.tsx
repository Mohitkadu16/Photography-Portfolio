"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useState } from "react";

interface ImageData {
  id: number;
  src?: string;
  images?: string[]; // Array of images for sub-carousel
  alt: string;
  instagramUrl?: string;
  date?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  isTimeline?: boolean;
}

export default function ImageGallery({ images, isTimeline = false }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [subCarouselIndex, setSubCarouselIndex] = useState<{ [key: number]: number }>({});

  // Navigation functions
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  // Render image slideshow for timeline
  if (isTimeline) {
    const currentImage = images[currentIndex];
    const postImages = currentImage.images || (currentImage.src ? [currentImage.src] : []);
    const currentSubIndex = subCarouselIndex[currentIndex] || 0;

    // Sub-carousel navigation
    const goToNextSubImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentSubIndex < postImages.length - 1) {
        setSubCarouselIndex({
          ...subCarouselIndex,
          [currentIndex]: currentSubIndex + 1,
        });
      }
    };

    const goToPrevSubImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentSubIndex > 0) {
        setSubCarouselIndex({
          ...subCarouselIndex,
          [currentIndex]: currentSubIndex - 1,
        });
      }
    };

    return (
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-12">
        {/* Slideshow Container */}
        <div className="relative min-h-[500px] flex items-center justify-center py-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full flex flex-col items-center"
            >
              {/* Image Display with Sub-Carousel */}
              <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl group">
                {/* Current Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={postImages[currentSubIndex]}
                    alt={`${currentImage.alt} - Image ${currentSubIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority={currentIndex === 0 && currentSubIndex === 0}
                    unoptimized
                    draggable={false}
                  />
                </div>

                {/* Preload next and previous images for faster switching */}
                {currentSubIndex > 0 && (
                  <div className="hidden">
                    <Image
                      src={postImages[currentSubIndex - 1]}
                      alt="Preload previous"
                      width={500}
                      height={500}
                      unoptimized
                    />
                  </div>
                )}
                {currentSubIndex < postImages.length - 1 && (
                  <div className="hidden">
                    <Image
                      src={postImages[currentSubIndex + 1]}
                      alt="Preload next"
                      width={500}
                      height={500}
                      unoptimized
                    />
                  </div>
                )}

                {/* Sub-Carousel Navigation (only if multiple images) */}
                {postImages.length > 1 && (
                  <>
                    {/* Previous Button */}
                    {currentSubIndex > 0 && (
                      <button
                        onClick={goToPrevSubImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Previous image in post"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                    )}

                    {/* Next Button */}
                    {currentSubIndex < postImages.length - 1 && (
                      <button
                        onClick={goToNextSubImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Next image in post"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    )}

                    {/* Sub-Carousel Dot Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {postImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentSubIndex
                              ? "bg-white w-2 h-2"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Metadata Below */}
              <div className="mt-6 w-full max-w-[500px] px-4 text-center space-y-3">
                {/* Date */}
                <p className="text-xs text-neutral-500 font-medium tracking-wide">
                  {formatDate(currentImage.date)}
                </p>

                {/* Caption */}
                {currentImage.caption && (
                  <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                    {currentImage.caption}
                  </p>
                )}

                {/* Instagram Link */}
                <a
                  href={currentImage.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium rounded-full transition-all duration-200"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  View on Instagram
                </a>
              </div>

              {/* Post Counter */}
              <div className="mt-3 text-xs text-neutral-600 font-mono">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex === images.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? "bg-white w-6 h-1.5"
                  : "bg-white/40 hover:bg-white/60 w-1.5 h-1.5"
              }`}
              aria-label={`Go to post ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Regular image gallery for non-timeline
  return (
    <PhotoProvider
      maskOpacity={0.9}
      speed={() => 300}
      easing={(type) => (type === 2 ? "cubic-bezier(0.36, 0, 0.66, -0.56)" : "cubic-bezier(0.34, 1.56, 0.64, 1)")}
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 aspect[4/5]">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900"
          >
            <PhotoView src={image.src!}>
              <div className="cursor-pointer">
                <Image
                  src={image.src!}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
              </div>
            </PhotoView>
          </motion.div>
        ))}
      </div>
    </PhotoProvider>
  );
}
