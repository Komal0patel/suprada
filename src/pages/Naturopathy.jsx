import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Sun, Droplet, Flame, Wind, Feather } from 'lucide-react';
import { Pattern24, Pattern25, Pattern28 } from '../AnimatedPatterns';

const naturopathyCards = [
  {
    id: 'naturopathy',
    number: '01',
    category: 'DRUGLESS HEALING',
    title: 'Naturopathy',
    tagline: "Nature's Path to Healing & Rejuvenation",
    sanskritQuote: 'Prakṛtireva bheṣajam.',
    sanskritMeaning: 'Nature itself is the medicine.',
    description: 'Naturopathy is a holistic system of healing that harnesses the body\'s innate ability to heal itself through natural, drug-free therapies. At Suprada Wellness, our naturopathy programmes combine time-tested natural treatments with modern wellness practices to detoxify, restore balance, and rejuvenate your entire being.',
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Iris & Facial Mapping', '15+ Therapeutic Massages', 'Hydrotherapy & Spinal Spray', 'Full Body Earth Mud Baths'],
    details: {
      diagnostics: [
        { name: 'Iris Diagnosis (Iridology)', desc: 'Non-invasive examination of iris fibers to map organ health, tissue inflammation, and inherited constitutional weaknesses.' },
        { name: 'Facial & Tongue Mapping', desc: 'Ancient diagnostic facial markers revealing metabolic vitality and digestive fires.' },
        { name: 'Body Mind Co-ordination', desc: 'Holistic stress, autonomic nervous system, and emotional tension evaluation.' },
        { name: 'Body Impedance Analysis (BIA)', desc: 'Precision cellular hydration, visceral fat, body composition, and metabolic assessment.' }
      ],
      therapies: [
        { name: 'Therapeutic Massages Suite', list: ['Powder Vibrio (Udhwartana)', 'Deep Tissue Alignment', 'Reflexology', 'Acumassage', 'Shiatsu', 'Swedish Massage', 'Thai Yoga Massage'] },
        { name: 'Hydrotherapy Suite', list: ['Hip Bath & Immersion Baths (Neem, Turmeric, Epsom Salt)', 'Spinal Spray & Spinal Bath', 'Jacuzzi & Spiral Jet Bath', 'Colon Hydrotherapy', 'Herbal Steam & Finnish Sauna'] },
        { name: 'Earth & Mud Therapies', list: ['Full Body Mud Bath', 'Abdominal & Ocular Cooling Mud Packs', 'Sun & Helio Therapy'] }
      ]
    }
  },
  {
    id: 'yoga-meditation',
    number: '02',
    category: 'MIND-BODY HARMONY',
    title: 'Yoga & Meditation',
    tagline: 'Unite Body, Mind & Spirit',
    sanskritQuote: 'Yogaś citta-vṛtti-nirodhaḥ.',
    sanskritMeaning: 'Yoga is the cessation of the modifications of the mind.',
    description: 'Yoga and meditation are transformative practices that unite the body, mind, and spirit. At Suprada Wellness, we offer authentic yoga sessions guided by experienced instructors, combining classical Asanas (postures), Pranayama (breath work), and meditation techniques to cultivate physical strength, mental clarity, and emotional balance.',
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Classical Asana Flow', 'Pranayama Breath Control', 'Shatkarma Cleansing Kriyas', 'Yoga Nidra & Sound Rest'],
    details: {
      diagnostics: [
        { name: 'Prana & Vayu Assessment', desc: 'Evaluation of breath efficiency, diaphragmatic movement, and vital energy flow.' },
        { name: 'Postural & Spinal Alignment', desc: 'Structural assessment of spinal flexibility, core strength, and joint mobility.' }
      ],
      therapies: [
        { name: 'Asana Practice', list: ['Surya Namaskar at Sunrise', 'Gentle Hatha Flow', 'Restorative Yoga', 'Joint Warm-ups & Micro-movements'] },
        { name: 'Pranayama & Kriyas', list: ['Nadi Shodhana & Anulom Vilom', 'Bhastrika & Kapalabhati', 'Jala Neti & Kunjal Kriya', 'Bhramari & Guided Mind Retention'] }
      ]
    }
  },
  {
    id: 'holistic-therapies',
    number: '03',
    category: 'ENERGY MEDICINE',
    title: 'Holistic Therapies',
    tagline: 'Integrated Healing for Complete Wellness',
    sanskritQuote: 'Sarvaṁ khalvidaṁ brahma.',
    sanskritMeaning: 'All this is indeed the universal consciousness.',
    description: 'Our holistic therapies integrate diverse healing modalities from around the world to address your health from multiple dimensions. Combining ancient wisdom with modern techniques, we offer acupuncture, acupressure, energy healing, cupping therapy, music & sound healing and other complementary treatments designed to restore balance and promote deep healing.',
    image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Acupuncture & Reflexology', 'Tibetan Om Singing Bowls', 'Gong & Flute Sound Baths', 'Pranic & Reiki Energy Work'],
    details: {
      diagnostics: [
        { name: 'Meridian & Pressure Point Mapping', desc: 'Identifying energy blockages along chi meridians.' },
        { name: 'Acoustic Vibrational Resonance Test', desc: 'Assessing nervous system tension through acoustic sound frequencies.' }
      ],
      therapies: [
        { name: 'Energy Healing', list: ['Clinical Acupuncture', 'Foot & Hand Reflexology', 'Pranic Energy Balancing', 'Reiki Chakra Alignment'] },
        { name: 'Sound & Acoustic Healing', list: ['Tibetan Om Singing Bowls', 'Gong Acoustic Bath', 'Bamboo Flute Meditation', 'Vibrational Resonance Therapy'] }
      ]
    }
  },
  {
    id: 'nutrition-lifestyle',
    number: '04',
    category: 'SATWIK NOURISHMENT',
    title: 'Nutrition & Lifestyle',
    tagline: 'Nourish Your Body, Transform Your Life',
    sanskritQuote: 'Āhāraśuddhau sattvaśuddhiḥ.',
    sanskritMeaning: 'When food is pure, the mind becomes pure.',
    description: 'True wellness begins with what you put on your plate and how you live your daily life. Our nutrition and lifestyle programmes combine ancient dietary wisdom with modern nutritional science to create personalized plans that support your health goals, enhance vitality, and promote long-term well-being.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Farm-to-Table Satwik Meals', 'Gut Microbiome Repair', 'Cold-Pressed Juices', 'Therapeutic Bio-Fasting'],
    details: {
      diagnostics: [
        { name: 'Prakriti & Metabolic Assessment', desc: 'Customizing dietary plans to your unique metabolic dosha type.' },
        { name: 'Gut & Inflammatory Profile', desc: 'Evaluating digestive fires (Agni), gut microbiome health, and food intolerances.' }
      ],
      therapies: [
        { name: 'Satwik Dining', list: ['Organic Farm-to-Table Cuisine', 'Millet & Ancient Grain Recipes', 'Probiotic & Herbal Infusions', 'Anti-Inflammatory Soups'] },
        { name: 'Detox & Fasting', list: ['Therapeutic Bio-Fasting', 'Cold-Pressed Green Juices', 'Intermittent Gut Rest Protocols', 'Mindful Eating Workshops'] }
      ]
    }
  },
  {
    id: 'mental-wellbeing',
    number: '05',
    category: 'MINDFUL RESILIENCE',
    title: 'Mental & Emotional Well-Being',
    tagline: 'Nurture Your Mind, Heal Your Heart',
    sanskritQuote: 'Mana eva manuṣyāṇāṁ kāraṇaṁ bandhamokṣayoḥ.',
    sanskritMeaning: 'The mind alone is the cause of bondage and liberation.',
    description: 'Mental and emotional health are foundational to overall wellness. Our comprehensive programmes combine professional counselling, stress management techniques, breathwork, and mindfulness practices to help you navigate life\'s challenges with greater resilience, clarity, and inner peace.',
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Professional Counselling', 'Stress Resilience Training', 'Mindfulness & Meditation', 'Emotional Trauma Release'],
    details: {
      diagnostics: [
        { name: 'Autonomic Nervous System Evaluation', desc: 'Assessing sympathetic vs parasympathetic tone and stress reactivity.' },
        { name: 'Emotional Stress Mapping', desc: 'Identifying psychological stressors, anxiety patterns, and burnout triggers.' }
      ],
      therapies: [
        { name: 'Mindfulness & Therapy', list: ['Cognitive Wellness Counselling', 'Guided Mindfulness Meditation', 'Somatic Release Breathwork', 'Nature Grounding & Silence Retaining'] },
        { name: 'Stress Reduction', list: ['Progressive Muscle Relaxation', 'Aromatherapy Neural Calm', 'Biofeedback & Heart Rate Variability'] }
      ]
    }
  },
  {
    id: 'detox-cleansing',
    number: '06',
    category: 'CELLULAR PURIFICATION',
    title: 'Detox & Cleansing',
    tagline: 'Purify, Renew, Revitalize',
    sanskritQuote: 'Śuddhireva paramaṁ dharmaḥ.',
    sanskritMeaning: 'Purity is the highest virtue.',
    description: 'In our modern world, toxins accumulate from environmental pollutants, processed foods, stress, and lifestyle factors. Our comprehensive detoxification programmes use time-tested authentic therapies protocols, therapeutic fasting, and natural cleansing methods to eliminate accumulated toxins, restore cellular health, and rejuvenate your entire system.',
    image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Systemic Toxins Evaluation', 'Colon & Liver Cleansing', 'Herbal Bio-Steam Packs', 'Therapeutic Juice Fasting'],
    details: {
      diagnostics: [
        { name: 'Toxic Burden & Cellular Hydration Analysis', desc: 'Mapping metabolic waste accumulation and liver detoxification capacity.' },
        { name: 'Digestive Toxicity Assessment', desc: 'Evaluating Ama (accumulated toxins) in the gastrointestinal tract.' }
      ],
      therapies: [
        { name: 'Purification Therapies', list: ['Colon Hydrotherapy', 'Full Body Mud Wrap & Detox', 'Herbal Bio-Steam & Finnish Sauna', 'Enema Cleansing Protocols'] },
        { name: 'Detox Fasting', list: ['Therapeutic Juice Fasting', 'Kunjal & Shatkarma Kriyas', 'Herbal Liver Flush Infusions'] }
      ]
    }
  },
  {
    id: 'physiotherapy',
    number: '07',
    category: 'REHABILITATION & MOVEMENT',
    title: 'Physiotherapy',
    tagline: 'Restore Movement, Reclaim Life',
    sanskritQuote: 'Calanaṁ jīvanam.',
    sanskritMeaning: 'Movement is life.',
    description: 'Our physiotherapy programmes combine evidence-based rehabilitation techniques with holistic wellness principles to help you recover from injuries, manage chronic pain, and improve overall mobility. Our experienced physiotherapists create personalized treatment plans tailored to your specific condition and recovery goals.',
    image: 'https://images.pexels.com/photos/6111619/pexels-photo-6111619.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Postural Correction', 'Joint & Spinal Rehabilitation', 'Myofascial Trigger Release', 'Therapeutic Exercise Protocols'],
    details: {
      diagnostics: [
        { name: 'Kinesiological Motion & Gait Analysis', desc: 'Biomechanical examination of joint range of motion, muscle imbalance, and gait efficiency.' },
        { name: 'Spinal Alignment Assessment', desc: 'Detailed spinal curvature and nerve impingement testing.' }
      ],
      therapies: [
        { name: 'Rehabilitation Modalities', list: ['Manual Therapy & Joint Mobilization', 'Electrotherapy & Ultrasound', 'Myofascial Trigger Point Release', 'Therapeutic Hydro-Rehab'] },
        { name: 'Functional Conditioning', list: ['Core Stabilization Training', 'Postural Alignment Retraining', 'Ergonomic & Biomechanical Guidance'] }
      ]
    }
  },
  {
    id: 'ayurveda',
    number: '08',
    category: 'ANCIENT DOSHIC WISDOM',
    title: 'Ayurveda',
    tagline: 'Ancient Wisdom for Modern Wellness',
    sanskritQuote: 'Svasthasya svāsthyarakṣaṇaṁ.',
    sanskritMeaning: 'Preservation of health of the healthy.',
    description: 'Ayurveda, the 5,000-year-old "Science of Life," offers a comprehensive approach to health and wellness by balancing the three doshas—Vata, Pitta, and Kapha. At Suprada Wellness, our authentic Ayurvedic treatments combine classical therapies with personalized care to restore harmony, enhance immunity, and promote longevity.',
    image: 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    highlights: ['Nadi Pariksha Pulse Diagnosis', 'Shirodhara Oil Therapy', 'Abhyanga Oil Alignment', 'Kizhi Herbal Compress'],
    details: {
      diagnostics: [
        { name: 'Nadi Pariksha (Pulse Diagnosis)', desc: 'Ancient pulse assessment evaluating dosha imbalances (Vata, Pitta, Kapha) and organ vitality.' },
        { name: 'Prakriti & Vikriti Assessment', desc: 'Determining your innate constitutional type and current state of doshic imbalance.' }
      ],
      therapies: [
        { name: 'Classical Therapies', list: ['Shirodhara Warm Oil Therapy', 'Abhyanga Synchronized Massage', 'Kizhi Herbal Compress Massage', 'Nasya Herbal Nasal Cleansing'] },
        { name: 'Rejuvenation Protocols', list: ['Rasayana Anti-Aging Treatments', 'Kashaya Dhara Medicated Stream', 'Doshic Herbal Teas & Formulations'] }
      ]
    }
  }
];

