import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  User, Sun, Moon, Heart, ArrowRight, ArrowLeft, Check, Sparkles
} from 'lucide-react';

const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function YogaMeditation({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('core');

  return (
    <div style={{ backgroundColor: 'var(--antique-white, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION - Exact /spaces Centered Luxury Theme */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6% 3rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
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

          {/* Main Title - Two-Tone Cormorant with Italic Harvest Gold */}
          <h1 style={{
            color: 'var(--wine, #5E2735)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            fontWeight: 700,
            margin: '0 0 1rem 0', 
            lineHeight: 1.15, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap'
          }}>
            <motion.span variants={wordVariant}>Yoga &amp; Meditation</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)', display: 'block', width: '100%' }}>
              Unite Body, Mind &amp; Spirit
            </motion.span>
          </h1>

          {/* Subtitle description */}
          <p style={{
            color: 'rgba(94, 39, 53, 0.88)',
            maxWidth: '680px',
            margin: '0 auto 1.8rem auto',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.65,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            Cultivate inner stillness, physical strength, and mental clarity through classical yogic discipline, breathwork, and deep restorative meditation.
          </p>

          {/* Action Buttons - Matching /spaces Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#pathways"
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
              Explore Practices ↓
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
        
        {/* 2. ABOUT YOGA & MEDITATION SECTION */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
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
                minHeight: '350px'
              }}
            >
              <img 
                src="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop" 
                alt="Peaceful yoga and meditation practice" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '350px', maxHeight: '460px' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--redwood, #B85645)', marginBottom: '0.5rem', display: 'block' }}>
                ANCIENT MIND-BODY DISCIPLINE
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 1.2rem 0', fontWeight: 700, lineHeight: 1.2 }}>
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Yoga &amp; Meditation</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Yoga and meditation are transformative practices that unite the body, mind, and spirit. At Suprada Wellness, we offer authentic yoga sessions guided by experienced instructors, combining classical Asanas (postures), Pranayama (breath work), and meditation techniques to cultivate physical strength, mental clarity, and emotional balance.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
                Whether you're a beginner or an advanced practitioner, our personalized approach ensures you experience the profound benefits of these ancient practices in a supportive, serene environment.
              </p>
            </motion.div>
          </div>

          {/* Yoga Philosophy Sanskrit Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              marginTop: '4rem',
              borderRadius: '24px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              background: 'linear-gradient(135deg, #FAF0E6 0%, #F5EBD9 100%)',
              overflow: 'hidden'
            }}
          >
            {/* Background Mandala */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', opacity: 0.05, pointerEvents: 'none' }}>
              <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <span style={{ color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                Yoga Philosophy
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                योगश्चित्तवृत्तिनिरोधः।
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                Yogaś citta-vṛtti-nirodhaḥ.
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '60%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  (Yoga is the cessation of the modifications of the mind.)
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* 3. PATHWAYS TO INNER PEACE - MUTED SAGE GREEN TABBED SECTION (Exact /spaces Sanctum Zones Layout) */}
      <section id="pathways" style={{
        padding: '4.5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine, #5E2735)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '5rem'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ PATHWAYS TO INNER PEACE
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: 0, fontWeight: 700 }}>
              Yogic Practices &amp; Modalities
            </h2>
            <p style={{ color: '#ffffff', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: '0.4rem 0 0 0' }}>
              Explore our comprehensive range of yogic practices designed to align body, breath, and mind.
            </p>
          </div>

          {/* Category Selector Tabs (Matching /spaces Pill Buttons) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.2rem' }}>
            {[
              { id: 'core', label: 'Core Practices', icon: Sun },
              { id: 'therapeutic', label: 'Therapeutic & Restorative', icon: Moon },
              { id: 'specialized', label: 'Specialized Sessions', icon: Heart }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '24px',
                    border: isActive ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.25)',
                    backgroundColor: isActive ? 'var(--wine, #5E2735)' : 'rgba(255, 255, 255, 0.88)',
                    color: isActive ? '#ffffff' : 'var(--wine, #5E2735)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 18px rgba(94, 39, 53, 0.22)' : '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <IconComp size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Pure White Rounded Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}
            >
              {activeTab === 'core' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Asana" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ POSTURES</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>PHYSICAL INTEGRATION</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Asana</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Physical postures for building core strength, alignment, and flexibility.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Posture &amp; muscular endurance</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Pranayama" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ BREATH WORK</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>VITAL ENERGY CONTROL</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Pranayama</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Breath control techniques for regulating vital energy and calming the mind.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Respiratory &amp; prana balance</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Meditation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ MINDFULNESS</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>MENTAL CLARITY</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Meditation</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Guided mindfulness techniques for cultivating profound mental stillness.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Emotional equilibrium &amp; focus</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Kriya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ PURIFICATION</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>INTERNAL CLEANSING</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Kriya</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Cleansing techniques designed for internal bodily and energetic purification.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Systemic detox &amp; vital force</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Mudra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ ENERGY GESTURES</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>HAND SIGNALS</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Mudra</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Sacred hand gestures to seal and channel pranic energy pathways.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Subtle energy direction</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4056529/pexels-photo-4056529.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Bandha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ ENERGY LOCKS</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>INTERNAL POWER</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Bandha</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Internal energy locks for directing prana upward through the central channel.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Core activation &amp; vital retention</div>
                  </div>
                </>
              )}

              {activeTab === 'therapeutic' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Restorative Yoga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ RESTORATIVE</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>GENTLE RECOVERY</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Restorative Yoga</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Gentle supported poses for deep nervous system recovery.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Parasympathetic nerve reset</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Yoga Nidra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ PSYCHIC SLEEP</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>DEEP CONSCIOUS REST</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Yoga Nidra</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Psychic sleep for profound stress release.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Sleep restoration &amp; anxiety release</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sound Healing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ ACOUSTIC RESONANCE</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>VIBRATIONAL HARMONY</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Sound Healing</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Acoustic vibration resonance therapy.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Cellular vibration &amp; brainwave entrainment</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Chakra Balancing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ CHAKRA ALIGNMENT</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>SUBTLE ENERGY NODES</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Chakra Balancing</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Energy center alignment through breath &amp; meditation.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Subtle body alignment</div>
                  </div>
                </>
              )}

              {activeTab === 'specialized' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sunrise Riverfront Asanas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ RIVERFRONT</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>EARLY MORNING PRACTICE</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Sunrise Riverfront Asanas</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Early morning practice by the sacred Suvarnamukhi river.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Prana absorption &amp; solar energy</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sunset Trataka" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ TRATAKA</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>OPTIC CONCENTRATION</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Sunset Trataka</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Candle meditation for focused gaze &amp; optic calm.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Concentration &amp; vision clarity</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Customized Yoga Therapy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ 1-ON-1 CARE</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>THERAPEUTIC PRESCRIPTION</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Customized Yoga Therapy</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Personalized 1-on-1 yoga prescription for health conditions.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Individual medical alignment</div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Main Container Continued */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 4. UNION OF BODY, MIND & SOUL SECTION */}
        <section style={{ paddingTop: '3rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 700, margin: '0 0 1rem 0' }}>
              Union of Body, Mind &amp; Soul
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
              Yoga at Suprada is not just physical exercise; it is a disciplined science of living. Through the integration of breath (Pranayama), posture (Asana), and awareness (Meditation), we guide you towards a state of complete equilibrium. Our diverse offerings ensure that whether you seek physical healing, mental peace, or spiritual growth, there is a path for you.
            </p>
          </div>

          {/* Signature Program Card */}
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
                    <Sparkles size={13} style={{ color: 'var(--redwood, #B85645)' }} /> SIGNATURE PROGRAMME
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.8rem 0' }}>
                    Holistic Wellness Program
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    A 7-day immersive journey that anchors daily Yoga and Meditation practices with comprehensive wellness therapies. Perfect for those looking to deepen their practice and reset their lifestyle rhythms.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Daily Guided Yoga &amp; Meditation</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Advanced Pranayama Sessions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Wellness Assessment</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Satwik Nutrition Plan</span>
                    </div>
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
                  >
                    Begin Your Journey &rarr;
                  </button>
                </div>
              </div>

              <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '350px', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.1)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <img 
                  src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Holistic Wellness Yoga" 
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

        {/* 5. EXPLORE OTHER PROGRAMMES */}
        <div style={{ paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--wine, #5E2735)', textAlign: 'center', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.5rem' }}>
            Explore Other Programmes
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <button
              onClick={() => {
                onNavigate('programmes/naturopathy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.4rem 1.8rem',
                borderRadius: '20px',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ArrowLeft style={{ color: 'var(--wine, #5E2735)' }} size={24} />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, fontWeight: 600, margin: 0 }}>Previous</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Naturopathy</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                onNavigate('programmes/holistic-therapies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.4rem 1.8rem',
                borderRadius: '20px',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                textAlign: 'right',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, fontWeight: 600, margin: 0 }}>Next</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Holistic Therapies</p>
                </div>
                <ArrowRight style={{ color: 'var(--wine, #5E2735)' }} size={24} />
              </div>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
