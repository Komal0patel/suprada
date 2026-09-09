import React from 'react';
import { motion } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Sparkles, ArrowRight, ArrowLeft, Check, Leaf, Sun, Activity, Droplets } from 'lucide-react';

const pillarDataMap = {
  'naturopathy': {
    title: 'Naturopathy',
    sanskrit: 'Prakṛtireva Bheṣajam',
    sanskritText: 'प्रकृतिरेव भेषजम्।',
    sanskritTranslation: '(Nature itself is the medicine.)',
    subtitle: 'Nature is the ultimate healer — drugless, holistic restoration',
    image: '/assets/programmes/naturopathy.jpg',
    desc: 'Naturopathy at Suprada utilizes the healing power of the Five Great Elements (Panchamahabhutas — Earth, Water, Fire, Air, Ether) to stimulate the body’s innate self-repair mechanism without synthetic drugs.',
    signatureTitle: 'Detox & Cleansing Program',
    signatureDesc: 'Experience the full power of Naturopathy in our signature 7-21 day Detox Program integrating daily hydrotherapy, mud packs, and specialized massages with fasting therapy and detox diets to deeply cleanse your system and reset your biological rhythm.',
    signatureChecks: ['Daily Naturopathy Treatments', 'Colon Hydrotherapy Sessions', 'Personalized Detox Diet'],
    therapies: [
      { title: 'Full Body Mud Bath & Packs', img: '/assets/programmes/mud-bath.jpg', tag: 'ELEMENTAL DETOX', badge: '✦ MUD THERAPY', desc: 'Enriched therapeutic mud absorbs toxins, cools internal organs, and rejuvenates skin texture.', focus: 'Cellular detox & skin cooling' },
      { title: 'Hydrotherapy & Spinal Spray', img: '/assets/programmes/hydrotherapy.jpg', tag: 'WATER HEALING', badge: '✦ AQUA JET', desc: 'Temperature-controlled water jets stimulate blood circulation, relieve spinal stress, and calm nerves.', focus: 'Spinal decompression & circulation' },
      { title: 'Fasting & Juice Therapy', img: '/assets/programmes/detox.jpg', tag: 'METABOLIC RESET', badge: '✦ JUICE DETOX', desc: 'Physician-guided liquid fasting resets digestive fire (Agni) and accelerates cellular repair.', focus: 'Digestive fire & cellular renewal' },
      { title: 'Chromotherapy & Sun Bathing', img: '/assets/programmes/naturopathy.jpg', tag: 'SOLAR ENERGY', badge: '✦ SUN BATH', desc: 'Solarized water and colored light frequencies harmonize glandular functions and boost vitamin D.', focus: 'Hormonal & endocrine balance' }
    ]
  },
  'yoga-meditation': {
    title: 'Yoga & Meditation',
    sanskrit: 'Yogaś Citta-Vṛtti-Nirodhaḥ',
    sanskritText: 'योगश्चित्तवृत्तिनिरोधः।',
    sanskritTranslation: '(Yoga is the cessation of the modifications of the mind.)',
    subtitle: 'Riverfront movement, pranayama, and meditative awareness',
    image: '/assets/programmes/yoga.jpg',
    desc: 'Our riverfront yoga shala by the sacred Suvarnamukhi provides a tranquil sanctuary for breath-led movement, internal cleansing kriyas, and deep meditative stillness.',
    signatureTitle: 'Holistic Wellness Program',
    signatureDesc: 'A 7-day immersive journey anchoring daily Yoga and Meditation practices with comprehensive wellness therapies.',
    signatureChecks: ['Daily Guided Yoga & Meditation', 'Advanced Pranayama Sessions', 'Wellness Assessment', 'Satwik Nutrition Plan'],
    therapies: [
      { title: 'Sunrise Hatha & Kriya Yoga', img: '/assets/programmes/yoga.jpg', tag: 'PHYSICAL INTEGRATION', badge: '✦ ASANA FLOW', desc: 'Gentle asana practices synchronized with sunrise light to enliven physical strength and flexibility.', focus: 'Posture & muscular alignment' },
      { title: 'Pranayama & Shatkarma Kriyas', img: '/assets/programmes/yoga.jpg', tag: 'VITAL BREATH', badge: '✦ PRANAYAMA', desc: 'Nadi Shodhana, Kapalabhati, and Jala Neti to purify respiratory passages and balance subtle energy channels.', focus: 'Respiratory & prana channel balance' },
      { title: 'Yoga Nidra Deep Relaxation', img: '/assets/programmes/mental.jpg', tag: 'PSYCHIC SLEEP', badge: '✦ CONSCIOUS REST', desc: 'Guided psychic sleep practice relieving subconscious tension and recalibrating the nervous system.', focus: 'Parasympathetic nerve reset' },
      { title: 'Riverfront Sunrise Meditation', img: '/assets/programmes/yoga.jpg', tag: 'MINDFULNESS', badge: '✦ ACOUSTIC CALM', desc: 'Mindful awareness sessions accompanied by the soothing acoustic soundscape of flowing water.', focus: 'Mental clarity & emotional calm' }
    ]
  },
  'holistic-therapies': {
    title: 'Holistic Therapies',
    sanskrit: 'Sarvaṃ khalvidaṃ brahma.',
    sanskritText: 'सर्वं खल्विदं ब्रह्म।',
    sanskritTranslation: '(All this is indeed the universal consciousness.)',
    subtitle: 'Integrated Healing for Complete Wellness',
    image: '/assets/programmes/holistic.jpg',
    desc: 'Our holistic therapies integrate diverse healing modalities from around the world to address your health from multiple dimensions. Combining ancient wisdom with modern techniques, we offer acupuncture, acupressure, energy healing, cupping therapy, music & sound healing and other complementary treatments designed to restore balance and promote deep healing. Each therapy is carefully selected and personalized to your unique needs, working synergistically to enhance your body\'s natural healing capabilities.',
    signatureTitle: 'Vibrational Healing Journey',
    signatureDesc: 'Immerse yourself in a transformative session combining Tibetan Singing Bowls, Gong Bath, and guided energy clearing. This signature therapy aligns your chakras, releases emotional blockages, and induces deep cellular relaxation.',
    signatureChecks: ['Deep Stress Release', 'Emotional Cleansing', 'Cellular Rejuvenation'],
    therapies: [
      { title: 'Energy & Sound Healing', img: '/assets/programmes/sound-healing.jpg', tag: 'ACOUSTIC RESONANCE', badge: '✦ SOUND HEALING', desc: 'Pure acoustic vibrations from Tibetan bowls and gongs resonate with brainwaves to induce deep theta states and cellular healing.', focus: 'Brainwave entrainment & deep relaxation' },
      { title: 'Acupuncture & Meridian Therapy', img: '/assets/programmes/acupuncture.jpg', tag: 'MERIDIAN FLOW', badge: '✦ ACUPUNCTURE', desc: 'Fine needle stimulation along energy channels to clear meridian blockages and relieve chronic pain.', focus: 'Energy pathway clearance & pain relief' },
      { title: 'Reiki & Pranic Healing', img: '/assets/programmes/holistic.jpg', tag: 'ENERGY CLEARING', badge: '✦ REIKI CARE', desc: 'No-touch subtle energy clearing that cleanses auric fields and re-energizes vital centers.', focus: 'Auric cleansing & chakra balance' },
      { title: 'Reflexology & Acupressure', img: '/assets/programmes/acupuncture.jpg', tag: 'SOMATIC RELEASE', badge: '✦ PRESSURE POINTS', desc: 'Zone therapy applied to feet and body pressure points to stimulate organ self-healing.', focus: 'Organ stimulation & nerve relief' }
    ]
  },
  'nutrition-lifestyle': {
    title: 'Nutrition & Lifestyle',
    sanskrit: 'Ahāraśuddhau sattvaśuddhiḥ.',
    sanskritText: 'आहारशुद्धौ सत्त्वशुद्धिः।',
    sanskritTranslation: '(When food is pure, the mind becomes pure.)',
    subtitle: 'Nourish Your Body, Transform Your Life',
    image: '/assets/programmes/nutrition.jpg',
    desc: 'True wellness begins with what you put on your plate and how you live your daily life. Our nutrition and lifestyle programmes combine ancient dietary wisdom with modern nutritional science to create personalized plans that support your health goals, enhance vitality, and promote long-term well-being. From satwik meal plans to gut-health optimization and sustainable lifestyle modifications, we guide you toward choices that nourish not just your body, but your mind and spirit as well.',
    signatureTitle: 'Gut Restoration Plan',
    signatureDesc: 'A specialized nutritional protocol designed to heal the gut lining, restore microbiome balance, and improve digestion. Essential for those with IBS, bloating, or food sensitivities.',
    signatureChecks: ['Microbiome Analysis', 'Anti-Inflammatory Meal Plan', 'Probiotic Rich Foods', 'Digestive Herbal Support'],
    therapies: [
      { title: 'Satwik Organic Meals', img: '/assets/programmes/satwik-food.jpg', tag: 'ORGANIC NOURISHMENT', badge: '✦ SATWIK CUISINE', desc: 'Pure, balanced vegetarian meals prepared daily with farm-fresh herbs for mental clarity and digestive renewal.', focus: 'Pure nutrient absorption & Agni renewal' },
      { title: 'Anti-Inflammatory & Millet Diet', img: '/assets/programmes/nutrition.jpg', tag: 'METABOLIC RESET', badge: '✦ METABOLIC RESET', desc: 'Antioxidant-rich ancient grain plans formulated to reduce systemic bodily inflammation and stabilize blood sugar.', focus: 'Inflammation reduction & grain reset' },
      { title: 'Cold-Pressed Juice Detox', img: '/assets/programmes/detox.jpg', tag: 'CELLULAR PURIFICATION', badge: '✦ JUICE ELIXIR', desc: 'Nutrient-dense raw vegetable and botanical juices to cleanse kidneys, liver, and digestive tract.', focus: 'Organ cleansing & enzyme boost' },
      { title: 'Sustainable Lifestyle Guidance', img: '/assets/programmes/nutrition.jpg', tag: 'LIFESTYLE EDUCATION', badge: '✦ LIFESTYLE HABITS', desc: 'Personalized routines, meal timing advice, and satwik culinary strategies for maintaining lasting wellness at home.', focus: 'Long-term digestive vitality' }
    ]
  },
  'mental-emotional': {
    title: 'Mental & Emotional Well-Being',
    sanskrit: 'Mana eva manuṣyāṇāṃ kāraṇaṃ bandhamokṣayoḥ.',
    sanskritText: 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः।',
    sanskritTranslation: '(The mind alone is the cause of bondage and liberation.)',
    subtitle: 'Nurture Your Mind, Heal Your Heart',
    image: '/assets/programmes/mental.jpg',
    desc: 'Mental and emotional health are foundational to overall wellness. Our comprehensive programmes combine professional counselling, stress management techniques, breathwork, and mindfulness practices to help you navigate life\'s challenges with greater resilience, clarity, and inner peace. In a safe, supportive environment, we address anxiety, stress, emotional trauma, and other mental health concerns through evidence-based therapies and holistic healing modalities.',
    signatureTitle: 'Stress & Emotional Management',
    signatureDesc: 'A compassionate, structured program designed to help you decompress, process emotions, and build resilience. Ideal for those facing burnout, anxiety, or life transitions.',
    signatureChecks: ['One-on-One Talk Therapy', 'Cognitive Behavioral Techniques', 'Trauma & Grief Processing', 'Daily Stress Reduction Tools'],
    therapies: [
      { title: 'Psychotherapy & 1-on-1 Counselling', img: '/assets/programmes/counselling.jpg', tag: 'TALK THERAPY', badge: '✦ COUNSELLING', desc: 'Compassionate individual talk therapy sessions to process emotional wounds, relationship dynamics, and anxiety.', focus: 'Emotional processing & mental clarity' },
      { title: 'Cognitive & Trauma Processing', img: '/assets/programmes/mental.jpg', tag: 'BEHAVIORAL REWIRE', badge: '✦ TRAUMA RELEASE', desc: 'Safe, evidence-based methods including CBT and trauma release to rewire stress responses and heal past wounds.', focus: 'Subconscious pattern release' },
      { title: 'Stress Reduction & Mindful Tools', img: '/assets/programmes/yoga.jpg', tag: 'STRESS REGULATION', badge: '✦ STRESS MGMT', desc: 'Practical daily breathwork and mindfulness exercises to calm the nervous system and manage daily pressures.', focus: 'Cortisol reduction & resilience' },
      { title: 'Inner Child & NLP Alignment', img: '/assets/programmes/counselling.jpg', tag: 'AUTHENTIC SELF', badge: '✦ INNER HEALING', desc: 'Deep reflective work and Neuro-Linguistic Programming to reconnect with your authentic self and cultivate joy.', focus: 'Authentic self-actualization' }
    ]
  },
  'detox-cleansing': {
    title: 'Detox & Cleansing',
    sanskrit: 'Śuddhireva paramaṃ dharmaḥ.',
    sanskritText: 'शुद्धिरेव परमं धर्मः।',
    sanskritTranslation: '(Purity is the highest virtue.)',
    subtitle: 'Purify, Renew, Revitalize',
    image: '/assets/programmes/detox-cleanse.jpg',
    desc: 'In our modern world, toxins accumulate from environmental pollutants, processed foods, stress, and lifestyle factors. Our comprehensive detoxification programmes use time-tested authentic therapies protocols, therapeutic fasting, and natural cleansing methods to eliminate accumulated toxins, restore cellular health, and rejuvenate your entire system. Experience deep purification that goes beyond surface-level cleansing, addressing toxins at the cellular level while supporting your body\'s natural detoxification pathways.',
    signatureTitle: 'Detox & Cleansing Program',
    signatureDesc: 'Experience the full power of comprehensive detoxification in our signature 7-21 day Detox Program. This comprehensive journey integrates daily hydrotherapy, mud packs, and specialized massages with fasting therapy and detox diets to deeply cleanse your system and reset your biological rhythm.',
    signatureChecks: ['Doctor-Supervised Colon Hydrotherapy', 'Shankhaprakshalana Purification', 'Therapeutic Fasting & Juice Therapy', 'Steam & Herbal Bath Sessions'],
    therapies: [
      { title: 'Colon Hydrotherapy', img: '/assets/programmes/hydrotherapy.jpg', tag: 'GUT PURIFICATION', badge: '✦ COLON CLEANSE', desc: 'A gentle yet powerful method to cleanse the large intestine using warm, filtered water to flush out accumulated waste and toxins.', focus: 'Intestinal waste clearance' },
      { title: 'Shankhaprakshalana & Kriyas', img: '/assets/programmes/detox-cleanse.jpg', tag: 'VEDIC PURIFICATION', badge: '✦ VEDIC CLEANSE', desc: 'Traditional five-fold intestinal cleansing techniques and kriyas to reset digestive fire and purify internal pathways.', focus: 'Deep digestive tract reset' },
      { title: 'Therapeutic Fasting & Juices', img: '/assets/programmes/detox.jpg', tag: 'METABOLIC RESET', badge: '✦ CELLULAR DETOX', desc: 'Physician-guided liquid fasting and detox juice elixirs to accelerate cellular autophagocytosis and organ rejuvenation.', focus: 'Cellular autophagocytosis & repair' },
      { title: 'Steam, Sauna & Sweat Therapy', img: '/assets/programmes/mud-bath.jpg', tag: 'PORE PURIFICATION', badge: '✦ SWEAT DETOX', desc: 'Therapeutic herbal steam saunas that open skin pores, stimulate sweat glands, and draw out heavy metal impurities.', focus: 'Pore opening & lymphatic flush' }
    ]
  },
  'physiotherapy': {
    title: 'Physiotherapy',
    sanskrit: 'Calanaṃ jīvanam.',
    sanskritText: 'चलनं जीवनम्।',
    sanskritTranslation: '(Movement is life.)',
    subtitle: 'Restore Movement, Reclaim Life',
    image: '/assets/programmes/physiotherapy.jpg',
    desc: 'Our physiotherapy programmes combine evidence-based rehabilitation techniques with holistic wellness principles to help you recover from injuries, manage chronic pain, and improve overall mobility. Our experienced physiotherapists create personalized treatment plans tailored to your specific condition and recovery goals. Whether recovering from surgery, managing a chronic condition, or seeking to improve physical function, our comprehensive approach addresses both symptoms and underlying causes.',
    signatureTitle: 'Advanced Pain Management',
    signatureDesc: 'A targeted approach for chronic pain and mobility issues, combining laser therapy, IFT, and manual mobilization. Ideal for arthritis, sports injuries, and post-operative recovery.',
    signatureChecks: ['Ultrasound Deep Tissue Healing', 'Interferential Therapy (IFT)', 'Short Wave Diathermy (SWD)', 'Targeted Laser Tissue Repair'],
    therapies: [
      { title: 'Ultrasound Deep Tissue Healing', img: '/assets/programmes/ultrasound.jpg', tag: 'ACOUSTIC RECOVERY', badge: '✦ ULTRASOUND', desc: 'High-frequency sound waves that penetrate deep muscular layers to reduce inflammation and accelerate soft tissue repair.', focus: 'Deep tissue recovery & pain reduction' },
      { title: 'Interferential Therapy (IFT)', img: '/assets/programmes/physiotherapy.jpg', tag: 'ELECTRO-NEURO CARE', badge: '✦ IFT PAIN RELIEF', desc: 'Interferential electrical nerve stimulation to block chronic pain signals, relieve joint stiffness, and reduce swelling.', focus: 'Nerve pain block & swelling reduction' },
      { title: 'Short Wave Diathermy (SWD)', img: '/assets/programmes/physiotherapy.jpg', tag: 'DEEP THERMAL HEAT', badge: '✦ DEEP HEAT', desc: 'Deep electromagnetic heat therapy to relax stubborn muscle spasms, soften scar tissue, and boost local blood flow.', focus: 'Deep muscle relaxation & flow' },
      { title: 'Targeted Laser Repair', img: '/assets/programmes/ultrasound.jpg', tag: 'PRECISION TISSUE', badge: '✦ LASER REPAIR', desc: 'Non-invasive laser therapy targeting cellular energy centers to control acute joint inflammation and accelerate healing.', focus: 'Inflammation control & cell repair' }
    ]
  },
  'ayurveda': {
    title: 'Ayurveda',
    sanskrit: 'Svasthasya svāsthyarakṣaṇaṃ.',
    sanskritText: 'स्वस्थस्य स्वास्थ्यरक्षणं।',
    sanskritTranslation: '(Preservation of health of the healthy.)',
    subtitle: 'Ancient Wisdom for Modern Wellness',
    image: '/assets/programmes/ayurveda.jpg',
    desc: 'Ayurveda, the 5,000-year-old "Science of Life," offers a comprehensive approach to health and wellness by balancing the three doshas—Vata, Pitta, and Kapha. At Suprada Wellness, our authentic Holistic treatments combine classical therapies with personalized care to restore harmony, enhance immunity, and promote longevity. Through therapeutic massages and lifestyle guidance, we help you achieve optimal health according to your unique constitution.',
    signatureTitle: 'Rejuvenation Program',
    signatureDesc: 'Experience the ultimate renewal with our signature Rejuvenation therapy. This program focuses on anti-aging and vitality boosting through Nutritional treatments, daily massages like Abhyangam, and stress-relieving Shirodhara.',
    signatureChecks: ['Taila Shirodhara Oil Flow', 'Synchronized Full Body Abhyangam', 'Thakradhara Cooling Therapy', 'Medicated Ksheeradhara Treatment'],
    therapies: [
      { title: 'Taila Shirodhara (Oil Pouring)', img: '/assets/programmes/shirodhara-oil.jpg', tag: 'NERVOUS CALM', badge: '✦ SHIRODHARA', desc: 'Continuous stream of warm medicated oil poured gently over the forehead to soothe the nervous system, quiet the mind, and cure insomnia.', focus: 'Mind quietening & nervous system calm' },
      { title: 'Abhyanga Full Body Massage', img: '/assets/programmes/abhyanga-massage.jpg', tag: 'DOSHA HARMONY', badge: '✦ ABHYANGA', desc: 'Synchronized full body massage using dosha-specific medicated oils to enhance lymphatic drainage, strengthen tissues, and nourish skin.', focus: 'Dosha balance & lymphatic flow' },
      { title: 'Thakradhara & Ksheeradhara', img: '/assets/programmes/ayurveda.jpg', tag: 'COOLING FLOW', badge: '✦ HERBAL FLOW', desc: 'Therapeutic streams of medicated buttermilk or warm milk to reduce internal heat, alleviate hypertension, and relieve deep stress.', focus: 'Heat reduction & stress relief' },
      { title: 'Sarvangadhara & Pizhichil', img: '/assets/programmes/abhyanga-massage.jpg', tag: 'ROYAL OIL BATH', badge: '✦ OIL BATH', desc: 'Luxurious warm herbal oil bath therapy poured continuously over the body to lubricate joints and relieve chronic rheumatic stiffness.', focus: 'Joint lubrication & vitality' }
    ]
  }
};

