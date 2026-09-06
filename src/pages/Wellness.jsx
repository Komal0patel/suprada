import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, HeartPulse, Stethoscope, Compass, Activity, 
  ShieldCheck, Sun, Leaf, ChevronLeft, ChevronRight, Calendar, Phone, 
  Mail, CheckCircle, Clock, CheckCircle2 
} from 'lucide-react';

function TypewriterQuote({ text = "“Wellness is not the absence of illness, but the discovery of harmony.”", speed = 35 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [hasStarted, text, speed]);

  return (
    <motion.p
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: false }}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
        fontStyle: 'italic',
        color: 'var(--isabelline)',
        lineHeight: 1.5,
        margin: 0,
        position: 'relative',
        zIndex: 2,
        minHeight: '2.2em'
      }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.85em',
          backgroundColor: 'var(--tan)',
          marginLeft: '4px',
          verticalAlign: 'middle',
          boxShadow: '0 0 6px rgba(230, 211, 192, 0.6)'
        }}
      />
    </motion.p>
  );
}

// 5-Step Process with matching locally saved images
const processSteps = [
  {
    step: 'STEP 1',
    title: 'Comprehensive Assessment',
    desc: 'Our team of experts performs a detailed evaluation of your health, emphasizing body diagnostics, blood analysis, exercise habits, diet, sleep, and stress levels.',
    image: '/assets/wellness/step-1-assessment.jpg'
  },
  {
    step: 'STEP 2',
    title: 'Imbalance Identification',
    desc: 'Through careful clinical observation, our doctors, nutritionists, and therapists collaborate to pinpoint the underlying imbalances at the root of your concerns.',
    image: '/assets/wellness/step-2-imbalance.jpg'
  },
  {
    step: 'STEP 3',
    title: 'Personalised For You',
    desc: 'We develop a tailored protocol incorporating Naturopathy, Yogic Sciences, Nutrition, Physiotherapy, Acupuncture, and drugless natural therapies.',
    image: '/assets/wellness/step-3-personalised.jpg'
  },
  {
    step: 'STEP 4',
    title: 'Guided Therapies',
    desc: 'Engage in guided daily treatments, hydrotherapy, mud baths, and movement sessions specifically aligned to your individualized formula.',
    image: '/assets/wellness/step-4-therapies.jpg'
  },
  {
    step: 'STEP 5',
    title: 'Ongoing Support',
    desc: 'Track continuous progress and refine your formula with regular physician consultations and customized long-term lifestyle guidance.',
    image: '/assets/wellness/step-5-support.jpg'
  }
];

// Curated Programs Showcase with matching locally saved images
const featuredPrograms = [
  {
    title: 'Rejuvenation Program',
    duration: 'Starting from 7 days',
    desc: 'Doctor consultation, Diet counselling, Daily Yoga & Meditation, Naturopathy treatments, Shirodhara, and Sound Healing sessions.',
    image: '/assets/wellness/program-rejuvenation.jpg',
    path: 'programmes/rejuvenation'
  },
  {
    title: 'Holistic Wellness Program',
    duration: 'Starting from 7 / 14 / 21 days',
    desc: 'Full wellness assessment, Daily Yoga, Pranayama, Meditation, Daily Naturopathy therapies, Shirodhara, and Group sound baths.',
    image: '/assets/wellness/program-holistic.jpg',
    path: 'programmes/holistic-wellness'
  },
  {
    title: 'Detox Program',
    duration: 'Starting from 5 days',
    desc: 'Full Body Analysis, Iris diagnosis, Massage and steam baths, Detox diet, fasting therapy, Hydrotherapy, and colon cleansing.',
    image: '/assets/wellness/program-detox.jpg',
    path: 'programmes/detox'
  },
  {
    title: 'Weekend Reset',
    duration: 'Starting from 2 / 3 days',
    desc: 'Consultation, 2 Naturopathy treatments per day, Group Sunrise Yoga, Tibetan singing bowls, and organic Satwik meals.',
    image: '/assets/wellness/program-weekend-reset.jpg',
    path: 'programmes/weekend-reset'
  }
];

