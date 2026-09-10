import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, 
  ShieldCheck, HeartPulse, Leaf, Sun, Moon, Flower2, Heart, User, 
  Activity, Droplets, Sunrise, Check, Phone, Mail, CheckCircle, Compass, X
} from 'lucide-react';

const programmeDataMap = {
  'rejuvenation': {
    title: 'Rejuvenation Program',
    subtitle: '5 Days of Renewal & Vitality',
    progKey: 'rejuvenation',
    aboutTitle: 'About Rejuvenation',
    aboutParas: [
      'In the fast-paced rhythm of modern life, our vital energies often become depleted. Our 5-day Rejuvenation Program is meticulously designed to pause time, replenish your reserves, and restore your natural radiance.',
      'Through a synergistic blend of Nutritional therapies, restorative yoga, and nutrient-dense nutrition, we invite you to peel away layers of fatigue and emerge revitalized, with a renewed sense of purpose and vigor.'
    ],
    image: '/assets/programmes/rejuvenation-prog.jpg',
    expTitle: 'The Experience',
    expSubtitle: 'A holistic approach to restoring youthfulness and vitality.',
    tabs: [
      {
        id: 'inclusions',
        label: 'Inclusions',
        icon: Leaf,
        type: 'two-col',
        col1: {
          title: 'Therapies & Consultations',
          icon: Sparkles,
          items: [
            'Initial & Final Doctor Consultation',
            'Personalized Diet Counselling',
            'Daily Naturopathy Treatments',
            'Shirodhara / Udhwartana Therapy',
            'Group Sound Healing Sessions'
          ]
        },
        col2: {
          title: 'Wellness & Lifestyle',
          icon: Moon,
          items: [
            'Daily Morning Yoga & Meditation',
            'Nutritious Satwik Meals',
            'Herbal Detox Teas',
            'Post-Program Lifestyle Guidance',
            'Access to Wellness Facilities'
          ]
        }
      },
      {
        id: 'schedule',
        label: 'Daily Rhythm',
        icon: Sun,
        type: 'timeline',
        items: [
          { time: '06:30 AM', title: 'Morning Rituals', desc: 'Wake up to herbal tea and gentle cleansing' },
          { time: '07:00 AM', title: 'Yoga & Pranayama', desc: 'Invigorating sunrise session to awaken the body' },
          { time: '10:30 AM', title: 'Therapeutic Treatments', desc: 'Scheduled rejuvenation therapies (Massage/Hydrotherapy)' },
          { time: '04:00 PM', title: 'Evening Wellness', desc: 'Meditation, Sound Healing, or Nature Walk' }
        ]
      }
    ],
    investmentTitle: 'Investment in Yourself',
    rooms: [
      { type: 'Standard Room', price: '₹ XX,000', sub: 'Per Person / 5 Days' },
      { type: 'Deluxe Room', price: '₹ XX,000', sub: 'Per Person / 5 Days', popular: 'Most Popular' },
      { type: 'Premium Cottage', price: '₹ XX,000', sub: 'Per Person / 5 Days' }
    ],
    ctaBtn: 'Book Your Retreat Now',
    prevProg: { id: 'programmes/weekend-reset', name: 'Weekend Reset' },
    nextProg: { id: 'programmes/holistic-wellness', name: 'Holistic Wellness Program' }
  },

  'holistic-wellness': {
    title: 'Holistic Wellness Program',
    subtitle: '7 Days of Complete Balance',
    progKey: 'holistic-therapies',
    aboutTitle: 'About Holistic Wellness',
    aboutParas: [
      'True wellness is not just the absence of conditions, but a state of vibrant balance across body, mind, and spirit. Our 7-day Holistic Wellness Program offers a comprehensive reset, integrating the best of ancient wisdom and modern diagnostics.',
      'Starting with a full wellness assessment including iris diagnosis, we curate a week of transformative practices—from daily yoga and meditation to specialized naturopathy treatments—guiding you back to your natural state of harmony.'
    ],
    image: '/assets/programmes/holistic-wellness-prog.jpg',
    expTitle: 'Integrative Healing',
    expSubtitle: 'A synergistic blend of therapies for total well-being.',
    tabs: [
      {
        id: 'therapies',
        label: 'Therapies',
        icon: Activity,
        type: 'two-col',
        col1: {
          title: 'Clinical & Bodywork',
          icon: Heart,
          items: [
            'Comprehensive Wellness Assessment',
            'Iris Diagnosis & Analysis',
            'Daily Naturopathy Treatments',
            'Shirodhara / Udhwartana Therapy',
            'Dietary Consultation'
          ]
        },
        col2: {
          title: 'Holistic Experiences',
          icon: Flower2,
          items: [
            'Satwik Nutrition Plan',
            'Herbal Detox Support',
            'Hydrotherapy Sessions',
            'Relaxation Therapies',
            'Access to Wellness Activities'
          ]
        }
      },
      {
        id: 'mindfulness',
        label: 'Mind-Body',
        icon: User,
        type: 'grid-cards',
        items: [
          { title: 'Morning Yoga', desc: 'Start the day with guided Asanas to awaken vitality and flexibility.' },
          { title: 'Meditation & Breathwork', desc: 'Pranayama and mindfulness sessions to calm the mind and center the spirit.' },
          { title: 'Sound Healing', desc: 'Immersive group sessions using vibrational therapy for deep relaxation.' }
        ]
      }
    ],
    investmentTitle: 'Your Journey to Wholeness',
    rooms: [
      { type: 'Standard Room', price: '₹ XX,000', sub: 'Per Person / 7 Days' },
      { type: 'Deluxe Room', price: '₹ XX,000', sub: 'Per Person / 7 Days', popular: 'Recommended' },
      { type: 'Premium Cottage', price: '₹ XX,000', sub: 'Per Person / 7 Days' }
    ],
    ctaBtn: 'Reserve Your Spot',
    prevProg: { id: 'programmes/rejuvenation', name: 'Rejuvenation Program' },
    nextProg: { id: 'programmes/advanced-healing', name: 'Advanced Healing Program' }
  },

  'detox': {
    title: 'Detox Program',
    subtitle: '7 / 14 / 21 Days of Deep Cleansing',
    progKey: 'detox-cleansing',
    aboutTitle: 'About Detox Program',
    aboutParas: [
      "In our modern world, toxins accumulate from environmental pollutants, processed foods, stress, and lifestyle factors. Our comprehensive detoxification programmes use time-tested authentic therapies protocols, therapeutic fasting, and natural cleansing methods to eliminate accumulated toxins, restore cellular health, and rejuvenate your entire system.",
      "Experience deep purification that goes beyond surface-level cleansing, addressing toxins at the cellular level while supporting your body's natural detoxification pathways. Choose from 7, 14, or 21-day intensive programs tailored to your needs."
    ],
    image: '/assets/programmes/detox-prog.jpg',
    expTitle: 'Complete Program Structure',
    expSubtitle: 'A comprehensive approach to deep cellular cleansing and renewal.',
    tabs: [
      {
        id: 'assessment',
        label: 'Assessment & Diagnosis',
        icon: Activity,
        type: 'two-col',
        col1: {
          title: 'Medical Assessment',
          icon: Activity,
          items: [
            'Full Body Analysis (Vitals, BMI, Metabolic Lab Tests)',
            'Iris Diagnosis (Before & After Program)',
            'Doctor Led Protocol & Daily Assessments',
            'Comprehensive Health Consultation'
          ]
        },
        col2: {
          title: 'Personalized Planning',
          icon: Sparkles,
          items: [
            'Customized Diet Plans Based on Assessment',
            'Therapeutic Fasting Protocols (As Prescribed)',
            'Follow-Up Diet Plans Post-Program',
            'Habit Building & Lifestyle Coaching'
          ]
        }
      },
      {
        id: 'therapies',
        label: 'Detox Therapies',
        icon: Droplets,
        type: 'two-col',
        col1: {
          title: 'Internal Cleansing',
          icon: Droplets,
          items: [
            'Colon Hydrotherapy (Scheduled Sessions)',
            'Hydrotherapy Treatments',
            'Massage & Steam Baths',
            'Shirodhara / Kizhi Therapies'
          ]
        },
        col2: {
          title: 'Detox Support',
          icon: Sparkles,
          items: [
            'Detox Diet & Nutritional Support',
            'Fasting Therapy (Guided & Monitored)',
            'Herbal Detox Formulations',
            'Exit Health Plan & Follow-Ups'
          ]
        }
      },
      {
        id: 'mindbody',
        label: 'Mind-Body Care',
        icon: Heart,
        type: 'two-col',
        col1: {
          title: 'Physical Movement',
          icon: Heart,
          items: [
            'Daily Yoga Therapy Sessions',
            'Condition-Specific Yoga (As Needed)',
            'Therapeutic Asanas for Detox',
            'Gentle Movement for Energy Flow'
          ]
        },
        col2: {
          title: 'Emotional & Mental',
          icon: Sparkles,
          items: [
            'Pranayama & Breathwork',
            'Meditation & Mindfulness',
            'Sound Healing Sessions',
            'Emotional Release & Healing',
            'Access to All Group Healing Experiences'
          ]
        }
      },
      {
        id: 'duration',
        label: 'Duration Options',
        icon: Clock,
        type: 'duration-cards',
        items: [
          { duration: '7 Days', intensity: 'Moderate', desc: 'Ideal for first-time detox seekers or those with limited time. Provides a solid foundation for cleansing and introduces detox principles.' },
          { duration: '14 Days', intensity: 'Comprehensive', desc: 'The recommended duration for most people. Allows deeper tissue cleansing and sustainable habit formation for lasting results.' },
          { duration: '21 Days', intensity: 'Intensive', desc: 'The most intensive program for serious health challenges or those seeking complete transformation. Achieves profound cellular renewal.' }
        ]
      }
    ],
    bannerTitle: 'Deep Cellular Renewal',
    bannerDesc: "Our Detox Program is not just a cleanse; it's a complete reset of your biological systems. By combining advanced diagnostic assessment with proven authentic therapies protocols, therapeutic fasting, and comprehensive mind-body care, we create the optimal conditions for your body to eliminate years of accumulated toxins and restore its natural state of vibrant health.",
    investmentTitle: 'Program Investment',
    rooms: [
      { type: 'Standard Room', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(Based on 7/14/21 Days)' },
      { type: 'Deluxe Room', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(Based on 7/14/21 Days)', popular: 'Most Popular' },
      { type: 'Premium Cottage', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(Based on 7/14/21 Days)' }
    ],
    ctaBtn: 'Book Your Detox Journey',
    linkCard: {
      title: 'Learn More About Our Therapies',
      desc: 'Explore the comprehensive range of detox and cleansing therapies included in this program.',
      btnText: 'View Detox Therapies',
      href: 'programmes/detox-cleansing'
    },
    prevProg: { id: 'programmes/rejuvenation', name: 'Rejuvenation Program' },
    nextProg: { id: 'programmes/advanced-healing', name: 'Advanced Healing Program' }
  },

  'weekend-reset': {
    title: 'Weekend Reset',
    subtitle: '2/3 Days of Quick Restoration',
    progKey: 'weekend-reset',
    aboutTitle: 'About Weekend Reset',
    aboutParas: [
      'Life moves fast, and sometimes you just need a pause to reset, recharge, and reconnect with yourself. Our Weekend Reset is designed for those who want to experience the benefits of wellness retreat without a long commitment—a perfect introduction to holistic healing or a quick recharge between busy weeks.',
      'In just 2-3 days, immerse yourself in therapeutic treatments, nourishing meals, and mindful practices that will leave you feeling refreshed, balanced, and ready to face the week ahead with renewed energy and clarity.'
    ],
    image: '/assets/programmes/weekend-reset-prog.jpg',
    expTitle: 'Your Weekend Experience',
    expSubtitle: 'A condensed yet comprehensive wellness immersion.',
    tabs: [
      {
        id: 'inclusions',
        label: "What's Included",
        icon: Flower2,
        type: 'two-col',
        col1: {
          title: 'Treatments & Consultation',
          icon: Sparkles,
          items: [
            'Initial Wellness Consultation',
            '2 Naturopathy Treatments Per Day',
            'Therapeutic Massages',
            'Hydrotherapy Sessions',
            'Access to Steam & Sauna'
          ]
        },
        col2: {
          title: 'Wellness Activities',
          icon: Heart,
          items: [
            'Group Yoga Sessions (Morning & Evening)',
            'Group Sound Healing Sessions',
            'Meditation & Breathwork',
            'Satwik Nutrition Meals',
            'Access to All Common Activities'
          ]
        }
      },
      {
        id: 'schedule',
        label: 'Sample Schedule',
        icon: Sunrise,
        type: 'schedule-grid',
        cols: [
          {
            dayTitle: 'Day 1 - Arrival & Reset',
            items: [
              { time: '2:00 PM', desc: 'Check-in & Welcome Consultation' },
              { time: '4:00 PM', desc: 'First Naturopathy Treatment' },
              { time: '6:00 PM', desc: 'Group Sound Healing' }
            ]
          },
          {
            dayTitle: 'Day 2 - Immersion',
            items: [
              { time: '7:00 AM', desc: 'Morning Yoga & Meditation' },
              { time: '10:30 AM', desc: 'Naturopathy Treatment' },
              { time: '4:00 PM', desc: 'Evening Treatment & Relaxation' }
            ]
          }
        ]
      }
    ],
    bannerTitle: 'Perfect for Busy Lifestyles',
    bannerDesc: "The Weekend Reset is your gateway to wellness. Whether you're new to holistic healing or simply need a quick recharge, this program introduces you to our comprehensive approach while fitting seamlessly into your busy schedule. Experience the Suprada difference in just a weekend.",
    investmentTitle: 'Weekend Investment',
    rooms: [
      { type: 'Standard Room', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(2 or 3 Days)' },
      { type: 'Deluxe Room', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(2 or 3 Days)', popular: 'Best Value' },
      { type: 'Premium Cottage', price: '₹ XX,000 - XX,000', sub: 'Per Person', sub2: '(2 or 3 Days)' }
    ],
    ctaBtn: 'Reserve Your Weekend',
    linkCard: {
      title: 'Ready for a Longer Journey?',
      desc: 'If you loved the Weekend Reset, consider our 5-day Rejuvenation Program for deeper transformation.',
      btnText: 'Explore Rejuvenation',
      href: 'programmes/rejuvenation'
    },
    prevProg: { id: 'programmes/holistic-wellness', name: 'Holistic Wellness Program' },
    nextProg: { id: 'programmes/rejuvenation', name: 'Rejuvenation Program' }
  },

  'advanced-healing': {
    title: 'Advanced Healing Program',
    subtitle: '14 / 21 Days of Clinical Transformation',
    progKey: 'naturopathy',
    aboutTitle: 'About Advanced Healing',
    aboutParas: [
      'Our Advanced Healing Program provides intensive, doctor-supervised natural medicine protocols designed specifically for chronic lifestyle conditions, metabolic disorders, and complex health challenges.',
      'Integrating advanced Iris diagnostics, targeted therapeutic fasting, clinical hydrotherapy, and personalized acupuncture, this program addresses the root causes to activate your body’s profound self-healing capabilities.'
    ],
    image: '/assets/programmes/rejuvenation-prog.jpg',
    expTitle: 'Clinical Transformation',
    expSubtitle: 'Doctor-led therapeutic protocols for deep, sustainable recovery.',
    tabs: [
      {
        id: 'inclusions',
        label: 'Clinical Modalities',
        icon: Activity,
        type: 'two-col',
        col1: {
          title: 'Doctor & Diagnostic Care',
          icon: Sparkles,
          items: [
            'Daily Physician Rounds & Iris Diagnostics',
            'Targeted Acupuncture & Magnet Therapy',
            'Full Body Hydrotherapy & Spinal Sprays',
            'Therapeutic Fasting & Elimination Diets',
            'Specialized Natural Medicine Formulations'
          ]
        },
        col2: {
          title: 'Rehabilitation & Mind',
          icon: Heart,
          items: [
            'Personalized Physiotherapy & Movement',
            'Medical Satwik Dietary Management',
            'Restorative Breathwork & Yoga Nidra',
            'Long-term Home Care & Maintenance Protocol',
            'Full Access to Riverfront Sanctuaries'
          ]
        }
      }
    ],
    investmentTitle: 'Clinical Program Investment',
    rooms: [
      { type: 'Standard Room', price: '₹ XX,000 - XX,000', sub: 'Per Person / 14-21 Days' },
      { type: 'Deluxe Room', price: '₹ XX,000 - XX,000', sub: 'Per Person / 14-21 Days', popular: 'Recommended' },
      { type: 'Premium Cottage', price: '₹ XX,000 - XX,000', sub: 'Per Person / 14-21 Days' }
    ],
    ctaBtn: 'Book Clinical Consultation',
    prevProg: { id: 'programmes/detox', name: 'Detox Program' },
    nextProg: { id: 'programmes/weekend-reset', name: 'Weekend Reset' }
  }
};

export default function ProgrammeDetail({ progId, onNavigate }) {
  const currentKey = programmeDataMap[progId] ? progId : 'rejuvenation';
  const data = programmeDataMap[currentKey];
  
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.id || 'inclusions');

  useEffect(() => {
    setActiveTab(data.tabs[0]?.id || 'inclusions');
    window.scrollTo(0, 0);
  }, [progId]);

  // Modal State
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

  const openModal = (roomName = 'Choose a room type') => {
    setBookingModalData(prev => ({ ...prev, programme: data.title, roomType: roomName }));
    setBookingModalSubmitted(false);
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    if (isBookingModalOpen) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [isBookingModalOpen]);

  const handleBookNow = () => {
    onNavigate('book', { programme: data.progKey });
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION — LUXURY CHAMPAGNE CANVAS (NO BUTTONS, CALIBRATED SCALE) */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(6rem, 12vh, 8.5rem) 5% clamp(3rem, 6vh, 4.5rem)',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Leaf SVG Watermarks in Wine */}
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />

        {/* Center Content */}
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
          
          {/* Emblem Sparkle Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(94, 39, 53, 0.08)',
            border: '1.5px solid rgba(94, 39, 53, 0.18)',
            marginBottom: '1.2rem',
            color: 'var(--harvest-gold, #B8860B)'
          }}>
            <Sparkles size={28} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 700,
            color: 'var(--wine, #5E2735)',
            margin: '0 0 0.8rem 0',
            lineHeight: 1.15
          }}>
            {data.title}
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
            fontWeight: 600,
            color: 'var(--harvest-gold, #B8860B)',
            margin: '0 auto',
            letterSpacing: '0.04em'
          }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* 2. ABOUT SECTION (Two Column Grid: Image Left, Text Right) */}
      <section style={{ padding: '5.5rem 6%', backgroundColor: '#EFE5D7' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Image Card */}
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(94, 39, 53, 0.12)',
              border: '1px solid rgba(94, 39, 53, 0.1)',
              height: '380px'
            }}>
              <img 
                src={data.image} 
                alt={data.aboutTitle} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/assets/spaces/riverfront.png'; }}
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 700,
                color: 'var(--wine, #5E2735)',
                margin: '0 0 1.4rem 0',
                lineHeight: 1.2
              }}>
                {data.aboutTitle}
              </h2>

              {data.aboutParas.map((para, idx) => (
                <p key={idx} style={{
                  fontSize: '1.02rem',
                  color: 'var(--raisin-black, #2B1B17)',
                  opacity: 0.88,
                  lineHeight: 1.75,
                  marginBottom: '1.2rem'
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE EXPERIENCE / TABS SECTION */}
      <section style={{ padding: '5.5rem 6%', backgroundColor: 'var(--isabelline, #FAF6F0)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--wine, #5E2735)',
              margin: '0 0 0.5rem 0'
            }}>
              {data.expTitle}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--raisin-black, #2B1B17)',
              opacity: 0.75,
              fontStyle: 'italic',
              margin: 0
            }}>
              {data.expSubtitle}
            </p>
          </div>

          {/* Tab Navigation Chips */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            {data.tabs.map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1.8rem',
                    borderRadius: '50px',
                    border: isActive ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.15)',
                    backgroundColor: isActive ? 'var(--wine, #5E2735)' : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--wine, #5E2735)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 8px 24px rgba(94, 39, 53, 0.18)' : '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <IconComp size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          {(() => {
            const currentTabObj = data.tabs.find(t => t.id === activeTab) || data.tabs[0];
            if (!currentTabObj) return null;

            if (currentTabObj.type === 'two-col') {
              const Icon1 = currentTabObj.col1.icon;
              const Icon2 = currentTabObj.col2.icon;
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2rem',
                  backgroundColor: '#ffffff',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  boxShadow: '0 12px 35px rgba(94, 39, 53, 0.06)',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)'
                }}>
                  {/* Column 1 */}
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--wine, #5E2735)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: '0 0 1.2rem 0'
                    }}>
                      <Icon1 size={20} color="var(--harvest-gold, #B8860B)" />
                      {currentTabObj.col1.title}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {currentTabObj.col1.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88 }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--wine, #5E2735)' }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--wine, #5E2735)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: '0 0 1.2rem 0'
                    }}>
                      <Icon2 size={20} color="var(--harvest-gold, #B8860B)" />
                      {currentTabObj.col2.title}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {currentTabObj.col2.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88 }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--wine, #5E2735)' }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            if (currentTabObj.type === 'timeline') {
              return (
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  boxShadow: '0 12px 35px rgba(94, 39, 53, 0.06)',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {currentTabObj.items.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '1.5rem',
                      paddingBottom: idx < currentTabObj.items.length - 1 ? '1.5rem' : '0',
                      borderBottom: idx < currentTabObj.items.length - 1 ? '1px solid rgba(94, 39, 53, 0.08)' : 'none'
                    }}>
                      <div style={{ minWidth: '95px', fontWeight: 800, color: 'var(--harvest-gold, #B8860B)', fontSize: '0.95rem' }}>
                        {item.time}
                      </div>
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.25rem 0' }}>
                          {item.title}
                        </h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            if (currentTabObj.type === 'grid-cards') {
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {currentTabObj.items.map((item, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      padding: '2rem',
                      borderRadius: '20px',
                      boxShadow: '0 8px 25px rgba(94, 39, 53, 0.06)',
                      border: '1.5px solid rgba(94, 39, 53, 0.1)',
                      textAlign: 'center'
                    }}>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.6rem 0' }}>
                        {item.title}
                      </h5>
                      <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }

            if (currentTabObj.type === 'duration-cards') {
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {currentTabObj.items.map((item, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      padding: '2.2rem 1.8rem',
                      borderRadius: '20px',
                      boxShadow: '0 8px 25px rgba(94, 39, 53, 0.06)',
                      border: '1.5px solid rgba(94, 39, 53, 0.1)',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.35rem 1.1rem',
                        borderRadius: '30px',
                        backgroundColor: 'var(--wine, #5E2735)',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        marginBottom: '0.9rem'
                      }}>
                        {item.duration}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.6rem 0' }}>
                        {item.intensity}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }

            if (currentTabObj.type === 'schedule-grid') {
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  backgroundColor: '#ffffff',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  boxShadow: '0 12px 35px rgba(94, 39, 53, 0.06)',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)'
                }}>
                  {currentTabObj.cols.map((col, cIdx) => (
                    <div key={cIdx}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 1.2rem 0' }}>
                        {col.dayTitle}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        {col.items.map((it, itIdx) => (
                          <div key={itIdx} style={{ display: 'flex', gap: '1rem', fontSize: '0.92rem' }}>
                            <span style={{ fontWeight: 800, color: 'var(--harvest-gold, #B8860B)', minWidth: '75px' }}>{it.time}</span>
                            <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.85 }}>{it.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })()}

        </div>
      </section>

      {/* 4. OPTIONAL BANNER SECTION (e.g. Deep Cellular Renewal / Perfect for Busy Lifestyles) */}
      {data.bannerTitle && (
        <section style={{ padding: '4rem 6% 1rem 6%', backgroundColor: 'var(--isabelline, #FAF6F0)' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--wine, #5E2735)',
              margin: '0 0 1rem 0'
            }}>
              {data.bannerTitle}
            </h3>
            <p style={{
              fontSize: '1.02rem',
              color: 'var(--raisin-black, #2B1B17)',
              opacity: 0.85,
              lineHeight: 1.75,
              margin: 0
            }}>
              {data.bannerDesc}
            </p>
          </div>
        </section>
      )}

      {/* 5. INVESTMENT IN YOURSELF / ROOM PRICING SECTION */}
      <section style={{ padding: '4.5rem 6% 5.5rem 6%', backgroundColor: 'var(--isabelline, #FAF6F0)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{
            backgroundColor: '#FAF6F0',
            borderRadius: '28px',
            padding: '3.5rem 2.5rem',
            border: '1.5px solid rgba(94, 39, 53, 0.12)',
            boxShadow: '0 16px 45px rgba(94, 39, 53, 0.06)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--wine, #5E2735)',
              margin: '0 0 2.5rem 0'
            }}>
              {data.investmentTitle}
            </h3>

            {/* Room Cards 3-Col Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              maxWidth: '960px',
              margin: '0 auto 2.8rem auto'
            }}>
              {data.rooms.map((room, rIdx) => {
                const isPopular = !!room.popular;
                return (
                  <div
                    key={rIdx}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      border: isPopular ? '2px solid var(--harvest-gold, #B8860B)' : '1px solid rgba(94, 39, 53, 0.1)',
                      boxShadow: isPopular ? '0 12px 35px rgba(184, 134, 11, 0.18)' : '0 4px 15px rgba(0,0,0,0.03)',
                      position: 'relative',
                      transform: isPopular ? 'scale(1.03)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isPopular && (
                      <span style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--harvest-gold, #B8860B)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.8rem',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}>
                        {room.popular}
                      </span>
                    )}
                    <p style={{ fontSize: '0.84rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.6rem 0' }}>
                      {room.type}
                    </p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.3rem 0' }}>
                      {room.price}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, margin: 0 }}>
                      {room.sub}
                    </p>
                    {room.sub2 && (
                      <p style={{ fontSize: '0.74rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, margin: '0.2rem 0 0 0' }}>
                        {room.sub2}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleBookNow}
                style={{
                  backgroundColor: 'var(--wine, #5E2735)',
                  color: '#ffffff',
                  padding: '1rem 3rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(94, 39, 53, 0.28)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3a1520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine, #5E2735)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {data.ctaBtn} &rarr;
              </button>
            </div>

            {/* Optional Link Card (e.g. View Detox Therapies / Explore Rejuvenation) */}
            {data.linkCard && (
              <div style={{
                marginTop: '3rem',
                padding: '1.8rem 2rem',
                borderRadius: '18px',
                backgroundColor: 'rgba(94, 39, 53, 0.04)',
                border: '1px solid rgba(94, 39, 53, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.2rem',
                textAlign: 'left'
              }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--wine, #5E2735)', margin: '0 0 0.3rem 0' }}>
                    {data.linkCard.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>
                    {data.linkCard.desc}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate(data.linkCard.href)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1.5px solid var(--wine, #5E2735)',
                    color: 'var(--wine, #5E2735)',
                    padding: '0.7rem 1.6rem',
                    borderRadius: '30px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {data.linkCard.btnText} &rarr;
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 6. EXPLORE OTHER PROGRAMMES FOOTER NAVIGATION */}
      <section style={{ padding: '3rem 6% 4.5rem 6%', backgroundColor: 'var(--isabelline, #FAF6F0)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h4 style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(94, 39, 53, 0.7)', marginBottom: '1.8rem' }}>
            Explore Other Programmes
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {data.prevProg && (
              <div
                onClick={() => onNavigate(data.prevProg.id)}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.4rem 1.8rem',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--harvest-gold, #B8860B)'; e.currentTarget.style.transform = 'translateX(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(94, 39, 53, 0.1)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <ArrowLeft size={22} color="var(--wine, #5E2735)" />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(40, 38, 37, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Previous</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)' }}>{data.prevProg.name}</strong>
                </div>
              </div>
            )}

            {data.nextProg && (
              <div
                onClick={() => onNavigate(data.nextProg.id)}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.4rem 1.8rem',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(94, 39, 53, 0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--harvest-gold, #B8860B)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(94, 39, 53, 0.1)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(40, 38, 37, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>Next</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)' }}>{data.nextProg.name}</strong>
                </div>
                <ArrowRight size={22} color="var(--wine, #5E2735)" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. FULLY SCROLLABLE LUXURY BOOKING POPUP MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div 
            className="booking-modal-overlay"
            data-lenis-prevent="true"
            onClick={() => setIsBookingModalOpen(false)}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              className="booking-modal-card custom-light-scrollbar"
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
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
                  color: 'var(--wine, #5E2735)',
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
              <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: 'var(--wine, #5E2735)',
                  margin: '0 0 0.3rem 0'
                }}>
                  Book Your Retreat
                </h2>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--harvest-gold, #B8860B)',
                  margin: 0,
                  lineHeight: 1.45,
                  fontWeight: 600
                }}>
                  Begin your journey to wellness. Fill in the details below.
                </p>
              </div>

              {/* Form Body */}
              <div style={{
                backgroundColor: '#FAF6F0',
                borderRadius: '16px',
                padding: '1.4rem',
                border: '1px solid rgba(94, 39, 53, 0.1)',
                marginBottom: '1rem'
              }}>
                {bookingModalSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{
                      width: '54px', height: '54px', borderRadius: '50%',
                      backgroundColor: 'rgba(184, 134, 11, 0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1rem', color: 'var(--wine, #5E2735)'
                    }}>
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      Request Submitted!
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', lineHeight: 1.6 }}>
                      Thank you, <strong>{bookingModalData.name || 'Valued Guest'}</strong>. Our wellness advisors will contact you shortly to finalize your retreat details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setBookingModalSubmitted(true);
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Select Programme */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                        Select Programme *
                      </label>
                      <select
                        required
                        value={bookingModalData.programme}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, programme: e.target.value })}
                        style={{
                          width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px',
                          border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                          fontSize: '0.88rem', color: 'var(--wine, #5E2735)', outline: 'none', fontWeight: 600, boxSizing: 'border-box'
                        }}
                      >
                        <option value="Rejuvenation Program">Rejuvenation Program (5+ Days)</option>
                        <option value="Holistic Wellness Program">Holistic Wellness Program (7 Days)</option>
                        <option value="Detox Program">Detox Program (7/14/21 Days)</option>
                        <option value="Weekend Reset">Weekend Reset (2-3 Days)</option>
                        <option value="Advanced Healing Program">Advanced Healing Program (14/21 Days)</option>
                      </select>
                    </div>

                    {/* Select Room Type */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                        Select Room Type *
                      </label>
                      <select
                        required
                        value={bookingModalData.roomType}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, roomType: e.target.value })}
                        style={{
                          width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px',
                          border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                          fontSize: '0.88rem', color: 'var(--wine, #5E2735)', outline: 'none', fontWeight: 600, boxSizing: 'border-box'
                        }}
                      >
                        <option value="Choose a room type" disabled>Choose a room type</option>
                        <option value="Standard Room">Standard Room</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                        <option value="Premium Cottage">Premium Cottage</option>
                      </select>
                    </div>

                    {/* Dates 2-Col */}
                    <div className="booking-form-grid-2col">
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                          Check-In Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkIn}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkIn: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                            border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                            fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                          Check-Out Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingModalData.checkOut}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, checkOut: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                            border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                            fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={bookingModalData.guests}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, guests: parseInt(e.target.value) || 1 })}
                        style={{
                          width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                          border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                          fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Name and Email 2-Col */}
                    <div className="booking-form-grid-2col">
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={bookingModalData.name}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, name: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                            border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                            fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={bookingModalData.email}
                          onChange={(e) => setBookingModalData({ ...bookingModalData, email: e.target.value })}
                          style={{
                            width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                            border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                            fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 12345 67890"
                        value={bookingModalData.phone}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, phone: e.target.value })}
                        style={{
                          width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                          border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                          fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine, #5E2735)', display: 'block', marginBottom: '0.35rem' }}>
                        Special Requests or Questions
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any dietary requirements, health concerns..."
                        value={bookingModalData.notes}
                        onChange={(e) => setBookingModalData({ ...bookingModalData, notes: e.target.value })}
                        style={{
                          width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px',
                          border: '1px solid rgba(94, 39, 53, 0.2)', backgroundColor: '#ffffff',
                          fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', outline: 'none', boxSizing: 'border-box', resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'var(--wine, #5E2735)',
                        color: '#ffffff',
                        padding: '0.85rem',
                        borderRadius: '30px',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        marginTop: '0.4rem',
                        boxShadow: '0 4px 15px rgba(94, 39, 53, 0.2)'
                      }}
                    >
                      Submit Booking Enquiry ✦
                    </button>
                  </form>
                )}
              </div>

              {/* Alternative Full Wizard Link */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    handleBookNow();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--wine, #5E2735)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Or use the full 4-step booking wizard &rarr;
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
