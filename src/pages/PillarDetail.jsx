import React from 'react';
import { motion } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, CheckCircle2, Leaf, Sun, Activity, Compass } from 'lucide-react';

const pillarDataMap = {
  'naturopathy': {
    title: 'Naturopathy',
    sanskrit: 'पञ्चमहाभूत — Prakṛtireva Bheṣajam',
    subtitle: 'Nature is the ultimate healer — drugless, holistic restoration',
    image: '/assets/more_images/retreat.png',
    desc: 'Naturopathy at Suprada utilizes the healing power of the Five Great Elements (Panchamahabhutas — Earth, Water, Fire, Air, Ether) to stimulate the body’s innate self-repair mechanism without synthetic drugs.',
    therapies: [
      { title: 'Full Body Mud Bath & Packs', desc: 'Enriched therapeutic mud absorbs toxins, cools internal organs, and rejuvenates skin texture.' },
      { title: 'Hydrotherapy & Spinal Spray', desc: 'Temperature-controlled water jets stimulate blood circulation, relieve spinal stress, and calm nerves.' },
      { title: 'Fasting & Juice Therapy', desc: 'Physician-guided liquid fasting resets digestive fire (Agni) and accelerates cellular repair.' },
      { title: 'Chromotherapy & Sun Bathing', desc: 'Solarized water and colored light frequencies harmonize glandular functions and boost vitamin D.' }
    ]
  },
  'yoga-meditation': {
    title: 'Yoga & Meditation',
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः — Yogas Chitta Vritti Nirodhah',
    subtitle: 'Riverfront movement, pranayama, and meditative awareness',
    image: '/assets/more_images/yoga-meditation.jpg',
    desc: 'Our riverfront yoga shala by the sacred Suvarnamukhi provides a tranquil sanctuary for breath-led movement, internal cleansing kriyas, and deep meditative stillness.',
    therapies: [
      { title: 'Sunrise Hatha & Kriya Yoga', desc: 'Gentle asana practices synchronized with sunrise light to enliven physical strength and flexibility.' },
      { title: 'Pranayama & Shatkarma Kriyas', desc: 'Nadi Shodhana, Kapalabhati, and Jala Neti to purify respiratory passages and balance subtle energy channels.' },
      { title: 'Yoga Nidra Deep Relaxation', desc: 'Guided psychic sleep practice relieving subconscious tension and recalibrating the nervous system.' },
      { title: 'Riverfront Sunrise Meditation', desc: 'Mindful awareness sessions accompanied by the soothing acoustic soundscape of flowing water.' }
    ]
  },
  'holistic-therapies': {
    title: 'Holistic Therapies',
    sanskrit: 'Integrative Vibrational & Sensory Healing',
    subtitle: 'Harmonizing body frequencies through sound, touch, and light',
    image: '/assets/more_images/sound_healing.png',
    desc: 'Complementing clinical care, our holistic therapies work on subtle energy meridians, sensory relaxation, and emotional release to support total well-being.',
    therapies: [
      { title: 'Singing Bowl & Gong Sound Bath', desc: 'Pure acoustic vibrations resonate with brainwaves to induce deep theta states and cellular healing.' },
      { title: 'Acupuncture & Reflexology', desc: 'Fine needle stimulation and foot pressure point therapy to clear meridian blockages and relieve pain.' },
      { title: 'Expressive Art & Clay Therapy', desc: 'Mindful pottery and painting sessions enabling non-verbal emotional release and creative joy.' },
      { title: 'Zen Sand & Sensory Walking', desc: 'Grounding barefoot practices on natural sand and grass to discharge electromagnetic stress.' }
    ]
  },
  'nutrition-lifestyle': {
    title: 'Nutrition & Lifestyle',
    sanskrit: 'आहारशुद्धौ सत्त्वशुद्धिः — Ahāraśuddhau Sattvaśuddhiḥ',
    subtitle: 'Pure organic satwik meals tailored to your body type',
    image: '/assets/more_images/nutrition.png',
    desc: 'Food is medicine at Suprada. We craft personal farm-to-table culinary plans that nourish your unique constitution and support long-term digestive vitality.',
    therapies: [
      { title: 'Farm-to-Table Satwik Dining', desc: 'Freshly harvested organic vegetables and herbs prepared daily with traditional wholesome methods.' },
      { title: 'Personalized Dosha & Body-Type Menus', desc: 'Custom meals formulated by resident nutritionists to balance metabolic tendencies.' },
      { title: 'Cold-Pressed Therapeutic Juices', desc: 'Enzyme-rich botanical juices to cleanse kidneys, liver, and blood vessels.' },
      { title: 'Nandi Battalu Culinary Workshops', desc: 'Learn satwik recipes, juicing guidelines, and meal timing to maintain health at home.' }
    ]
  },
  'mental-emotional': {
    title: 'Mental & Emotional Well-Being',
    sanskrit: 'मनः प्रशमनोपायो योग इत्यभिधीयते',
    subtitle: 'Nurturing inner peace, emotional release, and quiet rest',
    image: '/assets/more_images/art_therapy.png',
    desc: 'Mental health is foundational to physical recovery. Through silent contemplation, psychological counselling, and nature immersion, we help you release mental fatigue.',
    therapies: [
      { title: 'Mouna (Therapeutic Silence)', desc: 'Dedicated periods of silent reflection to quiet internal dialogue and conserve mental energy.' },
      { title: 'Shinrin-yoku (Nature Forest Bathing)', desc: 'Guided slow walks through lush estate gardens to reduce cortisol and elevate serotonin levels.' },
      { title: 'Mindfulness & Stress Counselling', desc: 'One-on-one sessions with experienced counsellors to process emotional blocks and anxiety.' },
      { title: 'Flute & Acoustic Resonance', desc: 'Soothing musical therapy sessions performed in serene natural outdoor spaces.' }
    ]
  },
  'detox-cleansing': {
    title: 'Detox & Cleansing',
    sanskrit: 'शरीरशोधन — Deep Cellular Purification',
    subtitle: 'Purifying metabolic waste to renew energy and immunity',
    image: '/assets/more_images/gograsa.png',
    desc: 'Our systematic detoxification protocols remove accumulated metabolic waste (Ama) from the digestive tract, liver, skin, and lymphatic system.',
    therapies: [
      { title: 'Colon Hydrotherapy', desc: 'Gentle warm water intestinal cleansing supervised by medical experts to restore gut flora balance.' },
      { title: 'Iris & Facial Diagnostics', desc: 'Non-invasive organ assessment to detect tissue congestion and target detox therapies.' },
      { title: 'Full Body Herbal Wraps', desc: 'Detoxifying clay and herb wraps that stimulate sweat glands and draw out heavy metals.' },
      { title: 'Herbal Steam Baths', desc: 'Therapeutic steam infused with eucalyptus and neem to open pores and enhance circulation.' }
    ]
  },
  'physiotherapy': {
    title: 'Physiotherapy',
    sanskrit: 'Reconstructive Biomechanical Rehabilitation',
    subtitle: 'Restoring joint mobility, strength, and postural alignment',
    image: '/assets/more_images/walking_track.png',
    desc: 'Combining modern physical therapy with natural hydro-exercise and therapeutic massage, our physiotherapists relieve chronic pain and improve movement flexibility.',
    therapies: [
      { title: 'Spinal Decompression & Traction', desc: 'Targeted relief for herniated discs, sciatica, and chronic neck/back stiffness.' },
      { title: 'Hydro-Physiotherapy Pool Sessions', desc: 'Buoyancy-assisted aquatic exercises that reduce joint strain while rebuilding muscle strength.' },
      { title: 'Deep Tissue & Myofascial Release', desc: 'Therapeutic manual pressure to break up muscle knots and restore fascia elasticity.' },
      { title: 'Ergonomic & Postural Realignment', desc: 'Custom corrective exercise routines to rectify postural imbalances caused by desk work.' }
    ]
  },
  'ayurveda': {
    title: 'Ayurveda',
    sanskrit: 'आयुर्वेद — Ancient Science of Longevity',
    subtitle: 'Classical Vedic therapies for Vata, Pitta, and Kapha balance',
    image: '/assets/more_images/spa-interior.jpg',
    desc: 'Experience time-tested Ayurvedic therapies using authentic medicated oils, warm herbal compresses, and traditional bodywork under expert supervision.',
    therapies: [
      { title: 'Shirodhara (Oil Pouring Therapy)', desc: 'Continuous stream of warm herbal oil over the forehead to soothe the central nervous system and cure insomnia.' },
      { title: 'Abhyanga (Therapeutic Herbal Oil Massage)', desc: 'Synchronized full body massage with dosha-specific oils to enhance lymphatic flow and nourish skin.' },
      { title: 'Udvartana (Herbal Powder Scrub)', desc: 'Deep herbal powder massage that breaks down subcutaneous fat, improves skin tone, and boosts metabolism.' },
      { title: 'Janu & Kati Basti', desc: 'Warm medicated oil reservoirs placed over knees or spine to relieve deep joint pain and stiffness.' }
    ]
  }
};

