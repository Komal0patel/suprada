import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Eye, User, Brain, ArrowRight, ArrowLeft, Droplets, Leaf, Sun, Award, Check, Sparkles,
  ChevronLeft, ChevronRight
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

export default function Naturopathy({ onNavigate }) {
  const [activeMassageTab, setActiveMassageTab] = useState('traditional');
  const [activeEarthTab, setActiveEarthTab] = useState('mud');

  const diagnosisRef = useRef(null);
  const massageRef = useRef(null);
  const earthRef = useRef(null);
  const hydroRef = useRef(null);
  const solarRef = useRef(null);

  const scrollTrack = (ref, direction) => {
    if (ref && ref.current) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
            <motion.span variants={wordVariant}>Naturopathy</motion.span>
            <motion.span variants={wordVariant} style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)' }}>
              &amp; Nature's Healing
            </motion.span>
          </h1>

          {/* Subtitle description */}
          <p style={{
            color: 'rgba(94, 39, 53, 0.88)',
            maxWidth: '680px',
            margin: '0 auto',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.65,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            A holistic system of healing that harnesses the body's innate wisdom through natural, drug-free therapies—restoring balance and vitality to every cell.
          </p>
        </motion.div>
      </section>

      {/* Main Page Container */}
      <div className="pillar-main-container" style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 2. ABOUT NATUROPATHY SECTION - Centered for both desktop and mobile */}
        <section style={{ marginBottom: '5rem' }}>
          <div className="pillar-about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.08)',
                border: '1.5px solid rgba(94, 39, 53, 0.12)',
                backgroundColor: '#ffffff',
                width: '100%',
                minHeight: '320px',
                margin: '0 auto'
              }}
            >
              <img 
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop" 
                alt="Naturopathy treatments with natural herbs and wellness elements" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px', maxHeight: '460px', display: 'block' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--redwood, #B85645)', marginBottom: '0.5rem', display: 'block' }}>
                DRUGLESS NATURAL MEDICINE
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 1.2rem 0', fontWeight: 700, lineHeight: 1.2 }}>
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Naturopathy</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Naturopathy is a holistic system of healing that harnesses the body's innate ability to heal itself through natural, drug-free therapies. At Suprada Wellness, our naturopathy programmes combine time-tested natural treatments with modern wellness practices to detoxify, restore balance, and rejuvenate your entire being.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
                Through the therapeutic use of natural elements—water, mud, air, sunlight, and diet—we address the root causes of illness rather than just symptoms, promoting lasting health and vitality.
              </p>
            </motion.div>
          </div>

          {/* Nature's Wisdom Sanskrit Banner */}
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
                Nature's Wisdom
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                प्रकृतिरेव भेषजम्।
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                Prakṛtireva bheṣajam.
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '50%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  (Nature itself is the medicine.)
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. EXCLUSIVE TO SUPRADA WELLNESS - DIAGNOSIS SECTION (Matching Suprada Residences Cards in /spaces) */}
        <section id="diagnostics" style={{ marginBottom: '5rem', scrollMarginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--wine, #5E2735)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              border: '1.5px solid rgba(94, 39, 53, 0.2)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.4rem 1.4rem',
              borderRadius: '30px',
              marginBottom: '1rem'
            }}>
              ✦ EXCLUSIVE TO SUPRADA WELLNESS
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.8rem 0', fontWeight: 700 }}>
              Naturopathy <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Diagnosis</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
              A comprehensive three-step diagnostic approach that reveals your body's inner story through the windows of your eyes, face, and physical coordination.
            </p>
          </div>

          {/* Navigation Arrows for Mobile */}
          <div className="carousel-nav-arrows-container">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(diagnosisRef, 'left')}
              aria-label="Scroll diagnosis cards left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(diagnosisRef, 'right')}
              aria-label="Scroll diagnosis cards right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 3 Diagnostic Cards Horizontal Track */}
          <div ref={diagnosisRef} className="diagnosis-horizontal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
            
            {/* Iris Diagnosis */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.05)',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '190px', marginBottom: '1.4rem', position: 'relative' }}>
                  <img 
                    src="https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Iris Diagnosis" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.7rem', fontWeight: 800, padding: '0.35rem 0.85rem', borderRadius: '15px' }}>
                    ✦ EYE DIAGNOSIS
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>
                  OCULAR ASSESSMENT
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                  Iris Diagnosis
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: '0 0 1.2rem 0' }}>
                  The eyes are windows to your internal health. Our expert practitioners analyze the unique patterns, colors, and markings in your iris to identify organ strengths, weaknesses, and potential health imbalances long before symptoms appear.
                </p>
              </div>

              <div style={{ paddingTop: '0.8rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>
                Key Focus: Organ mapping &amp; constitution mapping
              </div>
            </motion.div>

            {/* Facial Diagnosis */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.05)',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '190px', marginBottom: '1.4rem', position: 'relative' }}>
                  <img 
                    src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Facial Diagnosis" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.7rem', fontWeight: 800, padding: '0.35rem 0.85rem', borderRadius: '15px' }}>
                    ✦ FACIAL MAPPING
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>
                  SKIN &amp; TISSUE REFLEXES
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                  Facial Diagnosis
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: '0 0 1.2rem 0' }}>
                  Your face reflects your body's constitution and current state. Through detailed facial mapping, we assess skin texture, color variations, and subtle markers that reveal digestive health, hormonal balance, and emotional well-being.
                </p>
              </div>

              <div style={{ paddingTop: '0.8rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>
                Key Focus: Gut health &amp; metabolic evaluation
              </div>
            </motion.div>

            {/* Body Mind Co-ordination */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.05)',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '190px', marginBottom: '1.4rem', position: 'relative' }}>
                  <img 
                    src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Body Mind Coordination" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.7rem', fontWeight: 800, padding: '0.35rem 0.85rem', borderRadius: '15px' }}>
                    ✦ SOMATIC HARMONY
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>
                  NEUROMUSCULAR CLARITY
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.6rem 0' }}>
                  Body Mind Co-ordination
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: '0 0 1.2rem 0' }}>
                  The connection between physical movements and mental clarity tells a powerful story. Through specialized assessments, we evaluate posture, balance, coordination, and reflex responses to understand the harmony between your body and mind.
                </p>
              </div>

              <div style={{ paddingTop: '0.8rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>
                Key Focus: Nervous system &amp; postural balance
              </div>
            </motion.div>
          </div>

          {/* Diagnostic Complementary Note */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#ffffff',
              padding: '1.8rem 2.2rem',
              borderRadius: '24px',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)',
              maxWidth: '850px'
            }}>
              <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.9, lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: 'var(--wine, #5E2735)' }}>Complementing our core diagnostic pillars of Iris, Facial, and Body-Mind Coordination,</strong> we integrate advanced methodologies including Lifestyle Analysis, Physical Examination, Nutrition Evaluation, Mud Diagnosis, Laboratory Testing, and Body Impedance Analysis (BIA) to ensure a holistic and precise Naturopathy assessment.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 4. MUTED SAGE GREEN TABBED SECTION - Therapeutic Massages (Exact /spaces Sanctum Zones Layout) */}
      <section style={{
        padding: '4.5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine, #5E2735)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ THE TREATMENT ZONES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: 0, fontWeight: 700 }}>
              Therapeutic Massages &amp; Body Work
            </h2>
            <p style={{ color: '#ffffff', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: '0.4rem 0 0 0' }}>
              The Art of Healing Touch
            </p>
          </div>

          {/* Category Selector Tabs in Single Line */}
          <div className="single-line-horizontal-tabs">
            {[
              { id: 'traditional', label: 'Traditional' },
              { id: 'global', label: 'Global Techniques' },
              { id: 'specialized', label: 'Specialized Care' },
              { id: 'sensory', label: 'Skin & Sensory' }
            ].map(tab => {
              const isActive = activeMassageTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMassageTab(tab.id)}
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
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 18px rgba(94, 39, 53, 0.22)' : '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows for Mobile */}
          <div className="carousel-nav-arrows-container">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(massageRef, 'left')}
              aria-label="Scroll massage cards left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(massageRef, 'right')}
              aria-label="Scroll massage cards right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pure White Rounded Cards Grid Horizontal Track */}
          <AnimatePresence mode="wait">
            <motion.div
              ref={massageRef}
              key={activeMassageTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="massage-horizontal-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}
            >
              {activeMassageTab === 'traditional' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Powder Vibrio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ MUD &amp; DRY</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>VIBRATIONAL DETOX</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Powder Vibrio</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Dry vibration therapy targeting deep lymphatic drainage and cellular stimulation.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Lymphatic flush &amp; skin revival</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Partial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ LOCALIZED</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>TARGETED RELIEF</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Partial</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Localized healing focus for specific pain points, back, or joint stiffness.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Pain management &amp; muscle knots</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3757958/pexels-photo-3757958.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Deep Tissue" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ INTENSIVE</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>MUSCLE RELEASE</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Deep Tissue</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Releases chronic muscle tension through deep pressure along muscle fibers.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Structural balance &amp; flexibility</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4056452/pexels-photo-4056452.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Reflexology" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ REFLEX POINTS</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>FOOT &amp; PALM PRESSURE</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Reflexology</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Targeted foot and palm pressure points corresponding to major internal organs.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Organ stimulation &amp; nerve relaxation</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Acumassage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ MERIDIAN</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>ACUPRESSURE FLOW</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Acumassage</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Harmonizes energy pathways by applying precise finger pressure to key acupoints.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Energy channel balance</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Shiatsu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ JAPANESE ART</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>TRADITIONAL SHIATSU</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Shiatsu</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Japanese thumb and palm pressure technique restoring body equilibrium.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Vital force balance &amp; flexibility</div>
                  </div>
                </>
              )}

              {activeMassageTab === 'global' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Swedish" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ CLASSIC FLOW</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>GENTLE RELAXATION</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Swedish Massage</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Gentle, long gliding strokes designed to enhance oxygen flow and calm nervous system.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Circulation &amp; stress reduction</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Thai Yoga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ PASSIVE YOGA</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>ASSISTED STRETCHING</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Thai Yoga Massage</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Combines passive stretching and rhythmic compression along Sen energy lines.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Joint mobility &amp; energy release</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Lymphatic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ DETOX STROKES</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>SYSTEMIC FLUSH</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Lymphatic Drainage</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Rhythmic, light strokes encouraging fluid drainage and metabolic waste clearance.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Edema reduction &amp; immune support</div>
                  </div>
                </>
              )}

              {activeMassageTab === 'specialized' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4506166/pexels-photo-4506166.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Spinal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ VERTEBRAL</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>POSTURAL REALIGNMENT</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Spine &amp; Joint Therapy</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Vertebral relaxation, soft traction, and targeted paraspinal muscle release.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Spinal decompression &amp; nerve health</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Abdominal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ VISCERAL</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>GUT HEALTH RELEASE</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Abdominal Massage</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Solar plexus &amp; gut release promoting gastrointestinal motility and visceral tension relief.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Digestive harmony &amp; motility</div>
                  </div>
                </>
              )}

              {activeMassageTab === 'sensory' && (
                <>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Herbal Scrub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ BOTANICAL</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>SKIN POLISH</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Herbal Body Scrub</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Exfoliating botanical polish removing dead skin cells and encouraging microcirculation.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Epidermal renewal &amp; softness</div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}>
                    <div>
                      <div style={{ borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.2rem', position: 'relative' }}>
                        <img src="https://images.pexels.com/photos/6620935/pexels-photo-6620935.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Salt Glow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>✦ MINERAL RICH</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>MINERAL RENEWAL</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Salt Glow</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.55, margin: '0 0 1rem 0' }}>Mineral-rich salt crystals blended with therapeutic oils for deep skin glow.</p>
                    </div>
                    <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: Mineral absorption &amp; glow</div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Main Container Continued */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 5. HYDROTHERAPY SECTION */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--wine, #5E2735)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.4rem 1.4rem',
              borderRadius: '30px',
              marginBottom: '1rem',
              border: '1.5px solid rgba(94, 39, 53, 0.18)'
            }}>
              ✦ WATER HEALING MODALITIES
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.4rem 0', fontWeight: 700 }}>
              Hydrotherapy
            </h2>
            <p style={{ color: 'var(--redwood, #B85645)', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>
              Restoring Balance through Water
            </p>
          </div>

          {/* Navigation Arrows for Mobile */}
          <div className="carousel-nav-arrows-container">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(hydroRef, 'left')}
              aria-label="Scroll hydrotherapy cards left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(hydroRef, 'right')}
              aria-label="Scroll hydrotherapy cards right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div ref={hydroRef} className="hydro-horizontal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {[
              { title: 'Hip Bath', sub: '(Cold, Hot, Neutral, Graded, Alternative)' },
              { title: 'Immersion Bath', sub: '(Cold, Hot, Neutral, Graded, Turmeric & Neem, Epsom Salt, Asthma Bath)' },
              { title: 'Arm & Foot Bath', sub: '(Hot, Neutral)' },
              { title: 'Spinal Spray', sub: '(Cold, Hot, Neutral, Graded)' },
              { title: 'Jacuzzi', sub: '' },
              { title: 'Spiral Jet', sub: '' },
              { title: 'Douche', sub: '(Hot, Cold, Neutral)' },
              { title: 'Colon Hydrotherapy', sub: '' },
              { title: 'Foot Soak', sub: '(Hot, Neutral)' },
              { title: 'Enema', sub: '(Cold, Neutral, Buttermilk, Herbal)' },
              { title: 'Steam & Sauna Room', sub: '' },
              { title: 'Fomentation', sub: '(Ice, Hot)' }
            ].map((hydro, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem 1.6rem',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 20px rgba(94, 39, 53, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)', flexShrink: 0 }}>
                    <Droplets size={17} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                    {hydro.title}
                  </h4>
                </div>
                {hydro.sub && <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, marginLeft: '2.8rem', margin: 0, fontWeight: 500 }}>{hydro.sub}</p>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. EARTH THERAPIES SECTION */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--wine, #5E2735)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.4rem 1.4rem',
              borderRadius: '30px',
              marginBottom: '1rem',
              border: '1.5px solid rgba(94, 39, 53, 0.18)'
            }}>
              ✦ ELEMENTAL DETOX
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.4rem 0', fontWeight: 700 }}>
              Earth <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Therapies</span>
            </h2>
            <p style={{ color: 'var(--redwood, #B85645)', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>
              Grounding &amp; Detoxifying
            </p>
          </div>

          {/* Earth Tabs in Single Horizontal Line */}
          <div className="single-line-horizontal-tabs">
            <button
              onClick={() => setActiveEarthTab('mud')}
              style={{
                padding: '0.65rem 1.8rem',
                borderRadius: '24px',
                border: activeEarthTab === 'mud' ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.25)',
                backgroundColor: activeEarthTab === 'mud' ? 'var(--wine, #5E2735)' : '#ffffff',
                color: activeEarthTab === 'mud' ? '#ffffff' : 'var(--wine, #5E2735)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeEarthTab === 'mud' ? '0 6px 18px rgba(94, 39, 53, 0.2)' : 'none'
              }}
            >
              Mud Baths
            </button>
            <button
              onClick={() => setActiveEarthTab('packs')}
              style={{
                padding: '0.65rem 1.8rem',
                borderRadius: '24px',
                border: activeEarthTab === 'packs' ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.25)',
                backgroundColor: activeEarthTab === 'packs' ? 'var(--wine, #5E2735)' : '#ffffff',
                color: activeEarthTab === 'packs' ? '#ffffff' : 'var(--wine, #5E2735)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeEarthTab === 'packs' ? '0 6px 18px rgba(94, 39, 53, 0.2)' : 'none'
              }}
            >
              Natural Packs
            </button>
          </div>

          {/* Navigation Arrows for Mobile */}
          <div className="carousel-nav-arrows-container">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(earthRef, 'left')}
              aria-label="Scroll earth therapy cards left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(earthRef, 'right')}
              aria-label="Scroll earth therapy cards right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Earth Cards Horizontal Track (2x2 on Laptop, Carousel on Mobile) */}
          <AnimatePresence mode="wait">
            <motion.div
              ref={earthRef}
              key={activeEarthTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="pillar-balanced-grid-2col earth-horizontal-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}
            >
              {activeEarthTab === 'mud' ? (
                <>
                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>TOTAL BODY RESET</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Full Body Mud Bath</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Complete immersion for total detox, skin rejuvenation, and deep cooling of internal heat.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>LOCALIZED EMBRACE</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Partial Mud Application</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Targeted therapy for localized inflammation, joint pain relief, or specific skin conditions.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>THERMAL MINERALS</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Hot Mud Therapy</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Warm mineral-rich mud to relax stiff muscles, improve circulation, and soothe chronic aches.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>BOTANICAL FUSION</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Neem &amp; Turmeric Mud Bath</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Antiseptic herbal blend for enhanced skin health, allergy relief, and immunity boosting.</p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>DIGESTIVE COOLING</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Abdominal Mud Pack</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Cools digestive organs, treats gastritis, reduces abdominal heat, and relieves chronic constipation.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>OPTIC SOOTHING</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Ocular Eye Pack</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Reduces screen fatigue, cools optic nerves, removes eye strain, and clears mental fog.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>CRANIAL SERENITY</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Head Pack</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Soothes tension headaches, hyperactive thoughts, relieves stress, and promotes deep sleep.</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: '22px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.04)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>DERMAL RECOVERY</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Herbal Steam Pack &amp; Clay Face Pack</h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Botanical steam infusion and natural clay face pack for deep skin detoxification and radiance.</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 7. SOLAR & THERMAL THERAPIES SECTION */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--wine, #5E2735)',
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.4rem 1.4rem',
              borderRadius: '30px',
              marginBottom: '1rem',
              border: '1.5px solid rgba(94, 39, 53, 0.18)'
            }}>
              ✦ SOLAR ENERGY
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: '0 0 0.4rem 0', fontWeight: 700 }}>
              Solar &amp; Thermal Therapies
            </h2>
            <p style={{ color: 'var(--redwood, #B85645)', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>
              Harnessing the Power of Heat &amp; Light
            </p>
          </div>

          {/* Navigation Arrows for Mobile */}
          <div className="carousel-nav-arrows-container">
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(solarRef, 'left')}
              aria-label="Scroll solar therapy cards left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={() => scrollTrack(solarRef, 'right')}
              aria-label="Scroll solar therapy cards right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div ref={solarRef} className="solar-horizontal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div whileHover={{ y: -6 }} style={{ backgroundColor: '#ffffff', padding: '2.2rem 1.8rem', borderRadius: '24px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 1.2rem auto', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                  <Sun size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.8rem 0' }}>Sun Bath</h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, margin: 0 }}>
                  Exposure to gentle sunlight to boost Vitamin D, improve circulation, and enhance mood naturally.
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} style={{ backgroundColor: '#ffffff', padding: '2.2rem 1.8rem', borderRadius: '24px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 1.2rem auto', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                  <Leaf size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.8rem 0' }}>Atapasnana</h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, margin: 0 }}>
                  Therapeutic sun bath wrapped in fresh banana leaves to deeply detoxify through profuse sweating.
                </p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} style={{ backgroundColor: '#ffffff', padding: '2.2rem 1.8rem', borderRadius: '24px', border: '1.5px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 1.2rem auto', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                  <Droplets size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.8rem 0' }}>Sauna &amp; Ozone</h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, margin: 0 }}>
                  Dry heat and activated ozone therapy to cleanse pores, relax deep muscles, and oxygenate tissues.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. HOLISTIC EXPERIENTIAL SECTION */}
        <section style={{ paddingTop: '3rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 700, margin: '0 0 1rem 0' }}>
              The Holistic Naturopathy Experience
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
              Our Naturopathy programme creates a complete healing ecosystem by weaving together these four pillars of nature cure. From the tension-relieving touch of <strong style={{ color: 'var(--wine, #5E2735)' }}>Therapeutic Massages</strong> to the revitalizing flow of <strong style={{ color: 'var(--wine, #5E2735)' }}>Hydrotherapy</strong>, the grounding embrace of <strong style={{ color: 'var(--wine, #5E2735)' }}>Earth Therapies</strong>, and the energizing warmth of <strong style={{ color: 'var(--wine, #5E2735)' }}>Solar Treatments</strong>, every element works in harmony. This integrated approach ensures deep detoxification, restored balance, and a renewed sense of vitality, addressing the root of well-being rather than just symptoms.
            </p>
          </div>

          {/* Signature Program Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pillar-signature-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '2.5rem',
              border: '1.5px solid rgba(94, 39, 53, 0.15)',
              boxShadow: '0 14px 40px rgba(94, 39, 53, 0.08)'
            }}
          >
            <div className="pillar-signature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
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
                    Detox &amp; Cleansing Program
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Experience the full power of Naturopathy in our signature 7-21 day Detox Program. This comprehensive journey integrates daily hydrotherapy, mud packs, and specialized massages with fasting therapy and detox diets to deeply cleanse your system and reset your biological rhythm.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Daily Naturopathy Treatments</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Colon Hydrotherapy Sessions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                        <Check size={14} />
                      </div>
                      <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>Personalized Detox Diet</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => onNavigate('book', { programme: 'naturopathy' })}
                    className="pillar-signature-btn"
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

              <div className="pillar-signature-img-box" style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '350px', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.1)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <img 
                  src="https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Detox Program Naturopathy" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="pillar-signature-price-badge" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '0.8rem 1.2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(94, 39, 53, 0.15)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Starting from</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>7 / 14 / 21 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 9. EXPLORE OTHER PROGRAMMES - 1 Line on Mobile */}
        <div style={{ paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--wine, #5E2735)', textAlign: 'center', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.5rem' }}>
            Explore Other Programmes
          </h3>
          <div className="pillar-bottom-nav-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <button
              onClick={() => {
                onNavigate('programmes/ayurveda');
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <ArrowLeft style={{ color: 'var(--wine, #5E2735)' }} size={20} />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, fontWeight: 600, margin: 0 }}>Previous</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Ayurveda</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                onNavigate('programmes/yoga-meditation');
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.8rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.6, fontWeight: 600, margin: 0 }}>Next</p>
                  <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Yoga &amp; Meditation</p>
                </div>
                <ArrowRight style={{ color: 'var(--wine, #5E2735)' }} size={20} />
              </div>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
