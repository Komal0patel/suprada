import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Sparkles, ArrowRight, HeartPulse, Stethoscope, Compass, Activity, ShieldCheck, Sun, Leaf, ChevronLeft, ChevronRight, Calendar, Phone, Mail, CheckCircle } from 'lucide-react';

function TypewriterQuote({ text = "“Wellness is not the absence of illness, but the discovery of harmony.”", speed = 40 }) {
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
        fontSize: 'var(--fs-h3)',
        fontStyle: 'italic',
        color: 'var(--harvest-gold)',
        lineHeight: 1.6,
        margin: 0,
        position: 'relative',
        zIndex: 2,
        minHeight: '2.5em'
      }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          display: 'inline-block',
          width: '2.5px',
          height: '0.9em',
          backgroundColor: 'var(--harvest-gold)',
          marginLeft: '4px',
          verticalAlign: 'middle',
          boxShadow: '0 0 8px rgba(234, 169, 54, 0.8)'
        }}
      />
    </motion.p>
  );
}

const processSteps = [
  {
    step: 'STEP 1',
    title: 'Comprehensive Assessment',
    desc: 'Our team of experts will perform a detailed evaluation of your health, emphasizing body diagnostics and blood analysis, along with assessments of your exercise habits, diet, sleep patterns, and stress levels.',
    image: '/assets/more_images/wellness.png'
  },
  {
    step: 'STEP 2',
    title: 'Imbalance Identification',
    desc: 'Through careful observation and analysis, our team of doctors, nutritionists, therapists, and counsellors work together to pinpoint the underlying imbalances contributing to your health challenges.',
    image: '/assets/more_images/nutrition.png'
  },
  {
    step: 'STEP 3',
    title: 'Personalised For You',
    desc: 'Based on our comprehensive assessment, we develop a tailored plan incorporating Naturopathy, Yogic Sciences, Nutrition Sciences, Physiotherapy, Acupuncture, and other allied therapies.',
    image: '/assets/more_images/yoga-meditation.jpg'
  },
  {
    step: 'STEP 4',
    title: 'Guided Therapies',
    desc: 'Engage in guided therapies and movement sessions specifically aligned to your individualized wellness plan.',
    image: '/assets/more_images/sound_healing.png'
  },
  {
    step: 'STEP 5',
    title: 'Ongoing Support',
    desc: 'Track progress and continuously refine your wellness formula with ongoing physician support.',
    image: '/assets/more_images/retreat.png'
  }
];

