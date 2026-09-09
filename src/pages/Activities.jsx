import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tent, Sparkles, Palette, Music, Footprints, Mountain, 
  Landmark, HandHeart, Sprout, ChefHat, Activity as ActivityIcon, 
  Users, Music2, MapPin, Car, Waves
} from 'lucide-react';

const activitiesList = [
  { title: 'Mouna', desc: 'Therapeutic silence sessions for inner peace', icon: Sparkles },
  { title: 'Pottery', desc: 'Creative expression through clay molding', icon: Palette },
  { title: 'Conch Blowing', desc: 'Traditional practice for lung health and focus', icon: Music },
  { title: 'Village Walks', desc: 'Explore the serene rural surroundings', icon: Footprints },
  { title: 'Trekking', desc: 'Guided treks in nearby hills', icon: Mountain },
  { title: 'Ashram Visit', desc: 'Spiritual visits to nearby ashrams', icon: Landmark },
  { title: 'Community Service', desc: 'Engage in meaningful service activities', icon: HandHeart },
  { title: 'Painting', desc: 'Art therapy sessions', icon: Palette },
  { title: 'Gardening', desc: 'Connect with nature through organic gardening', icon: Sprout },
  { title: 'Cooking Lessons', desc: 'Learn healthy, satwik cooking methods', icon: ChefHat },
  { title: 'Acupressure Workshops', desc: 'Learn self-healing techniques', icon: ActivityIcon },
  { title: 'Group Discussion', desc: 'Interactive wellness discussions', icon: Users },
  { title: 'Satsang', desc: 'Spiritual gathering and chanting', icon: Music },
  { title: 'Cultural Activities', desc: 'Traditional performances and events', icon: Tent },
  { title: 'Dance & Movement', desc: 'Expressive movement therapy and traditional dance forms', icon: Footprints },
  { title: 'Zen Sand Garden', desc: 'Mindful raking and contemplation in a meditative sand garden', icon: Waves }
];

const localAttractions = [
  {
    name: 'Thottikallu Falls',
    desc: 'A tranquil waterfall nestled in lush greenery, offering a refreshing retreat and scenic views just a short drive from Suprada Wellness.',
    dist: '7 km',
    time: '15 mins',
    image: '/assets/tkfalls.jpg'
  },
  {
    name: 'Bannerghatta National Park',
    desc: 'A renowned wildlife sanctuary offering immersive encounters with nature, home to diverse species and lush forest landscapes in the 30min drive from Suprada Wellness',
    dist: '20 km',
    time: '30 mins',
    image: '/assets/bannerghatta.jpeg'
  },
  {
    name: 'Savandurga',
    desc: 'One of the largest monolith hills in Asia, popular for trekking, rock climbing, and the Narasimha Swamy temple.',
    dist: '45 km',
    time: '1 hour 15 mins',
    image: '/assets/savandurga.jpg'
  },
  {
    name: 'Mekedatu (Sangama)',
    desc: 'A stunning gorge where the Arkavathi river meets the Kaveri. Known for its rocky terrain and scenic beauty.',
    dist: '70 km',
    time: '1 hour 30 mins',
    image: '/assets/mekedatu.jpg'
  },
  {
    name: 'Shivanasamudra Falls',
    desc: 'Famous twin waterfalls, Gaganachukki and Bharachukki, offering a spectacular view, especially during monsoon.',
    dist: '95 km',
    time: '1 hour 45 mins',
    image: '/assets/shivanasamudra.jpg'
  },
  {
    name: 'Mysore Palace',
    desc: 'A historical palace known for its grandeur, intricate architecture, and vibrant Dasara celebrations.',
    dist: '125 km',
    time: '2 hours',
    image: '/assets/mysore-palace.jpg'
  }
];

