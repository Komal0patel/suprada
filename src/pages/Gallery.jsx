import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { X } from 'lucide-react';

// Premium camera lens focus reveal variant
const focusEntrance = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Custom interactive 3D Mouse Tilt Card Wrapper
function TiltCard({ children, onClick, style, ...props }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Calculate rotation with max 12 degrees
    const tiltX = (yc - y) / 8;
    const tiltY = (x - xc) / 8;
    setRotation({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        ...style
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.03 : 1
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Helper to get luxury description for each gallery title
const getDescriptionForTitle = (title) => {
  const t = title.toLowerCase();
  if (t.includes("yoga")) return "Connect mind and body with the river breeze, centering your energy under the gentle morning light.";
  if (t.includes("meditation")) return "Rest in tranquil silence as the forest dusk guides you deep into mindful, restorative stillness.";
  if (t.includes("walks") || t.includes("exploration")) return "Discover healing local flora and quiet pathways along the soothing sounds of the flowing river.";
  if (t.includes("satsang")) return "Gather in sacred community, sharing ancient chants, spiritual songs, and warm wellness energy.";
  if (t.includes("ritual")) return "Experience the purifying power of Vedic fire ceremonies, cleansing the atmosphere and spirit.";
  if (t.includes("breathwork")) return "Harness your life-force energy through guided deep breathing sessions under the green canopy.";
  if (t.includes("massage") || t.includes("abhyanga")) return "Rejuvenate with synchronized warm herbal oil application, promoting lymphatic drainage and peace.";
  if (t.includes("shirodhara")) return "Experience deep neurological rest as a continuous warm oil stream flows onto your forehead.";
  if (t.includes("steam") || t.includes("swedana")) return "Sweat out impurities in our organic wood herbal steam chambers, opening your energy channels.";
  if (t.includes("cleansing") || t.includes("basti")) return "Restore your gut-brain axis and elemental balance through traditional cleansing therapies.";
  if (t.includes("diagnosis")) return "Gain deep insights into your physical constitution and dosha balance through pulse reading.";
  if (t.includes("meal") || t.includes("satwik")) return "Nourish your body with farm-fresh organic ingredients, curated according to Ayurvedic principles.";
  if (t.includes("produce") || t.includes("herbs")) return "Freshly harvested organic vegetables and herbs from our estate's clean forest garden.";
  if (t.includes("recipes")) return "Custom culinary preparations designed to balance your specific biological energies.";
  if (t.includes("kitchari")) return "Enjoy a warm, comforting bowl of split mung dal and rice, spiced for optimal digestion.";
  if (t.includes("cottage")) return "Luxury timber architecture blending seamlessly with the riverbanks, featuring natural ventilation.";
  if (t.includes("room")) return "Earthy spa spaces styled with warm lights, clay plasters, and natural forest ventilation.";
  if (t.includes("pavilion")) return "High-ceiling bamboo structures providing a breathing space for yoga and quiet reflection.";
  if (t.includes("pathway") || t.includes("courtyard")) return "Pristine stone pathways walking you through sacred geometric landscape courtyards.";
  if (t.includes("material")) return "Organic clay, sustainable timber, and local stone crafted to ground your senses.";
  if (t.includes("interior")) return "Warm minimalist aesthetic with cozy lighting, natural fibers, and soft neutral tones.";
  if (t.includes("sand garden")) return "Calm your mind by tracing geometric wave lines in our outdoor silent gravel garden.";
  if (t.includes("pottery")) return "Ground your touch by shaping raw, wet river clay into artistic, functional vessels.";
  if (t.includes("farming")) return "Learn organic permaculture techniques, planting seeds in rich forest soil.";
  if (t.includes("workshop") || t.includes("lessons")) return "Master clean culinary methods using medicinal herbs and local ingredients.";
  return "Immerse yourself in our serene retreat, designed to balance your elements and restore your inner peace.";
};

// Preset grid coordinates and dispersal directions for 8 items
const collageLayouts = [
  // Item 0 (Center Large) - Columns 2 & 3, Rows 1 & 2
  { gridArea: '1 / 2 / 3 / 4', dirX: 0, dirY: -220 },
  // Item 1 (Top Left) - Column 1, Row 1
  { gridArea: '1 / 1 / 2 / 2', dirX: -450, dirY: -250 },
  // Item 2 (Bottom Left) - Column 1, Row 2
  { gridArea: '2 / 1 / 3 / 2', dirX: -450, dirY: 250 },
  // Item 3 (Bottom Center Left) - Column 2, Row 3
  { gridArea: '3 / 2 / 4 / 3', dirX: -200, dirY: 450 },
  // Item 4 (Bottom Center Right) - Column 3, Row 3
  { gridArea: '3 / 3 / 4 / 4', dirX: 200, dirY: 450 },
  // Item 5 (Top Right) - Column 4, Row 1
  { gridArea: '1 / 4 / 2 / 5', dirX: 450, dirY: -250 },
  // Item 6 (Middle/Bottom Right) - Column 4, Rows 2 & 3
  { gridArea: '2 / 4 / 4 / 5', dirX: 450, dirY: 250 },
  // Item 7 (Fallback Left-Bottom) - Column 1, Row 3
  { gridArea: '3 / 1 / 4 / 2', dirX: -450, dirY: 450 },
];

// Card variants for internal element hovers
const cardImageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

const cardTextVariants = {
  initial: { y: 0, color: 'var(--wine)' },
  hover: { y: -3, color: 'var(--redwood)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

const cardBgVariants = {
  initial: { backgroundColor: '#ffffff' },
  hover: { backgroundColor: '#fdfbfa', transition: { duration: 0.4 } }
};

function CardInner({ item, idx }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#191718' }}>
        <motion.img
          src={item.img}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          variants={cardImageVariants}
        />

        {/* Hover Caption Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          variants={{
            hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2.5rem 1.2rem 1.2rem 1.2rem',
            background: 'linear-gradient(to top, rgba(94, 39, 53, 0.95) 0%, rgba(94, 39, 53, 0.6) 60%, rgba(94, 39, 53, 0) 100%)',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 3
          }}
        >
          <span style={{ fontSize: '0.62rem', color: 'var(--tan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.2rem' }}>
            {item.cat}
          </span>
          <h3
            style={{color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
          >
            {item.title.split(' – ')[1] || item.title}
          </h3>
        </motion.div>
      </div>
    </div>
  );
}

export default function Gallery({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', 'Retreat', 'Therapies', 'Nutrition', 'Architecture', 'Activities'];

  // Exact gallery items mapped from reference website source
  const galleryItems = [
    // Retreat
    { title: "Retreat – Sunrise yoga by the river", cat: "Retreat", img: "/assets/gallery/gallery_3822622.jpg" },
    { title: "Retreat – Evening meditation in nature", cat: "Retreat", img: "/assets/gallery/gallery_4056535.jpg" },
    { title: "Retreat – Guided riverfront walks", cat: "Retreat", img: "/assets/gallery/gallery_1552242.jpg" },
    { title: "Retreat – Community satsang and kirtan", cat: "Retreat", img: "/assets/gallery/gallery_3759657.jpg" },
    { title: "Retreat – Sacred fire rituals", cat: "Retreat", img: "/assets/gallery/gallery_1346347.jpg" },
    { title: "Retreat – Mindful breathwork sessions", cat: "Retreat", img: "/assets/gallery/gallery_3992216.jpg" },
    { title: "Retreat – Sunrise yoga by the river (alternative)", cat: "Retreat", img: "/assets/gallery/gallery_1547248.jpg" },
    { title: "Retreat – Evening meditation in nature (alternative)", cat: "Retreat", img: "/assets/gallery/gallery_417074.jpg" },

    // Therapies
    { title: "Therapies – Traditional authentic therapies", cat: "Therapies", img: "/assets/gallery/gallery_4021775.jpg" },
    { title: "Therapies – Abhyanga (warm oil massage)", cat: "Therapies", img: "/assets/gallery/gallery_3997991.jpg" },
    { title: "Therapies – Shirodhara (oil flow therapy)", cat: "Therapies", img: "/assets/gallery/gallery_2356045.jpg" },
    { title: "Therapies – Herbal steam (Swedana)", cat: "Therapies", img: "/assets/gallery/gallery_1624438.jpg" },
    { title: "Therapies – Basti and cleansing routines", cat: "Therapies", img: "/assets/gallery/gallery_3822622.jpg" },
    { title: "Therapies – Pulse diagnosis consultations", cat: "Therapies", img: "/assets/gallery/gallery_3759657.jpg" },

    // Nutrition
    { title: "Nutrition – Farm-to-table satwik meals", cat: "Nutrition", img: "/assets/gallery/gallery_1640777.jpg" },
    { title: "Nutrition – Seasonal produce and herbs", cat: "Nutrition", img: "/assets/gallery/gallery_1640770.jpg" },
    { title: "Nutrition – Body Type-balanced recipes", cat: "Nutrition", img: "/assets/gallery/gallery_1640774.jpg" },
    { title: "Nutrition – Healing kitchari bowls", cat: "Nutrition", img: "/assets/gallery/gallery_1640771.jpg" },

    // Architecture
    { title: "Architecture – Eco-friendly river cottages", cat: "Architecture", img: "/assets/gallery/gallery_2356045.jpg" },
    { title: "Architecture – Holistic treatment rooms", cat: "Architecture", img: "/assets/gallery/gallery_1624438.jpg" },
    { title: "Architecture – Open-air yoga pavilion", cat: "Architecture", img: "/assets/gallery/gallery_3822622.jpg" },
    { title: "Architecture – Courtyards and pathways", cat: "Architecture", img: "/assets/gallery/gallery_3759657.jpg" },
    { title: "Architecture – Natural materials and textures", cat: "Architecture", img: "/assets/gallery/gallery_1346347.jpg" },
    { title: "Architecture – Soothing interior design", cat: "Architecture", img: "/assets/gallery/gallery_4056535.jpg" },

    // Activities
    { title: "Activities – Zen Sand Garden meditation", cat: "Activities", img: "/assets/gallery/gallery_4056535.jpg" },
    { title: "Activities – Pottery and creative expression", cat: "Activities", img: "/assets/gallery/gallery_3822622.jpg" },
    { title: "Activities – Village walks and nature exploration", cat: "Activities", img: "/assets/gallery/gallery_1552242.jpg" },
    { title: "Activities – Gardening and organic farming", cat: "Activities", img: "/assets/gallery/gallery_3759657.jpg" },
    { title: "Activities – Cooking lessons and workshops", cat: "Activities", img: "/assets/gallery/gallery_1640777.jpg" },
    { title: "Activities – Group activities and community gatherings", cat: "Activities", img: "/assets/gallery/gallery_1346347.jpg" }
  ];

  const filteredItems = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.cat === activeTab);

  const filteredWithIndex = filteredItems.map((item, idx) => ({ ...item, filteredIdx: idx }));

  const isMobile = width < 768;

  // 3 columns on laptop/desktop, 2 columns on mobile
  const numCols = width >= 768 ? 3 : 2;
  const cols = Array.from({ length: numCols }, (_, colIdx) => {
    const offsetItems = [];
    const len = filteredWithIndex.length;
    if (len === 0) return [];

    for (let i = 0; i < len; i++) {
      offsetItems.push(filteredWithIndex[(i + colIdx * 2) % len]);
    }
    return offsetItems;
  });

  const fillColumn = (columnItems) => {
    if (!columnItems || columnItems.length === 0) return [];
    let result = [...columnItems];
    while (result.length < 10) {
      result = [...result, ...columnItems];
    }
    return [...result, ...result];
  };

  // Handle active items for layout pagination
  const displayItems = filteredWithIndex;

  // Distribute items into columns for dynamic masonry layout (mobile fallback)
  const numColumns = width >= 768 ? 3 : 2;
  const masonryColumns = Array.from({ length: numColumns }, () => []);
  filteredWithIndex.forEach((item) => {
    const shortestColIdx = masonryColumns
      .map((col, idx) => ({ length: col.length, idx }))
      .reduce((shortest, curr) => (curr.length < shortest.length ? curr : shortest), { length: Infinity, idx: 0 }).idx;
    masonryColumns[shortestColIdx].push(item);
  });

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedIdx > 0) setSelectedIdx(selectedIdx - 1);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedIdx < filteredItems.length - 1) setSelectedIdx(selectedIdx + 1);
  };

  // Close selection on tab switch
  useEffect(() => {
    setSelectedIdx(null);
  }, [activeTab]);

  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  // Staggered tab button animation variants
  const tabButtonVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', paddingTop: 0, position: 'relative', overflowX: 'hidden' }}>

      {/* Botanical Leaf Vector Watermarks */}
      <Pattern24 style={{ position: 'absolute', top: '25%', left: '-80px', width: '340px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      <Pattern25 style={{ position: 'absolute', top: '60%', right: '-80px', width: '340px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Unified Typewriter Hero Section */}
      <section
        className="mobile-hero-compact"
        style={{
          boxSizing: 'border-box',
          padding: '6rem 8% 3rem 8%',
          background: 'linear-gradient(135deg, #c5cc9f 0%, #b3ba8e 60%, #9ea776 100%)',
          color: 'var(--wine)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          marginBottom: '0'
        }}
      >
        {/* Leaf SVG Watermark Overlays */}
        <Pattern24 style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Ambient Wine & Gold Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '10%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Background Rotating Mandala Watermark (Spaces Hero Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: '620px', height: '620px',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        {/* ── BOTANICAL BLOOM (FINAL CHOSEN ANIMATION) ── */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%', textAlign: 'center', marginTop: '-2.5rem' }}>
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

          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '1.2rem' }}>
            Moments
          </span>
          <motion.h1
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
            style={{color: 'var(--wine)', 
            margin: '0 0 0.9rem 0', 
            lineHeight: 1.1, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.7rem', 
            flexWrap: 'wrap'}}
          >
            {["Our", "Gallery"].map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { scale: 0.4, rotate: -15, opacity: 0, filter: 'blur(8px)' },
                  visible: { scale: [0.4, 1.05, 1], rotate: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
                }}
                animate={{
                  scale: [1, 1.015, 1],
                  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 + 1.2 }
                }}
                style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: 'var(--raisin-black)', maxWidth: '700px', margin: '1.8rem auto 0 auto', fontSize: 'var(--fs-body)', lineHeight: 1.85, fontWeight: 300 }}
          >
            Discover the serene beauty and transformative experiences that await you at Suprada Wellness. Explore our retreat spaces, therapeutic treatments, nutritious cuisine, and peaceful architecture.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '1.5rem 5% 1.5rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {categories.map((cat, idx) => {
            const isActive = activeTab === cat;
            return (
              <motion.button
                key={cat}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={tabButtonVariants}
                onClick={() => setActiveTab(cat)}
                style={{
                  position: 'relative',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '30px',
                  border: '1.5px solid transparent',
                  backgroundColor: 'transparent',
                  color: isActive ? 'var(--wine)' : 'rgba(94, 39, 53, 0.7)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPillAesthetic"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: 'var(--sage)',
                      borderRadius: '30px',
                      zIndex: -1
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {!isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      borderRadius: '30px',
                      border: '1.5px solid rgba(94, 39, 53, 0.12)',
                      pointerEvents: 'none'
                    }}
                  />
                )}
                <span>{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Main Grid Area */}
      <section style={{ padding: '0 8% 3rem 8%', position: 'relative' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-up-aesthetic {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scroll-down-aesthetic {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .scroll-col-up {
            animation: scroll-up-aesthetic 130s linear infinite;
          }
          .scroll-col-down {
            animation: scroll-down-aesthetic 130s linear infinite;
          }
          .scroll-col-up:hover, .scroll-col-down:hover {
            animation-play-state: paused;
          }
        `}} />

        <div style={{
          display: 'flex',
          gap: isMobile ? '0.45rem' : '0.55rem',
          height: isMobile ? '520px' : '680px',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.5rem',
          borderRadius: '24px',
          backgroundColor: 'rgba(94, 39, 53, 0.015)',
          border: '3px solid var(--harvest-gold)',
          boxShadow: '0 20px 50px rgba(94, 39, 53, 0.12), inset 0 0 20px rgba(220, 160, 50, 0.05)'
        }}>
          {cols.map((colItems, colIdx) => {
            const isUp = colIdx % 2 === 0;
            const animationClass = isUp ? 'scroll-col-up' : 'scroll-col-down';
            const filled = fillColumn(colItems);

            return (
              <div
                key={`${colIdx}-${activeTab}`}
                className={animationClass}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '0.45rem' : '0.55rem',
                  flex: 1,
                  height: 'max-content'
                }}
              >
                {filled.map((item, itemIdx) => (
                  <div
                    key={`${item.title}-${itemIdx}`}
                    onClick={() => setSelectedIdx(item.filteredIdx)}
                    style={{
                      width: '100%',
                      height: isMobile ? '165px' : '265px',
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)',
                      border: '2px solid rgba(220, 160, 50, 0.25)',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <TiltCard style={{ width: '100%', height: '100%' }}>
                      <CardInner item={item} isSelected={false} idx={itemIdx} />
                    </TiltCard>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience CTA */}
      <section style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '4rem 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(220,160,50,0.03) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
        <h2 style={{color: 'var(--tan)', marginBottom: '1rem',}}>
          Experience Suprada in Person
        </h2>
        <p style={{ opacity: 0.8, maxWidth: '550px', margin: '0 auto 2.5rem auto', fontSize: 'var(--fs-body)', lineHeight: 1.6 }}>
          While photographs capture visual moments, nothing compares to the physical serenity of our forest retreat.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="btn-luxury"
          style={{ padding: '0.8rem 2.5rem', fontSize: '0.78rem' }}
        >
          Schedule a Visit
        </button>
      </section>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(25, 23, 24, 0.95)', zIndex: 10000,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden',
                maxWidth: '900px', width: '100%', boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
                border: '1px solid rgba(220,160,50,0.2)', position: 'relative'
              }}
            >
              <div style={{ height: '420px', overflow: 'hidden', backgroundColor: '#000000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Slide Count Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.2rem',
                  backgroundColor: 'rgba(25, 23, 24, 0.65)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(220, 160, 50, 0.25)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '30px',
                  color: 'var(--harvest-gold)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  pointerEvents: 'none',
                  zIndex: 10
                }}>
                  {selectedIdx + 1} / {filteredItems.length}
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedIdx}
                    src={filteredItems[selectedIdx].img}
                    alt={filteredItems[selectedIdx].title}
                    initial={{ opacity: 0, scale: 1.15, filter: "blur(18px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AnimatePresence>

                {selectedIdx > 0 && (
                  <button
                    onClick={handlePrev}
                    style={{
                      position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff',
                      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                      fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    &larr;
                  </button>
                )}

                {selectedIdx < filteredItems.length - 1 && (
                  <button
                    onClick={handleNext}
                    style={{
                      position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff',
                      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                      fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    &rarr;
                  </button>
                )}
              </div>

              <div style={{ padding: '1.8rem', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>{filteredItems[selectedIdx].cat}</span>
                    <h3 style={{color: 'var(--wine)', margin: 0,}}>
                      {filteredItems[selectedIdx].title.split(' – ')[1] || filteredItems[selectedIdx].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    style={{
                      border: 'none', background: 'var(--wine)', color: '#ffffff',
                      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.2s'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <p style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                  {getDescriptionForTitle(filteredItems[selectedIdx].title)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
