import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Calendar } from 'lucide-react';
import { siteData } from '../data/siteData';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple scrollspy to highlight active section
      const sections = ['hero', 'about', 'services', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = siteData.navigation; // 5 links: Home, About, Services, Gallery, Contact

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0c0a09]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex flex-col text-left focus:outline-none"
            aria-label="Tanus Makeover Home"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury tracking-[0.22em] text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300">
                TANUS MAKEOVER
              </span>
              <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.28em] text-[#d4af37]/80 uppercase font-sans-clean font-medium">
              By Tanu Das • Estd. 2019
            </span>
          </a>

          {/* Desktop 5 Routing Links (No calling number included) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-[#d4af37]'
                      : 'text-stone-300 hover:text-white hover:bg-white/5 rounded-full'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#d4af37] shadow-[0_0_8px_#d4af37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action: Book Consultation Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-black bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#b8860b] rounded-full overflow-hidden shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-black bg-[#d4af37] rounded-full"
            >
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 rounded-lg bg-white/5 border border-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0c0a09]/95 backdrop-blur-xl border-b border-[#d4af37]/25 shadow-2xl"
          >
            <div className="px-6 py-6 space-y-3">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold mb-2">
                Navigation
              </div>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block py-2.5 px-3 text-base tracking-[0.15em] uppercase font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#d4af37] bg-[#d4af37]/10 font-bold'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="w-full py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-[#e5c158] to-[#d4af37] rounded-xl shadow-lg"
                >
                  Book Bridal Consultation
                </a>
                <p className="text-center text-[11px] text-stone-400">
                  Regent Estate & Baghajatin, Kolkata • Estd. 2019
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
