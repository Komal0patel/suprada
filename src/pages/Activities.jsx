import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Compass, Smile, Flame, Music, Palette, Mountain, Heart, Sun, Feather, TreePine } from 'lucide-react';

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
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 1.5rem 5rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(42, 14, 24, 0.78), rgba(42, 14, 24, 0.88)), url("/assets/more_images/art_therapy.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#ffffff'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(234,169,54,0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}
        >
          <span style={{
            display: 'inline-block',
            color: 'var(--harvest-gold)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            border: '1px solid rgba(234,169,54,0.3)',
            padding: '0.4rem 1.2rem',
            borderRadius: '50px',
            background: 'rgba(94,39,53,0.4)',
            backdropFilter: 'blur(8px)'
          }}>
            ✦ Activities & Local Attractions ✦
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--tan)',
            marginBottom: '1.8rem',
            textShadow: '0 4px 16px rgba(0,0,0,0.6)'
          }}>
            Enrich Your Stay with Meaningful Engagement.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.8,
            color: 'rgba(230,211,192,0.92)',
            marginBottom: '2.5rem',
            fontWeight: 400
          }}>
            Immerse yourself in a variety of curated activities designed to nurture your creativity, spirituality, physical vitality, and deep connection with nature.
          </p>

          <button
            onClick={() => onNavigate('contact')}
            className="btn-luxury"
            style={{ padding: '0.9rem 2.4rem', fontSize: '0.85rem' }}
          >
            Plan Your Stay
          </button>
        </motion.div>
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
