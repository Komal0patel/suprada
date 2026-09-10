import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WellnessQuiz from '../components/WellnessQuiz';
import { 
  Sparkles, Calendar, Users, Home, User, Mail, 
  Phone, MessageSquare, Check, ArrowRight, ArrowLeft, 
  ShieldCheck, Clock, CheckCircle2, ChevronRight, ChevronLeft, 
  HelpCircle, X
} from 'lucide-react';

const programmesList = [
  { 
    id: 'rejuvenation', 
    name: 'Rejuvenation Program', 
    label: 'Rejuvenation Program  - Starts from 5 Days',
    badge: 'POPULAR', 
    desc: 'Anti-aging vitality booster with daily Abhyangam, Shirodhara & dosha balance', 
    durations: ['5 Days', '7 Days', '14 Days', '21 Days'], 
    defaultDuration: '7 Days' 
  },
  { 
    id: 'holistic-wellness', 
    name: 'Holistic Wellness Program', 
    label: 'Holistic Wellness Program  - Starts from 7 Days',
    badge: 'SIGNATURE', 
    desc: 'Comprehensive elemental healing, daily yoga kriyas & satwik dining', 
    durations: ['7 Days', '14 Days', '21 Days'], 
    defaultDuration: '7 Days' 
  },
  { 
    id: 'detox', 
    name: 'Detox Program', 
    label: 'Detox Program  - Starts from 7 Days',
    badge: 'DEEP RESET', 
    desc: 'Intestinal purification, colon hydrotherapy, fasting & herbal scrubs', 
    durations: ['7 Days', '14 Days', '21 Days'], 
    defaultDuration: '7 Days' 
  },
  { 
    id: 'weekend-reset', 
    name: 'Weekend Reset', 
    label: 'Weekend Reset  - 2/3 Days',
    badge: '2-3 DAYS', 
    desc: 'Quick rejuvenation retreat escape by the sacred Suvarnamukhi river', 
    durations: ['2 Days', '3 Days'], 
    defaultDuration: '2 Days' 
  },
  { 
    id: 'advanced-healing', 
    name: 'Advanced Healing Program', 
    label: 'Advanced Healing Program  - Starts from 21 Days',
    badge: 'CHRONIC CARE', 
    desc: 'Specialized 21-28 day clinical chronic recovery & systemic renewal', 
    durations: ['21 Days', '28 Days'], 
    defaultDuration: '21 Days' 
  }
];

