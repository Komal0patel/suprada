import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Building, Leaf, Utensils, Heart, Sparkles, Trees, Home, Waves } from 'lucide-react';

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

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end start'] });
  const heroMandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroMandalaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
    { title: 'Sankalpa', sub: 'Closure & Transition', desc: 'Complete your exit consultation with customized diet, lifestyle guidelines, and post-retreat routines.', protocol: 'Post-Retreat Lifestyle Plan' }
  ];

  const spacesCategories = [
    {
      title: 'Reception & Admin',
      icon: <Building size={20} />,
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
      icon: <Leaf size={20} />,
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
      icon: <Utensils size={20} />,
      subtitle: 'Organic Satwik Cuisine & Riverfront Elixirs',
      items: [
        { name: 'Sauhithya (Indoor Dining)', desc: 'Our primary dining hall serving customized satwik diets. Traditional floor-seating options available.' },
        { name: 'Santrupthi (Outdoor Riverfront Dining)', desc: 'Experience mindful eating by the banks of the river under a canopy of trees.' },
        { name: 'Surasa (Juice & Elixir Bar)', desc: 'Serving freshly extracted organic juices, herbal infusions, and cleansing detox decoctions.' }
      ]
    },
    {
      title: 'Yoga & Movement',
      icon: <Heart size={20} />,
      subtitle: 'Pranayama Decks & Meditative Walking Tracks',
      items: [
        { name: 'Mahabilva (Indoor Yoga Hall)', desc: 'An elegant, peaceful haven for group asanas, breathwork, and sound bathing.' },
        { name: 'Outdoor Yoga Space (River Deck)', desc: 'Named after the sacred nine-leaved Mahabilva. An open-air deck for meditation by the river.' },
        { name: 'Sanmarga (Walking Track)', desc: 'An ornamental track designed for meditative barefoot walking and deep breathing.' },
        { name: 'Sukhada (Wellness Gym)', desc: 'Equipped with light conditioning gear for gentle strength building and rehabilitation.' }
      ]
    },
    {
      title: 'Nature & Sacred Spaces',
      icon: <Sparkles size={20} />,
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
      tag: '✦ GARDEN HAVEN',
      img: '/assets/residences/samprada.png'
    },
    { 
      name: 'Samrduddhi / Supritha Block', 
      type: 'Exclusive Private Enclaves', 
      desc: 'Elevated level of luxury and privacy for deep silence, solitude, and reflection.', 
      config: 'Premium Private Cottage (L2)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ ELEVATED SOLITUDE',
      img: '/assets/residences/samrduddhi.png'
    },
    { 
      name: 'Spandana Block', 
      type: 'River Breeze Retreats', 
      desc: 'Resonates with energy, capturing the morning sunlight and cooling river breeze.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ RIVER BREEZE',
      img: '/assets/residences/spandana.png'
    },
    { 
      name: 'Samprapti Block', 
      type: 'Wellness Restoration Cottages', 
      desc: 'Quiet zones designed specifically to support deep sleep after daily therapies.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'var(--tea-green)',
      borderColor: 'var(--sage)',
      tag: '✦ DEEP SLEEP HAVEN',
      img: '/assets/residences/samprapti.png'
    },
    { 
      name: 'Sphatika Block', 
      type: 'Prismatic Nature Suites', 
      desc: 'Bright, airy structures designed to bring clarity. Large veranda facing the forest.', 
      config: 'Deluxe (U1 & U2), Super Deluxe (L1 & L2)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ FOREST VERANDA',
      img: '/assets/residences/sphatika.png'
    },
    { 
      name: 'Sukruthi Block', 
      type: 'Traditional Courtyard Living', 
      desc: 'Units opening onto a shared green courtyard with central water feature.', 
      config: 'Courtyard Units (1, 2, 3, 4)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ COURTYARD OASIS',
      img: '/assets/residences/sukruthi.png'
    },
    { 
      name: 'Samhita Block', 
      type: 'Grounded Earth Cottages', 
      desc: 'Located in the North Block. Ground floor cottages with direct garden access.', 
      config: 'Super Deluxe Cottage (3 Units)',
      bg: 'var(--tea-green)',
      borderColor: 'var(--sage)',
      tag: '✦ GROUNDED EARTH',
      img: '/assets/residences/samhita.png'
    },
    { 
      name: 'Subhiksha Block', 
      type: 'Private Treatment Residence', 
      desc: 'Ultra-private cottage featuring in-house treatment area. No need to step out.', 
      config: 'Premium Private Cottage (1 Unit)',
      bg: 'rgba(184, 94, 76, 0.1)',
      borderColor: 'var(--redwood)',
      tag: '✦ IN-HOUSE THERAPY',
      img: '/assets/residences/subhiksha.png'
    },
    { 
      name: 'Suyoga Block', 
      type: 'Elevated Canopy Suites', 
      desc: 'Upper floor executive rooms offering sweeping views of the tree canopy and river.', 
      config: 'Executive Cottages (4 Units 1st Flr, 2 Units 2nd Flr)',
      bg: 'rgba(220, 160, 50, 0.14)',
      borderColor: 'var(--harvest-gold)',
      tag: '✦ CANOPY PANORAMA',
      img: '/assets/residences/suyoga.png'
    }
  ];

  return (
    <div ref={scrollRef} style={{ backgroundColor: 'var(--antique-white)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* =========================================================================
          HERO SECTION • Centered Luxury — Spaces Edition
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
            width: 'clamp(220px, 32vw, 360px)', height: 'clamp(220px, 32vw, 360px)',
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
              Sacred Spaces &amp; Architecture
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
            {['Where', 'Every'].map((w, idx) => (
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
              style={{ display: 'inline-block', fontStyle: 'italic', color: 'var(--harvest-gold)' }}
            >
              Space Heals
            </motion.span>
          </h1>

          {/* Word-by-Word Revealed Paragraph */}
          <AnimatedParagraph
            text="Crafted with sacred Indian spatial proportions, mud-plastered walls, and riverfront solitude — every corner of our riverfront estate is designed to restore your nervous system to its natural rhythm."
            style={{
              color: 'rgba(94, 39, 53, 0.88)',
              maxWidth: '680px',
              margin: '0 auto 1.4rem auto',
              fontSize: 'var(--fs-body)',
              lineHeight: 1.7,
              fontWeight: 400,
              justifyContent: 'center'
            }}
            delay={0.4}
          />


          {/* Centered CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#spaces-chapters"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.3rem',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 600,
                backgroundColor: 'var(--wine)',
                color: '#f5ebd9',
                border: '1.5px solid var(--wine)',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 18px rgba(94,39,53,0.22)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3a1520'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(94,39,53,0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(94,39,53,0.22)'; }}
            >
              Explore All Spaces ↓
            </a>
            <button
              onClick={() => onNavigate('stay')}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(94,39,53,0.3)',
                color: 'var(--wine)',
                cursor: 'pointer',
                padding: '0.85rem 2.1rem',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                fontWeight: 500,
                borderRadius: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94,39,53,0.07)'; e.currentTarget.style.borderColor = 'var(--wine)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(94,39,53,0.3)'; }}
            >
              View Accommodations
            </button>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
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
            <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)', opacity: 0.45, fontWeight: 700 }}>Scroll</span>
            <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, var(--wine), transparent)', opacity: 0.3 }} />
          </motion.div>
        </motion.div>

      </section>

      <div id="spaces-chapters" />

      {/* =========================================================================
          THE SPACES THAT SHAPE THE JOURNEY (Sanctum Zones Section in Sage Green)
          ========================================================================= */}
      <section style={{
        minHeight: '100dvh',
        height: '100vh',
        padding: '2.5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.82rem', fontWeight: 800, display: 'block', marginBottom: '0.35rem' }}>
              ✦ THE SANCTUM ZONES
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              The Spaces That Shape the Journey
            </h2>
            <p style={{ color: 'var(--wine)', opacity: 0.9, maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: 'var(--fs-body)', fontWeight: 400 }}>
              Explore the detailed architectural structures built to house each element of your natural healing formula.
            </p>
          </div>

          {/* Responsive Mobile 2-Per-Row Grid CSS */}
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 768px) {
              .sanctum-category-tabs {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 0.5rem !important;
                margin-bottom: 1.2rem !important;
                width: 100% !important;
              }
              .sanctum-category-btn {
                padding: 0.55rem 0.4rem !important;
                font-size: 0.74rem !important;
                width: 100% !important;
                box-sizing: border-box !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.3rem !important;
                text-align: center !important;
                line-height: 1.2 !important;
                border-radius: 20px !important;
              }
              .sanctum-category-btn:nth-child(5) {
                grid-column: 1 / -1 !important;
                max-width: 85% !important;
                justify-self: center !important;
              }
            }
          `}} />

          {/* Category Selector Tabs */}
          <div className="sanctum-category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {spacesCategories.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className="sanctum-category-btn"
                  style={{
                    padding: '0.65rem 1.1rem',
                    borderRadius: '24px',
                    border: isActive ? '2px solid var(--wine)' : '1.5px solid rgba(94, 39, 53, 0.25)',
                    backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.75)',
                    color: isActive ? '#ffffff' : 'var(--wine)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 16px rgba(94, 39, 53, 0.18)' : 'none'
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
              className="sanctum-zones-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem' }}
            >
              {spacesCategories[activeCategory].items.map((item, idx) => (
                <div 
                  key={idx}
                  className="sanctum-zone-card"
                  style={{
                    border: '1.5px solid rgba(255, 255, 255, 0.9)',
                    borderRadius: '18px',
                    padding: '1.4rem 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)'
                  }}
                >
                  <h3 style={{color: 'var(--wine)', margin: 0, fontSize: '1.18rem', fontWeight: 700}}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.55, margin: 0, fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          RESTING BLOCKS (Interactive Cottages & Residences)
          ========================================================================= */}
      <section style={{ padding: '5rem 8%', position: 'relative' }}>
        <div style={{ maxWidth: '1220px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.26em', fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ RESTING BLOCKS
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              Suprada Residences & Cottages
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.95, maxWidth: '640px', margin: '0.8rem auto 0 auto', fontSize: 'var(--fs-body)', lineHeight: 1.65, fontWeight: 400 }}>
              8 distinct lodging blocks crafted with mud plaster, local granite, and reclaimed teakwood to support deep nervous system recovery.
            </p>
          </div>

          <div className="spaces-residences-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
            {accommodationBlocks.map((block, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  className="residence-card"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: `1.5px solid ${block.borderColor}`,
                    boxShadow: '0 12px 35px rgba(94, 39, 53, 0.05)',
                    padding: '2.2rem 1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    {/* Top Image Preview */}
                    <div className="residence-card-img" style={{ borderRadius: '16px', overflow: 'hidden', height: '170px', marginBottom: '1.4rem', position: 'relative' }}>
                      <img 
                        src={block.img} 
                        alt={block.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span className="residence-card-tag" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(58, 21, 32, 0.9)', color: 'var(--harvest-gold)', fontSize: '0.72rem', fontWeight: 800, padding: '0.35rem 0.85rem', borderRadius: '15px', backdropFilter: 'blur(4px)' }}>
                        {block.tag}
                      </span>
                    </div>

                    <span className="residence-card-type" style={{ fontSize: '0.75rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>
                      {block.type}
                    </span>

                    <h3 className="residence-card-title" style={{color: 'var(--wine)', margin: '0 0 0.6rem 0'}}>
                      {block.name}
                    </h3>

                    <p className="residence-card-desc" style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.95, lineHeight: 1.6, margin: '0 0 1.2rem 0', fontWeight: 400 }}>
                      {block.desc}
                    </p>
                  </div>

                  <div className="residence-card-config" style={{ paddingTop: '1rem', borderTop: `1px dashed ${block.borderColor}`, fontSize: '0.82rem', color: 'var(--wine)', fontWeight: 700 }}>
                    <span style={{ color: 'var(--redwood)', fontWeight: 800 }}>Config: </span>{block.config}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button 
              onClick={() => onNavigate('stay')}
              className="btn-luxury" 
              style={{ padding: '0.85rem 2.2rem', fontSize: '0.84rem', fontWeight: 700 }}
            >
              Explore Cottage Amenities &amp; Book Stay
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER V • Closing CTA Retreat Invitation
          ========================================================================= */}
      <section style={{ padding: '6.5rem 6%', textAlign: 'center', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.84rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
            + SACRED HAVEN INVITE
          </span>
          <h2 style={{color: 'var(--wine)', marginBottom: '1rem',}}>
            A Retreat Designed to Heal as One
          </h2>
          <p style={{ color: 'var(--raisin-black)', opacity: 0.95, margin: '0 auto 2.5rem auto', fontSize: 'var(--fs-body)', lineHeight: 1.75, fontWeight: 400 }}>
            Our caregivers, doctors, and specialists communicate directly under one roof across our 10-acre estate to coordinate your custom natural treatment paths.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigate('stay')}
              className="btn-luxury" 
              style={{ padding: '0.95rem 2.6rem', fontSize: '0.82rem' }}
            >
              Book Your Stay
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
