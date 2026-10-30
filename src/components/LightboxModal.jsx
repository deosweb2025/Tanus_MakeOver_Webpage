import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const LightboxModal = ({ isOpen, currentIndex, images, onClose, onPrev, onNext }) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi Tanu Das, I saw this look ("${currentImage.title}" - ${currentImage.category}) in your Tanus Makeover portfolio and loved it! Could I book this for my wedding/event?`
    );
    window.open(`https://wa.me/919062743223?text=${text}`, '_blank');
  };

  const handleBookDate = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image Box Screen View"
      >
        {/* Luxury Box Screen Container - Strict viewport bounded, zero overflow clipping */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl lg:max-w-5xl h-[92vh] max-h-[880px] flex flex-col bg-[#141210] border border-[#d4af37]/45 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar - Fixed Height */}
          <div className="shrink-0 w-full h-13 sm:h-14 flex items-center justify-between px-4 sm:px-6 bg-[#0c0a09] border-b border-white/10 z-20">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs tracking-widest font-semibold uppercase bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-sm">
                {currentImage.category}
              </span>
              <span className="text-xs text-stone-300 font-sans-clean font-medium">
                {currentIndex + 1} of {images.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] text-stone-400 tracking-wider">
                Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 text-[10px]">→</kbd> to navigate
              </span>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-black transition-all focus:outline-none"
                aria-label="Close box view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Display Box - flex-1 min-h-0 ensures image scales to fit perfectly without cropping */}
          <div className="relative w-full flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 overflow-hidden">
            <motion.img
              key={currentImage.image}
              src={currentImage.image}
              alt={currentImage.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl select-none shadow-2xl drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            />

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 hover:border-[#d4af37] transition-all duration-200 focus:outline-none shadow-2xl active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/75 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 hover:border-[#d4af37] transition-all duration-200 focus:outline-none shadow-2xl active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title & Inquire CTA - Fixed Height with zero clipping */}
          <div className="shrink-0 w-full px-4 sm:px-6 py-3 sm:py-3.5 bg-[#0c0a09] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
            <div className="text-center sm:text-left min-w-0">
              <h4 className="font-serif-luxury text-sm sm:text-base md:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
                {currentImage.title}
              </h4>
              <p className="text-[11px] text-[#d4af37] tracking-wider mt-0.5">
                Tanus Makeover Portfolio • By Tanu Das (Estd. 2019)
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
              <button
                onClick={handleWhatsAppInquiry}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-md shadow-emerald-900/40 active:scale-95"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Inquire Look</span>
              </button>

              <button
                onClick={handleBookDate}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#e5c158] to-[#d4af37] text-black hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#d4af37]/20 font-semibold"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Date</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal;
