import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Search, ChevronRight } from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Spaces from './pages/Spaces';
import Stay from './pages/Stay';
import Programmes from './pages/Programmes';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Occasions from './pages/Occasions';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Import Global Components
import Footer from './components/Footer';
import StarfieldBackground from './components/StarfieldBackground';

const searchIndex = [
  { title: "Home Page", category: "Navigation", path: "home", desc: "Welcome to Suprada Sanctuary & Riverfront Wellness" },
  { title: "About Us & Founders", category: "Navigation", path: "about", desc: "Discover Dr. Sunil Jayaraj, Dr. Prema Ramadas & our healing philosophy" },
  { title: "Naturopathy & Holistic Wellness", category: "Therapies", path: "home", desc: "Prakṛtireva bheṣajam — Nature's drug-free path to healing" },
  { title: "Iris & Facial Diagnosis", category: "Diagnostics", path: "home", desc: "Non-invasive organ analysis, iris mapping & facial markers" },
  { title: "Therapeutic Massages & Powders", category: "Therapies", path: "home", desc: "Powder Vibrio, Deep Tissue, Shiatsu, Reflexology, Swedish, Thai" },
  { title: "Hydrotherapy & Mud Baths", category: "Therapies", path: "home", desc: "Spinal Spray, Hip Bath, Jacuzzi, Full Body Mud Bath & Packs" },
  { title: "Yoga & Sunrise Breathwork", category: "Movement", path: "home", desc: "Asanas, Pranayama, Shatkarma Kriyas, Mudras & Bandhas" },
  { title: "Sound Healing & Om Bowls", category: "Vibrational Medicine", path: "home", desc: "Tibetan singing bowls, Gong acoustic resonance, Flute therapy" },
  { title: "Satwik Farm-to-Table Nutrition", category: "Nutrition", path: "home", desc: "Organic vegetarian meal plans, millet diets, detox juices & fasting" },
  { title: "Our Spaces & Sanctuaries", category: "Navigation", path: "spaces", desc: "Explore Swasthya, Sauhithya, Samiksha, Sukhada & Goshala" },
  { title: "Stay & Eco Cottages", category: "Sanctuaries", path: "stay", desc: "Guha, Samprapti, Subhiksha cottages & private sit-out verandas" },
  { title: "Programmes & Packages", category: "Navigation", path: "programmes", desc: "2-Day Weekend Reset, 7-Day Renewal & 21-Day Chronic Recovery" },
  { title: "Gallery & Photo Tour", category: "Navigation", path: "gallery", desc: "Explore riverfront views, cottage interiors & treatment spaces" },
  { title: "Blog & Healing Journal", category: "Navigation", path: "blog", desc: "Articles on drugless health, iris diagnosis & naturopathic wisdom" },
  { title: "Occasions & Events", category: "Navigation", path: "occasions", desc: "Weddings, anniversaries, family reunions & quiet retreats" },
  { title: "Careers & Opportunities", category: "Navigation", path: "careers", desc: "Join our team of doctors, therapists, hospitality & wellness leads" },
  { title: "Contact Us & Directions", category: "Navigation", path: "contact", desc: "Get in touch, location map by Suvarnamukhi river & booking" }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToPage = (pathname) => pathname.replace(/^\//, '') || 'home';

  const [currentPage, setCurrentPage] = useState(() => pathToPage(location.pathname));

  useEffect(() => {
    setCurrentPage(pathToPage(location.pathname));
  }, [location.pathname]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();
  const lenisRef = useRef(null);

  const [scrollYPos, setScrollYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollYPos(scrollPos);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard listener for Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll init
  useEffect(() => {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9, 
        touchMultiplier: 1.5,
        infinite: false,
      });
      lenisRef.current = lenis;
      window.lenis = lenis;

      let rafId;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
    setScrollYPos(0);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'spaces', label: 'Our Spaces' },
    { id: 'stay', label: 'Stay' },
    { id: 'programmes', label: 'Programmes' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'occasions', label: 'Occasions' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <StarfieldBackground />
      <div className="app-container" style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', color: 'var(--raisin-black)', fontFamily: 'var(--font-body)', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
        
        {/* ========================================================================= */}
        {/* --- UNIVERSAL STATIC TRANSPARENT HEADER NAVBAR --- */}
        {/* ========================================================================= */}
        <nav 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 99999,
            padding: isMobile ? '0.75rem 1.25rem' : '1rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: scrollYPos > 50 ? 'rgba(28, 20, 16, 0.88)' : 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: scrollYPos > 50 ? '1px solid rgba(220, 160, 50, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: scrollYPos > 50 ? '0 10px 30px rgba(0,0,0,0.4)' : 'none'
          }}
        >
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => handlePageChange('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Logo" 
              style={{ height: isMobile ? '36px' : '44px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} 
            />
            <img 
              src="/assets/extracted/suprada-wellness.svg" 
              alt="Suprada Wellness" 
              style={{ height: isMobile ? '22px' : '30px', filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} 
            />
          </div>

          {/* Center/Right Navigation Links (Desktop) */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              {menuItems.map((item) => (
                <span
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  style={{
                    cursor: 'pointer',
                    color: currentPage === item.id ? 'var(--harvest-gold)' : 'rgba(255, 255, 255, 0.92)',
                    fontWeight: currentPage === item.id ? 800 : 500,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  className="hover-gold"
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}

          {/* Right Actions: Search Bar + Book Now + Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            {/* Search Bar Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.9rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '20px',
                color: '#ffffff',
                fontSize: '0.78rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Search size={14} style={{ color: 'var(--harvest-gold)' }} />
              {!isMobile && <span>Search</span>}
              {!isMobile && <span style={{ fontSize: '0.65rem', opacity: 0.6, backgroundColor: 'rgba(255,255,255,0.18)', padding: '1px 5px', borderRadius: '4px' }}>⌘K</span>}
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => handlePageChange('contact')}
              style={{
                padding: '0.45rem 1rem',
                backgroundColor: 'var(--harvest-gold)',
                color: '#632633',
                fontWeight: 800,
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220, 160, 50, 0.4)',
                transition: 'all 0.3s ease'
              }}
              className="hide-mobile"
            >
              Book Now
            </button>

            {/* Mobile Drawer Trigger */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  backgroundColor: 'var(--harvest-gold)',
                  color: '#632633',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.4rem 0.7rem',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                MENU
              </button>
            )}
          </div>
        </nav>

        {/* Global Search Overlay Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 10, 8, 0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 9999999,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '6vh',
                paddingLeft: '1rem',
                paddingRight: '1rem'
              }}
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  backgroundColor: '#1c1410',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(220, 160, 50, 0.4)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Search Input Header */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '1rem' }}>
                  <Search size={22} style={{ color: 'var(--harvest-gold)', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search therapies, spaces, programmes, stay, about..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-body)'
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Filtered Search Results */}
                <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}>
                  {(() => {
                    const filtered = searchIndex.filter(item => 
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.category.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filtered.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(255,255,255,0.6)' }}>
                          <p>No results found for "{searchQuery}"</p>
                        </div>
                      );
                    }

                    return filtered.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          handlePageChange(item.path);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        style={{
                          padding: '1rem 1.2rem',
                          borderRadius: '14px',
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          marginBottom: '0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.68rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                            {item.category}
                          </span>
                          <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: 0, fontWeight: 600 }}>{item.title}</h4>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', margin: '0.2rem 0 0 0' }}>{item.desc}</p>
                        </div>
                        <ChevronRight size={18} style={{ color: 'var(--harvest-gold)', flexShrink: 0 }} />
                      </div>
                    ));
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Full-screen Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: 0, left: 0, width: '100%',
                backgroundColor: 'var(--raisin-black)', zIndex: 9999999,
                display: 'flex', flexDirection: 'column', justifyItems: 'center',
                justifyContent: 'center', alignItems: 'center', padding: '2rem'
              }}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  position: 'absolute', top: '25px', right: '30px',
                  background: 'none', border: 'none', color: 'var(--harvest-gold)',
                  cursor: 'pointer', zIndex: 1000,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <X size={28} />
              </button>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.8rem', alignItems: 'center', fontSize: '1.25rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                {menuItems.map((item) => (
                  <motion.li
                    whileHover={{ scale: 1.08, color: 'var(--harvest-gold)' }}
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    style={{
                      cursor: 'pointer',
                      color: currentPage === item.id ? 'var(--harvest-gold)' : 'var(--isabelline)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Page Routing Switcher — URL-based */}
        <div key={location.pathname} style={{ paddingTop: '80px' }}>
          {currentPage === 'home'       && <Home        onNavigate={handlePageChange} />}
          {currentPage === 'about'      && <About       onNavigate={handlePageChange} />}
          {currentPage === 'spaces'     && <Spaces      onNavigate={handlePageChange} />}
          {currentPage === 'stay'       && <Stay        onNavigate={handlePageChange} />}
          {currentPage === 'programmes' && <Programmes  onNavigate={handlePageChange} />}
          {currentPage === 'gallery'    && <Gallery     onNavigate={handlePageChange} />}
          {currentPage === 'blog'       && <Blog        onNavigate={handlePageChange} />}
          {currentPage === 'occasions'  && <Occasions   onNavigate={handlePageChange} />}
          {currentPage === 'careers'    && <Careers     onNavigate={handlePageChange} />}
          {currentPage === 'contact'    && <Contact     onNavigate={handlePageChange} />}
        </div>

        {/* Global Footer */}
        <Footer onNavigate={handlePageChange} />

      </div>
    </>
  );
}

export default App;