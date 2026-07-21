import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TwinklingLights from '../components/TwinklingLights';

// --- Sub-Component: Ambient Gold Ember Dust Particles ---
function GoldEmberParticles({ count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * -9,
      opacity: 0.2 + Math.random() * 0.6
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: `${p.y}%`, x: `${p.x}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${(p.y - 25 + 100) % 100}%`],
            opacity: [0, p.opacity, p.opacity, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: 'var(--harvest-gold)',
            boxShadow: '0 0 16px rgba(220, 160, 50, 0.9)'
          }}
        />
      ))}
    </div>
  );
}

export default function Programmes({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Program gradients now use proper palette colors
  const programsList = [
    {
      id: 'weekend',
      days: '2 / 3 Days',
      daysShort: '2-3',
      title: 'Weekend Reset',
      intensity: 'Moderate',
      intensityLevel: 2,
      focus: 'Quick Wellness Reset',
      ideal: 'Busy professionals, Weekend wellness seekers',
      icon: '🌅',
      // Wine-based gradient
      gradient: 'linear-gradient(135deg, #5e2735 0%, #3a1520 60%, #2a0e18 100%)',
      accentColor: 'var(--harvest-gold)',
      desc: 'A concentrated micro-retreat designed to decompress the nervous system, recalibrate sleep cycles, and restore mental clarity in just a weekend.',
      inclusions: [
        'Initial doctor wellness consultation',
        '2 Naturopathy treatments per day',
        'Daily group Yoga & Pranayama sessions',
        'Rhythmic sound healing sessions',
        'Nutrient-dense organic satwik meals'
      ]
    },
    {
      id: 'rejuvenation',
      days: '5 Days',
      daysShort: '5',
      title: 'Rejuvenation Program',
      intensity: 'Medium',
      intensityLevel: 3,
      focus: 'Restoration & Vitality',
      ideal: 'First-time guests, Stress relief, Energy restoration',
      icon: '🌿',
      // Sage-based gradient
      gradient: 'linear-gradient(135deg, #6b7a52 0%, #4a5538 60%, #2e3422 100%)',
      accentColor: 'var(--harvest-gold)',
      desc: 'A five-day immersive journey combining ancient Ayurvedic diagnostics with modern naturopathic therapies to restore vitality from the cellular level.',
      inclusions: [
        'Doctor consultation & Iris diagnosis',
        'Diet & nutritional counselling',
        'Daily Yoga & Meditation sessions',
        'Daily custom Naturopathy treatments',
        'Shirodhara / Udhwartana therapies',
        'Group sound healing & music therapy'
      ]
    },
    {
      id: 'holistic',
      days: '7 Days',
      daysShort: '7',
      title: 'Holistic Wellness Program',
      intensity: 'Medium–High',
      intensityLevel: 4,
      focus: 'Comprehensive Wellness Reset',
      ideal: 'Overall wellness seekers, Lifestyle reset, Chronic fatigue',
      icon: '🧘',
      // Redwood / terracotta gradient
      gradient: 'linear-gradient(135deg, #b85e4c 0%, #7a3a2e 60%, #4a2218 100%)',
      accentColor: 'var(--tan)',
      desc: 'A week-long transformative protocol that systematically addresses all five pillars of health — nutrition, movement, sleep, detox, and mindfulness.',
      inclusions: [
        'Full biological wellness assessment',
        'Daily custom Yoga, Pranayama & Meditation',
        'Daily therapeutic Naturopathy treatments',
        'Bespoke Shirodhara / Udhwartana oil flow',
        'Daily Satwik therapeutic meals',
        'Group sound bath sessions'
      ]
    },
    {
      id: 'detox',
      days: '7 / 14 / 21 Days',
      daysShort: '7-21',
      title: 'Detox Program',
      intensity: 'High',
      intensityLevel: 5,
      focus: 'Deep Cleansing & Purification',
      ideal: 'Metabolic concerns, Chronic toxicity, Weight issues',
      icon: '💧',
      // Deep wine + sage teal gradient
      gradient: 'linear-gradient(135deg, #3a4a3a 0%, #2a3628 60%, #1a2218 100%)',
      accentColor: 'var(--harvest-gold)',
      desc: 'An intensive purification protocol using therapeutic fasting, hydrotherapy, and herbal detox to eliminate deep-seated toxins and reset metabolic pathways.',
      inclusions: [
        'Full Body Composition Analysis',
        'Iris diagnosis & toxin evaluation',
        'Naturopathic massage & herbal steam baths',
        'Therapeutic fasting & raw juice diets',
        'Hydrotherapy & mud therapy packs',
        'Colon hydrotherapy (on prescription)'
      ]
    },
    {
      id: 'advanced',
      days: '21 Days',
      daysShort: '21',
      title: 'Advanced Healing Program',
      intensity: 'Very High',
      intensityLevel: 6,
      focus: 'Chronic Ailment Management',
      ideal: 'Chronic conditions, Medical concerns, Rehabilitation',
      icon: '🔬',
      // Wine deep + harvest gold undertones
      gradient: 'linear-gradient(135deg, #7a3a2e 0%, #5e2735 60%, #2a0e18 100%)',
      accentColor: 'var(--harvest-gold)',
      desc: 'A clinical-grade 21-day immersion under direct physician supervision, combining naturopathy, physiotherapy, acupuncture, and bespoke dietary protocols.',
      inclusions: [
        'Doctor-led clinical protocol',
        'Daily detailed check-ups & assessments',
        'Highly customized therapeutic diets',
        'Daily intensive Naturopathy therapies',
        'Colon hydrotherapy & acupressure',
        'Acupuncture & physiotherapy rehabilitation'
      ]
    }
  ];

  const whatIsIncluded = [
    { title: 'Doctor Consultations', desc: 'Detailed pulse diagnosis, iris evaluation, and custom health profiling.', icon: '🩺' },
    { title: 'Personalized Diets', desc: 'Sattvik, organic farm-to-table nutrition tailored to your wellness type.', icon: '🥗' },
    { title: 'Daily Yoga & Meditation', desc: 'Breathwork, asanas, and guided mindfulness sessions every morning.', icon: '🧘' },
    { title: 'Aquatic Therapies', desc: 'Water jet massages, spinal sprays, and hip baths to soothe nerves.', icon: '💧' },
    { title: 'Therapeutic Massages', desc: 'Aromatic, herbal, and traditional full-body oil flow treatments.', icon: '🌿' },
    { title: 'Nature Baths', desc: 'Mud packs, sun baths, and local herbal applications for skin purification.', icon: '🌏' },
    { title: 'Steam & Sauna Detox', desc: 'Sweat-inducing heat chambers to eliminate deep tissue toxins.', icon: '♨️' },
    { title: 'Mindfulness Coaching', desc: 'Private emotional counseling and stress release workshops.', icon: '🧠' },
    { title: 'Post-Retreat Guidance', desc: 'Exit blueprint and remote expert follow-ups for home integration.', icon: '📋' }
  ];

  const advantages = [
    { title: 'Multidisciplinary Experts', desc: 'Physicians, naturopaths, yoga masters, and chefs working as a single coordinated team.' },
    { title: 'Science Meets Wisdom', desc: 'Ancient scriptures combined with modern clinical check-ups for safe, measurable healing.' },
    { title: 'Serene Riverbank Setting', desc: 'Nestled by the Suvarnamukhi river, utilizing natural ambient sound for therapy.' },
    { title: 'Intimate Care Ratios', desc: 'High staff-to-guest ratios ensuring constant support and attention.' }
  ];

  const filters = ['All', '2-3 Days', '5 Days', '7 Days', '7-21 Days', '21 Days'];

  const filteredPrograms = activeFilter === 'All'
    ? programsList
    : programsList.filter(p => p.days.includes(activeFilter.replace(' Days', '').trim()) || p.daysShort === activeFilter.replace(' Days', '').trim());

  return (
    <div style={{ backgroundColor: '#2a0e18', color: '#ffffff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* ========================================================================= */}
      {/* --- SECTION 1: LIGHT ANTIQUE WHITE HERO (mirrors Stay page hero) --- */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        height: '100vh',
        maxHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 6%',
        backgroundColor: 'var(--antique-white)',
        color: 'var(--wine)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Subtle Organic Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(94, 39, 53, 0.04) 1.5px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          pointerEvents: 'none'
        }} />

        {/* Pale Dogwood blush accent blob — top right */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          maxWidth: '400px', width: '100%',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,215,204,0.55) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Tea Green accent blob — bottom left */}
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          maxWidth: '320px', width: '100%',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209,218,194,0.45) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Center Content */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Animated SVG Line Drawing — Healing Mandala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem' }}
          >
            <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle
                cx="50" cy="50" r="44"
                stroke="var(--harvest-gold)"
                strokeWidth="1.2"
                strokeDasharray="280"
                initial={{ strokeDashoffset: 280 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
              <motion.path
                d="M50 10 C38 28 38 72 50 90 C62 72 62 28 50 10 Z"
                stroke="var(--wine)"
                strokeWidth="1.5"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
              />
              <motion.path
                d="M10 50 C28 38 72 38 90 50 C72 62 28 62 10 50 Z"
                stroke="var(--wine)"
                strokeWidth="1.5"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, delay: 0.7, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="50" cy="50" r="5"
                fill="var(--harvest-gold)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span style={{
              color: 'var(--harvest-gold)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '1rem'
            }}>
              ✦ Healing Journeys ✦
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.2rem, 5.8vw, 5.2rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              color: 'var(--wine)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'
            }}>
              Programs &amp; <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Packages</em>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              opacity: 0.9,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: '740px',
              margin: '0 auto',
              color: 'var(--raisin-black)'
            }}>
              "Structured, doctor-led wellness journeys tailored to cleanse, balance, and revitalize your biological clock — from weekend resets to 21-day clinical healing protocols."
            </p>

            <p style={{
              fontSize: '0.96rem',
              color: 'var(--redwood)',
              fontStyle: 'italic',
              marginTop: '1.2rem',
              marginBottom: '2.8rem',
              fontWeight: 500
            }}>
              Rooted in Ayurveda. Guided by modern science.
            </p>

            {/* Explore Programs CTA */}
            <a
              href="#programmes-showcase"
              className="btn-luxury"
              style={{
                padding: '1.1rem 3rem',
                fontSize: '0.88rem',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'var(--wine)',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(94, 39, 53, 0.25)'
              }}
            >
              <span>Explore Programs</span>
              <span style={{ fontSize: '1.1rem' }}>↓</span>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ marginTop: '3rem' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.5 }}
            >
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)' }}>Scroll</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--wine)' }}>↓</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 2: PHILOSOPHY (Brand-bg warm clay — mirrors Stay overview) --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '6rem 8%', backgroundColor: 'var(--brand-bg)', color: 'var(--wine)', position: 'relative', overflow: 'hidden' }}>
        {/* Isabelline top-right blob */}
        <div style={{ position: 'absolute', top: '-100px', right: '-60px', maxWidth: '350px', width: '100%', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,240,236,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
              ✦ Our Philosophy
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--wine)', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
              Rooted in Nature.<br />Guided by Tradition.
            </h2>
            <p style={{ marginTop: '1.2rem', fontSize: '0.95rem', color: 'var(--raisin-black)', lineHeight: 1.85, opacity: 0.75, fontWeight: 300 }}>
              Leading a life rooted in holistic wellness requires mindful living and the consistent practice of daily routines that align with nature's intelligence.
            </p>
          </div>
          <div>
            <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.9rem', color: 'var(--raisin-black)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                'Teach the absolute importance of prevention over cure.',
                'Identify your unique, custom biological Wellness Formula.',
                'Introduce daily rhythms that align with nature\'s cycles.',
                'Offer structured, intensive healing paths for chronic ailments.',
                'Provide continuous virtual support after you return home.'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.8rem 1rem', backgroundColor: 'rgba(94,39,53,0.05)', borderRadius: '12px', borderLeft: '3px solid var(--harvest-gold)' }}>
                  <span style={{ color: 'var(--harvest-gold)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 3: SIGNATURE PROGRAMS (Antique white bg — matches Stay room section) --- */}
      {/* ========================================================================= */}
      <section id="programmes-showcase" style={{ padding: '6rem 6%', backgroundColor: '#f4f1e9', position: 'relative' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>
                ✦ Signature Journeys
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--wine)', fontWeight: 500, lineHeight: 1.15, margin: 0 }}>
                On-Site Programs
              </h2>
            </div>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.6, maxWidth: '360px', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
              Every program begins with a diagnostic check-up and doctor consultation to calibrate your treatment map.
            </p>
          </div>

          {/* Filter Pills — Wine-colored active state to match Stay campus filter pills */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.85rem 2rem',
                  borderRadius: '50px',
                  border: activeFilter === filter ? '2px solid var(--wine)' : '1px solid rgba(94, 39, 53, 0.2)',
                  backgroundColor: activeFilter === filter ? 'var(--wine)' : '#ffffff',
                  color: activeFilter === filter ? '#ffffff' : 'var(--wine)',
                  fontWeight: activeFilter === filter ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: activeFilter === filter ? '0 10px 25px rgba(94, 39, 53, 0.25)' : '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Alternating Program Cards */}
          <div className="flex-stack-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <AnimatePresence>
              {filteredPrograms.map((prog, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="program-card-responsive"
                    style={{
                      display: 'flex',
                      flexDirection: isEven ? 'row' : 'row-reverse',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid rgba(94, 39, 53, 0.12)',
                      minHeight: '360px',
                      boxShadow: '0 16px 40px rgba(94, 39, 53, 0.08)'
                    }}
                  >
                    {/* Gradient Visual Panel (42%) — palette-based gradients */}
                    <div className="flex-stack-mobile" style={{
                      flex: '0 0 42%',
                      background: prog.gradient,
                      padding: '3rem 2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative circles */}
                      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', border: '1px solid rgba(220,160,50,0.12)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(220,160,50,0.08)', pointerEvents: 'none' }} />
                      {/* Subtle dot pattern */}
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(220,160,50,0.04) 1px, transparent 0)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>{prog.icon}</span>
                          <span style={{
                            fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--harvest-gold)',
                            backgroundColor: 'rgba(220,160,50,0.18)', padding: '0.35rem 1rem', borderRadius: '50px',
                            fontWeight: 800, letterSpacing: '0.12em', border: '1px solid rgba(220,160,50,0.3)'
                          }}>
                            {prog.days}
                          </span>
                        </div>

                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--tan)', fontWeight: 500, marginBottom: '0.6rem' }}>
                          {prog.title}
                        </h3>

                        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '340px' }}>
                          {prog.desc}
                        </p>
                      </div>

                      {/* Intensity Meter */}
                      <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--harvest-gold)', letterSpacing: '0.12em', fontWeight: 700 }}>
                          Intensity: {prog.intensity}
                        </span>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} style={{
                              width: '28px', height: '4px', borderRadius: '2px',
                              backgroundColor: i < prog.intensityLevel ? 'var(--harvest-gold)' : 'rgba(255,255,255,0.12)'
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Isabelline Content Card (58%) — matches Stay's white content card */}
                    <div className="flex-stack-mobile" style={{
                      flex: '0 0 58%',
                      backgroundColor: 'var(--isabelline)',
                      padding: '2.8rem 3rem',
                      color: 'var(--raisin-black)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: 700, color: 'var(--wine)',
                            backgroundColor: 'rgba(94,39,53,0.08)', padding: '0.35rem 1rem', borderRadius: '50px',
                            border: '1px solid rgba(94,39,53,0.1)'
                          }}>
                            Focus: {prog.focus}
                          </span>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', opacity: 0.6, display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ideal for:</span>
                          <span style={{ fontSize: '0.88rem', color: 'var(--wine)', fontWeight: 500 }}>{prog.ideal}</span>
                        </div>

                        {/* Inclusions — palette-accented */}
                        <div style={{ borderTop: '1px solid rgba(94,39,53,0.1)', paddingTop: '1.2rem' }}>
                          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--wine)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            What's Included:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem' }}>
                            {prog.inclusions.map((inc, iidx) => (
                              <div key={iidx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.82rem', lineHeight: 1.5 }}>
                                <span style={{ color: 'var(--harvest-gold)', flexShrink: 0, marginTop: '1px' }}>✓</span>
                                <span style={{ opacity: 0.8 }}>{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button
                          onClick={() => onNavigate('contact')}
                          className="btn-luxury"
                          style={{ padding: '0.85rem 2rem', fontSize: '0.78rem', letterSpacing: '0.1em' }}
                        >
                          Book Programme
                        </button>
                        <button
                          onClick={() => onNavigate('contact')}
                          style={{
                            padding: '0.85rem 1.5rem', backgroundColor: 'transparent',
                            border: '1.5px solid rgba(94,39,53,0.25)', color: 'var(--wine)',
                            borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Speak to Doctor
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 4: COMPARISON TABLE (Wine-deep bg with brand tones) --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '6rem 6%', backgroundColor: '#3a1520', position: 'relative', overflow: 'hidden' }}>
        {/* Twinkling Lights particle layer for this dark wine section */}
        <TwinklingLights count={14} />
        <GoldEmberParticles count={12} />

        <div style={{ position: 'absolute', bottom: '-80px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: '-80px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(179,186,142,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>
              ✦ Compare
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--tan)', fontWeight: 500 }}>
              Programs at a Glance
            </h2>
          </div>

          <div style={{
            backgroundColor: 'rgba(244,240,236,0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(220,160,50,0.18)',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(220,160,50,0.25)', backgroundColor: 'rgba(94,39,53,0.4)' }}>
                    {['Program', 'Duration', 'Intensity', 'Focus', 'Key Therapies'].map((header) => (
                      <th key={header} style={{ padding: '1.2rem 1.2rem', color: 'var(--harvest-gold)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Weekend Reset', dur: '2/3 Days', int: 'Moderate', focus: 'Quick Stress Relief', therapies: 'Naturopathy, Satwik Meals, Sound Bath' },
                    { name: 'Rejuvenation', dur: '5 Days', int: 'Medium', focus: 'Energy & Vitality', therapies: 'Shirodhara, Yoga, Massage' },
                    { name: 'Holistic Wellness', dur: '7 Days', int: 'Medium–High', focus: 'Circadian Correction', therapies: 'Iris Diagnosis, Steam, Sound, Yoga' },
                    { name: 'Detox Program', dur: '7/14/21 Days', int: 'High', focus: 'Deep Toxin Cleansing', therapies: 'Fasting, Colon Hydrotherapy, Mud' },
                    { name: 'Advanced Healing', dur: '21 Days', int: 'Very High', focus: 'Chronic Care', therapies: 'Acupuncture, Physio, Custom Diet' }
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: '1px solid rgba(220,160,50,0.07)', transition: 'background 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(94,39,53,0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1.2rem', fontWeight: 600, color: 'var(--tan)' }}>{row.name}</td>
                      <td style={{ padding: '1.2rem', color: 'rgba(220,195,175,0.8)' }}>{row.dur}</td>
                      <td style={{ padding: '1.2rem' }}>
                        <span style={{
                          fontSize: '0.7rem', padding: '0.25rem 0.7rem', borderRadius: '50px',
                          backgroundColor: row.int === 'Very High' ? 'rgba(184,94,76,0.25)' : row.int === 'High' ? 'rgba(220,160,50,0.15)' : 'rgba(179,186,142,0.18)',
                          color: row.int === 'Very High' ? 'var(--redwood)' : row.int === 'High' ? 'var(--harvest-gold)' : 'var(--sage)',
                          fontWeight: 700,
                          border: `1px solid ${row.int === 'Very High' ? 'rgba(184,94,76,0.3)' : row.int === 'High' ? 'rgba(220,160,50,0.25)' : 'rgba(179,186,142,0.25)'}`
                        }}>
                          {row.int}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem', color: 'rgba(220,195,175,0.8)' }}>{row.focus}</td>
                      <td style={{ padding: '1.2rem', color: 'rgba(220,195,175,0.55)', fontSize: '0.78rem' }}>{row.therapies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 5: WHAT'S INCLUDED (Antique White / Isabelline Bento Grid) --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '6rem 6%', backgroundColor: 'var(--antique-white)', position: 'relative', overflow: 'hidden' }}>
        {/* Sage blob */}
        <div style={{ position: 'absolute', top: '-100px', left: '-80px', maxWidth: '350px', width: '100%', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(179,186,142,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Pale Dogwood blob */}
        <div style={{ position: 'absolute', bottom: '-80px', right: '-60px', maxWidth: '320px', width: '100%', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,215,204,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
                ✦ The Checklist
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--wine)', fontWeight: 500, lineHeight: 1.15, margin: 0 }}>
                Included in<br />Every Program
              </h2>
            </div>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.6, maxWidth: '340px', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
              Regardless of package intensity, every guest at Suprada receives these standard elite services.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="bento-grid-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto auto auto',
            gap: '1rem'
          }}>
            {/* Hero Card — spans 8 columns, row 1 — Wine gradient with Tan text */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                gridColumn: '1 / 9',
                gridRow: '1 / 2',
                background: 'linear-gradient(135deg, var(--wine) 0%, #3a1520 60%, #2a0e18 100%)',
                borderRadius: '20px',
                padding: '2rem 2.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '180px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(220,160,50,0.14)'
              }}
            >
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', border: '1px solid rgba(220,160,50,0.08)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(220,160,50,0.3), rgba(220,160,50,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', border: '1px solid rgba(220,160,50,0.25)' }}>
                  {whatIsIncluded[0].icon}
                </div>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--harvest-gold)', backgroundColor: 'rgba(220,160,50,0.12)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 800, letterSpacing: '0.1em', border: '1px solid rgba(220,160,50,0.2)' }}>
                  Core Service
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--tan)', fontWeight: 500, marginBottom: '0.3rem' }}>
                {whatIsIncluded[0].title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(220,195,175,0.7)', lineHeight: 1.6, maxWidth: '400px' }}>
                {whatIsIncluded[0].desc}
              </p>
            </motion.div>

            {/* Accent Card — 4 columns, row 1 — Isabelline with Sage & Wine accents */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              style={{
                gridColumn: '9 / 13',
                gridRow: '1 / 2',
                background: 'linear-gradient(160deg, rgba(179,186,142,0.25) 0%, rgba(179,186,142,0.06) 100%)',
                borderRadius: '20px',
                padding: '1.8rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.2rem',
                border: '1px solid rgba(179,186,142,0.3)',
                minHeight: '180px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--isabelline)'
              }}
            >
              {[whatIsIncluded[1], whatIsIncluded[2]].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: i === 0 ? 'rgba(94,39,53,0.12)' : 'rgba(179,186,142,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                    border: `1px solid ${i === 0 ? 'rgba(94,39,53,0.2)' : 'rgba(179,186,142,0.4)'}`
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--wine)', fontWeight: 500, margin: '0 0 0.2rem 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--raisin-black)', opacity: 0.6, lineHeight: 1.5, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom rows — remaining items in 4-col cards, isabelline bg with wine/sage accents */}
            {whatIsIncluded.slice(3).map((item, idx) => (
              <motion.div
                key={idx + 3}
                whileHover={{ y: -5, borderColor: 'rgba(94,39,53,0.25)' }}
                transition={{ duration: 0.3 }}
                style={{
                  gridColumn: `span 4`,
                  backgroundColor: idx % 3 === 1 ? 'var(--pale-dogwood)' : idx % 3 === 2 ? '#e8ede0' : 'var(--isabelline)',
                  borderRadius: '16px',
                  padding: '1.4rem 1.3rem',
                  border: '1px solid rgba(94,39,53,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  cursor: 'default',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="flex-stack-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(94,39,53,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                    border: '1px solid rgba(94,39,53,0.15)'
                  }}>
                    {item.icon}
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--wine)', fontWeight: 500, margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--raisin-black)', opacity: 0.65, lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 6: SUPRADA ADVANTAGE (Brand-bg warm clay with Wine accents) --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '6rem 6%', backgroundColor: 'var(--brand-bg)', position: 'relative', overflow: 'hidden' }}>
        {/* Redwood blob */}
        <div style={{ position: 'absolute', top: '-80px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,94,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>
              ✦ The Advantage
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--wine)', fontWeight: 500 }}>
              The Suprada Advantage
            </h2>
          </div>

          {/* Timeline — Wine accented */}
          <div style={{ position: 'relative', paddingLeft: '4rem' }}>
            {/* Vertical wine-to-harvest gold line */}
            <div style={{ position: 'absolute', left: '18px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--wine), var(--harvest-gold), rgba(220,160,50,0.15))', borderRadius: '2px' }} />

            {advantages.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{
                  position: 'relative',
                  paddingBottom: idx === advantages.length - 1 ? 0 : '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                {/* Numbered circle — wine bg with harvest gold border */}
                <div style={{
                  position: 'absolute',
                  left: '-4rem',
                  top: '2px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-bg)',
                  border: '2px solid var(--wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--wine)',
                  zIndex: 2
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--wine)', fontWeight: 500, margin: 0 }}>
                  {adv.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.65, lineHeight: 1.7, margin: 0 }}>
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- SECTION 7: FINAL CTA (Deep Wine gradient — mirrors Stay CTA) --- */}
      {/* ========================================================================= */}
      <section style={{
        padding: '6rem 6%',
        background: 'linear-gradient(135deg, var(--wine) 0%, #3a1520 50%, #2a0e18 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Twinkling lights for depth */}
        <TwinklingLights count={18} />
        <GoldEmberParticles count={15} />

        {/* Subtle dot pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(220,160,50,0.05) 1px, transparent 0)', backgroundSize: '20px 20px', pointerEvents: 'none', zIndex: 1 }} />
        
        {/* Sage accent top-left */}
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(179,186,142,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        {/* Harvest gold accent bottom-right */}
        <div style={{ position: 'absolute', bottom: '-80px', right: '-60px', maxWidth: '320px', width: '100%', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ color: 'var(--harvest-gold)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 800, display: 'block', marginBottom: '1.2rem' }}>
            ✦ Begin Your Journey ✦
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--tan)', marginBottom: '1rem', fontWeight: 500 }}>
            Ready to Begin Your Healing Journey?
          </h2>
          <p style={{ color: 'rgba(220,195,175,0.7)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Our physicians are ready to design your personalized wellness protocol.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '1rem 2.5rem', fontSize: '0.82rem', letterSpacing: '0.12em' }}
            >
              Speak to a Doctor
            </button>
            <button
              onClick={() => onNavigate('stay')}
              style={{
                background: 'none',
                border: '1.5px solid var(--tan)',
                color: 'var(--tan)',
                cursor: 'pointer',
                padding: '1rem 2.5rem',
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              View Accommodations
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
