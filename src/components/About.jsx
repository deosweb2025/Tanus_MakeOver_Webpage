import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, Check, MapPin } from 'lucide-react';
import { siteData } from '../data/siteData';

// Dynamic Count-Up / Odometer Animation for Stats Badges
const StatCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayNumber, setDisplayNumber] = useState(0);

  // Match leading integer and trailing suffix (e.g., "2019", "500+", "100%")
  const match = String(value).match(/^(\d+)(.*)$/);
  const isNumeric = !!match;
  const targetNumber = isNumeric ? parseInt(match[1], 10) : 0;
  const suffix = isNumeric ? match[2] : '';

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    // Smooth luxury easeOut cubic bezier
    const controls = animate(0, targetNumber, {
      duration: targetNumber > 1000 ? 2.4 : 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayNumber(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, isNumeric, targetNumber]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {displayNumber}
      {suffix && <span className="text-[0.85em] ml-0.5">{suffix}</span>}
    </span>
  );
};

const About = () => {
  const { about, location } = siteData;

  return (
    <section
      id="about"
      className="about-section relative py-20 sm:py-28 lg:py-36 bg-[#fbf7f2] text-stone-800 overflow-hidden"
    >
      {/* Decorative background ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#e8b4b8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow & Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#d4af37]/40 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c6714] uppercase">
              {about.eyebrow}
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            {about.title}
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-5 origin-center"
          />
        </motion.div>

        {/* Editorial Split Grid: Images & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Luxury Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none mb-10 lg:mb-0">
              
              {/* Primary Large Image */}
              <div className="about-image-card relative z-10 rounded-2xl overflow-hidden border-2 border-[#d4af37]/35 shadow-2xl shadow-stone-900/20 aspect-[4/5] bg-white">
                <img
                  src={about.featuredImages[0]}
                  alt="Tanus Makeover Signature Bride"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-28 xs:right-36 sm:right-48 lg:right-52 z-10">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#f7e7ce] font-semibold">
                    Signature Artistry
                  </span>
                  <p className="text-xs sm:text-sm font-serif-luxury text-white font-medium line-clamp-2">
                    Hand-painted Chandan & Royal Benarasi Elegance
                  </p>
                </div>
              </div>

              {/* Secondary Overlapping Floating Image (Now visible on mobile and desktop) */}
              <div className="about-image-card absolute -bottom-6 xs:-bottom-7 sm:-bottom-8 right-1 xs:-right-2 sm:-right-6 lg:-right-8 w-32 xs:w-40 sm:w-52 lg:w-56 aspect-[3/4] z-20 rounded-xl overflow-hidden border-2 border-[#d4af37]/50 shadow-2xl shadow-stone-900/30 bg-white">
                <img
                  src={about.featuredImages[1]}
                  alt="Tanus Makeover Editorial Beauty"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] sm:text-[10px] tracking-wider text-[#d4af37] font-semibold uppercase">
                    Editorial Radiance
                  </span>
                </div>
              </div>

              {/* Floating Established Badge */}
              <div className="about-image-card absolute -top-4 -left-2 sm:-top-5 sm:-left-6 z-30 bg-white/95 border border-[#d4af37]/50 rounded-2xl p-2.5 sm:p-4 shadow-xl backdrop-blur-md flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#e5c158] to-[#b8860b] flex items-center justify-center text-black font-bold font-serif-luxury text-base sm:text-lg shadow-md">
                  T
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#967117] font-bold">
                    ESTABLISHED
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#1c1917] font-serif-luxury leading-none">
                    2019
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-stone-500">Kolkata, WB</div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 about-text-content space-y-6"
          >
            <div className="space-y-4 text-stone-700 font-light text-sm sm:text-base leading-relaxed">
              <p className="first-letter:text-4xl first-letter:font-serif-luxury first-letter:font-bold first-letter:text-[#b8860b] first-letter:mr-2 first-letter:float-left">
                {about.storyParagraph1}
              </p>
              <p>
                {about.storyParagraph2}
              </p>
              <p>
                {about.storyParagraph3}
              </p>
            </div>

            {/* Core Values Bullet List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-stone-200">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 primary h-3 text-[#8c6714]" />
                </div>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">
                  Prestige HD & Airbrush Products
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#8c6714]" />
                </div>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">
                  Master Chandan & Bindi Artistry
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#8c6714]" />
                </div>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">
                  Venue & Destination Travel
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#8c6714]" />
                </div>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">
                  Sweat-Proof & Flash-Safe Longevity
                </span>
              </div>
            </div>

            {/* Studio Location Note */}
            <div className="p-4 rounded-xl bg-white border border-[#d4af37]/30 shadow-sm flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <span className="font-semibold text-stone-900">Studio Location: </span>
                {location.shortAddress} (Landmark: {location.landmark})
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-[#d4af37]/60 text-[#8c6714] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
              >
                <span>View All Services</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e5c158] to-[#d4af37] text-black text-xs font-semibold tracking-wider uppercase hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300"
              >
                <span>Check Date Availability</span>
              </a>
            </div>

          </motion.div>

        </div>

        {/* 4 Stats Badges Grid */}
        <div className="about-stats-grid mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {about.badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="stat-badge p-6 sm:p-8 rounded-2xl bg-white border border-[#d4af37]/30 text-center hover:border-[#d4af37] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-light-gradient">
                <StatCounter value={badge.number} />
              </div>
              <div className="mt-2 text-xs sm:text-sm tracking-wider uppercase font-semibold text-stone-700">
                {badge.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
