import React from 'react';
import { motion } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Sparkles, MapPin, Compass, Smile, Flame, Music, Palette, Mountain, Heart, Sun, Feather, TreePine, ArrowRight } from 'lucide-react';

const activitiesList = [
  { title: 'Mouna', desc: 'Therapeutic silence sessions for inner peace.', icon: Feather },
  { title: 'Pottery', desc: 'Creative expression through clay molding.', icon: Palette },
  { title: 'Conch Blowing', desc: 'Traditional practice for lung health and focus.', icon: Music },
  { title: 'Village Walks', desc: 'Explore the serene rural surroundings.', icon: TreePine },
  { title: 'Trekking', desc: 'Guided treks in nearby hills.', icon: Mountain },
  { title: 'Ashram Visit', desc: 'Spiritual visits to nearby ashrams.', icon: Compass },
  { title: 'Community Service', desc: 'Engage in meaningful service activities.', icon: Heart },
  { title: 'Painting', desc: 'Art therapy sessions.', icon: Palette },
  { title: 'Gardening', desc: 'Connect with nature through organic gardening.', icon: Sun },
  { title: 'Cooking Lessons', desc: 'Learn healthy, satwik cooking methods.', icon: Flame },
  { title: 'Acupressure Workshops', desc: 'Learn self-healing techniques.', icon: Sparkles },
  { title: 'Group Discussion', desc: 'Interactive wellness discussions.', icon: Smile },
  { title: 'Satsang', desc: 'Spiritual gathering and chanting.', icon: Music },
  { title: 'Cultural Activities', desc: 'Traditional performances and events.', icon: Sparkles },
  { title: 'Dance & Movement', desc: 'Expressive movement therapy and traditional dance forms.', icon: Sun },
  { title: 'Zen Sand Garden', desc: 'Mindful raking and contemplation in a meditative sand garden.', icon: Feather }
];

const localAttractions = [
  {
    name: 'Thottikallu Falls',
    desc: 'A tranquil waterfall nestled in lush greenery, offering a refreshing retreat and scenic views just a short drive from Suprada Wellness.',
    dist: 'Short drive'
  },
  {
    name: 'Bannerghatta National Park',
    desc: 'A renowned wildlife sanctuary offering immersive encounters with nature, home to diverse species and lush forest landscapes.',
    dist: '30 min drive'
  },
  {
    name: 'Savandurga Monolith',
    desc: 'One of the largest monolith hills in Asia, popular for trekking, rock climbing, and the sacred Narasimha Swamy temple.',
    dist: 'Day excursion'
  },
  {
    name: 'Mekedatu (Sangama)',
    desc: 'A stunning gorge where the Arkavathi river meets the Kaveri. Known for its rocky terrain, swirling waters and scenic beauty.',
    dist: 'Day excursion'
  },
  {
    name: 'Shivanasamudra Falls',
    desc: 'Famous twin waterfalls, Gaganachukki and Bharachukki, offering a spectacular view, especially during the monsoon season.',
    dist: 'Day excursion'
  },
  {
    name: 'Mysore Palace',
    desc: 'A historical palace known for its royal grandeur, intricate heritage architecture, and vibrant traditional Dasara celebrations.',
    dist: 'Day excursion'
  }
];

export default function Activities({ onNavigate }) {
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
            <span style={{
              color: 'var(--redwood)',
              fontSize: 'clamp(0.68rem, 1.5vw, 0.74rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '0.4rem'
            }}>
              ✦ Activities &amp; Local Attractions ✦
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
              Enrich Your Stay with <br />
              <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Meaningful Engagement</span>
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
              Immerse yourself in a variety of curated activities designed to nurture your creativity, spirituality, physical vitality, and deep connection with nature.
            </motion.p>
          </motion.div>

          <motion.button
            onClick={() => onNavigate('contact')}
            className="btn-luxury"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '0.7rem 1.6rem', fontSize: '0.8rem' }}
          >
            Book Your Stay <ArrowRight size={14} />
          </motion.button>
        </div>
      </section>

      {/* 2. 16 RETREAT ACTIVITIES GRID */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Daily Immersive Practices ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
              Activities at Suprada
            </h2>
            <p className="body-paragraph">
              Nurture your soul with silent contemplation, pottery, art therapy, breath practices, and sacred community gatherings.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.8rem'
          }}>
            {activitiesList.map((act, idx) => {
              const IconComp = act.icon;
              return (
                <motion.div
                  key={act.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '2rem 1.6rem',
                    border: '1px solid rgba(94,39,53,0.08)',
                    boxShadow: '0 8px 25px rgba(94,39,53,0.04)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(94,39,53,0.12)' }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(94,39,53,0.06)',
                    color: 'var(--wine)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.2rem'
                  }}>
                    <IconComp size={22} />
                  </div>

                  <h3 className="card-heading" style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                    {act.title}
                  </h3>

                  <p className="body-paragraph" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {act.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. LOCAL ATTRACTIONS & EXCURSIONS */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--isabelline)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Beyond the Sanctuary ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
              Local Attractions & Excursions
            </h2>
            <p className="body-paragraph">
              Explore the rich cultural, natural, and spiritual heritage surrounding Suprada Wellness Estate by the sacred Suvarnamukhi river.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {localAttractions.map((att, aIdx) => (
              <motion.div
                key={att.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: aIdx * 0.1 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '2.2rem 1.8rem',
                  border: '1.5px solid rgba(94,39,53,0.1)',
                  boxShadow: '0 12px 30px rgba(94,39,53,0.05)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--redwood)',
                    backgroundColor: 'rgba(184,86,69,0.08)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <MapPin size={12} /> {att.dist}
                  </span>
                </div>

                <h3 className="card-heading" style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>
                  {att.name}
                </h3>

                <p className="body-paragraph" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {att.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
