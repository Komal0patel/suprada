import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27, Pattern28 } from '../AnimatedPatterns';

// Animated Counter Component
function AnimatedCounter({ value, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end || isNaN(end)) return;

    const totalMilliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// 3D Card Tilt Wrapper
function TiltCard({ children, style, className }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 20);
    setRotateY(x / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div style={{ transform: "translateZ(30px)", width: "100%", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Floating Petals Particle Animation
function FloatingPetals({ count = 8, color = 'var(--sage)' }) {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 20,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * -15,
      rotateStart: Math.random() * 360,
      swayWidth: 6 + Math.random() * 14
    }));
    setPetals(newPetals);
  }, [count]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-15%", x: `${p.x}%`, rotate: p.rotateStart, opacity: 0 }}
          animate={{ 
            y: ["-10%", "110%"],
            x: [`${p.x}%`, `${p.x + p.swayWidth}%`, `${p.x - p.swayWidth}%`, `${p.x}%`],
            rotate: [p.rotateStart, p.rotateStart + 360],
            opacity: [0, 0.45, 0.45, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            color: color
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 4 18 4 18S12 14 17 8Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function About({ onNavigate }) {
  const [activeFounder, setActiveFounder] = useState('sunil');
  const [activePillar, setActivePillar] = useState(0);
  const [shlokaTab, setShlokaTab] = useState('sanskrit');
  const [teamCategory, setTeamCategory] = useState('all');
  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState('solar');
  const scrollRef = useRef(null);

  const { scrollY } = useScroll();

  const heroMandalaScale = useTransform(scrollY, [0, 800], [1, 1.35]);
  const heroMandalaRotate = useTransform(scrollY, [0, 800], [0, 90]);
  
  const shlokaMandalaRotate = useTransform(scrollY, [600, 2000], [0, 120]);
  const shlokaMandalaScale = useTransform(scrollY, [600, 2000], [1, 1.25]);

  const foundersData = {
    sunil: {
      name: "Dr. Sunil Jayaraj",
      role: "Founder & Chairman",
      badge: "Blue Planet Runner & PhD",
      quote: "Athletic endurance is the structural logic of stilling the mind and awakening biological resilience.",
      bio: "Doctorate in Mechanical Engineering (USA). Known globally as the Blue Planet Runner — the only Indian athlete to run around the entire world across continents. His analytical systems and endurance discipline anchor Suprada's retreat architecture.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
      tags: ["PhD Mechanical Engg.", "World Marathoner", "Chairman", "Systems Architect"]
    },
    premasudha: {
      name: "Dr. Premasudha Ramadas",
      role: "Co-Founder & Medical Director",
      badge: "US Board Certified MD",
      quote: "Precision clinical science and ancient Indian heritage are not opposites — they are partners in restorative healing.",
      bio: "US Board-Certified in Internal Medicine with 16+ years of hospital and clinical experience. Her passion for India's traditional healing sciences led to the creation of Suprada's integrative drugless medical protocols.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
      tags: ["MD Internal Medicine", "16+ Yrs Clinical", "Co-Founder", "Vedic Integration"]
    }
  };

  const teamMembers = [
    { name: 'Sunil Jayaraj', role: 'Founder & Chairman', category: 'leadership', quote: 'Bringing athletic endurance and analytical systems to our sanctuary.', color: 'var(--wine)' },
    { name: 'Dr. Premasudha Ramdass', role: 'Co-Founder', category: 'leadership', quote: 'Merging US clinical protocols with alternative Vedic therapies.', color: 'var(--wine)' },
    { name: 'Srinivas Ramdass', role: 'Managing Director', category: 'leadership', quote: 'Crafting the standard of luxury wellness operations.', color: 'var(--redwood)' },
    { name: 'Dr. Lakshmi', role: 'Head, Naturopathy', category: 'clinical', quote: 'Reactivating the body’s innate chemistry via natural cures.', color: 'var(--sage)' },
    { name: 'Dr. Arjun Rao', role: 'Senior Holistic Physician', category: 'clinical', quote: 'Synthesizing tailored herbal medicine with pulse diagnostics.', color: 'var(--sage)' },
    { name: 'Priya Sharma', role: 'Yoga Master', category: 'mindfulness', quote: 'Reconnecting breath, flow, and energetic alignments.', color: 'var(--harvest-gold)' },
    { name: 'Meera Patel', role: 'Wellness Consultant', category: 'mindfulness', quote: 'Mapping out personal trajectories of healing from arrival to departure.', color: 'var(--harvest-gold)' },
    { name: 'Anil Deshmukh', role: 'Facilities Operations Lead', category: 'leadership', quote: 'Ensuring zero waste, solar conservation, and natural balance.', color: 'var(--redwood)' }
  ];

  const filteredTeam = teamMembers.filter(m => teamCategory === 'all' || m.category === teamCategory);

  const hotspots = {
    solar: {
      title: "Solar Grid Technology",
      coords: { top: "28%", left: "35%" },
      desc: "Harnessing clean solar power to offset 70% of energy usage and heat all running water across the retreat cabins."
    },
    water: {
      title: "Advanced Greywater Filtration",
      coords: { top: "68%", left: "55%" },
      desc: "Advanced purification system that recycles greywater to nurture our extensive organic herbal gardens and fields."
    },
    plastics: {
      title: "Zero Single-Use Plastics",
      coords: { top: "45%", left: "72%" },
      desc: "Strict eradication of single-use plastics. Mineral-rich natural drinking water is served in copper vessels for metabolic benefits."
    }
  };

  const getOverlayTextColor = (bgColor) => {
    if (bgColor === 'var(--sage)' || bgColor === 'var(--harvest-gold)') {
      return 'var(--wine)';
    }
    return 'var(--isabelline)';
  };

  return (
    <div ref={scrollRef} style={{ backgroundColor: 'var(--antique-white)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          CHAPTER I: Full-Viewport Cinematic Hero — Antique White → Deep Wine
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--antique-white)',
        marginTop: 0,
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>

        {/* ── Left half: Deep wine panel ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '52%', height: '100%',
          background: 'linear-gradient(160deg, var(--wine) 0%, #2a0e18 100%)',
          clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)',
          zIndex: 1
        }} />

        {/* ── Parallax rotating mandala centred on dividing line ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '44%',
            x: '-50%', y: '-50%',
            maxWidth: '680px', width: '100%', height: '680px',
            opacity: 0.07,
            scale: heroMandalaScale,
            rotate: heroMandalaRotate,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--harvest-gold)' }} />
        </motion.div>

        {/* ── Sage color blob — bottom right ── */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px',
          maxWidth: '420px', width: '100%', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(179,186,142,0.25) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* ── Harvest gold glow — top left (inside wine panel) ── */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          maxWidth: '340px', width: '100%', height: '340px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 2
        }} />

        {/* ── Floating petals ── */}
        <FloatingPetals count={6} color="rgba(220,160,50,0.5)" />

        {/* ── Main content grid ── */}
        <div className="hero-grid-split" style={{
          maxWidth: '1280px', width: '100%',
          margin: '0 auto', padding: '0 8%',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '5rem',
          alignItems: 'center',
          position: 'relative', zIndex: 3
        }}>

          {/* ── LEFT: Dark-side narrative ── */}
          <div style={{ color: 'var(--isabelline)', paddingTop: '3rem' }}>
            {/* Chapter pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                backgroundColor: 'rgba(220,160,50,0.15)',
                padding: '0.25rem 1.3rem 0.15rem 1.3rem', borderRadius: '30px',
                border: '1px solid rgba(220,160,50,0.35)',
                marginBottom: '1rem'
              }}
            >
              <span style={{ color: 'var(--harvest-gold)', fontSize: '0.78rem', lineHeight: 1 }}>✦</span>
              <span style={{ color: 'var(--tan)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 800, lineHeight: 1, position: 'relative', top: '1px' }}>
                Our Story • The Sanctuary
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3.2rem, 5.8vw, 5.8rem)',
                color: 'var(--tan)',
                fontWeight: 400,
                lineHeight: 1.05,
                margin: '0 0 1.6rem 0',
                letterSpacing: '-0.01em'
              }}
            >
              Where Science<br />
              <em style={{ fontStyle: 'italic', color: 'var(--harvest-gold)', fontWeight: 300 }}>Meets Heritage</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                color: 'var(--isabelline)', opacity: 0.82,
                fontSize: '1.1rem', lineHeight: 1.85, fontWeight: 300,
                marginBottom: '2.2rem', maxWidth: '540px'
              }}
            >
              Bridging advanced clinical science with ancient Indian wisdom, Suprada is a riverfront sanctuary on Kanakapura Road — dedicated to the drugless restoration of body, mind, and spirit.
            </motion.p>

            {/* Stat pills row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.4rem' }}
            >
              {[
                { num: '54', unit: 'Acres', desc: 'Riverfront Estate' },
                { num: '30+', unit: 'Years', desc: 'Clinical Heritage' },
                { num: '9', unit: 'Cottages', desc: 'Private Sanctuaries' },
                { num: '5', unit: 'Pillars', desc: 'of Wellness' }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, borderColor: 'rgba(220,160,50,0.45)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '0.8rem 1.1rem', borderRadius: '14px',
                    backgroundColor: 'rgba(220,160,50,0.08)',
                    border: '1px solid rgba(220,160,50,0.2)',
                    minWidth: '86px', cursor: 'default'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--harvest-gold)', fontWeight: 600, lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--tan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, opacity: 0.75 }}>{s.unit}</span>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(220,195,175,0.6)', marginTop: '0.25rem', textAlign: 'center', lineHeight: 1.3 }}>{s.desc}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => onNavigate('spaces')}
                className="btn-luxury"
                style={{ padding: '1rem 2.4rem', fontSize: '0.84rem', letterSpacing: '0.1em' }}
              >
                Explore Sanctuary →
              </button>
              <button
                onClick={() => onNavigate('programmes')}
                style={{
                  background: 'none', border: '1.5px solid rgba(220,195,175,0.3)',
                  color: 'rgba(220,195,175,0.75)', cursor: 'pointer',
                  padding: '1rem 2rem', fontSize: '0.82rem',
                  letterSpacing: '0.08em', fontWeight: 500, borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(220,160,50,0.55)'; e.currentTarget.style.color = 'var(--tan)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(220,195,175,0.3)'; e.currentTarget.style.color = 'rgba(220,195,175,0.75)'; }}
              >
                View Programs
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: Layered image mosaic (light side) ── */}
          <div style={{ position: 'relative' }}>

            {/* Decorative quote card — floating above-left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              style={{
                position: 'absolute',
                top: '-2.5rem', left: '-2.5rem',
                zIndex: 5,
                backgroundColor: 'var(--wine)',
                color: 'var(--tan)',
                borderRadius: '16px',
                padding: '1rem 1.4rem',
                maxWidth: '220px',
                boxShadow: '0 12px 35px rgba(94,39,53,0.4)',
                border: '1px solid rgba(220,160,50,0.25)'
              }}
            >
              <div style={{ fontSize: '1.5rem', color: 'var(--harvest-gold)', lineHeight: 1, marginBottom: '0.4rem' }}>"</div>
              <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: 1.5, margin: 0, color: 'var(--tan)' }}>
                Healing begins where nature and science meet in silence.
              </p>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--harvest-gold)', fontWeight: 800, display: 'block', marginTop: '0.6rem' }}>Dr. Sunil Jayaraj</span>
            </motion.div>

            {/* Main arched hero image */}
            <TiltCard style={{ width: '100%', height: '420px' }}>
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '180px 180px 24px 24px',
                overflow: 'hidden', position: 'relative',
                boxShadow: '0 30px 70px rgba(94,39,53,0.25)',
                border: '4px solid rgba(220, 160, 50, 0.35)'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                  alt="Suprada Sanctuary Estate"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,21,32,0.75) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '1.8rem', left: '1.5rem', right: '1.5rem', textAlign: 'center' }}>
                  <span style={{ color: 'var(--harvest-gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '0.2rem' }}>Suvarnamukhi Riverfront</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--tan)', fontWeight: 400, margin: 0 }}>54-Acre Healing Estate</h3>
                </div>
              </div>
            </TiltCard>

            {/* Two bottom accent images */}
            <div className="hero-grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.9rem' }}>
              {[
                { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', label: 'Clinical Healing', accent: 'var(--redwood)' },
                { src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=600&q=80', label: 'Nature Therapy', accent: 'var(--sage)' }
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    borderRadius: '16px', overflow: 'hidden', height: '110px',
                    position: 'relative',
                    border: `2px solid ${img.accent}44`,
                    boxShadow: '0 8px 24px rgba(94,39,53,0.12)',
                    cursor: 'pointer'
                  }}
                >
                  <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,21,32,0.65) 0%, transparent 60%)' }} />
                  <span style={{
                    position: 'absolute', bottom: '0.6rem', left: '0.7rem',
                    fontSize: '0.62rem', color: 'var(--tan)', fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.08em'
                  }}>{img.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Floating bottom-right badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem', right: '-1.5rem',
                zIndex: 5,
                backgroundColor: 'var(--harvest-gold)',
                color: 'var(--wine)',
                borderRadius: '50%',
                width: '90px', height: '90px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(220,160,50,0.35)',
                textAlign: 'center'
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}>Est.</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>Bangalore</span>
            </motion.div>
          </div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 4
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}
          >
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)', opacity: 0.5, fontWeight: 700 }}>Scroll</span>
            <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--wine), transparent)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>

      </section>

      {/* =========================================================================
          CHAPTER II: Interactive Founders Spotlight Stage
          ========================================================================= */}
      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--isabelline)', padding: '5.5rem 8%' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ CHAPTER II • THE VISIONARIES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
              Where Global Expertise <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Meets Indian Heritage</em>
            </h2>

            {/* Founder Tabs */}
            <div style={{ display: 'inline-flex', gap: '0.6rem', backgroundColor: '#ffffff', padding: '0.4rem', borderRadius: '40px', border: '1.5px solid rgba(94, 39, 53, 0.15)', marginTop: '2rem', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.05)' }}>
              <button
                onClick={() => setActiveFounder('sunil')}
                style={{
                  padding: '0.7rem 1.8rem',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeFounder === 'sunil' ? 'var(--wine)' : 'transparent',
                  color: activeFounder === 'sunil' ? '#ffffff' : 'var(--wine)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Dr. Sunil Jayaraj (Founder)
              </button>

              <button
                onClick={() => setActiveFounder('premasudha')}
                style={{
                  padding: '0.7rem 1.8rem',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeFounder === 'premasudha' ? 'var(--wine)' : 'transparent',
                  color: activeFounder === 'premasudha' ? '#ffffff' : 'var(--wine)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Dr. Premasudha Ramadas (Co-Founder)
              </button>
            </div>
          </div>

          {/* Active Founder Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFounder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28px',
                border: '1.5px solid rgba(94, 39, 53, 0.14)',
                boxShadow: '0 20px 50px rgba(94, 39, 53, 0.08)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center'
              }}
            >
              <div style={{ height: '440px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={foundersData[activeFounder].image}
                  alt={foundersData[activeFounder].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(255,255,255,0.9) 100%)' }} />
                <div style={{
                  position: 'absolute', top: '1.5rem', left: '1.5rem',
                  backgroundColor: activeFounder === 'sunil' ? 'linear-gradient(135deg, rgba(255, 238, 130, 0.95) 0%, rgba(234, 167, 40, 0.92) 50%, rgba(200, 130, 0, 0.95) 100%)' : 'var(--redwood)',
                  background: activeFounder === 'sunil' ? 'linear-gradient(135deg, rgba(255, 238, 130, 0.95) 0%, rgba(234, 167, 40, 0.92) 50%, rgba(200, 130, 0, 0.95) 100%)' : 'var(--redwood)',
                  color: activeFounder === 'sunil' ? '#2B1219' : '#ffffff',
                  fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.18em', padding: '0.4rem 1.2rem', borderRadius: '20px'
                }}>
                  {foundersData[activeFounder].badge}
                </div>
              </div>

              <div style={{ padding: '3rem 3.5rem' }}>
                <span style={{ color: 'var(--redwood)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.4rem' }}>
                  {foundersData[activeFounder].role}
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 1.2rem 0' }}>
                  {foundersData[activeFounder].name}
                </h3>

                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--wine)', lineHeight: 1.5, margin: '0 0 1.2rem 0' }}>
                  "{foundersData[activeFounder].quote}"
                </p>

                <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.7, margin: '0 0 1.6rem 0' }}>
                  {foundersData[activeFounder].bio}
                </p>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {foundersData[activeFounder].tags.map((t, idx) => (
                    <span key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)', fontSize: '0.68rem', fontWeight: 800, padding: '0.4rem 1rem', borderRadius: '20px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER III: Sacred Shloka Sanctum (Compact Size)
          ========================================================================= */}
      <section style={{ padding: '3.2rem 8%', background: 'linear-gradient(135deg, #141c13 0%, #2b1219 100%)', color: 'var(--isabelline)', position: 'relative', overflow: 'hidden' }}>
        
        <motion.div 
          style={{ 
            position: 'absolute', 
            top: '5%', 
            left: '5%', 
            maxWidth: '400px', width: '100%', 
            height: '400px', 
            opacity: 0.05, 
            scale: shlokaMandalaScale,
            rotate: shlokaMandalaRotate,
            pointerEvents: 'none' 
          }}
        >
          <Pattern25 style={{ width: '100%', height: '100%', color: 'var(--tan)' }} />
        </motion.div>

        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>
            ✦ CHAPTER III • THE ETERNAL HARMONY
          </span>

          <div style={{ display: 'inline-flex', gap: '0.3rem', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '0.25rem 0.35rem', borderRadius: '30px', marginBottom: '1.2rem', border: '1px solid rgba(220, 160, 50, 0.2)' }}>
            {[
              { id: 'sanskrit', label: 'Sanskrit Original' },
              { id: 'phonetics', label: 'Phonetics' },
              { id: 'meaning', label: 'Philosophical Meaning' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setShlokaTab(tab.id)}
                style={{
                  padding: '0.4rem 1.2rem',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: shlokaTab === tab.id ? 'var(--harvest-gold)' : 'transparent',
                  color: shlokaTab === tab.id ? '#2B1219' : 'var(--tan)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 300, color: 'var(--tan)', lineHeight: 1.45, marginBottom: '1.4rem', letterSpacing: '0.01em' }}>
            At Suprada, your journey is no longer a series of separate stops. It is <span style={{ color: '#ffffff', borderBottom: '1px solid var(--harvest-gold)', paddingBottom: '2px' }}>The One Healing Journey</span> where you finally become one.
          </h3>

          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              border: '1.5px solid var(--harvest-gold)', 
              padding: '1.2rem 1rem', 
              borderRadius: '50%', 
              width: '100%', 
              maxWidth: '260px', 
              aspectRatio: '1',
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              backgroundColor: 'rgba(44, 25, 30, 0.75)',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.35)'
            }}
          >
            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.4rem', fontWeight: 800 }}>Guiding Shloka</span>
            
            {shlokaTab === 'sanskrit' && (
              <p className="gold-foil-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '0.01em', margin: 0, lineHeight: 1.35 }}>
                शरीरेन्द्रिय सत्त्वात्म संयोगे धारी जीवितम् इति आयुः
              </p>
            )}

            {shlokaTab === 'phonetics' && (
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', color: 'var(--tan)', fontStyle: 'italic', lineHeight: 1.35, margin: 0, maxWidth: '200px' }}>
                "Sharirendriya satva atma samyoge dhari jivitam iti ayu"
              </p>
            )}

            {shlokaTab === 'meaning' && (
              <p style={{ fontSize: '0.72rem', color: '#ffffff', opacity: 0.92, maxWidth: '200px', lineHeight: 1.4, margin: 0 }}>
                "Life is the continuous, harmonious union of body, senses, mind, and soul."
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER IV: Grand Interactive Monolith Exhibition Stage (Compact Edition)
          ========================================================================= */}
      <section style={{ padding: '3.5rem 8%', position: 'relative', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
              ✦ CHAPTER IV • THE THREE PILLARS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
              The Pillars of <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Suprada</em>
            </h2>
          </div>

          {/* 3-Tab Segmented Golden Pill Switcher Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
            {[
              { id: 0, num: '01', title: 'Vision', icon: '🌿' },
              { id: 1, num: '02', title: 'Mission', icon: '🎯' },
              { id: 2, num: '03', title: 'Core Values', icon: '✨' }
            ].map((tab) => {
              const isActive = activePillar === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePillar(tab.id)}
                  style={{
                    backgroundColor: isActive ? 'var(--wine)' : '#ffffff',
                    color: isActive ? 'var(--harvest-gold)' : 'var(--wine)',
                    border: isActive ? '2px solid var(--harvest-gold)' : '1.5px solid rgba(94, 39, 53, 0.2)',
                    padding: '0.55rem 1.4rem',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    boxShadow: isActive ? '0 8px 22px rgba(94, 39, 53, 0.18)' : '0 3px 10px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)'
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                  <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>{tab.num}.</span>
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Grand Dynamic Exhibition Stage (Compact) */}
          <AnimatePresence mode="wait">
            {activePillar === 0 && (
              <motion.div
                key="vision-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                style={{
                  backgroundColor: 'var(--tea-green)',
                  borderRadius: '24px',
                  border: '1.5px solid var(--sage)',
                  boxShadow: '0 18px 45px rgba(94, 39, 53, 0.06)',
                  padding: '2.2rem 2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center'
                }}
              >
                {/* Left Showcase Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1.5px solid var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 6px 15px rgba(0,0,0,0.04)' }}>
                      🌿
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        PILLAR 01 • FOUNDATION
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.3rem', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
                        Vision
                      </h3>
                    </div>
                  </div>

                  <span style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.75rem', fontWeight: 700, padding: '0.45rem 1.1rem', borderRadius: '20px', border: '1px solid var(--sage)', boxShadow: '0 3px 10px rgba(0,0,0,0.03)', display: 'inline-block' }}>
                    ✦ 100% Drugless Naturopathy
                  </span>
                </div>

                {/* Right Content Column */}
                <div>
                  <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', backgroundColor: '#ffffff', borderLeft: '3px solid var(--sage)', marginBottom: '1rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--wine)', margin: 0, lineHeight: 1.45 }}>
                      "To guide individuals toward inner harmony, biological balance, and holistic well-being."
                    </p>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--wine)', opacity: 0.9, lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                    We eliminate artificial suppressants and reactivate the body’s innate chemistry. By treating root causes rather than symptoms, Suprada empowers guests to reclaim lifelong vitality.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['Cellular Fasting & Detox', 'Hydrotherapy Balancing', 'Restorative Sleep'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid var(--sage)' }}>
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === 1 && (
              <motion.div
                key="mission-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                style={{
                  backgroundColor: 'var(--wine)',
                  color: 'var(--isabelline)',
                  borderRadius: '24px',
                  border: '1.5px solid var(--harvest-gold)',
                  boxShadow: '0 18px 45px rgba(94, 39, 53, 0.22)',
                  padding: '2.2rem 2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center'
                }}
              >
                {/* Left Showcase Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(220, 160, 50, 0.2)', border: '1.5px solid var(--harvest-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 6px 15px rgba(0,0,0,0.2)' }}>
                      🎯
                    </div>
                    <div>
                      <span style={{ color: 'var(--harvest-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem' }}>
                        PILLAR 02 • CLINICAL SYNERGY
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.3rem', color: 'var(--harvest-gold)', fontWeight: 600, margin: 0 }}>
                        Mission
                      </h3>
                    </div>
                  </div>

                  <span style={{ backgroundColor: 'rgba(220, 160, 50, 0.2)', color: 'var(--tan)', fontSize: '0.75rem', fontWeight: 700, padding: '0.45rem 1.1rem', borderRadius: '20px', border: '1px solid var(--harvest-gold)', display: 'inline-block' }}>
                    ✦ Vedic Science & Clinical Diagnostics
                  </span>
                </div>

                {/* Right Content Column */}
                <div>
                  <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderLeft: '3px solid var(--harvest-gold)', marginBottom: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--harvest-gold)', margin: 0, lineHeight: 1.45 }}>
                      "Integrating traditional Indian healing sciences with modern evidence-based clinical diagnostics."
                    </p>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--isabelline)', opacity: 0.92, lineHeight: 1.65, margin: '0 0 1rem 0', fontWeight: 300 }}>
                    Our medical framework bridges ancient scriptural wisdom with contemporary diagnostic precision. Anchored by US Board-Certified clinical oversight and pulse/iris profiling.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['US Board-Certified Oversight', 'Iris & Pulse Diagnostics', 'Biomarker Mapping'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--isabelline)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid rgba(220, 160, 50, 0.4)' }}>
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === 2 && (
              <motion.div
                key="values-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                style={{
                  backgroundColor: 'rgba(220, 160, 50, 0.14)',
                  borderRadius: '24px',
                  border: '1.5px solid var(--harvest-gold)',
                  boxShadow: '0 18px 45px rgba(94, 39, 53, 0.06)',
                  padding: '2.2rem 2.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center'
                }}
              >
                {/* Left Showcase Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1.5px solid var(--harvest-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 6px 15px rgba(0,0,0,0.04)' }}>
                      ✨
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        PILLAR 03 • ETHOS
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.3rem', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
                        Core Values
                      </h3>
                    </div>
                  </div>

                  <span style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.75rem', fontWeight: 700, padding: '0.45rem 1.1rem', borderRadius: '20px', border: '1px solid var(--harvest-gold)', boxShadow: '0 3px 10px rgba(0,0,0,0.03)', display: 'inline-block' }}>
                    ✦ Sacred Caregiver Compassion
                  </span>
                </div>

                {/* Right Content Column */}
                <div>
                  <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', backgroundColor: '#ffffff', borderLeft: '3px solid var(--harvest-gold)', marginBottom: '1rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--wine)', margin: 0, lineHeight: 1.45 }}>
                      "Rooted in reverence for Mother Nature, scriptural integrity, and caregiver compassion."
                    </p>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--wine)', opacity: 0.9, lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                    Every interaction at Suprada is guided by a caregiver’s heart. We honor sacred Indian heritage while maintaining an unwavering commitment to sanctuary privacy.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['Reverence for Mother Nature', 'Personalized Trajectories', 'Scriptural Integrity', 'Caregiver’s Heart'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid var(--harvest-gold)' }}>
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER V: Intimate Scale & Metrics
          ========================================================================= */}
      <section style={{ padding: '5rem 8%', backgroundColor: 'var(--isabelline)', position: 'relative' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
            ✦ CHAPTER V • INTIMACY & SCALE
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', color: 'var(--wine)', marginBottom: '3.5rem', fontWeight: 600 }}>
            Rooted in Nature, <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Designed for Intimacy</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem' }}>
            {[
              { 
                target: "50", 
                label: "Max Guests Only", 
                sub: "Intimate, personalized therapeutic care", 
                color: 'var(--wine)', 
                bgTint: 'rgba(94, 39, 53, 0.06)',
                borderColor: 'var(--wine)',
                badge: "✦ INTIMATE CARE" 
              },
              { 
                target: "30", 
                label: "Therapy Suites", 
                sub: "Dedicated individual treatment zones", 
                color: 'var(--redwood)', 
                bgTint: 'rgba(184, 94, 76, 0.08)',
                borderColor: 'var(--redwood)',
                badge: "✦ PRIVATE ZONES" 
              },
              { 
                target: "10", 
                label: "Acres of Greenery", 
                sub: "Immersive organic forest environment", 
                color: '#3d6346', 
                bgTint: 'rgba(125, 155, 132, 0.16)',
                borderColor: 'var(--sage)',
                badge: "✦ FOREST SANCTUARY" 
              },
              { 
                target: "3", 
                label: "Bespoke Pavilions", 
                sub: "Holistic treatment hubs", 
                color: '#b87e22', 
                bgTint: 'rgba(220, 160, 50, 0.14)',
                borderColor: 'var(--harvest-gold)',
                badge: "✦ HOLISTIC HUBS" 
              }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(94, 39, 53, 0.09)' }}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '24px', 
                  padding: '2.5rem 1.6rem 2.2rem 1.6rem', 
                  border: `1.5px solid ${stat.borderColor}`,
                  boxShadow: '0 10px 28px rgba(94, 39, 53, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                {/* Top Badge */}
                <span style={{ fontSize: '0.66rem', color: stat.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1.2rem' }}>
                  {stat.badge}
                </span>

                {/* Perfect Circular Medallion */}
                <div style={{
                  width: '115px',
                  height: '115px',
                  borderRadius: '50%',
                  backgroundColor: stat.bgTint,
                  border: `2px solid ${stat.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.4rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '2.8rem', 
                    color: stat.color, 
                    fontWeight: 700,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AnimatedCounter value={stat.target} />
                  </div>
                </div>
                
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 0.4rem 0' }}>
                  {stat.label}
                </h4>
                
                <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '190px', lineHeight: 1.45, margin: 0 }}>
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER VI: The Collective
          ========================================================================= */}
      <section style={{ padding: '5.5rem 8%', position: 'relative', backgroundColor: 'var(--antique-white)' }}>
        <FloatingPetals count={5} color="var(--tea-green)" />

        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>CHAPTER VI • THE COLLECTIVE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--wine)', fontWeight: 600 }}>
              The People Behind <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Suprada</em>
            </h2>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.8rem' }}>
              {[
                { id: 'all', label: 'All Collective' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'clinical', label: 'Clinical & Naturopathy' },
                { id: 'mindfulness', label: 'Mindfulness & Care' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setTeamCategory(cat.id)}
                  className={`quiz-option-chip ${teamCategory === cat.id ? 'selected' : ''}`}
                  style={{ padding: '0.55rem 1.4rem', fontSize: '0.8rem' }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', minHeight: '340px' }}>
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member, idx) => (
                <motion.div 
                  key={member.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onMouseEnter={() => setHoveredMember(idx)}
                  onMouseLeave={() => setHoveredMember(null)}
                  style={{
                    backgroundColor: '#ffffff', 
                    borderRadius: '20px', 
                    padding: '2.2rem 1.6rem',
                    border: '1.5px solid rgba(94, 39, 53, 0.12)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    gap: '1rem', 
                    boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    minHeight: '250px',
                    justifyContent: 'center'
                  }}
                >
                  <motion.div 
                    animate={{ 
                      scale: hoveredMember === idx ? 1.1 : 1,
                      backgroundColor: hoveredMember === idx ? member.color : 'rgba(94, 39, 53, 0.06)',
                      color: hoveredMember === idx ? getOverlayTextColor(member.color) : 'var(--wine)'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      width: '76px', 
                      height: '76px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: '1.3rem',
                      border: '1.5px solid rgba(94, 39, 53, 0.15)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                  >
                    {member.name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/, '').split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--wine)', margin: 0, fontWeight: 600, textAlign: 'center' }}>
                    {member.name}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
                    {member.role}
                  </span>

                  <AnimatePresence>
                    {hoveredMember === idx && (
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: member.color,
                          color: getOverlayTextColor(member.color),
                          padding: '1.8rem 1.4rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justify: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          zIndex: 3
                        }}
                      >
                        <span style={{ color: getOverlayTextColor(member.color) === 'var(--wine)' ? 'var(--wine)' : 'var(--harvest-gold)', fontSize: '2rem', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '0.5rem' }}>“</span>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>
                          {member.quote}
                        </p>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.8rem', opacity: 0.9, fontWeight: 700 }}>{member.name}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: Location & Sustainability
          ========================================================================= */}
      <section style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', minHeight: '480px', overflow: 'hidden', position: 'relative' }}>
        
        <div style={{ position: 'absolute', top: '-15%', right: '-5%', maxWidth: '380px', width: '100%', height: '380px', opacity: 0.05, pointerEvents: 'none' }}>
          <Pattern24 style={{ width: '100%', height: '100%', color: 'var(--tan)' }} />
        </div>

        <div style={{ padding: '5rem 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.4rem', position: 'relative', zIndex: 2 }}>
          <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700 }}>✦ The Location</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', color: 'var(--tan)', lineHeight: 1.15, fontWeight: 600 }}>
            Nestled in the Heart of Nature
          </h2>
          <p style={{ opacity: 0.88, fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 }}>
            Suprada stretches across 54 acres of lush greens and fragrant herbal fields along the banks of the sacred Suvarnamukhi River on Kanakapura Road, Bangalore. The gentle murmur of flowing water and pure natural air create an ideal landscape for nervous system regulation.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.5rem' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-luxury" 
              style={{ padding: '0.75rem 1.8rem', fontSize: '0.75rem' }}
            >
              Get Directions &rarr;
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '380px',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, var(--wine) 0%, transparent 100%)', opacity: 0.35 }} />
        </motion.div>
      </section>

      {/* Sustainability Radar */}
      <section style={{ padding: '5.5rem 8%', backgroundColor: 'var(--isabelline)', position: 'relative' }}>
        <FloatingPetals count={6} color="var(--sage)" />

        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                ✦ Sustainability
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', color: 'var(--wine)', fontWeight: 600, lineHeight: 1.15 }}>
                Giving Back In Our Own Way
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {Object.keys(hotspots).map((key) => (
                <motion.div 
                  key={key}
                  onClick={() => setActiveHotspot(key)}
                  whileHover={{ x: 4 }}
                  style={{
                    padding: '1.2rem 1.4rem',
                    borderRadius: '16px',
                    border: '1.5px solid',
                    borderColor: activeHotspot === key ? 'var(--harvest-gold)' : 'rgba(94, 39, 53, 0.12)',
                    backgroundColor: activeHotspot === key ? '#ffffff' : 'transparent',
                    cursor: 'pointer',
                    boxShadow: activeHotspot === key ? '0 10px 25px rgba(94, 39, 53, 0.06)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--wine)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                    <span>{key === 'solar' ? '☀️' : key === 'water' ? '💧' : '🚫'}</span>
                    {hotspots[key].title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                    {hotspots[key].desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              height: '400px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '24px',
              position: 'relative',
              boxShadow: '0 20px 45px rgba(94, 39, 53, 0.1)',
              border: '1.5px solid rgba(94, 39, 53, 0.12)',
              overflow: 'hidden'
            }}>
              {Object.keys(hotspots).map((key) => {
                const isActive = activeHotspot === key;
                return (
                  <div 
                    key={key}
                    onClick={() => setActiveHotspot(key)}
                    style={{
                      position: 'absolute',
                      top: hotspots[key].coords.top,
                      left: hotspots[key].coords.left,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <motion.div 
                      animate={{ scale: isActive ? [1, 2.5] : [1, 1.6], opacity: [0.65, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '-15px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--harvest-gold)',
                        pointerEvents: 'none'
                      }}
                    />
                    
                    <motion.div 
                      animate={{ 
                        scale: isActive ? 1.25 : 1.0,
                        backgroundColor: isActive ? 'var(--harvest-gold)' : 'var(--wine)'
                      }}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '2.5px solid #ffffff',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        transition: 'background-color 0.3s ease'
                      }}
                    />
                  </div>
                );
              })}

              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '18px',
                right: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '1.1rem 1.3rem',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                border: '1.5px solid var(--harvest-gold)',
                zIndex: 11
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHotspot}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.15rem' }}>Eco Feature Active</span>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{hotspots[activeHotspot].title}</h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.45, margin: 0 }}>{hotspots[activeHotspot].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
