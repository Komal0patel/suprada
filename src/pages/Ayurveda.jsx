import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, Leaf, 
  Droplets, Soup, Layers, Waves, Sun, Activity, 
  Droplet, Flame, Wind, ChevronLeft, ChevronRight
} from 'lucide-react';

const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Ayurveda({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('dhara');
  const cardsRef = useRef(null);

  const scrollCards = (direction) => {
    if (cardsRef && cardsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const dharaModalities = [
    { name: "Taila Shirodhara", icon: Sparkles, desc: "Oil flow on forehead for mental peace", color: "#B8860B" },
    { name: "Thakradhara", icon: Droplets, desc: "Buttermilk flow for cooling effect", color: "#6A7B66" },
    { name: "Ksheera Dhara", icon: Soup, desc: "Medicated milk for nervous system", color: "#5E2735" },
    { name: "Dhanyamalaka", icon: Layers, desc: "Fermented grain liquid for inflammation", color: "#B85645" },
    { name: "Sarvangadhara", icon: Waves, desc: "Full body oil bath (Pizhichil)", color: "#B8860B" },
    { name: "Netradhara", icon: Sun, desc: "Cleansing eye wash therapy", color: "#6A7B66" },
    { name: "Sandhidhara", icon: Activity, desc: "Localized oil pooling for joints", color: "#5E2735" },
    { name: "Ashwagandha Dhara", icon: Leaf, desc: "Strengthening herbal flow", color: "#B85645" },
    { name: "Partial Dhara", icon: Droplet, desc: "Targeted flow for specific pain areas", color: "#B8860B" }
  ];

  const massageModalities = [
    { name: "Abhyangam", icon: Leaf, desc: "Full body oil massage", color: "#6A7B66" },
    { name: "Udhwartana", icon: Layers, desc: "Herbal powder scrub", color: "#B8860B" },
    { name: "Potli", icon: Flame, desc: "Warm herbal pouches", color: "#B85645" },
    { name: "Marma", icon: Sparkles, desc: "Vital energy points", color: "#5E2735" }
  ];

  const specializedModalities = [
    { name: "Kizhi (Bolus)", icon: Flame, desc: "Warm herbal poultice massage for pain", color: "#B85645" },
    { name: "Nasya", icon: Wind, desc: "Nasal drops for head & neck clearing", color: "#6A7B66" },
    { name: "Pozhichalur", icon: Sparkles, desc: "Soft beauty massage with herbal powder", color: "#B8860B" },
    { name: "Udhwartana", icon: Leaf, desc: "Dry powder massage for weight loss", color: "#5E2735" },
    { name: "Abhyangam", icon: Droplets, desc: "Traditional full body oil massage", color: "#6A7B66" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--antique-white, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION - /spaces Centered Luxury Theme (No Buttons, Refined Typography) */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6% 3.5rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />

        {/* Ambient Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '15%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.1) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Background Mandala Watermark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(340px, 75vw, 540px)', height: 'clamp(340px, 75vw, 540px)',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordRevealContainer}
          style={{ position: 'relative', zIndex: 2, maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '75px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
            />
          </motion.div>

          {/* Centered Pill Badge */}
          <motion.div
            initial={{ letterSpacing: '0.1em', opacity: 0, y: -10 }}
            animate={{ letterSpacing: '0.22em', opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              padding: '0.35rem 1.3rem', borderRadius: '30px',
              border: '1px solid rgba(94, 39, 53, 0.2)',
              marginBottom: '1.1rem'
            }}
          >
            <span style={{ color: 'var(--harvest-gold, #B8860B)', fontSize: '0.75rem' }}>✦</span>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 800 }}>
              Pillar of Wellness
            </span>
          </motion.div>

          {/* Main Title - Suprada Luxury Typography */}
          <h1 style={{
            color: 'var(--wine, #5E2735)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            margin: '0 0 0.85rem 0', 
            lineHeight: 1.15, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap'
          }}>
            <motion.span variants={wordVariant}>Ayur</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)' }}>
              veda
            </motion.span>
          </h1>

          {/* Exact Subtitle from reference site */}
          <p style={{
            color: 'rgba(94, 39, 53, 0.85)',
            fontFamily: 'var(--font-body)',
            maxWidth: '640px',
            margin: '0 auto',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.22rem)',
            lineHeight: 1.6,
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '0.01em'
          }}>
            Ancient Wisdom for Modern Wellness
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="pillar-main-container" style={{ maxWidth: '1220px', margin: '0 auto', padding: '4.5rem 6%' }}>
        
        {/* 2. ABOUT AYURVEDA SECTION */}
        <section style={{ marginBottom: '5rem' }}>
          <div className="pillar-about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.08)',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                backgroundColor: '#ffffff',
                width: '100%',
                minHeight: '320px',
                margin: '0 auto'
              }}
            >
              <img 
                src="/assets/programmes/ayurveda-about.jpg" 
                alt="Holistic massage therapy with herbal oils" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px', maxHeight: '480px', display: 'block' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 1.2rem 0', fontWeight: 700, lineHeight: 1.2 }}>
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Ayurveda</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, marginBottom: '1.2rem' }}>
                Ayurveda, the 5,000-year-old &ldquo;Science of Life,&rdquo; offers a comprehensive approach to health and wellness by balancing the three doshas—Vata, Pitta, and Kapha. At Suprada Wellness, our authentic Holistic treatments combine classical therapies with personalized care to restore harmony, enhance immunity, and promote longevity.
              </p>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, margin: 0 }}>
                Through therapeutic massages and lifestyle guidance, we help you achieve optimal health according to your unique constitution.
              </p>
            </motion.div>
          </div>

          {/* 3. SANSKRIT WISDOM BANNER - Holistic Naturopathy Wisdom */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              marginTop: '4.5rem',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              background: 'linear-gradient(135deg, #FAF0E6 0%, #F5EBD9 100%)',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', opacity: 0.05, pointerEvents: 'none' }}>
              <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <span style={{ color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.02em' }}>
                Holistic Naturopathy Wisdom
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                स्वस्थस्य स्वास्थ्यरक्षणं।
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                Svasthasya svāsthyarakṣaṇaṃ.
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '60%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  (Preservation of health of the healthy.)
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* 4. HEALING TRADITIONS - Interactive Tabbed Section with Lucide Icons */}
      <section id="traditions" style={{
        padding: '5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine, #5E2735)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '5rem'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.6rem 0', fontWeight: 700 }}>
              Healing <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Traditions</span>
            </h2>
            <p style={{ color: '#ffffff', fontSize: '1.05rem', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
              Authentic traditional therapies for complete rejuvenation
            </p>

            {/* Interactive Category Tabs - Single Line for Mobile & Laptop */}
            <div 
              className="single-line-horizontal-tabs no-scrollbar" 
              style={{ 
                display: 'flex', 
                flexDirection: 'row',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                gap: '0.6rem', 
                marginTop: '2.2rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.45)', 
                padding: '0.4rem', 
                borderRadius: '35px', 
                backdropFilter: 'blur(10px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                width: 'max-content',
                maxWidth: '100%',
                margin: '2.2rem auto 0 auto',
                boxSizing: 'border-box'
              }}
            >
              <button
                onClick={() => setActiveTab('dhara')}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'dhara' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'dhara' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'dhara' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Sparkles size={16} />
                Dhara Therapies
              </button>
              <button
                onClick={() => setActiveTab('massages')}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'massages' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'massages' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'massages' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Leaf size={16} />
                Authentic Massages
              </button>
              <button
                onClick={() => setActiveTab('specialized')}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'specialized' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'specialized' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'specialized' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Sun size={16} />
                Specialized Treatments
              </button>
            </div>
            {/* Arrows for mobile scrolling */}
            <div className="carousel-nav-arrows-container" style={{ display: 'none', justifyContent: 'center', gap: '1rem', marginTop: '1.2rem', marginBottom: '0.5rem' }}>
              <button
                onClick={() => scrollCards('left')}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  backgroundColor: '#ffffff', border: '1.5px solid rgba(94, 39, 53, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--wine, #5E2735)', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollCards('right')}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  backgroundColor: '#ffffff', border: '1.5px solid rgba(94, 39, 53, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--wine, #5E2735)', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'dhara' && (
              <motion.div 
                key="dhara-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {dharaModalities.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.12)' }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '22px',
                        padding: '1.6rem 1.4rem',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <IconComp size={22} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'massages' && (
              <motion.div 
                key="massages-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {massageModalities.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.12)' }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '22px',
                        padding: '1.6rem 1.4rem',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <IconComp size={22} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'specialized' && (
              <motion.div 
                key="specialized-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {specializedModalities.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.12)' }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '22px',
                        padding: '1.6rem 1.4rem',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <IconComp size={22} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Main Container Continued */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4.5rem 6%' }}>
        
        {/* 5. RESTORING YOUR DOSHA BALANCE & SIGNATURE PROGRAMME - Exact reference content & image */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', fontWeight: 700, margin: '0 0 0.8rem 0' }}>
              Restoring Your Dosha Balance
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, maxWidth: '820px', margin: '0 auto', lineHeight: 1.65 }}>
              Ayurveda is more than just treatments; it is a way of life that aligns you with nature's rhythms. Our expert Vaidyas (doctors) assess your unique constitution (Prakriti) and imbalances (Vikriti) to curate a personalized healing journey. From soothing Shirodhara to detoxifying authentic therapies, every therapy is performed with traditional precision to restore health and harmony.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pillar-signature-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              boxShadow: '0 14px 40px rgba(94, 39, 53, 0.08)'
            }}
          >
            <div className="pillar-signature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--wine, #5E2735)',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 1rem',
                    borderRadius: '30px',
                    marginBottom: '1rem'
                  }}>
                    <Sparkles size={13} style={{ color: 'var(--redwood, #B85645)' }} /> SIGNATURE PROGRAMME
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.7rem 0' }}>
                    Rejuvenation Program
                  </h3>

                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Experience the ultimate renewal with our signature Rejuvenation therapy. This program focuses on anti-aging and vitality boosting through Nutritional treatments, daily massages like Abhyangam, and stress-relieving Shirodhara.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
                    {[
                      'Daily Abhyangam & Steam',
                      'Shirodhara Sessions',
                      'Yoga for Vitality'
                    ].map(check => (
                      <div key={check} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                          <Check size={13} />
                        </div>
                        <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.88rem' }}>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => onNavigate('book', { programme: 'ayurveda' })}
                    className="pillar-signature-btn"
                    style={{
                      backgroundColor: 'var(--wine, #5E2735)',
                      color: '#ffffff',
                      padding: '0.85rem 2.2rem',
                      borderRadius: '30px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(94, 39, 53, 0.22)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    BEGIN YOUR JOURNEY &rarr;
                  </button>
                </div>
              </div>

              <div className="pillar-signature-img-box" style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '350px', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.1)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <img 
                  src="/assets/programmes/ayurveda-sig.jpg" 
                  alt="Holistic Rejuvenation" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="pillar-signature-price-badge" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '0.8rem 1.2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(94, 39, 53, 0.15)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Starting from</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--harvest-gold, #B8860B)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>5 / 7 / 14 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. EXPLORE OTHER PROGRAMMES NAVIGATION (Exact reference) */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.12)' }}>
          <h3 style={{ color: 'var(--wine, #5E2735)', textAlign: 'center', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.5rem' }}>
            Explore Other Programmes
          </h3>
          <div className="pillar-bottom-nav-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/physiotherapy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.2rem 1.4rem',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem'
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                <ArrowLeft size={16} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>
                  Previous
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--wine, #5E2735)', margin: '0.1rem 0 0 0', fontWeight: 700 }}>
                  Physiotherapy
                </h4>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/naturopathy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.2rem 1.4rem',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.7rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>
                  Next
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--wine, #5E2735)', margin: '0.1rem 0 0 0', fontWeight: 700 }}>
                  Naturopathy
                </h4>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>
        </div>

      </div>

    </div>
  );
}
