import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27, Pattern28 } from '../AnimatedPatterns';
import { Stethoscope, Star, Leaf, Globe, Check, ArrowRight } from 'lucide-react';
import TwinklingLights from '../components/TwinklingLights';



// Ken Burns background images for Hero
const heroImages = [
  "https://images.unsplash.com/photo-1775133263714-848c8fe09e73?auto=format&fit=crop&w=2000&q=80",
  "https://images.pexels.com/photos/38494113/pexels-photo-38494113/free-photo-of-traditional-ayurvedic-kati-basti-therapy-in-uttarakhand.jpeg?auto=compress&w=2000",
  "https://images.pexels.com/photos/6187305/pexels-photo-6187305.jpeg?auto=compress&w=2000",
  "https://images.pexels.com/photos/19695945/pexels-photo-19695945/free-photo-of-a-man-having-a-shoulders-massage.jpeg?auto=compress&w=2000",
  "https://images.pexels.com/photos/37719540/pexels-photo-37719540/free-photo-of-relaxing-outdoor-massage-therapy-session.jpeg?auto=compress&w=2000"
];

const blurFadeIn = {
  hidden: { opacity: 0, y: 45, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.25, delayChildren: 0.1 } 
  }
};

const foundersStaggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};

const foundersMaskRevealParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// Official 15-Step Suprada Rhythm Schedule Dataset
const supradaRhythmSteps = [
  {
    time: "5:30 AM",
    title: "Brahma Muhurta Awakening",
    points: [
      "Wake up in harmony with nature's rhythm",
      "Silence, contemplation, gentle hydration (herbal drink)",
      "Begin the day in a calm & mindful state"
    ],
    cardType: "card-oval-shield",
    nodeColor: "var(--harvest-gold)",
    icon: "sun"
  },
  {
    time: "6:00 AM",
    title: "Cleansing & Grounding",
    points: [
      "Facial wash, tongue cleaning, warm water cleansing",
      "Grounding practice: barefoot grass walk",
      "Optional herbal teas"
    ],
    cardType: "card-soft-tag",
    nodeColor: "var(--redwood)",
    icon: "droplet"
  },
  {
    time: "6:30 - 7:30 AM",
    title: "Sunrise Yoga & Breathwork",
    points: [
      "Gentle joint warm-ups",
      "Traditional yoga asana flow",
      "Surya namaskar (as per comfort)",
      "Pranayama (Nadi Shodhana, Bhastrika, Bhramari)",
      "Gograsa (cow feeding)"
    ],
    cardType: "card-redwood-pills",
    nodeColor: "var(--wine)",
    icon: "lotus"
  },
  {
    time: "7:30 - 8:00 AM",
    title: "Gograsa & Reflexology Walk",
    points: [
      "Morning interaction with cows (cow feeding – Gograsa)",
      "Reflexology walk on pebble path / grass",
      "Sun exposure for Vitamin D"
    ],
    cardType: "card-sage-menu",
    nodeColor: "var(--harvest-gold)",
    icon: "footprint"
  },
  {
    time: "8:00 - 9:00 AM",
    title: "Mud Packs + Breakfast",
    points: [
      "Mud pack for eyes (cooling, de-stressing)",
      "Mud pack for abdomen (improves digestion, detoxification)",
      "Wholesome satwik breakfast",
      "Juices & Fruits"
    ],
    cardType: "card-wine-ticket",
    nodeColor: "var(--redwood)",
    icon: "bowl"
  },
  {
    time: "9:00 AM - 12:00 PM",
    title: "Consultations & Naturopathy Therapies",
    points: [
      "Doctor consultations & wellness assessments",
      "Naturopathy treatments: Massages, Steam, Sauna, Herbal packs",
      "Individual healing sessions: Energy therapies, Emotional release techniques, Mind-body interventions"
    ],
    cardType: "card-dark-pill",
    nodeColor: "var(--wine)",
    icon: "doctor"
  },
  {
    time: "12:30 - 1:30 PM",
    title: "Satwik Lunch",
    points: [
      "Freshly cooked seasonal vegetarian meal",
      "Mindful eating practice",
      "No phone / no conversation zone"
    ],
    cardType: "card-oval-shield",
    nodeColor: "var(--harvest-gold)",
    icon: "utensils"
  },
  {
    time: "1:30 - 3:00 PM",
    title: "Rest + Breathwork + Sound Healing",
    points: [
      "Short resting period",
      "Post-lunch breathwork to enhance digestion",
      "Calming sound healing session (bowls, chimes)",
      "Guided relaxation"
    ],
    cardType: "card-soft-tag",
    nodeColor: "var(--redwood)",
    icon: "sound"
  },
  {
    time: "3:00 - 5:00 PM",
    title: "Hydro, Mud, Sun & Vital Therapies",
    points: [
      "Hydrotherapy treatments",
      "Mud baths",
      "Sun baths (Atapasnana)",
      "Pool exercises & aqua therapy",
      "Acupuncture / Physiotherapy",
      "Cupping therapy"
    ],
    cardType: "card-wine-ticket",
    nodeColor: "var(--wine)",
    icon: "aqua"
  },
  {
    time: "5:00 - 6:00 PM",
    title: "Nature Immersion & Activities",
    points: [
      "Guided nature walk",
      "River-side activities",
      "Forest bathing",
      "Healthy cooking lessons",
      "Outdoor relaxation time"
    ],
    cardType: "card-sage-menu",
    nodeColor: "var(--harvest-gold)",
    icon: "tree"
  },
  {
    time: "6:00 - 7:00 PM",
    title: "Satsang, Bhajans & Temple Rituals",
    points: [
      "Evening satsang & bhajans",
      "Prayers",
      "Temple activities",
      "Agnihotram (fire ritual for purification)"
    ],
    cardType: "card-redwood-pills",
    nodeColor: "var(--redwood)",
    icon: "flame"
  },
  {
    time: "7:00 - 8:00 PM",
    title: "Satwik Dinner",
    points: [
      "Light, nurturing dinner",
      "Herbal digestive support"
    ],
    cardType: "card-oval-shield",
    nodeColor: "var(--wine)",
    icon: "plate"
  },
  {
    time: "8:00 - 9:00 PM",
    title: "Wind-Down Rituals",
    points: [
      "Warm foot soak (salt or herbal)",
      "Interactive discussions / sharing circles",
      "Light cultural activities",
      "Gentle stretching",
      "Journaling / reflection",
      "Digital detox"
    ],
    cardType: "card-soft-tag",
    nodeColor: "var(--harvest-gold)",
    icon: "moon"
  },
  {
    time: "9:00 - 9:30 PM",
    title: "Aromatherapy & Sleep Rituals",
    points: [
      "Diffused essential oils (lavender, vetiver, chamomile)",
      "Guided self-hypnosis audios for deep sleep",
      "Optional Yoga Nidra",
      "Slow-breathing practice",
      "Tuck-in ritual with warm water or herbal tea"
    ],
    cardType: "card-dark-pill",
    nodeColor: "var(--redwood)",
    icon: "sparkles"
  },
  {
    time: "9:30 PM",
    title: "Lights Off",
    points: [
      "Quiet zone activated",
      "Deep restorative sleep"
    ],
    cardType: "card-oval-shield",
    nodeColor: "var(--wine)",
    icon: "stars"
  }
];

const renderRhythmIcon = (iconType) => {
  switch (iconType) {
    case 'sun':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      );
    case 'droplet':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="currentColor" />
        </svg>
      );
    case 'lotus':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ overflow: 'visible' }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'footprint':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
        </svg>
      );
    case 'bowl':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M2 12h20a10 10 0 0 1-20 0zM12 2v4" />
        </svg>
      );
    case 'doctor':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      );
    case 'utensils':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M18 2v20M6 2v8a4 4 0 0 0 4 4v8" />
        </svg>
      );
    case 'sound':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/>
        </svg>
      );
    case 'aqua':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M2 12h20M2 17h20M2 7h20" />
        </svg>
      );
    case 'tree':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2L4 12h5v8h6v-8h5z" />
        </svg>
      );
    case 'flame':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2c-3.5 4-6 7.5-6 11 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.5-2.5-7-6-11z" fill="currentColor" />
        </svg>
      );
    case 'plate':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" fill="currentColor"/>
        </svg>
      );
    case 'moon':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" fill="currentColor" />
        </svg>
      );
    case 'stars':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      );
  }
};

const foundersMaskRevealChild = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  }
};

const foundersMistFadeVariant = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const foundersBadgeItem = {
  hidden: { opacity: 0, x: -30, rotate: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const ritualGridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 }
  }
};

