import { motion } from 'framer-motion';
import { Sparkles, Palette, Droplets, Crown, Gem, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

const stepIcons = [Palette, Droplets, Crown, Gem];

const Process = () => {
  const { process, testimonials, faqs } = siteData;

  return (
    <section
      id="process"
      className="process-section relative py-20 sm:py-28 lg:py-36 bg-[#f5ede4] text-stone-800 overflow-hidden"
    >
      {/* Soft Ambient Gold & Rose Glow Orbs in Background */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#e8b4b8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c6714] uppercase">
              THE BRIDAL EXPERIENCE
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            How We Perfect Your Special Day
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base font-light max-w-xl mx-auto">
            From initial concept to your final walk down the aisle, our seamless 4-step ritual guarantees peace of mind and photographic perfection.
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 origin-center"
          />
        </motion.div>

        {/* 4 Process Steps with Animated Glowing Border Beam & Luxury Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {process.map((item, index) => {
            const Icon = stepIcons[index] || Sparkles;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="relative group h-full"
              >
                {/* Connecting arrow indicator between cards on desktop */}
                {index < process.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center text-[#d4af37]/60 pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                {/* Animated Glowing Card Perimeter with Border Beam */}
                <div className="relative p-[1.5px] rounded-3xl overflow-hidden h-full shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)] group-hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.35)] transition-all duration-500 group-hover:-translate-y-2 bg-[#d4af37]/25">
                  {/* Rotating Conic Gradient Border Beam Animation */}
                  <div
                    className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#c59b27_320deg,#f7e7ce_345deg,#ffffff_360deg)] animate-border-beam opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ animationDuration: `${5 + index * 0.8}s` }}
                  />

                  {/* Soft ambient inner gold glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  {/* Inner Card Content */}
                  <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-gradient-to-b from-white via-[#fdfbf9] to-white p-7 sm:p-8 flex flex-col justify-between z-10">
                    {/* Watermark Step Number in Background */}
                    <span className="absolute -top-3 right-4 font-serif-luxury text-7xl sm:text-8xl font-black text-[#d4af37]/[0.08] select-none pointer-events-none group-hover:text-[#d4af37]/[0.16] transition-colors duration-500">
                      {item.step}
                    </span>

                    <div>
                      {/* Step Header Badge & Icon */}
                      <div className="flex items-center justify-between mb-5 relative z-10">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#fbf7f0] to-[#f4ebd9] border border-[#d4af37]/40 shadow-xs">
                          <span className="text-[10px] tracking-[0.22em] font-bold text-[#8c6714] uppercase">
                            PHASE {item.step}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-50 to-[#faebd7] border border-[#d4af37]/40 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#d4af37] transition-all duration-300">
                          <Icon className="w-5 h-5 text-[#8c6714] group-hover:text-[#b8860b] transition-colors" />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1c1917] group-hover:text-[#8c6714] transition-colors duration-300 leading-snug mb-3 relative z-10">
                        {item.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed relative z-10">
                        {item.description}
                      </p>
                    </div>

                    {/* Step Highlight Footer */}
                    <div className="mt-6 pt-4 border-t border-amber-900/10 flex items-center gap-2 text-[11px] text-[#8c6714] font-medium relative z-10">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0" />
                      <span className="line-clamp-1">{item.highlight}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Quote Marquee - Scrolling Right to Left */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#8c6714] font-semibold">
              KIND WORDS FROM OUR BRIDES
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1c1917] mt-2">
              Unforgettable Memories & Radiant Smiles
            </h3>
            <p className="text-xs text-stone-500 mt-2 font-light">
              Hover or touch any card to pause and read
            </p>
          </motion.div>

          {/* Infinite Marquee Track Scrolling Right to Left */}
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden py-4">
            {/* Left and Right Luxury Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f5ede4] via-[#f5ede4]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f5ede4] via-[#f5ede4]/90 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-rtl flex gap-6 sm:gap-8 px-4">
              {[...testimonials, ...testimonials].map((testi, i) => (
                <div
                  key={i}
                  className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 p-6 sm:p-8 rounded-2xl bg-white border border-[#d4af37]/30 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#d4af37] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                      {[...Array(testi.rating)].map((_, rIdx) => (
                        <span key={rIdx} className="text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 font-light italic leading-relaxed">
                      "{testi.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200">
                    <div className="font-serif-luxury text-base font-bold text-[#1c1917]">
                      {testi.name}
                    </div>
                    <div className="text-[11px] text-[#8c6714] font-medium mt-0.5">
                      {testi.event} • {testi.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#8c6714] font-semibold">
              NEED TO KNOW
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
              Frequently Asked Questions
            </h3>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => (
              <motion.div
                key={fIdx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: fIdx * 0.08 }}
                className="p-6 rounded-xl bg-white border border-[#d4af37]/25 shadow-sm space-y-2"
              >
                <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1c1917] flex items-center gap-2">
                  <span className="text-[#b8860b]">Q:</span> {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
