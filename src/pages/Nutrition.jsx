import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, Leaf, Utensils, Heart, ShieldCheck, 
  Sun, Clock, CheckCircle2, ChevronLeft, ChevronRight, Activity, 
  Flame, Droplets, Coffee, Compass, Check, Calendar, Phone, Mail 
} from 'lucide-react';

// The 6-Phase Nourishment Journey
const nourishmentJourney = [
  {
    phase: 'Phase 1',
    title: 'Intention',
    subtitle: 'Eating with awareness',
    desc: 'The journey begins before the first bite. Cultivating gratitude, presence, and sensory appreciation calms the nervous system and primes your digestive organs for optimal enzyme secretion.',
    badge: 'Conscious Presence'
  },
  {
    phase: 'Phase 2',
    title: 'Preparation',
    subtitle: 'Mindful cooking',
    desc: 'Every meal is prepared with fresh organic produce from local soils. Food cooked with positive intention, gentle heat, and clean prana retains its vital life force and bioavailable nutrients.',
    badge: 'Prana Preservation'
  },
  {
    phase: 'Phase 3',
    title: 'Nourishment',
    subtitle: 'Satwik meals',
    desc: 'Pure, light, and energy-rich ingredients that clarify the mind and cleanse the body. Free from refined sugars, artificial preservatives, and heavy trans-fats.',
    badge: 'Pure Sattva'
  },
  {
    phase: 'Phase 4',
    title: 'Digestion',
    subtitle: 'Timing & combinations',
    desc: 'Eating in harmony with your circadian rhythm and natural metabolic fire (Agni). Mindful food combining prevents fermentation, acidity, and sluggish digestion.',
    badge: 'Agni Optimization'
  },
  {
    phase: 'Phase 5',
    title: 'Absorption',
    subtitle: 'Rest & rhythm',
    desc: 'Allowing the body the peaceful stillness needed after meals. Proper rest enables deep cellular absorption, gut tissue repair, and balanced nutrient assimilation.',
    badge: 'Cellular Assimilation'
  },
  {
    phase: 'Phase 6',
    title: 'Integration',
    subtitle: 'Carrying habits home',
    desc: 'Nutrition at Suprada is a lifelong skill. Take home practical recipes, grocery guidelines, and mindful eating routines to maintain lasting gut health and vitality.',
    badge: 'Lifelong Wellness'
  }
];

// Dining Spaces Showcase
const diningSpaces = [
  {
    title: 'Indoor Dining',
    desc: 'An elegant, tranquil sanctuary designed for contemplative, undistracted dining in soothing natural light and quiet stillness.',
    image: '/assets/nutrition/indoor-dining.jpg',
    tag: 'Peaceful Sanctuary'
  },
  {
    title: 'Outdoor Dining',
    desc: 'Al-fresco riverside dining surrounded by lush greenery, open skies, and gentle breezes to connect your senses with nature.',
    image: '/assets/nutrition/outdoor-dining.jpg',
    tag: 'Nature Immersion'
  },
  {
    title: 'Juice & Wellness Beverage Bar',
    desc: 'Fresh cold-pressed detox juices, herbal decoctions, therapeutic tonics, and restorative elixirs crafted live to order.',
    image: '/assets/nutrition/juice-bar.jpg',
    tag: 'Vitality Tonics'
  }
];

// Wholesome Cuisines Adapted to Satwik Principles
const cuisinesList = [
  {
    title: 'Regional Indian',
    desc: 'Freshly prepared traditional regional recipes with native heritage grains, digestive spices, and seasonal vegetables.',
    icon: '🌾'
  },
  {
    title: 'Light Oriental',
    desc: 'Delicate steamed broths, ginger-infused greens, wholesome Asian bowls, and gentle, mindful flavor profiles.',
    icon: '🥢'
  },
  {
    title: 'Clean Western',
    desc: 'Wholesome roasted root vegetables, millet risottos, herb-steamed squashes, and hearty plant-powered plates.',
    icon: '🥗'
  },
  {
    title: 'Middle Eastern',
    desc: 'Mediterranean and Levantine adaptations — protein-rich legumes, olive herb dressings, fresh hummus, and crisp salads.',
    icon: '🫒'
  },
  {
    title: 'Sprouts, Fruits & Seasonal Salads',
    desc: 'Living enzymes, sprouted pulses, organic microgreens, seed crunches, and seasonal local fruit bowls for radiant energy.',
    icon: '🌱'
  },
  {
    title: 'Herbal Infusions & Beverages',
    desc: 'Digestive CCF teas, fresh turmeric infusions, lemongrass coolers, and herbal tonics designed for systemic balance.',
    icon: '🍵'
  }
];

