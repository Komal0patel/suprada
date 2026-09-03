import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, Check, ArrowRight } from 'lucide-react';

const quizData = [
  {
    id: 'type',
    tabTitle: "What's Your Wellness Type?",
    heroTitle: "What's Your Wellness Type?",
    heroSubtitle: "Discover your wellness profile and your therapeutic needs.",
    questions: [
      {
        question: 'How are you feeling most days?',
        options: [
          { label: 'Energised & productive', type: 'rejuvenation' },
          { label: 'Often tired', type: 'balance' },
          { label: 'Stressed / overwhelmed', type: 'detox' },
          { label: 'Low mood, sluggish', type: 'detox' }
        ]
      },
      {
        question: 'Your current wellness goal:',
        options: [
          { label: 'Detox & healing', type: 'rejuvenation' },
          { label: 'Stress relief & mental clarity', type: 'balance' },
          { label: 'Weight balance & fitness', type: 'detox' },
          { label: 'Better sleep & relaxation', type: 'rejuvenation' },
          { label: 'Pain relief', type: 'balance' }
        ]
      },
      {
        question: 'Your lifestyle:',
        options: [
          { label: 'Very active', type: 'rejuvenation' },
          { label: 'Moderately active', type: 'balance' },
          { label: 'Long sitting hours', type: 'detox' },
          { label: 'Very little movement', type: 'detox' }
        ]
      },
      {
        question: 'How do you handle stress?',
        options: [
          { label: 'Breathwork/meditation', type: 'rejuvenation' },
          { label: 'Talking to someone', type: 'balance' },
          { label: 'Scrolling/social media', type: 'detox' },
          { label: 'Ignore it', type: 'detox' }
        ]
      },
      {
        question: 'Your diet style:',
        options: [
          { label: 'Mostly natural', type: 'rejuvenation' },
          { label: 'Mixed', type: 'balance' },
          { label: 'Quick/convenient meals', type: 'detox' },
          { label: 'Irregular/emotional eating', type: 'detox' }
        ]
      },
      {
        question: 'Sleep pattern:',
        options: [
          { label: '7–8 hours', type: 'rejuvenation' },
          { label: 'Sometimes disturbed', type: 'balance' },
          { label: 'Poor quality', type: 'detox' },
          { label: 'Very irregular', type: 'detox' }
        ]
      },
      {
        question: 'Therapies that interest you:',
        options: [
          { label: 'Naturopathy', type: 'rejuvenation' },
          { label: 'Yoga & meditation', type: 'balance' },
          { label: 'Holistic & Ayurveda', type: 'detox' },
          { label: 'Sound/music healing', type: 'balance' },
          { label: 'Nutrition coaching', type: 'rejuvenation' }
        ]
      }
    ],
    results: {
      rejuvenation: {
        badge: 'YOUR RESULT',
        title: 'Rejuvenation Focus',
        subtitle: 'Restore & Revitalize',
        desc: 'Your body signals a need for grounding and nervous system support. You may feel scattered or energetic in bursts, but true vitality comes from deep rest.',
        recommendation: 'Therapeutic Massages, Sun Therapy (Heliotherapy), and restorative Hydrotherapy to calm the nerves and rebuild immunity.',
        targetRoute: 'programmes/rejuvenation'
      },
      balance: {
        badge: 'YOUR RESULT',
        title: 'Balance Focus',
        subtitle: 'Cool & Calm',
        desc: 'You likely have a strong drive but may be prone to overheating or irritability. Your system needs cooling and moderation to maintain equilibrium.',
        recommendation: 'Mud Therapy (cooling packs), Spinal Sprays, and stress-relief Yoga to reduce internal heat and promote mental clarity.',
        targetRoute: 'programmes/rejuvenation'
      },
      detox: {
        badge: 'YOUR RESULT',
        title: 'Cellular Detox Focus',
        subtitle: 'Metabolic Cleanse',
        desc: 'Your body is signaling an accumulation of metabolic waste (Ama). A structured purification protocol will restore digestion and mental lightness.',
        recommendation: 'Colon Hydrotherapy, Full Body Mud Wraps, and Bio-Fasting to eliminate toxins and reboot metabolic health.',
        targetRoute: 'programmes/detox-cleansing'
      }
    }
  },
  {
    id: 'detox',
    tabTitle: 'Is Your Body Ready for a Detox?',
    heroTitle: 'Is Your Body Ready for a Detox?',
    heroSubtitle: 'A quick 90-second assessment to gauge detox needs.',
    questions: [
      {
        question: 'How often do you feel bloated or heavy?',
        options: [
          { label: 'Rarely', score: 0 },
          { label: 'A few times a week', score: 1 },
          { label: 'Almost daily', score: 2 },
          { label: 'Every day', score: 3 }
        ]
      },
      {
        question: 'Energy levels after waking up:',
        options: [
          { label: 'Fresh and ready', score: 0 },
          { label: 'Slowly warming up', score: 1 },
          { label: 'Tired even after sleep', score: 2 },
          { label: 'Exhausted', score: 3 }
        ]
      },
      {
        question: 'Skin & digestion indicators:',
        options: [
          { label: 'Clear skin, smooth digestion', score: 0 },
          { label: 'Occasional breakouts/sluggishness', score: 1 },
          { label: 'Frequent acidity or constipation', score: 2 },
          { label: 'Chronic digestive issues', score: 3 }
        ]
      },
      {
        question: 'Eating habits:',
        options: [
          { label: 'Fresh home-cooked meals', score: 0 },
          { label: 'Mixed (home + processed)', score: 1 },
          { label: 'Mostly processed or quick meals', score: 2 },
          { label: 'Late-night or emotional eating', score: 3 }
        ]
      },
      {
        question: 'Daily water intake:',
        options: [
          { label: '2–3 litres', score: 0 },
          { label: '1.5–2 litres', score: 1 },
          { label: 'Less than 1.5 litres', score: 2 },
          { label: 'Very low intake', score: 3 }
        ]
      },
      {
        question: 'Stress & sleep quality:',
        options: [
          { label: 'Low stress, deep sleep', score: 0 },
          { label: 'Moderate stress', score: 1 },
          { label: 'High stress, restless sleep', score: 2 },
          { label: 'Severe burnout, insomnia', score: 3 }
        ]
      },
      {
        question: 'Which symptoms do you experience most?',
        options: [
          { label: 'Occasional mild fatigue', score: 0 },
          { label: 'Dull skin & brain fog', score: 1 },
          { label: 'Joint stiffness & chronic tiredness', score: 2 },
          { label: 'Persistent body pain & lethargy', score: 3 }
        ]
      }
    ],
    getDetoxResult: (totalScore) => {
      if (totalScore <= 5) {
        return {
          badge: `Your Detox Score: ${totalScore}`,
          title: 'Light Clean-Up Needed',
          subtitle: 'Gentle detox suggestions',
          desc: 'Your body shows mild signs of toxin buildup. A simple clean-up can refresh your system.',
          recommendation: 'Try a short 3-day juice cleanse, increase water intake, and incorporate gentle herbal teas.',
          targetRoute: 'programmes/rejuvenation'
        };
      } else if (totalScore <= 12) {
        return {
          badge: `Your Detox Score: ${totalScore}`,
          title: 'Moderate Detox Recommended',
          subtitle: 'Targeted detox suggestions',
          desc: 'Accumulated environmental and metabolic toxins are slowing your metabolic rate. A 7-day targeted Naturopathy cleanse is recommended.',
          recommendation: 'Full Body Mud Wrap, Hydrotherapy, and Naturopathic detox protocol.',
          targetRoute: 'programmes/detox-cleansing'
        };
      } else {
        return {
          badge: `Your Detox Score: ${totalScore}`,
          title: 'Deep Bio-Detox Required',
          subtitle: 'Intensive detox suggestions',
          desc: 'Your system shows high signs of metabolic waste buildup and digestive fatigue. An intensive clinical protocol is required.',
          recommendation: 'Colon Hydrotherapy, Bio-Fasting, and 14-Day Panchakarma Purification.',
          targetRoute: 'programmes/advanced-healing'
        };
      }
    }
  },
  {
    id: 'stress',
    tabTitle: 'How Stressed Is Your Body?',
    heroTitle: 'How Stressed Is Your Body?',
    heroSubtitle: 'A quick 60-second assessment of your stress levels.',
    questions: [
      {
        question: '1. How often do you feel mentally exhausted?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '2. Do you find it hard to fall asleep or stay asleep?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '3. How frequently do you feel irritated or overwhelmed?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '4. Do you experience headaches or muscle tension?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '5. How often do you struggle to concentrate?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '6. Do you reach for sugar or caffeine to feel better?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '7. How often do you feel rushed or pressured?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '8. Do you experience digestive issues when stressed?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '9. How often do you sit for long hours without breaks?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      },
      {
        question: '10. Does your mind stay active even when your body wants rest?',
        options: [{ label: 'Never', score: 0 }, { label: 'Sometimes', score: 1 }, { label: 'Often', score: 2 }, { label: 'Almost Always', score: 3 }]
      }
    ],
    getStressResult: (totalScore) => {
      if (totalScore <= 10) {
        return {
          badge: `Your Stress Score: ${totalScore}`,
          title: 'Relaxed Mind',
          subtitle: 'Gentle stress relief suggestions',
          desc: 'Your mind and body are in a healthy equilibrium. Maintain your daily routine and mindfulness.',
          recommendation: 'Pranayama breathwork, barefoot riverbank grounding, and gentle yoga.',
          targetRoute: 'programmes/rejuvenation'
        };
      } else if (totalScore <= 20) {
        return {
          badge: `Your Stress Score: ${totalScore}`,
          title: 'Moderate Stress',
          subtitle: 'Targeted stress relief suggestions',
          desc: 'Stress is beginning to impact your sleep patterns and energy. A parasympathetic reset is recommended.',
          recommendation: 'Shirodhara warm oil therapy, sound healing, and stress-relief yoga.',
          targetRoute: 'programmes/rejuvenation'
        };
      } else {
        return {
          badge: `Your Stress Score: ${totalScore}`,
          title: 'High Stress',
          subtitle: 'Deep stress relief suggestions',
          desc: 'Your nervous system is in constant fight-or-flight mode. An intensive sanctuary retreat stay is recommended.',
          recommendation: 'Deep restorative packages, sound healing, and holistic wellness retreat.',
          targetRoute: 'programmes/holistic-wellness'
        };
      }
    }
  }
];

export default function DiscoverWellnessAssessment({ onNavigate }) {
  const [activeQuizIdx, setActiveQuizIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // Typewriter effect state
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const activeQuiz = quizData[activeQuizIdx];

  // Reset & restart typewriter effect whenever active quiz changes or reset is clicked
  useEffect(() => {
    setTypedTitle('');
    setTypedSubtitle('');
    setIsTypingDone(false);

    let titleIdx = 0;
    let subtitleIdx = 0;
    const fullTitle = activeQuiz.heroTitle;
    const fullSubtitle = activeQuiz.heroSubtitle;

    const titleTimer = setInterval(() => {
      if (titleIdx <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, titleIdx));
        titleIdx++;
      } else {
        clearInterval(titleTimer);

        // Start typing subtitle after title finishes
        const subtitleTimer = setInterval(() => {
          if (subtitleIdx <= fullSubtitle.length) {
            setTypedSubtitle(fullSubtitle.slice(0, subtitleIdx));
            subtitleIdx++;
          } else {
            clearInterval(subtitleTimer);
            setIsTypingDone(true);
          }
        }, 30);
      }
    }, 45);

    return () => {
      clearInterval(titleTimer);
    };
  }, [activeQuizIdx, isStarted]);

  const handleSelectQuiz = (idx) => {
    setActiveQuizIdx(idx);
    setCurrentStep(0);
    setIsStarted(false);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep + 1 < activeQuiz.questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      if (activeQuiz.id === 'type') {
        const counts = { balance: 0, rejuvenation: 0, detox: 0 };
        newAnswers.forEach(ans => {
          if (ans.type) counts[ans.type] = (counts[ans.type] || 0) + 1;
        });
        const highestType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'rejuvenation');
        setResult(activeQuiz.results[highestType]);
      } else if (activeQuiz.id === 'detox') {
        const totalScore = newAnswers.reduce((sum, item) => sum + (item.score || 0), 0);
        setResult(activeQuiz.getDetoxResult(totalScore));
      } else if (activeQuiz.id === 'stress') {
        const totalScore = newAnswers.reduce((sum, item) => sum + (item.score || 0), 0);
        setResult(activeQuiz.getStressResult(totalScore));
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsStarted(false);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Quiz Tab Switcher */}
      <div style={{
        display: 'flex',
        gap: '0.8rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2.5rem'
      }}>
        {quizData.map((q, idx) => (
          <motion.button
            key={q.id}
            onClick={() => handleSelectQuiz(idx)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.75rem 1.6rem',
              borderRadius: '50px',
              border: activeQuizIdx === idx ? '1.5px solid var(--wine)' : '1px solid rgba(94, 39, 53, 0.25)',
              backgroundColor: activeQuizIdx === idx ? 'var(--wine)' : '#F9F5F0',
              color: activeQuizIdx === idx ? '#F5D7A1' : 'var(--wine)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeQuizIdx === idx ? '0 6px 20px rgba(94, 39, 53, 0.22)' : 'none'
            }}
          >
            {q.tabTitle}
          </motion.button>
        ))}
      </div>

      {/* Main Container — Animated full showcase or 2-column split */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(94, 39, 53, 0.15)',
          display: 'grid',
          gridTemplateColumns: isStarted ? 'minmax(300px, 1fr) minmax(360px, 1.3fr)' : '1fr',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(94, 39, 53, 0.12)',
          minHeight: '440px'
        }}
        className="flex-stack-mobile"
      >
        {/* Left Column / Full Showcase Hero Panel */}
        <motion.div
          layout
          style={{
            backgroundColor: '#5E2735',
            backgroundImage: 'radial-gradient(circle at top right, #5E2735 0%, #2D121A 100%)',
            color: '#ffffff',
            padding: isStarted ? '3.5rem 3rem' : '4.5rem 3.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Glowing Background Orbs */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234, 169, 54, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div>
            {/* Play Button Icon */}
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <Play size={20} style={{ color: '#ffffff', marginLeft: '3px' }} />
            </motion.div>

            {/* Typewriter Title */}
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isStarted ? '2.1rem' : '2.8rem',
              color: '#ffffff',
              lineHeight: 1.2,
              fontWeight: 600,
              margin: '0 0 1.2rem 0',
              minHeight: '3.6rem',
              transition: 'font-size 0.4s ease'
            }}>
              {typedTitle}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{ color: '#EAA936', marginLeft: '2px', fontWeight: 300 }}
              >
                |
              </motion.span>
            </h2>

            {/* Typewriter Subtitle */}
            <p style={{
              fontSize: isStarted ? '1.05rem' : '1.25rem',
              color: 'rgba(255, 255, 255, 0.88)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.5,
              margin: '0 0 2rem 0',
              maxWidth: '540px'
            }}>
              {typedSubtitle}
            </p>
          </div>

          {/* Intro Action Button when in full showcase mode */}
          {!isStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isTypingDone ? 1 : 0.8, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={() => setIsStarted(true)}
                whileHover={{ scale: 1.05, backgroundColor: '#F5D7A1' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: '#EAA936',
                  color: '#3D1822',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '1rem 2.8rem',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(234, 169, 54, 0.35)',
                  letterSpacing: '0.04em'
                }}
              >
                Start Assessment →
              </motion.button>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                ✦ 90-Second Personalized Diagnosis
              </span>
            </motion.div>
          ) : (
            <div>
              <p style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                margin: '0 0 1rem 0'
              }}>
                {activeQuiz.heroSubtitle}
              </p>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#EAA936', opacity: 0.6 }} />
            </div>
          )}
        </motion.div>

        {/* Right Column: Interactive Questions / Results */}
        {isStarted && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              backgroundColor: '#FAF6F0',
              padding: '3.5rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {result ? (
              /* Results Screen — Luxury Animated Result Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, type: 'spring', damping: 22 }}
                style={{ textAlign: 'center' }}
              >
                {/* Gold Checkmark Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#F5D7A1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.1rem',
                    boxShadow: '0 6px 20px rgba(234, 169, 54, 0.28)'
                  }}
                >
                  <Check size={28} style={{ color: '#8A5A1A', strokeWidth: 3 }} />
                </motion.div>

                {/* Badge above title */}
                <span style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#C88A2B',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.5rem'
                }}>
                  {result.badge}
                </span>

                {/* Main Title */}
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  color: 'var(--wine)',
                  fontWeight: 700,
                  margin: '0 0 0.3rem 0',
                  lineHeight: 1.2
                }}>
                  {result.title}
                </h2>

                {/* Subtitle */}
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  color: '#C88A2B',
                  fontWeight: 600,
                  margin: '0 0 1.5rem 0'
                }}>
                  {result.subtitle}
                </h4>

                {/* Cream Description & Recommendation Box */}
                <div style={{
                  backgroundColor: '#FAF3EB',
                  border: '1px solid rgba(220, 195, 170, 0.4)',
                  borderRadius: '18px',
                  padding: '1.6rem 1.8rem',
                  textAlign: 'left',
                  marginBottom: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem'
                }}>
                  <p style={{
                    fontSize: '0.92rem',
                    color: '#4A3B32',
                    lineHeight: 1.65,
                    margin: 0,
                    fontWeight: 500
                  }}>
                    {result.desc}
                  </p>

                  {/* Recommendation Item */}
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#D9822B', fontSize: '1.1rem', lineHeight: 1.2, marginTop: '2px' }}>
                      ▷
                    </span>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#3E2D24',
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      <strong style={{ color: '#8A4820', fontWeight: 700 }}>Recommendation: </strong>
                      {result.recommendation}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onNavigate ? onNavigate(result.targetRoute) : onNavigate('programmes')}
                    style={{
                      backgroundColor: '#5E2735',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.9rem 2.2rem',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 15px rgba(94, 39, 53, 0.25)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A1D29'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5E2735'}
                  >
                    Explore Packages
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    style={{
                      backgroundColor: '#F0E6D8',
                      color: '#5E2735',
                      border: '1px solid rgba(94, 39, 53, 0.2)',
                      borderRadius: '12px',
                      padding: '0.9rem 1.8rem',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5D7C3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F0E6D8'}
                  >
                    <RefreshCw size={16} /> Retake Quiz
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Question Progression Screen */
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Progress Indicator */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Question {currentStep + 1} of {activeQuiz.questions.length}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--redwood)', fontWeight: 600 }}>
                      {Math.round(((currentStep + 1) / activeQuiz.questions.length) * 100)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    height: '6px',
                    width: '100%',
                    backgroundColor: 'rgba(94, 39, 53, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '1.8rem'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / activeQuiz.questions.length) * 100}%` }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ height: '100%', backgroundColor: '#EAA936' }}
                    />
                  </div>

                  {/* Question Prompt */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    color: 'var(--wine)',
                    fontWeight: 700,
                    marginBottom: '1.6rem',
                    lineHeight: 1.35
                  }}>
                    {activeQuiz.questions[currentStep].question}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activeQuiz.questions[currentStep].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.015, x: 4 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleAnswerSelect(opt)}
                        style={{
                          width: '100%',
                          padding: '0.95rem 1.3rem',
                          borderRadius: '12px',
                          border: '1.5px solid rgba(94, 39, 53, 0.15)',
                          backgroundColor: '#ffffff',
                          color: 'var(--wine)',
                          fontWeight: 600,
                          fontSize: '0.92rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease, border-color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--wine)';
                          e.currentTarget.style.color = '#F5D7A1';
                          e.currentTarget.style.borderColor = 'var(--wine)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.color = 'var(--wine)';
                          e.currentTarget.style.borderColor = 'rgba(94, 39, 53, 0.15)';
                        }}
                      >
                        <span>{opt.label}</span>
                        <ArrowRight size={16} style={{ opacity: 0.7 }} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
