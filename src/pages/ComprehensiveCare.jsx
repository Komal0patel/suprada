import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { Pattern24, Pattern25, Pattern28 } from '../AnimatedPatterns';

const clinicalDiseases = [
  {
    id: 'detoxification',
    number: '01',
    title: 'Detoxification & Renewal',
    category: '7 to 21 Days',
    image: '/assets/generated/clinical_detoxification.png',
    protocolTitle: 'Deep Cellular Cleansing & Bio-Metabolic Flush',
    fullDesc: 'A doctor-supervised drugless clinical protocol designed to cleanse liver, kidneys, colon, and lymphatic systems through evidence-based hydrotherapy, therapeutic mud baths, bio-fasting, and raw botanical infusions.',
    modalities: ['Hydrotherapy Cleansing', 'Therapeutic Mud Packs', 'Raw Juice Fasting', 'Kunjal Kriya', 'Lymphatic Grounding'],
    diagnostics: [
      { name: 'Metabolic & Vitality Assessment', desc: 'Baseline evaluation of systemic toxic load, organ strain, and lymphatic flow.' },
      { name: 'Doshic Toxicity Mapping', desc: 'Identifying Ama accumulation and organ-specific elimination blockages.' }
    ]
  },
  {
    id: 'diabetes-management',
    number: '02',
    title: 'Diabetes Management',
    category: '14 to 28 Days',
    image: '/assets/generated/diabetes_glycemic_care.png',
    protocolTitle: 'Glycemic Re-education & Pancreatic Revitalization',
    fullDesc: 'Integrative glycemic management protocol focusing on reversing insulin resistance, regulating HbA1c, and rebuilding pancreatic vitality using targeted plant-based clinical nutrition, hydro-kinesiology, and specific yogic asanas.',
    modalities: ['Pancreatic Asana Series', 'Low-GI Satwik Nutrition', 'Herbal Hydro-Packs', 'Continuous Glucose Monitoring', 'Stress Cortisol Reset'],
    diagnostics: [
      { name: 'Continuous Glucose Tracking', desc: 'Real-time glycemic monitoring correlated with dietary and exercise interventions.' },
      { name: 'Iris Pancreatic Assessment', desc: 'Naturopathic iris assessment to evaluate cellular stress in pancreatic tissues.' }
    ]
  },
  {
    id: 'neurological-disorders',
    number: '03',
    title: 'Neurological Disorders',
    category: '14 to 21 Days',
    image: '/assets/generated/neurological_cranial_rest.png',
    protocolTitle: 'Neuro-Regenerative Rest & Shirodhara Rejuvenation',
    fullDesc: 'Specialized neurological rehabilitation protocol targeting Parkinson\'s support, neuropathies, insomnia, and chronic anxiety through rhythmic warm oil Shirodhara, cranial grounding, and deep autonomic nervous system reset.',
    modalities: ['Continuous Shirodhara', 'Cranial Grounding', 'Nadi Shodhana Pranayama', 'Neuro-Nutritional Therapy', 'Circadian Rhythm Reset'],
    diagnostics: [
      { name: 'Autonomic Tone Evaluation', desc: 'Measuring sympathetic vs. parasympathetic balance and sleep architecture.' },
      { name: 'Neural Stress Profiling', desc: 'Mapping nerve inflammation and stress-induced motor/sensory hypersensitivity.' }
    ]
  },
  {
    id: 'liver-diseases',
    number: '04',
    title: 'Liver Health & Hepatic Care',
    category: '10 to 21 Days',
    image: '/assets/generated/liver_hepatic_detox.png',
    protocolTitle: 'Hepatic Regeneration & Biliary Flush',
    fullDesc: 'Intensive hepatic restoration program designed to reduce liver inflammation, resolve non-alcoholic fatty liver (NAFLD), and optimize bile secretion through abdominal mud packs, hydro-poultices, and enzyme-rich botanical nutrition.',
    modalities: ['Abdominal Mud Compresses', 'Cold Hepatic Packs', 'Enzyme Juice Protocols', 'Castor Oil Packs', 'Gentle Liver Yoga'],
    diagnostics: [
      { name: 'Hepatic Enzyme & Bile Screening', desc: 'Evaluating liver transaminases, bilirubin clearance, and digestive fire (Agni).' },
      { name: 'Visceral Palpation', desc: 'Doctor-led physical abdominal mapping for liver enlargement and congestion.' }
    ]
  },
  {
    id: 'obesity-and-weight-imbalance',
    number: '05',
    title: 'Obesity & Weight Imbalance',
    category: '14 to 28 Days',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Visceral Fat Reduction & Body Composition Reset',
    fullDesc: 'Holistic weight management program targeting stubborn visceral fat, leptin resistance, and metabolic slowdown using vigorous hydro-massage, thermal steam baths, bio-fasting, and daily high-burn yogic kriya.',
    modalities: ['Under-Water Jet Massage', 'Therapeutic Steam Baths', 'Udvarthana Herbal Scrub', 'Thermic Satwik Diet', 'Barefoot Riverland Walking'],
    diagnostics: [
      { name: 'Visceral Fat Analysis', desc: 'Segmental body composition mapping visceral vs subcutaneous fat ratios.' },
      { name: 'Basal Metabolic Assessment', desc: 'Evaluating resting metabolic rate and hormonal leptin/ghrelin triggers.' }
    ]
  },
  {
    id: 'heart-and-cardiovascular-conditions',
    number: '06',
    title: 'Heart & Cardiovascular Care',
    category: '14 to 21 Days',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Vascular De-Stressing & Arterial Tonification',
    fullDesc: 'Doctor-monitored cardiovascular wellness protocol designed to normalize hypertension, lower arterial stiffness, and enhance cardiac output through gentle hydro-baths, specialized pranayama, and heart-healthy bio-nutrition.',
    modalities: ['Arm & Foot Hydro-Baths', 'Cardio-Protective Herbs', 'Deep Cardiac Pranayama', 'Sodium-Balancing Diet', 'Stress Elimination Yoga'],
    diagnostics: [
      { name: 'Blood Pressure Dynamics', desc: '24-hour diurnal blood pressure monitoring and arterial pulse pressure index.' },
      { name: 'Cardiopulmonary Capacity', desc: 'Assessment of VO2 efficiency and exercise pulse recovery times.' }
    ]
  },
  {
    id: 'hormonal-disorders',
    number: '07',
    title: 'Hormonal Disorders & Endocrine',
    category: '14 to 21 Days',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Endocrine System Synchronization & Adrenal Reset',
    fullDesc: 'Targeted endocrine realignment protocol for thyroid imbalances, PCOS/PCOD, and adrenal exhaustion. Combines glandular hydro-packs, endocrine-stimulating yoga postures, and adaptogenic botanical nutrition.',
    modalities: ['Thyroid Hydro Compresses', 'PCOS Pelvic Packs', 'Endocrine Asana Series', 'Seed Cycling Nutrition', 'Adrenal De-stress Yoga'],
    diagnostics: [
      { name: 'Endocrine Axis Profiling', desc: 'Mapping HPA (hypothalamic-pituitary-adrenal) axis strain and thyroid activity.' },
      { name: 'Menstrual Cycle Synchronicity', desc: 'Naturopathic tracking of ovarian cycles and progesterone/estrogen balance.' }
    ]
  },
  {
    id: 'rheumatoid-arthritis-and-joint-disorders',
    number: '08',
    title: 'Rheumatoid Arthritis & Joints',
    category: '14 to 28 Days',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Hydro-Kinesiology & Inflammatory Arthritis Relief',
    fullDesc: 'Specialized rheumatological protocol reducing joint swelling, morning stiffness, and autoimmune flare-ups through warm mineral hydrotherapy, herbal oil fomentation, anti-inflammatory nutrition, and pool exercise.',
    modalities: ['Warm Mineral Baths', 'Janu Basti Oil Reservoirs', 'Herbal Steam Poultice', 'Anti-Inflammatory Nutrition', 'Hydro-Kinesiology'],
    diagnostics: [
      { name: 'Joint Range & Mobility Index', desc: 'Goniometric measurement of spinal flex, knee extension, and grip strength.' },
      { name: 'Autoimmune Inflammatory Markers', desc: 'Evaluating systemic inflammation markers and morning stiffness duration.' }
    ]
  },
  {
    id: 'respiratory-diseases',
    number: '09',
    title: 'Respiratory & Pulmonary Care',
    category: '7 to 14 Days',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Bronchial Cleansing & Pulmonary Expansion',
    fullDesc: 'Clinical respiratory care protocol designed for asthma, chronic bronchitis, sinusitis, and post-viral pulmonary recovery using saline Neti, chest steam poultices, oxygenating pranayama, and pristine riverfront clean air.',
    modalities: ['Jala & Sutra Neti', 'Chest Herbal Steam Poultice', 'Kapalbhati Pulmonary Kriya', 'Bronchial Hydro Compresses', 'Eucalyptus Steam'],
    diagnostics: [
      { name: 'Peak Expiratory Flow Measurement', desc: 'Spirometry and lung clearance evaluation under clean air conditions.' },
      { name: 'Sinus & Airway Mapping', desc: 'Assessment of nasal congestion, mucus accumulation, and bronchial spasm.' }
    ]
  },
  {
    id: 'stress-and-emotional-management',
    number: '10',
    title: 'Stress & Emotional Wellbeing',
    category: '7 to 14 Days',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Autonomic Nervous System Reset & Mindful Healing',
    fullDesc: 'A deeply calming retreat protocol for mental exhaustion, occupational burnout, and emotional trauma. Combines forest bathing on our riverfront estate, Yoga Nidra sound immersion, and therapeutic hydro-relaxation.',
    modalities: ['Yoga Nidra Sound Sanctum', 'Forest River Bathing', 'Shirodhara Oil Therapy', 'Silent Meditation', 'Mindful Organic Dining'],
    diagnostics: [
      { name: 'Heart Rate Variability (HRV)', desc: 'Bio-feedback tracking of vagal nerve activity and psychological resilience.' },
      { name: 'Cortisol & Sleep Cycle Profiling', desc: 'Evaluating circadian sleep disruption and diurnal stress hormone levels.' }
    ]
  },
  {
    id: 'cancer-care-and-recovery-support',
    number: '11',
    title: 'Cancer Care & Recovery Support',
    category: '14 to 28 Days',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Integrative Vitality Rebuilding & Immune Fortification',
    fullDesc: 'Gentle, doctor-monitored supportive care protocol designed to alleviate chemotherapy/radiation side effects, boost natural killer cell activity, reduce systemic inflammation, and nourish body & spirit.',
    modalities: ['Gentle Detox Hydrotherapy', 'Immune-Boosting Bio-Nutrition', 'Pranic Healing & Yoga', 'Lymphatic Drainage', 'Emotional Sanctuary'],
    diagnostics: [
      { name: 'Immune & Vital Energy Mapping', desc: 'Gentle evaluation of stamina, appetite, peripheral neuropathy, and mood.' },
      { name: 'Systemic Toxicity & Fatigue Index', desc: 'Monitoring post-treatment recovery milestones and tissue regeneration.' }
    ]
  },
  {
    id: 'digestion-and-gut-health',
    number: '12',
    title: 'Digestion & Gut Health',
    category: '7 to 21 Days',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    protocolTitle: 'Gastrointestinal Realignment & Microbiome Reset',
    fullDesc: 'Comprehensive gastrointestinal protocol restoring gut barrier integrity, digestive fire (Agni), and microbial diversity through mud packs, probiotic fermented Satwik elixirs, Enema hydro-cleansing, and digestive yoga.',
    modalities: ['Abdominal Mud Packs', 'Gastro Hydro-Enema', 'Probiotic Satwik Elixirs', 'Agni Deepana Spices', 'Digestive Asana Flow'],
    diagnostics: [
      { name: 'Gut Transit & Agni Evaluation', desc: 'Assessment of digestive fire strength, gastric acidity, and bowel motility.' },
      { name: 'Microbiome & Barrier Integrity', desc: 'Evaluating bloating, food intolerances, leaky gut, and colon health.' }
    ]
  }
];

