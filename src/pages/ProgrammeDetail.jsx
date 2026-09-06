import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, HeartPulse, Leaf, Sun, Phone, Mail, CheckCircle, Compass } from 'lucide-react';

const programmeDataMap = {
  'weekend-reset': {
    title: 'Weekend Reset',
    subtitle: 'A 2-3 Day Riverfront Panchamahabhuta Sanctuary Recharge',
    duration: '2 / 3 Days',
    tag: 'EXPRESS RETREAT',
    image: '/assets/more_images/sound_healing.png',
    desc: 'Unplug from daily stress, digital overload, and urban fatigue with our curated weekend retreat on the banks of the sacred Suvarnamukhi river. Designed to restore clarity, re-energize your digestive fire (Agni), and soothe your nervous system through drugless natural medicine.',
    idealFor: 'Busy professionals, couples seeking serenity, and individuals needing a rapid mental and physical reset.',
    schedule: [
      { time: '06:30 AM', activity: 'Sunrise Panchamahabhuta Breathwork & Riverfront Yoga' },
      { time: '08:30 AM', activity: 'Satwik Organic Breakfast & Herbal Infusions' },
      { time: '10:30 AM', activity: 'Naturopathic Hydrotherapy & Mud Bath Therapy' },
      { time: '01:00 PM', activity: 'Mindful Farm-to-Table Therapeutic Lunch' },
      { time: '04:30 PM', activity: 'Tibetan Om Bowl Resonance & Sound Healing' },
      { time: '06:30 PM', activity: 'Evening Sunset Meditation & Trataka Light Therapy' },
      { time: '07:30 PM', activity: 'Light Nourishing Satwik Dinner' }
    ],
    inclusions: [
      'Doctor Wellness Consultation upon arrival',
      '2 Naturopathy treatments per day (Mud Bath / Hydrotherapy)',
      'Daily Group Sunrise Yoga & Breathwork sessions',
      'Acoustic Om & Singing Bowl Sound Healing',
      'Freshly cooked Satwik Organic meals (Breakfast, Lunch, Dinner)',
      'Luxury Eco-Cottage Stay with Riverfront View'
    ]
  },
  'rejuvenation': {
    title: 'Rejuvenation Program',
    subtitle: 'Deep Physical, Cellular & Mental Revitalization',
    duration: 'Starting from 7 Days',
    tag: 'SIGNATURE RECOVERY',
    image: '/assets/more_images/wellness.png',
    desc: 'Immerse yourself in authentic Naturopathic therapies and non-invasive diagnostic science. Tailored to replenish depleted energy reserves, balance cellular metabolism, nourish deep body tissues (Dhatus), and promote longevity.',
    idealFor: 'Individuals experiencing chronic fatigue, metabolic sluggishness, age-related vitality drop, or recovery after illness.',
    schedule: [
      { time: '06:00 AM', activity: 'Shatkarma Cleansing Kriyas & Dynamic Asanas' },
      { time: '08:00 AM', activity: 'Organic Vitality Juice & Herbal Elixir' },
      { time: '10:00 AM', activity: 'Deep Tissue Powder Vibrio & Herbal Steam Bath' },
      { time: '01:00 PM', activity: 'Personalized Naturopathic Diet & Millet Meals' },
      { time: '03:30 PM', activity: 'Shirodhara & Organic Mud Wrap Therapy' },
      { time: '05:30 PM', activity: 'Gentle Restorative Yoga & Acoustic Resonance' },
      { time: '07:30 PM', activity: 'Nourishing Warm Satwik Supper' }
    ],
    inclusions: [
      'Comprehensive Doctor Consultation & Iris Diagnosis',
      'Personalized Diet & Nutrition Counselling',
      'Daily Guided Yoga, Pranayama & Meditation',
      'Daily Naturopathy Treatments & Herbal Massages',
      'Shirodhara / Abhyanga / Udhwartana sessions',
      'Full Access to Riverfront Sanctuaries & Meditation Lawns'
    ]
  },
  'holistic-wellness': {
    title: 'Holistic Wellness Program',
    subtitle: 'Total Mind-Body Realignment & Metabolic Transformation',
    duration: '7 / 14 / 21 Days',
    tag: 'COMPLETE REALIGNMENT',
    image: '/assets/more_images/yoga-meditation.jpg',
    desc: 'A signature transformation protocol addressing the root causes of physical imbalance, emotional stress, and metabolic stagnation through integrated natural medicine, Iris diagnostics, and Satwik nutrition.',
    idealFor: 'Long-term wellness transformation, stress elimination, weight optimization, and immunity boosting.',
    schedule: [
      { time: '06:00 AM', activity: 'Pranayama, Bandhas & Sunrise Asana Flow' },
      { time: '08:00 AM', activity: 'Fresh Herbal Tea & Detoxifying Green Juice' },
      { time: '10:00 AM', activity: 'Full Body Hydrotherapy & Spinal Spray' },
      { time: '12:30 PM', activity: 'Satwik Farm-to-Table Therapeutic Lunch' },
      { time: '03:30 PM', activity: 'Acupuncture & Reflexology Balance Therapy' },
      { time: '05:30 PM', activity: 'Yoga Nidra & Emotional Release Meditation' },
      { time: '07:30 PM', activity: 'Custom Digestive Soup & Satwik Meal' }
    ],
    inclusions: [
      'Full Body Diagnostic & Iris Analysis Assessment',
      'Daily Customized Naturopathy & Hydrotherapy Protocols',
      'Daily Pranayama, Shatkarma Kriyas & Meditative Movement',
      'Shirodhara, Herbal Steam & Detox Body Wraps',
      'Mindfulness Counselling & Emotional Release Sessions',
      'Farm-to-Table Therapeutic Satwik Meals & Personal Home Plan'
    ]
  },
  'detox': {
    title: 'Detox & Cleansing Program',
    subtitle: 'Cellular Purification & Toxins (Ama) Elimination',
    duration: 'Starting from 5 Days',
    tag: 'CELLULAR CLEANSING',
    image: '/assets/more_images/nutrition.png',
    desc: 'Release accumulated metabolic waste and toxins through non-invasive naturopathic cleansing, therapeutic juice fasting, gentle hydrotherapy, and intestinal cleansing. Restores gut microbiome balance and digestive fire.',
    idealFor: 'Digestive sluggishness, bloating, skin dullness, weight management, and systemic toxicity.',
    schedule: [
      { time: '06:15 AM', activity: 'Kunjal Kriya & Digestive Cleansing Asanas' },
      { time: '08:15 AM', activity: 'Fresh Wheatgrass & Cold-Pressed Detox Elixir' },
      { time: '10:15 AM', activity: 'Full Body Mud Pack & Jacuzzi Hydrotherapy' },
      { time: '01:00 PM', activity: 'Raw Alkaline Salad & Enzymatic Juice Plan' },
      { time: '04:00 PM', activity: 'Gentle Colon Hydrotherapy / Herbal Enema Session' },
      { time: '06:00 PM', activity: 'Sound Healing & Deep Relaxation' },
      { time: '07:30 PM', activity: 'Light Cleansing Vegetable Broth' }
    ],
    inclusions: [
      'Full Body Diagnostic & Iris Analysis',
      'Therapeutic Fasting & Cold-Pressed Juice Protocol',
      'Hydrotherapy, Steam Baths & Herbal Packs',
      'Colon Hydrotherapy & Gentle Internal Cleansing',
      'Daily Yoga for Lymphatic Drainage & Digestion',
      'Post-Detox Re-entry Diet Plan & Guidance'
    ]
  },
  'advanced-healing': {
    title: 'Advanced Healing Program',
    subtitle: 'Clinical Naturopathic Care for Chronic & Lifestyle Conditions',
    duration: '14 / 21 Days',
    tag: 'CLINICAL CARE',
    image: '/assets/more_images/spa-interior.jpg',
    desc: 'Specialized clinical naturopathy designed for individuals dealing with chronic lifestyle conditions, joint degeneration, hypertension, type-2 diabetes management, or executive burnout.',
    idealFor: 'Chronic pain management, hypertension, metabolic reset, autoimmune support, and executive burnout.',
    schedule: [
      { time: '06:00 AM', activity: 'Therapeutic Movement & Joint Mobility Asanas' },
      { time: '08:00 AM', activity: 'Targeted Herbal Infusion & Satwik Breakfast' },
      { time: '10:00 AM', activity: 'Clinical Naturopathy Treatment & Acupuncture' },
      { time: '01:00 PM', activity: 'Medical Satwik Diet & Elimination Meal' },
      { time: '03:30 PM', activity: 'Magnet Therapy & Local Herbal Compress' },
      { time: '05:30 PM', activity: 'Guided Mind-Body Counselling & Meditation' },
      { time: '07:30 PM', activity: 'Restorative Satwik Supper & Doctor Check-in' }
    ],
    inclusions: [
      'Deep Clinical Evaluation & Physician Care',
      'Targeted Acupuncture, Magnet Therapy & Physiotherapy',
      'Daily Customized Naturopathic & Herbal Formulations',
      'Individualized Movement & Physiotherapy Exercises',
      'Strict Therapeutic & Elimination Diet Protocols',
      'Long-term Home Care & Lifestyle Maintenance Plan'
    ]
  }
};