export default function Activities({ onNavigate }) {
  return (
    <div style={{ backgroundColor: '#fff5e9', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION (Maroon Gradient Theme matching Reference Site) */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(7rem, 14vh, 9rem)',
        paddingBottom: 'clamp(4rem, 8vh, 5.5rem)',
        background: 'linear-gradient(135deg, #632633 0%, #8b3a4a 100%)',
        overflow: 'hidden',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        {/* Subtle Background Mandala */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(180px, 30vw, 280px)',
          height: 'clamp(180px, 30vw, 280px)',
          opacity: 0.1,
          pointerEvents: 'none'
        }}>
          <motion.img 
            src="/assets/extracted/logo.svg" 
            alt="" 
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          {/* Top Circular Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '4.5rem',
              height: '4.5rem',
              margin: '0 auto 1.5rem auto',
              borderRadius: '50%',
              backgroundColor: 'rgba(226, 177, 89, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--harvest-gold, #e2b159)'
            }}
          >
            <Tent size={36} />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '0.75rem',
              lineHeight: 1.2
            }}
          >
            Activities &amp; Experiences
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(226, 177, 89, 0.95)',
              fontWeight: 500,
              maxWidth: '650px',
              margin: '0 auto'
            }}
          >
            Enrich Your Stay with Meaningful Engagement
          </motion.p>
        </div>
      </section>

      {/* 2. DAILY ACTIVITIES SECTION (No pictures, 16 Icon Cards in 4-column Grid) */}
      <section style={{ padding: 'clamp(4rem, 8vh, 6rem) 5%', backgroundColor: '#e7cfb5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto clamp(2.5rem, 5vh, 3.5rem)' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#632633',
              marginBottom: '0.75rem'
            }}>
              Daily <span style={{ color: 'var(--wine, #632633)' }}>Activities</span>
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(43, 44, 40, 0.82)',
              lineHeight: 1.6,
              margin: 0
            }}>
              Immerse yourself in a variety of activities designed to nurture your creativity, spirituality, and connection with nature.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {activitiesList.map((act, idx) => {
              const IconComp = act.icon;
              return (
                <motion.div
                  key={act.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
                  style={{
                    backgroundColor: '#fff5e9',
                    padding: '1.5rem',
                    borderRadius: '0.85rem',
                    border: '1px solid rgba(226, 177, 89, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                  whileHover={{
                    borderColor: 'rgba(226, 177, 89, 0.8)',
                    boxShadow: '0 10px 25px rgba(99, 38, 51, 0.08)',
                    y: -3
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: '#fbf6ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: '#632633'
                  }}>
                    <IconComp size={22} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#632633',
                    marginBottom: '0.5rem'
                  }}>
                    {act.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: 'rgba(43, 44, 40, 0.72)',
                    margin: 0
                  }}>
                    {act.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. PLACES OF INTEREST SECTION (Pictures, Distances, Time, No Button) */}
      <section style={{ padding: 'clamp(4rem, 8vh, 6rem) 5%', backgroundColor: '#fff5e9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto clamp(2.5rem, 5vh, 3.5rem)' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#632633',
              marginBottom: '0.75rem'
            }}>
              Places of <span style={{ color: 'var(--wine, #632633)' }}>Interest</span>
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(43, 44, 40, 0.82)',
              lineHeight: 1.6,
              margin: 0
            }}>
              Explore the rich cultural and natural heritage surrounding Suprada Wellness. Perfect for day trips or pre/post-program exploration.
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
                transition={{ duration: 0.45, delay: aIdx * 0.08 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 14px 32px rgba(99, 38, 51, 0.12)'
                }}
              >
                {/* Card Image */}
                <div style={{ height: '13rem', overflow: 'hidden' }}>
                  <img
                    src={att.image}
                    alt={att.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#632633',
                    marginBottom: '0.5rem'
                  }}>
                    {att.name}
                  </h3>

                  {/* Distance & Time Tags */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.85rem',
                    fontSize: '0.875rem',
                    color: 'rgba(43, 44, 40, 0.65)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={16} color="var(--wine, #632633)" />
                      <span>{att.dist}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Car size={16} color="var(--wine, #632633)" />
                      <span>{att.time}</span>
                    </div>
                  </div>

                  {/* Description (No buttons!) */}
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'rgba(43, 44, 40, 0.75)',
                    margin: 0,
                    flex: 1
                  }}>
                    {att.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
