import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  CheckCircle,
  Navigation,
} from 'lucide-react';
import { siteData } from '../data/siteData';

const LocationContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    service: 'Bridal Makeup',
    venue: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { contact, location, company, services } = siteData;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare WhatsApp message
    const message = encodeURIComponent(
      `*New Bridal Inquiry - Tanus Makeover*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Event Date:* ${formData.eventDate || 'Not specified'}\n` +
      `*Service:* ${formData.service}\n` +
      `*Venue/City:* ${formData.venue || 'Kolkata'}\n` +
      `*Notes:* ${formData.notes || 'None'}\n\n` +
      `Sent via Tanus Makeover Website.`
    );

    window.open(`https://wa.me/91${contact.whatsapp}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="contact-section relative py-20 sm:py-28 lg:py-36 bg-[#141210] text-stone-200 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="contact-header text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917] border border-[#d4af37]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#f7e7ce] uppercase">
              STUDIO & RESERVATIONS
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Reserve Your Date With Tanu Das
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto">
            Bookings are taken on a first-come, first-served basis. Connect directly with our studio to check availability for your special celebration.
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 origin-center"
          />
        </motion.div>

        {/* 2-Column Grid: Contact Information & Interactive Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Studio Details, Landmark, Phone & Email */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
            className="contact-block lg:col-span-5 space-y-6"
          >
            {/* Primary Details Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1c1917] border border-[#d4af37]/25 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold">
                  MAIN STUDIO LOCATION
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  {company.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-medium">
                  By {company.artistName} • Estd. {company.established}
                </p>
              </div>

              {/* Address with Landmark */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    Full Studio Address
                  </div>
                  <p className="text-sm text-stone-200 mt-1 leading-snug font-light">
                    {location.fullAddress}
                  </p>
                  <div className="mt-2 inline-block px-2.5 py-1 rounded bg-[#d4af37]/15 border border-[#d4af37]/30 text-[11px] text-[#f7e7ce] font-medium">
                    Landmark: {location.landmark}
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    Call / Inquiries
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2">
                    <a
                      href={`tel:${contact.phonePrimary}`}
                      className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors"
                    >
                      +91 {contact.phonePrimary}
                    </a>
                    <span className="hidden sm:inline text-stone-500">•</span>
                    <a
                      href={`tel:${contact.phoneSecondary}`}
                      className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors"
                    >
                      +91 {contact.phoneSecondary}
                    </a>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Available for direct phone consultations
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    Instant WhatsApp
                  </div>
                  <a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>+91 {contact.whatsapp}</span>
                    <span className="text-xs">↗ (Click to chat)</span>
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="mt-1 flex flex-col gap-1">
                    <a
                      href={`mailto:${contact.emailPrimary}`}
                      className="text-sm text-stone-200 hover:text-[#d4af37] transition-colors"
                    >
                      {contact.emailPrimary}
                    </a>
                    <a
                      href={`mailto:${contact.emailSecondary}`}
                      className="text-sm text-stone-200 hover:text-[#d4af37] transition-colors"
                    >
                      {contact.emailSecondary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Studio Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                    Consultation Hours
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 font-light">
                    {location.hours}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Map Action Button */}
            <a
              href={location.mapDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-xl bg-[#1c1917] border border-[#d4af37]/30 hover:border-[#d4af37] flex items-center justify-between text-stone-200 hover:text-[#d4af37] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-[#d4af37] group-hover:rotate-45 transition-transform duration-300" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Open in Google Maps (Regent Estate)
                </span>
              </div>
              <span className="text-xs text-[#d4af37]">Directions ↗</span>
            </a>
          </motion.div>

          {/* Right Column: Interactive Booking Form & Live Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
            className="contact-block lg:col-span-7 space-y-6"
          >
            {/* Booking Form Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1c1917] border border-[#d4af37]/25 shadow-2xl">
              <div className="mb-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold">
                  DATE RESERVATION INQUIRY
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                  Check Slot Availability & Pricing
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Fill in your event details below to connect instantly with Tanu Das on WhatsApp.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Thank you! Your message has been prepared for WhatsApp dispatch. We will reply to your date inquiry shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Riya Mukherjee"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9062743223"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Desired Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-stone-900">
                          {s.title}
                        </option>
                      ))}
                      <option value="Bridal + Reception Package" className="bg-stone-900">
                        Bridal + Reception (Combined Package)
                      </option>
                      <option value="Haldi + Wedding + Reception (Complete Combo)" className="bg-stone-900">
                        Haldi + Wedding + Reception (Complete Combo)
                      </option>
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Wedding / Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. bride@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>

                  {/* Venue / City */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                      Venue Location / Area
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="e.g. Regent Estate, Kolkata / Venue Name"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-1.5">
                    Any Specific Requirements or Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your outfit style, time of event, or any questions..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#b8860b] shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-2xl h-64 sm:h-72 bg-stone-900 relative">
              <iframe
                title="Tanus Makeover Regent Estate Location"
                src="https://maps.google.com/maps?q=Regent+Estate+Post+Office+Kolkata+700092&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 left-2 bg-[#0c0a09]/90 px-3 py-1.5 rounded-lg border border-[#d4af37]/30 text-[11px] text-stone-200 backdrop-blur-sm pointer-events-none">
                📍 Opposite Regent Estate Post Office, Sree Colony, Kolkata - 700092
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LocationContact;