const featuredPrograms = [
  {
    title: 'Rejuvenation Program',
    duration: 'Starting from 7 days',
    desc: 'Doctor consultation, Diet counselling, Daily Yoga and Meditation, Daily naturopathy treatments, Shirodhara / Udhwartana, sound healing sessions.',
    path: 'programmes/rejuvenation'
  },
  {
    title: 'Holistic Wellness Program',
    duration: 'Starting from 7 / 14 / 21 days',
    desc: 'Full wellness assessment, Daily Yoga, Pranayama, Meditation, Daily Naturopathy treatments, Shirodhara / Udhwartana, Group sound healing.',
    path: 'programmes/holistic-wellness'
  },
  {
    title: 'Detox Program',
    duration: 'Starting from 5 days',
    desc: 'Full Body Analysis, Iris diagnosis, Massage and steam baths, Detox diet, fasting therapy, Hydrotherapy, Colon hydrotherapy.',
    path: 'programmes/detox'
  },
  {
    title: 'Weekend Reset',
    duration: 'Starting from 2 / 3 days',
    desc: 'Consultation, 2 Naturopathy treatments per day, Group Yoga sessions, Group sound healing, Satwik meals.',
    path: 'programmes/weekend-reset'
  }
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

  const prevStep = () => {
    setActiveStep(prev => (prev === 0 ? processSteps.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setActiveStep(prev => (prev === processSteps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* 1. BRAND HERO SECTION (Full Screen - Uniform Brand Style) */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        maxHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 6%',
        backgroundColor: 'var(--antique-white)',
        color: 'var(--wine)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Ambient Wine & Gold Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '10%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 className="watermark-pattern" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="watermark-pattern" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Background Rotating Mandala Watermark */}
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

        {/* Center Content */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Suprada Official Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '90px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span style={{
              color: 'var(--harvest-gold)',
              fontSize: 'var(--fs-small)',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '1rem'
            }}>
              ✦ Holistic Wellness ✦
            </span>

            <motion.h1
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
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
                gap: '0.75rem', 
                flexWrap: 'wrap'
              }}
            >
              {["Wellness", "Programs"].map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { scale: 0.4, rotate: -12, opacity: 0, filter: 'blur(6px)' },
                    visible: { scale: [0.4, 1.05, 1], rotate: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
                  }}
                  style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
                >
                  {word === "Programs" ? <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Programs</em> : word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR APPROACH SECTION (2-Column Reference Layout) */}
      <section style={{
        padding: '6rem 6%',
        background: 'linear-gradient(180deg, #FAF5EE 0%, #F3EBDD 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Leaf SVG Watermarks */}
        <Pattern24 className="watermark-pattern" style={{ position: 'absolute', top: '10px', right: '-60px', width: '280px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="watermark-pattern" style={{ position: 'absolute', bottom: '10px', left: '-60px', width: '280px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Badge & Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#421a23',
              backgroundColor: 'var(--harvest-gold)',
              fontSize: 'var(--fs-small)',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.45rem 1.4rem',
              borderRadius: '50px',
              marginBottom: '1.2rem',
              boxShadow: '0 4px 15px rgba(234,169,54,0.25)'
            }}>
              <Leaf size={14} style={{ color: '#421a23' }} /> OUR APPROACH
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Rooted in Nature, <span style={{ color: 'var(--harvest-gold)', fontStyle: 'italic' }}>Designed for You</span>
            </h2>
          </div>

          {/* 2-Column Content Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            
            {/* Left Column Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'var(--raisin-black)',
                marginBottom: '1.2rem'
              }}>
                At Suprada, our journey begins by listening — understanding your story, health challenges, and emotional rhythms.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'var(--raisin-black)',
                marginBottom: '1.8rem'
              }}>
                We observe, analyze, and connect the dots between your inner balance and the natural elements that surround you.
              </p>

              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h4)',
                fontWeight: 700,
                color: 'var(--wine)',
                marginBottom: '0.4rem'
              }}>
                Our philosophy is simple yet profound:
              </h4>

              <p style={{
                fontSize: 'var(--fs-body)',
                fontStyle: 'italic',
                color: 'var(--redwood)',
                fontWeight: 600,
                marginBottom: '1.8rem'
              }}>
                The same elements that shape nature — shape us.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'var(--raisin-black)',
                marginBottom: '2.5rem'
              }}>
                By reconnecting with nature's intelligence, we craft your individualized <strong style={{ color: 'var(--wine)', fontWeight: 700 }}>WELLNESS FORMULA</strong> — a harmonious prescription for your body's unique needs.
              </p>

              <button
                onClick={() => onNavigate('contact')}
                className="btn-luxury"
                style={{ padding: '0.95rem 2.4rem', fontSize: '0.85rem' }}
              >
                Begin Your Journey <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Right Column Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(94, 39, 53, 0.15)',
                border: '3px solid rgba(234, 169, 54, 0.3)',
                width: '100%',
                maxHeight: '500px'
              }}>
                <img
                  src="/assets/more_images/wellness.png"
                  alt="Suprada Wellness Courtyard & Architecture"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. SACRED SHANTI MANTRA SECTION (Matching Reference Design) */}
      <section style={{
        padding: '5rem 6%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mantra-card-padding"
            style={{
              position: 'relative',
              background: 'linear-gradient(145deg, #471926 0%, #2e0e17 100%)',
              borderRadius: '28px',
              padding: '4.5rem 3.5rem',
              textAlign: 'center',
              overflow: 'hidden',
              boxShadow: '0 25px 55px rgba(71, 25, 38, 0.3)',
              border: '1px solid rgba(234, 169, 54, 0.3)'
            }}
          >
            {/* Flanking Glowing Gold Botanical Ornaments */}
            <Pattern24
              className="watermark-mantra-left"
              style={{
                position: 'absolute',
                top: '50%',
                left: '-25px',
                transform: 'translateY(-50%)',
                width: '240px',
                height: 'auto',
                color: 'var(--harvest-gold)',
                opacity: 0.9,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 14px rgba(234, 169, 54, 0.45))'
              }}
            />

            <Pattern25
              className="watermark-mantra-right"
              style={{
                position: 'absolute',
                top: '50%',
                right: '-25px',
                transform: 'translateY(-50%)',
                width: '240px',
                height: 'auto',
                color: 'var(--harvest-gold)',
                opacity: 0.9,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 14px rgba(234, 169, 54, 0.45))'
              }}
            />

            {/* Inner Content Container */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: '820px', margin: '0 auto' }}>
              
              {/* Card Title */}
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h2)',
                color: 'var(--harvest-gold)',
                fontWeight: 700,
                marginBottom: '2.2rem',
                textShadow: '0 2px 14px rgba(234, 169, 54, 0.35)'
              }}>
                The Mantra That Inspires Our Approach
              </h2>

              {/* Glowing Sanskrit Text */}
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h1)',
                color: 'var(--harvest-gold)',
                lineHeight: 1.7,
                fontWeight: 700,
                marginBottom: '1.8rem',
                textShadow: '0 0 16px rgba(234, 169, 54, 0.3)'
              }}>
                ॐ पूर्णमदः पूर्णमिदम् पूर्णात् पूर्णमुदच्यते ।<br />
                पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥<br />
                ॐ शान्तिः शान्तिः शान्तिः ॥
              </div>

              {/* Transliteration */}
              <p style={{
                fontSize: 'var(--fs-body)',
                fontStyle: 'italic',
                color: 'var(--harvest-gold)',
                opacity: 0.9,
                lineHeight: 1.7,
                marginBottom: '2.2rem'
              }}>
                om pūrṇamadaḥ pūrṇamidam pūrṇāt pūrṇamudacyate .<br />
                pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate .<br />
                om śāntiḥ śāntiḥ śāntiḥ ..
              </p>

              {/* English Meaning */}
              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 300,
                maxWidth: '740px',
                margin: '0 auto'
              }}>
                That is Whole and this is Whole, the perfect has come out of the perfect; having taken the perfect from the perfect, only the perfect remains. Let there be Peace, Peace, Peace. (This shanti-sloka of the Isavasyopanishad indicates the relation of the individual's soul to the divine supreme spirit).
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. DISCOVERY: UNCOVERING YOUR INNER BALANCE (Reference Layout) */}
      <section style={{
        padding: '6rem 6%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Watermark Leaves */}
        <Pattern24 className="watermark-pattern" style={{ position: 'absolute', top: '-10px', left: '-50px', width: '280px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="watermark-pattern" style={{ position: 'absolute', bottom: '-10px', right: '-50px', width: '280px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Part 1: Top Badge & Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#421a23',
              backgroundColor: 'var(--harvest-gold)',
              fontSize: 'var(--fs-small)',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.45rem 1.4rem',
              borderRadius: '50px',
              marginBottom: '1.2rem',
              boxShadow: '0 4px 15px rgba(234,169,54,0.25)'
            }}>
              <Compass size={14} style={{ color: '#421a23' }} /> DISCOVER
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Discover: <span style={{ color: 'var(--harvest-gold)', fontStyle: 'italic' }}>Uncovering Your Inner Balance</span>
            </h2>
          </div>

          {/* Part 1: 2-Column Overview (Text Left, Image Right) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'var(--raisin-black)',
                marginBottom: '1.4rem'
              }}>
                Our holistic discovery process delves deep into your physical and emotional health. Through consultations and diagnostics, we explore how your body, diet, activity, sleep, and stress interplay.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'var(--raisin-black)'
              }}>
                Our multidisciplinary team — including doctors, nutritionists, counsellors, and therapists — collaboratively interprets these patterns to uncover the imbalances at the root of your concerns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(94, 39, 53, 0.15)',
                border: '3px solid rgba(234, 169, 54, 0.3)',
                width: '100%',
                maxHeight: '400px'
              }}>
                <img
                  src="/assets/more_images/wellness.png"
                  alt="Suprada Discovery & Holistic Assessment"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Part 2: Wellness Formula Badges & Quote Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4.5rem'
          }}>
            {/* Left Column: Wellness Formula Badges */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h4)',
                fontWeight: 700,
                color: 'var(--wine)',
                lineHeight: 1.35,
                marginBottom: '1.5rem'
              }}>
                From this, we create your personalized <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>WELLNESS FORMULA</span>, integrating practices from:
              </h4>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {[
                  'Naturopathy',
                  'Yoga & Meditation',
                  'Physiotherapy',
                  'Detox & Cleansing',
                  'Holistic Therapies',
                  'Nutrition & Lifestyle',
                  'Mental & Emotional Well-Being',
                  'Holistic'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(234, 169, 54, 0.18)',
                      border: '1px solid rgba(220, 160, 50, 0.5)',
                      color: 'var(--wine)',
                      fontWeight: 700,
                      fontSize: 'var(--fs-small)',
                      padding: '0.55rem 1.3rem',
                      borderRadius: '50px',
                      boxShadow: '0 2px 8px rgba(94, 39, 53, 0.05)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Wine Quote Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                position: 'relative',
                background: 'linear-gradient(145deg, #4d1c29 0%, #35101a 100%)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                border: '2px solid var(--harvest-gold)',
                boxShadow: '0 18px 40px rgba(71, 25, 38, 0.25)',
                textAlign: 'center'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  color: 'var(--harvest-gold)',
                  opacity: 0.4,
                  lineHeight: 1
                }}>“</span>

                <TypewriterQuote text="“Wellness is not the absence of illness, but the discovery of harmony.”" speed={40} />

                <span style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  color: 'var(--harvest-gold)',
                  opacity: 0.4,
                  lineHeight: 1
                }}>”</span>
              </div>
            </motion.div>
          </div>

          {/* Part 3: Interactive Carousel / Process Step Slider Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 55px rgba(94, 39, 53, 0.2)',
              border: '2px solid rgba(234, 169, 54, 0.3)',
              minHeight: '480px',
              display: 'flex',
              alignItems: 'flex-end',
              background: '#2e0e17'
            }}
          >
            {/* Background Image with Fade Animation */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={processSteps[activeStep].image}
                alt={processSteps[activeStep].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </AnimatePresence>

            {/* Dark Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30, 10, 18, 0.75) 0%, rgba(30, 10, 18, 0.15) 60%)',
              pointerEvents: 'none'
            }} />

            {/* STEP Badge (Top Right) */}
            <div style={{ position: 'absolute', top: '1.8rem', right: '1.8rem', zIndex: 10 }}>
              <span style={{
                backgroundColor: '#5E2735',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                padding: '0.5rem 1.3rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                border: '1px solid rgba(234, 169, 54, 0.4)'
              }}>
                {processSteps[activeStep].step}
              </span>
            </div>

            {/* Previous Arrow Button */}
            <button
              onClick={prevStep}
              aria-label="Previous Step"
              style={{
                position: 'absolute',
                left: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--harvest-gold)',
                color: 'var(--wine)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                zIndex: 10,
                transition: 'transform 0.2s ease'
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={nextStep}
              aria-label="Next Step"
              style={{
                position: 'absolute',
                right: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--harvest-gold)',
                color: 'var(--wine)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                zIndex: 10,
                transition: 'transform 0.2s ease'
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Overlay Glass Card (Bottom Left) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="step-slider-card"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  margin: '2rem',
                  maxWidth: '440px',
                  backgroundColor: 'rgba(247, 238, 223, 0.92)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: '2.2rem 2rem',
                  border: '1px solid rgba(234, 169, 54, 0.4)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.25)'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h3)',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  marginBottom: '0.8rem'
                }}>
                  {processSteps[activeStep].title}
                </h3>

                <p style={{
                  fontSize: 'var(--fs-body)',
                  lineHeight: 1.75,
                  color: 'var(--raisin-black)',
                  marginBottom: '1.4rem'
                }}>
                  {processSteps[activeStep].desc}
                </p>

                <button
                  onClick={() => openBookingModal(processSteps[activeStep].title)}
                  className="btn-luxury"
                  style={{ padding: '0.75rem 1.8rem', fontSize: '0.82rem' }}
                >
                  Book Now <ArrowRight size={14} />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 5. CURATED PROGRAMS SHOWCASE */}
      <section style={{
        padding: '6rem 6%',
        background: 'linear-gradient(180deg, #FAF5EE 0%, #F4EBE0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Left Side Botanical Watermark Artwork */}
        <Pattern24 className="watermark-pattern" style={{
          position: 'absolute',
          top: '50%',
          left: '-80px',
          transform: 'translateY(-50%)',
          width: '380px',
          height: 'auto',
          color: 'var(--wine)',
          opacity: 0.08,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Header Area (Matching Reference Design - No Buttons) */}
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--harvest-gold)',
              color: '#421a23',
              fontSize: 'var(--fs-small)',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.45rem 1.4rem',
              borderRadius: '50px',
              marginBottom: '1.4rem',
              boxShadow: '0 4px 15px rgba(234,169,54,0.25)'
            }}>
              <Compass size={14} style={{ color: '#421a23' }} /> PROGRAMS
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.25,
              marginBottom: '1.5rem'
            }}>
              Discover the Right Path <span style={{ color: 'var(--harvest-gold)', fontStyle: 'italic' }}>for Your Well-Being</span>
            </h2>

            <p style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 1.75,
              color: 'var(--raisin-black)',
              fontWeight: 500,
              margin: '0 auto'
            }}>
              At Suprada, every journey begins with understanding your body, your imbalances, and your goals. Whether you’re seeking deep relaxation, detoxification, targeted healing, or long-term transformation, our curated programs guide you toward a balanced lifestyle. Explore programs designed to support you at every stage of your wellness journey.
            </p>
          </div>

          {/* Program Cards Grid (Horizontal scroll on mobile) */}
          <div
            className="program-cards-scroll-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '2rem'
            }}
          >
            {featuredPrograms.map((prog, pIdx) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                className="program-card-item"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '2.2rem 1.8rem',
                  border: '1.5px solid rgba(94,39,53,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 35px rgba(94,39,53,0.06)'
                }}
                whileHover={{ y: -6, borderColor: 'var(--wine)' }}
              >
                <div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 'var(--fs-small)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--redwood)',
                    backgroundColor: 'rgba(184,86,69,0.08)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px',
                    marginBottom: '1.2rem'
                  }}>
                    {prog.duration}
                  </span>

                  <h3 className="card-heading" style={{ fontSize: 'var(--fs-h3)', marginBottom: '1rem' }}>
                    {prog.title}
                  </h3>

                  <p className="body-paragraph" style={{ fontSize: 'var(--fs-body)', lineHeight: 1.65, marginBottom: '2rem' }}>
                    {prog.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <button
                    onClick={() => openBookingModal(prog.title)}
                    className="btn-luxury"
                    style={{ padding: '0.55rem 1.3rem', fontSize: '0.8rem' }}
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => onNavigate(prog.path)}
                    className="btn-luxury-text"
                    style={{ fontSize: '0.82rem' }}
                  >
                    Explore Program <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SALUTE THE SUN FEATURE */}
      <section style={{
        padding: '6rem 5%',
        backgroundImage: 'linear-gradient(to right, rgba(42, 14, 24, 0.9), rgba(42, 14, 24, 0.7)), url("/assets/more_images/yoga-meditation.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span style={{
                color: 'var(--harvest-gold)',
                fontSize: 'var(--fs-small)',
                fontWeight: 800,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'block'
              }}>
                ✦ Signature Morning Practice ✦
              </span>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h1)',
                color: 'var(--tan)',
                marginBottom: '1.2rem',
                lineHeight: 1.2
              }}>
                Salute the Sun
              </h2>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.75,
                color: 'rgba(230,211,192,0.9)',
                marginBottom: '2rem'
              }}>
                Ease into your day with mindful movement, breath, and nature immersion. Our yoga spaces by the sacred Suvarnamukhi river create a sensory-rich start to your healing journey.
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                {[
                  'Nature baths & packs to enliven the body',
                  'Breath-led movement and grounding routines',
                  'Gentle sunlight, river soundscape, and awareness practice'
                ].map((point, pIdx) => (
                  <li key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--tan)' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(234,169,54,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--harvest-gold)',
                      flexShrink: 0
                    }}>
                      <Sun size={12} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('programmes')}
                className="btn-luxury"
                style={{ padding: '0.9rem 2.2rem' }}
              >
                View Programs & Packages
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOK YOUR RETREAT MODAL POPUP */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="booking-modal-overlay">
            <motion.div
              className="booking-modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button X */}
              <button
                onClick={() => setIsBookingModalOpen(false)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.4rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#652331',
                  cursor: 'pointer',
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                  zIndex: 10
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.7}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.4rem', paddingRight: '1rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: '#652331',
                  margin: '0 0 0.4rem 0'
                }}>
                  Book Your Retreat
                </h2>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#8A4334',
                  margin: 0,
                  lineHeight: 1.45,
                  fontWeight: 500
                }}>
                  Begin your journey to wellness. Fill in the details below and we'll get back to you shortly.
                </p>
              </div>

              {/* Form Content Outer Container */}
              <div style={{
                backgroundColor: 'rgba(238, 226, 212, 0.85)',
                borderRadius: '16px',
                padding: '1.4rem 1.2rem',
                border: '1px solid rgba(180, 140, 100, 0.3)',
                marginBottom: '1rem'
              }}>
                {bookingModalSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{
                      width: '54px', height: '54px', borderRadius: '50%',
                      backgroundColor: 'rgba(234, 169, 54, 0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1rem', color: 'var(--wine)'
                    }}>
                      <CheckCircle size={30} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      Request Submitted!
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black)', lineHeight: 1.6 }}>
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
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    
                    {/* Select Programme */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                        Select Programme *
                      </label>
                      <select
                        required
                        value={bookingModalData.programme}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, programme: e.target.value })}
                        style={{
                          width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px',
                          border: bookingModalData.programme === 'Choose a programme' ? '1.5px solid #EAA936' : '1px solid rgba(100, 40, 50, 0.3)',
                          backgroundColor: '#EFE5D7',
                          fontSize: '0.88rem', color: '#5E2735', outline: 'none', fontWeight: 600, boxSizing: 'border-box'
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
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                        Select Room Type *
                      </label>
                      <select
                        required
                        value={bookingModalData.roomType}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, roomType: e.target.value })}
                        style={{
                          width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px',
                          border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                          fontSize: '0.88rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                        }}
                      >
                        <option value="Choose a room type" disabled>Choose a room type</option>
                        <option value="Guha (Earth Sanctuary)">Guha (Earth Sanctuary)</option>
                        <option value="Samprapti (Serenity Suite)">Samprapti (Serenity Suite)</option>
                        <option value="Subhiksha (Heritage Cottage)">Subhiksha (Heritage Cottage)</option>
                      </select>
                    </div>

                    {/* Check-In Date & Check-Out Date */}
                    <div className="booking-form-grid-2col">
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                          Check-In Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkIn}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkIn: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                            border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                            fontSize: '0.85rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                          Check-Out Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkOut}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkOut: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                            border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                            fontSize: '0.85rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
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
                          width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                          border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                          fontSize: '0.88rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Full Name & Email */}
                    <div className="booking-form-grid-2col">
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={bookingModalData.name}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, name: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                            border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                            fontSize: '0.85rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={bookingModalData.email}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, email: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                            border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                            fontSize: '0.85rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 12345 67890"
                        value={bookingModalData.phone}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, phone: e.target.value })}
                        style={{
                          width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                          border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                          fontSize: '0.88rem', color: '#5E2735', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Special Requests or Questions */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#652331', display: 'block', marginBottom: '0.35rem' }}>
                        Special Requests or Questions
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Any dietary requirements, health concerns, or special requests..."
                        value={bookingModalData.notes}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, notes: e.target.value })}
                        style={{
                          width: '100%', padding: '0.7rem 0.8rem', borderRadius: '10px',
                          border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                          fontSize: '0.85rem', color: '#5E2735', outline: 'none', resize: 'vertical', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '12px',
                        backgroundColor: '#EAA936',
                        color: '#421a23',
                        border: 'none',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginTop: '0.4rem',
                        boxShadow: '0 4px 14px rgba(234, 169, 54, 0.35)'
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
                  padding: '0.85rem',
                  borderRadius: '12px',
                  backgroundColor: '#EAA936',
                  color: '#421a23',
                  border: 'none',
                  fontSize: '0.92rem',
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
