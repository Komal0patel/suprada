// Suprada Wellness Sanctuary - About Us Page
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27, Pattern28 } from '../AnimatedPatterns';
import { Leaf, Target, Sparkles, Stethoscope, Building, Sun, Droplet, Ban, Check } from 'lucide-react';

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

const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const AnimatedParagraph = ({ text, style, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.02, delayChildren: delay }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
  };
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
      style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={item}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

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
      image: "/assets/Founders/sunil_jayaraj.jpg",
      tags: ["PhD Mechanical Engg.", "World Marathoner", "Chairman", "Systems Architect"]
    },
    premasudha: {
      name: "Dr. Prema Ramadas",
      role: "Co-Founder & Medical Director",
      badge: "US Board Certified MD",
      quote: "Precision clinical science and ancient Indian heritage are not opposites — they are partners in restorative healing.",
      bio: "US Board-Certified in Internal Medicine with 16+ years of hospital and clinical experience. Her passion for India's traditional healing sciences led to the creation of Suprada's integrative drugless medical protocols.",
      image: "/assets/Founders/prema_ramadas.jpg",
      tags: ["MD Internal Medicine", "16+ Yrs Clinical", "Co-Founder", "Vedic Integration"]
    }
  };

  const teamMembers = [
    { name: 'Dr. Sunil Jayaraj', role: 'Founder', company: 'Suprada Wellness', category: 'leadership', quote: 'Bringing athletic endurance and analytical systems to our sanctuary.', color: 'var(--wine)', initials: 'SJ' },
    { name: 'Dr. Prema Ramadas', role: 'Co-Founder', company: 'Suprada Wellness', category: ['leadership', 'clinical'], quote: 'Merging US clinical protocols with alternative Vedic therapies.', color: 'var(--wine)', initials: 'PR' },
    { name: 'Nagaraju', role: 'Chairman', company: 'Suprada Wellness', category: 'leadership', quote: 'Guiding Suprada’s vision towards holistic living and community wellness.', color: 'var(--wine)', initials: 'N' },
    { name: 'Srinivas Ramadas', role: 'Director Operations', company: 'Suprada Wellness', category: 'leadership', quote: 'Crafting the standard of luxury wellness operations.', color: 'var(--redwood)', initials: 'SR' },
    { name: 'Dr. Vinaya, B.N.Y.S', role: 'Chief Medical Officer', company: 'Suprada Holistic Wellness', category: ['clinical', 'mindfulness'], quote: 'Pioneering natural healing and drugless integrative medical protocols.', color: 'var(--sage)', initials: 'V' }
  ];

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
          CHAPTER I: Centered Occasions-Inspired Luxury Hero (Fitted to Screen Height)
          ========================================================================= */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5rem 6% 2.5rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Ambient Wine Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.07) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '15%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.1) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Background Mandala Watermark */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: '600px', height: '600px',
            opacity: 0.06,
            scale: heroMandalaScale,
            rotate: heroMandalaRotate,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordRevealContainer}
          style={{ position: 'relative', zIndex: 2, maxWidth: '820px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Official Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '85px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
            />
          </motion.div>

          {/* Centered Pill Badge */}
          <motion.div 
            initial={{ letterSpacing: '0.1em', opacity: 0, y: -10 }}
            animate={{ letterSpacing: '0.22em', opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              backgroundColor: 'rgba(94, 39, 53, 0.07)',
              padding: '0.3rem 1.2rem', borderRadius: '30px',
              border: '1px solid rgba(94, 39, 53, 0.2)',
              marginBottom: '1rem'
            }}
          >
            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.75rem' }}>✦</span>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700 }}>
              Our Story &amp; Philosophy
            </span>
          </motion.div>

          {/* Word-by-Word Revealed Main Headline */}
          <h1 style={{color: 'var(--wine)', 
            margin: '0 0 0.9rem 0', 
            lineHeight: 1.1, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.7rem', 
            flexWrap: 'wrap'}}>
            {["Where", "Science"].map((w, idx) => (
              <motion.span
                key={idx}
                variants={wordVariant}
                style={{ display: 'inline-block' }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariant}
              style={{ display: 'inline-block', fontStyle: 'italic', color: 'var(--redwood)' }}
            >
              Meets Heritage
            </motion.span>
          </h1>

          {/* Word-by-Word Revealed Paragraph */}
          <AnimatedParagraph 
            text="Bridging advanced clinical science with ancient Indian wisdom — Suprada is a 54-acre riverfront sanctuary on Kanakapura Road, dedicated to the drugless cellular restoration of body, mind, and spirit."
            style={{ 
              color: 'rgba(40, 38, 37, 0.88)', 
              maxWidth: '680px', 
              margin: '0 auto 1.4rem auto', 
              fontSize: 'var(--fs-body)', 
              lineHeight: 1.7, 
              fontWeight: 300, 
              justifyContent: 'center' 
            }}
            delay={0.4}
          />

          {/* Centered Key Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(94, 39, 53, 0.18)', padding: '0.4rem 1.1rem', borderRadius: '24px', fontSize: '0.78rem', color: 'var(--wine)' }}>
              <span><Leaf size={14} style={{ color: 'var(--redwood)' }} /></span> <span>54-Acre Riverfront Estate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(94, 39, 53, 0.18)', padding: '0.4rem 1.1rem', borderRadius: '24px', fontSize: '0.78rem', color: 'var(--wine)' }}>
              <span><Stethoscope size={14} style={{ color: 'var(--redwood)' }} /></span> <span>30+ Years Clinical Heritage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(94, 39, 53, 0.18)', padding: '0.4rem 1.1rem', borderRadius: '24px', fontSize: '0.78rem', color: 'var(--wine)' }}>
              <span><Building size={14} style={{ color: 'var(--redwood)' }} /></span> <span>9 Private Cottages</span>
            </div>
          </motion.div>

          {/* Centered CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => onNavigate('spaces')}
              className="btn-luxury"
              style={{ padding: '0.85rem 2.3rem', fontSize: '0.82rem', letterSpacing: '0.12em' }}
            >
              Explore Sanctuary &rarr;
            </button>
            <button
              onClick={() => onNavigate('programmes')}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(94, 39, 53, 0.3)',
                color: 'var(--wine)',
                cursor: 'pointer',
                padding: '0.85rem 2.1rem',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                fontWeight: 500,
                borderRadius: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94, 39, 53, 0.08)'; e.currentTarget.style.borderColor = 'var(--wine)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(94, 39, 53, 0.3)'; }}
            >
              View Programmes
            </button>
          </motion.div>

        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '1.2rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 4
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}
          >
            <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)', opacity: 0.7, fontWeight: 700 }}>Scroll</span>
            <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, var(--wine), transparent)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>

      </section>

      {/* =========================================================================
          CHAPTER II: Interactive Founders Spotlight Stage (Responsive Fit)
          ========================================================================= */}
      <section className="visionaries-section" style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ead9be 0%, #FAF0E6 25%, var(--antique-white) 100%)',
        padding: '3.5rem 6%',
        minHeight: '100dvh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>
              ✦ CHAPTER II • THE VISIONARIES
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              Where Global Expertise <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Meets Indian Heritage</em>
            </h2>

            {/* Founder Tabs */}
            <div className="founder-tabs-wrapper" style={{ display: 'inline-flex', gap: '0.5rem', backgroundColor: '#ffffff', padding: '0.25rem', borderRadius: '40px', border: '1.5px solid rgba(94, 39, 53, 0.15)', marginTop: '0.8rem', boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => setActiveFounder('sunil')}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeFounder === 'sunil' ? 'var(--wine)' : 'transparent',
                  color: activeFounder === 'sunil' ? '#ffffff' : 'var(--wine)',
                  fontSize: '0.82rem',
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
                  padding: '0.5rem 1.4rem',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeFounder === 'premasudha' ? 'var(--wine)' : 'transparent',
                  color: activeFounder === 'premasudha' ? '#ffffff' : 'var(--wine)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Dr. Prema Ramadas (Co-Founder)
              </button>
            </div>
          </div>

          {/* Active Founder Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFounder}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="founder-card-grid"
            >
              <div className="founder-card-image-box">
                <img
                  src={foundersData[activeFounder].image}
                  alt={foundersData[activeFounder].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(255,255,255,0.9) 100%)' }} />
                <div 
                  className={`pill-luxury ${activeFounder === 'sunil' ? 'active' : ''}`}
                  style={{
                    position: 'absolute', top: '1.2rem', left: '1.2rem',
                    textTransform: 'uppercase', letterSpacing: '0.15em',
                    fontSize: '0.65rem', padding: '0.3rem 0.8rem'
                  }}
                >
                  {foundersData[activeFounder].badge}
                </div>
              </div>

              <div className="founder-card-content">
                <span style={{ color: 'var(--redwood)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.25rem' }}>
                  {foundersData[activeFounder].role}
                </span>

                <h3 style={{color: 'var(--wine)', margin: '0 0 0.6rem 0'}}>
                  {foundersData[activeFounder].name}
                </h3>

                <h4 style={{fontStyle: 'italic', color: 'var(--wine)', lineHeight: 1.45, margin: '0 0 0.8rem 0'}}>
                  "{foundersData[activeFounder].quote}"
                </h4>

                <p style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.6, margin: '0 0 1.1rem 0' }}>
                  {foundersData[activeFounder].bio}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {foundersData[activeFounder].tags.map((t, idx) => (
                    <span key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)', fontSize: '0.65rem', fontWeight: 800, padding: '0.3rem 0.85rem', borderRadius: '20px' }}>
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
          CHAPTER III: Sacred Shloka Sanctum (Fitted to Screen Height)
          ========================================================================= */}
      {/* =========================================================================
          CHAPTER III: Sacred Shloka Sanctum (Fitted to Screen Height)
          ========================================================================= */}
      <section style={{
        boxSizing: 'border-box',
        padding: '4rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Ambient Wine & Gold Radial Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', maxWidth: '600px', width: '100%', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Botanical Mandala Watermark */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: '650px', height: '650px',
            opacity: 0.06, 
            scale: shlokaMandalaScale,
            rotate: shlokaMandalaRotate,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <Pattern25 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        <div style={{ maxWidth: '860px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
            ✦ CHAPTER III • THE ETERNAL HARMONY
          </span>

          <div style={{ display: 'inline-flex', gap: '0.4rem', backgroundColor: '#ffffff', padding: '0.3rem 0.4rem', borderRadius: '30px', marginBottom: '1.6rem', border: '1.5px solid rgba(94, 39, 53, 0.18)', boxShadow: '0 6px 20px rgba(94, 39, 53, 0.06)' }}>
            {[
              { id: 'sanskrit', label: 'Sanskrit Original' },
              { id: 'phonetics', label: 'Phonetics' },
              { id: 'meaning', label: 'Philosophical Meaning' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setShlokaTab(tab.id)}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: '24px',
                  border: 'none',
                  backgroundColor: shlokaTab === tab.id ? 'var(--wine)' : 'transparent',
                  color: shlokaTab === tab.id ? '#ffffff' : 'var(--wine)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h3 style={{color: 'var(--wine)', lineHeight: 1.5, marginBottom: '2rem', letterSpacing: '0.01em', maxWidth: '780px'}}>
            At Suprada, your journey is no longer a series of separate stops. It is <span style={{ color: 'var(--redwood)', borderBottom: '1.5px solid var(--redwood)', paddingBottom: '3px', fontWeight: 700 }}>The One Healing Journey</span> where you finally become one.
          </h3>

          <motion.div 
            initial={{ scale: 0.94, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              border: '2px solid var(--wine)', 
              padding: '1.8rem 1.4rem', 
              borderRadius: '50%', 
              width: '100%', 
              maxWidth: '300px', 
              aspectRatio: '1',
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.78)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 15px 45px rgba(94, 39, 53, 0.12), inset 0 0 25px rgba(94, 39, 53, 0.04)'
            }}
          >
            <span style={{ color: 'var(--redwood)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.6rem', fontWeight: 800 }}>Guiding Shloka</span>
            
            {shlokaTab === 'sanskrit' && (
              <h4 style={{letterSpacing: '0.01em', margin: 0, lineHeight: 1.4, color: 'var(--wine)', fontWeight: 700, fontSize: '1.15rem'}}>
                शरीरेन्द्रिय सत्त्वात्म संयोगे धारी जीवितम् इति आयुः
              </h4>
            )}

            {shlokaTab === 'phonetics' && (
              <h5 style={{color: 'var(--wine)', fontStyle: 'italic', lineHeight: 1.4, margin: 0, maxWidth: '220px', fontWeight: 600}}>
                "Sharirendriya satva atma samyoge dhari jivitam iti ayu"
              </h5>
            )}

            {shlokaTab === 'meaning' && (
              <p style={{ fontSize: '0.8rem', color: 'var(--raisin-black)', opacity: 0.92, maxWidth: '220px', lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
                "Life is the continuous, harmonious union of body, senses, mind, and soul."
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER IV: Grand Interactive Monolith Exhibition Stage (Compact Edition)
          ========================================================================= */}
      <section style={{ padding: '3.5rem 8%', position: 'relative', backgroundColor: 'var(--tea-green)' }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
              ✦ CHAPTER IV • THE THREE PILLARS
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              The Pillars of <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Suprada</em>
            </h2>
          </div>

          {/* 3-Tab Segmented Golden Pill Switcher Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
            {[
              { id: 0, num: '01', title: 'Vision', icon: <Leaf size={16} /> },
              { id: 1, num: '02', title: 'Mission', icon: <Target size={16} /> },
              { id: 2, num: '03', title: 'Core Values', icon: <Sparkles size={16} /> }
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
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1.5px solid var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.04)' }}>
                      <Leaf size={22} style={{ color: 'var(--wine)' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        PILLAR 01 • FOUNDATION
                      </span>
                      <h3 style={{color: 'var(--wine)', margin: 0}}>
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
                    <h4 style={{fontStyle: 'italic', color: 'var(--wine)', margin: 0, lineHeight: 1.45}}>
                      "To guide individuals toward inner harmony, biological balance, and holistic well-being."
                    </h4>
                  </div>

                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--wine)', opacity: 0.9, lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                    We eliminate artificial suppressants and reactivate the body’s innate chemistry. By treating root causes rather than symptoms, Suprada empowers guests to reclaim lifelong vitality.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['Cellular Fasting & Detox', 'Hydrotherapy Balancing', 'Restorative Sleep'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid var(--sage)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Check size={12} /> {item}</span>
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
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(220, 160, 50, 0.2)', border: '1.5px solid var(--harvest-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.2)' }}>
                      <Target size={22} style={{ color: 'var(--harvest-gold)' }} />
                    </div>
                    <div>
                      <span style={{ color: 'var(--harvest-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem' }}>
                        PILLAR 02 • CLINICAL SYNERGY
                      </span>
                      <h3 style={{color: 'var(--harvest-gold)', margin: 0}}>
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
                    <h4 style={{fontStyle: 'italic', color: 'var(--harvest-gold)', margin: 0, lineHeight: 1.45}}>
                      "Integrating traditional Indian healing sciences with modern evidence-based clinical diagnostics."
                    </h4>
                  </div>

                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--isabelline)', opacity: 0.92, lineHeight: 1.65, margin: '0 0 1rem 0', fontWeight: 300 }}>
                    Our medical framework bridges ancient scriptural wisdom with contemporary diagnostic precision. Anchored by US Board-Certified clinical oversight and pulse/iris profiling.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['US Board-Certified Oversight', 'Iris & Pulse Diagnostics', 'Biomarker Mapping'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--isabelline)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid rgba(220, 160, 50, 0.4)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Check size={12} /> {item}</span>
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
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1.5px solid var(--harvest-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.04)' }}>
                      <Sparkles size={22} style={{ color: 'var(--wine)' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        PILLAR 03 • ETHOS
                      </span>
                      <h3 style={{color: 'var(--wine)', margin: 0}}>
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
                    <h4 style={{fontStyle: 'italic', color: 'var(--wine)', margin: 0, lineHeight: 1.45}}>
                      "Rooted in reverence for Mother Nature, scriptural integrity, and caregiver compassion."
                    </h4>
                  </div>

                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--wine)', opacity: 0.9, lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                    Every interaction at Suprada is guided by a caregiver’s heart. We honor sacred Indian heritage while maintaining an unwavering commitment to sanctuary privacy.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['Reverence for Mother Nature', 'Personalized Trajectories', 'Scriptural Integrity', 'Caregiver’s Heart'].map((item, idx) => (
                      <span key={idx} style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.74rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '18px', border: '1px solid var(--harvest-gold)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Check size={12} /> {item}</span>
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
      <section style={{ padding: '5rem 8%', backgroundColor: 'var(--pale-dogwood)', position: 'relative' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
            ✦ CHAPTER V • INTIMACY & SCALE
          </span>
          <h2 style={{color: 'var(--wine)', marginBottom: '3.5rem',}}>
            Rooted in Nature, <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Designed for Intimacy</em>
          </h2>

          <div className="intimacy-metrics-grid">
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
                className="intimacy-metric-card"
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
                <span className="intimacy-metric-badge" style={{ fontSize: '0.66rem', color: stat.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1.2rem' }}>
                  {stat.badge}
                </span>

                {/* Perfect Circular Medallion */}
                <div className="intimacy-metric-circle" style={{
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
                  <div className="intimacy-metric-number" style={{ 
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
                
                <h4 className="intimacy-metric-label" style={{color: 'var(--wine)', margin: '0 0 0.4rem 0'}}>
                  {stat.label}
                </h4>
                
                <p className="intimacy-metric-sub" style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '190px', lineHeight: 1.45, margin: 0 }}>
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
      <section style={{ padding: '5.5rem 8%', position: 'relative', backgroundColor: 'var(--tan)' }}>
        <FloatingPetals count={5} color="var(--tea-green)" />

        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>CHAPTER VI • THE COLLECTIVE</span>
            <h2 style={{color: 'var(--wine)',}}>
              The People Behind <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Suprada</em>
            </h2>
          </div>

          <div className="collective-team-grid">
            <AnimatePresence mode="popLayout">
              {teamMembers.map((member, idx) => (
                <motion.div 
                  key={member.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onMouseEnter={() => setHoveredMember(idx)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="collective-member-card"
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
                    className="collective-avatar-circle"
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
                    {member.initials || member.name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/, '').replace(/,/g, '').split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  
                  <h4 className="collective-member-name" style={{color: 'var(--wine)', margin: 0, textAlign: 'center'}}>
                    {member.name}
                  </h4>
                  <span className="collective-member-role" style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
                    {member.role}
                  </span>
                  {member.company && (
                    <span className="collective-member-company" style={{ fontSize: '0.68rem', color: 'var(--wine)', opacity: 0.75, fontWeight: 600, textAlign: 'center', marginTop: '-0.3rem' }}>
                      {member.company}
                    </span>
                  )}

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
                        <span style={{ color: getOverlayTextColor(member.color) === 'var(--wine)' ? 'var(--wine)' : 'var(--harvest-gold)', fontSize: '2rem', lineHeight: 1, marginBottom: '0.5rem' }}>“</span>
                        <h4 style={{fontStyle: 'italic', lineHeight: 1.4, margin: 0}}>
                          {member.quote}
                        </h4>
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
          <h2 style={{color: 'var(--tan)', lineHeight: 1.15,}}>
            Nestled in the Heart of Nature
          </h2>
          <p style={{ opacity: 0.88, fontSize: 'var(--fs-body)', lineHeight: 1.7, fontWeight: 300 }}>
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
      <section style={{ padding: '5.5rem 8%', backgroundColor: 'var(--platinum)', position: 'relative' }}>
        <FloatingPetals count={6} color="var(--sage)" />

        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'stretch' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                ✦ Sustainability
              </span>
              <h2 style={{color: 'var(--wine)', lineHeight: 1.15}}>
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
                  <h4 style={{color: 'var(--wine)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem',}}>
                    <span>{key === 'solar' ? <Sun size={18} style={{ color: 'var(--harvest-gold)', display: 'inline-block', verticalAlign: 'middle' }} /> : key === 'water' ? <Droplet size={18} style={{ color: 'var(--redwood)', display: 'inline-block', verticalAlign: 'middle' }} /> : <Ban size={18} style={{ color: 'var(--wine)', display: 'inline-block', verticalAlign: 'middle' }} />}</span>
                    {hotspots[key].title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                    {hotspots[key].desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              minHeight: '480px',
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
                    <h5 style={{color: 'var(--wine)', margin: '0 0 0.25rem 0'}}>{hotspots[activeHotspot].title}</h5>
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