export default function ComprehensiveCare({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDiseaseModal, setSelectedDiseaseModal] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 960);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedDiseaseModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      };
    }
  }, [selectedDiseaseModal]);

  return (
    <div style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Main Cards Grid Section */}
      <section className="naturopathy-section-container luxury-clay" style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '7.5rem 5% 3rem 5%' : '8.5rem 7% 4.5rem 7%', backgroundColor: 'var(--antique-white)' }}>
        <Pattern28 style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', color: 'var(--wine)', opacity: 0.08, pointerEvents: 'none', zIndex: 1 }} />
        
        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.2rem auto' }}>
            <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.68rem', fontWeight: 800, display: 'block', marginBottom: '0.25rem' }}>
              ✦ TARGETED CLINICAL INTERVENTIONS
            </span>
            <h1 style={{ color: 'var(--wine)', lineHeight: 1.15, margin: '0 0 0.5rem 0', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 700 }}>
              Comprehensive <em style={{ fontStyle: 'italic', color: 'var(--redwood)', fontWeight: 700 }}>Clinical Spectrum</em>
            </h1>
            <p style={{ fontSize: isMobile ? '0.92rem' : '1.05rem', color: 'var(--wine)', opacity: 0.88, margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
              Select any of the specialized clinical conditions below to explore diagnostic testing, core medical modalities, and treatment phases.
            </p>
          </div>

          {/* Card Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '1.1rem',
            alignItems: 'stretch'
          }}>
            {clinicalDiseases.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedDiseaseModal(card)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  boxShadow: '0 6px 18px rgba(94, 39, 53, 0.06)',
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

      {/* Clinical Pathway & Assurance Section */}
      <section style={{ backgroundColor: 'var(--sage)', color: 'var(--wine)', padding: isMobile ? '3rem 5%' : '4rem 7%', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem' }}>
            ✦ PATIENT CARE PATHWAY
          </span>
          <h2 style={{ color: 'var(--wine)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', fontWeight: 700, margin: '0 0 2rem 0' }}>
            How Our Drugless <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Clinical Care Works</em>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.4rem' }}>
            {[
              { icon: ShieldCheck, step: '01', title: 'Iris & Clinical Assessment', desc: 'Comprehensive non-invasive iris assessment, vital profiling & doshic toxicity mapping by resident AYUSH doctors.' },
              { icon: Activity, step: '02', title: 'Targeted Inpatient Therapies', desc: 'Daily doctor-prescribed hydrotherapy, mud compresses, Shirodhara, and customized Satwik organic nutrition.' },
              { icon: HeartPulse, step: '03', title: 'Sustainable Lifestyle Re-education', desc: 'Post-retreat home guidance, dietary protocols, and yogic daily regimens for lifelong disease-free vitality.' }
            ].map((st, sIdx) => (
              <div key={sIdx} style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '1.8rem 1.4rem', border: '1px solid rgba(94, 39, 53, 0.12)', boxShadow: '0 8px 25px rgba(94, 39, 53, 0.05)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <st.icon size={28} style={{ color: 'var(--redwood)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--harvest-gold)', backgroundColor: 'var(--wine)', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
                    STEP {st.step}
                  </span>
                </div>
                <h3 style={{ color: 'var(--wine)', margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 700 }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--raisin-black)', opacity: 0.85, margin: 0, lineHeight: 1.55 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.8rem' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '0.9rem 2.4rem', fontSize: '0.84rem' }}
            >
              Schedule Clinical Assessment &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Full Detailed Modal Popup for Clinical Disease Cards */}
      <AnimatePresence>
        {selectedDiseaseModal && (
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
            onClick={() => setSelectedDiseaseModal(null)}
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
                onClick={() => setSelectedDiseaseModal(null)}
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

              {/* Modal Fixed Header with Cover Image Card */}
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
                    src={selectedDiseaseModal.image} 
                    alt={selectedDiseaseModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Header Information */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{
                      color: 'var(--redwood)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase'
                    }}>
                      ✦ PROTOCOL {selectedDiseaseModal.number}
                    </span>
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(94, 39, 53, 0.08)',
                      color: 'var(--wine)'
                    }}>
                      {selectedDiseaseModal.category} Protocol
                    </span>
                  </div>

                  <h2 style={{ fontSize: isMobile ? '1.45rem' : '1.8rem', margin: '0 0 0.2rem 0', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>
                    {selectedDiseaseModal.title}
                  </h2>
                  <p style={{ color: 'var(--redwood)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                    {selectedDiseaseModal.protocolTitle}
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
                <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black)', lineHeight: 1.65, marginBottom: '1.6rem' }}>
                  {selectedDiseaseModal.fullDesc}
                </p>

                {/* Diagnostic Pillars Section */}
                {selectedDiseaseModal.diagnostics && (
                  <div style={{ marginBottom: '1.8rem' }}>
                    <h3 style={{ color: 'var(--wine)', fontSize: '1.05rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                      Diagnostic Pillars &amp; Clinical Testing
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.9rem' }}>
                      {selectedDiseaseModal.diagnostics.map((diag, idx) => (
                        <div key={idx} style={{ backgroundColor: 'rgba(94, 39, 53, 0.04)', padding: '0.95rem 1.1rem', borderRadius: '12px', borderLeft: '3px solid var(--wine)' }}>
                          <h4 style={{ color: 'var(--wine)', margin: '0 0 0.25rem 0', fontSize: '0.88rem', fontWeight: 700 }}>{diag.name}</h4>
                          <p style={{ color: 'var(--raisin-black)', opacity: 0.82, fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>{diag.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Medical Modalities Included */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <h3 style={{ color: 'var(--wine)', fontSize: '1.05rem', borderBottom: '2px solid var(--harvest-gold)', paddingBottom: '0.4rem', marginBottom: '1rem', fontWeight: 700 }}>
                    Core Medical Modalities Included
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {selectedDiseaseModal.modalities.map((item, itemIdx) => (
                      <span key={itemIdx} style={{ backgroundColor: 'rgba(184, 94, 76, 0.08)', border: '1px solid rgba(184, 94, 76, 0.2)', padding: '0.4rem 0.95rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--redwood)', fontWeight: 700 }}>
                        ✦ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clinical Oversight & Action Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.2rem', borderTop: '1px solid rgba(94, 39, 53, 0.12)', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--wine)', opacity: 0.75, display: 'block' }}>AYUSH Certified Doctors</span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--wine)', fontWeight: 800 }}>100% Drugless Naturopathy Care</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedDiseaseModal(null);
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
