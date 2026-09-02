import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ArrowRight, ArrowLeft, RotateCcw, User, Mail, Phone, Sparkles } from 'lucide-react';

const quizTabs = [
  {
    id: 'wellness-type',
    tabLabel: "WHAT'S YOUR WELLNESS TYPE?",
    bannerTitle: "What's Your Wellness Type?",
    bannerSub: "Discover your wellness profile and your therapeutic needs.",
    introTitle: "Ready to discover your What's Your Wellness Type??",
    introSub: "Discover your wellness profile and your therapeutic needs.",
    bannerImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    questions: [
      {
        id: 'q1',
        text: 'How are you feeling most days?',
        multi: false,
        options: ['Energised & productive', 'Often tired', 'Stressed / overwhelmed', 'Low mood, sluggish']
      },
      {
        id: 'q2',
        text: 'Your current wellness goal:',
        multi: false,
        options: ['Detox & healing', 'Stress relief & mental clarity', 'Weight balance & fitness', 'Better sleep & relaxation', 'Pain relief']
      },
      {
        id: 'q3',
        text: 'Your lifestyle:',
        multi: false,
        options: ['Very active', 'Moderately active', 'Long sitting hours', 'Very little movement']
      },
      {
        id: 'q4',
        text: 'How do you handle stress?',
        multi: false,
        options: ['Breathwork / meditation', 'Talking to someone', 'Scrolling / social media', 'Ignore it']
      },
      {
        id: 'q5',
        text: 'Your diet style:',
        multi: false,
        options: ['Mostly natural', 'Mixed', 'Quick / convenient meals', 'Irregular / emotional eating']
      },
      {
        id: 'q6',
        text: 'Sleep pattern:',
        multi: false,
        options: ['7-8 hours', 'Sometimes disturbed', 'Poor quality', 'Very irregular']
      },
      {
        id: 'q7',
        text: 'Therapies that interest you:',
        multi: false,
        options: ['Naturopathy', 'Yoga & meditation', 'Holistic', 'Sound / music healing', 'Nutrition Coaching']
      }
    ]
  },
  {
    id: 'body-detox',
    tabLabel: "IS YOUR BODY READY FOR A DETOX?",
    bannerTitle: "Is Your Body Ready for a Detox?\nA quick 90-second assessment to gauge detox needs.",
    bannerSub: "A quick 90-second assessment to gauge detox needs.",
    introTitle: "Ready to discover your Is Your Body Ready for a Detox??",
    introSub: "A quick 90-second assessment to gauge detox needs.",
    bannerImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    questions: [
      {
        id: 'q1',
        text: 'How often do you feel bloated or heavy?',
        multi: false,
        options: ['Rarely', 'A few times a week', 'Almost daily', 'Every day']
      },
      {
        id: 'q2',
        text: 'Energy levels after waking up:',
        multi: false,
        options: ['Fresh & ready', 'Slowly warm up', 'Tired even after sleep', 'Exhausted']
      },
      {
        id: 'q3',
        text: 'Skin & digestion indicators:',
        multi: false,
        options: ['Clear skin, smooth digestion', 'Occasional issues', 'Frequent constipation / acidity', 'Chronic issues']
      },
      {
        id: 'q4',
        text: 'Eating habits:',
        multi: false,
        options: ['Fresh home-cooked meals', 'Mixed (home + processed)', 'Mostly processed / quick foods', 'Late night or emotional eating']
      },
      {
        id: 'q5',
        text: 'Water intake:',
        multi: false,
        options: ['2-3 litres', '1.5 - 2 litres', 'Less than 1.5 litres', 'Very low']
      },
      {
        id: 'q6',
        text: 'Stress & sleep quality:',
        multi: false,
        options: ['Low stress, good sleep', 'Moderate', 'High stress / poor sleep', 'Very irregular sleep']
      },
      {
        id: 'q7',
        text: 'Symptoms you experience (tick applicable):',
        multi: true,
        options: ['Headache', 'Fatigue', 'Skin dullness', 'Body aches', 'Irritability', 'Brain fog']
      }
    ]
  },
  {
    id: 'body-stress',
    tabLabel: "HOW STRESSED IS YOUR BODY?",
    bannerTitle: "How Stressed Is Your Body?\n60-second stress score quiz.",
    bannerSub: "60-second stress score quiz.",
    introTitle: "Ready to discover your How Stressed Is Your Body??",
    introSub: "60-second stress score quiz.",
    bannerImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    questions: [
      { id: 'q1', text: 'How often do you feel mentally exhausted?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q2', text: 'Do you find it hard to fall asleep or stay asleep?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q3', text: 'How frequently do you feel irritated, anxious, or overwhelmed?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q4', text: 'Do you experience headaches, heaviness, or muscle tension?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q5', text: 'How often do you forget things or struggle to concentrate?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q6', text: 'Do you reach for sugar, tea/coffee, or snacks to feel better?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q7', text: 'How often do you feel rushed, pressured, or like you’re falling behind?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q8', text: 'Do you experience digestive issues when stressed?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q9', text: 'How often do you sit for long hours without breaks?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
      { id: 'q10', text: 'Does your mind stay active even when your body wants rest?', multi: false, options: ['Never', 'Sometimes', 'Often', 'Almost always'] }
    ]
  }
];

export default function WellnessQuiz({ onNavigate }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [quizStep, setQuizStep] = useState('intro'); // 'intro', 'quiz', 'contact', 'thankyou'
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  const currentTab = quizTabs[activeTabIdx];
  const questions = currentTab.questions;
  const currentQuestion = questions[currentQIdx] || questions[0];

  const handleTabChange = (idx) => {
    setActiveTabIdx(idx);
    setQuizStep('intro');
    setCurrentQIdx(0);
    setUserAnswers({});
  };

  const handleStartQuiz = () => {
    setQuizStep('quiz');
    setCurrentQIdx(0);
    setUserAnswers({});
  };

  const handleOptionSelect = (option) => {
    if (currentQuestion.multi) {
      const prevList = Array.isArray(userAnswers[currentQuestion.id]) ? userAnswers[currentQuestion.id] : [];
      if (prevList.includes(option)) {
        setUserAnswers({ ...userAnswers, [currentQuestion.id]: prevList.filter(item => item !== option) });
      } else {
        setUserAnswers({ ...userAnswers, [currentQuestion.id]: [...prevList, option] });
      }
    } else {
      setUserAnswers({ ...userAnswers, [currentQuestion.id]: option });
    }
  };

  const isCurrentQAnswered = () => {
    const ans = userAnswers[currentQuestion.id];
    if (currentQuestion.multi) {
      return Array.isArray(ans) && ans.length > 0;
    }
    return Boolean(ans);
  };

  const handleNextQ = () => {
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      setQuizStep('contact');
    }
  };

  const handlePrevQ = () => {
    if (currentQIdx > 0) {
      setCurrentQIdx(prev => prev - 1);
    } else {
      setQuizStep('intro');
    }
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setQuizStep('thankyou');

    // Trigger Mailto link generation for doctor notification
    const subject = encodeURIComponent(`New Diagnostic Assessment: ${currentTab.tabLabel}`);
    const bodyLines = [
      `Name: ${userInfo.name}`,
      `Email: ${userInfo.email}`,
      `Phone: ${userInfo.phone}`,
      `Category: ${currentTab.tabLabel}`,
      `-----------------------------------------`,
      ...questions.map(q => {
        const val = userAnswers[q.id];
        const valStr = Array.isArray(val) ? val.join(', ') : (val || 'Not Answered');
        return `${q.text}\nAnswer: ${valStr}\n`;
      })
    ];
    const mailtoUrl = `mailto:admissions@supradawellness.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    
    // Attempt opening mailto link silently in background
    try {
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.target = '_blank';
      a.click();
    } catch (err) {
      console.log('Mailto triggered', err);
    }
  };

  const progressPercent = Math.round(((currentQIdx + 1) / questions.length) * 100);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* Section Header - Styled exactly like other Home page sections */}
      <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
        <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.24em', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
          ✦ Instant Diagnostic Assessment
        </span>
        <h2 style={{ color: 'var(--wine)', margin: 0 }}>
          Discover Your <em style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Wellness Path</em>
        </h2>
      </div>

      {/* Top 3 Section Pill Tabs Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '0.6rem', 
        flexWrap: 'wrap', 
        marginBottom: '1.8rem' 
      }}>
        {quizTabs.map((tab, idx) => {
          const isActive = activeTabIdx === idx;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(idx)}
              style={{
                backgroundColor: isActive ? '#C2BA90' : '#FAF0E6',
                color: 'var(--wine)',
                border: isActive ? '2px solid var(--wine)' : '1px solid rgba(94, 39, 53, 0.15)',
                borderRadius: '12px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 4px 14px rgba(194, 186, 144, 0.45)' : 'none'
              }}
            >
              {tab.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Split Exhibition Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1.5px solid rgba(94, 39, 53, 0.12)',
        boxShadow: '0 20px 60px rgba(94, 39, 53, 0.08)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        minHeight: '440px'
      }}>
        
        {/* Left Column: Light Herbal Sage & Tea Green Banner Overlay */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #C2BA90 0%, #D3DFCC 55%, #E7EDE8 100%)',
          padding: '2.5rem 2.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'var(--wine)',
          overflow: 'hidden'
        }}>
          {/* Background Image Overlay */}
          <img 
            src={currentTab.bannerImage} 
            alt={currentTab.bannerTitle}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, mixBlendMode: 'multiply' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(194, 186, 144, 0.75) 0%, rgba(211, 223, 204, 0.8) 100%)', zIndex: 1 }} />

          {/* Top Play Badge Icon */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(94, 39, 53, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(94, 39, 53, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Play size={16} fill="var(--wine)" style={{ color: 'var(--wine)', marginLeft: '2px' }} />
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.28, margin: '0 0 0.8rem 0', fontFamily: 'var(--font-heading)' }}>
              {currentTab.bannerTitle.split('\n')[0]}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--wine)', opacity: 0.88, lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
              {currentTab.bannerSub}
            </p>
          </div>

          {/* Bottom Flourish Line */}
          <div style={{ position: 'relative', zIndex: 2, marginTop: '1.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ height: '1.5px', flex: 1, backgroundColor: 'var(--wine)', opacity: 0.35 }} />
              <span style={{ color: 'var(--wine)', fontSize: '0.8rem' }}>✦</span>
              <div style={{ height: '1.5px', flex: 1, backgroundColor: 'var(--wine)', opacity: 0.35 }} />
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Dynamic Step Content */}
        <div style={{ padding: '2.4rem 2.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#ffffff' }}>
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: INTRO STEP */}
            {quizStep === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
              >
                <h3 style={{ fontSize: '1.25rem', color: 'var(--wine)', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
                  {currentTab.introTitle}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.55, margin: 0 }}>
                  {currentTab.introSub}
                </p>

                <div style={{ marginTop: '0.8rem' }}>
                  <button
                    onClick={handleStartQuiz}
                    className="btn-luxury"
                    style={{
                      padding: '0.8rem 2rem',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Start Assessment <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: QUIZ QUESTION STEPPER */}
            {quizStep === 'quiz' && (
              <motion.div
                key={`quiz-${currentQIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
              >
                <div>
                  {/* Top Progress Bar & Question Counter */}
                  <div style={{ marginBottom: '1.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.66rem', color: 'var(--wine)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        QUESTION {currentQIdx + 1} OF {questions.length}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--wine)', fontWeight: 800 }}>
                        {progressPercent}%
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div style={{ height: '4px', backgroundColor: '#E7EDE8', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3 }}
                        style={{ height: '100%', backgroundColor: '#C2BA90', borderRadius: '10px' }}
                      />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--wine)', fontWeight: 700, margin: '0 0 1.2rem 0', lineHeight: 1.35 }}>
                    {currentQuestion.text}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected = currentQuestion.multi
                        ? Array.isArray(userAnswers[currentQuestion.id]) && userAnswers[currentQuestion.id].includes(opt)
                        : userAnswers[currentQuestion.id] === opt;

                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleOptionSelect(opt)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid var(--wine)' : '1.5px solid rgba(94, 39, 53, 0.12)',
                            backgroundColor: isSelected ? '#F4DACA' : '#F2ECE4',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isSelected ? '0 4px 12px rgba(184, 94, 76, 0.12)' : 'none'
                          }}
                        >
                          {/* Circle indicator */}
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? '#C2BA90' : '#E6D3C0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s ease'
                          }}>
                            {isSelected && <Check size={14} style={{ color: 'var(--wine)' }} />}
                          </div>

                          <span style={{ fontSize: '0.85rem', color: 'var(--wine)', fontWeight: isSelected ? 700 : 500 }}>
                            {opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                  <button
                    onClick={handlePrevQ}
                    style={{
                      padding: '0.65rem 1.2rem',
                      borderRadius: '30px',
                      border: '1.5px solid rgba(94, 39, 53, 0.25)',
                      backgroundColor: 'transparent',
                      color: 'var(--wine)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>

                  <button
                    onClick={handleNextQ}
                    disabled={!isCurrentQAnswered()}
                    className="btn-luxury"
                    style={{
                      padding: '0.65rem 1.6rem',
                      fontSize: '0.78rem',
                      opacity: isCurrentQAnswered() ? 1 : 0.5,
                      cursor: isCurrentQAnswered() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    {currentQIdx < questions.length - 1 ? 'Next Question' : 'Complete Assessment'} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: USER CONTACT & SUBMISSION FORM */}
            {quizStep === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
              >
                <div>
                  <span style={{ color: 'var(--redwood)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    ✦ FINAL STEP
                  </span>
                  <h3 style={{ fontSize: '1.45rem', color: 'var(--wine)', fontWeight: 700, margin: '0.2rem 0 0.4rem 0' }}>
                    Submit Your Assessment
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
                    Please enter your details so our resident doctors can review your responses and arrange a personalized consultation session.
                  </p>
                </div>

                <form onSubmit={handleSubmitQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--wine)', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--wine)', opacity: 0.5 }} />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Ananya Sharma"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        style={{
                          width: '100%', padding: '0.65rem 0.8rem 0.65rem 2.4rem', borderRadius: '10px',
                          border: '1.5px solid rgba(94, 39, 53, 0.2)', fontSize: '0.88rem', color: 'var(--wine)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--wine)', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                      Email Address *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--wine)', opacity: 0.5 }} />
                      <input 
                        type="email" 
                        required 
                        placeholder="e.g. ananya@example.com"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        style={{
                          width: '100%', padding: '0.65rem 0.8rem 0.65rem 2.4rem', borderRadius: '10px',
                          border: '1.5px solid rgba(94, 39, 53, 0.2)', fontSize: '0.88rem', color: 'var(--wine)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: 'var(--wine)', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                      Mobile Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--wine)', opacity: 0.5 }} />
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. +91 98765 43210"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        style={{
                          width: '100%', padding: '0.65rem 0.8rem 0.65rem 2.4rem', borderRadius: '10px',
                          border: '1.5px solid rgba(94, 39, 53, 0.2)', fontSize: '0.88rem', color: 'var(--wine)'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.6rem' }}>
                    <button
                      type="button"
                      onClick={() => setQuizStep('quiz')}
                      style={{
                        padding: '0.75rem 1.2rem', borderRadius: '30px',
                        border: '1.5px solid rgba(94, 39, 53, 0.25)', backgroundColor: 'transparent',
                        color: 'var(--wine)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      Back to Quiz
                    </button>

                    <button
                      type="submit"
                      className="btn-luxury"
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.8rem', flex: 1 }}
                    >
                      Submit Assessment &rarr;
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* VIEW 4: THANK YOU CONFIRMATION SCREEN */}
            {quizStep === 'thankyou' && (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '1rem 0' }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  backgroundColor: 'rgba(220, 160, 50, 0.15)', color: 'var(--wine)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--harvest-gold)', margin: '0 auto'
                }}>
                  <Sparkles size={32} style={{ color: 'var(--wine)' }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--wine)', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                    Assessment Recorded!
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: 'var(--wine)', fontWeight: 600, lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
                    Our doctor will contact you soon for your requirements, and a detailed consultation session can be arranged.
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--isabelline)', padding: '0.9rem 1.4rem', borderRadius: '12px', border: '1px solid rgba(94,39,53,0.12)', maxWidth: '420px', width: '100%' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                    ✦ RECORDED FOR: {userInfo.name}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--wine)', opacity: 0.85 }}>
                    {userInfo.email} • {userInfo.phone}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => handleTabChange(activeTabIdx)}
                    style={{
                      padding: '0.65rem 1.4rem', borderRadius: '30px',
                      border: '1.5px solid var(--wine)', backgroundColor: 'transparent',
                      color: 'var(--wine)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.4rem'
                    }}
                  >
                    <RotateCcw size={14} /> Retake Assessment
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-luxury"
                    style={{ padding: '0.65rem 1.6rem', fontSize: '0.78rem' }}
                  >
                    Direct Doctor Booking &rarr;
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