export default function ProgrammeDetail({ progId, onNavigate }) {
  const data = programmeDataMap[progId] || programmeDataMap['rejuvenation'];
  
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({
    programme: data.title,
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

  const openModal = () => {
    setBookingModalData(prev => ({ ...prev, programme: data.title }));
    setBookingModalSubmitted(false);
    setIsBookingModalOpen(true);
  };

  React.useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingModalOpen]);

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION (Light Champagne Silk Theme — Full Viewport Fit) */}
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
        {/* Leaf SVG Watermarks in Wine */}
        <Pattern24 style={{ position: 'absolute', top: '-15px', left: '-30px', width: 'clamp(140px, 20vw, 220px)', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-15px', right: '-30px', width: 'clamp(140px, 20vw, 220px)', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

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
            width: 'clamp(260px, 38vw, 440px)', height: 'clamp(260px, 38vw, 440px)',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        {/* Center Content */}
        <div style={{
          maxWidth: '820px',
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
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
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
                border: '1px solid rgba(94, 39, 53, 0.18)'
              }}>
                <Clock size={12} /> {data.duration}
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--redwood)',
                backgroundColor: 'rgba(184, 86, 69, 0.08)',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.28rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid rgba(184, 86, 69, 0.2)'
              }}>
                ✦ {data.tag}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'var(--wine)',
                margin: '0 0 0.8rem 0',
                lineHeight: 1.15
              }}
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                color: 'var(--raisin-black)',
                maxWidth: '640px',
                margin: '0 auto 1.8rem auto',
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                fontWeight: 400
              }}
            >
              {data.subtitle}
            </motion.p>
          </motion.div>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={openModal}
              className="btn-luxury"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '0.7rem 1.6rem', fontSize: '0.8rem' }}
            >
              Book This Program <ArrowRight size={14} />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('programmes/packages')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.7rem 1.5rem',
                borderRadius: '50px',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--wine)',
                color: 'var(--wine)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(94, 39, 53, 0.06)' }}
              whileTap={{ scale: 0.97 }}
            >
              ← Back to All Programs
            </motion.button>
          </div>
        </div>
      </section>

      {/* OVERVIEW & INCLUSIONS SECTION */}
      <section style={{ padding: '6rem 6%', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}>
            
            {/* Overview Left */}
            <div>
              <span className="section-badge" style={{ marginBottom: '0.8rem', fontSize: 'var(--fs-small)' }}>
                ✦ Program Philosophy ✦
              </span>
              <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1.5rem', color: 'var(--wine)' }}>
                Overview &amp; Experience
              </h2>
              <p className="body-paragraph" style={{ fontSize: 'var(--fs-body)', lineHeight: 1.8, marginBottom: '1.8rem', color: 'var(--raisin-black)' }}>
                {data.desc}
              </p>

              <div style={{
                backgroundColor: 'rgba(94, 39, 53, 0.05)',
                borderLeft: '4px solid var(--wine)',
                padding: '1.4rem 1.6rem',
                borderRadius: '0 16px 16px 0',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h3)', color: 'var(--wine)', marginBottom: '0.4rem' }}>
                  Ideal For
                </h4>
                <p style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.65, margin: 0 }}>
                  {data.idealFor}
                </p>
              </div>

              {/* Doctor Supervision Box */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.8rem 1.6rem',
                border: '1.5px solid rgba(94,39,53,0.1)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.2rem',
                boxShadow: '0 10px 30px rgba(94,39,53,0.04)'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'rgba(234, 169, 54, 0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--wine)', flexShrink: 0
                }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--wine)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    Doctor-Supervised Natural Care
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black)', lineHeight: 1.6, margin: 0 }}>
                    Every treatment protocol is individually monitored and prescribed following your initial Iris diagnostic consultation with our resident Naturopathic physicians.
                  </p>
                </div>
              </div>
            </div>

            {/* Inclusions Right */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2.8rem 2.2rem',
              boxShadow: '0 15px 45px rgba(94,39,53,0.06)',
              border: '1.5px solid rgba(94,39,53,0.12)'
            }}>
              <span style={{
                color: 'var(--harvest-gold)',
                fontSize: 'var(--fs-small)',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.8rem'
              }}>
                ✦ RETREAT PACKAGES
              </span>

              <h3 className="card-heading" style={{ fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', color: 'var(--wine)' }}>
                What’s Included in Your Retreat
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {data.inclusions.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: 'var(--fs-body)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--harvest-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ color: 'var(--raisin-black)' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(94,39,53,0.1)' }}>
                <button
                  onClick={openModal}
                  className="btn-luxury"
                  style={{ width: '100%', padding: '1rem', fontSize: '0.88rem' }}
                >
                  Reserve Your Spot Now ✦
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DAILY ROUTINE & TIMELINE */}
      <section style={{ padding: '6rem 6%', backgroundColor: 'var(--isabelline)', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge" style={{ fontSize: 'var(--fs-small)' }}>
              ✦ A DAY AT SUPRADA ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', color: 'var(--wine)', marginTop: '0.5rem' }}>
              Sample Daily Healing Routine
            </h2>
            <p className="body-paragraph" style={{ fontSize: 'var(--fs-body)', maxWidth: '600px', margin: '0 auto' }}>
              A carefully structured daily rhythm designed to align your circadian cycle with nature's elements.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {data.schedule.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.2rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  border: '1px solid rgba(94,39,53,0.1)',
                  boxShadow: '0 4px 15px rgba(94,39,53,0.03)'
                }}
              >
                <div style={{
                  backgroundColor: 'rgba(94, 39, 53, 0.08)',
                  color: 'var(--wine)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em'
                }}>
                  {item.time}
                </div>
                <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--raisin-black)' }}>
                  {item.activity}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK YOUR RETREAT MODAL POPUP FOR PROGRAMME DETAILS */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div 
            className="booking-modal-overlay"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              className="booking-modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
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
                          border: '1px solid rgba(100, 40, 50, 0.3)', backgroundColor: '#EFE5D7',
                          fontSize: '0.88rem', color: '#5E2735', outline: 'none', fontWeight: 600, boxSizing: 'border-box'
                        }}
                      >
                        <option value="Choose a programme" disabled>Choose a programme</option>
                        <option value="Weekend Reset">Weekend Reset (2-3 Days)</option>
                        <option value="Rejuvenation Program">Rejuvenation Program (7+ Days)</option>
                        <option value="Holistic Wellness Program">Holistic Wellness Program (7/14/21 Days)</option>
                        <option value="Detox & Cleansing Program">Detox & Cleansing Program (5 Days)</option>
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