const wellnessFormulaPills = [
  'Naturopathy',
  'Yoga & Meditation',
  'Physiotherapy',
  'Detox & Cleansing',
  'Holistic Therapies',
  'Nutrition & Lifestyle',
  'Mental Well-Being',
  'Acupuncture'
];

export default function Wellness({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({
    programme: 'Choose a programme',
    roomType: 'Choose a room type',
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [bookingModalSubmitted, setBookingModalSubmitted] = useState(false);

  const openBookingModal = (progTitle = 'Choose a programme') => {
    setBookingModalData(prev => ({
      ...prev,
      programme: progTitle
    }));
    setBookingModalSubmitted(false);
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingModalOpen]);

  const prevStep = () => {
    setActiveStep(prev => (prev === 0 ? processSteps.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setActiveStep(prev => (prev === processSteps.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      nextStep();
    } else if (info.offset.x > swipeThreshold) {
      prevStep();
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* 1. BRAND HERO SECTION (Warm Champagne Linen Theme - Full Viewport Fit) */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(5.5rem, 12vh, 7.5rem) 5% clamp(2.5rem, 5vh, 3.5rem)',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Leaf SVG Watermark Overlays in Wine */}
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-15px', left: '-30px', width: 'clamp(140px, 20vw, 220px)', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-15px', right: '-30px', width: 'clamp(140px, 20vw, 220px)', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Ambient Wine Bokeh Glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        {/* Background Rotating Mandala */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(190px, 55vw, 440px)', height: 'clamp(190px, 55vw, 440px)',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        {/* Center Content */}
        <div style={{
          maxWidth: '750px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Suprada Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ marginBottom: '0.7rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: 'clamp(44px, 5vw, 55px)', width: 'auto', filter: 'drop-shadow(0 3px 10px rgba(94, 39, 53, 0.12))' }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span style={{
              color: 'var(--redwood)',
              fontSize: 'clamp(0.68rem, 1.5vw, 0.74rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '0.4rem'
            }}>
              ✦ Holistic Wellness Sanctuary ✦
            </span>

            <motion.h1
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } }
              }}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-hero)',
                fontWeight: 700,
                color: 'var(--wine)', 
                margin: '0', 
                lineHeight: 1.15, 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '0.55rem', 
                flexWrap: 'wrap'
              }}
            >
              {["Wellness", "Programs"].map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { scale: 0.6, opacity: 0, filter: 'blur(4px)' },
                    visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                color: 'var(--raisin-black)',
                maxWidth: '600px',
                margin: '0.8rem auto 0',
                fontSize: 'var(--fs-body)',
                lineHeight: 1.6,
                fontWeight: 400
              }}
            >
              Immerse yourself in personalized natural therapies, yogic sciences, and elemental balance crafted to restore your body and soul.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR APPROACH SECTION (Clean Linen Theme) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.5rem, 5vh, 3.2rem) 5%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Section Header Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '1.8rem' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--wine)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.95rem',
              borderRadius: '50px',
              marginBottom: '0.5rem',
              border: '1px solid rgba(94, 39, 53, 0.18)',
              boxShadow: '0 2px 5px rgba(94, 39, 53, 0.04)'
            }}>
              <Leaf size={12} style={{ color: 'var(--wine)' }} /> OUR APPROACH
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Rooted in Nature, <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Designed for You</span>
            </h2>
          </motion.div>

          {/* 2-Column Content Layout with Sliding Animation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'center'
          }}>
            
            {/* Left Column Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '0.8rem'
              }}>
                At Suprada, our journey begins by listening — understanding your story, health challenges, and emotional rhythms.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '1rem'
              }}>
                We observe, analyze, and connect the dots between your inner balance and the natural elements that surround you.
              </p>

              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h4)',
                fontWeight: 700,
                color: 'var(--wine)',
                marginBottom: '0.25rem'
              }}>
                Our philosophy is simple yet profound:
              </h4>

              <p style={{
                fontSize: 'var(--fs-body)',
                fontStyle: 'italic',
                color: 'var(--redwood)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                The same elements that shape nature — shape us.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '1.4rem'
              }}>
                By reconnecting with nature's intelligence, we craft your individualized <strong style={{ color: 'var(--wine)', fontWeight: 700 }}>WELLNESS FORMULA</strong> — a harmonious prescription for your body's unique needs.
              </p>

              <motion.button
                onClick={() => onNavigate('contact')}
                className="btn-luxury"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
              >
                Begin Your Journey <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Right Column Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 28px rgba(94, 39, 53, 0.08)',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  width: '100%',
                  maxHeight: '300px'
                }}
              >
                <img
                  src="/assets/wellness/private-courtyard.webp"
                  alt="Nature-inspired wellness at Suprada"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SACRED SHANTI MANTRA SECTION (Warm Silk Linen Background & Pearl Card) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2rem, 4vh, 2.6rem) 5%',
        background: 'linear-gradient(135deg, #f0e6d6 0%, #e8dcbe 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-25px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.8rem)',
              textAlign: 'center',
              overflow: 'hidden',
              boxShadow: '0 10px 28px rgba(94, 39, 53, 0.07)',
              border: '1.5px solid rgba(94, 39, 53, 0.12)'
            }}
          >
            {/* Subtle Brand Watermarks in Wine */}
            <Pattern24
              style={{
                position: 'absolute',
                top: '50%',
                left: '-15px',
                transform: 'translateY(-50%)',
                width: 'clamp(80px, 15vw, 130px)',
                height: 'auto',
                color: 'var(--wine)',
                opacity: 0.07,
                pointerEvents: 'none'
              }}
            />

            <Pattern25
              style={{
                position: 'absolute',
                top: '50%',
                right: '-15px',
                transform: 'translateY(-50%)',
                width: 'clamp(80px, 15vw, 130px)',
                height: 'auto',
                color: 'var(--wine)',
                opacity: 0.07,
                pointerEvents: 'none'
              }}
            />

            {/* Inner Content */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '580px', margin: '0 auto' }}>
              
              {/* Card Title */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.05rem, 1.4vw, 1.22rem)',
                color: 'var(--wine)',
                fontWeight: 700,
                marginBottom: '0.8rem',
                letterSpacing: '0.02em'
              }}>
                The Mantra That Inspires Our Approach
              </h3>

              {/* Sanskrit Text in Wine & Charcoal */}
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.02rem, 3vw, 1.32rem)',
                color: 'var(--raisin-black)',
                lineHeight: 1.6,
                fontWeight: 700,
                marginBottom: '0.8rem'
              }}>
                ॐ पूर्णमदः पूर्णमिदम् पूर्णात् पूर्णमुदच्यते ।<br />
                पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥<br />
                ॐ शान्तिः शान्तिः शान्तिः ॥
              </div>

              {/* Transliteration */}
              <p style={{
                fontSize: 'clamp(0.74rem, 1.8vw, 0.8rem)',
                fontStyle: 'italic',
                color: 'var(--wine)',
                opacity: 0.85,
                lineHeight: 1.55,
                marginBottom: '0.8rem'
              }}>
                om pūrṇamadaḥ pūrṇamidam pūrṇāt pūrṇamudacyate .<br />
                pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate .<br />
                om śāntiḥ śāntiḥ śāntiḥ ..
              </p>

              {/* English Meaning */}
              <p style={{
                fontSize: 'clamp(0.72rem, 1.6vw, 0.78rem)',
                lineHeight: 1.6,
                color: 'var(--raisin-black)',
                opacity: 0.8,
                fontWeight: 400,
                margin: '0 auto'
              }}>
                That is Whole and this is Whole, the perfect has come out of the perfect; having taken the perfect from the perfect, only the perfect remains. Let there be Peace, Peace, Peace. (This shanti-sloka of the Isavasyopanishad indicates the relation of the individual's soul to the divine supreme spirit).
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DISCOVERY & WELLNESS FORMULA (Warm Linen Theme) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.5rem, 5vh, 3.2rem) 5%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Badge & Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '1.8rem' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--wine)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.95rem',
              borderRadius: '50px',
              marginBottom: '0.5rem',
              border: '1px solid rgba(94, 39, 53, 0.18)',
              boxShadow: '0 2px 5px rgba(94, 39, 53, 0.04)'
            }}>
              <Compass size={12} style={{ color: 'var(--wine)' }} /> DISCOVER
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Discover: <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Uncovering Your Inner Balance</span>
            </h2>
          </motion.div>

          {/* Part 1: 2-Column Overview (Text Left, Image Right) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'center',
            marginBottom: '2.2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '0.8rem'
              }}>
                Our holistic discovery process delves deep into your physical and emotional health. Through consultations and diagnostics, we explore how your body, diet, activity, sleep, and stress interplay.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9
              }}>
                Our multidisciplinary team — including doctors, nutritionists, counsellors, and therapists — collaboratively interprets these patterns to uncover the imbalances at the root of your concerns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 28px rgba(94, 39, 53, 0.08)',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  width: '100%',
                  maxHeight: '270px'
                }}
              >
                <img
                  src="/assets/more_images/wellness.png"
                  alt="Suprada Discovery & Holistic Assessment"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '270px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Part 2: Wellness Formula Badges & Deep Wine Quote Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.4rem, 2.5vw, 2rem)',
            alignItems: 'center'
          }}>
            {/* Left Column: Tan/Linen Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h4)',
                fontWeight: 700,
                color: 'var(--wine)',
                lineHeight: 1.35,
                marginBottom: '0.75rem'
              }}>
                From this, we create your personalized <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>WELLNESS FORMULA</span>:
              </h4>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {wellnessFormulaPills.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--tan)' }}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#FAF0E6',
                      border: '1px solid rgba(94, 39, 53, 0.18)',
                      color: 'var(--wine)',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      padding: '0.32rem 0.85rem',
                      borderRadius: '50px',
                      cursor: 'default',
                      boxShadow: '0 2px 5px rgba(94, 39, 53, 0.04)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Deep Royal Wine Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #5E2735 0%, #3D1420 100%)',
                borderRadius: '16px',
                padding: 'clamp(1.4rem, 2.5vw, 1.8rem) clamp(1.2rem, 2vw, 1.5rem)',
                border: '1.5px solid rgba(230, 211, 192, 0.25)',
                boxShadow: '0 10px 28px rgba(94, 39, 53, 0.2)',
                textAlign: 'center'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '0.35rem',
                  left: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  color: 'var(--tan)',
                  opacity: 0.35,
                  lineHeight: 1
                }}>“</span>

                <TypewriterQuote text="“Wellness is not the absence of illness, but the discovery of harmony.”" speed={35} />

                <span style={{
                  position: 'absolute',
                  bottom: '0.15rem',
                  right: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  color: 'var(--tan)',
                  opacity: 0.35,
                  lineHeight: 1
                }}>”</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 5-STEP PROCESS SLIDER (Touch & Drag Responsive Carousel) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2rem, 4vh, 2.5rem) 4%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.1rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--wine)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.28rem 0.85rem',
              borderRadius: '50px',
              marginBottom: '0.45rem',
              border: '1px solid rgba(94, 39, 53, 0.18)',
              boxShadow: '0 2px 5px rgba(94, 39, 53, 0.04)'
            }}>
              <Activity size={11} style={{ color: 'var(--wine)' }} /> OUR METHODOLOGY
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Your 5-Step <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Healing Journey</span>
            </h2>
          </div>

          {/* Step Selector Pills (Direct Navigation Tabs) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.35rem',
            flexWrap: 'wrap',
            marginBottom: '1.1rem'
          }}>
            {processSteps.map((stepItem, sIdx) => {
              const isActive = activeStep === sIdx;
              return (
                <button
                  key={sIdx}
                  onClick={() => setActiveStep(sIdx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.24rem 0.68rem',
                    borderRadius: '50px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'var(--wine)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--wine)',
                    border: isActive ? '1.2px solid var(--wine)' : '1px solid rgba(94, 39, 53, 0.2)',
                    boxShadow: isActive ? '0 2px 8px rgba(94, 39, 53, 0.18)' : '0 1px 4px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <span>{stepItem.step}</span>
                  {isActive && <span style={{ color: 'var(--tan)' }}>✦</span>}
                </button>
              );
            })}
          </div>

          {/* Non-Overlapping Interactive Carousel Container with Touch & Drag */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(94, 39, 53, 0.07)',
              border: '1.2px solid rgba(94, 39, 53, 0.14)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              minHeight: '230px',
              alignItems: 'stretch',
              cursor: 'grab',
              touchAction: 'pan-y'
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            
            {/* Left Side: Step Details & Book Now CTA */}
            <div style={{
              padding: 'clamp(1rem, 2.5vw, 1.3rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--isabelline)',
              position: 'relative',
              zIndex: 5
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <span style={{
                    backgroundColor: 'var(--wine)',
                    color: '#ffffff',
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    padding: '0.2rem 0.68rem',
                    borderRadius: '50px'
                  }}>
                    {processSteps[activeStep].step}
                  </span>

                  <span style={{ fontSize: '0.7rem', color: 'var(--redwood)', fontWeight: 700 }}>
                    Step {activeStep + 1} of {processSteps.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1rem, 1.4vw, 1.18rem)',
                      fontWeight: 700,
                      color: 'var(--wine)',
                      marginBottom: '0.35rem',
                      lineHeight: 1.2
                    }}>
                      {processSteps[activeStep].title}
                    </h3>

                    <p style={{
                      fontSize: '0.78rem',
                      lineHeight: 1.5,
                      color: 'var(--raisin-black)',
                      opacity: 0.88,
                      marginBottom: '0.75rem'
                    }}>
                      {processSteps[activeStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Actions: Book Now CTA + Prev/Next Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                paddingTop: '0.55rem',
                borderTop: '1px solid rgba(94, 39, 53, 0.1)'
              }}>
                <motion.button
                  onClick={() => openBookingModal(processSteps[activeStep].title)}
                  className="btn-luxury"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.72rem' }}
                >
                  Book Now <ArrowRight size={12} />
                </motion.button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    onClick={prevStep}
                    aria-label="Previous Step"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--tan)',
                      color: 'var(--wine)',
                      border: '1px solid rgba(94, 39, 53, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <button
                    onClick={nextStep}
                    aria-label="Next Step"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--tan)',
                      color: 'var(--wine)',
                      border: '1px solid rgba(94, 39, 53, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: High-Resolution Visual */}
            <div style={{ position: 'relative', minHeight: '190px', maxHeight: '240px', overflow: 'hidden', backgroundColor: 'var(--raisin-black)' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                />
              </AnimatePresence>

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(40, 38, 37, 0.25) 0%, transparent 50%)',
                pointerEvents: 'none'
              }} />
            </div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CURATED PROGRAMS SHOWCASE */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.5rem, 5vh, 3.2rem) 5%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Header Area */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              color: 'var(--wine)',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.95rem',
              borderRadius: '50px',
              marginBottom: '0.55rem',
              border: '1px solid rgba(94, 39, 53, 0.18)',
              boxShadow: '0 2px 5px rgba(94, 39, 53, 0.04)'
            }}>
              <Compass size={12} style={{ color: 'var(--wine)' }} /> PROGRAMS
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2,
              marginBottom: '0.6rem'
            }}>
              Discover the Right Path <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>for Your Well-Being</span>
            </h2>

            <p style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 1.65,
              color: 'var(--raisin-black)',
              opacity: 0.88,
              fontWeight: 500,
              margin: '0 auto'
            }}>
              At Suprada, every journey begins with understanding your body, your imbalances, and your goals. Explore programs designed to support you at every stage of your wellness journey.
            </p>
          </div>

          {/* Program Cards Grid */}
          <div
            className="program-cards-scroll-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.3rem)'
            }}
          >
            {featuredPrograms.map((prog, pIdx) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: pIdx * 0.06 }}
                className="program-card-item"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(94, 39, 53, 0.05)'
                }}
                whileHover={{ y: -4, borderColor: 'var(--wine)', boxShadow: '0 12px 28px rgba(94, 39, 53, 0.1)' }}
              >
                {/* Card Top Image */}
                <div style={{ position: 'relative', height: '145px', overflow: 'hidden' }}>
                  <img
                    src={prog.image}
                    alt={prog.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Duration Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '0.6rem',
                    left: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.22rem 0.6rem',
                    borderRadius: '50px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(94, 39, 53, 0.15)'
                  }}>
                    <span style={{
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--wine)'
                    }}>
                      ✦ {prog.duration}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.1rem 1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--wine)' }}>
                      {prog.title}
                    </h3>

                    <p style={{ fontSize: '0.82rem', lineHeight: 1.55, marginBottom: '1rem', color: 'var(--raisin-black)', opacity: 0.8 }}>
                      {prog.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.65rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <button
                      onClick={() => openBookingModal(prog.title)}
                      className="btn-luxury"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.74rem' }}
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => onNavigate(prog.path)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: 'var(--wine)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.3rem 0.2rem'
                      }}
                    >
                      Explore Program <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SALUTE THE SUN FEATURE */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.5rem, 5vh, 3.2rem) 5%',
        backgroundImage: 'linear-gradient(to right, rgba(40, 20, 26, 0.94), rgba(40, 20, 26, 0.8)), url("/assets/wellness/salute-sun.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.8rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span style={{
                color: 'var(--tan)',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.55rem',
                display: 'block'
              }}>
                ✦ Signature Morning Practice ✦
              </span>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h1)',
                color: 'var(--tan)',
                marginBottom: '0.75rem',
                lineHeight: 1.2
              }}>
                Salute the Sun
              </h2>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--isabelline)',
                opacity: 0.92,
                marginBottom: '1.2rem'
              }}>
                Ease into your day with mindful movement, breath, and nature immersion. Our yoga spaces by the sacred Suvarnamukhi river create a sensory-rich start to your healing journey.
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}>
                {[
                  'Nature baths & packs to enliven the body',
                  'Breath-led movement and grounding routines',
                  'Gentle sunlight, river soundscape, and awareness practice'
                ].map((point, pIdx) => (
                  <li key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', color: 'var(--isabelline)' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(230, 211, 192, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--tan)',
                      flexShrink: 0
                    }}>
                      <Sun size={11} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('programmes/packages')}
                className="btn-luxury"
                style={{
                  padding: '0.7rem 1.6rem',
                  fontSize: '0.8rem',
                  backgroundColor: 'var(--wine)',
                  color: 'var(--isabelline)',
                  borderColor: 'var(--tan)'
                }}
              >
                View Programs & Packages
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BOOK YOUR RETREAT MODAL POPUP (Fully Scrollable, Touch & Mobile Responsive) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div 
            className="booking-modal-overlay"
            onClick={() => setIsBookingModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.5rem, 2vw, 1.2rem)',
              backgroundColor: 'rgba(20, 10, 15, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div
              className="booking-modal-card custom-light-scrollbar"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                maxHeight: '88vh',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: 'clamp(1.2rem, 3vw, 1.6rem) clamp(1rem, 2.5vw, 1.4rem)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                border: '1.5px solid rgba(94, 39, 53, 0.2)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                color: 'var(--wine)',
                margin: 'auto'
              }}
            >
              {/* Close Button X */}
              <button
                onClick={() => setIsBookingModalOpen(false)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.1rem',
                  background: 'rgba(94, 39, 53, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ textAlign: 'center', marginBottom: '1rem', paddingRight: '1.5rem', paddingLeft: '0.5rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  margin: '0 0 0.25rem 0'
                }}>
                  Book Your Retreat
                </h2>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--redwood)',
                  margin: 0,
                  lineHeight: 1.35,
                  fontWeight: 500
                }}>
                  Begin your journey to wellness. Fill in the details below.
                </p>
              </div>

              {/* Form Content Outer Container */}
              <div style={{
                backgroundColor: 'var(--isabelline)',
                borderRadius: '14px',
                padding: '1rem 0.95rem',
                border: '1px solid rgba(94, 39, 53, 0.15)',
                marginBottom: '0.8rem'
              }}>
                {bookingModalSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1.2rem 0' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: 'rgba(94, 39, 53, 0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 0.7rem', color: 'var(--wine)'
                    }}>
                      <CheckCircle size={24} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine)', fontSize: '1.25rem', marginBottom: '0.3rem' }}>
                      Request Submitted!
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', lineHeight: 1.5 }}>
                      Thank you, <strong>{bookingModalData.name || 'Valued Guest'}</strong>. Our wellness advisors will contact you shortly to finalize your retreat details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (bookingModalData.programme === 'Choose a programme') {
                      alert('Please select a Programme before submitting.');
                      return;
                    }
                    if (bookingModalData.roomType === 'Choose a room type') {
                      alert('Please select a Room Type before submitting.');
                      return;
                    }
                    if (!bookingModalData.checkIn || !bookingModalData.checkOut) {
                      alert('Please select Check-In and Check-Out dates.');
                      return;
                    }
                    setBookingModalSubmitted(true);
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    
                    {/* Select Programme */}
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                        Select Programme *
                      </label>
                      <select
                        required
                        value={bookingModalData.programme}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, programme: e.target.value })}
                        style={{
                          width: '100%', padding: '0.55rem 0.7rem', borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.82rem', color: 'var(--raisin-black)', outline: 'none', fontWeight: 600, boxSizing: 'border-box'
                        }}
                      >
                        <option value="Choose a programme" disabled>Choose a programme</option>
                        <option value="Rejuvenation Program">Rejuvenation Program (7+ Days)</option>
                        <option value="Holistic Wellness Program">Holistic Wellness Program (7/14/21 Days)</option>
                        <option value="Detox Program">Detox & Cleansing Program (5 Days)</option>
                        <option value="Weekend Reset">Weekend Reset (2-3 Days)</option>
                        <option value="Advanced Healing Program">Advanced Healing Program (14/21 Days)</option>
                      </select>
                    </div>

                    {/* Select Room Type */}
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                        Select Room Type *
                      </label>
                      <select
                        required
                        value={bookingModalData.roomType}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, roomType: e.target.value })}
                        style={{
                          width: '100%', padding: '0.55rem 0.7rem', borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                          fontSize: '0.82rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                        }}
                      >
                        <option value="Choose a room type" disabled>Choose a room type</option>
                        <option value="Guha (Earth Sanctuary)">Guha (Earth Sanctuary)</option>
                        <option value="Samprapti (Serenity Suite)">Samprapti (Serenity Suite)</option>
                        <option value="Subhiksha (Heritage Cottage)">Subhiksha (Heritage Cottage)</option>
                      </select>
                    </div>

                    {/* Check-In Date & Check-Out Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                          Check-In Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkIn}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkIn: e.target.value })}
                          style={{
                            width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                            border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                            fontSize: '0.8rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                          Check-Out Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkOut}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkOut: e.target.value })}
                          style={{
                            width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                            border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                            fontSize: '0.8rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={bookingModalData.guests}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, guests: e.target.value })}
                        style={{
                          width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                          fontSize: '0.82rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Full Name & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={bookingModalData.name}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, name: e.target.value })}
                          style={{
                            width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                            border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                            fontSize: '0.8rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={bookingModalData.email}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, email: e.target.value })}
                          style={{
                            width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                            border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                            fontSize: '0.8rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 12345 67890"
                        value={bookingModalData.phone}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, phone: e.target.value })}
                        style={{
                          width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                          fontSize: '0.82rem', color: 'var(--raisin-black)', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Special Requests or Questions */}
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.2rem' }}>
                        Special Requests or Questions
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Any dietary requirements, health concerns..."
                        value={bookingModalData.notes}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, notes: e.target.value })}
                        style={{
                          width: '100%', padding: '0.5rem 0.6rem', borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)', backgroundColor: '#FFFFFF',
                          fontSize: '0.8rem', color: 'var(--raisin-black)', outline: 'none', resize: 'vertical', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-luxury"
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        fontSize: '0.82rem',
                        marginTop: '0.2rem'
                      }}
                    >
                      Submit Booking Request
                    </button>
                  </form>
                )}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setIsBookingModalOpen(false)}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  color: 'var(--wine)',
                  border: '1.5px solid rgba(94, 39, 53, 0.2)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
