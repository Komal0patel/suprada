import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

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

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper: derive page key from URL pathname
  const pathToPage = (pathname) => pathname.replace(/^\//, '') || 'home';

  // ── currentPage is kept in STATE so it updates INSTANTLY on click ──────────
  // Initialise from URL so that a hard refresh lands on the right page.
  const [currentPage, setCurrentPage] = useState(() => pathToPage(location.pathname));

  // Keep state in sync when the URL changes via browser back / forward buttons.
  useEffect(() => {
    setCurrentPage(pathToPage(location.pathname));
  }, [location.pathname]);
  // ──────────────────────────────────────────────────────────────────────────

  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenisRef = useRef(null);

  // Spa audio player state
  const [audio] = useState(() => {
    const aud = new Audio("https://assets.mixkit.co/music/preview/mixkit-zen-meditation-1011.mp3");
    aud.loop = true;
    return aud;
  });
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio lifecycle cleanup on unmount
  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play blocked by browser. Interaction required first:", err);
      });
    }
  };

  const [scrollYPos, setScrollYPos] = useState(0);

  // Dynamic scroll listener for Navbar Visibility on stay and home hero sections
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
    if (currentPage === 'stay' || currentPage === 'home') {
      setIsNavVisible(latest > 250);
    } else {
      setIsNavVisible(true);
    }
  });

  // Attach native scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollYPos(scrollPos);
      if (currentPage === 'stay' || currentPage === 'home') {
        setIsNavVisible(scrollPos > 250);
      } else {
        setIsNavVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Initialize Lenis smooth momentum scroll on mount
  useEffect(() => {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.6, // slower for relaxed spa-like drift
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
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

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
    setScrollYPos(0);
  }, [currentPage]);

  const handlePageChange = (page) => {
    // 1. Update React state IMMEDIATELY → page renders right away
    setCurrentPage(page);
    // 2. Also push to the URL so the address bar updates & refresh works
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    setMobileMenuOpen(false);
    setIsNavVisible(false);
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

  const [isPillMenuExpanded, setIsPillMenuExpanded] = useState(false);

  return (
    <>
      <StarfieldBackground />
      <div className="app-container" style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', color: 'var(--raisin-black)', fontFamily: 'var(--font-body)', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
        
        {/* ========================================================================= */}
        {/* --- UNIVERSAL FLOATING HAMBURGER & EXPANDABLE PILL NAVBAR (ALL PAGES) --- */}
        {/* ========================================================================= */}
        <>
          {/* Top Left Floating Pill Logo */}
          {(() => {
            const isHeroLogo = scrollYPos < 100 && (currentPage === 'home' || currentPage === 'stay');
            return (
              <div 
                onClick={() => handlePageChange('home')}
                className="top-left-logo-pill"
                style={{ 
                  position: 'fixed', 
                  top: '15px', 
                  left: isHeroLogo ? '50%' : '25px', 
                  transform: isHeroLogo ? 'translateX(-50%)' : 'none',
                  zIndex: 999999, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: isHeroLogo ? 'transparent' : '#1c1410',
                  borderRadius: isHeroLogo ? '0px' : '50px',
                  border: isHeroLogo ? '1.5px solid transparent' : '1.5px solid rgba(220, 160, 50, 0.4)',
                  boxShadow: isHeroLogo ? 'none' : '0 12px 30px rgba(0,0,0,0.5)',
                  backdropFilter: isHeroLogo ? 'none' : 'blur(20px)',
                  padding: isHeroLogo ? '0px' : '0.55rem 1.4rem 0.55rem 0.9rem'
                }}
              >
                <img 
                  src="/assets/logo.svg" 
                  alt="Suprada Icon" 
                  style={{ 
                    height: isHeroLogo ? '42px' : '32px', 
                    transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }} 
                />
                <img 
                  src="/assets/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  className="hide-mobile" 
                  style={{ 
                    height: isHeroLogo ? '28px' : '22px', 
                    filter: 'brightness(0) invert(1)',
                    transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }} 
                />
              </div>
            );
          })()}

          {/* Top Right Floating Staggered 3-Line Hamburger & Expandable Pill */}
          <div style={{
            position: 'fixed',
            top: '15px',
            right: '25px',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <AnimatePresence mode="wait">
              {isPillMenuExpanded ? (
                /* EXPANDED FLOATING PILL NAVBAR */
                <motion.div
                  key="expanded-pill-nav"
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="pill-menu-wrapper"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <div className="pill-menu-inner" style={{
                    backgroundColor: '#1c1410',
                    borderRadius: '50px',
                    padding: '0.75rem 1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.4rem',
                    boxShadow: '0 18px 45px rgba(0,0,0,0.6)',
                    border: '1.5px solid rgba(220, 160, 50, 0.4)',
                    backdropFilter: 'blur(24px)',
                    overflowX: 'auto',
                    maxWidth: '82vw'
                  }}>
                    {menuItems.map((item) => (
                      <span
                        key={item.id}
                        onClick={() => {
                          handlePageChange(item.id);
                          setIsPillMenuExpanded(false);
                        }}
                        style={{
                          cursor: 'pointer',
                          color: currentPage === item.id ? 'var(--harvest-gold)' : '#ffffff',
                          fontWeight: currentPage === item.id ? 800 : 400,
                          fontSize: '0.96rem',
                          letterSpacing: '0.04em',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap'
                        }}
                        className="hover-tan"
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsPillMenuExpanded(false)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '16px',
                      backgroundColor: '#1c1410',
                      border: '1.5px solid rgba(220, 160, 50, 0.4)',
                      color: 'var(--harvest-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ) : (
                /* COLLAPSED STAGGERED 3-LINE HAMBURGER TRIGGER BUTTON */
                <motion.button
                  key="collapsed-hamburger-trigger"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      setMobileMenuOpen(true);
                    } else {
                      setIsPillMenuExpanded(true);
                    }
                  }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: '#1c1410',
                    border: '1.5px solid rgba(220, 160, 50, 0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5.5px',
                    cursor: 'pointer',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Staggered 3 Gold Horizontal Lines */}
                  <span style={{ width: '20px', height: '2.5px', backgroundColor: 'var(--harvest-gold)', borderRadius: '2px', marginLeft: '6px' }} />
                  <span style={{ width: '26px', height: '2.5px', backgroundColor: 'var(--harvest-gold)', borderRadius: '2px' }} />
                  <span style={{ width: '16px', height: '2.5px', backgroundColor: 'var(--harvest-gold)', borderRadius: '2px', marginRight: '8px' }} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </>

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
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
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
        <div key={location.pathname}>
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