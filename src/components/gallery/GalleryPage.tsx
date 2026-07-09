"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Deep Clean", "Office"];

const images = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    alt: "Clean living room",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    alt: "Clean kitchen",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    alt: "Clean bathroom",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    alt: "Modern office",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    alt: "Office lobby",
    category: "Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Open office",
    category: "Office",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18f6bff2e?w=600&q=80",
    alt: "Deep cleaned room",
    category: "Deep Clean",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80",
    alt: "Clean interior",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=600&q=80",
    alt: "Living room clean",
    category: "Residential",
  },
];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-navy-900 text-white"
                : "bg-white text-navy-700 border-2 border-navy-200 hover:border-navy-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden"
            onClick={() => setLightboxIndex(i)}
          >
            <div
              className="w-full h-64 md:h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {img.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-900/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-navy-300 transition-colors"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! > 0 ? i! - 1 : filtered.length - 1));
              }}
              className="absolute left-6 text-white hover:text-navy-300 transition-colors"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-[70vh] bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${filtered[lightboxIndex].src})`,
                }}
              />
              <p className="text-white text-center mt-4 text-sm">
                {filtered[lightboxIndex].alt}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! < filtered.length - 1 ? i! + 1 : 0));
              }}
              className="absolute right-6 text-white hover:text-navy-300 transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