export default function PillarDetail({ pillarId, onNavigate }) {
  const data = pillarDataMap[pillarId] || pillarDataMap['naturopathy'];

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
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />

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
            width: 'clamp(340px, 80vw, 540px)', height: 'clamp(340px, 80vw, 540px)',
            opacity: 0.08,
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
              ✦ Pillar of Wellness ✦
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
                margin: '0 0 0.4rem 0',
                lineHeight: 1.15
              }}
            >
              {data.title}
            </motion.h1>

            <p style={{
              fontSize: '0.88rem',
              fontStyle: 'italic',
              color: 'var(--redwood)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginBottom: '1rem'
            }}>
              {data.sanskrit}
            </p>

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
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '0.7rem 1.6rem', fontSize: '0.8rem' }}
            >
              Book Therapy Consultation <ArrowRight size={14} />
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
              Explore Packages
            </motion.button>
          </div>
        </div>
      </section>

      {/* OVERVIEW & KEY THERAPIES */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Healing Philosophy ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1.2rem' }}>
              The Path of {data.title}
            </h2>
            <p className="body-paragraph" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
              {data.desc}
            </p>
          </div>

          {/* Key Therapies Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '2rem'
          }}>
            {data.therapies.map((t, idx) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  padding: '2.2rem 1.8rem',
                  border: '1.5px solid rgba(94,39,53,0.08)',
                  boxShadow: '0 10px 30px rgba(94,39,53,0.05)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ y: -6, borderColor: 'var(--wine)' }}
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
                  <Leaf size={22} />
                </div>

                <h3 className="card-heading" style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>
                  {t.title}
                </h3>

                <p className="body-paragraph" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '0.9rem 2.5rem' }}
            >
              Consult Our Wellness Doctors
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
