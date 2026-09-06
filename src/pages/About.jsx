// Suprada Wellness - About Us Page
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
      name: "Mr. Sunil Jayaraj",
      role: "Founder & Chairman",
      badge: "Blue Planet Runner & PhD",
      quote: "Athletic endurance is the structural logic of stilling the mind and awakening biological resilience.",
      bio: "Doctorate in Mechanical Engineering (USA). Known globally as the Blue Planet Runner — the only Indian athlete to run around the entire world across continents. His analytical systems and endurance discipline anchor Suprada's retreat architecture.",
      image: "/assets/Founders/sunil_jayaraj.jpg",
      objectPosition: "center 18%",
      tags: ["PhD Mechanical Engg.", "World Marathoner", "Chairman", "Systems Architect"]
    },
    premasudha: {
      name: "Dr. Prema Ramadas, MD",
      role: "Co-Founder & Medical Director",
      badge: "US Board Certified MD",
      quote: "Precision clinical science and ancient Indian heritage are not opposites — they are partners in restorative healing.",
      bio: "US Board-Certified in Internal Medicine with 16+ years of hospital and clinical experience. Her passion for India's traditional healing sciences led to the creation of Suprada's integrative drugless medical protocols.",
      image: "/assets/Founders/prema_ramadas.jpg",
      objectPosition: "center 15%",
      tags: ["MD Internal Medicine", "16+ Yrs Clinical", "Co-Founder", "Vedic Integration"]
    }
  };

  const teamMembers = [
    { name: 'Late Mrs. Renuka Nagaraju', role: 'Founder Inspiration', company: 'Suprada Wellness', category: 'leadership', quote: 'Inspiring Suprada’s core vision of compassionate holistic living and sacred healing.', color: 'var(--wine)', initials: 'RN' },
    { name: 'Acharya Dr. M. Nagaraju', role: 'Chairperson', company: 'Suprada Wellness', category: 'leadership', quote: 'Pioneering traditional Vedic wisdom and holistic health systems.', color: 'var(--wine)', initials: 'AN' },
    { name: 'Mr. Sunil Jayaraj', role: 'Founder', company: 'Suprada Wellness', category: 'leadership', quote: 'Bringing athletic endurance and analytical systems to our retreat.', color: 'var(--wine)', initials: 'SJ' },
    { name: 'Dr. Prema Ramadas, MD', role: 'Co-Founder', company: 'Suprada Wellness', category: ['leadership', 'clinical'], quote: 'Merging US clinical protocols with alternative Vedic therapies.', color: 'var(--wine)', initials: 'PR' },
    { name: 'Smt. Priya Amaresh', role: 'Chief Yoga and Wellness Advisor', company: 'Suprada Wellness', category: ['leadership', 'mindfulness'], quote: 'Guiding classical yoga practices, pranayama, and holistic lifestyle integration.', color: 'var(--wine)', initials: 'PA' },
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
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(260px, 38vw, 440px)', height: 'clamp(260px, 38vw, 440px)',
            opacity: 0.08,
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
            text="Bridging advanced clinical science with ancient Indian wisdom — Suprada is a riverfront haven on Kanakapura Road, dedicated to the drugless cellular restoration of body, mind, and spirit."
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
              <span><Leaf size={14} style={{ color: 'var(--redwood)' }} /></span> <span>Riverfront Haven Estate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(94, 39, 53, 0.18)', padding: '0.4rem 1.1rem', borderRadius: '24px', fontSize: '0.78rem', color: 'var(--wine)' }}>
              <span><Stethoscope size={14} style={{ color: 'var(--redwood)' }} /></span> <span>Decades of Clinical Heritage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(94, 39, 53, 0.18)', padding: '0.4rem 1.1rem', borderRadius: '24px', fontSize: '0.78rem', color: 'var(--wine)' }}>
              <span><Building size={14} style={{ color: 'var(--redwood)' }} /></span> <span>Private Eco Cottages</span>
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
              Explore Retreat &rarr;
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
              ✦ THE VISIONARIES
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
                Mr. Sunil Jayaraj (Founder)
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
                Dr. Prema Ramadas, MD (Co-Founder)
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
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: foundersData[activeFounder].objectPosition || 'center top'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(255,255,255,0.9) 100%)' }} />
                <div className="founder-badge-overlay">
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
          SACRED SHLOKA SANCTUM (Guiding Principle)
          ========================================================================= */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6%',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Ambient Radial Soft Glow */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', maxWidth: '700px', width: '100%', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Botanical Leaf Line Art Watermark (Matching Occasions Page) */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '750px', height: '750px',
            opacity: 0.12, 
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <Pattern25 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </div>

        <div style={{ maxWidth: '880px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
            ✦ THE ETERNAL HARMONY
          </span>

          <h3 style={{color: 'var(--wine)', lineHeight: 1.5, marginBottom: '2.5rem', letterSpacing: '0.01em', maxWidth: '780px', margin: '0 auto 2.5rem auto'}}>
            At Suprada, your journey is no longer a series of separate stops. It is <span style={{ color: 'var(--redwood)', borderBottom: '1.5px solid var(--redwood)', paddingBottom: '3px', fontWeight: 700 }}>The One Healing Journey</span> where you finally become one.
          </h3>

          {/* Shloka Card Container (Matching Occasions Card Design) */}
          <motion.div 
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.92)', 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '24px', 
              padding: '3.2rem 3.5rem 3.5rem 3.5rem', 
              boxShadow: '0 20px 45px rgba(94, 39, 53, 0.08)',
              position: 'relative',
              overflow: 'hidden',
              color: 'var(--wine)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid rgba(94, 39, 53, 0.12)',
              borderBottom: '5px solid var(--wine)'
            }}
          >
            {/* Watermark Leaf Outline Inside Card */}
            <div 
              style={{ 
                position: 'absolute', 
                right: '-40px', 
                bottom: '-40px',
                width: '320px', 
                height: '320px',
                opacity: 0.1, 
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <Pattern25 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
            </div>

            {/* Content Stack */}
            <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <span style={{ 
                color: 'var(--redwood)', 
                fontSize: '0.74rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.22em', 
                marginBottom: '1.2rem',
                display: 'block'
              }}>
                Guiding Principle
              </span>

              {/* Sanskrit Original */}
              <motion.h4 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(1.2rem, 2.3vw, 1.6rem)',
                  color: 'var(--wine)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  lineHeight: 1.5,
                  margin: '0 0 0.7rem 0',
                  letterSpacing: '0.01em',
                  maxWidth: '700px'
                }}
              >
                शरीरेन्द्रिय सत्त्वात्म संयोगे धारी जीवितम् इति आयुः।
              </motion.h4>

              {/* Phonetics */}
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--wine)',
                  opacity: 0.85,
                  fontStyle: 'italic',
                  margin: '0 0 1.4rem 0',
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                Sharirendriya satva atma samyoge dhari jivitam iti ayu.
              </motion.p>

              {/* Horizontal Line Divider */}
              <div style={{ width: '220px', height: '1px', backgroundColor: 'rgba(94, 39, 53, 0.15)', margin: '0.2rem auto 1.2rem auto' }} />

              {/* Philosophical Meaning */}
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--raisin-black)',
                  opacity: 0.88,
                  lineHeight: 1.6,
                  margin: 0,
                  fontWeight: 500,
                  maxWidth: '620px'
                }}
              >
                (Life is the harmony of body, senses, mind, and soul.)
              </motion.p>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER IV: Grand Interactive Monolith Exhibition Stage (Compact Edition)
          ========================================================================= */}
      <section style={{ padding: '3.5rem 8%', position: 'relative', backgroundColor: 'var(--isabelline)' }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
              ✦ THE THREE PILLARS
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              The Pillars of <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Suprada</em>
            </h2>
          </div>

          {/* 3-Tab Segmented Golden Pill Switcher Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
            {[
              { id: 0, title: 'Vision', icon: <Leaf size={16} /> },
              { id: 1, title: 'Mission', icon: <Target size={16} /> },
              { id: 2, title: 'Core Values', icon: <Sparkles size={16} /> }
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
                        FOUNDATION
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
                        CLINICAL SYNERGY
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
                    Our medical framework bridges ancient scriptural wisdom with contemporary diagnostic precision. Anchored by clinical oversight and pulse/iris profiling.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['Clinical Oversight', 'Iris & Pulse Diagnostics', 'Biomarker Mapping'].map((item, idx) => (
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
                        ETHOS
                      </span>
                      <h3 style={{color: 'var(--wine)', margin: 0}}>
                        Core Values
                      </h3>
                    </div>
                  </div>

                  <span style={{ backgroundColor: '#ffffff', color: 'var(--wine)', fontSize: '0.75rem', fontWeight: 700, padding: '0.45rem 1.1rem', borderRadius: '20px', border: '1px solid var(--harvest-gold)', boxShadow: '0 3px 10px rgba(0,0,0,0.03)', display: 'inline-block' }}>
                    ✦ Customised Healing
                  </span>
                </div>

                {/* Right Content Column */}
                <div>
                  <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', backgroundColor: '#ffffff', borderLeft: '3px solid var(--harvest-gold)', marginBottom: '1rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                    <h4 style={{fontStyle: 'italic', color: 'var(--wine)', margin: 0, lineHeight: 1.45}}>
                      "Rooted in reverence for Mother Nature, scriptural integrity, and customised healing."
                    </h4>
                  </div>

                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--wine)', opacity: 0.9, lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                    Every interaction at Suprada is guided by customised healing. We honor sacred Indian heritage while maintaining an unwavering commitment to guest privacy.
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['Reverence for Mother Nature', 'Personalized Trajectories', 'Scriptural Integrity', 'Customised Healing'].map((item, idx) => (
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
            Suprada stretches across acres of lush greens and fragrant herbal fields along the banks of the sacred Suvarnamukhi River on Kanakapura Road, Bangalore. The gentle murmur of flowing water and pure natural air create an ideal landscape for nervous system regulation.
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=80")',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.4rem' }}>
              <img src="/assets/extracted/logo.svg" alt="Suprada Logo" style={{ height: '38px', width: 'auto' }} />
              <div>
                <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block' }}>
                  ✦ Sustainability
                </span>
                <h2 style={{color: 'var(--wine)', lineHeight: 1.15, margin: 0}}>
                  Giving Back In Our Own Way
                </h2>
              </div>
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
              background: 'linear-gradient(135deg, #5e2735 0%, #471b26 60%, #301018 100%)',
              borderRadius: '24px',
              position: 'relative',
              boxShadow: '0 20px 45px rgba(94, 39, 53, 0.22)',
              border: '1.5px solid rgba(220, 160, 50, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Radial Golden Ambient Aura Behind Floating Logo */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(220, 160, 50, 0.4) 0%, rgba(94, 39, 53, 0) 70%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Floating Suprada Mandala Logo */}
              <motion.div
                animate={{ 
                  y: [-12, 12, -12],
                  rotate: [0, 360]
                }}
                transition={{ 
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 80, repeat: Infinity, ease: 'linear' }
                }}
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.85,
                  filter: 'drop-shadow(0 10px 25px rgba(220, 160, 50, 0.35))'
                }}
              >
                <img 
                  src="/assets/extracted/logo-mandala.svg" 
                  alt="Suprada Floating Emblem" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.src = "/assets/extracted/logo.svg";
                  }}
                />
              </motion.div>

              {/* Pulsing Botanical Ring Watermark */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.12,
                  pointerEvents: 'none'
                }}
              >
                <Pattern25 style={{ width: '380px', height: '380px', color: 'var(--harvest-gold)' }} />
              </div>
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
