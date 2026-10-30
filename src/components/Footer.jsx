import { Sparkles, Calendar } from 'lucide-react';
import { siteData } from '../data/siteData';
import footerBgTexture from '../assets/optimized/footer-bg-texture.webp';

const Footer = () => {
  const { company, contact, navigation, services } = siteData;

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#070605] text-stone-300 border-t border-[#d4af37]/30 pt-16 pb-12 overflow-hidden">
      {/* Background Royal Benarasi Gold Zari Brocade Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={footerBgTexture}
          alt="Luxury Bridal Damask Zari Texture"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter-none scale-105"
        />
        {/* Soft luxury dark vignette and gradient overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070605] via-[#070605]/75 to-[#050404]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070605]/50 to-[#070605]/95" />
      </div>

      {/* Subtle top gold accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Studio Bio (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl font-bold text-white tracking-widest">
                {company.name}
              </span>
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
            </div>
            
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37] font-medium">
              By {company.artistName} • Estd. {company.established}
            </p>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-md">
              Kolkata's dedicated bridal couture and makeover studio, specializing in traditional Bengali bridal chandan art, contemporary reception glam, and commercial fashion artistry.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#e5c158] to-[#d4af37] text-black shadow-md hover:scale-105 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Bridal Slot</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-stone-400 hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 5 Services (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, '#services')}
                    className="text-stone-400 hover:text-[#d4af37] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Studio Address
            </h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              2/177A Shree Colony, Regent Estate, Kolkata - 700092
              <br />
              <span className="text-[#d4af37] text-[11px] font-medium">
                (Opposite Regent Estate Post Office)
              </span>
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-stone-300">
              <div>
                <span className="text-stone-400">Mobile: </span>
                <a href={`tel:${contact.phonePrimary}`} className="text-white hover:text-[#d4af37]">
                  +91 {contact.phonePrimary}
                </a>
                <span> / </span>
                <a href={`tel:${contact.phoneSecondary}`} className="text-white hover:text-[#d4af37]">
                  +91 {contact.phoneSecondary}
                </a>
              </div>
              <div>
                <span className="text-stone-400">Email: </span>
                <a href={`mailto:${contact.emailPrimary}`} className="text-white hover:text-[#d4af37]">
                  {contact.emailPrimary}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution & Copyright - Centered in Middle */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2.5 text-xs text-stone-400 text-center">
          <div>
            <span>© {new Date().getFullYear()} TANUS MAKEOVER • Artistry by Tanu Das • Kolkata</span>
          </div>

          {/* Mandatory Company Attribution */}
          <div className="flex items-center justify-center flex-wrap">
            <span>Website crafted & maintained by</span>
            <a
              href="https://www.teamdeoskolkata.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-red-700 transition-colors duration-300 ml-1"
            >
              Digital Exposure Online Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

