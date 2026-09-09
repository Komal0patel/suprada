import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { 
  Sparkles, Calendar, Users, Home, User, Mail, 
  Phone, MessageSquare, Check, ArrowRight, ArrowLeft, 
  ShieldCheck, Clock, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';

const programmesList = [
  { id: 'naturopathy', name: 'Naturopathy & Natural Medicine', desc: 'Holistic healing via 5 elements, hydrotherapy & fasting', durations: ['7 Days', '14 Days', '21 Days'], defaultDuration: '7 Days' },
  { id: 'yoga-meditation', name: 'Yoga, Pranayama & Meditation', desc: 'Asanas, sunrise kriyas, breathwork & sound healing', durations: ['3 Days', '7 Days', '14 Days'], defaultDuration: '7 Days' },
  { id: 'holistic-therapies', name: 'Holistic Therapies & Energy Healing', desc: 'Vibrational sound baths, acupuncture & marma therapy', durations: ['5 Days', '7 Days', '10 Days'], defaultDuration: '7 Days' },
  { id: 'nutrition-lifestyle', name: 'Nutrition & Lifestyle Reset', desc: 'Satwik farm-to-table dining, gut repair & detox juices', durations: ['5 Days', '7 Days', '14 Days'], defaultDuration: '7 Days' },
  { id: 'mental-emotional', name: 'Stress & Emotional Management', desc: 'Professional counselling, mindfulness & inner peace', durations: ['5 Days', '7 Days', '14 Days'], defaultDuration: '7 Days' },
  { id: 'detox-cleansing', name: 'Detox & Cellular Cleansing', desc: 'Colon hydrotherapy, therapeutic enema & herbal scrubs', durations: ['7 Days', '14 Days', '21 Days'], defaultDuration: '7 Days' },
  { id: 'physiotherapy', name: 'Physiotherapy & Pain Recovery', desc: 'Electrotherapy, dry needling & joint mobilization', durations: ['5 Days', '7 Days', '14 Days'], defaultDuration: '7 Days' },
  { id: 'ayurveda', name: 'Ayurveda & Rejuvenation', desc: 'Authentic Taila Shirodhara, Abhyangam & dosha balance', durations: ['5 Days', '7 Days', '14 Days'], defaultDuration: '7 Days' },
  { id: 'weekend-reset', name: '2-Day Weekend Sanctuary Reset', desc: 'Quick rejuvenation retreat by the Suvarnamukhi River', durations: ['2 Days'], defaultDuration: '2 Days' }
];

const accommodationsList = [
  {
    id: 'guha',
    name: 'Guha Sanctuary Cottage',
    type: 'Eco-Luxury Cottage',
    desc: 'Earth-sheltered private cottage with personal riverfront sit-out veranda and open sky rain shower.',
    image: '/assets/guha.png',
    features: ['Riverfront View', 'Private Sit-Out', 'Eco-Air Cooling', 'Satwik In-Room Tea Bar']
  },
  {
    id: 'samprapti',
    name: 'Samprapti Garden Villa',
    type: 'Luxury Villa',
    desc: 'Spacious stone villa amidst medicinal herbal groves, high terracotta ceilings, and sunlit courtyard.',
    image: '/assets/samprapti.png',
    features: ['Herbal Garden View', 'Courtyard Sitting', 'Spacious Dressing Area', 'Natural Stone Bath']
  },
  {
    id: 'subhiksha',
    name: 'Subhiksha Premium Retreat',
    type: 'Presidential Suite',
    desc: 'Dual-level luxury estate cottage with master bedroom, private therapy nook, and panoramic river view.',
    image: '/assets/subhiksha.png',
    features: ['Panoramic River View', 'Private Treatment Nook', 'Plunge Jacuzzi', 'Dedicated Butler Care']
  },
  {
    id: 'deluxe',
    name: 'Swasthya Wellness Room',
    type: 'Standard Heritage Room',
    desc: 'Serene minimalist room designed with natural jute and terracotta for restful, restorative sleep.',
    image: '/assets/deluxe.png',
    features: ['Quiet Forest View', 'Organic Cotton Linen', 'Writing Desk', 'Herbal Amenities']
  }
];

export default function Book({ onNavigate, preselectedProgramme }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Programme & Dates, 2: Accommodation & Guest Details, 3: Review, 4: Confirmed
  
  // Form State
  const [selectedProgramme, setSelectedProgramme] = useState(() => {
    if (preselectedProgramme) {
      const match = programmesList.find(p => p.id === preselectedProgramme || p.name.toLowerCase().includes(preselectedProgramme.toLowerCase()));
      if (match) return match.id;
    }
    return 'naturopathy';
  });

  const [selectedDuration, setSelectedDuration] = useState('7 Days');
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  });
  
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 10);
    return nextWeek.toISOString().split('T')[0];
  });

  const [guestsCount, setGuestsCount] = useState(1);
  const [selectedAccommodation, setSelectedAccommodation] = useState('guha');
  
  // Guest Information
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    specialRequests: '',
    healthGoals: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update selected duration when programme changes
  useEffect(() => {
    const prog = programmesList.find(p => p.id === selectedProgramme);
    if (prog) {
      setSelectedDuration(prog.defaultDuration);
    }
  }, [selectedProgramme]);

  const currentProgObj = programmesList.find(p => p.id === selectedProgramme) || programmesList[0];
  const currentAccObj = accommodationsList.find(a => a.id === selectedAccommodation) || accommodationsList[0];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!checkInDate || !checkOutDate) {
        alert('Please select both Check-In and Check-Out dates.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      // Validate guest info
      const errors = {};
      if (!guestInfo.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!guestInfo.email.trim() || !guestInfo.email.includes('@')) errors.email = 'Valid Email is required';
      if (!guestInfo.phone.trim() || guestInfo.phone.length < 8) errors.phone = 'Valid Phone number is required';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: 'var(--antique-white, #FAF6F0)', color: 'var(--raisin-black, #2B1B17)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Header */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5rem 6% 2.8rem 6%',
        background: 'linear-gradient(135deg, #f5ebd9 0%, #f0e2cc 60%, #ead9be 100%)',
        color: 'var(--wine, #5E2735)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine, #5E2735)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(94, 39, 53, 0.08)', padding: '0.35rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(94, 39, 53, 0.2)', marginBottom: '0.9rem' }}>
            <span style={{ color: 'var(--harvest-gold, #B8860B)', fontSize: '0.75rem' }}>✦</span>
            <span style={{ color: 'var(--wine, #5E2735)', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em' }}>
              Reserve Your Retreat
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)', fontWeight: 600, margin: '0 0 0.6rem 0', lineHeight: 1.15 }}>
            Begin Your <span style={{ color: 'var(--harvest-gold, #B8860B)', fontStyle: 'italic' }}>Healing Journey</span>
          </h1>

          <p style={{ color: 'rgba(94, 39, 53, 0.85)', fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)', maxWidth: '620px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Customize your personalized wellness programme, choose your sanctuary stay, and reserve your sacred time by the Suvarnamukhi River.
          </p>

          {/* Stepper Wizard Indicator */}
          {currentStep < 4 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { num: 1, label: 'Programme & Dates' },
                { num: 2, label: 'Stay & Details' },
                { num: 3, label: 'Review & Enquiry' }
              ].map((step, idx) => (
                <React.Fragment key={step.num}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1.1rem',
                    borderRadius: '30px',
                    backgroundColor: currentStep === step.num ? 'var(--wine, #5E2735)' : currentStep > step.num ? 'rgba(94,39,53,0.12)' : 'rgba(255,255,255,0.6)',
                    color: currentStep === step.num ? '#f5ebd9' : 'var(--wine, #5E2735)',
                    border: '1px solid rgba(94, 39, 53, 0.15)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === step.num ? 'var(--harvest-gold, #B8860B)' : currentStep > step.num ? 'var(--wine, #5E2735)' : 'rgba(94,39,53,0.15)',
                      color: currentStep === step.num || currentStep > step.num ? '#ffffff' : 'var(--wine, #5E2735)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}>
                      {currentStep > step.num ? '✓' : step.num}
                    </span>
                    <span>{step.label}</span>
                  </div>
                  {idx < 2 && <span style={{ color: 'rgba(94,39,53,0.3)', fontWeight: 800 }}>&rarr;</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Booking Container */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '3.5rem 6%' }}>
        
        {currentStep === 4 ? (
          /* Step 4: Booking Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '4rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 16px 45px rgba(94, 39, 53, 0.08)',
              border: '1.5px solid rgba(94, 39, 53, 0.12)',
              maxWidth: '740px',
              margin: '0 auto'
            }}
          >
            <div style={{ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: 'rgba(106, 123, 102, 0.15)', color: '#6A7B66', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle2 size={42} />
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--harvest-gold, #B8860B)', display: 'block', marginBottom: '0.4rem' }}>
              Enquiry Submitted Successfully
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '2.4rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
              Welcome to Your Healing Path
            </h2>

            <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2rem auto' }}>
              Namaste, <strong>{guestInfo.fullName || 'Valued Guest'}</strong>. Your retreat enquiry for <strong>{currentProgObj.name}</strong> ({selectedDuration}) at <strong>{currentAccObj.name}</strong> has been received with deep reverence.
            </p>

            <div style={{ backgroundColor: '#FAF6F0', borderRadius: '18px', padding: '1.6rem 2rem', margin: '0 auto 2.5rem auto', textAlign: 'left', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.8rem 0' }}>
                Next Steps with Our Medical Team:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, fontSize: '0.92rem', lineHeight: 1.6 }}>
                <li>Our senior doctor / Naturopathic Vaidya will review your details within 24 hours.</li>
                <li>We will send you a personalized preliminary dietary &amp; clinical schedule.</li>
                <li>A booking coordinator will reach out on <strong>{guestInfo.phone || '+91 98765 54321'}</strong> to confirm dates and room availability.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('home')}
                style={{
                  backgroundColor: 'var(--wine, #5E2735)',
                  color: '#ffffff',
                  padding: '0.85rem 2.2rem',
                  borderRadius: '30px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(94, 39, 53, 0.2)'
                }}
              >
                Return to Home &rarr;
              </button>

              <button
                onClick={() => onNavigate('contact')}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--wine, #5E2735)',
                  padding: '0.85rem 2rem',
                  borderRadius: '30px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1.5px solid var(--wine, #5E2735)',
                  cursor: 'pointer'
                }}
              >
                Contact Concierge
              </button>
            </div>
          </motion.div>
        ) : (
          /* Multi-Step Grid Layout with Live Sidebar */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Left Content Area (Steps 1, 2, 3) */}
            <div style={{ gridColumn: 'span 2' }}>
              
              {/* STEP 1: PROGRAMME & DATES */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1.5px solid rgba(94, 39, 53, 0.12)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
                    1. Select Your Programme &amp; Dates
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, marginBottom: '2rem' }}>
                    Choose the wellness pathway that best aligns with your healing and recovery goals.
                  </p>

                  {/* Programmes Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.2rem' }}>
                    {programmesList.map(prog => {
                      const isSelected = selectedProgramme === prog.id;
                      return (
                        <div
                          key={prog.id}
                          onClick={() => setSelectedProgramme(prog.id)}
                          style={{
                            padding: '1.2rem',
                            borderRadius: '18px',
                            border: isSelected ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.12)',
                            backgroundColor: isSelected ? 'rgba(94, 39, 53, 0.04)' : '#faf8f5',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            boxShadow: isSelected ? '0 6px 18px rgba(94, 39, 53, 0.08)' : 'none',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                              {prog.name}
                            </h4>
                            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--wine, #5E2735)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: isSelected ? 'var(--wine, #5E2735)' : 'transparent' }}>
                              {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
                            </div>
                          </div>
                          <p style={{ fontSize: '0.84rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: '0 0 0.8rem 0', lineHeight: 1.45 }}>
                            {prog.desc}
                          </p>

                          {/* Duration Chips */}
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {prog.durations.map(dur => (
                              <span
                                key={dur}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProgramme(prog.id);
                                  setSelectedDuration(dur);
                                }}
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '12px',
                                  backgroundColor: isSelected && selectedDuration === dur ? 'var(--wine, #5E2735)' : 'rgba(94,39,53,0.08)',
                                  color: isSelected && selectedDuration === dur ? '#ffffff' : 'var(--wine, #5E2735)',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {dur}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dates & Guests Row */}
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                    Select Dates &amp; Guests
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Check-In Date *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--wine, #5E2735)', backgroundColor: '#FAF6F0', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Check-Out Date *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--wine, #5E2735)', backgroundColor: '#FAF6F0', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Number of Guests
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', backgroundColor: '#FAF6F0', padding: '0.45rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)' }}>
                        <button
                          type="button"
                          onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                          style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--wine, #5E2735)', backgroundColor: '#ffffff', color: 'var(--wine, #5E2735)', fontWeight: 800, cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--wine, #5E2735)', minWidth: '24px', textAlign: 'center' }}>
                          {guestsCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestsCount(prev => Math.min(8, prev + 1))}
                          style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--wine, #5E2735)', backgroundColor: '#ffffff', color: 'var(--wine, #5E2735)', fontWeight: 800, cursor: 'pointer' }}
                        >
                          +
                        </button>
                        <span style={{ fontSize: '0.84rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.7, marginLeft: 'auto' }}>
                          {guestsCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleNextStep}
                      style={{
                        backgroundColor: 'var(--wine, #5E2735)',
                        color: '#ffffff',
                        padding: '0.85rem 2.4rem',
                        borderRadius: '30px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(94, 39, 53, 0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Continue to Stay &amp; Details &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: ACCOMMODATION & GUEST DETAILS */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1.5px solid rgba(94, 39, 53, 0.12)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
                    2. Choose Your Stay &amp; Guest Details
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, marginBottom: '2rem' }}>
                    Select your preferred sanctuary accommodation by the riverbank.
                  </p>

                  {/* Accommodation Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    {accommodationsList.map(acc => {
                      const isSelected = selectedAccommodation === acc.id;
                      return (
                        <div
                          key={acc.id}
                          onClick={() => setSelectedAccommodation(acc.id)}
                          style={{
                            borderRadius: '18px',
                            border: isSelected ? '2px solid var(--wine, #5E2735)' : '1.5px solid rgba(94, 39, 53, 0.12)',
                            backgroundColor: isSelected ? 'rgba(94, 39, 53, 0.04)' : '#faf8f5',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: isSelected ? '0 8px 24px rgba(94, 39, 53, 0.1)' : 'none'
                          }}
                        >
                          <div style={{ height: '140px', overflow: 'hidden', backgroundColor: 'rgba(94,39,53,0.1)', position: 'relative' }}>
                            <img 
                              src={acc.image} 
                              alt={acc.name} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => { e.currentTarget.src = '/assets/spaces/riverfront.png'; }}
                            />
                            <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.92)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--wine, #5E2735)', padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                              {acc.type}
                            </span>
                          </div>
                          <div style={{ padding: '1.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                                {acc.name}
                              </h4>
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--wine, #5E2735)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'var(--wine, #5E2735)' : 'transparent' }}>
                                {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
                              </div>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: '0 0 0.8rem 0', lineHeight: 1.45 }}>
                              {acc.desc}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.3rem' }}>
                              {acc.features.map(f => (
                                <span key={f} style={{ fontSize: '0.72rem', color: 'var(--wine, #5E2735)', fontWeight: 600 }}>
                                  ✓ {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Guest Information Form */}
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1rem 0' }}>
                    Guest Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '1.8rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Sharma"
                        value={guestInfo.fullName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.fullName ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none' }}
                      />
                      {formErrors.fullName && <span style={{ color: '#B85645', fontSize: '0.74rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.fullName}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.email ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none' }}
                      />
                      {formErrors.email && <span style={{ color: '#B85645', fontSize: '0.74rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.email}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.phone ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none' }}
                      />
                      {formErrors.phone && <span style={{ color: '#B85645', fontSize: '0.74rem', marginTop: '0.2rem', display: 'block' }}>{formErrors.phone}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        City / Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bangalore, India"
                        value={guestInfo.city}
                        onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Health Goals, Medical Conditions or Dietary Needs (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any chronic conditions (diabetes, BP, joint pain, stress), dietary preferences, or specific therapy requests..."
                      value={guestInfo.healthGoals}
                      onChange={(e) => setGuestInfo({ ...guestInfo, healthGoals: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{ backgroundColor: 'transparent', color: 'var(--wine, #5E2735)', border: '1.5px solid var(--wine, #5E2735)', padding: '0.8rem 1.8rem', borderRadius: '30px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}
                    >
                      &larr; Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{ backgroundColor: 'var(--wine, #5E2735)', color: '#ffffff', padding: '0.85rem 2.4rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(94, 39, 53, 0.2)' }}
                    >
                      Review Booking Enquiry &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW & ENQUIRY SUBMISSION */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1.5px solid rgba(94, 39, 53, 0.12)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
                    3. Review &amp; Confirm Enquiry
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, marginBottom: '2rem' }}>
                    Please review your reservation parameters before submitting your enquiry to our medical reception.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', padding: '1.4rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Programme</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{currentProgObj.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>Duration: <strong>{selectedDuration}</strong></p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', padding: '1.4rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Sanctuary Stay</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{currentAccObj.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>{guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}</p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', padding: '1.4rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Dates</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{checkInDate} &rarr; {checkOutDate}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>Riverfront Estate, Kanakapura Road</p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', padding: '1.4rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Guest Information</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{guestInfo.fullName}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>{guestInfo.phone} | {guestInfo.email}</p>
                    </div>
                  </div>

                  {guestInfo.healthGoals && (
                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', padding: '1.2rem 1.4rem', marginBottom: '2.2rem', border: '1px solid rgba(94,39,53,0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Health Goals &amp; Preferences:</span>
                      <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, margin: 0 }}>{guestInfo.healthGoals}</p>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{ backgroundColor: 'transparent', color: 'var(--wine, #5E2735)', border: '1.5px solid var(--wine, #5E2735)', padding: '0.8rem 1.8rem', borderRadius: '30px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}
                    >
                      &larr; Modify
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitBooking}
                      style={{ backgroundColor: 'var(--wine, #5E2735)', color: '#ffffff', padding: '0.9rem 2.8rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 6px 20px rgba(94, 39, 53, 0.25)', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Securing Your Enquiry...' : 'Confirm & Submit Booking Enquiry ✦'}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Sticky Sidebar: Summary Card */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.08)', border: '1.5px solid rgba(94, 39, 53, 0.12)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--harvest-gold, #B8860B)', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '0.4rem' }}>
                  Live Reservation Summary
                </span>
                
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.45rem', fontWeight: 700, margin: '0 0 1.2rem 0', borderBottom: '1px solid rgba(94, 39, 53, 0.1)', paddingBottom: '0.8rem' }}>
                  Suprada Sanctuary Stay
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', marginBottom: '1.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(94, 39, 53, 0.06)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.7 }}>Programme:</span>
                    <strong style={{ color: 'var(--wine, #5E2735)', textAlign: 'right', maxWidth: '160px' }}>{currentProgObj.name}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(94, 39, 53, 0.06)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.7 }}>Duration:</span>
                    <strong style={{ color: 'var(--wine, #5E2735)' }}>{selectedDuration}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(94, 39, 53, 0.06)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.7 }}>Stay:</span>
                    <strong style={{ color: 'var(--wine, #5E2735)' }}>{currentAccObj.name}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(94, 39, 53, 0.06)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.7 }}>Guests:</span>
                    <strong style={{ color: 'var(--wine, #5E2735)' }}>{guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--raisin-black, #2B1B17)', opacity: 0.7 }}>Check-In:</span>
                    <strong style={{ color: 'var(--wine, #5E2735)' }}>{checkInDate}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(94, 39, 53, 0.04)', borderRadius: '14px', padding: '1rem', border: '1px solid rgba(94, 39, 53, 0.08)', marginBottom: '1.2rem' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.82, margin: 0, lineHeight: 1.5 }}>
                    ✦ Includes full-board Satwik farm dining, doctor consultations, daily Yoga kriyas, and assigned hydrotherapy sessions.
                  </p>
                </div>

                {/* Diagnostic Quiz Shortcut */}
                <div style={{ textAlign: 'center', paddingTop: '0.8rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                  <p style={{ fontSize: '0.76rem', color: 'var(--wine, #5E2735)', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                    Unsure which programme suits you?
                  </p>
                  <button
                    onClick={() => onNavigate('home')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--harvest-gold, #B8860B)',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Take 60-Second Wellness Diagnostic Quiz &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