export default function Naturopathy({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNaturopathyModal, setSelectedNaturopathyModal] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 960);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedNaturopathyModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      };
    }
  }, [selectedNaturopathyModal]);

  return (
    <div style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Main Cards Grid Section (Naturopathy Style) */}
      <section className="naturopathy-section-container luxury-clay" style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '7.5rem 5% 3rem 5%' : '8.5rem 7% 4.5rem 7%', backgroundColor: 'var(--antique-white)' }}>
        <Pattern28 style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.2rem auto' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>
              ✦ CORE MEDICAL MODALITIES
            </span>
            <h1 style={{ color: 'var(--wine)', lineHeight: 1.15, margin: '0 0 0.5rem 0', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 700 }}>
              Naturopathy <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>&amp; Holistic Wellness</em>
            </h1>
            <p style={{ fontSize: isMobile ? '0.92rem' : '1.05rem', color: 'var(--wine)', opacity: 0.88, margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
              Explore our core drugless medical modalities combining ancient Pancha Mahabhuta therapies, hydro-cleansing, iridology, and yogic science.
            </p>
          </div>

          {/* 8-Card Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1.1rem',
            alignItems: 'stretch'
          }}>
            {naturopathyCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedNaturopathyModal(card)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 8px 22px rgba(94, 39, 53, 0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Cover Image */}
                <div style={{ height: isMobile ? '105px' : '135px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(28,20,16,0.65) 100%)' }} />
                  
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    backgroundColor: 'rgba(28, 20, 16, 0.75)',
                    color: 'var(--harvest-gold)',
                    fontSize: '0.55rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '0.18rem 0.5rem',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(220,160,50,0.25)'
                  }}>
                    ✦ {card.category}
                  </span>

                  <span style={{
                    position: 'absolute', bottom: '6px', right: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 800,
                    opacity: 0.88
                  }}>
                    {card.number}
                  </span>
                </div>

                {/* Card Title */}
                <div style={{ padding: '0.95rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#ffffff', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Pancha Mahabhuta 5 Elements Section */}
      <section style={{ backgroundColor: 'var(--sage)', color: 'var(--wine)', padding: isMobile ? '3rem 5%' : '4rem 7%', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
            ✦ PANCHA MAHABHUTA WISDOM
          </span>
          <h2 style={{ color: 'var(--wine)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', fontWeight: 700, margin: '0 0 2rem 0' }}>
            The 5 Natural Elements <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>of Drugless Healing</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '1rem' }}>
            {[
              { icon: Droplet, name: 'Jala (Water)', therapy: 'Hydrotherapy & Immersion Baths', desc: 'Colon hydrotherapy, spinal spray & Jacuzzi baths.' },
              { icon: Sun, name: 'Prithvi (Earth)', therapy: 'Full Body Mud Baths', desc: 'Cooling mud packs & mineral wraps.' },
              { icon: Flame, name: 'Agni (Fire)', therapy: 'Helio & Thermal Steam', desc: 'Infrared sauna, Finnish steam & sun bathing.' },
              { icon: Wind, name: 'Vayu (Air)', therapy: 'Oxygenating Pranayama', desc: 'Nadi Shodhana, Kapalbhati & riverfront air.' },
              { icon: Feather, name: 'Akasha (Ether)', therapy: 'Fasting & Sound Healing', desc: 'Therapeutic bio-fasting & Tibetan singing bowls.' }
            ].map((el, eIdx) => (
              <div key={eIdx} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '1.4rem 1rem', border: '1px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 6px 20px rgba(94, 39, 53, 0.04)', textAlign: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(94, 39, 53, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.8rem auto', color: 'var(--wine)' }}>
                  <el.icon size={22} />
                </div>
                <h3 style={{ color: 'var(--wine)', fontSize: '0.92rem', fontWeight: 700, margin: '0 0 0.3rem 0' }}>{el.name}</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>{el.therapy}</span>
                <p style={{ fontSize: '0.76rem', opacity: 0.82, margin: 0, lineHeight: 1.4 }}>{el.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.8rem' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '0.9rem 2.4rem', fontSize: '0.84rem' }}
            >
              Schedule Assessment &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Full Detailed Modal Popup for Naturopathy Cards */}
      <AnimatePresence>
        {selectedNaturopathyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 10, 8, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem',
              overflow: 'hidden'
            }}
            onClick={() => setSelectedNaturopathyModal(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '880px',
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNaturopathyModal(null)}
                style={{
                  position: 'absolute', top: '18px', right: '18px', zIndex: 10,
                  backgroundColor: 'rgba(94, 39, 53, 0.08)', color: 'var(--wine)',
                  border: 'none', borderRadius: '50%', width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.25s ease'
                }}
                className="hover-gold"
              >
                <X size={20} />
              </button>

              {/* Modal Fixed Header with Small Image Card */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1.4rem',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '1.4rem' : '1.8rem 2rem 1.4rem 2rem',
                borderBottom: '1.5px solid rgba(94, 39, 53, 0.12)',
                paddingRight: '3.5rem',
                flexShrink: 0,
                backgroundColor: '#ffffff'
              }}>
                {/* Small Image Card */}
                <div style={{
                  width: isMobile ? '100%' : '150px',
                  height: isMobile ? '130px' : '100px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 22px rgba(94, 39, 53, 0.14)',
                  border: '1px solid rgba(94, 39, 53, 0.12)'
                }}>
                  <img 
                    src={selectedNaturopathyModal.image} 
                    alt={selectedNaturopathyModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Header Information */}
                <div style={{ flex: 1 }}>
                  <span style={{
                    color: 'var(--redwood)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.3rem'
                  }}>
                    ✦ {selectedNaturopathyModal.category}
                  </span>
                  <h2 style={{ fontSize: isMobile ? '1.45rem' : '1.85rem', margin: '0 0 0.3rem 0', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>
                    {selectedNaturopathyModal.title}
                  </h2>
                  <p style={{ fontStyle: 'italic', color: 'var(--redwood)', fontSize: '0.86rem', fontWeight: 600, margin: 0 }}>
                    "{selectedNaturopathyModal.sanskritQuote}" — {selectedNaturopathyModal.sanskritMeaning}
                  </p>
                </div>
              </div>

              {/* Modal Internal Scrollable Body Area */}
              <div 
                className="hide-scrollbar"
                style={{
                  padding: isMobile ? '1.4rem' : '1.8rem 2rem',
                  overflowY: 'auto',
                  flex: 1,
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  pointerEvents: 'auto'
                }}
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black)', lineHeight: 1.65, marginBottom: '1.6rem' }}>
                  {selectedNaturopathyModal.description}
                </p>

                {/* Diagnostic Pillars Section */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.1rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Diagnostic Pillars &amp; Assessments
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.9rem' }}>
                    {selectedNaturopathyModal.details.diagnostics.map((diag, idx) => (
                      <div key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.04)', padding: '0.95rem 1.1rem', borderRadius: '12px', borderLeft: '3px solid var(--wine)' }}>
                        <h4 style={{ color: 'var(--wine)', margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 700 }}>{diag.name}</h4>
                        <p style={{ color: 'var(--raisin-black)', opacity: 0.82, fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>{diag.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Modalities & Therapies */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.1rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Therapeutic Protocols &amp; Treatments
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedNaturopathyModal.details.therapies.map((mod, idx) => (
                      <div key={idx} style={{ backgroundColor: 'var(--isabelline)', padding: '1.1rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(94,39,53,0.1)' }}>
                        <h4 style={{ color: 'var(--wine)', margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 700 }}>{mod.name}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                          {mod.list.map((item, itemIdx) => (
                            <span key={itemIdx} style={{ backgroundColor: '#ffffff', border: '1px solid rgba(94,39,53,0.16)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', color: 'var(--wine)', fontWeight: 600 }}>
                              ✦ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.2rem', borderTop: '1px solid rgba(94, 39, 53, 0.12)', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--wine)', opacity: 0.75, display: 'block' }}>AYUSH Certified Doctors</span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--wine)', fontWeight: 800 }}>100% Drugless Naturopathy Care</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedNaturopathyModal(null);
                      onNavigate('contact');
                    }}
                    className="btn-luxury"
                    style={{ padding: '0.8rem 1.8rem', fontSize: '0.78rem' }}
                  >
                    Schedule Assessment &rarr;
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
