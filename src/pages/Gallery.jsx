import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const tiltX = (yc - y) / 10;
    const tiltY = (x - xc) / 10;
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
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        ...style
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.025 : 1
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Luxury descriptions based on photo subject
const getDescriptionForTitle = (title) => {
  const t = title.toLowerCase();
  if (t.includes("riverfront") || t.includes("sanctuary")) return "Pristine forest grounds along the soothing river breeze, offering peaceful solitude under ancient trees.";
  if (t.includes("mud-plastered") || t.includes("heritage")) return "Hand-crafted eco-cottages constructed using traditional mud plaster and reclaimed timber for natural cooling.";
  if (t.includes("teak") || t.includes("stone")) return "Timeless South Indian vernacular architecture blending carved stone pillars with reclaimed teak woodwork.";
  if (t.includes("ayurvedic") || t.includes("treatment suite")) return "Serene sanctuary designed for traditional Panchakarma, synchronized oil therapies, and consultations.";
  if (t.includes("sunset") || t.includes("panorama")) return "Sweeping vistas overlooking the flowing river waters as golden light washes across the forest canopy.";
  if (t.includes("interior courtyard") || t.includes("natural light")) return "Open sky inner courtyards inviting gentle sunlight and ambient air flow into calm living quarters.";
  if (t.includes("community") || t.includes("dialogue")) return "Shaded open-air seating areas for evening kirtans, philosophy discussions, and group reflections.";
  if (t.includes("rejuvenation") || t.includes("therapy room")) return "A secluded, tranquil chamber equipped with warm copper vessel treatments and herbal steams.";
  if (t.includes("satwik") || t.includes("dining")) return "Freshly prepared farm-to-table organic vegetarian meals cooked according to Ayurvedic dosha balance.";
  if (t.includes("landscape") || t.includes("nature immersion")) return "Lush forest trails and botanical gardens filled with indigenous medicinal plants and flora.";
  if (t.includes("sacred geometric") || t.includes("central courtyard")) return "Harmonious courtyards designed around traditional Vastu architecture and mandala layouts.";
  if (t.includes("yoga") || t.includes("asana")) return "Morning circadian yoga and breathwork deck surrounded by soft mist and birdsong.";
  if (t.includes("hydrotherapy") || t.includes("aqua")) return "Restorative water therapy suites and herbal baths to refresh circulation and vital energy.";
  if (t.includes("deluxe living") || t.includes("balcony")) return "Refined suites featuring custom wood furnishings, natural linens, and private veranda views.";
  if (t.includes("private cottage") || t.includes("exterior")) return "Rustic luxury residences nestled quietly within private garden clearings.";
  if (t.includes("dusk") || t.includes("ambient rest")) return "Warm ambient lanterns and quiet starlight illuminating the serene retreat pathways.";
  return "Immerse yourself in our serene retreat, designed to balance your elements and restore inner harmony.";
};

