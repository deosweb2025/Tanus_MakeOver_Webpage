import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import servicesHeaderTexture from '../assets/optimized/services-header-texture.webp';
import WhatsAppIcon from './WhatsAppIcon';

const Services = () => {
  const { services, contact } = siteData;

  const handleBookService = (serviceTitle) => {
    const message = encodeURIComponent(
      `Hi Tanu Das, I am interested in booking your ${serviceTitle} service at Tanus Makeover. Could you share date availability?`
    );
    window.open(`https://wa.me/91${contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section
      id="services"
      className="services-section relative py-20 sm:py-28 lg:py-36 bg-[#141210] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#e8b4b8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Dedicated Luxury Background Texture */}
        <div className="relative max-w-4xl mx-auto mb-16 sm:mb-20">
          {/* Antique Gold Zari Filigree & Mandala Ambient Texture Backdrop */}
          <div className="absolute inset-0 -top-6 -bottom-6 -left-4 -right-4 sm:-left-10 sm:-right-10 z-0 pointer-events-none rounded-3xl overflow-hidden">
            <img
              src={servicesHeaderTexture}
              alt="Services Luxury Heading Gold Zari Texture"
              className="w-full h-full object-cover object-center opacity-45 mix-blend-screen filter-none scale-105"
            />
            {/* Smooth Radial Vignette Mask so it blends seamlessly into the #141210 section background */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#141210]/60 to-[#141210]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141210] via-transparent to-[#141210]" />
          </div>

          {/* Foreground Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="services-header relative z-10 text-center max-w-3xl mx-auto py-4 sm:py-6 px-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917]/90 backdrop-blur-md border border-[#d4af37]/45 shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#f7e7ce] uppercase">
                COUTURE MAKEUP SERVICES
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Curated Elegance For Every Special Occasion
            </h2>
            <p className="mt-4 text-stone-200 text-sm sm:text-base font-light max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              From regal traditional Bengali weddings to high-fashion camera campaigns, each look is customized to your attire, skin undertone, and personal style.
            </p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 origin-center shadow-[0_0_10px_#d4af37]"
            />
          </motion.div>
        </div>

        {/* 5 Services Grid */}
        <div className="services-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`service-card group relative rounded-2xl overflow-hidden bg-[#1c1917] border border-[#d4af37]/25 hover:border-[#d4af37]/70 transition-all duration-500 flex flex-col shadow-2xl shadow-black/60 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Showcase - Clean, fully visible without dark fog or top clipping */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-72 sm:h-84 md:h-96' : 'h-72 sm:h-80'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Category & Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40 shadow-sm">
                      {service.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-[#d4af37] text-black shadow-sm">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Highlights List */}
                    <div className="mt-5 space-y-2.5 pt-4 border-t border-white/10">
                      {service.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span className="text-xs text-stone-300 font-light">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Book / Inquire */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleBookService(service.title)}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#d4af37] hover:text-white transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp Inquiry</span>
                    </button>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 hover:bg-[#d4af37] hover:text-black text-stone-200 border border-[#d4af37]/35 transition-all duration-300 shadow-sm"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Custom Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#1c1917] via-[#24201c] to-[#1c1917] border border-[#d4af37]/45 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
              Bespoke Bridal Packages
            </span>
            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Need a Combined Package for Haldi + Wedding + Reception?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              We offer exclusive bundled multi-event packages with complimentary skin consultation and jewelry setting.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#e5c158] to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
            >
              Get Custom Quote
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
