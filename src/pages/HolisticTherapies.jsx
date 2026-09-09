import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, Leaf, 
  Activity, Compass, Heart, Radio, Waves, Volume2, 
  Flame, Brain, Gem, Palette, Hourglass, Footprints, 
  Hand, Wind, Bell, Music, Headphones, Users, CloudRain, CircleDot, Target
} from 'lucide-react';

const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function HolisticTherapies({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('energy');

  const energyHealingList = [
    { name: "Acupuncture", icon: Target, desc: "Traditional meridian therapy", color: "#B85645" },
    { name: "Reiki", icon: Sparkles, desc: "Universal life energy healing", color: "#B8860B" },
    { name: "Pranic Healing", icon: Wind, desc: "No-touch energy cleansing", color: "#5E2735" },
    { name: "Reflexology", icon: Footprints, desc: "Zone therapy on feet", color: "#6A7B66" },
    { name: "Acupressure", icon: Hand, desc: "Pressure point stimulation", color: "#B85645" },
    { name: "Crystal Healing", icon: Gem, desc: "Vibrational stone therapy", color: "#B8860B" },
    { name: "Color Therapy", icon: Palette, desc: "Chromotherapy for balance", color: "#5E2735" },
    { name: "Hypnotherapy", icon: Brain, desc: "Subconscious reprogramming", color: "#6A7B66" },
    { name: "Past Life Regression", icon: Hourglass, desc: "Karmic healing journey", color: "#B85645" },
    { name: "Inner Child Healing", icon: Heart, desc: "Emotional trauma release", color: "#B8860B" },
    { name: "Sujok", icon: Activity, desc: "Hand & foot microsystems", color: "#5E2735" },
    { name: "Moxibustion", icon: Flame, desc: "Heat therapy on points", color: "#B85645" }
  ];

  const soundHealingList = [
    { name: "Om Bowls", icon: Radio, desc: "Tibetan singing bowls", color: "#B8860B" },
    { name: "Gong Healing", icon: Bell, desc: "Deep resonance therapy", color: "#5E2735" },
    { name: "Flute Therapy", icon: Music, desc: "Wind instrument relaxation", color: "#6A7B66" },
    { name: "Music Therapy", icon: Headphones, desc: "Therapeutic melodies", color: "#B85645" },
    { name: "Nadayoga", icon: Waves, desc: "Yoga of sound", color: "#B8860B" },
    { name: "Chanting Circles", icon: Users, desc: "Group vocal vibration", color: "#5E2735" },
    { name: "Rain Bamboos", icon: CloudRain, desc: "Nature sound simulation", color: "#6A7B66" },
    { name: "Drums", icon: CircleDot, desc: "Rhythmic grounding", color: "#B85645" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--antique-white, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION - /spaces Centered Luxury Theme (Exact verbatim title & subtitle) */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6% 3.5rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />

        {/* Ambient Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '15%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.1) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Background Mandala Watermark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(340px, 75vw, 540px)', height: 'clamp(340px, 75vw, 540px)',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordRevealContainer}
          style={{ position: 'relative', zIndex: 2, maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '75px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
            />
          </motion.div>

          {/* Centered Pill Badge */}
          <motion.div
            initial={{ letterSpacing: '0.1em', opacity: 0, y: -10 }}
            animate={{ letterSpacing: '0.22em', opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              padding: '0.35rem 1.3rem', borderRadius: '30px',
              border: '1px solid rgba(94, 39, 53, 0.2)',
              marginBottom: '1.1rem'
            }}
          >
            <span style={{ color: 'var(--harvest-gold, #B8860B)', fontSize: '0.75rem' }}>✦</span>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 800 }}>
              Pillar of Wellness
            </span>
          </motion.div>

          {/* Main Title - Exact reference site wording without extra shloka in heading */}
          <h1 style={{
            color: 'var(--wine, #5E2735)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            fontWeight: 700,
            margin: '0 0 0.8rem 0', 
            lineHeight: 1.15, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap'
          }}>
            <motion.span variants={wordVariant}>Holistic</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)' }}>
              Therapies
            </motion.span>
          </h1>

          {/* Exact Subtitle from reference site */}
          <p style={{
            color: 'rgba(94, 39, 53, 0.88)',
            maxWidth: '680px',
            margin: '0 auto 1.8rem auto',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.28rem)',
            lineHeight: 1.6,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            Integrated Healing for Complete Wellness
          </p>

          {/* Action Buttons - Matching /spaces Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#modalities"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.2rem',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 700,
                backgroundColor: 'var(--wine, #5E2735)',
                color: '#f5ebd9',
                border: '1.5px solid var(--wine, #5E2735)',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 18px rgba(94,39,53,0.22)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3a1520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine, #5E2735)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Explore Therapies ↓
            </a>
            <button
              onClick={() => onNavigate('contact')}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(94,39,53,0.35)',
                color: 'var(--wine, #5E2735)',
                cursor: 'pointer',
                padding: '0.85rem 2.1rem',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                fontWeight: 600,
                borderRadius: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94,39,53,0.07)'; e.currentTarget.style.borderColor = 'var(--wine, #5E2735)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(94,39,53,0.35)'; }}
            >
              Book Consultation
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <div style={{ marginTop: '2.5rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--wine, #5E2735)', opacity: 0.6, fontWeight: 700 }}>
            Scroll ↓
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 2. ABOUT HOLISTIC THERAPIES SECTION - Exact verbatim paragraphs & exact reference image */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.08)',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                backgroundColor: '#ffffff',
                height: '100%',
                minHeight: '360px'
              }}
            >
              <img 
                src="/assets/programmes/holistic-therapies-about.jpg" 
                alt="Holistic spa therapy and wellness healing" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '360px', maxHeight: '480px' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 1.2rem 0', fontWeight: 700, lineHeight: 1.2 }}>
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Holistic Therapies</span>
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, marginBottom: '1.2rem' }}>
                Our holistic therapies integrate diverse healing modalities from around the world to address your health from multiple dimensions. Combining ancient wisdom with modern techniques, we offer acupuncture, acupressure, energy healing, cupping therapy, music &amp; sound healing and other complementary treatments designed to restore balance and promote deep healing.
              </p>
              <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.75, margin: 0 }}>
                Each therapy is carefully selected and personalized to your unique needs, working synergistically to enhance your body's natural healing capabilities.
              </p>
            </motion.div>
          </div>

          {/* 3. SANSKRIT WISDOM BANNER - Unity in Healing */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              marginTop: '4.5rem',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              background: 'linear-gradient(135deg, #FAF0E6 0%, #F5EBD9 100%)',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', opacity: 0.05, pointerEvents: 'none' }}>
              <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <span style={{ color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                Unity in Healing
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                सर्वं खल्विदं ब्रह्म।
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                Sarvaṃ khalvidaṃ brahma.
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '60%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  (All this is indeed the universal consciousness.)
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* 4. HEALING MODALITIES - Muted Sage Green Interactive Tabbed Section with Professional Lucide Icons */}
      <section id="modalities" style={{
        padding: '5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine, #5E2735)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '5rem'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.6rem 0', fontWeight: 700 }}>
              Healing <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Modalities</span>
            </h2>
            <p style={{ color: '#ffffff', fontSize: '1.05rem', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
              Restoring harmony through vibrational medicine, subtle energy work, and ancient healing traditions that address the body, mind, and spirit from multiple dimensions.
            </p>

            {/* Interactive Category Tabs */}
            <div style={{ display: 'inline-flex', gap: '0.8rem', marginTop: '2.2rem', backgroundColor: 'rgba(255, 255, 255, 0.45)', padding: '0.4rem', borderRadius: '35px', backdropFilter: 'blur(10px)' }}>
              <button
                onClick={() => setActiveTab('energy')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 2rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'energy' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'energy' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'energy' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Sparkles size={16} />
                Energy Healing
              </button>
              <button
                onClick={() => setActiveTab('sound')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 2rem',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === 'sound' ? 'var(--wine, #5E2735)' : 'transparent',
                  color: activeTab === 'sound' ? '#f5ebd9' : 'var(--wine, #5E2735)',
                  boxShadow: activeTab === 'sound' ? '0 4px 15px rgba(94, 39, 53, 0.25)' : 'none'
                }}
              >
                <Volume2 size={16} />
                Sound Healing
              </button>
            </div>
          </div>

          {/* Cards Grid with Professional Lucide Icons */}
          <AnimatePresence mode="wait">
            {activeTab === 'energy' ? (
              <motion.div 
                key="energy-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.4rem' }}
              >
                {energyHealingList.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.12)' }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '22px',
                        padding: '1.6rem 1.4rem',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <IconComp size={22} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="sound-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.4rem' }}
              >
                {soundHealingList.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.12)' }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '22px',
                        padding: '1.6rem 1.4rem',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem'
                        }}>
                          <IconComp size={22} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Main Container Continued */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4.5rem 6%' }}>
        
        {/* 5. COMPLETE MIND-BODY INTEGRATION & SIGNATURE EXPERIENCE - Exact reference content & image */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', fontWeight: 700, margin: '0 0 0.8rem 0' }}>
              Complete Mind-Body Integration
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, maxWidth: '820px', margin: '0 auto', lineHeight: 1.65 }}>
              Our Holistic Therapies go beyond physical symptoms to address the subtle energy bodies and emotional roots of dis-ease. By combining the vibrational power of sound with ancient energy techniques like acupuncture and Reiki, we facilitate a deep state of harmony where profound healing can occur naturally.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              boxShadow: '0 14px 40px rgba(94, 39, 53, 0.08)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--wine, #5E2735)',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 1rem',
                    borderRadius: '30px',
                    marginBottom: '1rem'
                  }}>
                    <Sparkles size={13} style={{ color: 'var(--redwood, #B85645)' }} /> SIGNATURE EXPERIENCE
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
                    Vibrational Healing Journey
                  </h3>

                  <p style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--redwood, #B85645)', marginBottom: '0.9rem' }}>
                    HOLISTIC CARE • ENERGY &amp; SOUND
                  </p>

                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Immerse yourself in a transformative session combining Tibetan Singing Bowls, Gong Bath, and guided energy clearing. This signature therapy releases deep-seated stress, balances chakras, and induces a meditative state of theta-wave relaxation.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
                    {[
                      'Chakra Balancing',
                      'Deep Stress Release',
                      'Emotional Cleansing',
                      'Cellular Rejuvenation'
                    ].map(check => (
                      <div key={check} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                          <Check size={13} />
                        </div>
                        <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.88rem' }}>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => onNavigate('contact')}
                    style={{
                      backgroundColor: 'var(--wine, #5E2735)',
                      color: '#ffffff',
                      padding: '0.85rem 2.2rem',
                      borderRadius: '30px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(94, 39, 53, 0.22)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3a1520'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine, #5E2735)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    BEGIN YOUR JOURNEY &rarr;
                  </button>
                </div>
              </div>

              <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '350px', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.1)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <img 
                  src="/assets/programmes/sound-healing-session.jpg" 
                  alt="Sound Healing Session" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '0.8rem 1.2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(94, 39, 53, 0.15)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Starting from</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>7 / 14 / 21 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. EXPLORE OTHER PROGRAMMES NAVIGATION (Exact reference) */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.12)' }}>
          <h3 style={{ color: 'var(--wine, #5E2735)', textAlign: 'center', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.5rem' }}>
            Explore Other Programmes
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/yoga-meditation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem 1.8rem',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                <ArrowLeft size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>
                  Previous
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--wine, #5E2735)', margin: '0.1rem 0 0 0', fontWeight: 700 }}>
                  Yoga &amp; Meditation
                </h4>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => {
                onNavigate('programmes/nutrition-lifestyle');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem 1.8rem',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>
                  Next
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--wine, #5E2735)', margin: '0.1rem 0 0 0', fontWeight: 700 }}>
                  Nutrition &amp; Lifestyle
                </h4>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                <ArrowRight size={18} />
              </div>
            </motion.div>
          </div>
        </div>

      </div>

    </div>
  );
}
