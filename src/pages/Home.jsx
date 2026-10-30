import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Process from '../components/Process';
import LocationContact from '../components/LocationContact';
import Footer from '../components/Footer';
import FloatingCallButton from '../components/FloatingCallButton';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#faf6f0] text-stone-900 selection:bg-[#d4af37] selection:text-black">
      {/* 5-Link Navigation Bar without calling number */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main id="main-content">
        {/* Fullscreen Cinematic Hero with 3-second auto-transition 3 photos */}
        <Hero />

        {/* About Tanu Das & Tanus Makeover (Estd 2019) - Warm Ivory Light */}
        <About />

        {/* 5 Couture Services - Deep Espresso Dark Contrast */}
        <Services />

        {/* Real Client Photo Gallery with Lightbox Box-Screen Modal - Warm Pearl Light */}
        <Gallery />

        {/* 4-Step Bridal Experience & Reviews - Soft Blush & Cream Light */}
        <Process />

        {/* Location (Regent Estate, Shree Colony) & Booking Inquiries - Deep Noir Dark Contrast */}
        <LocationContact />
      </main>

      {/* Floating Call & WhatsApp Action Buttons with Icons */}
      <FloatingCallButton />

      {/* Luxury Footer with mandatory attribution and NO 'all rights reserved' */}
      <Footer />
    </div>
  );
};

export default Home;