// 6 Therapeutic Nutrition Principles
const principlesList = [
  {
    title: 'Body Type-Aligned Meals',
    desc: 'Food adapted to your unique constitution, metabolic speed, and current state of physiological balance.',
    icon: Activity
  },
  {
    title: 'Seasonal Eating (Ritucharya)',
    desc: 'Menus evolve with nature’s cycles and seasonal shifts to support digestion and temperature balance.',
    icon: Sun
  },
  {
    title: 'Mindful Preparation',
    desc: 'Cooking with loving intention, farm-fresh harvest, gentle steaming, and minimal processing.',
    icon: Heart
  },
  {
    title: 'Timing & Rhythm (Dinacharya)',
    desc: 'Meals timed with the sun and your diurnal cycle to maximize metabolic fire and nutrient breakdown.',
    icon: Clock
  },
  {
    title: 'Bioavailability & Synergy',
    desc: 'Thoughtful food combinations and healing spices that enhance vitamin assimilation and reduce inflammation.',
    icon: Leaf
  },
  {
    title: 'Emotional Nourishment',
    desc: 'Calming dining atmospheres and mindful eating spaces that settle the nervous system and gladden the spirit.',
    icon: Sparkles
  }
];

export default function Nutrition({ onNavigate }) {
  const [activePhase, setActivePhase] = useState(0);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultModalSubmitted, setConsultModalSubmitted] = useState(false);
  const [consultFormData, setConsultFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Digestive Health & Gut Healing',
    notes: ''
  });

  const handlePhaseChange = (idx) => {
    setActivePhase(idx);
  };

  const nextPhase = () => {
    setActivePhase((prev) => (prev === nourishmentJourney.length - 1 ? 0 : prev + 1));
  };

  const prevPhase = () => {
    setActivePhase((prev) => (prev === 0 ? nourishmentJourney.length - 1 : prev - 1));
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextPhase();
    } else if (info.offset.x > swipeThreshold) {
      prevPhase();
    }
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultModalSubmitted(true);
    setTimeout(() => {
      setIsConsultModalOpen(false);
      setConsultModalSubmitted(false);
      setConsultFormData({
        name: '',
        email: '',
        phone: '',
        goal: 'Digestive Health & Gut Healing',
        notes: ''
      });
    }, 2200);
  };

  useEffect(() => {
    if (isConsultModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isConsultModalOpen]);

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Light Champagne Silk Theme — Full Viewport Fit) */}
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
          maxWidth: '780px',
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
              ✦ Satwik &amp; Conscious Dining ✦
            </span>

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
              Nutrition &amp; Wellness Cuisine <br />
              <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>at Suprada</span>
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
              At Suprada, food is not an indulgence — it is a daily practice of healing, awareness, and balance. Every meal is designed to support digestion, vitality, and inner harmony.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              onClick={() => setIsConsultModalOpen(true)}
              className="btn-luxury"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '0.7rem 1.6rem', fontSize: '0.8rem' }}
            >
              Consult Our Nutritionist <ArrowRight size={14} />
            </motion.button>

            <motion.button
              onClick={() => {
                const el = document.getElementById('dining-spaces-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
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
              Explore Dining Spaces
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. NOURISHMENT FOR BODY, MIND & SPIRIT (Introduction) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.8rem, 5vh, 4rem) 5%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '2.2rem' }}
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
              <Heart size={12} style={{ color: 'var(--wine)' }} /> Wellness Dining &amp; Nutrition at Suprada
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Nourishment for Body, <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Mind &amp; Spirit</span>
            </h2>
          </motion.div>

          {/* Core Philosophy Paragraph Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)',
              border: '1.5px solid rgba(94, 39, 53, 0.12)',
              textAlign: 'center',
              maxWidth: '860px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
              lineHeight: 1.75,
              color: 'var(--raisin-black)',
              opacity: 0.9,
              margin: 0
            }}>
              At Suprada Wellness, nourishment goes beyond calories and taste. Food is a conscious practice — one that supports digestion, strengthens immunity, calms the mind, and nurtures the spirit. Every meal is thoughtfully designed to work in harmony with your body’s natural intelligence and your personalized wellness journey.
            </p>
          </motion.div>

          {/* 3 Core Highlight Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.2rem'
          }}>
            {[
              {
                title: 'Gut-First Healing',
                desc: 'Honoring the body’s second brain with microbiome-supportive, easily digestible meals that kindle your metabolic fire (Agni).',
                icon: Activity
              },
              {
                title: 'Prana-Rich Organics',
                desc: 'Daily harvest organic vegetables, native herbs, and unpolished heritage grains rich in bio-energy and essential trace minerals.',
                icon: Leaf
              },
              {
                title: 'Individualized Protocol',
                desc: 'Tailored by our naturopathic doctors and nutritionists to harmonize your specific doshic constitution and health goals.',
                icon: ShieldCheck
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, borderColor: 'var(--wine)' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.4rem 1.2rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 20px rgba(94, 39, 53, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(94, 39, 53, 0.08)',
                  color: 'var(--wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <item.icon size={18} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  margin: 0
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  color: 'var(--raisin-black)',
                  opacity: 0.85,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR NUTRITION PHILOSOPHY (Deep Dive) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.8rem, 5vh, 3.8rem) 5%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.8rem, 3.5vw, 3rem)',
            alignItems: 'center'
          }}>
            
            {/* Left Column: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span style={{
                color: 'var(--wine)',
                backgroundColor: 'rgba(94, 39, 53, 0.08)',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.28rem 0.85rem',
                borderRadius: '50px',
                display: 'inline-block',
                marginBottom: '0.6rem',
                border: '1px solid rgba(94, 39, 53, 0.18)'
              }}>
                ✦ Philosophy ✦
              </span>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h2)',
                fontWeight: 700,
                color: 'var(--wine)',
                lineHeight: 1.2,
                marginBottom: '0.4rem'
              }}>
                Our Nutrition <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Philosophy</span>
              </h2>

              <p style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--redwood)',
                marginBottom: '1rem'
              }}>
                Designed to help you make better food choices — for life
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '0.9rem'
              }}>
                We believe that true wellness begins in the gut. Often referred to as the body’s second brain, the gastrointestinal system plays a vital role in energy levels, emotional balance, immunity, and long-term health.
              </p>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '1.4rem'
              }}>
                At Suprada, nutrition is not restrictive — it is restorative. By aligning mindful eating with natural, wholesome foods, we support the body’s innate ability to heal and rebalance itself.
              </p>

              <motion.button
                onClick={() => setIsConsultModalOpen(true)}
                className="btn-luxury"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
              >
                Learn About Your Diet <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Right Column: Key Feature Blocks */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              {[
                {
                  title: 'Restorative, Not Restrictive',
                  desc: 'Focusing on abundance, nutrient density, and vibrant flavors rather than calorie deprivation or extreme fads.'
                },
                {
                  title: 'Diagnostic-Led Customization',
                  desc: 'Informed by non-invasive holistic health assessment, pulse diagnosis, and physician consultations.'
                },
                {
                  title: 'Agni & Metabolic Synchronization',
                  desc: 'Synchronized with peak digestive hours so nutrients are efficiently burned for cellular energy without toxic residue (Ama).'
                },
                {
                  title: 'Pure & Unadulterated',
                  desc: 'Zero chemical preservatives, zero refined sugars, and zero refined oils — only wholesome, pure satwik ingredients.'
                }
              ].map((pill, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '1rem 1.1rem',
                    border: '1.2px solid rgba(94, 39, 53, 0.12)',
                    boxShadow: '0 4px 14px rgba(94, 39, 53, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--wine)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={11} />
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: 'var(--wine)',
                      margin: 0
                    }}>
                      {pill.title}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '0.78rem',
                    lineHeight: 1.5,
                    color: 'var(--raisin-black)',
                    opacity: 0.85,
                    margin: '0 0 0 1.6rem'
                  }}>
                    {pill.desc}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ANCIENT SANSKRIT SLOKA (Ahāraśuddhau sattvaśuddhiḥ) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.2rem, 4vh, 2.8rem) 5%',
        background: 'linear-gradient(135deg, #f0e6d6 0%, #e8dcbe 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: 'clamp(1.6rem, 3.2vw, 2.2rem) clamp(1.2rem, 2.5vw, 1.8rem)',
              textAlign: 'center',
              boxShadow: '0 10px 28px rgba(94, 39, 53, 0.07)',
              border: '1.5px solid rgba(94, 39, 53, 0.12)'
            }}
          >
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--wine)',
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              ✦ Ancient Nutritional Wisdom ✦
            </span>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.15rem, 2.6vw, 1.5rem)',
              color: 'var(--raisin-black)',
              fontWeight: 700,
              margin: '0 0 0.5rem 0',
              lineHeight: 1.4
            }}>
              आहारशुद्धौ सत्त्वशुद्धिः।
            </h3>

            <p style={{
              fontSize: 'clamp(0.82rem, 1.8vw, 0.92rem)',
              fontStyle: 'italic',
              color: 'var(--wine)',
              fontWeight: 600,
              margin: '0 0 0.8rem 0'
            }}>
              Ahāraśuddhau sattvaśuddhiḥ.
            </p>

            <div style={{
              width: '40px',
              height: '1.5px',
              backgroundColor: 'var(--wine)',
              opacity: 0.25,
              margin: '0 auto 0.85rem auto'
            }} />

            <p style={{
              fontSize: '0.84rem',
              lineHeight: 1.6,
              color: 'var(--raisin-black)',
              opacity: 0.88,
              margin: '0 auto',
              maxWidth: '540px'
            }}>
              <em>“When food is pure, the mind becomes pure.”</em><br />
              Food ingested with peace, mindfulness, and gratitude nourishes not only the physical tissues (dhatus) but clears the subtle channels of the mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE NOURISHMENT JOURNEY (Interactive 6-Phase Stepper Carousel) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.5rem, 5vh, 3.2rem) 4%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.3rem' }}>
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
              <Compass size={11} style={{ color: 'var(--wine)' }} /> The Path
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              The <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Nourishment Journey</span>
            </h2>
          </div>

          {/* Phase Selector Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.35rem',
            flexWrap: 'wrap',
            marginBottom: '1.2rem'
          }}>
            {nourishmentJourney.map((item, jIdx) => {
              const isActive = activePhase === jIdx;
              return (
                <button
                  key={jIdx}
                  onClick={() => handlePhaseChange(jIdx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.28rem 0.72rem',
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
                  <span>{item.phase}</span>
                  {isActive && <span style={{ color: 'var(--tan)' }}>✦</span>}
                </button>
              );
            })}
          </div>

          {/* Interactive Stepper Card with Touch / Mouse Drag */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: 'clamp(1.2rem, 3vw, 1.8rem)',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.08)',
              border: '1.5px solid rgba(94, 39, 53, 0.14)',
              cursor: 'grab',
              touchAction: 'pan-y'
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {/* Top Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{
                backgroundColor: 'var(--wine)',
                color: '#ffffff',
                fontSize: '0.64rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                padding: '0.22rem 0.72rem',
                borderRadius: '50px'
              }}>
                {nourishmentJourney[activePhase].badge}
              </span>

              <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 700 }}>
                {nourishmentJourney[activePhase].phase} of 6
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  margin: '0 0 0.2rem 0'
                }}>
                  {nourishmentJourney[activePhase].title}
                </h3>

                <p style={{
                  fontSize: '0.82rem',
                  fontStyle: 'italic',
                  color: 'var(--redwood)',
                  fontWeight: 600,
                  margin: '0 0 0.75rem 0'
                }}>
                  {nourishmentJourney[activePhase].subtitle}
                </p>

                <p style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.65,
                  color: 'var(--raisin-black)',
                  opacity: 0.9,
                  marginBottom: '1.2rem'
                }}>
                  {nourishmentJourney[activePhase].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions: Book Consultation CTA + Prev/Next Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.6rem',
              paddingTop: '0.8rem',
              borderTop: '1px solid rgba(94, 39, 53, 0.1)'
            }}>
              <motion.button
                onClick={() => setIsConsultModalOpen(true)}
                className="btn-luxury"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.74rem' }}
              >
                Request Diet Consultation <ArrowRight size={12} />
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  onClick={prevPhase}
                  aria-label="Previous Phase"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--antique-white)',
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
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={nextPhase}
                  aria-label="Next Phase"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--antique-white)',
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
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DOCTOR PRESCRIBED — THE SCIENCE OF FOOD (Prescribed Nutrition) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.8rem, 5vh, 4rem) 5%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.8rem, 3.5vw, 3rem)',
            alignItems: 'center'
          }}>
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span style={{
                color: 'var(--wine)',
                backgroundColor: 'rgba(94, 39, 53, 0.08)',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.28rem 0.85rem',
                borderRadius: '50px',
                display: 'inline-block',
                marginBottom: '0.6rem',
                border: '1px solid rgba(94, 39, 53, 0.18)'
              }}>
                ✦ Doctor Prescribed ✦
              </span>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h2)',
                fontWeight: 700,
                color: 'var(--wine)',
                lineHeight: 1.2,
                marginBottom: '0.8rem'
              }}>
                The Science of Food: <br />
                <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Prescribed Nutrition</span>
              </h2>

              <p style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 1.65,
                color: 'var(--raisin-black)',
                opacity: 0.9,
                marginBottom: '1.2rem'
              }}>
                Unlike standard resorts, your menu at Suprada isn't chosen by preference alone — it is carefully curated by your wellness doctor. Based on your diagnostics (Holistic Health Assessment) and wellness goals, our chefs prepare meals that act as precise medicine for your body type.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.4rem' }}>
                {[
                  'Ingredients selected for your specific Body Type & Dosha',
                  'Timed to synchronize with your metabolic fire (Agni)',
                  'Calorie and nutrient calibrated for restorative detox'
                ].map((point, ptIdx) => (
                  <div key={ptIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--wine)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={11} />
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--raisin-black)' }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => onNavigate('contact')}
                className="btn-luxury"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
              >
                Book Health Assessment <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(94, 39, 53, 0.1)',
                  border: '1.5px solid rgba(94, 39, 53, 0.14)',
                  width: '100%',
                  maxHeight: '340px'
                }}
              >
                <img
                  src="/assets/nutrition/prescribed-nutrition.jpg"
                  alt="Doctor Prescribed Nutrition at Suprada"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '340px',
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
      {/* 7. DINING SPACES FOR CONSCIOUS NOURISHMENT */}
      {/* ========================================================================= */}
      <section 
        id="dining-spaces-section"
        style={{
          padding: 'clamp(2.8rem, 5vh, 4rem) 5%',
          backgroundColor: 'var(--isabelline)',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
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
              <Utensils size={12} style={{ color: 'var(--wine)' }} /> Dining Spaces
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Dining Spaces for <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Conscious Nourishment</span>
            </h2>
          </div>

          {/* 3 Visual Space Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.4rem'
          }}>
            {diningSpaces.map((space, sIdx) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: sIdx * 0.08 }}
                whileHover={{ y: -5, borderColor: 'var(--wine)', boxShadow: '0 12px 28px rgba(94, 39, 53, 0.1)' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(94, 39, 53, 0.05)'
                }}
              >
                <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
                  <img
                    src={space.image}
                    alt={space.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '0.6rem',
                    left: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.22rem 0.65rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(94, 39, 53, 0.15)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}>
                    <span style={{
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--wine)'
                    }}>
                      ✦ {space.tag}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.2rem 1.1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: 'var(--wine)',
                      marginBottom: '0.4rem'
                    }}>
                      {space.title}
                    </h3>
                    <p style={{
                      fontSize: '0.82rem',
                      lineHeight: 1.55,
                      color: 'var(--raisin-black)',
                      opacity: 0.85,
                      margin: 0
                    }}>
                      {space.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHOLESOME CUISINES, THOUGHTFULLY ADAPTED */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.8rem, 5vh, 3.8rem) 5%',
        backgroundColor: 'var(--antique-white)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.2rem auto' }}>
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
              border: '1px solid rgba(94, 39, 53, 0.18)'
            }}>
              <Utensils size={12} style={{ color: 'var(--wine)' }} /> Cuisine
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2,
              marginBottom: '0.6rem'
            }}>
              Wholesome Cuisines, <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Thoughtfully Adapted</span>
            </h2>

            <p style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 1.65,
              color: 'var(--raisin-black)',
              opacity: 0.88,
              margin: 0
            }}>
              Our wellness cuisine draws inspiration from diverse global traditions — all adapted to align with Suprada’s principles of natural, satwik, and therapeutic eating.
            </p>
          </div>

          {/* 6 Cuisines Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.1rem'
          }}>
            {cuisinesList.map((c, cIdx) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: cIdx * 0.06 }}
                whileHover={{ y: -3, borderColor: 'var(--wine)', backgroundColor: '#FFFFFF' }}
                style={{
                  backgroundColor: '#FAF0E6',
                  borderRadius: '14px',
                  padding: '1.2rem',
                  border: '1.2px solid rgba(94, 39, 53, 0.14)',
                  boxShadow: '0 4px 14px rgba(94, 39, 53, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--wine)',
                    margin: 0
                  }}>
                    {c.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  color: 'var(--raisin-black)',
                  opacity: 0.85,
                  margin: 0
                }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '0.82rem',
            fontStyle: 'italic',
            color: 'var(--wine)',
            opacity: 0.85,
            marginTop: '1.8rem',
            marginBottom: 0
          }}>
            ✦ Every recipe is researched, developed, and prepared to ensure food remains both healing and enjoyable. ✦
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. THERAPEUTIC NUTRITION PRINCIPLES */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(2.8rem, 5vh, 4rem) 5%',
        backgroundColor: 'var(--isabelline)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
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
              border: '1px solid rgba(94, 39, 53, 0.18)'
            }}>
              <ShieldCheck size={12} style={{ color: 'var(--wine)' }} /> Principles
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              color: 'var(--wine)',
              lineHeight: 1.2
            }}>
              Therapeutic <span style={{ color: 'var(--redwood)', fontStyle: 'italic' }}>Nutrition Principles</span>
            </h2>
          </div>

          {/* 6 Principles Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.2rem'
          }}>
            {principlesList.map((p, pIdx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: pIdx * 0.06 }}
                whileHover={{ y: -4, borderColor: 'var(--wine)' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.4rem 1.2rem',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 20px rgba(94, 39, 53, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(94, 39, 53, 0.08)',
                  color: 'var(--wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p.icon size={18} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  margin: 0
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  color: 'var(--raisin-black)',
                  opacity: 0.85,
                  margin: 0
                }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. BOTTOM CTA BANNER (Rediscover the Joy of Eating Well) */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(3.5rem, 7vh, 5rem) 5%',
        backgroundImage: 'linear-gradient(180deg, rgba(42, 14, 24, 0.86) 0%, rgba(42, 14, 24, 0.94) 100%), url("/assets/nutrition/cta-nutrition-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span style={{
              display: 'inline-block',
              color: 'var(--tan)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem'
            }}>
              ✦ Nourish Your Future ✦
            </span>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--tan)',
              lineHeight: 1.2,
              margin: '0 0 1rem 0'
            }}>
              Rediscover the Joy <br />
              <span style={{ fontStyle: 'italic', color: '#ffffff' }}>of Eating Well</span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
              lineHeight: 1.65,
              color: 'var(--isabelline)',
              opacity: 0.9,
              maxWidth: '640px',
              margin: '0 auto 2rem auto'
            }}>
              At Suprada, nutrition becomes a life skill — one that nourishes the body, calms the mind, and supports lasting wellness beyond your stay.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                onClick={() => onNavigate('programmes/packages')}
                className="btn-luxury"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.75rem 1.7rem',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--tan)',
                  color: 'var(--wine)',
                  borderColor: 'var(--tan)',
                  fontWeight: 800
                }}
              >
                Plan Your Wellness Stay <ArrowRight size={14} />
              </motion.button>

              <motion.button
                onClick={() => setIsConsultModalOpen(true)}
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.82rem',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.4)'
                }}
              >
                Consult Our Nutritionist
              </motion.button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONSULTATION REQUEST MODAL (Mobile Responsive & Scrollable) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isConsultModalOpen && (
          <div
            onClick={() => setIsConsultModalOpen(false)}
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
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '88vh',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: 'clamp(1.2rem, 3vw, 1.6rem)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                border: '1.5px solid rgba(94, 39, 53, 0.2)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                color: 'var(--wine)',
                margin: 'auto'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsConsultModalOpen(false)}
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
                  zIndex: 10
                }}
              >
                ✕
              </button>

              {/* Modal Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.1rem', paddingRight: '1.5rem', paddingLeft: '0.5rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)',
                  fontWeight: 700,
                  color: 'var(--wine)',
                  margin: '0 0 0.25rem 0'
                }}>
                  Nutrition Consultation
                </h2>
                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--raisin-black)',
                  opacity: 0.8,
                  margin: 0
                }}>
                  Speak with our wellness doctor &amp; clinical nutrition team.
                </p>
              </div>

              {consultModalSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.1)',
                    color: 'var(--wine)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                    Consultation Requested!
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--raisin-black)', opacity: 0.85 }}>
                    Our nutrition specialist will reach out shortly with customized dietary guidance.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--wine)', marginBottom: '0.25rem' }}>
                      Primary Wellness Goal
                    </label>
                    <select
                      value={consultFormData.goal}
                      onChange={(e) => setConsultFormData({ ...consultFormData, goal: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '10px',
                        border: '1.2px solid rgba(94, 39, 53, 0.2)',
                        backgroundColor: 'var(--isabelline)',
                        color: 'var(--raisin-black)',
                        fontSize: '0.8rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Digestive Health & Gut Healing">Digestive Health &amp; Gut Healing</option>
                      <option value="Detox & Cleansing Diet">Detox &amp; Cleansing Diet</option>
                      <option value="Weight Management & Metabolism">Weight Management &amp; Metabolism</option>
                      <option value="Stress & Emotional Eating Balance">Stress &amp; Emotional Eating Balance</option>
                      <option value="Chronic Condition Dietary Therapy">Chronic Condition Dietary Therapy</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--wine)', marginBottom: '0.25rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={consultFormData.name}
                      onChange={(e) => setConsultFormData({ ...consultFormData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '10px',
                        border: '1.2px solid rgba(94, 39, 53, 0.2)',
                        backgroundColor: 'var(--isabelline)',
                        color: 'var(--raisin-black)',
                        fontSize: '0.8rem',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--wine)', marginBottom: '0.25rem' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={consultFormData.email}
                        onChange={(e) => setConsultFormData({ ...consultFormData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '10px',
                          border: '1.2px solid rgba(94, 39, 53, 0.2)',
                          backgroundColor: 'var(--isabelline)',
                          color: 'var(--raisin-black)',
                          fontSize: '0.8rem',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--wine)', marginBottom: '0.25rem' }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={consultFormData.phone}
                        onChange={(e) => setConsultFormData({ ...consultFormData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '10px',
                          border: '1.2px solid rgba(94, 39, 53, 0.2)',
                          backgroundColor: 'var(--isabelline)',
                          color: 'var(--raisin-black)',
                          fontSize: '0.8rem',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--wine)', marginBottom: '0.25rem' }}>
                      Dietary Preferences / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Vegetarian, vegan, food allergies, or health goals..."
                      value={consultFormData.notes}
                      onChange={(e) => setConsultFormData({ ...consultFormData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '10px',
                        border: '1.2px solid rgba(94, 39, 53, 0.2)',
                        backgroundColor: 'var(--isabelline)',
                        color: 'var(--raisin-black)',
                        fontSize: '0.8rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-luxury"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      fontSize: '0.82rem',
                      marginTop: '0.3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    Submit Request <ArrowRight size={14} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
