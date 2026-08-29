import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25 } from '../AnimatedPatterns';
import { Car, Train, Plane, Calendar, MapPin, Mail, Star } from 'lucide-react';

const blurFadeIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

// ── Hindu Calendar helpers ─────────────────────────────────────────────────
const SAMVATSARA = [
  'Prabhava', 'Vibhava', 'Shukla', 'Pramodoota', 'Prajapati',
  'Aangirasa', 'Shrimukha', 'Bhava', 'Yuva', 'Dhatri',
  'Ishvara', 'Bahudhanya', 'Pramathi', 'Vikrama', 'Visha', 'Chitrabhanu',
  'Svabhanu', 'Tarana', 'Parthiva', 'Vyaya', 'Sarvajit', 'Sarvadharin',
  'Virodhi', 'Vikrita', 'Khara', 'Nandana', 'Vijaya', 'Jaya',
  'Manmatha', 'Durmukhi', 'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari',
  'Plava', 'Shubhakrit', 'Shobhana', 'Krodhi', 'Vishvavasu', 'Parabhava',
  'Plavanga', 'Kilaka', 'Saumya', 'Sadharana', 'Virodhikrit', 'Paridhavi',
  'Pramadi', 'Ananda', 'Rakshasa', 'Nala', 'Pingala', 'Kalayukti',
  'Siddharthi', 'Raudra', 'Durmathi', 'Dundubhi', 'Rudhirodgari',
  'Raktakshi', 'Krodhana', 'Akshaya'
];

const MASA = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
  'Shravana', 'Bhadrapada', 'Ashvina', 'Kartika',
  'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

const TITHI = [
  'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi',
  'Purnima / Amavasya'
];

const VARA = ['Ravivar', 'Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar'];

function getHinduCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const day = now.getDate();

  // Vikram Samvat: add 57 before Hindu new year (Chaitra, ~Apr 14), add 56 after
  // Chaitra Shukla Pratipada ≈ April 14 each year
  const isBeforeHinduNewYear = month < 3 || (month === 3 && day < 14);
  const vikramYear = isBeforeHinduNewYear ? year + 56 : year + 57;

  // Saka Samvat: subtract 78. Adjust if before Mar 22 (Ugadi)
  const isBeforeSakaNewYear = month < 2 || (month === 2 && day < 22);
  const sakaYear = isBeforeSakaNewYear ? year - 79 : year - 78;

  // Samvatsara: 60-year cycle. Index from VS year
  const samvatsaraIdx = (vikramYear - 1) % 60;

  // Masa (Hindu lunar month) — approximate Gregorian boundaries:
  // Chaitra: Mar 22–Apr 20 | Vaishakha: Apr 21–May 20 | Jyeshtha: May 21–Jun 20
  // Ashadha: Jun 21–Jul 21 | Shravana: Jul 22–Aug 21 | Bhadrapada: Aug 22–Sep 21
  // Ashvina: Sep 22–Oct 21 | Kartika: Oct 22–Nov 20 | Margashirsha: Nov 21–Dec 20
  // Pausha: Dec 21–Jan 19 | Magha: Jan 20–Feb 18 | Phalguna: Feb 19–Mar 21
  const masaBoundaries = [
    { masa: 11, from: [2, 19], to: [2, 21] },  // Phalguna: Feb 19 – Mar 21
    { masa: 0, from: [2, 22], to: [3, 20] },  // Chaitra: Mar 22 – Apr 20
    { masa: 1, from: [3, 21], to: [4, 20] },  // Vaishakha
    { masa: 2, from: [4, 21], to: [5, 20] },  // Jyeshtha
    { masa: 3, from: [5, 21], to: [6, 21] },  // Ashadha
    { masa: 4, from: [6, 22], to: [7, 21] },  // Shravana
    { masa: 5, from: [7, 22], to: [8, 21] },  // Bhadrapada
    { masa: 6, from: [8, 22], to: [9, 21] },  // Ashvina
    { masa: 7, from: [9, 22], to: [10, 20] }, // Kartika
    { masa: 8, from: [10, 21], to: [11, 20] },// Margashirsha
    { masa: 9, from: [11, 21], to: [0, 19] }, // Pausha (crosses year boundary)
    { masa: 10, from: [0, 20], to: [1, 18] },  // Magha
    { masa: 11, from: [1, 19], to: [2, 18] },  // Phalguna
  ];

  let masaIdx = 3; // fallback: Ashadha
  for (const b of masaBoundaries) {
    const [fm, fd] = b.from;
    const [tm, td] = b.to;
    // Handle simple (non-year-crossing) ranges
    if (fm <= tm) {
      if ((month > fm || (month === fm && day >= fd)) &&
        (month < tm || (month === tm && day <= td))) {
        masaIdx = b.masa; break;
      }
    } else {
      // Year-crossing (e.g. Pausha: Dec 21 – Jan 19)
      if ((month > fm || (month === fm && day >= fd)) ||
        (month < tm || (month === tm && day <= td))) {
        masaIdx = b.masa; break;
      }
    }
  }

  // Paksha & Tithi: approximate using synodic month (~29.5 days)
  // Known reference: Full Moon (Purnima) on Jul 10, 2025 (Guru Purnima)
  const refFullMoon = new Date('2025-07-10T00:00:00');
  const daysSinceRef = (now - refFullMoon) / 86400000;
  const synodicDay = ((daysSinceRef % 29.5) + 29.5) % 29.5; // 0=Purnima
  const paksha = synodicDay < 15 ? 'Krishna' : 'Shukla';
  const rawTithi = synodicDay < 15
    ? Math.floor(synodicDay) + 1          // Krishna: 1-15
    : Math.floor(synodicDay - 15) + 1;    // Shukla: 1-15
  const tithiIdx = Math.min(rawTithi - 1, 14);

  return {
    vara: VARA[now.getDay()],
    masa: MASA[masaIdx],
    paksha,
    tithi: TITHI[tithiIdx],
    vikramYear,
    sakaYear,
    samvatsara: SAMVATSARA[samvatsaraIdx],
    gregorian: now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  };
}


