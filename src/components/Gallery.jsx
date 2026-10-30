import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Camera } from 'lucide-react';
import { siteData } from '../data/siteData';
import LightboxModal from './LightboxModal';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  const categories = [
    'All',
    'Bridal',
    'Reception',
    'Haldi & Engagement',
    'Party',
    'Fashion Shoot',
  ];

  const allImages = siteData.gallery;

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return allImages;
    return allImages.filter((item) => item.category === activeCategory);
  }, [allImages, activeCategory]);

  const displayedImages = filteredImages.slice(0, visibleCount);

  const openLightbox = (indexInFiltered) => {
    setLightboxIndex(indexInFiltered);
    setIsLightboxOpen(true);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="gallery"
      className="gallery-section relative py-20 sm:py-28 lg:py-36 bg-[#f8f4ee] text-stone-800 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#e8b4b8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="gallery-header text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 shadow-sm mb-4">
            <Camera className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c6714] uppercase">
              PORTFOLIO SHOWCASE
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Real Transformations, Timeless Elegance
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base font-light max-w-xl mx-auto">
            Click any photograph to view in full box-screen mode. Every bride pictured was styled with care and artistry by Tanu Das.
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 origin-center"
          />
        </motion.div>

        {/* Filter Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(16);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none ${isActive
                    ? 'bg-gradient-to-r from-[#e5c158] to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30 scale-105'
                    : 'bg-white hover:bg-stone-50 text-stone-700 hover:text-black border border-[#d4af37]/30 hover:border-[#d4af37] shadow-sm'
                  }`}
              >
                {cat === 'All' ? 'All Creations' : cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Responsive 2 to 4 columns) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
        >
          <AnimatePresence>
            {displayedImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#d4af37]/25 hover:border-[#d4af37] cursor-pointer shadow-md hover:shadow-2xl hover:shadow-stone-900/20 transition-all duration-500 aspect-[3/4]"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle permanent category tag on mobile */}
                <div className="sm:hidden absolute top-2 left-2 z-10">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-black/60 text-[#d4af37] backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover Box Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 z-20">

                  {/* Center Zoom Cue */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/90 text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Caption & Category */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#d4af37]">
                      {item.category}
                    </span>
                    <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-white line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-stone-300 mt-1 flex items-center gap-1">
                      <span>Click to view in box screen</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white hover:bg-stone-50 text-[#8c6714] border border-[#d4af37]/60 hover:border-[#d4af37] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Load More Photographs ({filteredImages.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Box-Screen Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        currentIndex={lightboxIndex}
        images={filteredImages}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default Gallery;
