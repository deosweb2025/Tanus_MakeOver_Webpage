import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteData.hero.slides; // 3 Widescreen 16:9 Master Bridal Photographs

  // Slideshow: Smooth background transition every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] flex items-center justify-center overflow-hidden bg-[#0d0b0a]"
      aria-label="Hero Showcase"
    >
      {/* Background Slideshow: 3 Master Photographs (Responsive 9:16 Portrait for Mobile, 16:9 Widescreen for Desktop) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="absolute inset-0 w-full h-full"
              >
                <picture className="w-full h-full block">
                  <source media="(max-width: 1023px)" srcSet={slide.mobileImage || slide.image} />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top lg:object-center filter-none"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Subtle cinematic left vignette for pristine text legibility on laptop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10 pointer-events-none hidden lg:block" />
        
        {/* Mobile atmospheric gradient: gentle center and bottom shading for clear text legibility while keeping bride vibrant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 via-50% to-transparent z-10 pointer-events-none lg:hidden" />
      </div>

      {/* Hero Foreground Content - Positioned slightly lower on mobile to fully reveal bride's choker & face, Editorial Left-Aligned on Laptop */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center lg:items-start text-center lg:text-left py-8 lg:py-0 translate-y-16 sm:translate-y-20 lg:translate-y-0">
        
        {/* Main Luxury Heading - Centered in middle for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl lg:max-w-xl"
        >
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.14] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            {siteData.hero.headingMain}{' '}
            <span className="font-display-luxury italic font-normal text-rose-gold-gradient block sm:inline">
              {siteData.hero.headingAccent}
            </span>
          </h1>
        </motion.div>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-stone-200 max-w-xl font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        >
          {siteData.hero.description}
        </motion.p>

        {/* Clean Luxury CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <a
            href="#gallery"
            onClick={(e) => handleScrollTo(e, 'gallery')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#b8860b] rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>{siteData.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white border border-[#d4af37]/70 bg-black/40 rounded-full hover:bg-black/60 hover:border-[#d4af37] backdrop-blur-sm transition-all duration-300"
          >
            <span>{siteData.hero.secondaryCta}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