export default function PillarDetail({ pillarId, onNavigate }) {
  const data = pillarDataMap[pillarId] || pillarDataMap['naturopathy'];

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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
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
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em' }}>
              Pillar of Wellness
            </span>
          </motion.div>

          {/* Main Title - Two-Tone Cormorant with Italic Harvest Gold */}
          <h1 style={{
            color: 'var(--wine, #5E2735)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            fontWeight: 700,
            margin: '0 0 0.8rem 0', 
            lineHeight: 1.15
          }}>
            {data.title} <span style={{ fontStyle: 'italic', color: 'var(--harvest-gold, #B8860B)', display: 'block', fontWeight: 600 }}>{data.sanskrit}</span>
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
            {data.subtitle}
          </p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#therapies"
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
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 2. ABOUT PILLAR SECTION */}
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
                src={data.image} 
                alt={data.title} 
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
                HEALING PHILOSOPHY
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', margin: '0 0 1.2rem 0', fontWeight: 700, lineHeight: 1.2 }}>
                About <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>{data.title}</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, marginBottom: '1.2rem' }}>
                {data.desc}
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
                Every program at Suprada is individually customized by our medical doctors and wellness team to harmonize your body's constitutional balance and clear chronic congestion.
              </p>
            </motion.div>
          </div>

          {/* Sanskrit Wisdom Banner */}
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
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', opacity: 0.05, pointerEvents: 'none' }}>
              <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine, #5E2735)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <span style={{ color: 'var(--wine, #5E2735)', fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                Ancient Wisdom
              </span>
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--redwood, #B85645)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                {data.sanskritText}
              </p>
              <p style={{ color: 'var(--wine, #5E2735)', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                {data.sanskrit}
              </p>
              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', width: '60%', margin: '0.5rem auto 0 auto' }}>
                <p style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  {data.sanskritTranslation}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* 3. MUTED SAGE GREEN TABBED SECTION - Modalities (Exact /spaces Sanctum Zones Layout) */}
      <section id="therapies" style={{
        padding: '4.5rem 6%',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine, #5E2735)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '5rem'
      }}>
        <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ THE TREATMENT ZONES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', margin: 0, fontWeight: 700 }}>
              Therapies &amp; Specialized Modalities
            </h2>
            <p style={{ color: '#ffffff', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 500, margin: '0.4rem 0 0 0' }}>
              Core Modalities for {data.title}
            </p>
          </div>

          {/* Pure White Rounded Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
            {data.therapies.map((t, idx) => (
              <motion.div 
                key={t.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', borderRadius: '22px', border: '1.5px solid rgba(255, 255, 255, 0.9)', padding: '1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(94, 39, 53, 0.06)' }}
              >
                <div>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', height: '190px', marginBottom: '1.2rem', position: 'relative' }}>
                    <img src={t.img || data.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--wine, #5E2735)', color: '#f5ebd9', fontSize: '0.68rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '12px' }}>{t.badge}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--redwood, #B85645)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.3rem' }}>{t.tag}</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.45rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{t.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.6, margin: '0 0 1rem 0' }}>{t.desc}</p>
                </div>
                <div style={{ paddingTop: '0.7rem', borderTop: '1px dashed rgba(94, 39, 53, 0.2)', fontSize: '0.76rem', fontWeight: 700, color: 'var(--redwood, #B85645)' }}>Key Focus: {t.focus}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Container Continued */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '4rem 6%' }}>
        
        {/* 4. SIGNATURE PROGRAMME CARD */}
        <section style={{ marginBottom: '5rem' }}>
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
                    {data.signatureTitle}
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {data.signatureDesc}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                    {data.signatureChecks.map(check => (
                      <div key={check} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(94,39,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine, #5E2735)' }}>
                          <Check size={14} />
                        </div>
                        <span style={{ color: 'var(--wine, #5E2735)', fontWeight: 700, fontSize: '0.9rem' }}>{check}</span>
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
                  >
                    BEGIN YOUR JOURNEY &rarr;
                  </button>
                </div>
              </div>

              <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', height: '350px', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.1)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <img 
                  src={data.image} 
                  alt={data.title} 
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

        {/* 5. EXPLORE OTHER HEALING PILLARS GRID */}
        <div style={{ paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--wine, #5E2735)', textAlign: 'center', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.5rem' }}>
            Explore Other Healing Pillars
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.2rem'
          }}>
            {[
              { id: 'naturopathy', title: 'Naturopathy', desc: 'Drugless natural healing' },
              { id: 'yoga-meditation', title: 'Yoga & Meditation', desc: 'Riverfront movement & breath' },
              { id: 'holistic-therapies', title: 'Holistic Therapies', desc: 'Sound bowls & acupressure' },
              { id: 'nutrition-lifestyle', title: 'Nutrition & Lifestyle', desc: 'Farm-to-table satwik dining' },
              { id: 'mental-emotional', title: 'Mental & Emotional', desc: 'Silence & stress release' },
              { id: 'detox-cleansing', title: 'Detox & Cleansing', desc: 'Cellular purification & hydrotherapy' },
              { id: 'physiotherapy', title: 'Physiotherapy', desc: 'Postural alignment & joint therapy' },
              { id: 'ayurveda', title: 'Ayurveda', desc: 'Shirodhara & dosha balance' }
            ]
              .filter(p => p.id !== pillarId)
              .map(p => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    onNavigate('programmes/' + p.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    padding: '1.4rem 1.3rem',
                    border: '1.5px solid rgba(94, 39, 53, 0.12)',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(94, 39, 53, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--wine, #5E2735)', margin: '0 0 0.3rem 0', fontWeight: 700 }}>
                      {p.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0, lineHeight: 1.45 }}>
                      {p.desc}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--redwood, #B85645)', fontWeight: 800, marginTop: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    Explore &rarr;
                  </span>
                </motion.div>
              ))}
          </div>
        </div>

      </div>

    </div>
  );
}
