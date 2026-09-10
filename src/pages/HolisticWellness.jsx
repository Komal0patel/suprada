import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, Leaf, 
  Activity, Heart, User, Sun, Wind, Volume2, 
  ShieldCheck, Clock, Calendar, CheckCircle2,
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

export default function HolisticWellness({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('therapies');
  const cardsRef = useRef(null);

  const scrollCards = (direction) => {
    if (cardsRef && cardsRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--antique-white, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION - Suprada /spaces Luxury Theme */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6% 3.5rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Botanical Leaf Watermarks */}
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
              Wellness Programme
            </span>
          </motion.div>

          {/* Main Title - Exact reference site wording */}
          <h1 style={{
            color: 'var(--wine, #5E2735)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
            fontWeight: 700,
            margin: '0 0 0.8rem 0', 
            lineHeight: 1.15, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap'
          }}>
            <motion.span variants={wordVariant}>Holistic</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)' }}>
              Wellness Program
            </motion.span>
          </h1>

          {/* Exact Subtitle from reference site with Suprada font styling */}
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
            7 Days of Complete Balance
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="pillar-main-container" style={{ maxWidth: '1220px', margin: '0 auto', padding: '4.5rem 6%' }}>
        
        {/* 2. ABOUT HOLISTIC WELLNESS SECTION */}
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
                src="/assets/programmes/holistic-wellness-about.jpg" 
                alt="Holistic Wellness" 
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
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Holistic Wellness</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, marginBottom: '1.2rem' }}>
                True wellness is not just the absence of conditions, but a state of vibrant balance across body, mind, and spirit. Our 7-day Holistic Wellness Program offers a comprehensive reset, integrating the best of ancient wisdom and modern diagnostics.
              </p>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, margin: 0 }}>
                Starting with a full wellness assessment including iris diagnosis, we curate a week of transformative practices—from daily yoga and meditation to specialized naturopathy treatments—guiding you back to your natural state of harmony.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. INTEGRATIVE HEALING SECTION (Exact tabs and cards) */}
        <section id="integrative-healing" style={{ marginBottom: '5.5rem', scrollMarginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.6rem 0', fontWeight: 700 }}>
              Integrative <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Healing</span>
            </h3>
            <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, fontSize: '1.05rem', fontStyle: 'italic', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
              A synergistic blend of therapies for total well-being.
            </p>

            {/* Interactive Tab Switcher - Single Line for Mobile & Laptop */}
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
                backgroundColor: 'rgba(94, 39, 53, 0.08)', 
                padding: '0.4rem', 
                borderRadius: '35px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                width: 'max-content',
                maxWidth: '100%',
                margin: '2.2rem auto 0 auto',
                boxSizing: 'border-box'
              }}
            >
              <button
                onClick={() => setActiveTab('therapies')}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 2.2rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'therapies' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'therapies' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'therapies' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Activity size={16} />
                Therapies
              </button>
              <button
                onClick={() => setActiveTab('mindfulness')}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 2.2rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'mindfulness' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'mindfulness' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'mindfulness' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <User size={16} />
                Mind-Body
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'therapies' ? (
              <motion.div 
                key="therapies-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '28px',
                  padding: '2.5rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                  
                  {/* Group 1: Clinical & Bodywork */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: 'rgba(184, 86, 69, 0.12)', color: 'var(--redwood, #B85645)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={20} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        Clinical &amp; Bodywork
                      </h4>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {[
                        'Comprehensive Wellness Assessment',
                        'Iris Diagnosis & Analysis',
                        'Daily Naturopathy Treatments',
                        'Shirodhara / Udhwartana Therapy',
                        'Dietary Consultation'
                      ].map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.1)', color: 'var(--wine, #5E2735)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={13} />
                          </div>
                          <span style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, fontWeight: 500 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Group 2: Holistic Experiences */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: 'rgba(184, 134, 11, 0.12)', color: 'var(--harvest-gold, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={20} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        Holistic Experiences
                      </h4>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {[
                        'Satwik Nutrition Plan',
                        'Herbal Detox Support',
                        'Hydrotherapy Sessions',
                        'Relaxation Therapies',
                        'Access to Wellness Activities'
                      ].map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(184, 134, 11, 0.15)', color: 'var(--harvest-gold, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={13} />
                          </div>
                          <span style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, fontWeight: 500 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="mindfulness-tab"
                ref={cardsRef}
                className="pillar-modality-cards-track no-scrollbar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '28px',
                  padding: '2.5rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
                  
                  {/* Card 1: Morning Yoga */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    style={{
                      padding: '2rem 1.6rem',
                      borderRadius: '22px',
                      backgroundColor: 'rgba(245, 235, 217, 0.45)',
                      border: '1.5px solid rgba(94, 39, 53, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(94, 39, 53, 0.1)', color: 'var(--wine, #5E2735)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Sun size={24} />
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                      Morning Yoga
                    </h5>
                    <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                      Start the day with guided Asanas to awaken vitality and flexibility.
                    </p>
                  </motion.div>

                  {/* Card 2: Meditation & Breathwork */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    style={{
                      padding: '2rem 1.6rem',
                      borderRadius: '22px',
                      backgroundColor: 'rgba(245, 235, 217, 0.45)',
                      border: '1.5px solid rgba(94, 39, 53, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(184, 86, 69, 0.1)', color: 'var(--redwood, #B85645)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Wind size={24} />
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                      Meditation &amp; Breathwork
                    </h5>
                    <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                      Pranayama and mindfulness sessions to calm the mind and center the spirit.
                    </p>
                  </motion.div>

                  {/* Card 3: Sound Healing */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    style={{
                      padding: '2rem 1.6rem',
                      borderRadius: '22px',
                      backgroundColor: 'rgba(245, 235, 217, 0.45)',
                      border: '1.5px solid rgba(94, 39, 53, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(184, 134, 11, 0.1)', color: 'var(--harvest-gold, #B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Volume2 size={24} />
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                      Sound Healing
                    </h5>
                    <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
                      Immersive group sessions using vibrational therapy for deep relaxation.
                    </p>
                  </motion.div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 4. YOUR JOURNEY TO WHOLENESS (Room & Price Tiers) */}
        <section style={{ marginBottom: '5.5rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pillar-signature-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '32px',
              padding: '3.5rem 2rem',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              boxShadow: '0 14px 40px rgba(94, 39, 53, 0.08)',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, margin: '0 0 2.5rem 0' }}>
              Your Journey to Wholeness
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem', maxWidth: '960px', margin: '0 auto 2.8rem auto' }}>
              
              {/* Standard Room */}
              <motion.div 
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: 'var(--isabelline, #FAF6F0)',
                  borderRadius: '24px',
                  padding: '2rem 1.5rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--raisin-black, #2B1B17)', opacity: 0.65, fontWeight: 800, margin: '0 0 0.6rem 0' }}>
                  Standard Room
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
                  ₹ XX,000
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, marginTop: '0.4rem', marginBottom: 0 }}>
                  Per Person / 7 Days
                </p>
              </motion.div>

              {/* Deluxe Room (Featured Recommended) */}
              <motion.div 
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '2.2rem 1.5rem',
                  border: '2px solid var(--harvest-gold, #B8860B)',
                  boxShadow: '0 10px 30px rgba(184, 134, 11, 0.15)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div style={{ position: 'absolute', top: '-13px', backgroundColor: 'var(--harvest-gold, #B8860B)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '30px', boxShadow: '0 3px 10px rgba(184,134,11,0.3)' }}>
                  Recommended
                </div>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--raisin-black, #2B1B17)', opacity: 0.65, fontWeight: 800, margin: '0 0 0.6rem 0' }}>
                  Deluxe Room
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.4rem', fontWeight: 700, margin: 0 }}>
                  ₹ XX,000
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, marginTop: '0.4rem', marginBottom: 0 }}>
                  Per Person / 7 Days
                </p>
              </motion.div>

              {/* Premium Cottage */}
              <motion.div 
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: 'var(--isabelline, #FAF6F0)',
                  borderRadius: '24px',
                  padding: '2rem 1.5rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--raisin-black, #2B1B17)', opacity: 0.65, fontWeight: 800, margin: '0 0 0.6rem 0' }}>
                  Premium Cottage
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
                  ₹ XX,000
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, marginTop: '0.4rem', marginBottom: 0 }}>
                  Per Person / 7 Days
                </p>
              </motion.div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => onNavigate('contact')}
                className="pillar-signature-btn"
                style={{
                  backgroundColor: 'var(--wine, #5E2735)',
                  color: '#ffffff',
                  padding: '1rem 3rem',
                  borderRadius: '35px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(94, 39, 53, 0.25)',
                  transition: 'all 0.3s ease'
                }}
              >
                Reserve Your Spot
              </button>
            </div>
          </motion.div>
        </section>

        {/* 5. EXPLORE OTHER PROGRAMMES NAVIGATION (Exact reference) */}
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
                onNavigate('programmes/rejuvenation');
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
                  Rejuvenation Program
                </h4>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/advanced-healing');
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
                  Advanced Healing Program
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