const ritualCircleVariant = {
  hidden: { scale: 0, opacity: 0, rotate: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const ritualTextVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home({ onNavigate }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { scrollY } = useScroll();

  // Orbital Carousel States
  const [rotationAngle, setRotationAngle] = useState(90);
  const [activeRitualIndex, setActiveRitualIndex] = useState(0);

  // Auto-cycle activeRitualIndex every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRitualIndex(prev => (prev + 1) % 6);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Easing loop to smoothly rotate the wheel to target active index
  useEffect(() => {
    let animationFrameId;
    const targetIdx = activeRitualIndex;
    const targetAngle = 90 - (targetIdx * 60);

    const smoothEase = () => {
      let isDone = false;
      setRotationAngle(prev => {
        let diff = (targetAngle - prev) % 360;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        if (Math.abs(diff) < 0.05) {
          isDone = true;
          return targetAngle;
        }
        return prev + diff * 0.085; // smooth easing factor
      });

      if (!isDone) {
        animationFrameId = requestAnimationFrame(smoothEase);
      }
    };

    animationFrameId = requestAnimationFrame(smoothEase);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeRitualIndex]);

  // Active Therapy Selection State for Naturopathy Bento Layout
  const [activeTherapyIndex, setActiveTherapyIndex] = useState(0);

  // Scroll link mandalas rotations
  const rotateValueSlow = useTransform(scrollY, [0, 5000], [0, 180]);
  const rotateValueFast = useTransform(scrollY, [0, 5000], [0, -360]);

  // Timeline variables
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const retreatsContainerRef = useRef(null);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeProgFilter, setActiveProgFilter] = useState('All Retreats');

  const sanctuaryRetreatsList = React.useMemo(() => [
    { days: '2/3 DAYS', title: 'Weekend Reset Sanctuary', tagline: 'Doctor consultation, 2 daily naturopathy cleanses & sound bath.', filterCat: '2/3 Days' },
    { days: '5 DAYS', title: 'Rejuvenation & Vitality', tagline: 'Iris diagnosis, Shirodhara therapy & Satwik organic dining.', filterCat: '5 Days' },
    { days: '7 DAYS', title: 'Holistic Transformation', tagline: 'Body mapping, hydrotherapy & vibrational sound sessions.', filterCat: '7 Days', popular: true },
    { days: '14 DAYS', title: 'Deep Cellular Detox', tagline: 'Toxin evaluation, mud therapy packs, therapeutic fasting & juices.', filterCat: '14 Days' },
    { days: '21 DAYS', title: 'Advanced Cellular Healing', tagline: 'Doctor-led clinical protocol, daily vitals & colon hydrotherapy.', filterCat: '21 Days' }
  ], []);

  const sortedRetreats = React.useMemo(() => {
    if (activeProgFilter === 'All Retreats') return sanctuaryRetreatsList;
    return [...sanctuaryRetreatsList].sort((a, b) => {
      const aMatch = a.filterCat === activeProgFilter || a.days.includes(activeProgFilter);
      const bMatch = b.filterCat === activeProgFilter || b.days.includes(activeProgFilter);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [activeProgFilter, sanctuaryRetreatsList]);

  const handleRetreatFilterClick = (filter) => {
    setActiveProgFilter(filter);
    if (retreatsContainerRef.current) {
      retreatsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };
  const [activeExpert, setActiveExpert] = useState(0);
  const [activeCareCategory, setActiveCareCategory] = useState('All Interventions');
  const [expandedPillar, setExpandedPillar] = useState(0);
  const [quizSelections, setQuizSelections] = useState({
    dosha: 'Vata',
    detox: 'Mild Fatigue',
    stress: 'Mild Stress'
  });

  // Track if section is in view
  const isSectionInView = useInView(timelineRef, { once: false, amount: 0.2 });

  // Refs for tracking manual vs automatic scroll interaction
  const isUserInteractingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const interactionTimeoutRef = useRef(null);
  const autoDirectionRef = useRef(1); // 1 = scroll right, -1 = scroll left

  // Helper to trigger user interaction pause
  const triggerUserInteraction = () => {
    isUserInteractingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 6000); // Resume auto-scroll after 6 seconds of no user input
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 20);
    const maxScroll = container.scrollWidth - container.clientWidth - 20;
    setCanScrollRight(container.scrollLeft < maxScroll);
    if (container.scrollWidth > container.clientWidth) {
      setScrollPercentage(container.scrollLeft / (container.scrollWidth - container.clientWidth));
    }

    // If it's not a programmatic scroll, the user scrolled manually (swipe/drag)
    if (!isProgrammaticScrollRef.current) {
      triggerUserInteraction();
    } else {
      // Reset the flag for the next frame
      isProgrammaticScrollRef.current = false;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const performScroll = () => {
      if (isSectionInView && !isUserInteractingRef.current) {
        // Autoscroll logic (smoothly travel along with the line)
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          isProgrammaticScrollRef.current = true;
          if (autoDirectionRef.current === 1) {
            container.scrollLeft += 0.85; // Calming travel speed
            if (container.scrollLeft >= maxScroll - 5) {
              autoDirectionRef.current = -1; // Reverse to left
            }
          } else {
            container.scrollLeft -= 0.85;
            if (container.scrollLeft <= 5) {
              autoDirectionRef.current = 1; // Reverse to right
            }
          }
        }
      } else {
        // Apply user hover drift if active
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
        if (Math.abs(speedRef.current) > 0.01) {
          container.scrollLeft += speedRef.current;
        }
      }
      animationFrameId = requestAnimationFrame(performScroll);
    };

    animationFrameId = requestAnimationFrame(performScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSectionInView]);

  const handleMouseMove = (e) => {
    triggerUserInteraction();
    const container = scrollContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeWidth = Math.min(width * 0.15, 180); // 15% edge zone, max 180px

    if (x < edgeWidth) {
      const factor = (edgeWidth - x) / edgeWidth;
      targetSpeedRef.current = -3.2 * factor; // Left drift speed max 3.2px/frame
    } else if (x > width - edgeWidth) {
      const factor = (x - (width - edgeWidth)) / edgeWidth;
      targetSpeedRef.current = 3.2 * factor; // Right drift speed max 3.2px/frame
    } else {
      targetSpeedRef.current = 0;
    }
  };

  const handleMouseLeave = () => {
    targetSpeedRef.current = 0;
  };

  const stepScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    triggerUserInteraction();
    targetSpeedRef.current = 0;
    speedRef.current = 0;
    const stepSize = 360;
    const currentScroll = container.scrollLeft;
    const target = direction === 'left' ? Math.max(0, currentScroll - stepSize) : currentScroll + stepSize;
    container.scrollTo({ left: target, behavior: 'smooth' });
  };

  // State for scroll percentage in the timeline
  // These variables are no longer needed as we use viewport-triggered (whileInView) entry animations for the nodes and cards.

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section — Side-Shifted Left Layout with Side Shadow Overlay */}
      <section style={{ height: '100vh', minHeight: '100dvh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.12, x: -10, y: -5 }}
            animate={{ opacity: 1, scale: 1.02, x: 0, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 1.8, ease: "easeInOut" } }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 6.2, ease: "linear" },
              x: { duration: 6.2, ease: "linear" },
              y: { duration: 6.2, ease: "linear" }
            }}
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: `url(${heroImages[currentImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: '90% center',
              zIndex: 1
            }}
          />
        </AnimatePresence>

        {/* Directional Side Shadow Overlay — Darker Behind Text, Fading Out towards Image */}
        <div 
          className="hero-side-overlay"
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100%', 
            background: 'linear-gradient(to right, rgba(14, 5, 9, 0.88) 0%, rgba(14, 5, 9, 0.72) 32%, rgba(14, 5, 9, 0.35) 60%, transparent 90%)', 
            zIndex: 2 
          }} 
        />

        {/* Left-Shifted Content Container with Top Gap */}
        <div style={{ position: 'relative', zIndex: 10, padding: '4rem 6% 0 6%', width: '100%', maxWidth: '1350px', margin: '0 auto' }}>
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible"
            style={{ maxWidth: '640px', textAlign: 'left' }}
          >
            {/* Top Sub-Heading Badge — Symmetrical Gold Line + Star Accents on Both Sides */}
            <motion.div variants={blurFadeIn} className="hero-badge-container" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', marginTop: '1.8rem', flexWrap: 'nowrap' }}>
              <motion.div 
                animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="shiny-gold-line hero-badge-line" 
                style={{ height: '1.5px', width: '36px', backgroundColor: 'var(--harvest-gold)', display: 'inline-block' }}
              />
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="hero-badge-star"
                style={{ color: '#f7d070', fontSize: '0.8rem', textShadow: '0 0 12px rgba(247, 208, 112, 0.9)', display: 'inline-flex', alignItems: 'center' }}
              >
                ✦
              </motion.span>
              <span 
                className="shiny-gold-text hero-badge-text"
                style={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.35em', 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  color: 'var(--harvest-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  margin: '0 0.1rem'
                }}
              >
                Suprada Wellness
              </span>
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="hero-badge-star"
                style={{ color: '#f7d070', fontSize: '0.8rem', textShadow: '0 0 12px rgba(247, 208, 112, 0.9)', display: 'inline-flex', alignItems: 'center' }}
              >
                ✦
              </motion.span>
              <motion.div 
                animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="shiny-gold-line hero-badge-line" 
                style={{ height: '1.5px', width: '36px', backgroundColor: 'var(--harvest-gold)', display: 'inline-block' }}
              />
            </motion.div>

            {/* Left-Aligned Even Headline */}
            <h1 className="hero-title" style={{ color: 'var(--isabelline)', margin: '0 0 1.2rem 0', textShadow: '0 4px 24px rgba(0,0,0,0.6)', textAlign: 'left', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.01em' }}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.1 }}
                style={{ display: 'block' }}
              >
                Awaken your
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.25 }}
                style={{ display: 'block', fontStyle: 'italic', color: 'var(--tan)', fontWeight: 600, textShadow: '0 4px 18px rgba(0,0,0,0.5)' }}
              >
                inner bliss.
              </motion.span>
            </h1>
            
            {/* Left-Aligned Slightly Smaller Subtitle Paragraph */}
            <motion.p variants={blurFadeIn} className="hero-subtitle-mobile" style={{ color: 'var(--isabelline)', fontSize: '0.94rem', opacity: 0.92, maxWidth: '500px', margin: '0 0 1.8rem 0', fontWeight: 400, lineHeight: 1.65, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'left', letterSpacing: '0.01em' }}>
              Experience the ancient healing intelligence of Naturopathy &amp; Yogic Science. Nestled on the banks of the holy Suvarnamukhi River.
            </motion.p>

            {/* Left-Aligned Dual CTA Action Buttons (Slightly Smaller) */}
            <motion.div variants={blurFadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('stay')}
                className="btn-primary" 
                style={{ padding: '0.75rem 1.8rem', fontSize: '0.78rem', letterSpacing: '0.1em', fontWeight: 800 }}
              >
                ✦ BOOK YOUR STAY
              </button>

              <button 
                onClick={() => onNavigate('programmes')}
                className="hero-btn-secondary"
                style={{
                  padding: '0.72rem 1.6rem',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: 'var(--isabelline)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Programmes →
              </button>
            </motion.div>

            {/* Left-Aligned Interactive Slide Dots */}
            <motion.div variants={blurFadeIn} style={{ display: 'flex', gap: '0.6rem', marginTop: '2.5rem', alignItems: 'center' }}>
              {heroImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentImage(dotIdx)}
                  style={{
                    width: currentImage === dotIdx ? '28px' : '9px',
                    height: '9px',
                    borderRadius: '50px',
                    backgroundColor: currentImage === dotIdx ? 'var(--harvest-gold)' : 'rgba(255, 255, 255, 0.35)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Spirit of Suprada (Founders Section) */}
      <section style={{ backgroundColor: 'var(--wine)', position: 'relative', overflow: 'hidden' }} className="dot-grid founders-section">
        {/* Floating Decorative Patterns */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '250px', zIndex: 1, pointerEvents: 'none' }}
        >
          <Pattern28 style={{ width: '100%', color: 'var(--tan)', opacity: 0.06 }} />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: 0, right: 0, width: '250px', zIndex: 1, pointerEvents: 'none' }}
        >
          <Pattern25 style={{ width: '100%', color: 'var(--tan)', opacity: 0.06 }} />
        </motion.div>
        
        <div className="float-slow" style={{ position: 'absolute', right: '-5%', top: '5%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: 1 }}></div>

        <style>{`
          .founders-section {
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4.5rem 8%;
            box-sizing: border-box;
          }
          .founders-grid {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 3.5rem;
            align-items: center;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }
          @media (max-width: 900px) {
            .founders-section {
              padding: 2.5rem 5% !important;
              min-height: auto !important;
            }
            .founders-grid {
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }
            .founders-badge-col {
              flex-direction: row !important;
              justify-content: flex-start !important;
              align-items: center !important;
              gap: 0.75rem !important;
              padding-bottom: 0.75rem;
              border-bottom: 1px solid rgba(220, 160, 50, 0.2);
            }
            .founders-badge-icon {
              width: 44px !important;
              height: 44px !important;
              margin-bottom: 0 !important;
            }
            .founders-badge-icon img,
            .founders-badge-img {
              width: 44px !important;
              height: 44px !important;
            }
            .founders-badge-text {
              text-align: left !important;
            }
            .founders-badge-text h3 {
              font-size: 1.1rem !important;
              letter-spacing: 0.08em !important;
              text-align: left !important;
            }
            .founders-badge-text span {
              font-size: 0.68rem !important;
              text-align: left !important;
              margin-top: 0 !important;
            }
            .founders-title {
              font-size: clamp(1.5rem, 5.5vw, 1.95rem) !important;
              line-height: 1.2 !important;
            }
            .founders-subtitle {
              font-size: clamp(0.88rem, 3.2vw, 1.02rem) !important;
            }
            .founders-body {
              font-size: 0.88rem !important;
              line-height: 1.58 !important;
            }
            .founders-quote {
              font-size: 0.88rem !important;
              line-height: 1.55 !important;
            }
          }
        `}</style>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={foundersStaggerContainer}
          className="founders-grid"
        >
          {/* Left Column */}
          <motion.div 
            variants={foundersBadgeItem}
            className="founders-badge-col"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="founders-badge-icon"
              style={{
                cursor: 'pointer',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src="/assets/logo.svg" 
                alt="Suprada Logo" 
                className="founders-badge-img"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 20px rgba(220, 160, 50, 0.35))' 
                }} 
              />
            </motion.div>
            <div style={{ textAlign: 'center' }} className="founders-badge-text">
              <h3 style={{color: 'var(--tan)', letterSpacing: '0.1em', margin: 0,}}>Suprada</h3>
              <span style={{ color: 'var(--isabelline)', opacity: 0.65, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.15rem', display: 'block' }}>Est. 2026</span>
            </div>
          </motion.div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <motion.div 
              variants={foundersMistFadeVariant}
              style={{ display: 'inline-block', position: 'relative', width: 'fit-content' }}
            >
              <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.78rem', fontWeight: 600 }}>
                Our Story
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{ height: '1.5px', backgroundColor: 'var(--harvest-gold)', width: '100%', originX: 0, marginTop: '0.2rem' }}
              />
            </motion.div>
            
            <motion.h2 
              variants={foundersMistFadeVariant}
              className="gold-foil-text founders-title" 
              style={{lineHeight: 1.18, 
                margin: 0,}}
            >
              The Spirit of Suprada
            </motion.h2>
            
            <motion.h4 variants={foundersMistFadeVariant} className="founders-subtitle" style={{color: 'var(--tan)', letterSpacing: '0.02em', margin: 0}}>
              Where Global Expertise Meets Indian Heritage
            </motion.h4>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-body" style={{ color: 'var(--isabelline)', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.55, fontWeight: 300, margin: 0 }}>
              Suprada is the realization of a vision shared by <strong>Sunil Jayaraj</strong> and <strong>Dr. Premasudha Ramadas</strong>. After spending 16 years in the United States, they returned to India with a singular purpose: to bridge the gap between advanced science and ancient Indian wisdom.
            </motion.p>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-body" style={{ color: 'var(--isabelline)', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.55, fontWeight: 300, margin: 0 }}>
              Sunil, known as a "Blue Planet Runner," brings the endurance and discipline of an elite athlete, while Dr. Premasudha, a US Board-certified physician, ensures our holistic integration is grounded in authenticity and clinical evidence.
            </motion.p>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-quote" style={{ color: 'var(--tan)', fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.5, fontStyle: 'italic', marginTop: '0.2rem', margin: 0, fontWeight: 500 }}>
              "In today's world, healing is often scattered—one place for the body, another for the mind. We created Suprada to bring these fragments together into one cohesive journey of restoration."
            </motion.p>
            
            <motion.div variants={foundersMistFadeVariant} style={{ marginTop: '0.3rem' }}>
              <motion.button 
                whileHover={{ x: 8 }}
                onClick={() => onNavigate('about')}
                style={{ background: 'none', border: 'none', color: 'var(--harvest-gold)', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}
              >
                Learn More About Our Journey &rarr;
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Unique Experiences Section */}
      <section style={{ backgroundColor: 'var(--isabelline)', padding: '4rem 8% 5rem 8%', position: 'relative', overflow: 'hidden' }}>
        <Pattern28 style={{ position: 'absolute', top: '-10px', left: '-50px', width: '260px', color: 'var(--wine)', opacity: 0.16, pointerEvents: 'none', zIndex: 1 }} />
        {/* Responsive CSS Stylesheet injection for the split layout */}
        <style>{`
          .rituals-split-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
            width: 100%;
          }
          .rituals-left-col {
            flex: 0 0 35%;
            max-width: 35%;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }
          .rituals-right-col {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: -2.5rem;
          }
          .ritual-menu-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.6rem 1rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid transparent;
          }
          .ritual-menu-item.active {
            background-color: rgba(94, 39, 53, 0.05);
            border-color: rgba(94, 39, 53, 0.08);
          }
          @media (max-width: 991px) {
            .rituals-split-container {
              flex-direction: column;
              gap: 2rem;
            }
            .rituals-left-col {
              flex: none;
              max-width: 100%;
              width: 100%;
              text-align: center;
              align-items: center;
            }
            .rituals-right-col {
              transform: scale(0.85);
              transform-origin: center center;
              margin-top: -1rem;
              height: 420px !important;
            }
            .ritual-menu-list {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 0.6rem;
            }
            .ritual-menu-item {
              padding: 0.5rem 0.9rem;
            }
          }
          @media (max-width: 768px) {
            .rituals-right-col {
              transform: scale(0.72);
              transform-origin: center center;
              margin-top: -2.5rem;
              margin-bottom: -1.5rem;
              height: 350px !important;
            }
          }
          @media (max-width: 480px) {
            .rituals-right-col {
              transform: scale(0.58);
              transform-origin: center center;
              margin-top: -3.5rem;
              margin-bottom: -3rem;
              height: 280px !important;
            }
          }
        `}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="rituals-split-container">
            
            {/* LEFT COLUMN: Headings and Interactive Menu */}
            <div className="rituals-left-col">
              <div>
                <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.7rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Exclusive Rituals</span>
                <h2 style={{color: 'var(--wine)', lineHeight: 1.1}}>
                  Unique Experiences <br />
                  <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Only at Suprada</em>
                </h2>
                <p style={{ color: 'var(--raisin-black)', opacity: 0.72, fontSize: '0.85rem', lineHeight: 1.5, marginTop: '0.6rem', maxWidth: '380px' }}>
                  Sacred practices designed to calm your sensory experience, cleanse the aura, and ground the spirit.
                </p>
              </div>

              {/* Interactive List Index */}
              <div className="ritual-menu-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                {[
                  'Gograsa',
                  'Agnihotra',
                  'Music & Sound Healing',
                  'Satsang',
                  'Planting Trees',
                  'Art Therapy'
                ].map((menuTitle, idx) => {
                  const currentIdx = activeRitualIndex;
                  const isItemActive = currentIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`ritual-menu-item ${isItemActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveRitualIndex(idx);
                      }}
                    >
                      {/* Active Indicator Leaf/Dot */}
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isItemActive ? 'var(--harvest-gold)' : 'rgba(94, 39, 53, 0.2)',
                        boxShadow: isItemActive ? '0 0 8px var(--harvest-gold)' : 'none',
                        transition: 'all 0.3s ease'
                      }} />
                      
                      <div style={{
                        fontSize: '0.78rem',
                        fontWeight: isItemActive ? 600 : 400,
                        color: isItemActive ? 'var(--wine)' : 'var(--raisin-black)',
                        opacity: isItemActive ? 1 : 0.5,
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{ 
                          color: isItemActive ? 'var(--redwood)' : 'var(--harvest-gold)', 
                          marginRight: '0.8rem', 
                          fontWeight: 700,
                          }}>
                          0{idx + 1}
                        </span>
                        {menuTitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: The 3D Orbital Carousel */}
            <div className="rituals-right-col" style={{ height: '480px', width: '100%', maxWidth: '700px' }}>
              {/* Ambient Background Glows */}
              <div style={{
                position: 'absolute',
                maxWidth: '560px', width: '100%',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(220,160,50,0.06) 0%, rgba(0,0,0,0) 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-10deg)',
                pointerEvents: 'none',
                zIndex: 1
              }} />
              
              {/* Tilted Ellipse Track Ring (Slightly Larger) */}
              <div style={{
                position: 'absolute',
                maxWidth: '560px', width: '100%',
                height: '260px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(94, 39, 53, 0.12)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* Orbiting Pulsing Star Particles */}
              {[0, 1, 2].map((starIdx) => {
                const starAngle = (starIdx * 120) + (rotationAngle * 1.3);
                const rad = (starAngle * Math.PI) / 180;
                const x = 280 * Math.cos(rad);
                const y = 130 * Math.sin(rad);
                return (
                  <motion.div
                    key={`star-${starIdx}`}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      color: 'var(--harvest-gold)',
                      fontSize: '0.85rem',
                      pointerEvents: 'none',
                      zIndex: 4
                    }}
                    animate={{
                      scale: [0.7, 1.2, 0.7],
                      opacity: [0.3, 0.9, 0.3]
                    }}
                    transition={{
                      duration: 2.5 + starIdx,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✦
                  </motion.div>
                );
              })}

              {/* CENTRAL HUB - Cinematic Modal Ring (Slightly Larger) */}
              <motion.div
                style={{
                  maxWidth: '390px', width: '100%',
                  height: '390px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1.5px solid var(--harvest-gold)',
                  boxShadow: '0 30px 70px rgba(94, 39, 53, 0.14), inset 0 0 25px rgba(220,160,50,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '2.8rem',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 10
                }}
              >
                <AnimatePresence mode="wait">
                  {(() => {
                    const currentIdx = activeRitualIndex;
                    return (
                      <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '2rem',
                          zIndex: 2
                        }}
                      >
                        {/* Background Cinematic Image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 1.15 }}
                          animate={{ opacity: 0.15, scale: 1.05 }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                          style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url(${[
                              '/assets/gograsa.png',
                              '/assets/agnihotra.png',
                              '/assets/sound_healing.png',
                              '/assets/satsang.png',
                              '/assets/planting_trees.png',
                              '/assets/art_therapy.png'
                            ][currentIdx]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 1,
                            pointerEvents: 'none'
                          }}
                        />

                        {/* Dark radial overlay */}
                        <div style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          background: 'radial-gradient(circle, rgba(255,255,255,0.72) 40%, rgba(255,255,255,0.92) 100%)',
                          zIndex: 2,
                          pointerEvents: 'none'
                        }} />

                        {/* Ritual details */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                          style={{
                            zIndex: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <span style={{
                            color: 'var(--redwood)',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em'
                          }}>
                            Ritual {currentIdx + 1} of 6
                          </span>
                          
                          <h3 style={{color: 'var(--wine)',
                            margin: '0.2rem 0'}}>
                            {[
                              'Gograsa',
                              'Agnihotra',
                              'Music & Sound Healing',
                              'Satsang',
                              'Planting Trees',
                              'Art Therapy'
                            ][currentIdx]}
                          </h3>
                          
                          <p className="small-text" style={{
                            color: 'var(--raisin-black)',
                            opacity: 0.8,
                            lineHeight: 1.5,
                            margin: '0.3rem 0 0.6rem 0',
                            fontWeight: 300,
                            maxWidth: '280px'
                          }}>
                            {[
                              'The mindful practice of nourishing and caring for cows, promoting compassion, grounding, and emotional balance. A rare opportunity to slow down.',
                              'A Vedic fire ritual performed at sunrise or sunset. Its healing smoke purifies the atmosphere, reduces stress, and creates deep mental clarity.',
                              'Therapeutic singing bowls, gongs, and rhythmic patterns soothe the nervous system, improve sleep quality, and restore body-mind harmony.',
                              'Brings people together for soulful discussions, chanting, and reflective silence, deepening spiritual insight and communal belonging.',
                              'Participate in tree-planting to foster gratitude, ecological responsibility, and a deep, active connection with Mother Earth.',
                              'Encourages creative self-expression through painting and doodling to release anxiety, unlock emotional clarity, and bring inner joy.'
                            ][currentIdx]}
                          </p>

                          {/* Progress dots */}
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '0.1rem' }}>
                            {[0, 1, 2, 3, 4, 5].map((dotIdx) => (
                              <div
                                key={dotIdx}
                                onClick={() => {
                                  setActiveRitualIndex(dotIdx);
                                }}
                                style={{
                                  width: currentIdx === dotIdx ? '7px' : '5px',
                                  height: currentIdx === dotIdx ? '7px' : '5px',
                                  borderRadius: '50%',
                                  backgroundColor: currentIdx === dotIdx ? 'var(--harvest-gold)' : 'rgba(94, 39, 53, 0.25)',
                                  boxShadow: currentIdx === dotIdx ? '0 0 6px var(--harvest-gold)' : 'none',
                                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                  cursor: 'pointer'
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </motion.div>

              {/* ORBITING NODES */}
              {[
                { 
                  title: 'Gograsa', 
                  image: '/assets/gograsa.png' 
                },
                { 
                  title: 'Agnihotra', 
                  image: '/assets/agnihotra.png' 
                },
                { 
                  title: 'Sound Healing', 
                  image: '/assets/sound_healing.png' 
                },
                { 
                  title: 'Satsang', 
                  image: '/assets/satsang.png' 
                },
                { 
                  title: 'Planting Trees', 
                  image: '/assets/planting_trees.png' 
                },
                { 
                  title: 'Art Therapy', 
                  image: '/assets/art_therapy.png' 
                },
              ].map((node, idx) => {
                // Trigonometric calculations for 3D Ellipse
                const nodeAngle = (idx * 360 / 6) + rotationAngle;
                const rad = (nodeAngle * Math.PI) / 180;
                const radiusX = 280; 
                const radiusY = 130; 
                
                const x = radiusX * Math.cos(rad);
                const y = radiusY * Math.sin(rad);

                // 3D physics scale & opacity
                const normalizedDepth = y / radiusY; 
                const nodeScale = 0.95 + normalizedDepth * 0.15; 
                const nodeOpacity = 0.65 + (normalizedDepth + 1) * 0.175; 
                const nodeZIndex = Math.round(15 + normalizedDepth * 10); 

                const isActive = activeRitualIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      width: '115px', 
                      height: '115px', 
                      zIndex: isActive ? 95 : nodeZIndex,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    animate={{
                      scale: isActive ? 1.2 : nodeScale,
                      opacity: isActive ? 1.0 : nodeOpacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18
                    }}
                  >
                    {/* Outer glowing border circle */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      padding: '4px',
                      backgroundColor: isActive ? 'var(--harvest-gold)' : 'rgba(255, 255, 255, 0.9)',
                      border: isActive ? 'none' : '1.5px solid rgba(94, 39, 53, 0.14)',
                      boxShadow: isActive 
                        ? '0 10px 25px rgba(220, 160, 50, 0.4), 0 0 12px rgba(220, 160, 50, 0.2)' 
                        : '0 6px 15px rgba(94, 39, 53, 0.08)',
                      transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {/* Floating image thumbnail */}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <img 
                          src={node.image} 
                          alt={node.title} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: isActive ? 'scale(1.12)' : 'scale(1)',
                            transition: 'transform 0.4s ease'
                          }}
                        />
                        
                        {/* Depth overlay */}
                        <div style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          backgroundColor: isActive ? 'transparent' : `rgba(26, 25, 26, ${Math.max(0, -normalizedDepth * 0.4)})`,
                          transition: 'background-color 0.35s ease',
                          pointerEvents: 'none'
                        }} />
                      </div>

                      {/* Floating Hover Badge Label */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-30px',
                          backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.85)',
                          border: isActive ? 'none' : '1px solid rgba(94, 39, 53, 0.1)',
                          color: isActive ? 'var(--isabelline)' : 'var(--wine)',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          whiteSpace: 'nowrap',
                          boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.04)',
                          opacity: isActive ? 1.0 : 0.8,
                          transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                          zIndex: 110
                        }}
                      >
                        {node.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Transformative Naturopathy & Holistic Wellness Section - Screen-Fit Split Layout */}
      <section className="naturopathy-section-container luxury-clay">
        <Pattern28 style={{ position: 'absolute', top: '-40px', left: '-40px', width: '250px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '250px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <style>{`
            .naturopathy-section-container {
              background-color: var(--tea-green);
              padding: 2.8rem 5%;
              position: relative;
              overflow-x: hidden;
              color: var(--raisin-black);
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-sizing: border-box;
              min-height: 100vh;
            }
            @media (min-width: 961px) {
              .naturopathy-section-container {
                min-height: 100vh;
              }
            }
            .naturopathy-bento-layout {
              display: grid;
              grid-template-columns: 0.95fr 0.9fr;
              gap: 2rem;
              align-items: stretch;
            }
            @media (max-width: 960px) {
              .naturopathy-section-container {
                min-height: auto !important;
                height: auto !important;
                max-height: none !important;
                padding: 2.2rem 4% 3rem 4% !important;
                overflow-x: hidden !important;
                overflow-y: visible !important;
              }
              .naturopathy-bento-layout {
                grid-template-columns: 1fr !important;
                gap: 1.2rem !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
              }
              .naturopathy-left-column {
                min-width: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
              }
              .naturopathy-tile-grid {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                overflow-y: hidden !important;
                scroll-snap-type: none !important;
                gap: 0.7rem !important;
                padding: 0.2rem 0.2rem 0.6rem 0.2rem !important;
                -webkit-overflow-scrolling: touch;
                touch-action: auto !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                box-sizing: border-box !important;
              }
              .naturopathy-photo-tile,
              .naturopathy-explore-tile {
                flex: 0 0 155px !important;
                width: 155px !important;
                min-width: 155px !important;
                height: 115px !important;
                scroll-snap-align: none !important;
              }
              .naturopathy-right-card {
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
                flex: none !important;
                overflow: visible !important;
              }
              .naturopathy-right-card-banner {
                height: 190px !important;
              }
            }
            .naturopathy-left-column {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-width: 0;
              width: 100%;
            }
            .naturopathy-tile-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.85rem;
            }
            .naturopathy-photo-tile {
              position: relative;
              height: 140px;
              border-radius: 14px;
              overflow: hidden;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(0,0,0,0.06);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              border: 2px solid transparent;
            }
            @media (min-width: 1400px) {
              .naturopathy-photo-tile {
                height: 152px;
              }
            }
            .naturopathy-photo-tile:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(94,39,53,0.15);
            }
            .naturopathy-photo-tile.active {
              border-color: var(--wine);
              box-shadow: 0 8px 22px rgba(94, 39, 53, 0.22);
            }
            .naturopathy-tile-bg {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.5s ease;
            }
            .naturopathy-tile-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%);
            }
            .naturopathy-explore-tile {
              background: linear-gradient(135deg, var(--wine) 0%, #4a1d29 100%);
              border-radius: 14px;
              padding: 0.8rem;
              height: 140px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              text-align: center;
              color: var(--isabelline);
              box-shadow: 0 4px 14px rgba(94, 39, 53, 0.15);
              transition: all 0.3s ease;
              border: 1.5px solid rgba(220, 160, 50, 0.3);
            }
            @media (min-width: 1400px) {
              .naturopathy-explore-tile {
                height: 152px;
              }
            }
            .naturopathy-explore-tile:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 24px rgba(94, 39, 53, 0.3);
              background: linear-gradient(135deg, #733142 0%, var(--wine) 100%);
            }
          `}</style>

          {(() => {
            const sanctuaryPillars = [
              { 
                category: 'DRUGLESS HEALING',
                title: 'Naturopathy', 
                subtitle: 'Drugless Healing & Detox',
                fullDesc: 'Drug-free treatments to detoxify, restore, and rejuvenate using mud, water, sun, fasting, and botanical therapies.',
                benefits: ['Hydrotherapy & Mud Baths', 'Helio Therapy (Sun Healing)', 'Therapeutic Fasting', 'Botanical Cleanses'],
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
              },
              { 
                category: 'MIND-BODY HARMONY',
                title: 'Yoga & Meditation', 
                subtitle: 'Mind-Body Synchronization',
                fullDesc: 'Authentic mind-body alignment using Asanas, Pranayama, guided meditation, and mindfulness techniques.',
                benefits: ['Classical Asana Flow', 'Pranayama Breathwork', 'Yoga Nidra Deep Rest', 'Chakra Alignment'],
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
              },
              { 
                category: 'PRECISION THERAPY',
                title: 'Holistic Therapies', 
                subtitle: 'Acupuncture & Steam Suites',
                fullDesc: 'Acupuncture, acupressure, energy balancing, sauna & steam suites, and bespoke therapeutic treatments.',
                benefits: ['Acupuncture & Reflexology', 'Infrared & Herbal Sauna', 'Aromatic Steam Suites', 'Pranic Energy Work'],
                image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
              },
              { 
                category: 'SATTWIK NUTRITION',
                title: 'Nutrition & Lifestyle', 
                subtitle: 'Sattvik & Gut Health',
                fullDesc: 'Personalized nutrition plans, organic sattvik meals, gut health support, and mindful lifestyle coaching.',
                benefits: ['Organic Sattvik Cuisine', 'Microbiome Restoration', 'Cold-Pressed Juicing', 'Mindful Eating Habits'],
                image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80'
              },
              { 
                category: 'CELLULAR PURIFICATION',
                title: 'Detox & Cleansing', 
                subtitle: 'Cellular Cleanse Protocols',
                fullDesc: 'Revitalize cellular function with targeted cleansing, colon hydrotherapy, and metabolic reset therapies.',
                benefits: ['Colon Hydrotherapy', 'Liver & Kidney Cleanse', 'Heavy Metal Detox', 'Juice Fasting Protocols'],
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
              }
            ];

            const activePillar = sanctuaryPillars[activeTherapyIndex % sanctuaryPillars.length] || sanctuaryPillars[0];

            return (
              <div className="naturopathy-bento-layout">
                {/* LEFT COLUMN: Left-Aligned Header + 2x3 Grid of Tiles */}
                <div className="naturopathy-left-column">
                  <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>
                      ✦ CORE MEDICAL MODALITIES
                    </span>
                    <h2 style={{ color: 'var(--wine)', lineHeight: 1.15, margin: '0 0 0.35rem 0', fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)' }}>
                      Transformative Naturopathy <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>&amp; Holistic Wellness</em>
                    </h2>
                    <p style={{ color: 'var(--raisin-black)', opacity: 0.88, fontSize: '0.86rem', lineHeight: 1.48, fontWeight: 400, margin: 0 }}>
                      At Suprada Wellness, we help you unlock your body's innate capacity to heal through doctor-guided drugless therapies, ancient wisdom, and bio-cleansing protocols.
                    </p>
                  </div>

                  {/* 2x3 Grid of 5 Photo Cards + 1 Explore All Tile */}
                  <div className="naturopathy-tile-grid">
                    {sanctuaryPillars.map((item, idx) => {
                      const isActive = (activeTherapyIndex % sanctuaryPillars.length) === idx;
                      return (
                        <div
                          key={idx}
                          className={`naturopathy-photo-tile ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveTherapyIndex(idx)}
                        >
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="naturopathy-tile-bg"
                          />
                          <div className="naturopathy-tile-overlay" />
                          
                          {/* Category Badge */}
                          <span style={{
                            position: 'absolute', top: '8px', left: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.48)',
                            color: '#ffffff',
                            fontSize: '0.58rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '5px',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2
                          }}>
                            {item.category}
                          </span>

                          {/* Title */}
                          <span style={{
                            position: 'absolute', bottom: '9px', left: '10px', right: '10px',
                            color: '#ffffff',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            lineHeight: 1.15,
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                            zIndex: 2
                          }}>
                            {item.title}
                          </span>
                        </div>
                      );
                    })}

                    {/* 6th Card: Solid Brand Explore All Card */}
                    <div
                      className="naturopathy-explore-tile"
                      onClick={() => onNavigate('programmes')}
                    >
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        border: '1.5px solid var(--harvest-gold)', color: 'var(--harvest-gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem'
                      }}>
                        +
                      </div>
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--harvest-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                        EXPLORE ALL
                      </span>
                      <strong style={{ fontSize: '0.9rem', color: '#ffffff', marginTop: '0.05rem' }}>
                        8+ Pillars
                      </strong>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Full-Height Display Card with Tall Image Banner */}
                <div className="naturopathy-right-card" style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(94, 39, 53, 0.14)',
                  boxShadow: '0 14px 40px rgba(94, 39, 53, 0.09)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  {/* Top Image Banner */}
                  <div className="naturopathy-right-card-banner" style={{ height: '260px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activePillar.image}
                        src={activePillar.image} 
                        alt={activePillar.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </AnimatePresence>
                    
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: 'var(--wine)',
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '10px',
                      backdropFilter: 'blur(6px)',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
                    }}>
                      {activePillar.category}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div style={{ padding: '1.3rem 1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <div>
                      <h3 style={{ color: 'var(--wine)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.15rem 0', lineHeight: 1.2 }}>
                        {activePillar.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--redwood)', fontWeight: 700, marginBottom: '0.45rem' }}>
                        {activePillar.subtitle}
                      </div>
                      <div style={{ width: '36px', height: '2px', backgroundColor: 'var(--harvest-gold)', marginBottom: '0.7rem' }} />
                      
                      <p style={{ fontSize: '0.84rem', color: 'var(--raisin-black)', opacity: 0.88, lineHeight: 1.52, margin: '0 0 0.9rem 0' }}>
                        {activePillar.fullDesc}
                      </p>

                      {/* Benefits Tag Chips */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                        {activePillar.benefits.map((b, bIdx) => (
                          <span 
                            key={bIdx}
                            style={{
                              backgroundColor: 'rgba(94, 39, 53, 0.06)',
                              border: '1px solid rgba(94, 39, 53, 0.18)',
                              padding: '0.25rem 0.7rem',
                              borderRadius: '16px',
                              fontSize: '0.74rem',
                              color: 'var(--wine)',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.32rem'
                            }}
                          >
                            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.72rem' }}>✦</span>
                            <span>{b}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div 
                      onClick={() => onNavigate('programmes')}
                      style={{ 
                        color: 'var(--wine)', 
                        fontWeight: 800, 
                        fontSize: '0.8rem', 
                        letterSpacing: '0.08em', 
                        cursor: 'pointer', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem',
                        marginTop: '0.5rem',
                        paddingTop: '0.7rem',
                        borderTop: '1px solid rgba(94,39,53,0.08)'
                      }}
                    >
                      <span>EXPLORE {activePillar.title.toUpperCase()}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Floating Solid Cards Section (Slide 12: Path To Transformation Begins Within) */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--antique-white) 0%, var(--isabelline) 50%, var(--tan) 100%)', 
        padding: '2rem 5% 2rem 5%', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="dot-grid">
        
        <Pattern24 aria-hidden="true" style={{ 
          position: 'absolute', left: '-2%', top: '50%', transform: 'translateY(-50%) scale(1.25)', 
          height: '90%', maxHeight: '600px', width: 'auto', opacity: 0.38, 
          filter: 'brightness(0.7)', color: 'var(--redwood)', pointerEvents: 'none', zIndex: 1 
        }} />
        <Pattern25 aria-hidden="true" style={{ 
          position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%) scale(1.25)', 
          height: '90%', maxHeight: '600px', width: 'auto', opacity: 0.38, 
          filter: 'brightness(0.7)', color: 'var(--redwood)', pointerEvents: 'none', zIndex: 1 
        }} />

        {/* Glows */}
        <div style={{ position: 'absolute', left: '15%', top: '25%', maxWidth: '380px', width: '100%', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184, 94, 76, 0.22) 0%, rgba(184, 94, 76, 0) 70%)', pointerEvents: 'none', filter: 'blur(30px)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '420px', width: '100%', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220, 160, 50, 0.18) 0%, rgba(220, 160, 50, 0) 70%)', pointerEvents: 'none', filter: 'blur(30px)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', right: '15%', bottom: '20%', maxWidth: '380px', width: '100%', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94, 39, 53, 0.22) 0%, rgba(94, 39, 53, 0) 70%)', pointerEvents: 'none', filter: 'blur(30px)', zIndex: 1 }}></div>
        
        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="transformation-grid">
            
            {/* Card 1: Photo Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: '0 20px 45px -15px rgba(94, 39, 53, 0.18)' }}
              transition={{ default: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
              className="transformation-card transformation-card-photo"
            >
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80" 
                alt="Organic Ayurvedic bowl and leaves representing transformation" 
              />
            </motion.div>

            {/* Card 2: Main Story Text Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, scale: 1.015, boxShadow: '0 20px 45px -15px rgba(94, 39, 53, 0.18)' }}
              transition={{ default: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }}
              className="transformation-card transformation-card-text"
            >
              <div style={{ color: 'var(--redwood)', fontSize: '1.45rem', marginBottom: '0.5rem', textAlign: 'center' }}>✦</div>
              
              <h3 style={{ color: 'var(--wine)', marginBottom: '0.8rem', lineHeight: 1.22, textAlign: 'center', fontSize: 'var(--fs-h3)', fontWeight: 700 }}>
                Path To Transformation<br />
                <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>Begins Within</em>
              </h3>

              <p style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.88, lineHeight: 1.65, textAlign: 'center', margin: '0 0 0.8rem 0', fontWeight: 400 }}>
                At Suprada, wellness is a transformative journey that nourishes your mind, body, and soul. Nestled in nature's embrace, our retreat offers a sanctuary to decompress, restore balance, and reconnect with your inner self through personalized holistic practices.
              </p>

              <h5 style={{ marginTop: '0.6rem', color: 'var(--wine)', letterSpacing: '0.12em', textAlign: 'center', fontSize: 'var(--fs-h5)', fontWeight: 700 }}>
                Suprada
              </h5>
            </motion.div>

            {/* Card 3: Royal Wine Crest Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -10, scale: 1.015, boxShadow: '0 30px 60px -15px rgba(94, 39, 53, 0.45)' }}
              transition={{ default: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }}
              className="transformation-card transformation-card-crest"
            >
              <div className="crest-logo-box">
                <img src="/assets/logo.svg" alt="Suprada Logo" />
              </div>
              <p className="crest-title">
                LET NATURE<br />GUIDE THE WAY
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Suprada Rhythm Timeline */}
      <section ref={timelineRef} className="timeline-section dot-grid" style={{ overflow: 'hidden', position: 'relative' }}>
        <TwinklingLights />
        <Pattern28 style={{ position: 'absolute', top: 0, left: 0, width: '250px', color: 'var(--wine)', opacity: 0.1, pointerEvents: 'none', zIndex: 1 }} />
        <Pattern25 style={{ position: 'absolute', bottom: 0, right: 0, width: '250px', color: 'var(--wine)', opacity: 0.1, pointerEvents: 'none', zIndex: 1 }} />
        {/* Soft background decoration */}
        <div style={{ position: 'absolute', left: '10%', top: '20%', maxWidth: '400px', width: '100%', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,94,76,0.06) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            The Suprada Rhythm
          </div>
          <h2 style={{color: 'var(--wine)'}}>
            The Suprada <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Rhythm</em>
          </h2>
          <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '650px', margin: '1rem auto 0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Nature-led Daily Dinacharya – A day designed to align your biological clock with nature's cycle
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ height: '1px', width: '60px', backgroundColor: 'rgba(94,39,53,0.15)' }}></div>
            <div style={{ color: 'var(--harvest-gold)', fontSize: '0.8rem' }}>✦</div>
            <div style={{ height: '1px', width: '60px', backgroundColor: 'rgba(94,39,53,0.15)' }}></div>
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          {/* Scroll Control Arrows (Available on all devices) */}
          <div style={{ position: 'relative', width: '100%' }}>
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={(e) => { e.stopPropagation(); stepScroll('left'); }}
                  className="rhythm-arrow-btn rhythm-arrow-left"
                  style={{
                    position: 'absolute', left: '1.2rem', top: '220px', transform: 'translateY(-50%)',
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: 'var(--wine)', color: 'var(--harvest-gold)',
                    border: '2px solid var(--harvest-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(94, 39, 53, 0.35)', cursor: 'pointer', zIndex: 100,
                    pointerEvents: 'auto'
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: '#4a1d29' }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Scroll Left"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={(e) => { e.stopPropagation(); stepScroll('right'); }}
                  className="rhythm-arrow-btn rhythm-arrow-right"
                  style={{
                    position: 'absolute', right: '1.2rem', top: '220px', transform: 'translateY(-50%)',
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: 'var(--wine)', color: 'var(--harvest-gold)',
                    border: '2px solid var(--harvest-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(94, 39, 53, 0.35)', cursor: 'pointer', zIndex: 100,
                    pointerEvents: 'auto'
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: '#4a1d29' }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Scroll Right"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Scrollable Container Wrapper */}
          <div 
            ref={scrollContainerRef} 
            className="timeline-outer-scroll"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="timeline-container" style={{ maxWidth: '5600px', width: '100%', minWidth: '5600px', height: '480px' }}>
              {/* Horizontal Wavy Sine Curve SVG Path (Dynamic for 15 steps) */}
              <div className="timeline-svg-wrapper" style={{ maxWidth: '5600px', width: '100%', height: '420px' }}>
                <svg viewBox="0 0 5600 420" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <path 
                    d="M 200,110 C 380,110 380,310 560,310 C 740,310 740,110 920,110 C 1100,110 1100,310 1280,310 C 1460,310 1460,110 1640,110 C 1820,110 1820,310 2000,310 C 2180,310 2180,110 2360,110 C 2540,110 2540,310 2720,310 C 2900,310 2900,110 3080,110 C 3260,110 3260,310 3440,310 C 3620,310 3620,110 3800,110 C 3980,110 3980,310 4160,310 C 4340,310 4340,110 4520,110 C 4700,110 4700,310 4880,310 C 5060,310 5060,110 5240,110" 
                    fill="none" stroke="rgba(94, 39, 53, 0.12)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" 
                  />
                  <motion.path 
                    d="M 200,110 C 380,110 380,310 560,310 C 740,310 740,110 920,110 C 1100,110 1100,310 1280,310 C 1460,310 1460,110 1640,110 C 1820,110 1820,310 2000,310 C 2180,310 2180,110 2360,110 C 2540,110 2540,310 2720,310 C 2900,310 2900,110 3080,110 C 3260,110 3260,310 3440,310 C 3620,310 3620,110 3800,110 C 3980,110 3980,310 4160,310 C 4340,310 4340,110 4520,110 C 4700,110 4700,310 4880,310 C 5060,310 5060,110 5240,110" 
                    fill="none" stroke="var(--harvest-gold)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="8 8"
                    animate={{ pathLength: scrollPercentage }}
                    transition={{ type: "spring", stiffness: 85, damping: 20 }}
                  />
                </svg>
              </div>

              {/* Leaf Buds between nodes */}
              {Array.from({ length: supradaRhythmSteps.length - 1 }).map((_, lIdx) => {
                const midLeafX = 200 + lIdx * 360 + 180 - 11;
                const leafY = 200;
                return (
                  <motion.div 
                    key={`leaf-${lIdx}`}
                    style={{ position: 'absolute', left: `${midLeafX}px`, top: `${leafY}px`, width: '22px', height: '22px', color: 'var(--harvest-gold)', zIndex: 6 }} 
                    initial={{ scale: 0 }} 
                    whileInView={{ scale: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: 0.05 * lIdx, duration: 0.5, type: 'spring' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ transform: lIdx % 2 === 0 ? 'none' : 'scaleX(-1)' }}>
                      <path d="M17 8C8 10 4 18 4 18S12 14 17 8Z"/><path d="M2 22s6-6 10-10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </motion.div>
                );
              })}

              {/* Dynamic 15 Steps Mapping */}
              {supradaRhythmSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                const nodeX = 200 + index * 360;
                const nodeY = isEven ? 110 : 310;
                const cardY = isEven ? 165 : 10;
                const cardLeft = nodeX - 145;

                return (
                  <React.Fragment key={index}>
                    {/* Step Node Icon */}
                    <motion.div 
                      className={`timeline-node timeline-node-${index + 1}`} 
                      style={{ position: 'absolute', left: `${nodeX - 24}px`, top: `${nodeY - 24}px`, backgroundColor: step.nodeColor, zIndex: 10 }} 
                      initial={{ scale: 0, opacity: 0 }} 
                      whileInView={{ scale: 1, opacity: 1 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: 0.04 * index, duration: 0.5, type: 'spring' }}
                    >
                      <motion.div animate={{ scale: [1, 2.2], opacity: [0.55, 0] }} transition={{ duration: 2, repeat: Infinity }} className="ripple-ring" style={{ borderColor: step.nodeColor }} />
                      {renderRhythmIcon(step.icon)}
                    </motion.div>

                    {/* Step Card */}
                    <motion.div 
                      className={`timeline-card-wrapper timeline-card-${index + 1}`} 
                      style={{ 
                        position: 'absolute', 
                        left: `${cardLeft}px`, 
                        top: isEven ? `${nodeY}px` : 'auto', 
                        bottom: isEven ? 'auto' : `${480 - nodeY}px`, 
                        width: '290px', 
                        zIndex: 5 
                      }} 
                      initial={{ opacity: 0, y: isEven ? 25 : -25, filter: "blur(4px)" }} 
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
                      viewport={{ once: true }} 
                      transition={{ delay: 0.05 * index, duration: 0.6, ease: "easeOut" }}
                    >
                      <div className={`rhythm-card ${step.cardType}`}>
                        <span className="rhythm-time-badge">{step.time}</span>
                        <h3 className="rhythm-card-title">{step.title}</h3>
                        <ul className="rhythm-points-list">
                          {step.points.map((pt, pIdx) => (
                            <li key={pIdx}>
                              <span className="bullet-star">•</span>
                              <span className="point-text">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Sleek scroll indicator track at bottom */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', marginTop: '1.5rem', zIndex: 2, position: 'relative' }}>
            <div style={{ width: '120px', height: '3px', background: 'rgba(94, 39, 53, 0.15)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
              <motion.div 
                style={{ 
                  position: 'absolute', left: 0, top: 0, height: '100%', width: '30px', 
                  background: 'var(--wine)', borderRadius: '2px'
                }}
                animate={{ x: scrollPercentage * (120 - 30) }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, opacity: 0.8 }}>
              Drag or Hover Arrow to Scroll
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: Signature Programmes (The Sanctuary Collection) */}
      <section style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', padding: '2.8rem 5%', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <Pattern28 style={{ position: 'absolute', top: 0, left: 0, width: '280px', color: 'var(--harvest-gold)', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>
                ✦ Healing Retreats
              </span>
              <h2 style={{color: 'var(--tan)', margin: 0, lineHeight: 1.1}}>
                The Sanctuary <em style={{ fontStyle: 'italic', color: 'var(--harvest-gold)' }}>Collection</em>
              </h2>
            </div>

            {/* Duration Filter Pills */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {['All Retreats', '2/3 Days', '5 Days', '7 Days', '14 Days', '21 Days'].map((filter, fIdx) => (
                <button 
                  key={fIdx}
                  onClick={() => handleRetreatFilterClick(filter)}
                  className={`pill-luxury ${activeProgFilter === filter ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Responsive Flex Container */}
          <div ref={retreatsContainerRef} className="retreats-flex-container retreats-carousel-mobile">
            {sortedRetreats.map((prog, idx) => {
              const isSpecificFilter = activeProgFilter !== 'All Retreats';
              const isMatch = !isSpecificFilter || prog.filterCat === activeProgFilter || prog.days.includes(activeProgFilter);
              return (
                <motion.div 
                  key={idx}
                  layout
                  className={`retreat-card-item ${isSpecificFilter && isMatch ? 'filter-active-match' : ''}`}
                  animate={{
                    opacity: isMatch ? 1 : 0.35,
                    scale: isMatch ? 1 : 0.97,
                    filter: isMatch ? 'blur(0px)' : 'blur(1px)'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={isMatch ? { y: -4, borderColor: 'var(--harvest-gold)' } : {}}
                  style={{
                    backgroundColor: isMatch ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.02)',
                    border: isMatch ? '1.5px solid rgba(220, 160, 50, 0.6)' : '1px solid rgba(220, 160, 50, 0.15)',
                    borderRadius: '16px',
                    padding: '1.4rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem',
                    backdropFilter: 'blur(12px)',
                    cursor: 'pointer',
                    boxShadow: isMatch ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none'
                  }}
                  onClick={() => {
                    setActiveProgFilter('All Retreats');
                    onNavigate('programmes');
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: isMatch ? 'var(--harvest-gold)' : 'var(--tan)', fontWeight: 800, letterSpacing: '0.1em', opacity: isMatch ? 1 : 0.6 }}>
                      ✦ {prog.days}
                    </span>
                    {prog.popular && (
                      <span style={{ fontSize: '0.58rem', backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 style={{color: 'var(--tan)', margin: 0, lineHeight: 1.2, opacity: isMatch ? 1 : 0.7, fontSize: '1.35rem'}}>
                    {prog.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--isabelline)', opacity: isMatch ? 0.88 : 0.5, lineHeight: 1.5, margin: 0 }}>
                    {prog.tagline}
                  </p>
                  <button className="btn-luxury" style={{ alignSelf: 'flex-start', padding: '0.45rem 1.1rem', fontSize: '0.68rem', marginTop: 'auto', opacity: isMatch ? 1 : 0.5 }}>
                    Explore &rarr;
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 2: Comprehensive Care (Split Interactive Clinical Showcase) */}
      <section style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', padding: '2.2rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.7rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
              ✦ Targeted Clinical Interventions
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0, lineHeight: 1.1}}>
              Comprehensive <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Clinical Spectrum</em>
            </h2>
          </div>

          {/* 2-Column Split Interactive Stage */}
          <div className="clinical-stage-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.3rem', alignItems: 'stretch' }}>
            
            {/* Left Interactive Category Selector */}
            <div className="clinical-categories-selector" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', height: '100%' }}>
              {[
                { id: 'Internal & Metabolic', title: 'Internal & Metabolic Health', count: '6 Therapies', desc: 'Cellular detox, diabetes reversal & metabolic restoration.' },
                { id: 'Nervous System', title: 'Nervous System & Mind', count: '5 Therapies', desc: 'Shirodhara, insomnia recovery & neurological stress reset.' },
                { id: 'Joints & Vitality', title: 'Joints & Spinal Rehab', count: '4 Therapies', desc: 'Hydro-kinesiology, herbal poultice & spinal realignments.' },
                { id: 'Cardiovascular Care', title: 'Vascular & Cardiorespiratory', count: '4 Therapies', desc: 'Arterial cleansing pranayama & bio-monitored recovery.' }
              ].map((item, idx) => {
                const isActive = activeCareCategory === item.id || (activeCareCategory === 'All Conditions' && idx === 0);
                return (
                  <motion.div 
                    key={idx}
                    onClick={() => setActiveCareCategory(item.id)}
                    whileHover={{ x: 4 }}
                    style={{
                      backgroundColor: isActive ? 'var(--wine)' : '#ffffff',
                      color: isActive ? 'var(--tan)' : 'var(--wine)',
                      border: isActive ? '1.5px solid var(--harvest-gold)' : '1px solid rgba(94, 39, 53, 0.12)',
                      borderRadius: '14px',
                      padding: '0.9rem 1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 8px 20px rgba(94, 39, 53, 0.18)' : '0 2px 10px rgba(94, 39, 53, 0.03)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: 1
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                        <span style={{ fontSize: '0.65rem', color: isActive ? 'var(--harvest-gold)' : 'var(--redwood)', fontWeight: 800 }}>
                          ✦ 0{idx + 1}
                        </span>
                        <h3 style={{margin: 0}}>
                          {item.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.78rem', opacity: isActive ? 0.9 : 0.75, margin: 0, lineHeight: 1.35 }}>
                        {item.desc}
                      </p>
                    </div>

                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'var(--harvest-gold)' : 'rgba(184, 94, 76, 0.12)',
                      color: isActive ? '#2B1219' : 'var(--redwood)',
                      flexShrink: 0,
                      marginLeft: '0.6rem'
                    }}>
                      {item.count}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Active Clinical Protocol Feature Showcase Stage */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid rgba(94, 39, 53, 0.14)',
              borderRadius: '16px',
              padding: '1.6rem',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--redwood)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    <Star size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Active Clinical Protocol
                  </span>
                  <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)', padding: '0.25rem 0.7rem', borderRadius: '12px', fontWeight: 800 }}>
                    7 to 21 Days Protocol
                  </span>
                </div>

                <h3 style={{color: 'var(--wine)', margin: '0 0 0.4rem 0', lineHeight: 1.25}}>
                  {activeCareCategory === 'Nervous System' ? 'Neurological Rest & Shirodhara Rejuvenation' :
                   activeCareCategory === 'Joints & Vitality' ? 'Spinal Rehabilitation & Joint Hydro-Kinesiology' :
                   activeCareCategory === 'Cardiovascular Care' ? 'Vascular Pranayama & Metabolic Cleanse' :
                   'Deep Cellular Detoxification & Metabolic Sync'}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
                  A doctor-supervised drugless clinical protocol integrating target hydrotherapy, therapeutic mud applications, custom Satwik organic nutrition, and bio-feedback vital tracking.
                </p>
              </div>

              {/* Modalities Chips */}
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--wine)', fontWeight: 700, display: 'block', marginBottom: '0.45rem' }}>
                  Core Medical Modalities Included:
                </span>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {['Hydrotherapy Cleansing', 'Shirodhara Oil Flow', 'Satwik Organic Diet', 'Bio-Fasting Protocol', 'Barefoot Grounding'].map((m, mIdx) => (
                    <span 
                      key={mIdx}
                      style={{
                        padding: '0.28rem 0.7rem',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(184, 94, 76, 0.08)',
                        color: 'var(--redwood)',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      ✦ {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.08)' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--wine)', opacity: 0.75, display: 'block' }}>Clinical Assessment</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--wine)', fontWeight: 800 }}>100% Drugless Naturopathy</span>
                </div>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="btn-luxury"
                  style={{ padding: '0.75rem 1.8rem', fontSize: '0.75rem' }}
                >
                  Schedule Assessment &rarr;
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Section 3: Guided by Experts (Combo 2: var(--raisin-black) #252425) */}
      <section style={{ backgroundColor: 'var(--raisin-black)', color: 'var(--isabelline)', padding: '3.2rem 4%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
              <Star size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Leadership & Clinical Authority
            </span>
            <h2 style={{color: 'var(--tan)', margin: 0}}>
              Guided by Founders <em style={{ fontStyle: 'italic', color: 'var(--harvest-gold)' }}>&amp; Clinical Experts</em>
            </h2>
          </div>

          <div className="experts-carousel-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.9rem', width: '100%' }}>
            {[
              { name: 'Dr. Sunil Jayaraj', role: 'Founder', creds: 'Suprada Wellness', img: '/assets/sunil_jayaraj.jpg' },
              { name: 'Dr. Prema Ramadas', role: 'Co-founder', creds: 'Suprada Wellness', img: '/assets/prema_ramadas.jpg' },
              { name: 'Srinivas Ramadas', role: 'Director Operations', creds: 'Suprada Wellness', img: '/assets/srinivas_ramadas.jpg' },
              { name: 'Nagaraju', role: 'Chairman', creds: 'Suprada Wellness', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' },
              { name: 'Dr. Vinaya, B.N.Y.S', role: 'Chief Medical Officer', creds: 'Suprada Wellness', img: '/assets/vinaya.jpg' }
            ].map((doc, idx) => (
              <div key={idx} className="editorial-master-card" style={{ height: '300px', width: '100%' }}>
                <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="editorial-master-overlay" style={{ padding: '1rem 0.9rem' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--harvest-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {doc.creds}
                  </span>
                  <h3 style={{color: '#ffffff', margin: '0.1rem 0 0.15rem 0', fontSize: '1.05rem', lineHeight: 1.2}}>
                    {doc.name}
                  </h3>
                  <span style={{ fontSize: '0.74rem', color: 'var(--tan)', opacity: 0.9, fontWeight: 500 }}>
                    {doc.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 4: Why Choose Suprada (Combo 2: var(--tea-green) #d1dac2) */}
      <section style={{ backgroundColor: 'var(--tea-green)', color: 'var(--wine)', padding: '3.2rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
              ✦ Core Differentiators
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              The Suprada <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Distinction</em>
            </h2>
          </div>

          <div className="spatial-monolith-container">
            {[
              { num: '01', title: '100% Drugless Naturopathy', desc: 'Evidence-based hydrotherapy, mud wraps, bio-fasting, and plant infusions.' },
              { num: '02', title: '54 Riverfront Acres', desc: 'Nestled by the sacred Suvarnamukhi River with clean air and barefoot grounding tracks.' },
              { num: '03', title: 'Holistic Medical Synergy', desc: 'Unified medical oversight integrating Naturopathy, Yogic Science & Iris Diagnosis.' },
              { num: '04', title: '24/7 Resident Doctors', desc: 'Licensed physicians and yoga masters available on campus round-the-clock.' }
            ].map((slab, idx) => {
              const isActive = expandedPillar === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setExpandedPillar(idx)}
                  onMouseEnter={() => setExpandedPillar(idx)}
                  className={`spatial-monolith-slab ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '1.8rem',
                    background: isActive ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(220, 195, 175, 0.22) 100%)' : '#ffffff',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderColor: isActive ? 'var(--wine)' : 'rgba(94, 39, 53, 0.15)',
                    boxShadow: isActive ? '0 12px 30px rgba(94, 39, 53, 0.12)' : '0 4px 15px rgba(94, 39, 53, 0.03)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <div className="gold-foil-text" style={{ fontSize: '3.2rem', color: isActive ? 'var(--wine)' : 'var(--redwood)', fontWeight: 700, lineHeight: 1 }}>
                    {slab.num}
                  </div>
                  <div>
                    <h3 style={{color: 'var(--wine)', marginBottom: '0.4rem'}}>
                      {slab.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--wine)', opacity: isActive ? 0.95 : 0.8, lineHeight: 1.5, margin: 0 }}>
                      {slab.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 5: Discover Your Wellness Path (Instant Diagnostic Assessment) */}
      <section style={{ backgroundColor: 'var(--isabelline)', padding: '4.2rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
              ✦ Instant Diagnostic Assessment
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0, lineHeight: 1.1}}>
              Discover Your <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Wellness Path</em>
            </h2>
          </div>

          {/* Enriched Diagnostic Showcase Card */}
          <div className="flex-stack-mobile" style={{ backgroundColor: '#ffffff', border: '1.5px solid rgba(94, 39, 53, 0.15)', borderRadius: '24px', padding: '2.8rem 3rem', boxShadow: '0 15px 45px rgba(94, 39, 53, 0.08)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Row 1: Selectors (Centered) */}
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              
              {/* Selector 1: Dosha */}
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--wine)', fontWeight: 800, display: 'block', marginBottom: '0.6rem', letterSpacing: '0.02em', textAlign: 'center' }}>
                  1. Primary Body Type (Dosha):
                </span>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Vata', 'Pitta', 'Kapha'].map((d, dIdx) => (
                    <button 
                      key={dIdx}
                      className={`quiz-option-chip ${quizSelections.dosha === d ? 'selected' : ''}`}
                      style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                      onClick={() => setQuizSelections(prev => ({ ...prev, dosha: d }))}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Toxicity */}
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--wine)', fontWeight: 800, display: 'block', marginBottom: '0.6rem', letterSpacing: '0.02em', textAlign: 'center' }}>
                  2. Sluggishness Level:
                </span>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Mild Fatigue', 'Moderate Detox', 'High Stress'].map((tox, tIdx) => (
                    <button 
                      key={tIdx}
                      className={`quiz-option-chip ${quizSelections.detox === tox ? 'selected' : ''}`}
                      style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                      onClick={() => setQuizSelections(prev => ({ ...prev, detox: tox }))}
                    >
                      {tox}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 2: Calculation Output & Action CTA (Centered) */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="flex-stack-mobile" style={{ backgroundColor: 'rgba(94, 39, 53, 0.06)', border: '1px solid rgba(94, 39, 53, 0.12)', padding: '1.1rem 2.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.6rem', textAlign: 'center', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--wine)', fontWeight: 800, display: 'block', marginBottom: '0.15rem' }}>
                    Calculated Protocol Match:
                  </span>
                  <span style={{ fontSize: '1.02rem', color: 'var(--redwood)', fontWeight: 800 }}>
                    {quizSelections.dosha} • {quizSelections.detox} Program
                  </span>
                </div>
                <button onClick={() => onNavigate('contact')} className="btn-luxury" style={{ padding: '0.8rem 1.8rem', fontSize: '0.78rem' }}>
                  Book Consultation &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Guest Stories (Combo 2: var(--pale-dogwood) #f2d7cc) */}
      <section style={{ backgroundColor: 'var(--pale-dogwood)', color: 'var(--wine)', padding: '3.2rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
              ✦ Verified Reflections
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              Guest <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Journals</em>
            </h2>
          </div>

          {/* Compact Single-Line Interactive Testimonial Slider */}
          <div style={{ backgroundColor: 'var(--wine)', border: '1px solid var(--harvest-gold)', borderRadius: '20px', padding: '2.2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ color: 'var(--harvest-gold)', fontSize: '1.2rem', letterSpacing: '0.2em' }}>★★★★★</div>
            
            <h4 style={{fontStyle: 'italic', color: 'var(--tan)', lineHeight: 1.6, maxWidth: '800px', margin: 0}}>
              {activeExpert === 0 && "“A truly transformative experience. The combination of authentic holistic therapies and the serene river setting created a space for deep healing. I left feeling lighter, clearer, and fully restored.”"}
              {activeExpert === 1 && "“The doctors here are exceptional. They took the time to understand my lifestyle and created a practical plan I could follow effortlessly. The organic food was delicious and deeply restorative.”"}
              {activeExpert === 2 && "“Suprada is a hidden sanctuary. The sunrise yoga sessions by the river were pure magic. The therapists are highly skilled, and the entire team treated me like family.”"}
              {activeExpert === 3 && "“After my 21-day cellular detox, my energy levels returned to where they were ten years ago. A benchmark in genuine naturopathic care.”"}
            </h4>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Sarah Jenkins (London)', 'Rajesh Gupta (Mumbai)', 'Elena Rossi (Milan)', 'David Miller (New York)'].map((guest, gIdx) => (
                <button 
                  key={gIdx}
                  onClick={() => setActiveExpert(gIdx)}
                  className={`pill-luxury ${(activeExpert % 4) === gIdx ? 'active' : ''}`}
                >
                  {guest}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 7: Begin Your Healing Journey (Combo 2: var(--raisin-black) #252425) */}
      <section style={{ backgroundColor: 'var(--raisin-black)', color: 'var(--isabelline)', padding: '3.8rem 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '600px', width: '100%', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 700 }}>
            ✦ Your Transformation Awaits
          </span>

          <h2 style={{color: 'var(--tan)', lineHeight: 1.15, margin: 0}}>
            The Sacred Sanctuary Gateway
          </h2>

          <p style={{ opacity: 0.88, fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, maxWidth: '640px', margin: 0 }}>
            Let the sacred Suvarnamukhi River and ancient drugless healing wisdom guide your body to perfect equilibrium.
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem' }}>✦ 100% Drugless Naturopathy</div>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem' }}>✦ 54 Riverfront Acres</div>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Stethoscope size={14} style={{ color: 'var(--harvest-gold)' }} /> 24/7 Resident Doctors</div>
          </div>

          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button 
              onClick={() => onNavigate('stay')}
              className="btn-luxury" 
              style={{ padding: '0.95rem 2.6rem', fontSize: '0.82rem' }}
            >
              Reserve Sanctuary Stay
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              style={{ background: 'none', border: '1.5px solid var(--tan)', color: 'var(--tan)', cursor: 'pointer', padding: '0.95rem 2.6rem', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, borderRadius: '50px', transition: 'all 0.3s ease' }}
              className="hover-tan"
            >
              Schedule Medical Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