export default function Gallery({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', 'Retreat', 'Architecture', 'Therapies', 'Activities', 'Nutrition'];

  // EXACT 16 gallery items mapped exclusively from public/assets/gallery directory
  const galleryItems = [
    {
      id: 1,
      title: "Retreat – Riverfront Sanctuary & Forest Grounds",
      cat: "Retreat",
      img: "/assets/gallery/IMG_0583.JPEG",
      height: 380,
      featured: true
    },
    {
      id: 2,
      title: "Architecture – Mud-Plastered Heritage Cottages",
      cat: "Architecture",
      img: "/assets/gallery/IMG_0584.JPEG",
      height: 280
    },
    {
      id: 3,
      title: "Architecture – Reclaimed Teak & Stone Architecture",
      cat: "Architecture",
      img: "/assets/gallery/IMG_0585.JPEG",
      height: 320
    },
    {
      id: 4,
      title: "Therapies – Holistic Ayurvedic Treatment Suite",
      cat: "Therapies",
      img: "/assets/gallery/IMG_0586.JPEG",
      height: 340,
      featured: true
    },
    {
      id: 5,
      title: "Retreat – Panoramic River View & Sunset Pavilion",
      cat: "Retreat",
      img: "/assets/gallery/IMG_0587.JPEG",
      height: 290
    },
    {
      id: 6,
      title: "Architecture – Natural Light Interior Courtyard",
      cat: "Architecture",
      img: "/assets/gallery/IMG_0588.JPEG",
      height: 310
    },
    {
      id: 7,
      title: "Activities – Outdoor Community Dialogue & Gathering",
      cat: "Activities",
      img: "/assets/gallery/IMG_0589.JPEG",
      height: 300
    },
    {
      id: 8,
      title: "Therapies – Deep Rejuvenation Treatment Room",
      cat: "Therapies",
      img: "/assets/gallery/IMG_0590.JPEG",
      height: 330
    },
    {
      id: 9,
      title: "Nutrition – Organic Satwik Dining & Farm Produce",
      cat: "Nutrition",
      img: "/assets/gallery/IMG_0591.JPEG",
      height: 350,
      featured: true
    },
    {
      id: 10,
      title: "Retreat – Scenic Landscape & Nature Immersion",
      cat: "Retreat",
      img: "/assets/gallery/IMG_0592.JPEG",
      height: 300
    },
    {
      id: 11,
      title: "Architecture – Sacred Geometric Central Courtyard",
      cat: "Architecture",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.31.46 AM.jpeg",
      height: 370,
      featured: true
    },
    {
      id: 12,
      title: "Activities – Morning Yoga & Asana Flow",
      cat: "Activities",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.31.46 AM (1).jpeg",
      height: 290
    },
    {
      id: 13,
      title: "Therapies – Aqua Hydrotherapy & Cleansing Suite",
      cat: "Therapies",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.31.46 AM (2).jpeg",
      height: 310
    },
    {
      id: 14,
      title: "Architecture – Deluxe Living Quarters & Balcony",
      cat: "Architecture",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.33.48 AM.jpeg",
      height: 280
    },
    {
      id: 15,
      title: "Architecture – Private Cottage Exterior & Veranda",
      cat: "Architecture",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.33.49 AM.jpeg",
      height: 320
    },
    {
      id: 16,
      title: "Retreat – Evening Ambient Rest & Sanctuary Dusk",
      cat: "Retreat",
      img: "/assets/gallery/WhatsApp Image 2026-09-04 at 7.33.50 AM.jpeg",
      height: 290
    }
  ];

  const filteredItems = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.cat === activeTab);

  const getCategoryCount = (cat) => {
    if (cat === 'All') return galleryItems.length;
    return galleryItems.filter(item => item.cat === cat).length;
  };

  const numColumns = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
  const masonryColumns = Array.from({ length: numColumns }, () => []);
  filteredItems.forEach((item, idx) => {
    masonryColumns[idx % numColumns].push({ ...item, filteredIdx: idx });
  });

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedIdx > 0) setSelectedIdx(selectedIdx - 1);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedIdx < filteredItems.length - 1) setSelectedIdx(selectedIdx + 1);
  };

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
  }, [selectedIdx, filteredItems.length]);

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Leaf Vector Watermarks */}
      <Pattern24 style={{ position: 'absolute', top: '18%', left: '-80px', width: '320px', height: 'auto', opacity: 0.07, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      <Pattern25 style={{ position: 'absolute', top: '55%', right: '-80px', width: '320px', height: 'auto', opacity: 0.07, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

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
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Ambient Wine & Gold Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '10%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Background Rotating Mandala Watermark (Spaces Hero Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(340px, 80vw, 540px)', height: 'clamp(340px, 80vw, 540px)',
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

      {/* Category Filter Bar */}
      <section style={{ padding: '2.5rem 8% 1.5rem 8%', maxWidth: '1350px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '1.2rem 1.8rem',
          borderRadius: '24px',
          boxShadow: '0 12px 35px rgba(94, 39, 53, 0.06)',
          border: '1.5px solid rgba(220, 160, 50, 0.2)'
        }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    position: 'relative',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '30px',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--wine)' : 'rgba(94, 39, 53, 0.05)',
                    color: isActive ? '#ffffff' : 'var(--wine)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(94, 39, 53, 0.12)',
                    color: isActive ? '#ffffff' : 'var(--wine)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '12px',
                    lineHeight: 1
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Gallery Display Section - Staggered Masonry Grid */}
      <section style={{ padding: '1rem 8% 5rem 8%', maxWidth: '1350px', margin: '0 auto' }}>
        <motion.div
          key={`masonry-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: '100%'
          }}
        >
          {masonryColumns.map((colItems, colIdx) => (
            <div
              key={`col-${colIdx}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                flex: 1
              }}
            >
              {colItems.map((item) => (
                <TiltCard
                  key={item.id}
                  onClick={() => setSelectedIdx(item.filteredIdx)}
                  style={{ cursor: 'pointer', width: '100%' }}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#191718',
                    boxShadow: '0 10px 30px rgba(94, 39, 53, 0.08)',
                    border: '2px solid rgba(220, 160, 50, 0.2)',
                    height: `${item.height}px`
                  }}>
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Category Badge Top Left */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(94, 39, 53, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--harvest-gold)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '20px',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      border: '1px solid rgba(220, 160, 50, 0.3)',
                      zIndex: 2
                    }}>
                      {item.cat}
                    </div>



                    {/* Hover Overlay Gradient */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '3rem 1.4rem 1.2rem 1.4rem',
                      background: 'linear-gradient(to top, rgba(25, 23, 24, 0.95) 0%, rgba(25, 23, 24, 0.6) 60%, rgba(25, 23, 24, 0) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      zIndex: 2
                    }}>
                      <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.05rem', fontFamily: 'serif', fontWeight: 600, lineHeight: 1.3 }}>
                        {item.title.split(' – ')[1] || item.title}
                      </h3>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ))}
        </motion.div>
      </section>


      {/* Experience CTA */}
      <section style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '4.5rem 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(220,160,50,0.04) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
        <h2 style={{ color: 'var(--tan)', marginBottom: '1rem', fontFamily: 'serif', fontSize: '2.2rem' }}>
          Experience Suprada in Person
        </h2>
        <p style={{ opacity: 0.85, maxWidth: '560px', margin: '0 auto 2.2rem auto', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
          While photographs capture serene moments, nothing compares to the physical tranquility of our forest retreat along the flowing river.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="btn-luxury"
          style={{ padding: '0.85rem 2.6rem', fontSize: '0.8rem' }}
        >
          Schedule a Private Visit
        </button>
      </section>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && filteredItems[selectedIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(15, 13, 14, 0.95)', zIndex: 10000,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem', backdropFilter: 'blur(12px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden',
                maxWidth: '960px', width: '100%', boxShadow: '0 35px 80px rgba(0,0,0,0.6)',
                border: '1.5px solid rgba(220,160,50,0.3)', position: 'relative'
              }}
            >
              {/* Photo Viewer Frame */}
              <div style={{ height: width < 768 ? '320px' : '480px', overflow: 'hidden', backgroundColor: '#0a0909', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Counter Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.2rem',
                  backgroundColor: 'rgba(25, 23, 24, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(220, 160, 50, 0.3)',
                  padding: '0.4rem 0.9rem',
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
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </AnimatePresence>

                {/* Left Arrow Button */}
                {selectedIdx > 0 && (
                  <button
                    onClick={handlePrev}
                    style={{
                      position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(25, 23, 24, 0.7)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff',
                      width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s'
                    }}
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Right Arrow Button */}
                {selectedIdx < filteredItems.length - 1 && (
                  <button
                    onClick={handleNext}
                    style={{
                      position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(25, 23, 24, 0.7)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff',
                      width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s'
                    }}
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Bottom Caption & Details Bar */}
              <div style={{ padding: '1.8rem 2.2rem 1.4rem 2.2rem', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--redwood)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
                      {filteredItems[selectedIdx].cat}
                    </span>
                    <h3 style={{ color: 'var(--wine)', margin: 0, fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 700 }}>
                      {filteredItems[selectedIdx].title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => setSelectedIdx(null)}
                    style={{
                      border: 'none', background: 'var(--wine)', color: '#ffffff',
                      width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.2s'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.7, margin: '0 0 1.4rem 0', fontWeight: 300 }}>
                  {getDescriptionForTitle(filteredItems[selectedIdx].title)}
                </p>

                {/* Bottom Lightbox Thumbnail Strip */}
                <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(94, 39, 53, 0.08)' }}>
                  {filteredItems.map((item, thumbIdx) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedIdx(thumbIdx)}
                      style={{
                        width: '56px',
                        height: '42px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flexShrink: 0,
                        border: selectedIdx === thumbIdx ? '2.5px solid var(--wine)' : '2px solid transparent',
                        outline: selectedIdx === thumbIdx ? '2px solid var(--harvest-gold)' : 'none',
                        opacity: selectedIdx === thumbIdx ? 1 : 0.5,
                        transition: 'all 0.2s'
                      }}
                    >
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