// Helper to map any pillar or parameter slug to nearest signature programme
const mapPillarToProgramme = (slug) => {
  if (!slug) return 'rejuvenation';
  const s = slug.toLowerCase();
  if (s.includes('detox') || s.includes('cleansing') || s.includes('nutrition')) return 'detox';
  if (s.includes('weekend')) return 'weekend-reset';
  if (s.includes('advanced') || s.includes('physio') || s.includes('chronic')) return 'advanced-healing';
  if (s.includes('holistic') || s.includes('yoga') || s.includes('naturopathy') || s.includes('meditation')) return 'holistic-wellness';
  return 'rejuvenation';
};

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
  const [currentStep, setCurrentStep] = useState(1); // 1: Programme & Dates, 2: Accommodation & Details, 3: Review, 4: Confirmed
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Form State
  const [selectedProgramme, setSelectedProgramme] = useState(() => {
    if (preselectedProgramme) {
      return mapPillarToProgramme(preselectedProgramme);
    }
    return 'rejuvenation';
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

  // Lock body scroll and pause Lenis when quiz modal is active to prevent underlying window scrolling
  useEffect(() => {
    if (showQuizModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
      return () => {
        document.body.style.overflow = prevOverflow;
        window.lenis?.start();
      };
    }
  }, [showQuizModal]);

  // Update selected duration when programme changes
  useEffect(() => {
    const prog = programmesList.find(p => p.id === selectedProgramme);
    if (prog) {
      if (!prog.durations.includes(selectedDuration)) {
        setSelectedDuration(prog.defaultDuration);
      }
    }
  }, [selectedProgramme]);

  // Update check-out date automatically when check-in or duration changes
  useEffect(() => {
    if (checkInDate && selectedDuration) {
      const days = parseInt(selectedDuration.split(' ')[0], 10) || 7;
      const checkIn = new Date(checkInDate);
      if (!isNaN(checkIn.getTime())) {
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + days);
        setCheckOutDate(checkOut.toISOString().split('T')[0]);
      }
    }
  }, [checkInDate, selectedDuration]);

  const currentProgObj = programmesList.find(p => p.id === selectedProgramme) || programmesList[0];
  const currentAccObj = accommodationsList.find(a => a.id === selectedAccommodation) || accommodationsList[0];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedProgramme) {
        alert('Please select a programme.');
        return;
      }
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
      
      {/* Top Stepper Header Bar with Logo */}
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(94, 39, 53, 0.1)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Left: Brand Logo & Back to Home */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div 
              onClick={() => onNavigate('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <img 
                src="/assets/extracted/logo.svg" 
                alt="Suprada Logo" 
                style={{ height: '36px', filter: 'drop-shadow(0 2px 6px rgba(94, 39, 53, 0.15))' }} 
              />
              <img 
                src="/assets/extracted/suprada-wellness.svg" 
                alt="Suprada Wellness" 
                style={{ height: '22px', filter: 'brightness(0.22)' }} 
              />
            </div>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', padding: '0.3rem 0.6rem', borderRadius: '6px', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wine, #5E2735)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </div>

          {/* Stepper Wizard Indicator */}
          {currentStep < 4 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', maxWidth: '480px', flex: 1, justifyContent: 'center' }}>
              {[
                { num: 1, label: 'Programme & Dates' },
                { num: 2, label: 'Accommodation & Details' },
                { num: 3, label: 'Review' }
              ].map((step, idx) => (
                <React.Fragment key={step.num}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === step.num ? '#632633' : currentStep > step.num ? 'var(--harvest-gold, #B8860B)' : '#e2e8f0',
                      color: currentStep === step.num || currentStep > step.num ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      transition: 'all 0.3s ease'
                    }}>
                      {currentStep > step.num ? '✓' : step.num}
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: currentStep === step.num ? 700 : 500,
                      color: currentStep === step.num ? '#632633' : '#94a3b8',
                      whiteSpace: 'nowrap'
                    }}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div style={{ height: '2px', flex: 1, minWidth: '20px', backgroundColor: currentStep > idx + 1 ? '#632633' : '#e2e8f0' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div style={{ width: '90px' }} className="hidden sm:block" />
        </div>
      </div>

      {/* Main Booking Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
        
        {currentStep === 4 ? (
          /* Step 4: Booking Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '4rem 2rem',
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left Content Area (Steps 1, 2, 3) */}
            <div style={{ gridColumn: 'span 2' }}>
              
              {/* STEP 1: PROGRAMME & DATES */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem 2.2rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1px solid rgba(94, 39, 53, 0.12)' }}
                >
                  {/* Top Bar with Back, Cancel, Next */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button
                        type="button"
                        disabled
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600, cursor: 'not-allowed' }}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('home')}
                        style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', padding: '0.45rem 0.6rem' }}
                      >
                        Cancel
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: '#d4a359',
                        color: 'var(--wine, #5E2735)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1.3rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(212, 163, 89, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Next <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Section Title & Assessment Button */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 700, margin: '0 0 0.3rem 0' }}>
                        Programme, Dates &amp; Guests
                      </h2>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                        Select your programme, dates, and number of guests
                      </p>
                    </div>

                    {/* Quick Assessment Test Button */}
                    <button
                      type="button"
                      onClick={() => setShowQuizModal(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'transparent',
                        color: 'var(--wine, #5E2735)',
                        border: '1.5px solid var(--wine, #5E2735)',
                        padding: '0.55rem 1.2rem',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94, 39, 53, 0.06)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      Quick Assessment Test
                    </button>
                  </div>

                  {/* SELECT PROGRAMME DROPDOWN */}
                  <div style={{ marginBottom: '1.8rem', position: 'relative' }} ref={dropdownRef}>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.5rem' }}>
                      Select Programme *
                    </label>

                    {/* Custom Dropdown Trigger */}
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '10px',
                        border: isDropdownOpen ? '1.5px solid var(--harvest-gold, #B8860B)' : '1.5px solid rgba(94, 39, 53, 0.2)',
                        backgroundColor: '#FAF6F0',
                        color: currentProgObj ? 'var(--raisin-black, #2B1B17)' : '#94a3b8',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isDropdownOpen ? '0 0 0 3px rgba(184, 134, 11, 0.15)' : 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span>
                        {currentProgObj ? currentProgObj.label : 'Choose a programme'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--wine, #5E2735)', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                        ▼
                      </span>
                    </div>

                    {/* Dropdown Menu Items */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '6px',
                            backgroundColor: '#FAF6F0',
                            borderRadius: '12px',
                            border: '1.5px solid rgba(94, 39, 53, 0.18)',
                            boxShadow: '0 12px 30px rgba(94, 39, 53, 0.15)',
                            zIndex: 50,
                            overflow: 'hidden'
                          }}
                        >
                          {programmesList.map(prog => {
                            const isSelected = selectedProgramme === prog.id;
                            return (
                              <div
                                key={prog.id}
                                onClick={() => {
                                  setSelectedProgramme(prog.id);
                                  setSelectedDuration(prog.defaultDuration);
                                  setIsDropdownOpen(false);
                                }}
                                style={{
                                  padding: '0.85rem 1.1rem',
                                  fontSize: '0.9rem',
                                  fontWeight: isSelected ? 700 : 500,
                                  color: isSelected ? '#ffffff' : 'var(--wine, #5E2735)',
                                  backgroundColor: isSelected ? '#d4a359' : 'transparent',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid rgba(94, 39, 53, 0.08)',
                                  transition: 'background-color 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(212, 163, 89, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                {prog.label}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* PROGRAMME DURATION PILLS */}
                  {currentProgObj && (
                    <div style={{ marginBottom: '1.8rem', backgroundColor: '#FAF6F0', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.6rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--wine, #5E2735)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Select Duration:
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {currentProgObj.desc}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {currentProgObj.durations.map(dur => {
                          const isDurSelected = selectedDuration === dur;
                          return (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => setSelectedDuration(dur)}
                              style={{
                                padding: '0.45rem 1.1rem',
                                borderRadius: '20px',
                                border: isDurSelected ? '1.5px solid var(--wine, #5E2735)' : '1px solid rgba(94, 39, 53, 0.2)',
                                backgroundColor: isDurSelected ? 'var(--wine, #5E2735)' : '#ffffff',
                                color: isDurSelected ? '#ffffff' : 'var(--wine, #5E2735)',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {dur}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* DATES GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem' }}>
                        Check-In Date *
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(94, 39, 53, 0.2)',
                          fontSize: '0.92rem',
                          color: 'var(--wine, #5E2735)',
                          backgroundColor: '#FAF6F0',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--wine, #5E2735)', marginBottom: '0.4rem' }}>
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(94, 39, 53, 0.2)',
                          fontSize: '0.92rem',
                          color: 'var(--wine, #5E2735)',
                          backgroundColor: '#FAF6F0',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#d4a359',
                        color: 'var(--wine, #5E2735)',
                        padding: '0.75rem 2rem',
                        borderRadius: '10px',
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(212, 163, 89, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Next Step: Accommodation &rarr;
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
                  style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem 2.2rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1px solid rgba(94, 39, 53, 0.12)' }}
                >
                  {/* Top Bar with Back, Cancel, Next */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('home')}
                        style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', padding: '0.45rem 0.6rem' }}
                      >
                        Cancel
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: '#d4a359',
                        color: 'var(--wine, #5E2735)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1.3rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(212, 163, 89, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Next <ArrowRight size={14} />
                    </button>
                  </div>

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
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.fullName ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.email ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: formErrors.phone ? '1.5px solid #B85645' : '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', boxSizing: 'border-box' }}
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
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(94, 39, 53, 0.15)', fontSize: '0.92rem', color: 'var(--raisin-black, #2B1B17)', backgroundColor: '#FAF6F0', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{ backgroundColor: 'transparent', color: 'var(--wine, #5E2735)', border: '1.5px solid var(--wine, #5E2735)', padding: '0.8rem 1.8rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      &larr; Back
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      style={{ backgroundColor: '#d4a359', color: 'var(--wine, #5E2735)', padding: '0.85rem 2.4rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(212, 163, 89, 0.3)' }}
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
                  style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem 2.2rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.06)', border: '1px solid rgba(94, 39, 53, 0.12)' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
                    3. Review &amp; Confirm Enquiry
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.75, marginBottom: '2rem' }}>
                    Please review your reservation parameters before submitting your enquiry to our medical reception.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Programme</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{currentProgObj.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>Duration: <strong>{selectedDuration}</strong></p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Sanctuary Stay</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{currentAccObj.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>{guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}</p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Dates</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{checkInDate} &rarr; {checkOutDate}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>Riverfront Estate, Kanakapura Road</p>
                    </div>

                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(94, 39, 53, 0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Guest Information</span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--wine, #5E2735)', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>{guestInfo.fullName}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.8, margin: 0 }}>{guestInfo.phone} | {guestInfo.email}</p>
                    </div>
                  </div>

                  {guestInfo.healthGoals && (
                    <div style={{ backgroundColor: '#FAF6F0', borderRadius: '14px', padding: '1.2rem', marginBottom: '2rem', border: '1px solid rgba(94,39,53,0.1)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--redwood, #B85645)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Health Goals &amp; Preferences:</span>
                      <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black, #2B1B17)', opacity: 0.85, margin: 0 }}>{guestInfo.healthGoals}</p>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.1)' }}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      style={{ backgroundColor: 'transparent', color: 'var(--wine, #5E2735)', border: '1.5px solid var(--wine, #5E2735)', padding: '0.8rem 1.8rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      &larr; Modify
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitBooking}
                      style={{ backgroundColor: '#632633', color: '#ffffff', padding: '0.9rem 2.8rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 800, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 6px 20px rgba(99, 38, 51, 0.25)', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Securing Your Enquiry...' : 'Confirm & Submit Booking Enquiry ✦'}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Sticky Sidebar: Booking Summary Card */}
            <div style={{ position: 'sticky', top: '75px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '1.6rem', boxShadow: '0 10px 30px rgba(94, 39, 53, 0.08)', border: '1px solid rgba(94, 39, 53, 0.12)' }}>
                <h3 style={{ color: '#632633', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.2rem 0', borderBottom: '1px solid rgba(94, 39, 53, 0.1)', paddingBottom: '0.8rem' }}>
                  Booking Summary
                </h3>

                {/* Number of Guests Counter */}
                <div style={{ marginBottom: '1.4rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                    Number of Guests
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '2px solid #632633',
                        backgroundColor: '#ffffff',
                        color: '#632633',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#632633', minWidth: '32px', textAlign: 'center' }}>
                      {guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(prev => Math.min(8, prev + 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '2px solid #632633',
                        backgroundColor: '#ffffff',
                        color: '#632633',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Itinerary Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', borderTop: '1px solid rgba(94, 39, 53, 0.08)', paddingTop: '1rem', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Programme:</span>
                    <strong style={{ color: '#632633', textAlign: 'right', maxWidth: '160px' }}>{currentProgObj.name}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Duration:</span>
                    <strong style={{ color: '#632633' }}>{selectedDuration}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Stay:</span>
                    <strong style={{ color: '#632633' }}>{currentAccObj.name}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Check-In:</span>
                    <strong style={{ color: '#632633' }}>{checkInDate}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Check-Out:</span>
                    <strong style={{ color: '#632633' }}>{checkOutDate}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FAF6F0', borderRadius: '10px', padding: '0.85rem', border: '1px solid rgba(94, 39, 53, 0.08)', marginBottom: '1.2rem' }}>
                  <p style={{ fontSize: '0.74rem', color: '#632633', margin: 0, lineHeight: 1.45 }}>
                    ✦ Includes Satwik meals, wellness consultations, daily yoga &amp; assigned therapies.
                  </p>
                </div>

                {/* Diagnostic Quiz Shortcut */}
                <div style={{ textAlign: 'center', paddingTop: '0.6rem', borderTop: '1px solid rgba(94, 39, 53, 0.08)' }}>
                  <button
                    type="button"
                    onClick={() => setShowQuizModal(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--harvest-gold, #B8860B)',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Take Quick Assessment Test &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Quick Assessment Test Interactive Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowQuizModal(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(43, 27, 23, 0.82)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.2rem 0.8rem',
              boxSizing: 'border-box',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              data-lenis-prevent="true"
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{
                backgroundColor: '#FAF6F0',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '920px',
                maxHeight: '88vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                position: 'relative',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                border: '1.5px solid rgba(94, 39, 53, 0.2)',
                padding: '1.6rem 1.2rem',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowQuizModal(false)}
                aria-label="Close Assessment Modal"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(94, 39, 53, 0.1)',
                  border: '1px solid rgba(94, 39, 53, 0.2)',
                  color: 'var(--wine, #5E2735)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine, #5E2735)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(94, 39, 53, 0.1)'; e.currentTarget.style.color = 'var(--wine, #5E2735)'; }}
              >
                <X size={18} />
              </button>

              <WellnessQuiz onNavigate={(page, params) => {
                setShowQuizModal(false);
                if (page === 'book' && params?.programme) {
                  setSelectedProgramme(mapPillarToProgramme(params.programme));
                } else if (page) {
                  onNavigate(page, params);
                }
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
