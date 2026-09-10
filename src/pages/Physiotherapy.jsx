import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, Zap, 
  Volume2, Flame, Target, Sun, Pin, Activity, 
  Layers, RotateCw, Dumbbell, HeartPulse, CircleDot, Link2,
  ChevronLeft, ChevronRight
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

export default function Physiotherapy({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('electro');
  const cardsRef = useRef(null);

  const scrollCards = (direction) => {
    if (cardsRef && cardsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const electroModalities = [
    { name: "Ultrasound", icon: Volume2, desc: "Deep tissue healing using sound waves", color: "#5E2735" },
    { name: "IFT", icon: Zap, desc: "Interferential Therapy for pain relief", color: "#B8860B" },
    { name: "SWD", icon: Flame, desc: "Short Wave Diathermy deep heat", color: "#B85645" },
    { name: "Laser Gun", icon: Target, desc: "Targeted tissue repair & inflammation control", color: "#6A7B66" },
    { name: "Infra Red", icon: Sun, desc: "Surface heating for muscle relaxation", color: "#B8860B" }
  ];

  const manualModalities = [
    { name: "Dry Needling", icon: Pin, desc: "Trigger point release for muscle pain", color: "#B85645" },
    { name: "Wax Therapy", icon: Flame, desc: "Paraffin bath for joint stiffness", color: "#B8860B" },
    { name: "Traction", icon: Activity, desc: "Spinal decompression therapy", color: "#5E2735" },
    { name: "Sand Bags", icon: Layers, desc: "Weighted positioning & stabilization", color: "#6A7B66" }
  ];

  const exerciseModalities = [
    { name: "Shoulder Wheel", icon: RotateCw, desc: "Range of motion improvement", color: "#5E2735" },
    { name: "Active & Passive", icon: Dumbbell, desc: "Guided movement exercises", color: "#6A7B66" },
    { name: "Sports Training", icon: Activity, desc: "Athletic performance conditioning", color: "#B8860B" },
    { name: "Rehabilitation", icon: HeartPulse, desc: "Post-injury recovery protocols", color: "#B85645" },
    { name: "Gym Balls", icon: CircleDot, desc: "Core stability and balance work", color: "#6A7B66" },
    { name: "Springs & Ropes", icon: Link2, desc: "Resistance based strengthening", color: "#5E2735" }
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
        minHeight: '100vh',
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
            fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            margin: '0 0 0.85rem 0', 
            lineHeight: 1.15, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap'
          }}>
            <motion.span variants={wordVariant}>Physio</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)' }}>
              therapy
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
            Restore Movement, Reclaim Life
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="pillar-main-container" style={{ maxWidth: '1220px', margin: '0 auto', padding: '4.5rem 6%' }}>
        
        {/* 2. ABOUT PHYSIOTHERAPY SECTION */}
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
                src="/assets/programmes/physiotherapy-about.jpg" 
                alt="Physiotherapy rehabilitation treatment session" 
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
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Physiotherapy</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, marginBottom: '1.2rem' }}>
                Our physiotherapy programmes combine evidence-based rehabilitation techniques with holistic wellness principles to help you recover from injuries, manage chronic pain, and improve overall mobility. Our experienced physiotherapists create personalized treatment plans tailored to your specific condition and recovery goals.
              </p>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, margin: 0 }}>
                Whether recovering from surgery, managing a chronic condition, or seeking to improve physical function, our comprehensive approach addresses both symptoms and underlying causes.
              </p>
            </motion.div>
          </div>

          {/* 3. SANSKRIT WISDOM BANNER - Movement & Life */}
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
                Movement &amp; Life
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                चलनं जीवनम्।
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                Calanaṃ jīvanam.
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '60%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  (Movement is life.)
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* 4. THERAPEUTIC MODALITIES - Interactive Tabbed Section with Lucide Icons */}
      <section id="modalities" style={{
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
              Therapeutic <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Modalities</span>
            </h2>
            <p style={{ color: '#ffffff', fontSize: '1.05rem', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
              Advanced Equipment &amp; Techniques
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
                onClick={() => setActiveTab('electro')}
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
                  backgroundColor: activeTab === 'electro' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'electro' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'electro' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Zap size={16} />
                Electrotherapy
              </button>
              <button
                onClick={() => setActiveTab('manual')}
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
                  backgroundColor: activeTab === 'manual' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'manual' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'manual' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Activity size={16} />
                Manual Therapy
              </button>
              <button
                onClick={() => setActiveTab('exercise')}
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
                  backgroundColor: activeTab === 'exercise' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'exercise' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'exercise' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Dumbbell size={16} />
                Exercise Therapy
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
            {activeTab === 'electro' && (
              <motion.div 
                key="electro-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {electroModalities.map((item) => {
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

            {activeTab === 'manual' && (
              <motion.div 
                key="manual-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {manualModalities.map((item) => {
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

            {activeTab === 'exercise' && (
              <motion.div 
                key="exercise-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.4rem' }}
              >
                {exerciseModalities.map((item) => {
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
        
        {/* 5. REHABILITATE, RECOVER, RENEW & SIGNATURE FOCUS - Exact reference content & image */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', fontWeight: 700, margin: '0 0 0.8rem 0' }}>
              Rehabilitate, Recover, Renew
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, maxWidth: '820px', margin: '0 auto', lineHeight: 1.65 }}>
              Our comprehensive physiotherapy department integrates cutting-edge technology with hands-on care to restore function and alleviate pain. From advanced electrotherapy modalities to personalized exercise regimens, every treatment is designed to support your body's natural healing process and improve your quality of life.
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
                    <Sparkles size={13} style={{ color: 'var(--redwood, #B85645)' }} /> SIGNATURE FOCUS
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.7rem 0' }}>
                    Advanced Pain Management
                  </h3>

                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    A targeted approach for chronic pain and mobility issues, combining laser therapy, IFT, and manual mobilization. Ideal for arthritis, sports injuries, and post-operative recovery.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
                    {[
                      'Personalized Assessment',
                      'Multi-modality Treatment',
                      'Home Exercise Plan',
                      'Ergonomic Advice'
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
                    onClick={() => onNavigate('book', { programme: 'physiotherapy' })}
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
                  src="/assets/programmes/physiotherapy-sig.jpg" 
                  alt="Physiotherapy Treatment" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="pillar-signature-price-badge" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '0.8rem 1.2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(94, 39, 53, 0.15)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Expert Care</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--harvest-gold, #B8860B)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Personalized Recovery</p>
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
                onNavigate('programmes/detox-cleansing');
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
                  Detox &amp; Cleansing
                </h4>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/ayurveda');
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
                  Ayurveda
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
