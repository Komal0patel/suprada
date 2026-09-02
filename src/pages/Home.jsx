import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27, Pattern28 } from '../AnimatedPatterns';
import { Stethoscope, Star, Leaf, Globe, Check, ArrowRight, X } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);

  // Unified loop for continuous rotation (when not hovered) and smooth easing (when hovered/focused)
  useEffect(() => {
    let animationFrameId;
    
    const tick = () => {
      if (isHovered) {
        // Easing mode: smoothly rotate to target angle for activeRitualIndex
        const targetAngle = 90 - (activeRitualIndex * 60);
        setRotationAngle(prev => {
          let diff = (targetAngle - prev) % 360;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          if (Math.abs(diff) < 0.05) {
            return targetAngle;
          }
          return prev + diff * 0.085; // smooth easing factor
        });
      } else {
        // Continuous revolution mode: slowly rotate the wheel
        setRotationAngle(prev => {
          const nextAngle = prev - 0.2; // 0.2 degrees per frame (12 deg/sec, 30s per full rev)
          
          // Calculate active index closest to the front (90 degrees)
          const closestIndex = (Math.round((90 - nextAngle) / 60) % 6 + 6) % 6;
          if (closestIndex !== activeRitualIndex) {
            setActiveRitualIndex(closestIndex);
          }
          
          return nextAngle % 360;
        });
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, activeRitualIndex]);

  // Mobile Responsiveness State
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [selectedNaturopathyModal, setSelectedNaturopathyModal] = useState(null);
  const [selectedDiseaseModal, setSelectedDiseaseModal] = useState(null);

  // Lock background body and html scroll when detail modal is open
  useEffect(() => {
    if (selectedNaturopathyModal || selectedDiseaseModal) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
      };
    }
  }, [selectedNaturopathyModal, selectedDiseaseModal]);

  const naturopathyCards = [
    {
      id: 'naturopathy',
      number: '01',
      category: 'DRUGLESS HEALING',
      title: 'Naturopathy',
      tagline: "Nature's Path to Healing & Rejuvenation",
      sanskritQuote: 'Prakṛtireva bheṣajam.',
      sanskritMeaning: 'Nature itself is the medicine.',
      description: 'Naturopathy is a holistic system of healing that harnesses the body\'s innate ability to heal itself through natural, drug-free therapies. At Suprada Wellness, our naturopathy programmes combine time-tested natural treatments with modern wellness practices to detoxify, restore balance, and rejuvenate your entire being.',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Iris & Facial Mapping', '15+ Therapeutic Massages', 'Hydrotherapy & Spinal Spray', 'Full Body Earth Mud Baths'],
      details: {
        diagnostics: [
          { name: 'Iris Diagnosis (Iridology)', desc: 'Non-invasive examination of iris fibers to map organ health, tissue inflammation, and inherited constitutional weaknesses.' },
          { name: 'Facial & Tongue Mapping', desc: 'Ancient diagnostic facial markers revealing metabolic vitality and digestive fires.' },
          { name: 'Body Mind Co-ordination', desc: 'Holistic stress, autonomic nervous system, and emotional tension evaluation.' },
          { name: 'Body Impedance Analysis (BIA)', desc: 'Precision cellular hydration, visceral fat, body composition, and metabolic assessment.' }
        ],
        therapies: [
          { name: 'Therapeutic Massages Suite', list: ['Powder Vibrio (Udhwartana)', 'Deep Tissue Alignment', 'Reflexology', 'Acumassage', 'Shiatsu', 'Swedish Massage', 'Thai Yoga Massage'] },
          { name: 'Hydrotherapy Suite', list: ['Hip Bath & Immersion Baths (Neem, Turmeric, Epsom Salt)', 'Spinal Spray & Spinal Bath', 'Jacuzzi & Spiral Jet Bath', 'Colon Hydrotherapy', 'Herbal Steam & Finnish Sauna'] },
          { name: 'Earth & Mud Therapies', list: ['Full Body Mud Bath', 'Abdominal & Ocular Cooling Mud Packs', 'Sun & Helio Therapy'] }
        ]
      }
    },
    {
      id: 'yoga-meditation',
      number: '02',
      category: 'MIND-BODY HARMONY',
      title: 'Yoga & Meditation',
      tagline: 'Unite Body, Mind & Spirit',
      sanskritQuote: 'Yogaś citta-vṛtti-nirodhaḥ.',
      sanskritMeaning: 'Yoga is the cessation of the modifications of the mind.',
      description: 'Yoga and meditation are transformative practices that unite the body, mind, and spirit. At Suprada Wellness, we offer authentic yoga sessions guided by experienced instructors, combining classical Asanas (postures), Pranayama (breath work), and meditation techniques to cultivate physical strength, mental clarity, and emotional balance.',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Classical Asana Flow', 'Pranayama Breath Control', 'Shatkarma Cleansing Kriyas', 'Yoga Nidra & Sound Rest'],
      details: {
        diagnostics: [
          { name: 'Prana & Vayu Assessment', desc: 'Evaluation of breath efficiency, diaphragmatic movement, and vital energy flow.' },
          { name: 'Postural & Spinal Alignment', desc: 'Structural assessment of spinal flexibility, core strength, and joint mobility.' }
        ],
        therapies: [
          { name: 'Asana Practice', list: ['Surya Namaskar at Sunrise', 'Gentle Hatha Flow', 'Restorative Yoga', 'Joint Warm-ups & Micro-movements'] },
          { name: 'Pranayama & Kriyas', list: ['Nadi Shodhana & Anulom Vilom', 'Bhastrika & Kapalabhati', 'Jala Neti & Kunjal Kriya', 'Bhramari & Guided Mind Retention'] }
        ]
      }
    },
    {
      id: 'holistic-therapies',
      number: '03',
      category: 'VIBRATIONAL MEDICINE',
      title: 'Holistic Therapies',
      tagline: 'Integrated Healing for Complete Wellness',
      sanskritQuote: 'Sarvaṁ khalvidaṁ brahma.',
      sanskritMeaning: 'All this is indeed the universal consciousness.',
      description: 'Our holistic therapies integrate diverse healing modalities from around the world to address your health from multiple dimensions. Combining ancient wisdom with modern techniques, we offer acupuncture, acupressure, energy healing, cupping therapy, music & sound healing and other complementary treatments designed to restore balance and promote deep healing.',
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Acupuncture & Reflexology', 'Tibetan Om Singing Bowls', 'Gong & Flute Sound Baths', 'Pranic & Reiki Energy Work'],
      details: {
        diagnostics: [
          { name: 'Meridian & Pressure Point Mapping', desc: 'Identifying energy blockages along chi meridians.' },
          { name: 'Acoustic Vibrational Resonance Test', desc: 'Assessing nervous system tension through acoustic sound frequencies.' }
        ],
        therapies: [
          { name: 'Energy Healing', list: ['Clinical Acupuncture', 'Foot & Hand Reflexology', 'Pranic Energy Balancing', 'Reiki Chakra Alignment'] },
          { name: 'Sound & Acoustic Healing', list: ['Tibetan Om Singing Bowls', 'Gong Acoustic Bath', 'Bamboo Flute Meditation', 'Vibrational Resonance Therapy'] }
        ]
      }
    },
    {
      id: 'nutrition-lifestyle',
      number: '04',
      category: 'SATWIK NOURISHMENT',
      title: 'Nutrition & Lifestyle',
      tagline: 'Nourish Your Body, Transform Your Life',
      sanskritQuote: 'Āhāraśuddhau sattvaśuddhiḥ.',
      sanskritMeaning: 'When food is pure, the mind becomes pure.',
      description: 'True wellness begins with what you put on your plate and how you live your daily life. Our nutrition and lifestyle programmes combine ancient dietary wisdom with modern nutritional science to create personalized plans that support your health goals, enhance vitality, and promote long-term well-being.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Farm-to-Table Satwik Meals', 'Gut Microbiome Repair', 'Cold-Pressed Juices', 'Therapeutic Bio-Fasting'],
      details: {
        diagnostics: [
          { name: 'Prakriti & Metabolic Assessment', desc: 'Customizing dietary plans to your unique metabolic dosha type.' },
          { name: 'Gut & Inflammatory Profile', desc: 'Evaluating digestive fires (Agni), gut microbiome health, and food intolerances.' }
        ],
        therapies: [
          { name: 'Satwik Dining', list: ['Organic Farm-to-Table Cuisine', 'Millet & Ancient Grain Recipes', 'Probiotic & Herbal Infusions', 'Anti-Inflammatory Soups'] },
          { name: 'Detox & Fasting', list: ['Therapeutic Bio-Fasting', 'Cold-Pressed Green Juices', 'Intermittent Gut Rest Protocols', 'Mindful Eating Workshops'] }
        ]
      }
    },
    {
      id: 'mental-wellbeing',
      number: '05',
      category: 'MINDFUL RESILIENCE',
      title: 'Mental & Emotional Well-Being',
      tagline: 'Nurture Your Mind, Heal Your Heart',
      sanskritQuote: 'Mana eva manuṣyāṇāṁ kāraṇaṁ bandhamokṣayoḥ.',
      sanskritMeaning: 'The mind alone is the cause of bondage and liberation.',
      description: 'Mental and emotional health are foundational to overall wellness. Our comprehensive programmes combine professional counselling, stress management techniques, breathwork, and mindfulness practices to help you navigate life\'s challenges with greater resilience, clarity, and inner peace.',
      image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Professional Counselling', 'Stress Resilience Training', 'Mindfulness & Meditation', 'Emotional Trauma Release'],
      details: {
        diagnostics: [
          { name: 'Autonomic Nervous System Evaluation', desc: 'Assessing sympathetic vs parasympathetic tone and stress reactivity.' },
          { name: 'Emotional Stress Mapping', desc: 'Identifying psychological stressors, anxiety patterns, and burnout triggers.' }
        ],
        therapies: [
          { name: 'Mindfulness & Therapy', list: ['Cognitive Wellness Counselling', 'Guided Mindfulness Meditation', 'Somatic Release Breathwork', 'Nature Grounding & Silence Retaining'] },
          { name: 'Stress Reduction', list: ['Progressive Muscle Relaxation', 'Aromatherapy Neural Calm', 'Biofeedback & Heart Rate Variability'] }
        ]
      }
    },
    {
      id: 'detox-cleansing',
      number: '06',
      category: 'CELLULAR PURIFICATION',
      title: 'Detox & Cleansing',
      tagline: 'Purify, Renew, Revitalize',
      sanskritQuote: 'Śuddhireva paramaṁ dharmaḥ.',
      sanskritMeaning: 'Purity is the highest virtue.',
      description: 'In our modern world, toxins accumulate from environmental pollutants, processed foods, stress, and lifestyle factors. Our comprehensive detoxification programmes use time-tested authentic therapies protocols, therapeutic fasting, and natural cleansing methods to eliminate accumulated toxins, restore cellular health, and rejuvenate your entire system.',
      image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Systemic Toxins Evaluation', 'Colon & Liver Cleansing', 'Herbal Bio-Steam Packs', 'Therapeutic Juice Fasting'],
      details: {
        diagnostics: [
          { name: 'Toxic Burden & Cellular Hydration Analysis', desc: 'Mapping metabolic waste accumulation and liver detoxification capacity.' },
          { name: 'Digestive Toxicity Assessment', desc: 'Evaluating Ama (accumulated toxins) in the gastrointestinal tract.' }
        ],
        therapies: [
          { name: 'Purification Therapies', list: ['Colon Hydrotherapy', 'Full Body Mud Wrap & Detox', 'Herbal Bio-Steam & Finnish Sauna', 'Enema Cleansing Protocols'] },
          { name: 'Detox Fasting', list: ['Therapeutic Juice Fasting', 'Kunjal & Shatkarma Kriyas', 'Herbal Liver Flush Infusions'] }
        ]
      }
    },
    {
      id: 'physiotherapy',
      number: '07',
      category: 'REHABILITATION & MOVEMENT',
      title: 'Physiotherapy',
      tagline: 'Restore Movement, Reclaim Life',
      sanskritQuote: 'Calanaṁ jīvanam.',
      sanskritMeaning: 'Movement is life.',
      description: 'Our physiotherapy programmes combine evidence-based rehabilitation techniques with holistic wellness principles to help you recover from injuries, manage chronic pain, and improve overall mobility. Our experienced physiotherapists create personalized treatment plans tailored to your specific condition and recovery goals.',
      image: 'https://images.pexels.com/photos/6111619/pexels-photo-6111619.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Postural Correction', 'Joint & Spinal Rehabilitation', 'Myofascial Trigger Release', 'Therapeutic Exercise Protocols'],
      details: {
        diagnostics: [
          { name: 'Kinesiological Motion & Gait Analysis', desc: 'Biomechanical examination of joint range of motion, muscle imbalance, and gait efficiency.' },
          { name: 'Spinal Alignment Assessment', desc: 'Detailed spinal curvature and nerve impingement testing.' }
        ],
        therapies: [
          { name: 'Rehabilitation Modalities', list: ['Manual Therapy & Joint Mobilization', 'Electrotherapy & Ultrasound', 'Myofascial Trigger Point Release', 'Therapeutic Hydro-Rehab'] },
          { name: 'Functional Conditioning', list: ['Core Stabilization Training', 'Postural Alignment Retraining', 'Ergonomic & Biomechanical Guidance'] }
        ]
      }
    },
    {
      id: 'ayurveda',
      number: '08',
      category: 'ANCIENT DOSHIC WISDOM',
      title: 'Ayurveda',
      tagline: 'Ancient Wisdom for Modern Wellness',
      sanskritQuote: 'Svasthasya svāsthyarakṣaṇaṁ.',
      sanskritMeaning: 'Preservation of health of the healthy.',
      description: 'Ayurveda, the 5,000-year-old "Science of Life," offers a comprehensive approach to health and wellness by balancing the three doshas—Vata, Pitta, and Kapha. At Suprada Wellness, our authentic Ayurvedic treatments combine classical therapies with personalized care to restore harmony, enhance immunity, and promote longevity.',
      image: 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      highlights: ['Nadi Pariksha Pulse Diagnosis', 'Shirodhara Oil Therapy', 'Abhyanga Oil Alignment', 'Kizhi Herbal Compress'],
      details: {
        diagnostics: [
          { name: 'Nadi Pariksha (Pulse Diagnosis)', desc: 'Ancient pulse assessment evaluating dosha imbalances (Vata, Pitta, Kapha) and organ vitality.' },
          { name: 'Prakriti & Vikriti Assessment', desc: 'Determining your innate constitutional type and current state of doshic imbalance.' }
        ],
        therapies: [
          { name: 'Classical Therapies', list: ['Shirodhara Warm Oil Therapy', 'Abhyanga Synchronized Massage', 'Kizhi Herbal Compress Massage', 'Nasya Herbal Nasal Cleansing'] },
          { name: 'Rejuvenation Protocols', list: ['Rasayana Anti-Aging Treatments', 'Kashaya Dhara Medicated Stream', 'Doshic Herbal Teas & Formulations'] }
        ]
      }
    }
  ];


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
  const [activeCareCategory, setActiveCareCategory] = useState('detoxification');
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
        {/* Background Video for Hero Section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        >
          <source src="/assets/heroSection/IMG_0224.MP4" type="video/mp4" />
        </video>

        {/* Directional Side Shadow Overlay — Softened Darker Behind Text, Fading Out towards Image */}
        <div 
          className="hero-side-overlay"
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100%', 
            background: 'linear-gradient(to right, rgba(14, 5, 9, 0.65) 0%, rgba(14, 5, 9, 0.48) 35%, rgba(14, 5, 9, 0.18) 65%, transparent 90%)', 
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
            <motion.p variants={blurFadeIn} className="hero-subtitle-mobile" style={{ color: 'var(--isabelline)', fontSize: 'var(--fs-body)', opacity: 0.92, maxWidth: '500px', margin: '0 0 1.8rem 0', fontWeight: 400, lineHeight: 1.65, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'left', letterSpacing: '0.01em' }}>
              Experience the ancient healing intelligence of Naturopathy &amp; Yogic Science. Nestled on the banks of the holy Suvarnamukhi River.
            </motion.p>

            {/* Left-Aligned CTA Action Button */}
            <motion.div variants={blurFadeIn} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
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
          </motion.div>
        </div>
      </section>

      {/* The Spirit of Suprada (Founders Section) */}
      <section style={{ backgroundColor: 'var(--isabelline)', position: 'relative', overflow: 'hidden' }} className="dot-grid founders-section">
        {/* Floating Decorative Patterns */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '250px', zIndex: 1, pointerEvents: 'none' }}
        >
          <Pattern28 style={{ width: '100%', color: 'var(--wine)', opacity: 0.08 }} />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: 0, right: 0, width: '250px', zIndex: 1, pointerEvents: 'none' }}
        >
          <Pattern25 style={{ width: '100%', color: 'var(--wine)', opacity: 0.08 }} />
        </motion.div>
        
        <div className="float-slow" style={{ position: 'absolute', right: '-5%', top: '5%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.06) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none', zIndex: 1 }}></div>

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
              border-bottom: 1px solid rgba(94, 39, 53, 0.15);
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
                src="/assets/extracted/logo.svg" 
                alt="Suprada Logo" 
                className="founders-badge-img"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 20px rgba(94, 39, 53, 0.2))' 
                }} 
              />
            </motion.div>
            <div style={{ textAlign: 'center' }} className="founders-badge-text">
              <h3 style={{color: 'var(--wine)', letterSpacing: '0.1em', margin: 0, fontWeight: 700}}>Suprada</h3>
              <span style={{ color: 'var(--redwood)', opacity: 0.85, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.15rem', display: 'block', fontWeight: 700 }}>Est. 2026</span>
            </div>
          </motion.div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <motion.div 
              variants={foundersMistFadeVariant}
              style={{ display: 'inline-block', position: 'relative', width: 'fit-content' }}
            >
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.78rem', fontWeight: 800 }}>
                Our Story
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{ height: '1.5px', backgroundColor: 'var(--redwood)', width: '100%', originX: 0, marginTop: '0.2rem' }}
              />
            </motion.div>
            
            <motion.h2 
              variants={foundersMistFadeVariant}
              className="founders-title" 
              style={{lineHeight: 1.18, margin: 0, color: 'var(--wine)', fontWeight: 700}}
            >
              The Spirit of Suprada
            </motion.h2>
            
            <motion.h4 variants={foundersMistFadeVariant} className="founders-subtitle" style={{color: 'var(--redwood)', letterSpacing: '0.02em', margin: 0, fontWeight: 600}}>
              Where Global Expertise Meets Indian Heritage
            </motion.h4>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-body" style={{ color: 'var(--raisin-black)', fontSize: 'var(--fs-body)', opacity: 0.88, lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
              Suprada is the realization of a vision shared by <strong>Sunil Jayaraj</strong> and <strong>Dr. Premasudha Ramadas</strong>. After spending 16 years in the United States, they returned to India with a singular purpose: to bridge the gap between advanced science and ancient Indian wisdom.
            </motion.p>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-body" style={{ color: 'var(--raisin-black)', fontSize: 'var(--fs-body)', opacity: 0.88, lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
              Sunil, known as a "Blue Planet Runner," brings the endurance and discipline of an elite athlete, while Dr. Premasudha, a US Board-certified physician, ensures our holistic integration is grounded in authenticity and clinical evidence.
            </motion.p>
            
            <motion.p variants={foundersMistFadeVariant} className="founders-quote" style={{ color: 'var(--wine)', fontSize: 'var(--fs-body)', opacity: 0.95, lineHeight: 1.5, fontStyle: 'italic', marginTop: '0.2rem', margin: 0, fontWeight: 600 }}>
              "In today's world, healing is often scattered—one place for the body, another for the mind. We created Suprada to bring these fragments together into one cohesive journey of restoration."
            </motion.p>
            
            <motion.div variants={foundersMistFadeVariant} style={{ marginTop: '0.3rem' }}>
              <motion.button 
                whileHover={{ x: 8 }}
                onClick={() => onNavigate('about')}
                style={{ background: 'none', border: 'none', color: 'var(--wine)', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}
              >
                Learn More About Our Journey &rarr;
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Transformative Naturopathy & Holistic Wellness Section - Compact 1-Screen Responsive Layout */}
      <section className="naturopathy-section-container luxury-clay" style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '3rem 5%' : '3.5rem 6%', backgroundColor: 'var(--antique-white)' }}>
        <Pattern28 style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>
              ✦ CORE MEDICAL MODALITIES
            </span>
            <h2 style={{ color: 'var(--wine)', lineHeight: 1.18, margin: 0, fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 700 }}>
              Naturopathy <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>&amp; Holistic Wellness</em>
            </h2>
          </div>

          {/* Ultra-Compact 8-Card Grid Layout (Only Title Displayed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1rem',
            alignItems: 'stretch'
          }}>
            {naturopathyCards.slice(0, 4).map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedNaturopathyModal(card)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 18px rgba(94, 39, 53, 0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Compact Cover Image */}
                <div style={{ height: isMobile ? '95px' : '115px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(28,20,16,0.65) 100%)' }} />
                  
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    backgroundColor: 'rgba(28, 20, 16, 0.7)',
                    color: 'var(--harvest-gold)',
                    fontSize: '0.52rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(220,160,50,0.25)'
                  }}>
                    ✦ {card.category}
                  </span>

                  <span style={{
                    position: 'absolute', bottom: '6px', right: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    opacity: 0.85
                  }}>
                    {card.number}
                  </span>
                </div>

                {/* Card Title Only */}
                <div style={{ padding: '0.8rem 0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#ffffff', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.02rem', fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Modalities Indicator Bar */}
          <div style={{ textAlign: 'center', marginTop: '1.8rem' }}>
            <button
              onClick={() => onNavigate('naturopathy')}
              style={{
                backgroundColor: 'rgba(94, 39, 53, 0.06)',
                border: '1.5px solid rgba(94, 39, 53, 0.2)',
                color: 'var(--wine)',
                padding: '0.55rem 1.4rem',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="hover-gold"
            >
              Explore All 8 Clinical Modalities &amp; Programmes →
            </button>
          </div>
        </div>
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
          <div 
            className="rituals-split-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            
            {/* LEFT COLUMN: Headings and Interactive Menu */}
            <div className="rituals-left-col">
              <div>
                <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: 'var(--fs-small)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Exclusive Rituals</span>
                <h2 style={{color: 'var(--wine)', lineHeight: 1.1}}>
                  Unique Experiences <br />
                  <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Only at Suprada</em>
                </h2>
                <p style={{ color: 'var(--raisin-black)', opacity: 0.72, fontSize: 'var(--fs-body)', lineHeight: 1.5, marginTop: '0.6rem', maxWidth: '380px' }}>
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
                        fontSize: 'var(--fs-small)',
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
                      fontSize: 'var(--fs-body)',
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
                              '/assets/more_images/gograsa.png',
                              '/assets/more_images/agnihotra.png',
                              '/assets/more_images/sound_healing.png',
                              '/assets/more_images/satsang.png',
                              '/assets/more_images/planting_trees.png',
                              '/assets/more_images/art_therapy.png'
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
                            fontSize: 'var(--fs-small)',
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
                  image: '/assets/more_images/gograsa.png' 
                },
                { 
                  title: 'Agnihotra', 
                  image: '/assets/more_images/agnihotra.png' 
                },
                { 
                  title: 'Sound Healing', 
                  image: '/assets/more_images/sound_healing.png' 
                },
                { 
                  title: 'Satsang', 
                  image: '/assets/more_images/satsang.png' 
                },
                { 
                  title: 'Planting Trees', 
                  image: '/assets/more_images/planting_trees.png' 
                },
                { 
                  title: 'Art Therapy', 
                  image: '/assets/more_images/art_therapy.png' 
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
                    onClick={() => {
                      setActiveRitualIndex(idx);
                    }}
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



      {/* Full Detailed Modal Popup for Naturopathy Cards */}
      <AnimatePresence>
        {selectedNaturopathyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 10, 8, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem',
              overflow: 'hidden'
            }}
            onClick={() => setSelectedNaturopathyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '880px',
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNaturopathyModal(null)}
                style={{
                  position: 'absolute', top: '18px', right: '18px', zIndex: 10,
                  backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)',
                  border: 'none', borderRadius: '50%', width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.25s ease'
                }}
                className="hover-gold"
              >
                <X size={20} />
              </button>

              {/* Modal Fixed Header with Small Image Card */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1.4rem',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '1.4rem' : '1.8rem 2rem 1.4rem 2rem',
                borderBottom: '1.5px solid rgba(94, 39, 53, 0.12)',
                paddingRight: '3.5rem',
                flexShrink: 0,
                backgroundColor: '#ffffff'
              }}>
                {/* Small Image Card */}
                <div style={{
                  width: isMobile ? '100%' : '150px',
                  height: isMobile ? '130px' : '100px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 22px rgba(94, 39, 53, 0.14)',
                  border: '1px solid rgba(94, 39, 53, 0.12)'
                }}>
                  <img 
                    src={selectedNaturopathyModal.image} 
                    alt={selectedNaturopathyModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Header Information */}
                <div style={{ flex: 1 }}>
                  <span style={{
                    color: 'var(--redwood)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.3rem'
                  }}>
                    ✦ {selectedNaturopathyModal.category}
                  </span>
                  <h2 style={{ fontSize: isMobile ? '1.45rem' : '1.85rem', margin: '0 0 0.3rem 0', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>
                    {selectedNaturopathyModal.title}
                  </h2>
                  <p style={{ fontStyle: 'italic', color: 'var(--redwood)', fontSize: '0.86rem', fontWeight: 600, margin: 0 }}>
                    "{selectedNaturopathyModal.sanskritQuote}" — {selectedNaturopathyModal.sanskritMeaning}
                  </p>
                </div>
              </div>

              {/* Modal Internal Scrollable Body Area */}
              <div 
                className="hide-scrollbar"
                style={{
                  padding: isMobile ? '1.4rem' : '1.8rem 2rem',
                  overflowY: 'auto',
                  flex: 1,
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  pointerEvents: 'auto'
                }}
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black)', lineHeight: 1.65, marginBottom: '1.6rem' }}>
                  {selectedNaturopathyModal.description}
                </p>

                {/* Diagnostic Pillars Section */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.1rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Diagnostic Pillars &amp; Assessments
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.9rem' }}>
                    {selectedNaturopathyModal.details.diagnostics.map((diag, idx) => (
                      <div key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.04)', padding: '0.95rem 1.1rem', borderRadius: '12px', borderLeft: '3px solid var(--wine)' }}>
                        <h4 style={{ color: 'var(--wine)', margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 700 }}>{diag.name}</h4>
                        <p style={{ color: 'var(--raisin-black)', opacity: 0.82, fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>{diag.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Modalities & Therapies */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.1rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Therapeutic Protocols &amp; Treatments
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedNaturopathyModal.details.therapies.map((mod, idx) => (
                      <div key={idx} style={{ backgroundColor: 'var(--isabelline)', padding: '1.1rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(94,39,53,0.1)' }}>
                        <h4 style={{ color: 'var(--wine)', margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 700 }}>{mod.name}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                          {mod.list.map((item, itemIdx) => (
                            <span key={itemIdx} style={{ backgroundColor: '#ffffff', border: '1px solid rgba(94,39,53,0.16)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', color: 'var(--wine)', fontWeight: 600 }}>
                              ✦ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Detailed Modal Popup for Clinical Disease Cards */}
      <AnimatePresence>
        {selectedDiseaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 10, 8, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem',
              overflow: 'hidden'
            }}
            onClick={() => setSelectedDiseaseModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '880px',
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDiseaseModal(null)}
                style={{
                  position: 'absolute', top: '18px', right: '18px', zIndex: 10,
                  backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)',
                  border: 'none', borderRadius: '50%', width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.25s ease'
                }}
                className="hover-gold"
              >
                <X size={20} />
              </button>

              {/* Modal Fixed Header with Cover Image Card */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1.4rem',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '1.4rem' : '1.8rem 2rem 1.4rem 2rem',
                borderBottom: '1.5.px solid rgba(94, 39, 53, 0.12)',
                paddingRight: '3.5rem',
                flexShrink: 0,
                backgroundColor: '#ffffff'
              }}>
                {/* Small Image Card */}
                <div style={{
                  width: isMobile ? '100%' : '150px',
                  height: isMobile ? '130px' : '100px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 22px rgba(94, 39, 53, 0.14)',
                  border: '1px solid rgba(94, 39, 53, 0.12)'
                }}>
                  <img 
                    src={selectedDiseaseModal.image} 
                    alt={selectedDiseaseModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Header Information */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{
                      color: 'var(--redwood)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase'
                    }}>
                      ✦ PROTOCOL {selectedDiseaseModal.number}
                    </span>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(94, 39, 53, 0.08)',
                      color: 'var(--wine)'
                    }}>
                      {selectedDiseaseModal.category} Protocol
                    </span>
                  </div>

                  <h2 style={{ fontSize: isMobile ? '1.45rem' : '1.8rem', margin: '0 0 0.2rem 0', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>
                    {selectedDiseaseModal.title}
                  </h2>
                  <p style={{ color: 'var(--redwood)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                    {selectedDiseaseModal.protocolTitle}
                  </p>
                </div>
              </div>

              {/* Modal Internal Scrollable Body Area */}
              <div 
                className="hide-scrollbar"
                style={{
                  padding: isMobile ? '1.4rem' : '1.8rem 2rem',
                  overflowY: 'auto',
                  flex: 1,
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  pointerEvents: 'auto'
                }}
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black)', lineHeight: 1.65, marginBottom: '1.6rem' }}>
                  {selectedDiseaseModal.fullDesc}
                </p>

                {/* Diagnostic Pillars Section */}
                {selectedDiseaseModal.diagnostics && (
                  <div style={{ marginBottom: '1.8rem' }}>
                    <h3 style={{ color: 'var(--wine)', fontSize: '1.05rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                      Diagnostic Pillars &amp; Clinical Testing
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.9rem' }}>
                      {selectedDiseaseModal.diagnostics.map((diag, idx) => (
                        <div key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.04)', padding: '0.95rem 1.1rem', borderRadius: '12px', borderLeft: '3px solid var(--wine)' }}>
                          <h4 style={{ color: 'var(--wine)', margin: '0 0 0.25rem 0', fontSize: '0.88rem', fontWeight: 700 }}>{diag.name}</h4>
                          <p style={{ color: 'var(--raisin-black)', opacity: 0.82, fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>{diag.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Medical Modalities Included */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.05rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Core Medical Modalities Included
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {selectedDiseaseModal.modalities.map((item, itemIdx) => (
                      <span key={itemIdx} style={{ backgroundColor: 'rgba(184, 94, 76, 0.08)', border: '1px solid rgba(184, 94, 76, 0.2)', padding: '0.4rem 0.95rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--redwood)', fontWeight: 700 }}>
                        ✦ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clinical Oversight & Action Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.2rem', borderTop: '1px solid rgba(94, 39, 53, 0.12)', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--wine)', opacity: 0.75, display: 'block' }}>AYUSH Certified Doctors</span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--wine)', fontWeight: 800 }}>100% Drugless Naturopathy Care</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedDiseaseModal(null);
                      onNavigate('contact');
                    }}
                    className="btn-luxury"
                    style={{ padding: '0.8rem 1.8rem', fontSize: '0.78rem' }}
                  >
                    Schedule Assessment &rarr;
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Solid Cards Section (Slide 12: Path To Transformation Begins Within) */}
      <section style={{ 
        backgroundColor: 'var(--isabelline)', 
        padding: '3rem 5%', 
        position: 'relative', 
        overflow: 'hidden' 
      }} className="dot-grid">
        
        <Pattern24 aria-hidden="true" style={{ 
          position: 'absolute', left: '-2%', top: '50%', transform: 'translateY(-50%) scale(1.25)', 
          height: '90%', maxHeight: '600px', width: 'auto', opacity: 0.08, 
          color: 'var(--wine)', pointerEvents: 'none', zIndex: 1 
        }} />
        <Pattern25 aria-hidden="true" style={{ 
          position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%) scale(1.25)', 
          height: '90%', maxHeight: '600px', width: 'auto', opacity: 0.08, 
          color: 'var(--wine)', pointerEvents: 'none', zIndex: 1 
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
                <img src="/assets/extracted/logo.svg" alt="Suprada Logo" />
              </div>
              <p className="crest-title">
                LET NATURE<br />GUIDE THE WAY
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Suprada Rhythm Timeline */}
      <section ref={timelineRef} className="timeline-section dot-grid" style={{ backgroundColor: 'var(--isabelline)', overflow: 'hidden', position: 'relative' }}>
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
          <p style={{ color: 'var(--raisin-black)', opacity: 0.8, maxWidth: '650px', margin: '1rem auto 0 auto', fontSize: 'var(--fs-body)', lineHeight: 1.7 }}>
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
      <section style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', padding: '2.8rem 5%', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <Pattern28 style={{ position: 'absolute', top: 0, left: 0, width: '280px', color: 'var(--wine)', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div className="flex-stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.15rem' }}>
                ✦ Healing Retreats
              </span>
              <h2 style={{color: 'var(--wine)', margin: 0, lineHeight: 1.1, fontWeight: 700}}>
                The Sanctuary <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>Collection</em>
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
                  whileHover={isMatch ? { y: -4, borderColor: 'var(--wine)' } : {}}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isMatch ? '1.5px solid rgba(94, 39, 53, 0.2)' : '1px solid rgba(94, 39, 53, 0.1)',
                    borderRadius: '16px',
                    padding: '1.4rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem',
                    boxShadow: isMatch ? '0 8px 25px rgba(94, 39, 53, 0.08)' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setActiveProgFilter('All Retreats');
                    onNavigate('programmes');
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--redwood)', fontWeight: 800, letterSpacing: '0.1em' }}>
                      ✦ {prog.days}
                    </span>
                    {prog.popular && (
                      <span style={{ fontSize: '0.58rem', backgroundColor: 'var(--harvest-gold)', color: 'var(--wine)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 style={{color: 'var(--wine)', margin: 0, lineHeight: 1.2, fontSize: 'var(--fs-h3)', fontWeight: 700}}>
                    {prog.title}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
                    {prog.tagline}
                  </p>
                  <button className="btn-luxury" style={{ alignSelf: 'flex-start', padding: '0.45rem 1.1rem', fontSize: '0.68rem', marginTop: 'auto' }}>
                    Explore &rarr;
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 2: Comprehensive Care (Naturopathy-Style 12 Card Grid Layout) */}
      <section className="naturopathy-section-container luxury-clay" style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '3rem 5%' : '3.5rem 6%', backgroundColor: 'var(--sage)' }}>
        <Pattern28 style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 1.8rem auto' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>
              ✦ TARGETED CLINICAL INTERVENTIONS
            </span>
            <h2 style={{ color: 'var(--wine)', lineHeight: 1.18, margin: 0, fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 700 }}>
              Comprehensive <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>Clinical Spectrum</em>
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--wine)', opacity: 0.88, margin: '0.4rem 0 0 0', lineHeight: 1.5 }}>
              Click any of our 12 specialized clinical conditions to view doctor-supervised protocols, medical modalities, and treatment phases.
            </p>
          </div>

          {/* 12-Card Grid Layout (Matching Naturopathy Section) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1rem',
            alignItems: 'stretch'
          }}>
            {[
              {
                id: 'detoxification',
                number: '01',
                title: 'Detoxification & Renewal',
                category: '7 to 21 Days',
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                protocolTitle: 'Deep Cellular Cleansing & Bio-Metabolic Flush',
                fullDesc: 'A doctor-supervised drugless clinical protocol designed to cleanse liver, kidneys, colon, and lymphatic systems through evidence-based hydrotherapy, therapeutic mud baths, bio-fasting, and raw botanical infusions.',
                modalities: ['Hydrotherapy Cleansing', 'Therapeutic Mud Packs', 'Raw Juice Fasting', 'Kunjal Kriya', 'Lymphatic Grounding'],
                diagnostics: [
                  { name: 'Metabolic & Vitality Assessment', desc: 'Baseline evaluation of systemic toxic load, organ strain, and lymphatic flow.' },
                  { name: 'Doshic Toxicity Mapping', desc: 'Identifying Ama accumulation and organ-specific elimination blockages.' }
                ]
              },
              {
                id: 'diabetes-management',
                number: '02',
                title: 'Diabetes Management',
                category: '14 to 28 Days',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
                protocolTitle: 'Glycemic Re-education & Pancreatic Revitalization',
                fullDesc: 'Integrative glycemic management protocol focusing on reversing insulin resistance, regulating HbA1c, and rebuilding pancreatic vitality using targeted plant-based clinical nutrition, hydro-kinesiology, and specific yogic asanas.',
                modalities: ['Pancreatic Asana Series', 'Low-GI Satwik Nutrition', 'Herbal Hydro-Packs', 'Continuous Glucose Monitoring', 'Stress Cortisol Reset'],
                diagnostics: [
                  { name: 'Continuous Glucose Tracking', desc: 'Real-time glycemic monitoring correlated with dietary and exercise interventions.' },
                  { name: 'Iris Pancreatic Assessment', desc: 'Naturopathic iris assessment to evaluate cellular stress in pancreatic tissues.' }
                ]
              },
              {
                id: 'neurological-disorders',
                number: '03',
                title: 'Neurological Disorders',
                category: '14 to 21 Days',
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
                protocolTitle: 'Neuro-Regenerative Rest & Shirodhara Rejuvenation',
                fullDesc: 'Specialized neurological rehabilitation protocol targeting Parkinson\'s support, neuropathies, insomnia, and chronic anxiety through rhythmic warm oil Shirodhara, cranial grounding, and deep autonomic nervous system reset.',
                modalities: ['Continuous Shirodhara', 'Cranial Grounding', 'Nadi Shodhana Pranayama', 'Neuro-Nutritional Therapy', 'Circadian Rhythm Reset'],
                diagnostics: [
                  { name: 'Autonomic Tone Evaluation', desc: 'Measuring sympathetic vs. parasympathetic balance and sleep architecture.' },
                  { name: 'Neural Stress Profiling', desc: 'Mapping nerve inflammation and stress-induced motor/sensory hypersensitivity.' }
                ]
              },
              {
                id: 'liver-diseases',
                number: '04',
                title: 'Liver Health & Hepatic Care',
                category: '10 to 21 Days',
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
                protocolTitle: 'Hepatic Regeneration & Biliary Flush',
                fullDesc: 'Intensive hepatic restoration program designed to reduce liver inflammation, resolve non-alcoholic fatty liver (NAFLD), and optimize bile secretion through abdominal mud packs, hydro-poultices, and enzyme-rich botanical nutrition.',
                modalities: ['Abdominal Mud Compresses', 'Cold Hepatic Packs', 'Enzyme Juice Protocols', 'Castor Oil Packs', 'Gentle Liver Yoga'],
                diagnostics: [
                  { name: 'Hepatic Enzyme & Bile Screening', desc: 'Evaluating liver transaminases, bilirubin clearance, and digestive fire (Agni).' },
                  { name: 'Visceral Palpation', desc: 'Doctor-led physical abdominal mapping for liver enlargement and congestion.' }
                ]
              }
            ].map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedDiseaseModal(card)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 18px rgba(94, 39, 53, 0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Cover Image */}
                <div style={{ height: isMobile ? '95px' : '115px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(28,20,16,0.65) 100%)' }} />
                  
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    backgroundColor: 'rgba(28, 20, 16, 0.75)',
                    color: 'var(--harvest-gold)',
                    fontSize: '0.52rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(220,160,50,0.25)'
                  }}>
                    ✦ {card.category}
                  </span>

                  <span style={{
                    position: 'absolute', bottom: '6px', right: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    opacity: 0.85
                  }}>
                    {card.number}
                  </span>
                </div>

                {/* Card Title */}
                <div style={{ padding: '0.8rem 0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#ffffff', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '0.96rem', fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explore All 12 Clinical Conditions Button */}
          <div style={{ textAlign: 'center', marginTop: '2.2rem' }}>
            <button 
              onClick={() => onNavigate('comprehensivecare')}
              className="btn-luxury"
              style={{ padding: '0.85rem 2.4rem', fontSize: '0.8rem' }}
            >
              Explore All 12 Clinical Conditions &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* Section 3: Guided by Experts */}
      <section style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', padding: '3.2rem 4%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>
              <Star size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Leadership &amp; Clinical Authority
            </span>
            <h2 style={{color: 'var(--wine)', margin: 0, fontWeight: 700}}>
              Guided by Founders <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>&amp; Clinical Experts</em>
            </h2>
          </div>

          <div className="experts-carousel-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.9rem', width: '100%' }}>
            {[
              { name: 'Dr. Sunil Jayaraj', role: 'Founder', creds: 'Suprada Wellness', img: '/assets/Founders/sunil_jayaraj.jpg' },
              { name: 'Dr. Prema Ramadas', role: 'Co-founder', creds: 'Suprada Wellness', img: '/assets/Founders/prema_ramadas.jpg' },
              { name: 'Srinivas Ramadas', role: 'Director Operations', creds: 'Suprada Wellness', img: '/assets/Founders/srinivas_ramadas.jpg' },
              { name: 'Nagaraju', role: 'Chairman', creds: 'Suprada Wellness', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' },
              { name: 'Dr. Vinaya, B.N.Y.S', role: 'Chief Medical Officer', creds: 'Suprada Wellness', img: '/assets/Founders/vinaya.jpg' }
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



      {/* Section 5: Discover Your Wellness Path (Instant Diagnostic Assessment) */}
      <section style={{ backgroundColor: 'var(--antique-white)', padding: '4.2rem 5%', position: 'relative', overflow: 'hidden' }}>
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

      {/* Section 6: Guest Stories */}
      <section style={{ backgroundColor: 'var(--isabelline)', color: 'var(--wine)', padding: '3.2rem 5%', position: 'relative', overflow: 'hidden' }}>
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

      {/* Section 7: Begin Your Healing Journey */}
      <section style={{ backgroundColor: 'var(--tan)', color: 'var(--wine)', padding: '3.8rem 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '600px', width: '100%', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,86,69,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 800 }}>
            ✦ Your Transformation Awaits
          </span>

          <h2 style={{color: 'var(--wine)', lineHeight: 1.15, margin: 0, fontWeight: 700}}>
            The Sacred Sanctuary Gateway
          </h2>

          <p style={{ color: 'var(--raisin-black)', opacity: 0.88, fontSize: '1rem', lineHeight: 1.7, fontWeight: 400, maxWidth: '640px', margin: 0 }}>
            Let the sacred Suvarnamukhi River and ancient drugless healing wisdom guide your body to perfect equilibrium.
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem', color: 'var(--wine)', borderColor: 'rgba(94,39,53,0.2)' }}>✦ 100% Drugless Naturopathy</div>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem', color: 'var(--wine)', borderColor: 'rgba(94,39,53,0.2)' }}>✦ 54 Riverfront Acres</div>
            <div className="glass-metric-capsule" style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem', color: 'var(--wine)', borderColor: 'rgba(94,39,53,0.2)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Stethoscope size={14} style={{ color: 'var(--redwood)' }} /> 24/7 Resident Doctors</div>
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
              style={{ background: 'none', border: '1.5px solid var(--wine)', color: 'var(--wine)', cursor: 'pointer', padding: '0.95rem 2.6rem', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, borderRadius: '50px', transition: 'all 0.3s ease' }}
              className="hover-gold"
            >
              Schedule Medical Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