function HinduCalendarWidget() {
  const [cal, setCal] = useState(getHinduCalendar);
  useEffect(() => {
    const id = setInterval(() => setCal(getHinduCalendar()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
        <Calendar size={22} style={{ color: 'var(--wine)' }} />
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--redwood)' }}>Current Date &amp; Time</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--raisin-black)', opacity: 0.7 }}>{cal.gregorian} &nbsp;·&nbsp; {cal.time}</div>
        </div>
      </div>

      {/* Weather row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'rgba(255,255,255,0.65)',
        border: '1px solid rgba(220,160,50,0.2)',
        borderRadius: '10px',
        padding: '0.75rem 1rem'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: 'var(--harvest-gold)',
            flexShrink: 0,
            boxShadow: '0 0 14px rgba(220,160,50,0.4)'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--redwood)' }}>Current Weather · Suprada</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--wine)', }}>24°C &nbsp;·&nbsp; Gentle Breeze</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--raisin-black)', opacity: 0.75 }}>Perfect for outdoor Yoga &amp; river walks</div>
        </div>
      </div>
    </div>
  );
}

// ── Typewriter component for Feedback Card Title ──────────────────────────
function FeedbackCardTypewriter() {
  const phrases = [
    "Your Feedback",
    "Your Experience",
    "Your Thoughts",
    "Your Healing Story"
  ];
  const [index, setIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setSubText(current.slice(0, subText.length + 1));
        if (subText === current) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setSubText(current.slice(0, subText.length - 1));
        if (subText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [subText, isDeleting, index]);

  return (
    <h3 style={{color: 'var(--wine)', margin: '0 0 0.4rem 0', minHeight: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      Share <span style={{ color: 'var(--harvest-gold)', marginLeft: '0.48rem', position: 'relative', display: 'inline-flex', alignItems: 'center' }}>{subText}<span className="typewriter-cursor" style={{ height: '0.9em', marginLeft: '3px' }} /></span>
    </h3>
  );
}





export default function Contact({ onNavigate }) {
  const TITLE = "Get in Touch";
  const SUBTITLE = "A Sanctuary by the River";
  const DESC = "Located just outside Bengaluru, Suprada rests on the serene banks of the Suvarnamukhi River. Far from the city's chaos, yet easily accessible, it is a haven where nature's silence speaks.";

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [phase, setPhase] = useState("title"); // title → subtitle → desc → done
  const pausedRef = useRef(false);

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', email: '', comment: '' });
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    let timer;
    const tick = () => {
      if (pausedRef.current) { timer = setTimeout(tick, 80); return; }

      if (phase === "title") {
        setTypedTitle(t => {
          const next = TITLE.slice(0, t.length + 1);
          if (next === TITLE) { setTimeout(() => setPhase("subtitle"), 100); }
          return next;
        });
        timer = setTimeout(tick, 8);
      } else if (phase === "subtitle") {
        setTypedSubtitle(t => {
          const next = SUBTITLE.slice(0, t.length + 1);
          if (next === SUBTITLE) { setTimeout(() => setPhase("desc"), 100); }
          return next;
        });
        timer = setTimeout(tick, 5);
      } else if (phase === "desc") {
        setTypedDesc(t => {
          const next = DESC.slice(0, t.length + 2);
          if (next === DESC) setPhase("done");
          return next;
        });
        timer = setTimeout(tick, 5);
      }
    };
    if (phase !== "done") timer = setTimeout(tick, 20);
    return () => clearTimeout(timer);
  }, [phase]);



  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const handleInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', paddingTop: 0 }}>

      {/* ── HERO: Split Layout with Typewriter Left & River Image Right ── */}
      <section
        className="mobile-hero-compact"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* ── Full-width Background Image ── */}
        <motion.img
          src="/assets/location_contact.png"
          alt="Suprada Wellness by the Suvarnamukhi River"
          animate={{
            scale: [1, 1.03, 1, 1.02, 1],
            x: [0, 6, -4, 5, 0],
            y: [0, -4, 6, -3, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />

        {/* Light Blackish Gradient Overlay — luxury dark vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(18, 15, 18, 0.72) 0%, rgba(18, 15, 18, 0.42) 50%, rgba(0, 0, 0, 0.1) 100%)'
        }} />

        {/* ── LEFT TEXT PANEL ── */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 8% 2.25rem 8%',
          maxWidth: '680px',
          marginTop: '-2rem'
        }}>
          {/* Official Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'flex-start' }}
          >
            <img 
              src="/assets/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '75px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))' }} 
            />
          </motion.div>

          {/* Leaf SVG Watermark Overlay */}
          <Pattern24 style={{ position: 'absolute', top: '1rem', left: '-20px', width: '260px', opacity: 0.15, color: 'var(--harvest-gold)', pointerEvents: 'none' }} />

          {/* "Get in Touch" — typewriter title */}
          <h1 style={{color: '#ffffff',
            lineHeight: 1.1,
            margin: '0 0 0.5rem 0',
            minHeight: '5.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
            {typedTitle}
            {phase === "title" && <span className="typewriter-cursor" />}
          </h1>

          {/* "A Sanctuary by the River" — typewriter subtitle */}
          <h2 style={{color: 'var(--harvest-gold)',
            fontStyle: 'italic',
            margin: '0 0 2rem 0',
            minHeight: '2.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'}}>
            {typedSubtitle}
            {phase === "subtitle" && <span className="typewriter-cursor" />}
          </h2>

          {/* Description — typewriter body */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.92)',
            fontSize: 'var(--fs-body)',
            lineHeight: 1.7,
            fontWeight: 400,
            maxWidth: '500px',
            margin: '0 0 2.5rem 0',
            minHeight: '6rem',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)'
          }}>
            {typedDesc}
            {phase === "desc" && <span className="typewriter-cursor" />}
          </p>

          {/* Dual CTAs — appear after typing */}
          <AnimatePresence>
            {(phase === "done") && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <button
                  onClick={() => {
                    document.getElementById('contact-map')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: 'none',
                    border: '1.5px solid var(--wine)',
                    color: 'var(--wine)',
                    borderRadius: '8px',
                    padding: '0.9rem 2rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = 'var(--wine)';
                    e.target.style.borderColor = 'var(--wine)';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'var(--wine)';
                    e.target.style.color = 'var(--wine)';
                  }}
                >
                  Get Directions ↓
                </button>

                <button
                  onClick={() => {
                    const footerElement = document.querySelector('footer') || document.getElementById('footer');
                    if (footerElement) {
                      footerElement.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    backgroundColor: 'var(--harvest-gold)',
                    border: '1.5px solid var(--harvest-gold)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.9rem 2rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(220,160,50,0.3)'
                  }}
                  onMouseEnter={e => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Contact Details ↓
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating location badge — bottom right of image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          style={{
            position: 'absolute', bottom: '2.5rem', right: '3rem', zIndex: 3,
            backgroundColor: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(220,160,50,0.45)',
            borderRadius: '14px',
            padding: '1rem 1.4rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
          }}
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--harvest-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={18} style={{ color: 'var(--wine)' }} /></div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location</div>
            <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600, }}>Kanakapura Road, Bengaluru</div>
          </div>
        </motion.div>

        {/* Scroll hint arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', zIndex: 5, cursor: 'default'
          }}
        >
          ↓
        </motion.div>

        {/* Typewriter cursor CSS */}
        <style>{`
          .typewriter-cursor {
            display: inline-block;
            width: 2.5px;
            height: 1em;
            background: var(--harvest-gold);
            margin-left: 3px;
            vertical-align: middle;
            border-radius: 1px;
            animation: blinkCursor 0.8s steps(1) infinite;
          }
          @keyframes blinkCursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </section>

      {/* Main Content: Bento Grid Layout */}
      <section id="contact-bento" style={{ padding: '2.25rem 8% 2.25rem 8%' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem'
          }}
        >

          {/* ── NEW Box 1+2: Retreat Image LEFT + Commute & Hindu Calendar RIGHT ── */}
          <motion.div
            variants={itemVariants}
            style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(94, 39, 53, 0.06)',
              border: '1px solid rgba(94, 39, 53, 0.06)',
              minHeight: '480px'
            }}
            className="bento-box-12-tablet"
          >
            {/* LEFT — retreat-contact image with production wording overlay */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '360px' }}>
              <motion.img
                src="/assets/retreat-contact.png"
                alt="Suprada Wellness Retreat"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Full dark gradient for text legibility */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,2,2,0.82) 0%, rgba(5,2,2,0.35) 55%, transparent 100%)'
              }} />
              {/* Centered wording overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem 2.5rem',
                color: '#ffffff'
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8 }}
                >
                  <div style={{
                    fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.22em', color: 'var(--harvest-gold)', marginBottom: '0.9rem'
                  }}>Your Transformation Awaits</div>

                  <h2 style={{lineHeight: 1.2,
                    margin: '0 0 1rem 0',
                    color: '#ffffff'}}>Begin Your Healing Journey</h2>

                  {/* Ornament divider */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(220,160,50,0.6)' }} />
                    <span style={{ color: 'var(--harvest-gold)', fontSize: '1rem' }}>✦</span>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(220,160,50,0.6)' }} />
                  </div>

                  <p style={{
                    fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.88, maxWidth: '340px', margin: '0 auto 0.7rem auto'
                  }}>Connect with us to discover the perfect wellness programme tailored to your needs.</p>

                  <p style={{
                    fontSize: '0.82rem', lineHeight: 1.7, opacity: 0.7, maxWidth: '320px', margin: '0 auto',
                    fontStyle: 'italic'
                  }}>Let the sacred Suvarnamukhi River and ancient healing wisdom guide your transformation.</p>
                </motion.div>
                <button
                  onClick={() => onNavigate('stay')}
                  className="btn-luxury"
                  style={{ width: '100%', maxWidth: '280px', padding: '0.9rem 1rem', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center', letterSpacing: '0.15em' }}
                >
                  Book Your Stay
                </button>
              </div>
            </div>

            {/* RIGHT — Commute + Hindu Calendar */}
            <div style={{
              backgroundColor: 'var(--antique-white)',
              padding: '2.5rem 2.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8rem'
            }}>

              {/* How to Reach */}
              <div>
                <h2 style={{color: 'var(--wine)', margin: '0 0 1.2rem 0'}}>
                  How to Reach Us
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { icon: <Car size={20} />, title: 'By Road', desc: '45-min scenic drive from South Bengaluru via Kanakapura Road.' },
                    { icon: <Train size={20} />, title: 'By Metro', desc: '20 min from Silk Institute Metro (Green Line). Shuttle taxis available.' },
                    { icon: <Plane size={20} />, title: 'From Airport', desc: '75 min from Kempegowda International Airport via NICE Road.' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                      <div>
                        <h4 style={{ color: 'var(--wine)', marginBottom: '0.15rem', fontSize: '1.05rem', fontWeight: 600 }}>{item.title}</h4>
                        <div style={{ fontSize: '0.82rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(94, 39, 53, 0.1)' }} />

              {/* Hindu Calendar + Date/Time Widget */}
              <HinduCalendarWidget />
            </div>
          </motion.div>

          {/* ── Section Title: Normal Heading ── */}
          <motion.div variants={itemVariants} style={{ gridColumn: 'span 12', marginTop: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            <h2 style={{color: 'var(--wine)', margin: 0}}>
              Share Your Feedback <span style={{ color: 'var(--harvest-gold)' }}>&amp; Follow Our Journey</span>
            </h2>
          </motion.div>

          {/* ── Box 4: Share Your Feedback Form (6 cols desktop / 12 mobile) ── */}
          <motion.div
            variants={itemVariants}
            style={{
              gridColumn: 'span 6',
              backgroundColor: '#f9f7f2',
              borderRadius: '24px',
              border: '1.5px solid rgba(74, 93, 63, 0.18)',
              boxShadow: '0 12px 35px rgba(74, 93, 63, 0.05)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
            className="bento-box-12-tablet"
          >
            {/* Card Title with Typewriter Animation */}
            <FeedbackCardTypewriter />
            <p style={{ fontSize: '0.88rem', color: 'var(--redwood)', opacity: 0.88, margin: '0 0 1.2rem 0' }}>
              Rate your experience and leave a comment.
            </p>

            {/* Star Rating Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setStarRating(star)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: star <= (hoverRating || starRating) ? 'var(--harvest-gold)' : 'rgba(94, 39, 53, 0.2)',
                    transition: 'color 0.2s, transform 0.2s',
                    transform: star <= (hoverRating || starRating) ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            {feedbackSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ color: 'var(--harvest-gold)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>✦</div>
                <h4 style={{color: 'var(--wine)', margin: '0 0 0.5rem 0'}}>Thank You!</h4>
                <p style={{ fontSize: '0.88rem', opacity: 0.8, margin: '0 0 1.2rem 0' }}>Your feedback has been submitted successfully.</p>
                <button onClick={() => { setFeedbackSent(false); setStarRating(0); }} className="btn-luxury" style={{ padding: '0.6rem 1.6rem', fontSize: '0.75rem' }}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-1-mobile">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.3rem' }}>Name</label>
                    <input
                      type="text" name="name" required value={feedback.name} onChange={handleInputChange} placeholder="Your name"
                      style={{
                        width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                        border: '1px solid rgba(94, 39, 53, 0.15)',
                        backgroundColor: '#ffffff', fontSize: '0.9rem', outline: 'none', color: 'var(--wine)',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.3rem' }}>Email</label>
                    <input
                      type="email" name="email" required value={feedback.email} onChange={handleInputChange} placeholder="your@email.com"
                      style={{
                        width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                        border: '1px solid rgba(94, 39, 53, 0.15)',
                        backgroundColor: '#ffffff', fontSize: '0.9rem', outline: 'none', color: 'var(--wine)',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.3rem' }}>Comment</label>
                  <textarea
                    name="comment" rows="3" required value={feedback.comment} onChange={handleInputChange} placeholder="Tell us about your experience..."
                    style={{
                      width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
                      border: '1px solid rgba(94, 39, 53, 0.15)',
                      backgroundColor: '#ffffff', fontSize: '0.9rem', outline: 'none', color: 'var(--wine)',
                      resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4a5d3f', color: '#ffffff', border: 'none',
                    padding: '0.95rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(74,93,63,0.25)', transition: 'transform 0.2s, background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.48rem' }}><Mail size={16} /> Send Feedback to Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.open('https://google.com', '_blank')}
                  style={{
                    backgroundColor: 'var(--redwood)', color: '#ffffff', border: 'none',
                    padding: '0.95rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(158,71,56,0.25)', transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.48rem' }}><Star size={16} /> Leave a Google Review</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Box 5: Follow Our Journey (6 cols desktop / 12 mobile) ── */}
          <motion.div
            variants={itemVariants}
            style={{
              gridColumn: 'span 6',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(94, 39, 53, 0.08)',
              boxShadow: '0 12px 35px rgba(94, 39, 53, 0.04)',
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            className="bento-box-12-tablet"
          >
            <h3 style={{color: 'var(--wine)', margin: '0 0 2.5rem 0'}}>
              Follow <span style={{ color: 'var(--harvest-gold)' }}>Our Journey</span>
            </h3>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.8rem',
              width: '100%'
            }}>
              {/* Instagram Drawing Line Icon */}
              <motion.a
                href="https://instagram.com/supradawellness" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.08, y: -4 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}
              >
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  backgroundColor: 'rgba(94, 39, 53, 0.04)',
                  border: '1.5px solid rgba(94, 39, 53, 0.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(94, 39, 53, 0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--wine)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: '0.88rem' }}>Instagram</span>
              </motion.a>

              {/* YouTube Drawing Line Icon */}
              <motion.a
                href="https://youtube.com/@supradawellness" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.08, y: -4 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}
              >
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  backgroundColor: 'rgba(94, 39, 53, 0.04)',
                  border: '1.5px solid rgba(94, 39, 53, 0.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(94, 39, 53, 0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--wine)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="none" stroke="var(--wine)" strokeWidth="1.8" />
                  </svg>
                </div>
                <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: '0.88rem' }}>YouTube</span>
              </motion.a>

              {/* Facebook Drawing Line Icon */}
              <motion.a
                href="https://facebook.com/supradawellness" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.08, y: -4 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}
              >
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  backgroundColor: 'rgba(94, 39, 53, 0.04)',
                  border: '1.5px solid rgba(94, 39, 53, 0.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(94, 39, 53, 0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--wine)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: '0.88rem' }}>Facebook</span>
              </motion.a>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Google Maps Embed Full-Width Row */}
      <section id="contact-map" style={{ padding: '2.25rem 8% 4.5rem 8%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            position: 'relative', width: '100%', height: '420px',
            overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(94, 39, 53, 0.08)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.04)'
          }}>
            <iframe
              title="Suprada Wellness Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.4497490903204!2d77.48124809231408!3d12.738480930369192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae43007d462a7d%3A0x3230e38fbc27a676!2sSUPRADA%20WELLNESS!5e0!3m2!1sen!2sin!4v1762768776104!5m2!1sen!2sin"
              style={{ border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      {/* CSS overrides for bento responsive */}
      <style>{`
        @media (max-width: 900px) {
          .bento-box-12-tablet {
            grid-column: span 12 !important;
            grid-template-columns: 1fr !important;
          }
          .grid-1-mobile {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #contact-bento, #contact-map {
            padding-left: 4.5% !important;
            padding-right: 4.5% !important;
          }
        }
      `}</style>

    </div>
  );
}
