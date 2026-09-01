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
        {/* --- UNIVERSAL STATIC 100% TRANSPARENT HEADER NAVBAR --- */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* --- UNIVERSAL DYNAMIC LIGHT/DARK ADAPTIVE HEADER NAVBAR --- */}
        {/* ========================================================================= */}
        {(() => {
          const isLightHeader = currentPage !== 'home' || scrollYPos > 200;

          return (
            <nav 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 99999,
                padding: isMobile ? '0.8rem 1.2rem' : '1.1rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: scrollYPos > 200 
                  ? 'rgba(242, 236, 228, 0.94)' 
                  : 'transparent',
                backdropFilter: scrollYPos > 200 ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrollYPos > 200 ? 'blur(16px)' : 'none',
                boxShadow: scrollYPos > 200 ? '0 8px 30px rgba(40, 38, 37, 0.08)' : 'none',
                borderBottom: scrollYPos > 200 ? '1px solid rgba(94, 39, 53, 0.12)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Left: Brand Logo & Title */}
              <div 
                onClick={() => handlePageChange('home')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.9rem', 
                  cursor: 'pointer',
                  marginRight: isMobile ? '0' : '2rem',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/assets/extracted/logo.svg" 
                  alt="Suprada Logo" 
                  style={{
                    height: isMobile ? '36px' : '44px',
                    filter: isLightHeader
                      ? 'drop-shadow(0 2px 6px rgba(94, 39, 53, 0.15))'
                      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
                <img 
                  src="/assets/extracted/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  style={{
                    height: isMobile ? '22px' : '30px',
                    filter: isLightHeader
                      ? 'none'
                      : 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
              </div>

              {/* Center/Right Navigation Links (Desktop) */}
              {!isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'nowrap', marginRight: '3rem' }}>
                  {menuItems.map((item) => (
                    <span
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      style={{
                        cursor: 'pointer',
                        color: currentPage === item.id 
                          ? (isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)')
                          : (isLightHeader ? 'rgba(40, 38, 37, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                        fontWeight: currentPage === item.id ? 800 : 600,
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                        textShadow: isLightHeader ? 'none' : '0 2px 8px rgba(0,0,0,0.6)',
                        borderBottom: currentPage === item.id && isLightHeader ? '2px solid var(--wine)' : '2px solid transparent',
                        paddingBottom: '2px'
                      }}
                      className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Right Action: Search Bar & Mobile Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Search Bar Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem 0.95rem',
                    backgroundColor: isLightHeader ? 'rgba(94, 39, 53, 0.06)' : 'rgba(255, 255, 255, 0.12)',
                    border: isLightHeader ? '1px solid rgba(94, 39, 53, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    color: isLightHeader ? 'var(--raisin-black)' : 'rgba(255, 255, 255, 0.95)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isLightHeader ? '0 2px 8px rgba(94, 39, 53, 0.05)' : '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                  className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                  aria-label="Search"
                >
                  <Search size={14} style={{ color: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)' }} />
                  <span>Search</span>
                </button>

                {/* Mobile Drawer Trigger */}
                {isMobile && (
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    style={{
                      backgroundColor: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)',
                      color: isLightHeader ? '#ffffff' : '#632633',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 0.85rem',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}
                  >
                    MENU
                  </button>
                )}
              </div>
            </nav>
          );
        })()}

        {/* Global Search Overlay Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="search-modal-backdrop"
              style={{
                position: 'fixed',
                inset: 0,
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
                className="search-modal-card"
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Search Input Header */}
                <div className="search-modal-header" style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', gap: '1rem' }}>
                  <Search size={22} style={{ color: 'var(--wine)', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search therapies, spaces, programmes, stay, about..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="search-input-field"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="search-modal-close-btn"
                    style={{ border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Filtered Search Results */}
                <div className="custom-light-scrollbar" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}>
                  {(() => {
                    const filtered = searchIndex.filter(item => 
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.category.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filtered.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(40, 38, 37, 0.6)' }}>
                          <p style={{ fontSize: '1rem', fontWeight: 500 }}>No results found for "{searchQuery}"</p>
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
                        className="search-result-item"
                        style={{
                          padding: '1rem 1.25rem',
                          borderRadius: '16px',
                          marginBottom: '0.65rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                            {item.category}
                          </span>
                          <h4 style={{ color: 'var(--raisin-black)', fontSize: '1.08rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{item.title}</h4>
                          <p style={{ color: 'rgba(40, 38, 37, 0.72)', fontSize: '0.84rem', margin: '0.25rem 0 0 0', lineHeight: 1.45 }}>{item.desc}</p>
                        </div>
                        <ChevronRight size={18} style={{ color: 'var(--wine)', flexShrink: 0, marginLeft: '1rem' }} />
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
        <div key={location.pathname} style={{ paddingTop: '0px' }}>
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