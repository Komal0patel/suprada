import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Search, ChevronRight, ChevronDown, Download, Menu, Sparkles } from 'lucide-react';

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
import ComprehensiveCare from './pages/ComprehensiveCare';
import Naturopathy from './pages/Naturopathy';
import Wellness from './pages/Wellness';
import Nutrition from './pages/Nutrition';
import Activities from './pages/Activities';
import ProgrammeDetail from './pages/ProgrammeDetail';
import PillarDetail from './pages/PillarDetail';

// Import Global Components
import Footer from './components/Footer';
import StarfieldBackground from './components/StarfieldBackground';

const searchIndex = [
  { title: "Home Page", category: "Navigation", path: "home", desc: "Welcome to Suprada Sanctuary & Riverfront Wellness" },
  { title: "About Us & Founders", category: "Navigation", path: "about", desc: "Discover Mr. Sunil Jayaraj, Dr. Prema Ramadas, MD & our healing philosophy" },
  { title: "Naturopathy & Holistic Wellness", category: "Therapies", path: "home", desc: "Prakṛtireva bheṣajam — Nature's drug-free path to healing" },
  { title: "Iris & Facial Diagnosis", category: "Diagnostics", path: "home", desc: "Non-invasive organ analysis, iris mapping & facial markers" },
  { title: "Therapeutic Massages & Powders", category: "Therapies", path: "home", desc: "Powder Vibrio, Deep Tissue, Shiatsu, Reflexology, Swedish, Thai" },
  { title: "Hydrotherapy & Mud Baths", category: "Therapies", path: "home", desc: "Spinal Spray, Hip Bath, Jacuzzi, Full Body Mud Bath & Packs" },
  { title: "Yoga & Sunrise Breathwork", category: "Movement", path: "home", desc: "Asanas, Pranayama, Shatkarma Kriyas, Mudras & Bandhas" },
  { title: "Sound Healing & Om Bowls", category: "Energy Medicine", path: "home", desc: "Tibetan singing bowls, Gong acoustic resonance, Flute therapy" },
  { title: "Satwik Farm-to-Table Nutrition", category: "Nutrition", path: "home", desc: "Organic vegetarian meal plans, millet diets, detox juices & fasting" },
  { title: "Our Spaces & Sanctuaries", category: "Navigation", path: "spaces", desc: "Explore Swasthya, Sauhithya, Samiksha, Sukhada & Goshala" },
  { title: "Stay & Eco Cottages", category: "Sanctuaries", path: "spaces", desc: "Guha, Samprapti, Subhiksha cottages & private sit-out verandas" },
  { title: "Programmes & Packages", category: "Navigation", path: "programmes/packages", desc: "2-Day Weekend Reset, 7-Day Renewal & 21-Day Chronic Recovery" },
  { title: "Wellness & Healing Programmes", category: "Navigation", path: "programmes", desc: "Rooted in Nature, Our Approach, Discovery & Personalized Wellness Formula" },
  { title: "Gallery & Photo Tour", category: "Navigation", path: "gallery", desc: "Explore riverfront views, cottage interiors & treatment spaces" },
  { title: "Blog & Healing Journal", category: "Navigation", path: "blog", desc: "Articles on drugless health, iris diagnosis & naturopathic wisdom" },
  { title: "Occasions & Events", category: "Navigation", path: "occasions", desc: "Weddings, anniversaries, family reunions & quiet retreats" },
  { title: "Careers & Opportunities", category: "Navigation", path: "careers", desc: "Join our team of doctors, therapists, hospitality & wellness leads" },
  { title: "Contact Us & Directions", category: "Navigation", path: "contact", desc: "Get in touch, location map by Suvarnamukhi river & booking" },
  { title: "Comprehensive Clinical Spectrum", category: "Navigation", path: "comprehensivecare", desc: "Explore our specialized doctor-supervised clinical conditions" },
  { title: "Naturopathy & Holistic Wellness", category: "Navigation", path: "naturopathy", desc: "Explore our core drugless medical modalities & natural therapies" }
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
    const checkMobile = () => setIsMobile(window.innerWidth <= 1120);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showFloatingWidget, setShowFloatingWidget] = useState(true);

  // Programmes dropdown state
  const [programmesDropdownOpen, setProgrammesDropdownOpen] = useState(false);
  const [pillarsSubOpen, setPillarsSubOpen] = useState(false);
  const [mobileProgrammesOpen, setMobileProgrammesOpen] = useState(false);
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileProgrammesOpen(false);
    setMobilePillarsOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileProgrammesOpen(false);
    setMobilePillarsOpen(false);
    setMobileMenuOpen(true);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProgrammesDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProgrammesDropdownOpen(false);
      setPillarsSubOpen(false);
    }, 200);
  }, []);

  // Programme sub-page definitions
  const programmesDropdownItems = [
    {
      label: 'Pillars of Wellness',
      hasChildren: true,
      children: [
        { id: 'programmes/naturopathy', label: 'Naturopathy' },
        { id: 'programmes/yoga-meditation', label: 'Yoga & Meditation' },
        { id: 'programmes/holistic-therapies', label: 'Holistic Therapies' },
        { id: 'programmes/nutrition-lifestyle', label: 'Nutrition & Lifestyle' },
        { id: 'programmes/mental-emotional', label: 'Mental & Emotional Well-Being' },
        { id: 'programmes/detox-cleansing', label: 'Detox & Cleansing' },
        { id: 'programmes/physiotherapy', label: 'Physiotherapy' },
        { id: 'programmes/ayurveda', label: 'Ayurveda' }
      ]
    },
    { id: 'programmes/packages', label: 'Programs & Packages' },
    { id: 'programmes/wellness', label: 'Wellness Programs' },
    { id: 'programmes/nutrition', label: 'Nutrition' },
    { id: 'programmes/activities', label: 'Activities' },
    { id: 'comprehensivecare', label: 'Comprehensive Care' },
    { id: 'naturopathy', label: 'Naturopathy' }
  ];

  const { scrollY } = useScroll();
  const lenisRef = useRef(null);

  const [scrollYPos, setScrollYPos] = useState(0);
  const scrollPositionsRef = useRef({});
  const isBackNavRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isBackNavRef.current = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    const savedPos = scrollPositionsRef.current[currentPage];
    if (isBackNavRef.current && savedPos !== undefined) {
      window.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(savedPos, { immediate: true });
      }
      setScrollYPos(savedPos);
      isBackNavRef.current = false;
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      setScrollYPos(0);
    }
  }, [currentPage]);

  const handlePageChange = (page, extra) => {
    scrollPositionsRef.current[currentPage] = window.scrollY || document.documentElement.scrollTop || 0;
    let targetPage = page;
    if (page === 'programmes' && extra?.progId) {
      targetPage = 'programmes/packages';
    }
    setCurrentPage(targetPage);
    let path = targetPage === 'home' ? '/' : `/${targetPage}`;
    if (extra?.progId) {
      path += `?prog=${extra.progId}`;
    }
    navigate(path);
    closeMobileMenu();
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'spaces', label: 'Our Spaces' },
    { id: 'programmes', label: 'Programmes' },
    { id: 'launching-soon', label: 'Launching Soon', highlighted: true },
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
          const isScrolled = scrollYPos > 200;
          const isDarkHeroPage = currentPage === 'home' || currentPage === 'contact' || currentPage === 'comprehensivecare' || currentPage === 'naturopathy';
          const isLightHeader = !isDarkHeroPage && !isScrolled;

          return (
            <nav 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                zIndex: 99999,
                padding: isMobile ? '0.5rem 0.6rem' : '0.85rem 1.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isScrolled 
                  ? 'rgba(94, 39, 53, 0.95)' 
                  : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
                boxShadow: isScrolled ? '0 8px 24px rgba(94, 39, 53, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Left: Brand Logo & Title */}
              <div 
                onClick={() => handlePageChange('home')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: isMobile ? '0.3rem' : '0.75rem', 
                  cursor: 'pointer',
                  marginRight: isMobile ? '0' : 'clamp(2.2rem, 3.5vw, 4rem)',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/assets/extracted/logo.svg" 
                  alt="Suprada Logo" 
                  style={{
                    height: isMobile ? '34px' : '48px',
                    filter: isLightHeader
                      ? 'drop-shadow(0 2px 6px rgba(94, 39, 53, 0.15))'
                      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
                <img 
                  src="/assets/extracted/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  style={{
                    height: isMobile ? '19px' : '30px',
                    filter: isLightHeader
                      ? 'brightness(0.22)'
                      : 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
              </div>

              {/* Center/Right Navigation Links (Desktop) */}
              {!isMobile && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'clamp(0.5rem, 0.9vw, 1.1rem)', 
                  flexWrap: 'nowrap', 
                  marginRight: '1.5rem',
                  flexShrink: 1
                }}>
                  {menuItems.map((item) => {
                    if (item.highlighted) {
                      return (
                        <button
                          key={item.id}
                          onClick={() => setIsComingSoonOpen(true)}
                          className="nav-launching-soon-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.26rem 0.8rem',
                            borderRadius: '30px',
                            backgroundColor: 'var(--antique-white)',
                            color: 'var(--wine)',
                            border: '1.2px solid rgba(255, 255, 255, 0.6)',
                            fontWeight: 800,
                            fontSize: '0.67rem',
                            letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)',
                            transition: 'all 0.3s ease',
                            animation: 'launchingPulseGlow 2.5s infinite ease-in-out',
                            margin: '0 0.15rem'
                          }}
                        >
                          <span className="live-dot" style={{ backgroundColor: '#B85645', width: '5px', height: '5px', boxShadow: '0 0 5px rgba(184, 86, 69, 0.5)' }} />
                          <span>{item.label}</span>
                          <span style={{ fontSize: '0.75rem' }}>✨</span>
                        </button>
                      );
                    }

                    if (item.id === 'programmes') {
                      const isProgActive = currentPage === 'programmes' || currentPage.startsWith('programmes/');
                      return (
                        <div
                          key={item.id}
                          className="nav-dropdown-wrapper"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                          style={{ position: 'relative' }}
                        >
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setProgrammesDropdownOpen(prev => !prev);
                            }}
                            style={{
                              cursor: 'pointer',
                              color: isProgActive 
                                ? (isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)')
                                : (isLightHeader ? 'rgba(40, 38, 37, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                              fontWeight: isProgActive ? 800 : 600,
                              fontSize: '0.75rem',
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              transition: 'all 0.3s ease',
                              whiteSpace: 'nowrap',
                              textShadow: isLightHeader ? 'none' : '0 2px 8px rgba(0,0,0,0.6)',
                              borderBottom: isProgActive && isLightHeader ? '2px solid var(--wine)' : '2px solid transparent',
                              paddingBottom: '2px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem'
                            }}
                            className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                          >
                            {item.label}
                            <motion.span
                              animate={{ rotate: programmesDropdownOpen ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{ display: 'inline-flex', lineHeight: 1 }}
                            >
                              <ChevronDown size={12} />
                            </motion.span>
                          </span>

                          {/* === PROGRAMMES MEGA-MENU DROPDOWN === */}
                          <AnimatePresence>
                            {programmesDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scaleY: 0.95 }}
                                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                exit={{ opacity: 0, y: 5, scaleY: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="nav-mega-dropdown"
                                style={{
                                  position: 'absolute',
                                  top: 'calc(100% + 10px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  transformOrigin: 'top center',
                                  zIndex: 100000
                                }}
                              >
                                {/* Level 1: Main dropdown panel */}
                                <div className="nav-dropdown-panel">
                                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--harvest-gold), transparent)', borderRadius: '2px' }} />
                                  
                                  {programmesDropdownItems.map((dropItem, idx) => (
                                    <motion.div
                                      key={dropItem.label}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                                      className={`nav-dropdown-item ${pillarsSubOpen && dropItem.hasChildren ? 'active' : ''}`}
                                      onMouseEnter={() => dropItem.hasChildren && setPillarsSubOpen(true)}
                                      onClick={() => {
                                        if (!dropItem.hasChildren) {
                                          handlePageChange(dropItem.id);
                                          setProgrammesDropdownOpen(false);
                                        }
                                      }}
                                      style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <span>{dropItem.label}</span>
                                      {dropItem.hasChildren && (
                                        <motion.span
                                          animate={{ x: pillarsSubOpen ? 3 : 0 }}
                                          transition={{ duration: 0.2 }}
                                          style={{ color: 'var(--harvest-gold)', display: 'inline-flex', fontSize: '0.75rem' }}
                                        >
                                          <ChevronRight size={13} />
                                        </motion.span>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Level 2: Pillars of Wellness flyout sub-panel */}
                                <AnimatePresence>
                                  {pillarsSubOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -12, scaleX: 0.95 }}
                                      animate={{ opacity: 1, x: 0, scaleX: 1 }}
                                      exit={{ opacity: 0, x: -8, scaleX: 0.97 }}
                                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                      className="nav-dropdown-subpanel"
                                      onMouseEnter={() => setPillarsSubOpen(true)}
                                      onMouseLeave={() => setPillarsSubOpen(false)}
                                    >
                                      {programmesDropdownItems[0].children.map((sub, sIdx) => (
                                        <motion.div
                                          key={sub.id}
                                          initial={{ opacity: 0, x: -8 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.18, delay: sIdx * 0.025 }}
                                          className="nav-dropdown-item nav-dropdown-subitem"
                                          onClick={() => {
                                            handlePageChange(sub.id);
                                            setProgrammesDropdownOpen(false);
                                            setPillarsSubOpen(false);
                                          }}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          <span>{sub.label}</span>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <span
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        style={{
                          cursor: 'pointer',
                          color: currentPage === item.id 
                            ? (isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)')
                            : (isLightHeader ? 'rgba(40, 38, 37, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                          fontWeight: currentPage === item.id ? 800 : 600,
                          fontSize: '0.75rem',
                          letterSpacing: '0.05em',
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
                    );
                  })}
                </div>
              )}

              {/* Right Action: Search Bar & Mobile Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.2rem' : '0.5rem', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Mobile Highlighted Launching Soon Button */}
                {isMobile && (
                  <button
                    onClick={() => setIsComingSoonOpen(true)}
                    className="nav-launching-soon-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.2rem 0.45rem',
                      borderRadius: '16px',
                      backgroundColor: 'var(--antique-white)',
                      color: 'var(--wine)',
                      border: '1.2px solid rgba(255, 255, 255, 0.6)',
                      fontWeight: 800,
                      fontSize: '0.54rem',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      animation: 'launchingPulseGlow 2.5s infinite ease-in-out'
                    }}
                  >
                    <span className="live-dot" style={{ backgroundColor: '#B85645', width: '4px', height: '4px', boxShadow: '0 0 4px rgba(184, 86, 69, 0.5)' }} />
                    <span>Launching Soon</span>
                    <span style={{ fontSize: '0.62rem' }}>✨</span>
                  </button>
                )}

                {/* Search Bar Button — Icon Only on Mobile */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: isMobile ? '0.25rem 0.35rem' : '0.35rem 0.8rem',
                    backgroundColor: isLightHeader ? 'rgba(94, 39, 53, 0.06)' : 'rgba(255, 255, 255, 0.12)',
                    border: isLightHeader ? '1px solid rgba(94, 39, 53, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    color: isLightHeader ? 'var(--raisin-black)' : 'rgba(255, 255, 255, 0.95)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.03em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    boxShadow: isLightHeader ? '0 2px 8px rgba(94, 39, 53, 0.05)' : '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                  className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                  aria-label="Search"
                >
                  <Search size={13} style={{ color: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)' }} />
                  {!isMobile && <span>Search</span>}
                </button>

                {/* Mobile Drawer Trigger */}
                {isMobile && (
                  <button
                    onClick={openMobileMenu}
                    style={{
                      backgroundColor: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)',
                      color: isLightHeader ? '#ffffff' : '#632633',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.32rem 0.52rem',
                      fontWeight: 800,
                      fontSize: '0.68rem',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <Menu size={13} /> MENU
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

        {/* Mobile Navigation Full-screen Drawer (Fully Responsive & Scrollable) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100vh',
                maxHeight: '100dvh',
                backgroundColor: 'rgba(25, 12, 17, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 9999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 'clamp(4.2rem, 8vh, 5.5rem) 1.2rem clamp(2rem, 4vh, 3.5rem) 1.2rem',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                boxSizing: 'border-box'
              }}
            >
              {/* Fixed Close Button Top Right */}
              <button
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                style={{
                  position: 'fixed',
                  top: '1.2rem',
                  right: '1.2rem',
                  background: 'rgba(234, 169, 54, 0.15)',
                  border: '1px solid rgba(234, 169, 54, 0.3)',
                  color: 'var(--harvest-gold)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  cursor: 'pointer',
                  zIndex: 10000000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <X size={22} />
              </button>

              {/* Brand Logo Header inside Drawer */}
              <div 
                onClick={() => {
                  handlePageChange('home');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1.8rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/assets/extracted/logo.svg" 
                  alt="Suprada" 
                  style={{ height: '38px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} 
                />
                <img 
                  src="/assets/extracted/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  style={{ height: '22px', filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} 
                />
              </div>

              {/* Menu List */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700
              }}>
                {menuItems.map((item) => {
                  if (item.highlighted) {
                    return (
                      <motion.li
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={item.id}
                        onClick={() => {
                          closeMobileMenu();
                          setIsComingSoonOpen(true);
                        }}
                        style={{
                          cursor: 'pointer',
                          color: 'var(--wine)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.35rem 1rem',
                          borderRadius: '30px',
                          border: '1.2px solid rgba(255, 255, 255, 0.6)',
                          backgroundColor: 'var(--antique-white)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                          margin: '0.2rem 0'
                        }}
                      >
                        <span className="live-dot" style={{ backgroundColor: '#B85645', width: '5px', height: '5px', boxShadow: '0 0 5px rgba(184, 86, 69, 0.5)' }} />
                        <span>{item.label}</span>
                        <span style={{ fontSize: '0.85rem' }}>✨</span>
                      </motion.li>
                    );
                  }

                  if (item.id === 'programmes') {
                    const isProgActive = currentPage === 'programmes' || currentPage.startsWith('programmes/') || currentPage === 'nutrition' || currentPage === 'new-nutrition' || currentPage === 'comprehensivecare' || currentPage === 'naturopathy';
                    return (
                      <li key={item.id} style={{ width: '100%', textAlign: 'center' }}>
                        <div
                          onClick={() => setMobileProgrammesOpen(!mobileProgrammesOpen)}
                          style={{
                            cursor: 'pointer',
                            color: isProgActive ? 'var(--harvest-gold)' : 'var(--isabelline)',
                            padding: '0.45rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: mobileProgrammesOpen ? 'rgba(234, 169, 54, 0.14)' : 'transparent',
                            border: mobileProgrammesOpen ? '1px solid rgba(234, 169, 54, 0.35)' : '1px solid transparent',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          <span>{item.label}</span>
                          <motion.span
                            animate={{ rotate: mobileProgrammesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline-flex' }}
                          >
                            <ChevronDown size={16} style={{ color: 'var(--harvest-gold)' }} />
                          </motion.span>
                        </div>

                        <AnimatePresence>
                          {mobileProgrammesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden', marginTop: '0.5rem' }}
                            >
                              <div style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                borderRadius: '14px',
                                padding: '0.9rem 0.8rem',
                                border: '1px solid rgba(234, 169, 54, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                              }}>
                                {/* Direct Programmes Category Links */}
                                <div style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(2, 1fr)',
                                  gap: '0.45rem'
                                }}>
                                  {programmesDropdownItems.slice(1).map((dropItem) => {
                                    const isSubActive = currentPage === dropItem.id || (dropItem.id === 'programmes/nutrition' && (currentPage === 'nutrition' || currentPage === 'new-nutrition'));
                                    return (
                                      <motion.div
                                        key={dropItem.id}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePageChange(dropItem.id);
                                        }}
                                        style={{
                                          fontSize: '0.74rem',
                                          color: isSubActive ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                                          backgroundColor: isSubActive ? 'var(--wine)' : 'rgba(234, 169, 54, 0.1)',
                                          border: isSubActive ? '1px solid var(--harvest-gold)' : '1px solid rgba(234, 169, 54, 0.25)',
                                          borderRadius: '8px',
                                          padding: '0.55rem 0.35rem',
                                          cursor: 'pointer',
                                          fontWeight: 700,
                                          letterSpacing: '0.04em',
                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                          boxShadow: isSubActive ? '0 2px 8px rgba(94, 39, 53, 0.5)' : 'none',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          minHeight: '38px'
                                        }}
                                      >
                                        {dropItem.label}
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Pillars of Wellness nested accordion */}
                                <div style={{ borderTop: '1px solid rgba(234, 169, 54, 0.18)', paddingTop: '0.65rem' }}>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMobilePillarsOpen(!mobilePillarsOpen);
                                    }}
                                    style={{
                                      fontSize: '0.76rem',
                                      color: 'var(--harvest-gold)',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      letterSpacing: '0.08em',
                                      padding: '0.45rem 0.75rem',
                                      borderRadius: '8px',
                                      backgroundColor: 'rgba(234, 169, 54, 0.12)',
                                      border: '1px solid rgba(234, 169, 54, 0.25)'
                                    }}
                                  >
                                    <span>✦ 8 Pillars of Wellness</span>
                                    <motion.span
                                      animate={{ rotate: mobilePillarsOpen ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ display: 'inline-flex' }}
                                    >
                                      <ChevronDown size={14} />
                                    </motion.span>
                                  </div>

                                  <AnimatePresence>
                                    {mobilePillarsOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                          display: 'grid',
                                          gridTemplateColumns: 'repeat(2, 1fr)',
                                          gap: '0.4rem',
                                          marginTop: '0.55rem'
                                        }}
                                      >
                                        {programmesDropdownItems[0].children.map((sub) => {
                                          const isPillarActive = currentPage === sub.id;
                                          return (
                                            <motion.div
                                              key={sub.id}
                                              whileTap={{ scale: 0.96 }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handlePageChange(sub.id);
                                              }}
                                              style={{
                                                fontSize: '0.68rem',
                                                color: isPillarActive ? '#ffffff' : 'var(--tan)',
                                                backgroundColor: isPillarActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.05)',
                                                border: isPillarActive ? '1px solid var(--harvest-gold)' : '1px solid rgba(234, 169, 54, 0.2)',
                                                borderRadius: '8px',
                                                padding: '0.45rem 0.25rem',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                letterSpacing: '0.02em',
                                                textAlign: 'center',
                                                textTransform: 'none',
                                                fontFamily: 'var(--font-body)',
                                                boxShadow: isPillarActive ? '0 2px 8px rgba(94, 39, 53, 0.4)' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minHeight: '34px'
                                              }}
                                            >
                                              {sub.label}
                                            </motion.div>
                                          );
                                        })}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <motion.li
                      whileHover={{ scale: 1.05, color: 'var(--harvest-gold)' }}
                      whileTap={{ scale: 0.95 }}
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      style={{
                        cursor: 'pointer',
                        color: currentPage === item.id ? 'var(--harvest-gold)' : 'var(--isabelline)',
                        transition: 'color 0.2s ease',
                        padding: '0.35rem 0.6rem'
                      }}
                    >
                      {item.label}
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Drawer Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                marginTop: '2rem',
                width: '100%',
                maxWidth: '280px',
                alignItems: 'center',
                flexShrink: 0,
                paddingBottom: '1rem'
              }}>
                <a
                  href="/assets/Suprada_Wellness_Brochure.pdf"
                  download="Suprada_Wellness_Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.7rem 1.2rem',
                    backgroundColor: 'rgba(234, 169, 54, 0.15)',
                    border: '1.5px solid var(--harvest-gold)',
                    borderRadius: '30px',
                    color: 'var(--harvest-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  <Download size={15} /> Download Brochure
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coming Soon Showcase Modal matching user design */}
        <AnimatePresence>
          {isComingSoonOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999999,
                backgroundColor: 'rgba(20, 10, 15, 0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setIsComingSoonOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 15, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '660px',
                  backgroundColor: '#FBF7F2',
                  color: 'var(--wine)',
                  borderRadius: '28px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.28)',
                  padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsComingSoonOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.2rem',
                    background: 'rgba(94, 39, 53, 0.06)',
                    border: 'none',
                    color: 'var(--wine)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Header Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '1.8rem' }}>
                  <img 
                    src="/assets/extracted/logo.svg" 
                    alt="Suprada Logo" 
                    style={{ height: '42px' }} 
                  />
                  <img 
                    src="/assets/extracted/suprada-wellness.svg" 
                    alt="Suprada Wellness" 
                    style={{ height: '24px', filter: 'brightness(0.22)' }} 
                  />
                </div>

                {/* Launching Soon Pill Badge */}
                <div 
                  style={{
                    display: 'inline-block',
                    border: '1px solid rgba(184, 125, 117, 0.45)',
                    borderRadius: '50px',
                    padding: '0.35rem 1.4rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: '#B87D75',
                    textTransform: 'uppercase',
                    marginBottom: '1.6rem',
                    backgroundColor: 'rgba(184, 125, 117, 0.06)'
                  }}
                >
                  LAUNCHING SOON
                </div>

                {/* Main Heading: Coming Soon */}
                <h1 
                  style={{ 
                    fontSize: isMobile ? '2.6rem' : '3.8rem', 
                    fontFamily: 'var(--font-heading)', 
                    color: 'var(--wine)', 
                    margin: '0 0 1rem 0', 
                    fontWeight: 400, 
                    lineHeight: 1.05 
                  }}
                >
                  Coming <em style={{ fontStyle: 'italic', color: '#B87D75', fontWeight: 400, fontFamily: 'serif' }}>Soon</em>
                </h1>

                {/* Decorative Separator Line with Diamond */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.2rem auto 1.6rem auto', maxWidth: '220px' }}>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(94, 39, 53, 0.18)' }} />
                  <span style={{ color: '#B87D75', fontSize: '0.75rem' }}>♢</span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(94, 39, 53, 0.18)' }} />
                </div>

                {/* Subheading */}
                <h3 
                  style={{ 
                    fontSize: isMobile ? '1.25rem' : '1.6rem', 
                    color: 'var(--wine)', 
                    fontFamily: 'var(--font-heading)', 
                    margin: '0 0 0.8rem 0', 
                    fontWeight: 500 
                  }}
                >
                  Holistic Wellness. Thoughtfully Curated.
                </h3>

                {/* Paragraph */}
                <p 
                  style={{ 
                    fontSize: '0.95rem', 
                    color: 'rgba(40, 38, 37, 0.78)', 
                    lineHeight: 1.6, 
                    maxWidth: '520px', 
                    margin: '0 auto 2.2rem auto', 
                    fontWeight: 400 
                  }}
                >
                  Experience a new destination for preventive healthcare, holistic therapies, mindful living, and personalized wellness programmes.
                </p>

                {/* Email Input & Notify Me Form */}
                <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                  {waitlistSubmitted ? (
                    <div style={{ color: 'var(--wine)', fontWeight: 700, fontSize: '0.95rem', padding: '0.75rem', backgroundColor: 'rgba(94, 39, 53, 0.08)', borderRadius: '12px' }}>
                      ✦ Thank you! We will notify you as soon as we launch.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (waitlistEmail.trim()) {
                          setWaitlistSubmitted(true);
                        }
                      }}
                      style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '0.65rem' }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        required
                        style={{
                          flex: 1,
                          padding: '0.85rem 1.25rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)',
                          backgroundColor: '#ffffff',
                          color: 'var(--raisin-black)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxShadow: '0 2px 8px rgba(94, 39, 53, 0.04)'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          backgroundColor: 'var(--wine)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.85rem 1.6rem',
                          fontWeight: 600,
                          fontSize: '0.92rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Page Routing Switcher — URL-based */}
        <div key={location.pathname} style={{ paddingTop: '0px' }}>
          {currentPage === 'home'       && <Home        onNavigate={handlePageChange} />}
          {currentPage === 'about'      && <About       onNavigate={handlePageChange} />}
          {currentPage === 'spaces'     && <Spaces      onNavigate={handlePageChange} />}
          {currentPage === 'stay'       && <Stay        onNavigate={handlePageChange} />}
          {currentPage === 'programmes' && <Wellness    onNavigate={handlePageChange} />}
          {currentPage === 'gallery'    && <Gallery     onNavigate={handlePageChange} />}
          {currentPage === 'blog'       && <Blog        onNavigate={handlePageChange} />}
          {currentPage === 'occasions'  && <Occasions   onNavigate={handlePageChange} />}
          {currentPage === 'careers'    && <Careers     onNavigate={handlePageChange} />}
          {currentPage === 'contact'    && <Contact     onNavigate={handlePageChange} />}
          {currentPage === 'comprehensivecare' && <ComprehensiveCare onNavigate={handlePageChange} />}
          {currentPage === 'naturopathy' && <Naturopathy onNavigate={handlePageChange} />}

          {/* Programme & Pillars Sub-Pages */}
          {currentPage === 'programmes/packages'            && <Programmes onNavigate={handlePageChange} />}
          {currentPage === 'packages'                       && <Programmes onNavigate={handlePageChange} />}
          {currentPage === 'programmes/wellness'            && <Wellness onNavigate={handlePageChange} />}
          {currentPage === 'programmes/nutrition'           && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'nutrition'                      && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'new-nutrition'                  && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'programmes/activities'          && <Activities onNavigate={handlePageChange} />}
          
          {/* Pillars of Wellness Sub-Routes */}
          {currentPage === 'programmes/naturopathy'         && <PillarDetail pillarId="naturopathy" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/yoga-meditation'     && <PillarDetail pillarId="yoga-meditation" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/holistic-therapies'   && <PillarDetail pillarId="holistic-therapies" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/nutrition-lifestyle'  && <PillarDetail pillarId="nutrition-lifestyle" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/mental-emotional'    && <PillarDetail pillarId="mental-emotional" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/detox-cleansing'     && <PillarDetail pillarId="detox-cleansing" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/physiotherapy'       && <PillarDetail pillarId="physiotherapy" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/ayurveda'            && <PillarDetail pillarId="ayurveda" onNavigate={handlePageChange} />}

          {/* Program Package Sub-Routes */}
          {currentPage === 'programmes/weekend-reset'       && <ProgrammeDetail progId="weekend-reset" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/rejuvenation'        && <ProgrammeDetail progId="rejuvenation" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/holistic-wellness'   && <ProgrammeDetail progId="holistic-wellness" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/detox'               && <ProgrammeDetail progId="detox" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/advanced-healing'    && <ProgrammeDetail progId="advanced-healing" onNavigate={handlePageChange} />}
        </div>

        {/* Global Footer */}
        <Footer onNavigate={handlePageChange} />

        {/* Global Constant Floating Contact Actions (Invisible Container with Dismiss × Button & Compact Sizes) */}
        <AnimatePresence>
          {showFloatingWidget && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                bottom: isMobile ? '16px' : '24px',
                right: isMobile ? '14px' : '24px',
                zIndex: 999998,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0
              }}
            >
              {/* Dismiss / Cancel (×) Button */}
              <button
                onClick={() => setShowFloatingWidget(false)}
                aria-label="Dismiss floating contact shortcuts"
                title="Hide contact shortcuts"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(40, 38, 37, 0.82)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-end',
                  marginBottom: '2px'
                }}
              >
                <X size={12} />
              </button>

              {/* Floating "We're Hiring" Pill Button (2 Lines) */}
              <motion.button
                onClick={() => handlePageChange('careers')}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: isMobile ? '0.32rem 0.62rem' : '0.38rem 0.72rem',
                  backgroundColor: 'var(--wine)',
                  border: '1.5px solid var(--harvest-gold)',
                  borderRadius: '14px',
                  color: 'var(--harvest-gold)',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(94, 39, 53, 0.35)'
                }}
                aria-label="We are hiring - View Careers"
              >
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--harvest-gold)',
                  display: 'inline-block',
                  boxShadow: '0 0 6px var(--harvest-gold)',
                  animation: 'pulse-dot 1.8s infinite ease-in-out',
                  flexShrink: 0
                }} />
                <span style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  lineHeight: 1.15,
                  fontSize: isMobile ? '0.62rem' : '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  <span>We're</span>
                  <span>Hiring</span>
                </span>
              </motion.button>

              {/* WhatsApp Floating Button (Bit Smaller) */}
              <motion.a
                href="https://wa.me/917892596969?text=Hello%20Suprada%20Wellness%2C%20I%20would%20like%20to%20inquire%20about%20your%20retreats"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '38px' : '44px',
                  height: isMobile ? '38px' : '44px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.94 9.94 0 0 0 1.341 5.011L2 22l5.143-1.343a9.96 9.96 0 0 0 4.869 1.327h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.668-1.038-5.176-2.925-7.062A9.92 9.92 0 0 0 12.012 2zm5.836 14.137c-.246.692-1.228 1.332-1.996 1.498-.526.113-1.213.203-3.518-.751-2.951-1.221-4.85-4.227-4.998-4.425-.147-.197-1.202-1.602-1.202-3.056 0-1.454.761-2.169 1.033-2.464.272-.295.592-.369.79-.369.197 0 .395.002.568.01.184.008.434-.07.679.518.246.591.838 2.043.912 2.191.074.148.123.321.025.518-.099.197-.148.321-.296.493-.148.172-.311.384-.443.516-.148.148-.303.309-.131.605.172.296.764 1.261 1.637 2.039 1.122.999 2.068 1.309 2.364 1.457.296.148.468.123.64-.074.172-.197.739-.862.936-1.157.197-.295.395-.246.666-.148.271.099 1.724.813 2.02 0.96.295.148.493.222.566.345.074.123.074.715-.172 1.407z"/>
                </svg>
              </motion.a>

              {/* Call Floating Button (Bit Smaller) */}
              <motion.a
                href="tel:+917892596969"
                aria-label="Call Suprada Wellness"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '38px' : '44px',
                  height: isMobile ? '38px' : '44px',
                  borderRadius: '50%',
                  backgroundColor: '#258CFB',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(37, 140, 251, 0.4)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <svg width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

// Suprada Wellness — Integrated Application Build v1.0.4
export default App;