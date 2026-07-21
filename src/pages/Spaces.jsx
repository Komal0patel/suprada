import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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

export default function Spaces({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const journeySteps = [
    { title: 'Sankalpa', sub: 'Arrival & Intention', desc: 'Step past the gateway, leave the external world behind, and set your clear healing intentions.', protocol: 'Gateway Orientation & Intention Ceremony' },
    { title: 'Swasthya', sub: 'Consultation', desc: 'Meet with senior doctors for iris diagnosis and body typing to chart your custom Wellness Formula.', protocol: 'Nadi Pariksha & Iris Diagnostics' },
    { title: 'Accommodation', sub: 'Settling into Stillness', desc: 'Retreat to your private cottage surrounded by nature and let your nervous system wind down.', protocol: 'Organic Mud Plaster Architecture' },
    { title: 'Samathvam', sub: 'Movement & Rhythm', desc: 'Flow with sunrise yoga, pranayama, and mindful river walks aligned with nature\'s circadian cycles.', protocol: 'Circadian Sunrise Asana' },
    { title: 'Sauhithya', sub: 'Nourishment & Satwik Food', desc: 'Dine on therapeutic vegetarian meals cooked with ingredients harvested fresh from our organic farms.', protocol: 'Farm-to-Table Satwik Nutrition' },
    { title: 'Prakruti', sub: 'Therapeutic Healing', desc: 'Receive daily drugless therapies (mud packs, hydrotherapy, massages, Shirodhara) to detoxify and restore.', protocol: 'Hydrotherapy & Herbal Steam' },
    { title: 'Sanjivani', sub: 'Nature & Regeneration', desc: 'Wander through the forest trails, walk barefoot on paths, and reconnect with nature\'s healing elements.', protocol: 'Barefoot Forest Grounding' },
    { title: 'Samiksha', sub: 'Reflection & Learning', desc: 'Participate in evening Satsangs, wellness workshops, and review your daily healing progress.', protocol: 'Satsang & Heritage Dialogue' },
    { title: 'Sukhada', sub: 'Vitality & Strengthening', desc: 'Build structural strength and conditioning in our wellness gym under therapeutic guidance.', protocol: 'Gentle Therapeutic Rebuilding' },
    { title: 'Sankalpa', sub: 'Closure & Transition', desc: 'Complete your exit consultation with customized diet, lifestyle guidelines, and post-retreat routines.', protocol: 'Post-Sanctuary Lifestyle Plan' }
  ];

  const spacesCategories = [
    {
      title: 'Reception & Admin',
      icon: '🏛️',
      subtitle: 'Welcoming Gateways & Diagnostic Hubs',
      items: [
        { name: 'Sankalpa (Reception)', desc: 'The welcoming entry point where guests register, orient, and set their therapeutic intentions.' },
        { name: 'Swasthya (Consultation Block)', desc: 'The diagnostic heart of Suprada where detailed consultations and iris assessments take place.' },
        { name: 'Samanvaya (Admin Block)', desc: 'The operational backbone coordinating a seamless, undisturbed healing experience.' },
        { name: 'Samiksha (Conference Hall)', desc: 'An indoor learning theater for health workshops, talks, and community dialogues.' }
      ]
    },
    {
      title: 'Therapeutic Sanctuaries',
      icon: '🌿',
      subtitle: 'Gender-Dedicated Hydrotherapy & Detox Blocks',
      items: [
        { name: 'Prakruti (Female Treatment Block)', desc: 'A private therapeutic haven dedicated to women\'s care, cleansing, and rejuvenation.' },
        { name: 'Prakriya (Male Treatment Block)', desc: 'A dedicated block offering strength, detoxification, and deep-tissue recovery for men.' },
        { name: 'Salila (Aqua Block)', desc: 'Exquisite hydrotherapy suites featuring separate male/female zones, steam, sauna, and mud therapies.' },
        { name: 'Samvardhana (Salon & Personal Care)', desc: 'A space for organic beauty treatments and hair health using botanical elements.' }
      ]
    },
    {
      title: 'Nourishment & Dining',
      icon: '🍽️',
      subtitle: 'Organic Satwik Cuisine & Riverfront Elixirs',
      items: [
        { name: 'Sauhithya (Indoor Dining)', desc: 'Our primary dining hall serving customized satwik diets. Traditional floor-seating options available.' },
        { name: 'Santrupthi (Outdoor Riverfront Dining)', desc: 'Experience mindful eating by the banks of the river under a canopy of trees.' },
        { name: 'Surasa (Juice & Elixir Bar)', desc: 'Serving freshly extracted organic juices, herbal infusions, and cleansing detox decoctions.' }
      ]
    },
    {
      title: 'Yoga & Movement',
      icon: '🧘',
      subtitle: 'Pranayama Decks & Meditative Walking Tracks',
      items: [
        { name: 'Mahabilva (Indoor Yoga Hall)', desc: 'An elegant, peaceful sanctuary for group asanas, breathwork, and sound bathing.' },
        { name: 'Outdoor Yoga Space (River Deck)', desc: 'Named after the sacred nine-leaved Mahabilva. An open-air deck for meditation by the river.' },
        { name: 'Sanmarga (Walking Track)', desc: 'An ornamental track designed for meditative barefoot walking and deep breathing.' },
        { name: 'Sukhada (Wellness Gym)', desc: 'Equipped with light conditioning gear for gentle strength building and rehabilitation.' }
      ]
    },
    {
      title: 'Nature & Sacred Spaces',
      icon: '🕉️',
      subtitle: 'Stepped Kalyanis, Goshala & Amphitheaters',
      items: [
        { name: 'Antara Gange (Sacred Kalyani)', desc: 'A stepped water tank inspired by ancient architecture, featuring a Nandi idol for centering and reflection.' },
        { name: 'Sanjivani Vatika (Herbal Garden)', desc: 'A living library of medicinal herbs and shrubs used in our teas, packs, and oils.' },
        { name: 'Saparya (Goshala)', desc: 'Our traditional cow shelter. Caring for cows (Gograsa) promotes grounding and compassion.' },
        { name: 'Sanidhya (Amphitheatre)', desc: 'An open-air stone theater for evening musical performances, kirtans, and community gatherings.' }
      ]
    }
  ];

  const accommodationBlocks = [
    { 
      name: 'Samprada Block', 
      type: 'Heritage Garden Cottages', 
      desc: 'Rustic charm meets modern comfort. Close to the dining area and herbal gardens.', 
      config: 'Deluxe Cottage (U1 & U2), Super Deluxe (L1)',
      bg: 'var(--tea-green)',
      borderColor: 'var(--sage)',
      tag: '✦ GARDEN SANCTUARY',
      img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Samrduddhi / Supritha Block', 
      type: 'Exclusive Private Sanctuaries', 
      desc: 'Elevated level of luxury and privacy for deep silence, solitude, and reflection.', 
      config: 'Premium Private Cottage (L2)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ ELEVATED SOLITUDE',
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Spandana Block', 
      type: 'River Breeze Retreats', 
      desc: 'Resonates with energy, capturing the morning sunlight and cooling river breeze.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ RIVER BREEZE',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Samprapti Block', 
      type: 'Wellness Restoration Cottages', 
      desc: 'Quiet zones designed specifically to support deep sleep after daily therapies.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'var(--tea-green)',
      borderColor: 'var(--sage)',
      tag: '✦ DEEP SLEEP HAVEN',
      img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Sphatika Block', 
      type: 'Prismatic Nature Suites', 
      desc: 'Bright, airy structures designed to bring clarity. Large veranda facing the forest.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ FOREST VERANDA',
      img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Sukruthi Block', 
      type: 'Traditional Courtyard Living', 
      desc: 'Units opening onto a shared green courtyard with central water feature.', 
      config: 'Courtyard Units (1, 2, 3, 4)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ COURTYARD OASIS',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Samhita Block', 
      type: 'Grounded Earth Cottages', 
      desc: 'Located in the North Block. Ground floor cottages with direct garden access.', 
      config: 'Super Deluxe Cottage (3 Units)',
      bg: 'var(--tea-green)',
      borderColor: 'var(--sage)',
      tag: '✦ GROUNDED EARTH',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Subhiksha Block', 
      type: 'Private Treatment Residence', 
      desc: 'Ultra-private cottage featuring in-house treatment area. No need to step out.', 
      config: 'Premium Private Cottage (1 Unit)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ IN-HOUSE THERAPY',
      img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Suyoga Block', 
      type: 'Elevated Canopy Suites', 
      desc: 'Upper floor executive rooms offering sweeping views of the tree canopy and river.', 
      config: 'Executive Cottages (4 Units 1st Flr, 2 Units 2nd Flr)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ CANOPY PANORAMA',
      img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--antique-white)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* =========================================================================
          HERO SECTION • Full-Viewport Cinematic Sanctuary Exhibition
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--antique-white)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>

        {/* Floating sage petals */}
        <FloatingPetals count={8} color="rgba(179,186,142,0.6)" />

        {/* ── Right-side Wine panel (angled) ── */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '48%', height: '100%',
          background: 'linear-gradient(200deg, #2a0e18 0%, var(--wine) 60%, #5e2735 100%)',
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
          zIndex: 1
        }} />

        {/* ── Sage blob — top left ── */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          maxWidth: '360px', width: '100%', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(179,186,142,0.3) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* ── Harvest gold glow — inside wine panel ── */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-40px',
          maxWidth: '380px', width: '100%', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 2
        }} />

        {/* ── Pale dogwood blob bottom-left ── */}
        <div style={{
          position: 'absolute', bottom: '-40px', left: '30%',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,215,204,0.4) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }} />

        {/* ── Main content ── */}
        <div className="hero-grid-split" style={{
          maxWidth: '1280px', width: '100%',
          margin: '0 auto', padding: '0 4%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
          position: 'relative', zIndex: 3
        }}>

          {/* ── LEFT: Light side — editorial headline ── */}
          <div style={{ paddingTop: '3rem' }}>


            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3.4rem, 6vw, 5.6rem)',
                color: 'var(--wine)',
                fontWeight: 500,
                lineHeight: 1.05,
                margin: '0 0 1.4rem 0',
                letterSpacing: '-0.01em'
              }}
            >
              Spaces<br />
              <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 300 }}>at Suprada</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                color: 'var(--raisin-black)', opacity: 0.8,
                fontSize: '1.08rem', lineHeight: 1.85, fontWeight: 300,
                marginBottom: '2rem', maxWidth: '520px'
              }}
            >
              Every corner of our estate is crafted with sacred Indian spatial proportions, mud-plastered walls, and riverfront solitude — designed to restore your nervous system to its natural rhythm.
            </motion.p>

            {/* Estate metric pills — light side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.2rem' }}
            >
              {[
                { num: '10', unit: 'Acres', desc: 'Forest Estate' },
                { num: '9', unit: 'Blocks', desc: 'Cottage Clusters' },
                { num: '5', unit: 'Zones', desc: 'Therapy Pavilions' },
                { num: '1', unit: 'River', desc: 'Suvarnamukhi' }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(94,39,53,0.12)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '0.8rem 1rem', borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(94,39,53,0.1)',
                    boxShadow: '0 4px 14px rgba(94,39,53,0.06)',
                    minWidth: '82px', cursor: 'default'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: 'var(--wine)', fontWeight: 600, lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, opacity: 0.8 }}>{s.unit}</span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--raisin-black)', opacity: 0.5, marginTop: '0.2rem', textAlign: 'center', lineHeight: 1.3 }}>{s.desc}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a
                href="#spaces-chapters"
                className="btn-luxury"
                style={{ padding: '1rem 2.4rem', fontSize: '0.84rem', letterSpacing: '0.1em', textDecoration: 'none' }}
              >
                Explore All Spaces ↓
              </a>
              <button
                onClick={() => onNavigate('stay')}
                style={{
                  background: 'none', border: '1.5px solid rgba(94,39,53,0.25)',
                  color: 'var(--wine)', cursor: 'pointer',
                  padding: '1rem 2rem', fontSize: '0.82rem',
                  letterSpacing: '0.08em', fontWeight: 600, borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94,39,53,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                View Accommodations
              </button>
            </motion.div>

            {/* Animated SVG decorative line ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{ marginTop: '3rem', opacity: 0.25 }}
            >
              <svg width="200" height="24" viewBox="0 0 200 24" fill="none">
                <motion.line x1="0" y1="12" x2="200" y2="12" stroke="var(--wine)" strokeWidth="1"
                  strokeDasharray="200"
                  initial={{ strokeDashoffset: 200 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
                <motion.circle cx="100" cy="12" r="4" fill="var(--harvest-gold)"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 2 }}
                />
                <motion.circle cx="20" cy="12" r="2" fill="var(--wine)"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.1 }}
                />
                <motion.circle cx="180" cy="12" r="2" fill="var(--wine)"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.1 }}
                />
              </svg>
            </motion.div>
          </div>

          {/* ── RIGHT: Dark-side staggered image mosaic ── */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Floating quote card — top-right (inside wine panel) */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              style={{
                position: 'absolute',
                top: '-1.5rem', right: '-1rem',
                zIndex: 6,
                backgroundColor: 'rgba(220,160,50,0.12)',
                backdropFilter: 'blur(12px)',
                color: 'var(--tan)',
                borderRadius: '14px',
                padding: '0.9rem 1.2rem',
                maxWidth: '190px',
                border: '1px solid rgba(220,160,50,0.3)'
              }}
            >
              <div style={{ fontSize: '0.62rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, marginBottom: '0.35rem' }}>✦ Vastu Design</div>
              <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.82rem', lineHeight: 1.5, margin: 0, color: 'var(--tan)', opacity: 0.9 }}>
                Sacred proportions for sacred healing.
              </p>
            </motion.div>

            {/* Large hero image — full-width top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{
                borderRadius: '24px', overflow: 'hidden',
                height: '280px', position: 'relative',
                boxShadow: '0 20px 55px rgba(94,39,53,0.3)',
                border: '2px solid rgba(220,160,50,0.25)'
              }}
            >
              <img
                src="/artifacts/suprada_estate_overview_1784545347819.png"
                alt="Suprada Sanctuary Estate Overview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'; }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(58,21,32,0.85) 0%, rgba(58,21,32,0.2) 50%, transparent 100%)'
              }} />
              {/* Bottom content overlay */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 2 }}>
                <span style={{ backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)', fontSize: '0.65rem', fontWeight: 800, padding: '0.3rem 0.9rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '0.5rem' }}>
                  ✦ Riverfront Forest Estate
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--tan)', fontWeight: 500, margin: 0, lineHeight: 1.15 }}>
                  Suvarnamukhi Riverfront Estate
                </h2>
              </div>
            </motion.div>

            {/* Two smaller images side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {[
                { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80', label: 'Cottage Sanctuaries', accent: 'var(--sage)' },
                { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', label: 'Therapy Pavilions', accent: 'var(--harvest-gold)' }
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(94,39,53,0.25)' }}
                  style={{
                    borderRadius: '18px', overflow: 'hidden', height: '140px',
                    position: 'relative',
                    border: `1.5px solid rgba(220,160,50,0.2)`,
                    boxShadow: '0 8px 24px rgba(94,39,53,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,21,32,0.7) 0%, transparent 60%)' }} />
                  <span style={{
                    position: 'absolute', bottom: '0.7rem', left: '0.8rem',
                    fontSize: '0.65rem', color: 'var(--tan)', fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.1em'
                  }}>{img.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Floating bottom-left round badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '0rem', left: '-2rem',
                zIndex: 6,
                backgroundColor: 'var(--wine)',
                borderRadius: '50%',
                width: '88px', height: '88px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(94,39,53,0.4)',
                textAlign: 'center',
                border: '2px solid rgba(220,160,50,0.35)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--harvest-gold)', fontWeight: 700, lineHeight: 1 }}>50+</span>
              <span style={{ fontSize: '0.55rem', color: 'var(--tan)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>Guests</span>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 4
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}
          >
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)', opacity: 0.45, fontWeight: 700 }}>Scroll</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--wine), transparent)', opacity: 0.35 }} />
          </motion.div>
        </motion.div>

      </section>

      <div id="spaces-chapters" />


      {/* =========================================================================
          CHAPTER I • Estate Metrics Vault
          ========================================================================= */}
      <section style={{ padding: '3.5rem 8%', position: 'relative' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          <div style={{
            background: 'linear-gradient(135deg, var(--wine) 0%, #3a1520 100%)',
            borderRadius: '28px',
            padding: '3rem 2.5rem',
            border: '2px solid var(--harvest-gold)',
            boxShadow: '0 25px 60px rgba(94, 39, 53, 0.25)',
            color: 'var(--isabelline)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
                ✦ CHAPTER I • ESTATE SCALE & PROPORTIONS
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--tan)', margin: 0, fontWeight: 500 }}>
                Architectural Metrics at a Glance
              </h3>
            </div>

            <div className="grid-2-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
              {[
                { value: '10', unit: 'ACRES', label: 'Forest Estate', color: 'var(--harvest-gold)' },
                { value: '50', unit: 'GUESTS', label: 'Max Capacity', color: 'var(--tan)' },
                { value: '30', unit: 'SUITES', label: 'Therapy Zones', color: 'var(--harvest-gold)' },
                { value: '3', unit: 'HUBS', label: 'Bespoke Pavilions', color: 'var(--tan)' },
                { value: '1', unit: 'RIVER', label: 'Suvarnamukhi', color: 'var(--harvest-gold)' },
                { value: '1', unit: 'FARM', label: 'Satwik Harvest', color: 'var(--tan)' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(220, 160, 50, 0.3)',
                    padding: '1.6rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: stat.color, fontWeight: 700, lineHeight: 1, marginBottom: '0.3rem' }}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--harvest-gold)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {stat.unit}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--isabelline)', opacity: 0.85, marginTop: '0.2rem', fontWeight: 300 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER II • The 10-Stage Sanctuary Flow (Interactive Stage Runway)
          ========================================================================= */}
      <section style={{ padding: '4rem 8%', backgroundColor: 'var(--antique-white)', position: 'relative' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
              ✦ CHAPTER II • THE SANCTUARY FLOW
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
              The 10-Stage Healing Trajectory
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '560px', margin: '0.6rem auto 0 auto', fontSize: '0.92rem' }}>
              Each stage of your sanctuary stay is mapped to specific spatial zones across our 10-acre estate.
            </p>
          </div>

          {/* Timeline Step Selector Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {journeySteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: isActive ? '2px solid var(--harvest-gold)' : '1.5px solid rgba(94, 39, 53, 0.2)',
                    backgroundColor: isActive ? 'var(--wine)' : '#ffffff',
                    color: isActive ? 'var(--harvest-gold)' : 'var(--wine)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 18px rgba(94, 39, 53, 0.2)' : '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Stage Exhibition Card */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '2.5rem 3rem',
                  border: '1.5px solid var(--harvest-gold)',
                  boxShadow: '0 18px 45px rgba(94, 39, 53, 0.07)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(184, 94, 76, 0.1)', padding: '0.35rem 1rem', borderRadius: '20px', border: '1px solid var(--redwood)', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      STAGE {activeStep + 1} OF 10
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 0.3rem 0' }}>
                    {journeySteps[activeStep].title}
                  </h3>

                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--redwood)', fontWeight: 500, margin: '0 0 1rem 0' }}>
                    {journeySteps[activeStep].sub}
                  </h4>

                  <span style={{ backgroundColor: 'var(--tea-green)', color: 'var(--wine)', fontSize: '0.75rem', fontWeight: 700, padding: '0.45rem 1.1rem', borderRadius: '20px', border: '1px solid var(--sage)', display: 'inline-block' }}>
                    ✦ {journeySteps[activeStep].protocol}
                  </span>
                </div>

                <div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black)', opacity: 0.88, lineHeight: 1.75, margin: '0 0 1.5rem 0', fontWeight: 300 }}>
                    {journeySteps[activeStep].desc}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : journeySteps.length - 1))}
                      style={{
                        padding: '0.55rem 1.4rem',
                        borderRadius: '20px',
                        border: '1.5px solid var(--wine)',
                        backgroundColor: 'transparent',
                        color: 'var(--wine)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ← Previous Stage
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < journeySteps.length - 1 ? prev + 1 : 0))}
                      style={{
                        padding: '0.55rem 1.4rem',
                        borderRadius: '20px',
                        border: '1.5px solid var(--wine)',
                        backgroundColor: 'var(--wine)',
                        color: 'var(--isabelline)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Next Stage →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER III • Accommodations & Residences (Interactive 3D Glass Cards)
          ========================================================================= */}
      <section style={{ padding: '5rem 8%', position: 'relative' }}>
        <div style={{ maxWidth: '1220px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
              ✦ CHAPTER III • RESTING BLOCKS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
              Suprada Residences & Cottages
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '600px', margin: '0.6rem auto 0 auto', fontSize: '0.95rem' }}>
              8 distinct lodging blocks crafted with mud plaster, local granite, and reclaimed teakwood to support deep nervous system recovery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
            {accommodationBlocks.map((block, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: `1.5px solid ${block.borderColor}`,
                    boxShadow: '0 12px 35px rgba(94, 39, 53, 0.05)',
                    padding: '2.2rem 1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    {/* Top Image Preview */}
                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '170px', marginBottom: '1.4rem', position: 'relative' }}>
                      <img 
                        src={block.img} 
                        alt={block.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(58, 21, 32, 0.85)', color: 'var(--harvest-gold)', fontSize: '0.65rem', fontWeight: 800, padding: '0.35rem 0.9rem', borderRadius: '15px', backdropFilter: 'blur(4px)' }}>
                        {block.tag}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.68rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.2rem' }}>
                      {block.type}
                    </span>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 0.6rem 0' }}>
                      {block.name}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--raisin-black)', opacity: 0.82, lineHeight: 1.6, margin: '0 0 1.2rem 0', fontWeight: 300 }}>
                      {block.desc}
                    </p>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: `1px dashed ${block.borderColor}`, fontSize: '0.76rem', color: 'var(--wine)', fontWeight: 600 }}>
                    <span style={{ opacity: 0.7 }}>Config: </span>{block.config}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button 
              onClick={() => onNavigate('stay')}
              className="btn-luxury" 
              style={{ padding: '0.9rem 2.6rem', fontSize: '0.82rem' }}
            >
              Explore Cottage Amenities &amp; Book Stay
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER IV • Therapeutic Sanctuaries & Sacred Zones (Category Exhibition)
          ========================================================================= */}
      <section style={{ padding: '5.5rem 8%', backgroundColor: 'var(--wine)', color: 'var(--isabelline)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.2rem' }}>
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ CHAPTER IV • THE SANCTUM ZONES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)', color: 'var(--tan)', fontWeight: 500, margin: 0 }}>
              The Spaces That Shape the Journey
            </h2>
            <p style={{ color: 'var(--isabelline)', opacity: 0.82, maxWidth: '580px', margin: '0.6rem auto 0 auto', fontSize: '0.95rem', fontWeight: 300 }}>
              Explore the detailed architectural structures built to house each element of your natural healing formula.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {spacesCategories.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  style={{
                    padding: '0.7rem 1.5rem',
                    borderRadius: '30px',
                    border: isActive ? '2px solid var(--harvest-gold)' : '1.5px solid rgba(220, 160, 50, 0.3)',
                    backgroundColor: isActive ? 'var(--harvest-gold)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? 'var(--wine)' : 'var(--isabelline)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 8px 20px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {cat.icon} &nbsp; {cat.title}
                </button>
              );
            })}
          </div>

          {/* Category Exhibition Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.8rem' }}
            >
              {spacesCategories[activeCategory].items.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1.5px solid rgba(220, 160, 50, 0.35)',
                    borderRadius: '20px',
                    padding: '2.2rem 1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--harvest-gold)', margin: 0, fontWeight: 500 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--isabelline)', opacity: 0.88, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER V • Closing CTA Sanctuary Invitation
          ========================================================================= */}
      <section style={{ padding: '6.5rem 6%', textAlign: 'center', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
            ✦ SACRED SANCTUARY INVITE
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', color: 'var(--wine)', marginBottom: '1rem', fontWeight: 500 }}>
            A Sanctuary Designed to Heal as One
          </h2>
          <p style={{ color: 'var(--raisin-black)', opacity: 0.85, margin: '0 auto 2.5rem auto', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
            Our caregivers, doctors, and specialists communicate directly under one roof across our 10-acre estate to coordinate your custom natural treatment paths.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigate('stay')}
              className="btn-luxury" 
              style={{ padding: '0.95rem 2.6rem', fontSize: '0.82rem' }}
            >
              Plan Your Sanctuary Stay
            </button>
            <button 
              onClick={() => onNavigate('programmes')}
              style={{ 
                background: 'none', 
                border: '1.5px solid var(--wine)', 
                color: 'var(--wine)', 
                cursor: 'pointer', 
                padding: '0.95rem 2.6rem', 
                fontSize: '0.82rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                fontWeight: 700, 
                borderRadius: '4px' 
              }}
            >
              Explore Retreat Programs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
