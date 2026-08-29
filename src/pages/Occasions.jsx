import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25 } from '../AnimatedPatterns';
import { Sun, Sprout, Leaf, Heart, Home, Users, Sparkles, Utensils, Droplet, Award, Handshake, Building, Crown, Check } from 'lucide-react';

const blurFadeIn = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

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

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 }
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

export default function Occasions({ onNavigate }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: 'corporate', guests: '', date: '', message: ''
  });

  const [selectedVenueIdx, setSelectedVenueIdx] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const pillarsList = [
    {
      icon: <Sun size={20} />,
      title: 'Natural Energy Sources',
      desc: 'Our infrastructure prioritizes renewable energy, natural lighting, and minimal environmental impact — reducing carbon footprint by up to 70% compared to conventional event venues.',
      stat: '70% CO2 Reduction',
      badge: 'Renewable Power',
      img: '/assets/retreat.png'
    },
    {
      icon: <Sprout size={20} />,
      title: 'Zero-Waste Philosophy',
      desc: 'Events at Suprada follow our zero-waste principles — locally sourced, plant-based meals, biodegradable materials, and practices that regenerate rather than deplete natural resources.',
      stat: '100% Biodegradable',
      badge: 'Zero-Waste',
      img: '/assets/nutrition.png'
    },
    {
      icon: <Leaf size={20} />,
      title: 'Nature-Integrated Design',
      desc: 'Unlike commercial resorts focused on consumption, our spaces are designed to integrate with nature — outdoor pavilions, open-air courtyards, and natural ventilation eliminate the need for excessive energy use.',
      stat: 'Zero HVAC Dependency',
      badge: 'Passive Ventilation',
      img: '/assets/yoga-meditation.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % pillarsList.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const [diffSlideIdx, setDiffSlideIdx] = useState(0);
  const [isMobileChart, setIsMobileChart] = useState(false);
  const scrollContainerRef = useRef(null);
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const isDraggingRef = useRef(false);
  const isHoveredTrackRef = useRef(false);
  const [activeCeremonyIdx, setActiveCeremonyIdx] = useState(0);
  const isHoveredCeremonyCardRef = useRef(false);
  const [activeSpaceModal, setActiveSpaceModal] = useState(null);
  const photoGalleryRef = useRef(null);
  const detailsCarouselRef = useRef(null);

  const scrollPhotoGallery = (direction) => {
    if (photoGalleryRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      photoGalleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollDetailsCarousel = (direction) => {
    if (detailsCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -270 : 270;
      detailsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Touch & Mouse Drag Scroll Handlers for mobile horizontal carousels
  const dragScrollState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const handleDragStart = (e, ref) => {
    const el = ref.current;
    if (!el) return;
    dragScrollState.current.isDown = true;
    dragScrollState.current.startX = (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft;
    dragScrollState.current.scrollLeft = el.scrollLeft;
  };

  const handleDragMove = (e, ref) => {
    if (!dragScrollState.current.isDown) return;
    const el = ref.current;
    if (!el) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft;
    const walk = (x - dragScrollState.current.startX) * 1.5;
    el.scrollLeft = dragScrollState.current.scrollLeft - walk;
  };

  const handleDragEnd = () => {
    dragScrollState.current.isDown = false;
  };

  // Mobile responsiveness check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const serviceOfferingsRef = useRef(null);
  const isHoveredServiceTrackRef = useRef(false);
  const [expandedServiceIdx, setExpandedServiceIdx] = useState(0);

  // Automatic smooth movement loop for Service Offerings
  useEffect(() => {
    const container = serviceOfferingsRef.current;
    if (!container) return;

    let animationFrameId;
    let lastTime = performance.now();
    const scrollSpeed = 24; // Silky smooth speed in pixels per second

    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHoveredServiceTrackRef.current && delta < 0.1) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += scrollSpeed * delta;

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0 && container.scrollLeft >= maxScroll - 2) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleServiceScroll = (dir) => {
    const container = serviceOfferingsRef.current;
    if (!container) return;
    isHoveredServiceTrackRef.current = true;
    setTimeout(() => {
      isHoveredServiceTrackRef.current = false;
    }, 3500);

    const cardStride = 236; // 220px card width + 16px gap
    const currentPosIndex = Math.round(container.scrollLeft / cardStride);
    let targetIndex = dir === 'next' ? currentPosIndex + 1 : currentPosIndex - 1;
    if (targetIndex >= 8) targetIndex = 0;
    if (targetIndex < 0) targetIndex = 7;

    setExpandedServiceIdx(targetIndex);

    container.scrollTo({
      left: targetIndex * cardStride,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobileChart(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredCeremonyCardRef.current) {
        setActiveCeremonyIdx((prev) => (prev + 1) % 8);
      }
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const wellnessDiffList = [
    {
      icon: <Leaf size={20} />,
      title: 'Wellness Over Consumption',
      desc: 'Events prioritize transformation and healing over material consumption. Activities center around yoga, meditation, nature walks, and therapeutic sessions — inherently low-carbon experiences that enrich rather than exhaust.'
    },
    {
      icon: <Heart size={20} />,
      title: 'Authentic Connection',
      desc: 'Unlike commercial venues designed for transactions, wellness centers foster genuine connections with nature, self, and community. This authenticity reduces the need for excessive decoration, entertainment, and resources.'
    },
    {
      icon: <Home size={20} />,
      title: 'Built-in Sustainability',
      desc: 'Our architecture uses natural materials — mud plaster, recycled stone, lime — which have minimal carbon footprint. The spaces breathe with nature, requiring less artificial climate control and energy consumption.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDiffSlideIdx((prev) => (prev + 1) % wellnessDiffList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    let lastTime = performance.now();
    const scrollSpeed = 26; // Silky smooth speed in pixels per second

    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const isPaused = isDraggingRef.current || isHoveredTrackRef.current || (hoveredCardIdx !== null);

      if (!isPaused && delta < 0.1) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += scrollSpeed * delta;

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0 && container.scrollLeft >= maxScroll - 2) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredCardIdx]);

  const [celebrationCardIdx, setCelebrationCardIdx] = useState(0);

  const handleScroll = (dir) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Temporarily pause auto-scroll animation on manual arrow click
    isHoveredTrackRef.current = true;
    setTimeout(() => {
      isHoveredTrackRef.current = false;
    }, 3500);

    const cardStride = 372; // 340px card width + 32px gap
    const totalCards = 6;

    // Calculate current card index from scroll position
    const currentPosIndex = Math.round(container.scrollLeft / cardStride);

    let targetIndex = dir === 'next' ? currentPosIndex + 1 : currentPosIndex - 1;
    if (targetIndex >= totalCards) targetIndex = 0;
    if (targetIndex < 0) targetIndex = totalCards - 1;

    setCelebrationCardIdx(targetIndex);

    container.scrollTo({
      left: targetIndex * cardStride,
      behavior: 'smooth'
    });
  };

  const celebrationTypes = [
    { title: 'Anniversaries', desc: 'Intimate wellness retreats designed for couples to reconnect and rejuvenate together.', icon: <Heart size={20} />, img: '/assets/occasions.png' },
    { title: 'Family Gatherings', desc: 'Reconnect in nature with tailored group wellness programs for extended families.', icon: <Users size={20} />, img: '/assets/events.jpg' },
    { title: 'Wedding Celebrations', desc: 'Pre-wedding wellness sessions, Haldi ceremonies, and post-wedding rejuvenation packages.', icon: <Sparkles size={20} />, img: '/assets/private-courtyard.webp' },
    { title: 'Private Dinners & Celebrations', desc: 'Exclusive dining experiences across serene natural settings with curated wellness menus.', icon: <Utensils size={20} />, img: '/assets/occasions.png' },
    { title: 'Group Wellness Sessions', desc: 'Private yoga, meditation, aqua therapy, and sound healing sessions for groups.', icon: <Droplet size={20} />, img: '/assets/yoga-meditation.jpg' },
    { title: 'Special Occasions', desc: 'Birthdays, milestones, reunions — redefined the Suprada way with wellness at the core.', icon: <Award size={20} />, img: '/assets/spa-interior.jpg' }
  ];

  const hinduCeremonies = [
    { name: 'Shastipurti (60th Birthday)', desc: 'A sacred ceremony celebrating the 60th birthday, symbolizing rebirth, gratitude, and health blessings.', age: '60th Year' },
    { name: 'Namakarana (Naming)', desc: 'A joyful ceremony where the newborn is formally named amidst traditional chants and family blessings.', age: 'Newborn' },
    { name: 'Annaprashana (First Feeding)', desc: 'Marking the baby\'s first taste of solid food, celebrating growth and nourishment.', age: '6 Months' },
    { name: 'Upanayanam (Thread Ceremony)', desc: 'A coming-of-age ritual where the sacred thread is bestowed, initiating the path of learning.', age: '8-12 Years' },
    { name: 'Nischitartham (Engagement)', desc: 'A sacred commitment ceremony marking the union of two hearts and two families.', age: 'Pre-Wedding' },
    { name: 'Ayushya Homam (Birthday Pooja)', desc: 'Homam performed on birthdays to invoke divine blessings for longevity and robust health.', age: 'Annual' },
    { name: 'Seemantham (Baby Shower)', desc: 'A traditional blessing ceremony celebrating the expectant mother and the child.', age: 'Pregnancy' },
    { name: 'Custom Rituals', desc: 'Ensuring your unique family customs and regional traditions are respected and executed perfectly.', age: 'Custom' }
  ];

  const venuesList = [
    {
      name: 'Taavare',
      role: 'Welcome Centre',
      desc: 'Arrival, registration, and orientation space surrounded by water. Built over a lotus pond with floating bridge entry ways.',
      capacity: 'Up to 30 Guests',
      img: '/assets/retreat.png'
    },
    {
      name: 'Champa',
      role: 'Multi-Purpose Hall',
      desc: 'Spacious high-ceiling wooden hall designed for workshops, family meets, and collaborative strategy sessions.',
      capacity: 'Up to 60 Guests',
      img: '/assets/events.jpg'
    },
    {
      name: 'Chandra Paada',
      role: 'Yoga Hall & Gym',
      desc: 'A quiet, glass-walled movement sanctuary with panoramic forest views for yoga, sound healing, and meditation.',
      capacity: 'Up to 40 Guests',
      img: '/assets/yoga-meditation.jpg'
    },
    {
      name: 'Nandi Battalu',
      role: 'Dining Hall',
      desc: 'Beautiful indoor-outdoor riverfront dining pavilion serving fresh farm-to-table organic Sattvik vegetarian meals.',
      capacity: 'Up to 50 Guests',
      img: '/assets/nutrition.png'
    },
    {
      name: 'Private Courtyards',
      role: 'Intimate Settings',
      desc: 'Stone-paved open courtyards bordered by traditional pillars, perfect for small fire homams and morning rituals.',
      capacity: 'Up to 20 Guests',
      img: '/assets/private-courtyard.webp'
    },
    {
      name: 'Amphitheatre',
      role: 'Open-Air Venue',
      desc: 'Symmetric stone-stepped outdoor theatre facing the riverbank, ideal for evening kirtans, lectures, and musical sessions.',
      capacity: 'Up to 80 Guests',
      img: '/assets/open-air-amphitheatre.png'
    },
    {
      name: 'Private Dinners',
      role: 'Exclusive Settings',
      desc: 'Beautiful riverside and orchard dining spots set up under the stars with custom theme decorations.',
      capacity: 'Up to 15 Guests',
      img: '/assets/occasions.png'
    },
    {
      name: 'Wellness Pavilions',
      role: 'Therapy Spaces',
      desc: 'Open-air therapy pavilions surrounded by lush greenery, perfect for group sound healing or ayurveda sessions.',
      capacity: 'Up to 30 Guests',
      img: '/assets/spa-interior.jpg'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const handlePrevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>

      {/* Botanical Leaf Vector Watermarks */}
      <Pattern24 style={{ position: 'absolute', top: '20%', left: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      <Pattern25 style={{ position: 'absolute', top: '55%', right: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Top Header / Hero Section */}
      <section className="mobile-hero-compact" style={{
        boxSizing: 'border-box',
        padding: '7rem 8% 3rem 8%',
        background: 'linear-gradient(135deg, #c46c59 0%, #b85e4c 60%, #a24d3c 100%)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Leaf SVG Watermark Overlays */}
        <Pattern24 style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.16, color: '#ffffff', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.16, color: '#ffffff', pointerEvents: 'none' }} />

        {/* Ambient Golden Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', maxWidth: '400px', width: '100%', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.22) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(65px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

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
              src="/assets/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '85px', width: 'auto', filter: 'drop-shadow(0 4px 16px rgba(220, 160, 50, 0.35))' }} 
            />
          </motion.div>

          <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '1.2rem' }}>
            ✦ Elevated Gatherings ✦
          </span>
          <motion.h1
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
            style={{
              color: '#ffffff',
              lineHeight: 1.15, margin: 0, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'
            }}
          >
            {["Occasions", "at", "Suprada"].map((word, idx) => (
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
                style={{ display: 'inline-block', transformOrigin: 'center bottom', color: word === 'Suprada' ? 'var(--harvest-gold)' : '#ffffff', fontStyle: word === 'Suprada' ? 'italic' : 'normal' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: '#f5ebd9', maxWidth: '720px', margin: '1.8rem auto 0 auto', fontSize: '1.08rem', lineHeight: 1.8, fontWeight: 300 }}
          >
            From intimate moments to grand gatherings, we curate healthcations that infuse every occasion with transformative wellness experiences. Our versatile spaces accommodate groups from two to fifty guests.
          </motion.p>
        </div>
      </section>

      {/* Why Wellness Centers Lead in Carbon-Free Events Section */}
      <section style={{ padding: '3.5rem 10%', backgroundColor: 'var(--antique-white)', position: 'relative', overflow: 'hidden' }}>
        <Pattern24 style={{ position: 'absolute', top: '5%', right: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', margin: '0 auto 4rem auto', maxWidth: '800px' }}>
            <AnimatedParagraph
              text="Research shows that wellness centers like Suprada offer a unique alternative to traditional commercial venues — hosting events that are not only carbon-neutral but transformative, fostering genuine well-being rather than consumption."
              style={{ fontSize: '0.98rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.7, fontStyle: 'italic', justifyContent: 'center' }}
            />
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'center' }}>

          {/* Left Column: Interactive Image Showcase Frame */}
          <div style={{ position: 'relative', height: '480px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 55px rgba(94, 39, 53, 0.08)', border: '1px solid rgba(220,160,50,0.1)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                <img
                  src={pillarsList[activePillar].img}
                  alt={pillarsList[activePillar].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Vignette bottom */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(25, 23, 24, 0.85) 0%, rgba(0,0,0,0) 50%)',
                  pointerEvents: 'none'
                }} />

                {/* Animated Badge & Stat Overlay */}
                <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#ffffff', zIndex: 10 }}>
                  <motion.span
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: 'var(--harvest-gold)',
                      color: 'var(--wine)',
                      padding: '0.4rem 1rem',
                      borderRadius: '30px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 12px rgba(220,160,50,0.3)'
                    }}
                  >
                    {pillarsList[activePillar].badge}
                  </motion.span>

                  <motion.h3
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                    style={{ color: 'var(--tan)', margin: 0, }}
                  >
                    {pillarsList[activePillar].stat}
                  </motion.h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Navigation Cards */}
          <div className="flex-stack-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            <div>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>Event Innovation</span>
              <h2 style={{ color: 'var(--wine)', lineHeight: 1.2, margin: 0 }}>
                Why Wellness Centers Lead in Carbon-Free Events
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {pillarsList.map((item, idx) => {
                const isActive = activePillar === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActivePillar(idx)}
                    onMouseEnter={() => setActivePillar(idx)}
                    layout
                    style={{
                      display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
                      cursor: 'pointer', padding: isActive ? '1.25rem 1.4rem' : '0.9rem 1.4rem', borderRadius: '12px',
                      border: '1.5px solid',
                      borderColor: isActive ? 'rgba(220, 160, 50, 0.4)' : 'rgba(94, 39, 53, 0.05)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.35)',
                      boxShadow: isActive ? '0 12px 30px rgba(94, 39, 53, 0.06)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isActive && (
                      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', backgroundColor: 'var(--harvest-gold)' }} />
                    )}

                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      backgroundColor: isActive ? 'var(--wine)' : 'rgba(220, 160, 50, 0.12)',
                      color: isActive ? '#ffffff' : 'var(--harvest-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem', flexShrink: 0, transition: 'all 0.3s'
                    }}>
                      {item.icon}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, paddingTop: '0.2rem' }}>
                      <h4 style={{ color: 'var(--wine)', margin: 0, }}>
                        {item.title}
                      </h4>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="accordion-content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.6 }}>
                              {item.desc}
                            </p>

                            <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(94, 39, 53, 0.08)', marginTop: '0.8rem', borderRadius: '1px', overflow: 'hidden' }}>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 5.5, ease: "linear" }}
                                style={{ height: '100%', backgroundColor: 'var(--harvest-gold)', transformOrigin: '0%' }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* The Wellness Difference Section — Single-Screen Compact Showcase */}
      <section style={{ padding: '2.5rem 5%', backgroundColor: 'var(--antique-white)', borderTop: '1px solid rgba(94, 39, 53, 0.05)', position: 'relative', overflow: 'hidden' }}>
        <Pattern25 style={{ position: 'absolute', bottom: '5%', left: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        <Pattern24 style={{ position: 'absolute', top: '5%', right: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Main Title Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(220, 160, 50, 0.12)', border: '1px solid var(--harvest-gold)', padding: '0.25rem 0.9rem', borderRadius: '20px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wine)' }}>✦</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.68rem', fontWeight: 800, color: 'var(--wine)' }}>Exclusive Insight</span>
            </div>
            <h2 style={{ color: 'var(--wine)', margin: 0, lineHeight: 1.2 }}>
              The Wellness Difference
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '620px', margin: '0.4rem auto 0 auto', fontSize: '0.92rem', lineHeight: 1.5 }}>
              How wellness-centered event hosting creates meaningful connections while lowering environmental impact.
            </p>
          </div>

          {/* Desktop & Tablet Orbit Showcase */}
          {!isMobileChart && (
            <div style={{
              position: 'relative',
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              {/* Background Orbital Dashed Motion Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  width: '340px',
                  height: '340px',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(220, 160, 50, 0.35)',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              {/* Featured Center Card */}
              <div style={{
                position: 'relative',
                width: '310px',
                height: '310px',
                borderRadius: '50%',
                backgroundColor: 'var(--wine)',
                color: 'var(--isabelline)',
                border: '3px solid var(--harvest-gold)',
                boxShadow: '0 20px 45px rgba(94, 39, 53, 0.3), 0 0 30px rgba(220, 160, 50, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.8rem',
                textAlign: 'center',
                zIndex: 10,
                overflow: 'hidden'
              }}>
                <Pattern24 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, color: 'var(--harvest-gold)', pointerEvents: 'none' }} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={diffSlideIdx}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%'
                    }}
                  >
                    <span style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>
                      {wellnessDiffList[diffSlideIdx].icon}
                    </span>
                    <h3 style={{ color: 'var(--harvest-gold)', margin: '0 0 0.5rem 0', lineHeight: 1.25 }}>
                      {wellnessDiffList[diffSlideIdx].title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--isabelline)', opacity: 0.92, lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                      {wellnessDiffList[diffSlideIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3 Satellite Orbs orbiting center */}
              {wellnessDiffList.map((item, idx) => {
                const totalItems = 3;
                const angleDeg = (360 / totalItems) * idx - 90;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radius = 170;
                const xPos = Math.cos(angleRad) * radius;
                const yPos = Math.sin(angleRad) * radius;
                const isActive = diffSlideIdx === idx;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => setDiffSlideIdx(idx)}
                    onMouseEnter={() => setDiffSlideIdx(idx)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.12 : 0.95,
                      x: xPos,
                      y: yPos
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    style={{
                      position: 'absolute',
                      width: '95px',
                      height: '95px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.92)',
                      color: isActive ? 'var(--harvest-gold)' : 'var(--wine)',
                      border: isActive ? '2.5px solid var(--harvest-gold)' : '1.5px solid rgba(94, 39, 53, 0.15)',
                      boxShadow: isActive ? '0 10px 25px rgba(94, 39, 53, 0.25), 0 0 15px rgba(220, 160, 50, 0.3)' : '0 4px 15px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.4rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      zIndex: isActive ? 20 : 12,
                      transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', marginBottom: '0.1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.58rem', fontWeight: 700, lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.title.split(' ')[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Mobile Auto-Collapse View */}
          {isMobileChart && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              {/* Tab Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {wellnessDiffList.map((item, idx) => {
                  const isActive = diffSlideIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setDiffSlideIdx(idx)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '20px',
                        backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.8)',
                        color: isActive ? 'var(--harvest-gold)' : 'var(--wine)',
                        border: isActive ? '1.5px solid var(--harvest-gold)' : '1px solid rgba(94, 39, 53, 0.12)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        transition: 'all 0.3s'
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Card Display */}
              <div style={{
                width: '100%',
                backgroundColor: 'var(--wine)',
                color: 'var(--isabelline)',
                border: '2px solid var(--harvest-gold)',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(94, 39, 53, 0.2)'
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={diffSlideIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.4rem' }}>
                      {wellnessDiffList[diffSlideIdx].icon}
                    </span>
                    <h3 style={{ color: 'var(--harvest-gold)', margin: '0 0 0.5rem 0', }}>
                      {wellnessDiffList[diffSlideIdx].title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--isabelline)', opacity: 0.9, lineHeight: 1.55, margin: 0, fontWeight: 300 }}>
                      {wellnessDiffList[diffSlideIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Wellness-Themed Celebrations */}
      <section className="celebrations-section-wrapper" style={{ backgroundColor: 'var(--isabelline)', overflow: 'hidden', position: 'relative' }}>
        <Pattern24 style={{ position: 'absolute', top: '15%', right: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Style injection for smooth responsive scrollbars and carousel card sizes */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
          .no-scrollbar {
            -ms-overflow-style: none !important;  /* IE and Edge */
            scrollbar-width: none !important;  /* Firefox */
          }
          .celebrations-section-wrapper {
            padding: 3.5rem 8%;
          }
          .celebrations-card-item {
            width: 330px;
            height: 400px;
            flex-shrink: 0;
          }
          @media (max-width: 768px) {
            .celebrations-section-wrapper {
              padding: 2.5rem 1.2rem !important;
            }
            .celebrations-card-item {
              width: 280px !important;
              height: 350px !important;
              padding: 1.8rem 1.4rem !important;
            }
            .celebrations-nav-btn {
              display: none !important;
            }
          }
        `}} />

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header Row with Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '750px' }}>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 700, display: 'block' }}>Healthcations</span>
              <h2 style={{ color: 'var(--wine)', margin: 0 }}>
                Wellness-Themed Celebrations
              </h2>
              <AnimatedParagraph
                text="Explore the different types of events we host, each custom-designed to match your intention and elevate your occasion with wellness at the core."
                style={{ color: 'var(--raisin-black)', opacity: 0.75, fontSize: '0.94rem', lineHeight: 1.55, margin: 0 }}
              />
            </div>
          </div>

          {/* Draggable/Animated Carousel Track Container with Left and Right Controls */}
          <div style={{ position: 'relative', overflow: 'visible' }}>

            {/* Left Floating Scroller Arrow Button */}
            <button
              onClick={() => handleScroll('prev')}
              className="celebrations-nav-btn"
              aria-label="Previous Slide"
              style={{
                position: 'absolute',
                left: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 25,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--wine)',
                color: 'var(--harvest-gold)',
                border: '2px solid var(--harvest-gold)',
                boxShadow: '0 10px 25px rgba(94, 39, 53, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.4rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--harvest-gold)';
                e.currentTarget.style.color = 'var(--wine)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--wine)';
                e.currentTarget.style.color = 'var(--harvest-gold)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ‹
            </button>

            {/* Right Floating Scroller Arrow Button */}
            <button
              onClick={() => handleScroll('next')}
              className="celebrations-nav-btn"
              aria-label="Next Slide"
              style={{
                position: 'absolute',
                right: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 25,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--wine)',
                color: 'var(--harvest-gold)',
                border: '2px solid var(--harvest-gold)',
                boxShadow: '0 10px 25px rgba(94, 39, 53, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.4rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--harvest-gold)';
                e.currentTarget.style.color = 'var(--wine)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--wine)';
                e.currentTarget.style.color = 'var(--harvest-gold)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ›
            </button>

            <div
              ref={scrollContainerRef}
              className="no-scrollbar"
              style={{
                overflowX: 'auto',
                padding: '1rem 0.5rem',
                cursor: 'grab'
              }}
              onMouseEnter={() => { isHoveredTrackRef.current = true; }}
              onMouseLeave={() => { isHoveredTrackRef.current = false; }}
              onTouchStart={() => { isDraggingRef.current = true; }}
              onTouchEnd={() => { isDraggingRef.current = false; }}
              onMouseDown={(e) => {
                const el = scrollContainerRef.current;
                if (!el) return;
                isDraggingRef.current = true;
                el.style.cursor = 'grabbing';
                el.style.userSelect = 'none';
                const startX = e.pageX - el.offsetLeft;
                const scrollLeft = el.scrollLeft;
                const handleMouseMove = (moveEvent) => {
                  const x = moveEvent.pageX - el.offsetLeft;
                  const walk = (x - startX) * 1.5;
                  el.scrollLeft = scrollLeft - walk;
                };
                const handleMouseUp = () => {
                  isDraggingRef.current = false;
                  el.style.cursor = 'grab';
                  el.style.userSelect = 'auto';
                  window.removeEventListener('mousemove', handleMouseMove);
                  window.removeEventListener('mouseup', handleMouseUp);
                };
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <div style={{ display: 'flex', gap: '1.4rem', width: 'max-content' }}>
                {celebrationTypes.map((item, idx) => {
                  const isHovered = hoveredCardIdx === idx;
                  const isAnyHovered = hoveredCardIdx !== null;
                  return (
                    <div
                      key={idx}
                      className="celebrations-card-item"
                      onMouseEnter={() => setHoveredCardIdx(idx)}
                      onMouseLeave={() => setHoveredCardIdx(null)}
                      style={{
                        position: 'relative',
                        scrollSnapAlign: 'start',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: isHovered
                          ? '0 20px 45px rgba(94, 39, 53, 0.18), 0 0 15px rgba(220, 160, 50, 0.25)'
                          : '0 12px 35px rgba(94, 39, 53, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '2.5rem 2rem',
                        cursor: 'pointer',
                        opacity: isAnyHovered && !isHovered ? 0.65 : 1,
                        transform: isHovered ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
                        border: isHovered ? '2px solid var(--harvest-gold)' : '2px solid transparent',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: isHovered ? 10 : 1
                      }}
                    >
                      {/* Background Zooming Element */}
                      <div
                        style={{
                          position: 'absolute', inset: 0,
                          backgroundImage: `url(${item.img})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          zIndex: 0,
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />

                      {/* Dark Vignette Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to top, rgba(25, 23, 24, 0.95) 0%, rgba(25, 23, 24, 0.5) 60%, rgba(25, 23, 24, 0.1) 100%)',
                        zIndex: 1
                      }} />

                      {/* Content */}
                      <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <h3 style={{ color: 'var(--tan)', margin: 0, }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontSize: '0.86rem',
                          color: '#ffffff',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 300,
                          opacity: isHovered ? 0.95 : 0,
                          maxHeight: isHovered ? '120px' : '0px',
                          transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                          transition: 'opacity 0.4s ease, max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          overflow: 'hidden'
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Traditional Hindu Ceremonies */}
      <section style={{ padding: '3.5rem 10%', background: 'linear-gradient(135deg, #c2d0ac 0%, #a8b891 100%)', color: 'var(--raisin-black)', position: 'relative', overflow: 'hidden' }}>
        <Pattern25 style={{ position: 'absolute', top: '10%', left: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--wine)', }}>
              Traditional Hindu Ceremonies
            </h2>
            <AnimatedParagraph
              text="We support families in celebrating sacred Hindu traditions with authenticity and care. From milestone birthdays to welcoming new beginnings, our team ensures every ritual is performed meaningfully and seamlessly. Our comprehensive services include venue decoration, pooja arrangements, priest coordination, catering, photography, guest management, and custom rituals based on your family traditions."
              style={{ color: 'var(--raisin-black)', opacity: 0.85, maxWidth: '780px', margin: '1rem auto 0 auto', fontSize: '0.98rem', lineHeight: 1.65, justifyContent: 'center' }}
            />
          </div>

          {/* Responsive styles for Hindu Ceremonies showcase */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 868px) {
              .ceremonies-responsive-layout {
                grid-template-columns: 1fr !important;
                gap: 1.8rem !important;
              }
              .ceremonies-tabs-container {
                flex-direction: row !important;
                overflow-x: auto !important;
                padding-bottom: 0.6rem !important;
                border-right: none !important;
                border-bottom: 1px solid rgba(94, 39, 53, 0.12) !important;
                padding-right: 0 !important;
              }
              .ceremonies-tab-item {
                white-space: nowrap !important;
                border-left: none !important;
                border-bottom: 2px solid transparent !important;
                padding: 0.8rem 1rem !important;
              }
              .ceremonies-tab-item.active {
                border-bottom-color: var(--wine) !important;
                border-left-color: transparent !important;
              }
            }
          `}} />

          {/* Large showcase card section with navigation tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '3rem', marginTop: '2rem' }} className="ceremonies-responsive-layout">

            {/* Sidebar Navigation Tabs */}
            <div
              className="ceremonies-tabs-container no-scrollbar"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                borderRight: '1px solid rgba(94, 39, 53, 0.12)',
                paddingRight: '1.5rem',
                maxHeight: '450px',
                overflowY: 'auto'
              }}
            >
              {[
                { name: 'Shastipurti', subtitle: '60th Birthday Ritual', desc: 'A sacred milestone celebrating the 60th birthday, symbolizing rebirth, gratitude, and blessings for a healthy, long life.', age: '60th Year' },
                { name: 'Namakarana', subtitle: 'Naming Ceremony', desc: 'A joyful moment where the newborn is bestowed with a meaningful name amid prayers and blessings.', age: 'Newborn' },
                { name: 'Annaprashana', subtitle: 'First Feeding Ceremony', desc: 'Celebrating the baby\'s first taste of solid food, marking the beginning of a nourishing journey.', age: '6 Months' },
                { name: 'Upanayanam', subtitle: 'Thread Ceremony', desc: 'A significant coming-of-age ceremony where the sacred thread is bestowed, initiating spiritual learning.', age: '8-12 Years' },
                { name: 'Nischitartham', subtitle: 'Engagement', desc: 'A sacred commitment ceremony marking the formal betrothal and the union of two families.', age: 'Pre-Wedding' },
                { name: 'Ayushya Homam', subtitle: 'Birthday Poojas', desc: 'Special prayers and rituals performed on birthdays to invoke divine blessings for health and longevity.', age: 'Annual' },
                { name: 'Seemantham', subtitle: 'Baby Shower', desc: 'A traditional ceremony celebrating the expectant mother, showering her with blessings and good wishes.', age: 'Pregnancy' },
                { name: 'Custom Ceremonies', subtitle: 'Family Traditions', desc: 'We honor your unique family customs and traditions, ensuring every ritual reflects your heritage.', age: 'Custom' }
              ].map((ceremony, idx) => {
                const isActive = activeCeremonyIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveCeremonyIdx(idx);
                    }}
                    className={`ceremonies-tab-item ${isActive ? 'active' : ''}`}
                    style={{
                      padding: '0.9rem 1.2rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      borderLeft: '3px solid transparent',
                      borderLeftColor: isActive ? 'var(--wine)' : 'transparent',
                      color: isActive ? 'var(--wine)' : '#3d3d32',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.55)' : 'transparent',
                      boxShadow: isActive ? '0 4px 15px rgba(0, 0, 0, 0.05)' : 'none',
                      fontWeight: isActive ? 700 : 500,
                      opacity: isActive ? 1 : 0.75,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                        e.currentTarget.style.color = 'var(--wine)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.opacity = '0.75';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#3d3d32';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{ceremony.name}</span>
                      <span style={{ fontSize: '0.68rem', opacity: 0.75, marginTop: '0.1rem', fontWeight: 400 }}>{ceremony.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Focused Animated Details Pane / Card - Glassmorphism style matching reference */}
            <div
              onMouseEnter={() => {
                isHoveredCeremonyCardRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredCeremonyCardRef.current = false;
              }}
              style={{
                border: '1.5px solid rgba(255, 255, 255, 0.75)',
                borderRadius: '24px',
                padding: '3rem 2.8rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.35) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.35s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Leaf SVG Watermark Outlines matching reference */}
              <Pattern25 style={{ position: 'absolute', top: '-40px', left: '-50px', width: '270px', opacity: 0.15, color: 'var(--wine)', pointerEvents: 'none' }} />
              <Pattern24 style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '280px', opacity: 0.15, color: 'var(--wine)', pointerEvents: 'none' }} />
              {/* Autoplay timeline indicators/dots at the bottom edge */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: 'rgba(94,39,53,0.1)' }}>
                <motion.div
                  key={activeCeremonyIdx}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5.5, ease: 'linear' }}
                  style={{ height: '100%', backgroundColor: 'var(--wine)' }}
                />
              </div>

              {(() => {
                const ceremoniesList = [
                  { name: 'Shastipurti', subtitle: '60th Birthday Ritual', desc: 'A sacred milestone celebrating the 60th birthday, symbolizing rebirth, gratitude, and blessings for a healthy, long life.', age: '60th Year' },
                  { name: 'Namakarana', subtitle: 'Naming Ceremony', desc: 'A joyful moment where the newborn is bestowed with a meaningful name amid prayers and blessings.', age: 'Newborn' },
                  { name: 'Annaprashana', subtitle: 'First Feeding Ceremony', desc: 'Celebrating the baby\'s first taste of solid food, marking the beginning of a nourishing journey.', age: '6 Months' },
                  { name: 'Upanayanam', subtitle: 'Thread Ceremony', desc: 'A significant coming-of-age ceremony where the sacred thread is bestowed, initiating spiritual learning.', age: '8-12 Years' },
                  { name: 'Nischitartham', subtitle: 'Engagement', desc: 'A sacred commitment ceremony marking the formal betrothal and the union of two families.', age: 'Pre-Wedding' },
                  { name: 'Ayushya Homam', subtitle: 'Birthday Poojas', desc: 'Special prayers and rituals performed on birthdays to invoke divine blessings for health and longevity.', age: 'Annual' },
                  { name: 'Seemantham', subtitle: 'Baby Shower', desc: 'A traditional ceremony celebrating the expectant mother, showering her with blessings and good wishes.', age: 'Pregnancy' },
                  { name: 'Custom Ceremonies', subtitle: 'Family Traditions', desc: 'We honor your unique family customs and traditions, ensuring every ritual reflects your heritage.', age: 'Custom' }
                ];
                const activeCeremony = ceremoniesList[activeCeremonyIdx];
                return (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCeremonyIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', flex: 1 }}
                    >
                      <div>
                        <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                          <motion.span
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.05, duration: 0.3 }}
                            style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--redwood)', fontWeight: 700 }}
                          >
                            {activeCeremony.subtitle}
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: '0.68rem', backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}
                          >
                            {activeCeremony.age}
                          </motion.span>
                        </div>

                        <h3 style={{ color: 'var(--wine)', margin: '0 0 1.2rem 0', display: 'flex', flexWrap: 'wrap' }}>
                          {activeCeremony.name.split("").map((char, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }}
                              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                              transition={{ delay: index * 0.02, duration: 0.25 }}
                              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'char' }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </h3>

                        <p style={{ fontSize: '1rem', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.75, margin: 0, fontWeight: 400 }}>
                          {activeCeremony.desc.split(" ").map((word, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.015, duration: 0.35, ease: 'easeOut' }}
                              style={{ display: 'inline-block', marginRight: '0.26em' }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </p>
                      </div>

                      <div style={{ marginTop: '2.5rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(94,39,53,0.15)' }}>
                        <span
                          onClick={() => {
                            document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' });
                            setFormData({ ...formData, type: 'hindu-ceremony', message: `Inquiry regarding: ${activeCeremony.name}` });
                            setFormStep(1);
                          }}
                          style={{ color: 'var(--wine)', fontSize: '0.86rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                        >
                          Plan Ritual &rarr;
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })()}
            </div>
          </div>

          {/* Service Offerings Section with Glassmorphic Container & Glassy Pill Cards */}
          <div style={{
            marginTop: '3.5rem',
            padding: '2.2rem 2rem',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.22) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.65)',
            borderRadius: '24px',
            boxShadow: '0 12px 35px rgba(94, 39, 53, 0.08)'
          }}>

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <h4 style={{ color: 'var(--wine)', margin: 0, }}>
                Our Service Offerings
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.85, margin: '0.4rem 0 0 0', fontWeight: 400 }}>
                We provide complete end-to-end support to make your sacred ceremony seamless and meaningful.
              </p>
            </div>

            {/* Slider Container with Side-Mounted Floating Arrow Buttons */}
            <div style={{ position: 'relative', padding: '0 0.5rem' }}>

              {/* Left Arrow Button */}
              <button
                onClick={() => handleServiceScroll('prev')}
                aria-label="Previous Service"
                style={{
                  position: 'absolute',
                  left: '-18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 25,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--wine)',
                  border: '1.5px solid var(--harvest-gold)',
                  color: 'var(--harvest-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--harvest-gold)'; e.currentTarget.style.color = 'var(--wine)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.color = 'var(--harvest-gold)'; }}
              >
                ‹
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => handleServiceScroll('next')}
                aria-label="Next Service"
                style={{
                  position: 'absolute',
                  right: '-18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 25,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--wine)',
                  border: '1.5px solid var(--harvest-gold)',
                  color: 'var(--harvest-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--harvest-gold)'; e.currentTarget.style.color = 'var(--wine)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.color = 'var(--harvest-gold)'; }}
              >
                ›
              </button>

              {/* Horizontal Track of Sleek Compact Pill Cards */}
              <div
                ref={serviceOfferingsRef}
                className="no-scrollbar"
                style={{
                  overflowX: 'auto',
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.8rem 0.2rem'
                }}
                onMouseEnter={() => { isHoveredServiceTrackRef.current = true; }}
                onMouseLeave={() => { isHoveredServiceTrackRef.current = false; }}
              >
                {[
                  'Venue Decoration',
                  'Pooja Arrangements',
                  'Priest Coordination',
                  'Satwik Catering',
                  'Photography & Film',
                  'Guest Management',
                  'Custom Rituals',
                  'Family Tradition Support'
                ].map((service, idx) => {
                  const isHovered = expandedServiceIdx === idx;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ translateY: -3, scale: 1.03 }}
                      onMouseEnter={() => setExpandedServiceIdx(idx)}
                      onMouseLeave={() => setExpandedServiceIdx(null)}
                      style={{
                        padding: '0.75rem 1.6rem',
                        borderRadius: '30px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        cursor: 'pointer',
                        background: isHovered
                          ? 'var(--wine)'
                          : 'rgba(255, 255, 255, 0.65)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: isHovered
                          ? '1.5px solid var(--harvest-gold)'
                          : '1px solid rgba(255, 255, 255, 0.85)',
                        color: isHovered ? '#ffffff' : 'var(--wine)',
                        fontSize: '0.88rem',
                        fontWeight: isHovered ? 700 : 600,
                        boxShadow: isHovered
                          ? '0 8px 22px rgba(94, 39, 53, 0.25)'
                          : '0 4px 14px rgba(94, 39, 53, 0.06)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {service}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merged Corporate Wellness, Team Building & Retreat Activities Section */}
      <section style={{ padding: '3.5rem 8%', backgroundColor: 'var(--antique-white)', position: 'relative', overflow: 'hidden' }}>
        <Pattern24 style={{ position: 'absolute', top: '-40px', right: '-40px', maxWidth: '320px', width: '100%', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-40px', left: '-40px', maxWidth: '320px', width: '100%', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Main Merged Corporate Intro Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center', marginBottom: '4.5rem' }}>
            <div>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>
                EXECUTIVE RECOVERY &amp; VITALITY
              </span>
              <h2 style={{ color: 'var(--wine)', lineHeight: 1.25 }}>
                Corporate Wellness, Team Building &amp; Retreats
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.75, marginTop: '1.2rem', marginBottom: '1.8rem' }}>
                Suprada's corporate wellness programs blend preventive and curative drugless healthcare within a luxury forest estate. Curated from 3 to 21 days, we integrate strategy sessions, clinical stress relief, and group nature practices tailored to your corporate goals.
              </p>
              <div style={{ borderLeft: '3px solid var(--redwood)', paddingLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--raisin-black)', opacity: 0.85, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.2rem' }}>
                <strong>Available Infrastructure:</strong>
                <span>• Air-conditioned conference halls &amp; presentation gear</span>
                <span>• Internet-connected open pavilions and office cabins</span>
                <span>• Group sound healing &amp; de-stress yoga classes</span>
                <span>• Executive consultations &amp; Satwik organic catering</span>
              </div>
              <button
                onClick={() => {
                  document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' });
                  setFormData({ ...formData, type: 'corporate', message: 'Inquiry regarding: Corporate Wellness Retreat' });
                  setFormStep(1);
                }}
                className="btn-luxury"
                style={{ padding: '0.9rem 2.4rem', fontSize: '0.78rem' }}
              >
                Design a Corporate Retreat
              </button>
            </div>

            <div style={{
              backgroundImage: 'url("/assets/conference-room.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '420px',
              borderRadius: '20px',
              boxShadow: '0 20px 45px rgba(94, 39, 53, 0.12)',
              border: '1.5px solid var(--harvest-gold)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(94, 39, 53, 0.8) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '1.8rem', left: '2rem', right: '2rem', color: '#ffffff' }}>
                <span style={{ backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Estate Infrastructure
                </span>
                <h3 style={{ color: '#ffffff', margin: '0.4rem 0 0 0', }}>
                  High-Ceiling Conference Sanctuary
                </h3>
              </div>
            </div>
          </div>

          {/* Static 4-Card Corporate Retreat Interventions Grid with Periodic Gold Sheen */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            border: '1.5px solid rgba(220, 160, 50, 0.25)',
            boxShadow: '0 15px 40px rgba(94, 39, 53, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <style dangerouslySetInnerHTML={{
              __html: `
              .interventions-2col-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.4rem;
              }
              @media (max-width: 768px) {
                .interventions-2col-grid {
                  display: flex !important;
                  flex-direction: row !important;
                  overflow-x: auto !important;
                  scroll-snap-type: x mandatory !important;
                  gap: 1rem !important;
                  padding: 0.5rem 0 1.2rem 0 !important;
                  scrollbar-width: none !important;
                  -ms-overflow-style: none !important;
                  -webkit-overflow-scrolling: touch !important;
                  width: 100% !important;
                }
                .interventions-2col-grid::-webkit-scrollbar {
                  display: none !important;
                }
                .interventions-2col-card {
                  flex: 0 0 260px !important;
                  scroll-snap-align: center !important;
                  padding: 1.4rem 1.2rem !important;
                }
              }
            `}} />
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
                INTERVENTIONS &amp; MODULES
              </span>
              <h3 style={{ color: 'var(--wine)', margin: 0 }}>
                Corporate Retreat Activities
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '600px', margin: '0.5rem auto 0 auto', lineHeight: 1.6 }}>
                Four core group modules designed to enhance focus, vitality, and organizational cohesion.
              </p>
            </div>

            {/* Static 4-Card Grid - 2 Cards per row for both desktop & mobile */}
            <div className="interventions-2col-grid">
              {[
                { badge: 'Leadership', title: 'Strategy Workshops', desc: 'Facilitate focused vision setting in quiet nature pavilions.', accent: 'var(--wine)' },
                { badge: 'Mindfulness', title: 'Stress Management', desc: 'Clinical biofeedback & breathwork to eliminate executive burnout.', accent: 'var(--redwood)' },
                { badge: 'Reconnection', title: 'Forest Walks & Trails', desc: 'Guided shinrin-yoku sensory walks along private forest paths.', accent: '#2E5A36' },
                { badge: 'Cohesion', title: 'Group Yoga & Movement', desc: 'Synchronized movement sessions for physical team alignment.', accent: 'var(--harvest-gold)' }
              ].map((box, idx) => (
                <motion.div
                  key={idx}
                  className="interventions-2col-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: 'var(--harvest-gold)', boxShadow: '0 12px 30px rgba(94, 39, 53, 0.1)' }}
                  style={{
                    backgroundColor: 'var(--isabelline)',
                    border: '1.5px solid rgba(94, 39, 53, 0.12)',
                    borderRadius: '20px',
                    padding: '1.6rem 1.4rem',
                    boxShadow: '0 6px 20px rgba(94, 39, 53, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top Color Accent Indicator Bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', backgroundColor: box.accent }} />

                  {/* Periodic Gold Sheen Beam Sweeping Animation */}
                  <div className="card-shine-beam" style={{ animationDelay: `${idx * 1.1}s` }} />

                  <span style={{
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    color: 'var(--wine)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '16px',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    marginBottom: '0.8rem'
                  }}>
                    {box.badge}
                  </span>

                  <h4 style={{ color: 'var(--wine)', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
                    {box.title}
                  </h4>

                  <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.55, margin: 0 }}>
                    {box.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spaces to Celebrate - All 8 Places Single-Screen Bento Grid Redesign */}
      <section id="sanctuary-spaces-section" style={{ padding: '7rem 8%', backgroundColor: 'var(--isabelline)', position: 'relative', overflow: 'hidden' }}>
        <Pattern24 style={{ position: 'absolute', top: '15%', right: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        <Pattern25 style={{ position: 'absolute', bottom: '10%', left: '-80px', maxWidth: '340px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.6rem' }}>
              SANCTUARY ARCHITECTURE
            </span>
            <h2 style={{ color: 'var(--wine)', margin: 0 }}>
              Spaces to Celebrate
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '680px', margin: '0.8rem auto 0 auto', fontSize: '0.96rem', lineHeight: 1.65 }}>
              Our 10-acre estate includes 8 versatile indoor and outdoor sanctuaries — welcome lotus pavilions, high-ceiling wooden halls, glass yoga sanctuaries, open-air amphitheatre, and private courtyards — designed to elevate every occasion.
            </p>
          </div>

          {/* Responsive CSS for Equal 4-Column Bento Grid */}
          <style dangerouslySetInnerHTML={{
            __html: `
            .bento-spaces-8-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 1.25rem;
              grid-auto-rows: 270px;
            }
            .bento-c1, .bento-c2, .bento-c3, .bento-c4, .bento-c5, .bento-c6, .bento-c7, .bento-c8 {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }

            @media (max-width: 1024px) and (min-width: 641px) {
              .bento-spaces-8-grid {
                grid-template-columns: repeat(2, 1fr);
                grid-auto-rows: 270px;
              }
            }
            @media (max-width: 640px) {
              .bento-spaces-8-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
                grid-auto-rows: 250px;
              }
            }
          `}} />

          {/* Bento Collage Grid Layout - 8 Places */}
          <div className="bento-spaces-8-grid">
            {[
              {
                className: 'bento-c1',
                slug: 'taavare',
                name: 'Taavare – Welcome Centre',
                role: 'Welcome Centre',
                tagline: 'A warm beginning to your Suprada journey.',
                desc: 'Arrival & orientation space surrounded by lotus ponds.',
                fullDesc: 'Begin your journey with orientation and compassionate guidance at our welcome center. Lotus-inspired motifs, natural light, and breathable materials welcome guests into a calmer rhythm.',
                features: ['Warm arrival and orientation', 'Concierge assistance', 'Programme briefing', 'Lotus-pond natural setting'],
                texturesAmbience: 'Lotus-inspired motifs, natural light, and breathable clay plaster welcome guests into a calmer rhythm.',
                sustainable: 'Lotus-inspired architecture with open natural ventilation over lotus-blooming water ponds.',
                capacity: 'Up to 30 Guests',
                setting: 'Over-Water Lotus Pavilion',
                img: '/assets/retreat.png',
                galleryImages: ['/assets/retreat.png', '/assets/antaragange.png', '/assets/location_contact.png', '/assets/planting_trees.png']
              },
              {
                className: 'bento-c2',
                slug: 'champa',
                name: 'Champa – Multi-Purpose Hall',
                role: 'Multi-Purpose Hall',
                tagline: 'A tranquil hall for community and learning.',
                desc: 'Workshops, strategy meets, and community gatherings.',
                fullDesc: 'A versatile hall for workshops, gatherings, and community experiences. Flexible architecture with natural acoustics supports gatherings while remaining serene and energy-efficient.',
                features: ['Flexible event seating', 'Workshops and talks', 'Community gatherings', 'High timber ceiling acoustics'],
                texturesAmbience: 'High-ceiling timber trusses, polished teak floor acoustics, and panoramic forest canopy views.',
                sustainable: 'Flexible architecture with natural acoustics supports gatherings while remaining serene and energy-efficient.',
                capacity: 'Up to 60 Guests',
                setting: 'Climate-Controlled Timber Hall',
                img: '/assets/events.jpg',
                galleryImages: ['/assets/events.jpg', '/assets/conference-room.jpg', '/assets/satsang.png', '/assets/wellness.png']
              },
              {
                className: 'bento-c3',
                slug: 'chandra-paada',
                name: 'Chandra Paada – Yoga Hall & Gym',
                role: 'Yoga Hall & Gym',
                tagline: 'A serene setting for breath-led movement.',
                desc: 'Movement and breath-led sessions to build resilience.',
                fullDesc: 'Movement and breath-led sessions to build resilience and balance. Guided by senior therapists and doctors, aligned with your personalized wellness formula.',
                features: ['Yoga and movement props', 'Breathwork and meditation', 'Strength and mobility zones', 'Group & private yoga'],
                texturesAmbience: 'Glass-walled movement sanctuary with 360-degree forest views and natural rubber yoga mats.',
                sustainable: 'Semi-open, naturally ventilated design reduces energy use and enhances mindful practice.',
                capacity: 'Up to 40 Guests',
                setting: 'Glass-Enclosed Forest Deck',
                img: '/assets/yoga-meditation.jpg',
                galleryImages: ['/assets/yoga-meditation.jpg', '/assets/mahabilva.jpg', '/assets/walking_track.png', '/assets/sound_healing.png']
              },
              {
                className: 'bento-c4',
                slug: 'nandi-battalu',
                name: 'Nandi Battalu – Dining Hall',
                role: 'Dining Hall',
                tagline: 'Where nourishment becomes part of the healing journey.',
                desc: 'Vegetarian, seasonal cuisine aligned to your wellness programme.',
                fullDesc: 'Vegetarian seasonal cuisine aligned to your wellness programme. Doctor-curated Satwik meal plans prepared fresh with organic farm-to-table ingredients.',
                features: ['Vegetarian seasonal menus', 'Farm-to-table ingredients', 'Riverfront ambience', 'Doctor-curated Satwik meal plans'],
                texturesAmbience: 'Terracotta floor tiles, hand-woven floor seating mats, open river breezes, and natural river acoustics.',
                sustainable: 'Mud and lime plaster, recycled stones and open ventilation create a pure dining environment.',
                capacity: 'Up to 50 Guests',
                setting: 'Riverfront Semi-Open Pavilion',
                img: '/assets/nutrition.png',
                galleryImages: ['/assets/nutrition.png', '/assets/occasions.png', '/assets/gograsa.png', '/assets/retreat.png']
              },
              {
                className: 'bento-c5',
                slug: 'private-courtyards',
                name: 'Private Courtyards',
                role: 'Intimate Settings',
                tagline: 'Stone-paved sanctuaries for sacred homams & rituals.',
                desc: 'Heritage stone courtyards for small homams & rituals.',
                fullDesc: 'Our secluded open-air stone courtyards are encircled by carved granite pillars, flowering Frangipani trees, and lotus water urulis. Designed for sacred fire homams, Vedic poojas, and quiet morning meditation.',
                features: ['Hand-carved granite pillars', 'Lotus water urulis', 'Central fire homam pit', 'Shaded Frangipani court'],
                texturesAmbience: 'Weathered granite stone paving, brass oil lamps, and fragrant flowering Frangipani blooms.',
                sustainable: 'Traditional lime mortar stone construction with rainwater harvesting urulis.',
                capacity: 'Up to 20 Guests',
                setting: 'Open-Air Heritage Courtyard',
                img: '/assets/private-courtyard.webp',
                galleryImages: ['/assets/private-courtyard.webp', '/assets/antaragange.png', '/assets/agnihotra.png', '/assets/gograsa.png']
              },
              {
                className: 'bento-c6',
                slug: 'amphitheatre',
                name: 'Amphitheatre',
                role: 'Open-Air Venue',
                tagline: 'An open-air venue for cultural recitals & evening Satsangs.',
                desc: 'Performances, flute recitals & evening Satsangs under stars.',
                fullDesc: 'A majestic stone-carved amphitheatre descending towards the riverbank. Designed in harmony with classical Indian stepwell architecture for sunset cultural performances, flute recitals, and Satsangs.',
                features: ['Symmetric stepped stone seating', 'Natural acoustic riverbank backdrop', 'Central performance stage', 'Night sky stargazing setup'],
                texturesAmbience: 'Hand-cut local stone terraces, warm ambient torch lighting, and open night sky canopy.',
                sustainable: 'Zero artificial amplification required due to stepwell acoustic terracing.',
                capacity: 'Up to 80 Guests',
                setting: 'Outdoor Terraced Stone Theatre',
                img: '/assets/open-air-amphitheatre.png',
                galleryImages: ['/assets/open-air-amphitheatre.png', '/assets/satsang.png', '/assets/events.jpg', '/assets/art_therapy.png']
              },
              {
                className: 'bento-c7',
                slug: 'private-dinners',
                name: 'Private Dinners',
                role: 'Exclusive Dining',
                tagline: 'Curated candle-lit dining under the stars in serene nature.',
                desc: 'Riverside & orchard candle-lit dining under stars.',
                fullDesc: 'Exclusive private dining pop-ups created under starry night skies in our organic fruit orchard or along private sandy river banks. Features custom floral decorations, lantern lighting, personal chef service, and multi-course organic menus.',
                features: ['Private riverside/orchard setup', 'Custom floral styling & ambient lanterns', 'Personal chef & butler service', 'Ayurvedic organic tasting menus'],
                sustainable: 'Biodegradable palm-leaf table styling and locally harvested seasonal flowers.',
                capacity: 'Up to 15 Guests',
                setting: 'Private Riverside / Orchard Setup',
                img: '/assets/occasions.png',
                galleryImages: ['/assets/occasions.png', '/assets/nutrition.png', '/assets/retreat-contact.png', '/assets/location_contact.png']
              },
              {
                className: 'bento-c8',
                slug: 'pushpa',
                name: 'Pushpa – Male Treatment Pavilion',
                role: 'Therapy Spaces',
                tagline: 'A sanctuary designed for deep, restorative healing.',
                desc: 'Dedicated treatment spaces for personalised therapies.',
                fullDesc: 'Pushpa is a sanctuary designed for deep, restorative healing. Dedicated treatment spaces for personalized therapies, therapeutic massages, acupuncture, physiotherapy, detox packs, and nature baths.',
                features: ['Dedicated therapy suites', 'Therapeutic Massages & Acupuncture', 'Physiotherapy & Hydrotherapy', 'Detox Packs & Nature Baths'],
                texturesAmbience: 'Aromatic herbal steam, bamboo screens, natural stone, and tranquil bird songs.',
                sustainable: 'Built using natural stone, lime plaster and mud elements for insulation and purity. Thoughtful ventilation ensures fresh air.',
                capacity: 'Up to 30 Guests',
                setting: 'Garden Thatch Therapy Pavilion',
                img: '/assets/spa-interior.jpg',
                galleryImages: ['/assets/spa-interior.jpg', '/assets/wellness.png', '/assets/sound_healing.png', '/assets/art_therapy.png']
              }
            ].map((venue, idx) => (
              <motion.div
                key={idx}
                className={venue.className}
                onClick={() => setActiveSpaceModal(venue)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(94, 39, 53, 0.08)',
                  border: '1.5px solid rgba(220, 160, 50, 0.2)',
                  cursor: 'pointer'
                }}
              >
                {/* Background Image */}
                <img
                  src={venue.img}
                  alt={venue.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Base Vignette Layer */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 16, 18, 0.85) 0%, rgba(20, 16, 18, 0.15) 65%, transparent 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Visible Base Info */}
                <div style={{
                  position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
                  display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#ffffff',
                  zIndex: 2, pointerEvents: 'none'
                }}>
                  <span style={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'rgba(220, 160, 50, 0.25)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(220, 160, 50, 0.5)',
                    color: 'var(--harvest-gold)',
                    padding: '0.18rem 0.55rem',
                    borderRadius: '20px',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {venue.role}
                  </span>
                  <h3 style={{ color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
                    {venue.name}
                  </h3>
                </div>

                {/* Glassmorphism Hover Overlay Screen */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(20, 16, 18, 0.94)',
                    backdropFilter: 'blur(8px)',
                    padding: '1.1rem 1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 3
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{
                        backgroundColor: 'var(--harvest-gold)',
                        color: 'var(--wine)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '20px',
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        whiteSpace: 'nowrap'
                      }}>
                        {venue.role}
                      </span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {venue.capacity}
                      </span>
                    </div>

                    <h3 style={{ color: 'var(--tan)', margin: '0.15rem 0 0 0', lineHeight: 1.25 }}>
                      {venue.name}
                    </h3>

                    <p style={{
                      fontSize: '0.75rem', color: '#ffffff', opacity: 0.85, lineHeight: 1.4, margin: 0, fontWeight: 300,
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {venue.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(220, 160, 50, 0.25)', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.58rem', color: 'var(--harvest-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                      Tap to view
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSpaceModal(venue);
                      }}
                      style={{
                        backgroundColor: 'var(--harvest-gold)',
                        color: 'var(--wine)',
                        border: 'none',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '25px',
                        fontWeight: 700,
                        fontSize: '0.64rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(220, 160, 50, 0.35)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      View Space &rarr;
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => onNavigate ? onNavigate('spaces') : window.location.href = '/spaces'}
              className="btn-luxury"
              style={{ padding: '0.85rem 2.5rem', fontSize: '0.8rem' }}
            >
              Explore All Estate Spaces &amp; Architecture &rarr;
            </button>
          </div>
        </div>
    </section>

  {/* Why Suprada for Occasions Section - Luxury Round Cards */ }
  < section className = "why-suprada-section" style = {{ padding: '3.5rem 8%', backgroundColor: 'var(--isabelline)', borderTop: '1px solid rgba(220, 160, 50, 0.2)', position: 'relative', overflow: 'hidden' }}>
        <Pattern25 style={{ position: 'absolute', bottom: '-50px', left: '-50px', maxWidth: '380px', width: '100%', height: 'auto', opacity: 0.07, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
        <Pattern24 style={{ position: 'absolute', top: '-40px', right: '-40px', maxWidth: '320px', width: '100%', height: 'auto', opacity: 0.08, color: 'var(--harvest-gold)', pointerEvents: 'none', zIndex: 0 }} />
        <style dangerouslySetInnerHTML={{__html: `
          .why-suprada-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.2rem;
            align-items: stretch;
          }
          @media (max-width: 768px) {
            .why-suprada-section {
              padding: 2.5rem 1.2rem !important;
            }
            .why-suprada-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 0.75rem !important;
            }
            .why-suprada-card {
              padding: 1.4rem 0.8rem 1.2rem 0.8rem !important;
              gap: 0.8rem !important;
              border-radius: 16px !important;
            }
            .why-suprada-card h4 {
              font-size: 1.02rem !important;
            }
            .why-suprada-card p {
              font-size: 0.78rem !important;
              line-height: 1.45 !important;
            }
            .why-suprada-icon-circle {
              width: 52px !important;
              height: 52px !important;
              font-size: 1.4rem !important;
            }
            .inquiry-section-wrapper {
              padding: 4rem 1.2rem !important;
            }
            .inquiry-card-wrapper {
              padding: 1.8rem 1.2rem !important;
            }
          }
        `}} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
              The Suprada Difference
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              Why Suprada for Occasions
            </h2>
            <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '620px', margin: '1.2rem auto 0 auto', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
              Every celebration at Suprada is infused with our commitment to holistic wellness, sustainability, and authentic experiences.
            </p>
          </motion.div>

          <div className="why-suprada-grid">
            {[
              {
                icon: <Leaf size={20} />,
                title: 'Nature-based healing',
                desc: 'Experience wellness in harmony with serene natural surroundings.',
                badgeColor: '#2E5A36',
                bgGradient: 'linear-gradient(160deg, #F2F7F0 0%, #E3EFE0 100%)',
                borderColor: 'rgba(46, 90, 54, 0.25)',
                accentGlow: 'rgba(46, 90, 54, 0.15)'
              },
              {
                icon: <Handshake size={20} />,
                title: 'Exclusive wellness integrations',
                desc: 'Every celebration includes custom therapeutic session plans.',
                badgeColor: 'var(--redwood)',
                bgGradient: 'linear-gradient(160deg, #FAF2EF 0%, #F5E2DC 100%)',
                borderColor: 'rgba(184, 94, 76, 0.25)',
                accentGlow: 'rgba(184, 94, 76, 0.15)'
              },
              {
                icon: <Building size={20} />,
                title: 'Private & customizable spaces',
                desc: 'Versatile hybrid indoor-outdoor venues tailored to your vision.',
                badgeColor: '#B57E1E',
                bgGradient: 'linear-gradient(160deg, #FAF5E8 0%, #F3E7C9 100%)',
                borderColor: 'rgba(220, 160, 50, 0.35)',
                accentGlow: 'rgba(220, 160, 50, 0.2)'
              },
              {
                icon: <Crown size={20} />,
                title: 'Expert team and hospitality',
                desc: 'Dedicated wellness concierge team ensuring flawless execution.',
                badgeColor: 'var(--wine)',
                bgGradient: 'linear-gradient(160deg, #F8EEF2 0%, #EEDBE2 100%)',
                borderColor: 'rgba(94, 39, 53, 0.25)',
                accentGlow: 'rgba(94, 39, 53, 0.15)'
              }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                className="why-suprada-card"
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: `0 22px 45px ${feat.accentGlow}`,
                  borderColor: 'var(--harvest-gold)'
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  background: feat.bgGradient,
                  borderRadius: '24px',
                  padding: '2.2rem 1.1rem 1.8rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1.2rem',
                  border: `1.5px solid ${feat.borderColor}`,
                  boxShadow: '0 10px 30px rgba(94, 39, 53, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                {/* Top Glowing Decorative Rims */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${feat.badgeColor}, transparent)`,
                  opacity: 0.7
                }} />

                {/* Round Badge Icon Container */}
                <motion.div
                  className="why-suprada-icon-circle"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    color: feat.badgeColor,
                    border: `1.5px solid ${feat.borderColor}`,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  {feat.icon}
                </motion.div>

                {/* Card Title & Description */}
                <h4 style={{color: 'var(--wine)',
                  margin: 0,
                  lineHeight: 1.3}}>
                  {feat.title}
                </h4>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--raisin-black)',
                  opacity: 0.82,
                  lineHeight: 1.65,
                  margin: 0,
                  fontWeight: 300
                }}>
                  {feat.desc}
                </p>

                {/* Bottom Decorative Gold Pill Line */}
                <div style={{
                  marginTop: 'auto',
                  width: '32px',
                  height: '3px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--harvest-gold)',
                  opacity: 0.5
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section >



  {/* Inquiry Form with Multi-Step Stepper Layout */ }
  < section id = "inquiry-form" className = "inquiry-section-wrapper" style = {{ padding: '6rem 8%', backgroundColor: 'var(--antique-white)' }}>
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.8rem' }}>Inquiry</span>
        <h2 style={{ color: 'var(--wine)', }}>
          Start Planning Your Occasion
        </h2>
        <p style={{ color: 'var(--raisin-black)', opacity: 0.8, fontSize: '0.92rem', marginTop: '0.5rem' }}>
          Let\'s create a customized event plan reflecting your family traditions or business objectives.
        </p>
      </div>

      {formSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ backgroundColor: '#ffffff', border: '1px solid rgba(94, 39, 53, 0.1)', padding: '3.5rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 15px 40px rgba(94, 39, 53, 0.05)' }}
        >
          <div style={{ color: 'var(--harvest-gold)', fontSize: '1.8rem', marginBottom: '1.2rem' }}>✦</div>
          <h3 style={{ color: 'var(--wine)', marginBottom: '0.8rem', }}>Thank You</h3>
          <p style={{ fontSize: '0.92rem', opacity: 0.85, lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>
            Your inquiry has been received. Our event coordinator and medical officers will connect with you within 24 hours to schedule a consultation call.
          </p>
          <button
            onClick={() => { setFormSubmitted(false); setFormStep(1); }}
            className="btn-luxury"
            style={{ padding: '0.8rem 2.2rem', fontSize: '0.78rem', marginTop: '2rem' }}
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      ) : (
        <div className="inquiry-card-wrapper" style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '3rem 2.5rem', border: '1px solid rgba(94,39,53,0.06)', boxShadow: '0 15px 35px rgba(94,39,53,0.02)' }}>

          {/* Stepper Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '15px', left: 0, right: 0, height: '2px', backgroundColor: 'rgba(94,39,53,0.06)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '15px', left: 0, width: `${(formStep - 1) * 50}%`, height: '2px', backgroundColor: 'var(--redwood)', zIndex: 0, transition: 'width 0.4s' }} />
            {[
              { num: 1, label: 'Occasion' },
              { num: 2, label: 'Custom Details' },
              { num: 3, label: 'Contact' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: formStep >= step.num ? 'var(--redwood)' : '#ffffff',
                  color: formStep >= step.num ? '#ffffff' : 'var(--wine)',
                  border: '2px solid', borderColor: formStep >= step.num ? 'var(--redwood)' : 'rgba(94,39,53,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.3s'
                }}>
                  {step.num}
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: formStep >= step.num ? 'var(--wine)' : 'rgba(0,0,0,0.4)', textAlign: 'center' }}>{step.label}</span>
              </div>
            ))}
          </div>

          {/* Form Layout with Sliding Stepper Panels */}
          <form onSubmit={handleSubmit} className="luxury-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {formStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                >
                  <div className="form-group">
                    <label htmlFor="type">Occasion Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="corporate">Corporate Retreat</option>
                      <option value="hindu-ceremony">Hindu Ceremony (Shastipurti, etc.)</option>
                      <option value="family-celebration">Family Gathering</option>
                      <option value="anniversary">Couple Anniversary</option>
                      <option value="wedding">Pre-Wedding / Haldi</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests</label>
                      <input type="number" id="guests" name="guests" required value={formData.guests} onChange={handleInputChange} placeholder="e.g. 25" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Preferred Date(s)</label>
                      <input type="date" id="date" name="date" required value={formData.date} onChange={handleInputChange} />
                    </div>
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                >
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Sunil Kumar" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Requirements / Message</label>
                    <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleInputChange} placeholder="Please detail any specific dietary needs, traditional rituals, or corporate workshop objectives..."></textarea>
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                >
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="e.g. sunil@example.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g. +91 98765 43210" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem' }}>
              {formStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{
                    padding: '0.8rem 1.8rem', background: 'none', border: '1.5px solid rgba(94,39,53,0.2)',
                    color: 'var(--wine)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(94,39,53,0.04)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Back
                </button>
              )}

              {formStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-luxury"
                  style={{ padding: '0.8rem 2.2rem', marginLeft: 'auto', fontSize: '0.78rem' }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-luxury"
                  style={{ padding: '0.9rem 2.5rem', width: '100%', fontSize: '0.82rem' }}
                >
                  Submit Inquiry
                </button>
              )}
            </div>
          </form>

        </div>
      )}
    </div>
      </section >

  {/* Let's Craft Your Wellness-Themed Occasion Banner */ }
  < section style = {{
  padding: '6rem 10%',
    backgroundColor: 'var(--wine)',
      color: 'var(--isabelline)',
        textAlign: 'center',
          position: 'relative',
            overflow: 'hidden'
}}>
  {/* Glow backdrop */ }
  < div style = {{ position: 'absolute', top: '-20%', left: '30%', maxWidth: '600px', width: '100%', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.08) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(70px)', zIndex: 0 }} />

    < div style = {{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <h2 style={{color: 'var(--tan)', margin: 0}}>
            Let's Craft Your Wellness-Themed Occasion
          </h2>
          <p style={{ opacity: 0.85, fontSize: '1rem', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>
            Speak to our team to design a wellness-infused celebration tailored to your vision.
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
            <a
              href="tel:+91-0000000000"
              style={{
                backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)',
                padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                boxShadow: '0 4px 15px rgba(220,160,50,0.25)', display: 'inline-block'
              }}
            >
              Call Us
            </a>
            <a
              href="https://wa.me/910000000000"
              target="_blank" rel="noopener noreferrer"
              style={{
                backgroundColor: 'transparent', color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.25)',
                padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              WhatsApp
            </a>
            <a
              href="/assets/event-brochure.pdf"
              target="_blank" rel="noopener noreferrer"
              style={{
                backgroundColor: 'transparent', color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.25)',
                padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Download Event Brochure
            </a>
          </div>
        </div >
      </section >

        {/* Full Dedicated Space Detail Page View (Dedicated Full Screen Page at Root Level) */}
        <AnimatePresence>
          {activeSpaceModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: 'rgba(20, 16, 18, 0.85)',
                backdropFilter: 'blur(8px)',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999999,
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'center',
                paddingTop: isMobile ? 'max(2.5rem, env(safe-area-inset-top))' : '1.5rem',
                paddingBottom: isMobile ? '0.5rem' : '1.5rem',
                paddingLeft: isMobile ? '0.5rem' : '1.5rem',
                paddingRight: isMobile ? '0.5rem' : '1.5rem',
                overflowX: 'visible',
                boxSizing: 'border-box'
              }}
              onClick={() => setActiveSpaceModal(null)}
            >
              <motion.div
                data-lenis-prevent="true"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: 'var(--isabelline)',
                  width: '100%',
                  maxWidth: '1200px',
                  height: isMobile ? '100%' : '92vh',
                  borderRadius: isMobile ? '16px' : '24px',
                  overflowY: 'auto',
                  overflowX: 'visible',
                  overscrollBehavior: 'contain',
                  position: 'relative',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box'
                }}
              >
                {/* Sticky Top Navigation Bar */}
                <div style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'rgba(25, 23, 24, 0.96)',
                  backdropFilter: 'blur(12px)',
                  padding: isMobile ? '0.8rem 1rem' : '1.2rem 8%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 40,
                  width: '100%',
                  boxSizing: 'border-box',
                  borderBottom: '1px solid rgba(220, 160, 50, 0.25)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      color: 'var(--harvest-gold)',
                      fontSize: isMobile ? '0.85rem' : '1.1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {activeSpaceModal.name}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSpaceModal(null);
                      const spacesSection = document.getElementById('sanctuary-spaces-section');
                      if (spacesSection) spacesSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      backgroundColor: 'rgba(220, 160, 50, 0.15)',
                      color: 'var(--harvest-gold)',
                      border: '1px solid var(--harvest-gold)',
                      padding: isMobile ? '0.4rem 0.8rem' : '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: isMobile ? '0.74rem' : '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isMobile ? 'Close' : 'Close View'} &times;
                  </button>
                </div>

                {/* Main Content Layout — Photo Gallery & Specs */}
                <div className="flex-stack-mobile" style={{
                  padding: isMobile ? '1.5rem 1rem' : '4rem 8%',
                  maxWidth: '1280px',
                  width: '100%',
                  boxSizing: 'border-box',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '1.5rem' : '3.5rem',
                  color: 'var(--raisin-black)',
                  overflowX: 'visible'
                }}>
                  
                  {/* Space Title and Tagline Header */}
                  <div style={{ marginBottom: isMobile ? '0.2rem' : '1rem' }}>
                    <span style={{
                      backgroundColor: 'var(--harvest-gold)',
                      color: 'var(--wine)',
                      padding: '0.45rem 1.2rem',
                      borderRadius: '20px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      display: 'inline-block',
                      marginBottom: '0.8rem'
                    }}>
                      {activeSpaceModal.role}
                    </span>
                    <h2 style={{
                      color: 'var(--wine)',
                      margin: 0,
                      lineHeight: 1.2,
                      fontSize: isMobile ? '1.8rem' : '2.8rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700
                    }}>
                      {activeSpaceModal.name}
                    </h2>
                    {activeSpaceModal.tagline && (
                      <p style={{
                        color: 'var(--redwood)',
                        fontSize: isMobile ? '0.94rem' : '1.3rem',
                        margin: '0.6rem 0 0 0',
                        fontStyle: 'italic',
                        opacity: 0.85
                      }}>
                        {activeSpaceModal.tagline}
                      </p>
                    )}
                  </div>

                  {/* Space Photo Gallery Showcase Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: isMobile ? '0.74rem' : '0.8rem', fontWeight: 800 }}>
                        Sanctuary Photography &amp; Views
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--wine)', opacity: 0.75, fontWeight: 600 }}>
                        {(activeSpaceModal.galleryImages || [activeSpaceModal.img]).length} Gallery Shots
                      </span>
                    </div>

                    <style dangerouslySetInnerHTML={{__html: `
                      .spaces-photo-gallery {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 1.5rem !important;
                        width: 100% !important;
                      }
                      @media (max-width: 768px) {
                        .spaces-photo-gallery {
                          display: grid !important;
                          grid-template-columns: repeat(2, 1fr) !important;
                          gap: 0.65rem !important;
                          width: 100% !important;
                          padding: 0 !important;
                          box-sizing: border-box !important;
                        }
                        .spaces-photo-card {
                          width: 100% !important;
                          height: 130px !important;
                          border-radius: 12px !important;
                          box-sizing: border-box !important;
                        }
                      }
                    `}} />

                    <div className="spaces-photo-gallery">
                      {(activeSpaceModal.galleryImages || [activeSpaceModal.img]).map((gImg, gIdx) => (
                        <motion.div
                          key={gIdx}
                          className="spaces-photo-card"
                          whileHover={isMobile ? {} : { scale: 1.03, y: -4 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            height: isMobile ? '130px' : '280px',
                            borderRadius: isMobile ? '12px' : '16px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(94, 39, 53, 0.12)',
                            position: 'relative'
                          }}
                        >
                          <img
                            src={gImg}
                            alt={`${activeSpaceModal.name} view ${gIdx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                          <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.8rem', color: '#ffffff', fontSize: isMobile ? '0.7rem' : '0.78rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                            View 0{gIdx + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Information Layout - Conditional Mobile Carousel vs Desktop 2-Column Grid */}
                  {isMobile ? (
                    /* Mobile: Horizontal Carousel of Details Cards */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                      
                      <style dangerouslySetInnerHTML={{__html: `
                        .spaces-details-carousel {
                          display: flex !important;
                          flex-direction: row !important;
                          flex-wrap: nowrap !important;
                          overflow-x: scroll !important;
                          overflow-y: hidden !important;
                          gap: 0.85rem !important;
                          padding: 0.5rem 0.5rem 1.5rem 0.5rem !important;
                          scrollbar-width: none !important;
                          -ms-overflow-style: none !important;
                          -webkit-overflow-scrolling: touch !important;
                          width: 100% !important;
                          box-sizing: border-box !important;
                          touch-action: pan-x pan-y !important;
                          overscroll-behavior-x: contain !important;
                          user-select: none !important;
                          -webkit-user-select: none !important;
                        }
                        .spaces-details-carousel::-webkit-scrollbar {
                          display: none !important;
                        }
                        .spaces-detail-card-item {
                          flex: 0 0 270px !important;
                          min-width: 270px !important;
                          max-width: 270px !important;
                          width: 270px !important;
                          flex-shrink: 0 !important;
                          scroll-snap-align: start !important;
                          box-sizing: border-box !important;
                          min-height: 340px !important;
                          display: flex !important;
                          flex-direction: column !important;
                          touch-action: pan-x pan-y !important;
                          pointer-events: auto !important;
                        }
                      `}} />

                      <div 
                        className="spaces-details-carousel" 
                        ref={detailsCarouselRef} 
                        data-lenis-prevent="true"
                        onTouchStart={(e) => handleDragStart(e, detailsCarouselRef)}
                        onTouchMove={(e) => handleDragMove(e, detailsCarouselRef)}
                        onTouchEnd={handleDragEnd}
                        onMouseDown={(e) => handleDragStart(e, detailsCarouselRef)}
                        onMouseMove={(e) => handleDragMove(e, detailsCarouselRef)}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        style={{ cursor: 'grab' }}
                      >
                        {/* 1. Overview */}
                        <div className="spaces-detail-card-item" style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem 1.6rem', border: '1px solid rgba(94, 39, 53, 0.08)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
                            SANCTUARY OVERVIEW
                          </span>
                          <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.65, margin: 0, fontWeight: 400, overflowY: 'auto' }}>
                            {activeSpaceModal.fullDesc || activeSpaceModal.desc}
                          </p>
                        </div>

                        {/* 2. Features */}
                        {activeSpaceModal.features && (
                          <div className="spaces-detail-card-item" style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem 1.6rem', border: '1px solid rgba(94, 39, 53, 0.08)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                            <h4 style={{color: 'var(--wine)', marginTop: 0, marginBottom: '1.2rem', fontSize: '1.05rem'}}>
                              Purpose-Built Features
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto' }}>
                              {activeSpaceModal.features.map((feat, fIdx) => (
                                <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.9 }}>
                                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--wine)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Check size={10} /></span>
                                  <span style={{ lineHeight: 1.4 }}>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Sustainable Design */}
                        {activeSpaceModal.sustainable && (
                          <div className="spaces-detail-card-item" style={{ backgroundColor: '#ffffff', padding: '2rem 1.6rem', borderRadius: '20px', border: '1px solid rgba(94,39,53,0.1)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                            <span style={{ color: 'var(--redwood)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.8rem' }}>
                              Sustainable, Natural, Considered
                            </span>
                            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, margin: 0, opacity: 0.88, fontWeight: 400, overflowY: 'auto' }}>
                              {activeSpaceModal.sustainable}
                            </p>
                          </div>
                        )}

                        {/* 4. Textures & Ambience */}
                        {activeSpaceModal.texturesAmbience && (
                          <div className="spaces-detail-card-item" style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '2rem 1.6rem', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                            <Pattern25 style={{ position: 'absolute', right: '-30px', bottom: '-30px', width: '180px', opacity: 0.12, color: 'var(--harvest-gold)', pointerEvents: 'none' }} />
                            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.8rem' }}>
                              Textures &amp; Ambience
                            </span>
                            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, margin: 0, opacity: 0.92, fontWeight: 400, overflowY: 'auto' }}>
                              {activeSpaceModal.texturesAmbience}
                            </p>
                          </div>
                        )}

                        {/* 5. Specifications */}
                        <div className="spaces-detail-card-item" style={{
                          backgroundColor: 'var(--antique-white)',
                          padding: '2rem 1.6rem',
                          borderRadius: '20px',
                          border: '1.5px solid rgba(220, 160, 50, 0.4)',
                          boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)',
                          justifyContent: 'space-between'
                        }}>
                          <h4 style={{color: 'var(--wine)', margin: 0, borderBottom: '1px solid rgba(94,39,53,0.15)', paddingBottom: '0.6rem', fontSize: '1.05rem'}}>
                            Specifications
                          </h4>

                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>
                              Guest Capacity
                            </span>
                            <strong style={{ fontSize: '1.15rem', color: 'var(--wine)', }}>
                              {activeSpaceModal.capacity}
                            </strong>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>
                              Architectural Setting
                            </span>
                            <strong style={{ fontSize: '1.1rem', color: 'var(--wine)', }}>
                              {activeSpaceModal.setting}
                            </strong>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.2rem' }}>
                              Estate Location
                            </span>
                            <strong style={{ fontSize: '1.1rem', color: 'var(--wine)', }}>
                              Suprada Forest Estate
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs (positioned below carousel on mobile, fully aligned) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', maxWidth: '340px', margin: '1rem auto 0 auto' }}>
                        <button
                          onClick={() => {
                            setActiveSpaceModal(null);
                            const inquiryForm = document.getElementById('inquiry-form');
                            if (inquiryForm) {
                              inquiryForm.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="btn-luxury"
                          style={{ width: '100%', padding: '0.95rem 2rem', fontSize: '0.86rem', textAlign: 'center', justifyContent: 'center' }}
                        >
                          Inquire About Space &rarr;
                        </button>

                        <button
                          onClick={() => {
                            setActiveSpaceModal(null);
                            if (onNavigate) {
                              onNavigate('programmes');
                            } else {
                              window.location.href = '/programmes';
                            }
                          }}
                          style={{
                            width: '100%',
                            padding: '0.9rem 2rem',
                            borderRadius: '30px',
                            backgroundColor: 'var(--wine)',
                            color: 'var(--isabelline)',
                            border: 'none',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          Explore Programmes
                        </button>

                        <button
                          onClick={() => {
                            setActiveSpaceModal(null);
                            const spacesSection = document.getElementById('sanctuary-spaces-section');
                            if (spacesSection) spacesSection.scrollIntoView({ behavior: 'smooth' });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.85rem 2rem',
                            borderRadius: '30px',
                            backgroundColor: 'transparent',
                            color: 'var(--wine)',
                            border: '1.5px solid var(--wine)',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          &larr; Return to Spaces
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Desktop/Tablet: 2-Column Responsive Information Layout */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                      
                      {/* Left Main Column: Narrative & Features */}
                      <div className="flex-stack-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
                        
                        {/* Overview Narrative */}
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(94, 39, 53, 0.08)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '0.8rem' }}>
                            SANCTUARY OVERVIEW
                          </span>
                          <p style={{ fontSize: '1.1rem', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
                            {activeSpaceModal.fullDesc || activeSpaceModal.desc}
                          </p>
                        </div>

                        {/* Purpose-Built Features */}
                        {activeSpaceModal.features && (
                          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(94, 39, 53, 0.08)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                            <h3 style={{color: 'var(--wine)', marginTop: 0, marginBottom: '1.4rem',}}>
                              Purpose-Built Features
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                              {activeSpaceModal.features.map((feat, fIdx) => (
                                <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', fontSize: '0.98rem', color: 'var(--raisin-black)', opacity: 0.9 }}>
                                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--wine)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Check size={12} /></span>
                                  <span style={{ lineHeight: 1.4 }}>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Textures & Ambience Box */}
                        {activeSpaceModal.texturesAmbience && (
                          <div style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '2.5rem', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                            <Pattern25 style={{ position: 'absolute', right: '-30px', bottom: '-30px', width: '220px', opacity: 0.12, color: 'var(--harvest-gold)', pointerEvents: 'none' }} />
                            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.6rem' }}>
                              Textures &amp; Ambience
                            </span>
                            <p style={{ fontSize: '1rem', lineHeight: 1.75, margin: 0, opacity: 0.92, fontWeight: 300 }}>
                              {activeSpaceModal.texturesAmbience}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Specs Column: Sustainability & Capacity Box */}
                      <div className="flex-stack-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
                        
                        {/* Sustainable Design */}
                        {activeSpaceModal.sustainable && (
                          <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(94,39,53,0.1)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.03)' }}>
                            <span style={{ color: 'var(--redwood)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.6rem' }}>
                              Sustainable, Natural, Considered
                            </span>
                            <p style={{ fontSize: '1rem', lineHeight: 1.75, margin: 0, opacity: 0.88, fontWeight: 300 }}>
                              {activeSpaceModal.sustainable}
                            </p>
                          </div>
                        )}

                        {/* Specifications Summary Card */}
                        <div style={{
                          backgroundColor: 'var(--antique-white)',
                          padding: '2.5rem',
                          borderRadius: '20px',
                          border: '1.5px solid rgba(220, 160, 50, 0.4)',
                          boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1.5rem'
                        }}>
                          <h4 style={{color: 'var(--wine)', margin: 0, borderBottom: '1px solid rgba(94,39,53,0.15)', paddingBottom: '0.8rem'}}>
                            Sanctuary Specifications
                          </h4>

                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
                              Guest Capacity
                            </span>
                            <strong style={{ fontSize: '1.3rem', color: 'var(--wine)', }}>
                              {activeSpaceModal.capacity}
                            </strong>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
                              Architectural Setting
                            </span>
                            <strong style={{ fontSize: '1.2rem', color: 'var(--wine)', }}>
                              {activeSpaceModal.setting}
                            </strong>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
                              Estate Location
                            </span>
                            <strong style={{ fontSize: '1.2rem', color: 'var(--wine)', }}>
                              Suprada 10-Acres Forest Estate
                            </strong>
                          </div>
                        </div>

                        {/* Action CTAs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <button
                            onClick={() => {
                              setActiveSpaceModal(null);
                              const inquiryForm = document.getElementById('inquiry-form');
                              if (inquiryForm) {
                                inquiryForm.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="btn-luxury"
                            style={{ width: '100%', padding: '1rem 2rem', fontSize: '0.85rem', textAlign: 'center', justifyContent: 'center' }}
                          >
                            Inquire About Space &rarr;
                          </button>

                          <button
                            onClick={() => {
                              setActiveSpaceModal(null);
                              if (onNavigate) {
                                onNavigate('programmes');
                              } else {
                                window.location.href = '/programmes';
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '0.95rem 2rem',
                              borderRadius: '30px',
                              backgroundColor: 'var(--wine)',
                              color: 'var(--isabelline)',
                              border: 'none',
                              fontWeight: 600,
                              fontSize: '0.82rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            Explore Programmes
                          </button>

                          <button
                            onClick={() => {
                              setActiveSpaceModal(null);
                              const spacesSection = document.getElementById('sanctuary-spaces-section');
                              if (spacesSection) spacesSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                              width: '100%',
                              padding: '0.85rem 2rem',
                              borderRadius: '30px',
                              backgroundColor: 'transparent',
                              color: 'var(--wine)',
                              border: '1.5px solid var(--wine)',
                              fontWeight: 600,
                              fontSize: '0.82rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            &larr; Return to All Spaces
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
     </div >
  );
}
