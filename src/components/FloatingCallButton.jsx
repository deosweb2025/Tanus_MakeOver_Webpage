import { Phone } from 'lucide-react';
import { siteData } from '../data/siteData';
import WhatsAppIcon from './WhatsAppIcon';

const FloatingCallButton = () => {
  const { contact } = siteData;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* WhatsApp Floating Button */}
      <a
        href={contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Tanus Makeover"
        className="group relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
      >
        {/* Subtle Pulse Ping */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />

        {/* Desktop Tooltip Pill */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#0c0a09]/95 text-stone-200 text-xs font-medium tracking-wide whitespace-nowrap border border-[#25D366]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none">
          WhatsApp Tanu Das
        </span>
      </a>

      {/* Call Floating Button */}
      <a
        href={`tel:${contact.phonePrimary}`}
        aria-label="Call Tanus Makeover"
        className="group relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#b8860b] text-black shadow-2xl shadow-black/80 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
      >
        {/* Call Icon */}
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black relative z-10" />

        {/* Desktop Tooltip Pill */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#0c0a09]/95 text-stone-200 text-xs font-medium tracking-wide whitespace-nowrap border border-[#d4af37]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none">
          Call Now: +91 {contact.phonePrimary}
        </span>
      </a>

    </div>
  );
};

export default FloatingCallButton;

