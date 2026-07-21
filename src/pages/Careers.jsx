import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25 } from '../AnimatedPatterns';

const blurFadeIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

const cultureContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const cultureCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

const jobOpenings = [
  {
    id: "medical-officer-rmo",
    title: "Resident Medical Officer (RMO)",
    dept: "Medical",
    type: "Full Time",
    image: "/assets/jobs/RMO.jpeg",
    overview: "Responsible for clinical supervision, client safety, administrative coordination, and wellness brand support under the guidance of the Chief Medical Officer.",
    reportsTo: "Chief Medical Officer / Wellness Director",
    responsibilities: [
      "Review medical history, medications, contraindications, and lifestyle factors.",
      "Approve, modify, or restrict wellness therapies based on health status.",
      "Monitor client progress and wellbeing during wellness programs.",
      "Provide clearance for detox, fasting, hydrotherapy, and intensive therapies.",
      "Manage minor medical issues, first aid, and wellness-related discomforts.",
      "Identify emergencies and initiate appropriate medical response.",
      "Coordinate referrals and hospital transfers when required.",
      "Ensure availability and readiness of emergency kits, medicines, and equipment.",
      "Work closely with naturopathy, yoga, physiotherapy, dietetics, massage, counseling, and integrative therapy teams.",
      "Guide therapists on precautions, contraindications, and safety protocols.",
      "Maintain accurate medical records, consent forms, registers, and reports.",
      "Support quality improvement and patient safety initiatives."
    ],
    skills: [
      "Basic computer knowledge mandatory, including MS Word, Excel, and digital documentation.",
      "Ability to explain health and wellness concepts clearly to diverse client groups.",
      "Willingness to participate in branding, case discussions, and wellness planning meetings.",
      "Comfortable representing the wellness centre in clinical briefings."
    ],
    qualifications: "BNYS (Bachelor of Naturopathy & Yogic Sciences) from a recognized university. Valid registration with the AYUSH Council. Additional qualifications in Yoga Therapy or Acupuncture will be a value addition.",
    experience: "1–3 years of experience in wellness centres, naturopathy hospitals, or clinical settings preferred.",
    benefits: "Best-in-the-Industry Compensation. Salary commensurate with qualifications, experience, and skill set."
  },
  {
    id: "hospitality-manager",
    title: "Hospitality Manager",
    dept: "Hospitality",
    type: "Full Time",
    image: "/assets/jobs/hospitality-manager.jpeg",
    overview: "Create a warm, seamless, and high-quality guest experience. Blends hospitality excellence with wellness sensitivity.",
    reportsTo: "Centre Manager / Operations Head",
    responsibilities: [
      "Ensure smooth check-in/check-out processes with a calm, welcoming approach.",
      "Handle guest feedback, concerns, and special requests with empathy and professionalism.",
      "Maintain high standards of service etiquette aligned with wellness values.",
      "Coordinate closely with medical, therapy, kitchen, housekeeping, and administration teams.",
      "Ensure daily schedules, therapy appointments, and wellness programs run smoothly.",
      "Monitor cleanliness, ambience, and overall readiness of guest-facing areas.",
      "Supervise front desk, guest relations, housekeeping coordination, and support staff.",
      "Train staff in wellness hospitality, guest communication, and service excellence.",
      "Foster a culture of calmness, respect, and mindful service.",
      "Maintain guest records, feedback logs, and service reports."
    ],
    skills: [
      "Excellent communication and interpersonal skills.",
      "Strong organizational and multitasking abilities.",
      "Calm, compassionate, and service-oriented mindset.",
      "Leadership and team coordination skills.",
      "Basic computer knowledge (MS Office, guest management systems)."
    ],
    qualifications: "Degree/Diploma in Hotel Management, Hospitality, or Healthcare Management.",
    experience: "Experience in wellness centres, hospitals, resorts, retreats, or premium hospitality preferred. Exposure to wellness, naturopathy, or Ayurvedic environments is an advantage.",
    benefits: "Best in the industry, commensurate with experience and expertise."
  },
  {
    id: "therapeutic-yoga-trainer",
    title: "Therapeutic Yoga Trainer",
    dept: "Wellness",
    type: "Full Time",
    image: "/assets/jobs/yoga-trainer.jpeg",
    overview: "Deliver personalized and group-based yoga therapy using an integrated, multisystem approach (Hatha, Vinyasa, Iyengar, Aqua).",
    reportsTo: "Chief Medical Officer / Wellness Director",
    responsibilities: [
      "Adapt and modify asanas based on age, medical conditions, injury status, and fitness levels.",
      "Integrate pranayama, meditation, yoga nidra, and mindfulness into therapy plans.",
      "Coordinate with doctors, naturopaths, and other therapists to align yoga therapy with overall treatment plans.",
      "Educate clients on yogic lifestyle, posture correction, ergonomics, and breath awareness.",
      "Conduct group sessions, workshops, and wellness talks.",
      "Ensure safety, hygiene, and discipline in yoga therapy and aqua yoga spaces.",
      "Assist in SOP development for multisystem yoga therapy.",
      "Support basic scheduling, reporting, and programme documentation."
    ],
    skills: [
      "Certified Yoga Teacher (200/500 hours) with specific credentials in Yoga Therapy.",
      "Deep understanding of anatomical alignment, physiology, and injury prevention.",
      "Excellent instruction and public speaking skills."
    ],
    qualifications: "Degree/Diploma in Yoga Therapy / Integrated Yoga Systems / Yoga Science. Formal training in Iyengar Yoga, Aqua Yoga, or Vinyasa.",
    experience: "Experience in a wellness centre, hospital, or clinical setting preferred.",
    benefits: "Best in the industry, based on qualifications and experience."
  },
  {
    id: "senior-therapist",
    title: "Senior Therapist – Integrative Wellness",
    dept: "Integrative Therapies",
    type: "Full Time",
    image: "/assets/jobs/Therapist – Integrative Wellness.jpeg",
    overview: "Deliver personalized, evidence-informed holistic therapies and provide clinical supervision and mentorship.",
    reportsTo: "Chief Medical Officer / Wellness Director",
    responsibilities: [
      "Deliver customized holistic therapies (massages, wraps, hydrotherapy, Ayurvedic treatments) with high quality care.",
      "Develop individualized integrative care plans in coordination with physicians and wellness consultants.",
      "Ensure strict adherence to SOPs, hygiene, and safety standards.",
      "Maintain accurate documentation, therapy notes, and outcome records.",
      "Identify contraindications and escalate clinical concerns to the medical team.",
      "Supervise, mentor, and train junior therapists.",
      "Ensure uniformity and excellence in therapy delivery across departments.",
      "Support skill upgradation, case discussions, and internal training programs.",
      "Support development of integrative wellness programs and retreats."
    ],
    skills: [
      "Strong clinical reasoning with a holistic perspective.",
      "Multidisciplinary collaboration and mentoring skills.",
      "Excellent communication and client education skills."
    ],
    qualifications: "Diploma/Graduation in Ayurvedic Therapies, Panchakarma, or Naturopathic Massage. Certifications in hydrotherapy, sound healing, or energy-based therapies are a strong value addition.",
    experience: "3–6 years of clinical experience in integrative wellness centres, hospitals, or retreats. Experience in leading therapy teams preferred.",
    benefits: "Best in the industry, aligned with experience and expertise."
  },
  {
    id: "junior-naturopathy-therapist",
    title: "Junior Naturopathy Therapist",
    dept: "Clinical / Therapy Services",
    type: "Full Time",
    image: "/assets/jobs/naturopathy-therapist.jpeg",
    overview: "Support the delivery of naturopathic therapies and wellness programs under supervision.",
    reportsTo: "Senior Therapist / Medical Officer",
    responsibilities: [
      "Prepare therapy rooms, equipment, and materials before sessions.",
      "Monitor client comfort and report any concerns to senior staff.",
      "Follow prescribed treatment protocols and SOPs strictly.",
      "Greet and guide guests politely before and after therapies.",
      "Explain basic procedures and post-therapy care instructions.",
      "Maintain cleanliness and sanitation of therapy rooms and equipment.",
      "Follow infection control, safety, and hygiene standards.",
      "Assist in inventory management of therapy consumables.",
      "Help with appointment coordination and therapy schedules.",
      "Maintain daily treatment logs and basic reports."
    ],
    skills: [
      "Basic knowledge of naturopathy principles and treatments.",
      "Willingness to learn and work under supervision.",
      "Good communication and interpersonal skills.",
      "Calm, empathetic, and service-oriented attitude.",
      "Physical stamina to assist in therapies."
    ],
    qualifications: "Diploma or Certification in Naturopathy, Massage Therapy, or Nursing assistance.",
    experience: "Freshers or candidates with 0–2 years of experience can apply.",
    benefits: "Best in the industry."
  },
  {
    id: "front-office-receptionist",
    title: "Front Office Receptionist",
    dept: "Front Office / Administration",
    type: "Full Time",
    image: "/assets/jobs/receptionist.jpeg",
    overview: "First point of contact for clients. Deliver a warm, calm, and professional experience while managing front desk operations.",
    reportsTo: "Centre Manager / Operations Head",
    responsibilities: [
      "Welcome clients with a pleasant, calm, and empathetic approach.",
      "Manage client check-in and check-out processes smoothly.",
      "Provide accurate information about wellness programs, therapies, packages, and centre facilities.",
      "Handle client queries, feedback, and concerns professionally.",
      "Manage therapy and consultation appointments (walk-ins, phone, WhatsApp, online bookings).",
      "Coordinate schedules between therapists, doctors, and clients.",
      "Generate bills, collect payments, and issue receipts.",
      "Maintain daily cash, UPI, card payment records, and handover to accounts.",
      "Maintain client records, consent forms, and basic documentation.",
      "Handle incoming calls, emails, and messages."
    ],
    skills: [
      "Pleasant personality with excellent communication skills.",
      "Strong interpersonal and customer service orientation.",
      "Basic computer knowledge (MS Word, Excel, billing software).",
      "Ability to multitask and stay composed in a wellness environment."
    ],
    qualifications: "Graduate or equivalent qualification. Prior experience in wellness centres, clinics, hotels, or hospitality is an advantage.",
    experience: "0–2 years in receptionist or front desk operations preferred.",
    benefits: "Best in the industry, commensurate with experience and skills."
  },
  {
    id: "head-chef",
    title: "Wellness Centre Head Chef",
    dept: "Wellness / Naturopathy / Diet & Nutrition",
    type: "Full Time",
    image: "/assets/jobs/head-chef.jpeg",
    overview: "Plan, prepare, and serve therapeutic, sattvik, and naturopathy-based meals.",
    reportsTo: "Medical Officer / Nutritionist / Wellness Director",
    responsibilities: [
      "Prepare sattvik, vegetarian, plant-based meals aligned with naturopathy principles.",
      "Cook meals as per individual nutritional prescriptions given by doctors/nutritionists.",
      "Execute special diets (Detox, fasting, Raw food, Alkaline, Salt/Sugar/Oil-free, Disease-specific).",
      "Maintain strict adherence to naturopathy, yoga, and Satvik food guidelines.",
      "Use natural cooking methods (Steaming, boiling, minimal sautéing) and avoid refined/processed foods.",
      "Maintain high standards of hygiene, cleanliness, and food safety.",
      "Source and use fresh, organic, seasonal, and locally available ingredients.",
      "Maintain inventory and reduce kitchen wastage.",
      "Support wellness programs, workshops, or detox retreats with cooking demos."
    ],
    skills: [
      "Ability to cook without compromising taste while following strict nutritional guidelines.",
      "Good communication, leadership, and coordination skills.",
      "Deep understanding of sattvik and organic nutrition."
    ],
    qualifications: "Diploma/Degree in Hotel Management, Culinary Arts, Nutrition, or Naturopathy-based food systems. Formal training/experience in Sattvik cooking or Therapeutic cuisine.",
    experience: "Minimum 2–5 years experience in Wellness centres, Naturopathy retreats, or premium wellness resorts.",
    benefits: "Best in the industry, commensurate with experience and expertise."
  }
];

function JobOpeningCard({ job, onDetailClick, onApplyClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position state for 3D Tilt
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Map to max tilt degrees (e.g. 12 degrees max tilt)
    setTilt({
      x: -mouseY * 12, // Rotate around X axis based on Y mouse movement
      y: mouseX * 12   // Rotate around Y axis based on X mouse movement
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // When NOT hovered, we apply a gentle floating/swaying animation.
  // When hovered, we use the manual mouse coordinates tilt.
  const animateState = isHovered 
    ? { rotateX: tilt.x, rotateY: tilt.y, scale: 1.02 }
    : { 
        rotateX: [ -1.5, 1.5, -1.5 ], 
        rotateY: [ -2, 2, -2 ], 
        y: [ 0, -5, 0 ], 
        scale: 1 
      };

  const transitionState = isHovered
    ? { type: "spring", stiffness: 150, damping: 15 }
    : {
        rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        rotateY: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 },
        y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 100, damping: 15 }
      };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={animateState}
      transition={transitionState}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        border: isHovered 
          ? '1px solid rgba(220,160,50,0.4)' 
          : '1px solid rgba(94,39,53,0.08)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(94, 39, 53, 0.12)' 
          : '0 8px 30px rgba(94, 39, 53, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.8rem',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        height: 'auto',
        minHeight: '190px',
        justifyContent: 'space-between',
        transition: 'border-color 0.3s, box-shadow 0.3s'
      }}
    >
      {/* Glow Effect on Hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(220,160,50,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      )}

      {/* Main card content */}
      <motion.div layout="position">
        {/* Header tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <span style={{
            backgroundColor: 'rgba(94, 39, 53, 0.06)',
            color: 'var(--wine)',
            padding: '0.35rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {job.dept}
          </span>
          <span style={{
            color: '#666',
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}>
            🕒 {job.type}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--wine)',
          fontSize: '1.4rem',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.3
        }}>
          {job.title}
        </h3>
      </motion.div>

      {/* Collapsible details section */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {/* Divider line */}
            <div style={{ height: '1px', backgroundColor: 'rgba(94, 39, 53, 0.08)', margin: '1.2rem 0' }} />

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#666', marginBottom: '0.6rem', fontWeight: 500 }}>
              📍 Suprada Wellness, Bangalore
            </div>

            {/* Job Description Overview */}
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--raisin-black)',
              opacity: 0.85,
              lineHeight: 1.5,
              margin: 0
            }}>
              {job.overview}
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDetailClick();
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'var(--wine)',
                  border: '1.5px solid var(--wine)',
                  borderRadius: '8px',
                  padding: '0.65rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--wine)'; e.target.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--wine)'; }}
              >
                View Details
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyClick();
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'var(--wine)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.65rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(94, 39, 53, 0.15)'
                }}
                onMouseEnter={(e) => { e.target.style.opacity = 0.9; }}
                onMouseLeave={(e) => { e.target.style.opacity = 1; }}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Gold Border Line at Bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #b5801c, #f7d070, #b5801c)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s'
      }} />
    </motion.div>
  );
}

export default function Careers({ onNavigate }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailJobId, setDetailJobId] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyData, setApplyData] = useState({ name: '', email: '', phone: '', cv: '', message: '' });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (job.skills && job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesDept = selectedDept === "All" || job.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const departments = ["All", ...new Set(jobOpenings.map(j => j.dept))];


  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplied(true);
  };

  const handleInputChange = (e) => {
    setApplyData({ ...applyData, [e.target.name]: e.target.value });
  };

  // Find job for details page
  const detailJob = jobOpenings.find(j => j.id === detailJobId);

  const typewriterSlides = [
    {
      tag: "Careers",
      title: "Join the Team",
      desc: "Join a community dedicated to restoring biological balance, nurturing nature, and transforming guest lives through drugless holistic healing."
    },
    {
      tag: "Culture",
      title: "Why Work With Us?",
      desc: "We don't just offer jobs; we offer a sanctuary where you can grow, learn, and be part of a meaningful purpose."
    }
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");
  const [typingPhase, setTypingPhase] = useState("typing-title"); // "typing-title", "typing-desc", "waiting", "deleting"
  const [isTypewriterPaused, setIsTypewriterPaused] = useState(false);

  const [activeCultureTab, setActiveCultureTab] = useState(0);
  const [cultureProgress, setCultureProgress] = useState(0);

  const culturePoints = [
    { title: 'Holistic Environment', desc: 'Work amidst 10 acres of lush forest greenery, riverside silence, and clean organic gardens. A space that heals you while you heal others.', icon: '🍃' },
    { title: 'Continuous Learning', desc: 'Gain deep medical and practical expertise in ancient Indian healing sciences, yogic diagnostics, and premium wellness hospitality standards.', icon: '📖' },
    { title: 'Culture of Care', desc: 'We prioritize the physical and emotional well-being of our team members just as much as our guests. Healing starts within our own family.', icon: '💚' }
  ];

  const currentSlide = typewriterSlides[activeSlideIdx];

  useEffect(() => {
    if (isTypewriterPaused) return;

    let timer;
    if (typingPhase === "typing-title") {
      if (typedTitle.length < currentSlide.title.length) {
        timer = setTimeout(() => {
          setTypedTitle(currentSlide.title.slice(0, typedTitle.length + 1));
        }, 8);
      } else {
        setTypingPhase("typing-desc");
      }
    } else if (typingPhase === "typing-desc") {
      if (typedDesc.length < currentSlide.desc.length) {
        timer = setTimeout(() => {
          setTypedDesc(currentSlide.desc.slice(0, typedDesc.length + 1));
        }, 5);
      } else {
        setTypingPhase("waiting");
      }
    } else if (typingPhase === "waiting") {
      timer = setTimeout(() => {
        setTypingPhase("deleting");
      }, 4000);
    } else if (typingPhase === "deleting") {
      if (typedDesc.length > 0) {
        timer = setTimeout(() => {
          setTypedDesc((prev) => prev.slice(0, -2));
        }, 5);
      } else if (typedTitle.length > 0) {
        timer = setTimeout(() => {
          setTypedTitle((prev) => prev.slice(0, -2));
        }, 5);
      } else {
        setTypedTitle("");
        setTypedDesc("");
        setActiveSlideIdx((prev) => (prev + 1) % typewriterSlides.length);
        setTypingPhase("typing-title");
      }
    }

    return () => clearTimeout(timer);
  }, [typingPhase, typedTitle, typedDesc, activeSlideIdx, isTypewriterPaused]);

  useEffect(() => {
    if (activeSlideIdx !== 1 || isTypewriterPaused) return;

    const interval = 30; // ms
    const duration = 4500; // ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setCultureProgress((prev) => {
        if (prev >= 100) {
          setActiveCultureTab((current) => (current + 1) % 3);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeSlideIdx, isTypewriterPaused]);

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', paddingTop: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* Botanical Leaf Vector Watermarks */}
      <Pattern24 style={{ position: 'absolute', top: '30%', left: '-80px', width: '340px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      <Pattern25 style={{ position: 'absolute', top: '65%', right: '-80px', width: '340px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      
      <AnimatePresence mode="wait">
        {!detailJobId ? (
          // MAIN CAREERS LISTINGS PAGE
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Unified Typewriter Hero Section */}
            <section 
              style={{
                boxSizing: 'border-box',
                padding: '8rem 8% 6rem 8%',
                background: 'linear-gradient(135deg, #6b2e3e 0%, #5e2735 60%, #4a1d28 100%)',
                color: '#ffffff',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
              }}
            >
              {/* Leaf SVG Watermark Overlays */}
              <Pattern24 style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.16, color: '#ffffff', pointerEvents: 'none' }} />
              <Pattern25 style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.16, color: '#ffffff', pointerEvents: 'none' }} />

              {/* CSS style tag for blinking cursor */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes blinkCursor {
                  50% { opacity: 0; }
                }
                .typewriter-cursor {
                  display: inline-block;
                  width: 3px;
                  height: 1em;
                  background-color: var(--harvest-gold);
                  margin-left: 4px;
                  animation: blinkCursor 0.8s infinite;
                  vertical-align: middle;
                }
              `}} />

              {/* Ambient Golden & Green Bokeh Glows */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.22) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

              <motion.div layout style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%' }}>
                {/* Active tag indicator */}
                <span style={{ 
                  color: 'var(--harvest-gold)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.3em', 
                  fontSize: '0.8rem', 
                  fontWeight: 800, 
                  display: 'block', 
                  marginBottom: '1rem'
                }}>
                  {currentSlide.tag}
                </span>

                {/* Blinking indicator/typing title */}
                <h1 style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)', 
                  color: 'var(--tan)', 
                  fontWeight: 500, 
                  lineHeight: 1.15, 
                  margin: 0,
                  minHeight: '5.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span>{typedTitle}</span>
                  {typingPhase === "typing-title" && <span className="typewriter-cursor" />}
                </h1>

                {/* Blinking indicator/typing description */}
                <p style={{ 
                  color: 'var(--isabelline)', 
                  opacity: 0.9, 
                  maxWidth: '700px', 
                  margin: '1.8rem auto 0 auto', 
                  fontSize: '1.08rem', 
                  lineHeight: 1.8, 
                  fontWeight: 300,
                  minHeight: '5.5rem'
                }}>
                  <span>{typedDesc}</span>
                  {(typingPhase === "typing-desc" || typingPhase === "waiting") && <span className="typewriter-cursor" />}
                </p>

                {/* Interactive Culture Points Showcase (Visible only on slide 2) */}
                <AnimatePresence>
                  {activeSlideIdx === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        marginTop: '2.5rem',
                        padding: '2rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        textAlign: 'left'
                      }}
                    >
                      {/* Tabs Header */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '1rem', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                        paddingBottom: '1rem', 
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap'
                      }}>
                        {culturePoints.map((pt, idx) => {
                          const isActive = activeCultureTab === idx;
                          return (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCultureTab(idx);
                                setCultureProgress(0);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: isActive ? 'var(--harvest-gold)' : 'var(--isabelline)',
                                opacity: isActive ? 1 : 0.6,
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '0.5rem 1rem',
                                position: 'relative',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}
                            >
                              <span>{pt.icon}</span>
                              <span>{pt.title}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="activeCultureTabLine"
                                  style={{
                                    position: 'absolute',
                                    bottom: '-1.05rem',
                                    left: 0,
                                    right: 0,
                                    height: '2.5px',
                                    backgroundColor: 'var(--harvest-gold)',
                                    borderRadius: '2px'
                                  }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Content Description */}
                      <div style={{ 
                        minHeight: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        padding: '0 1rem' 
                      }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeCultureTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%' }}
                          >
                            <p style={{ 
                              fontSize: '1.1rem', 
                              lineHeight: 1.7, 
                              color: 'var(--isabelline)', 
                              opacity: 0.95, 
                              fontWeight: 300, 
                              margin: 0,
                              textAlign: 'center'
                            }}>
                              {culturePoints[activeCultureTab].desc}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Moving progress bar line */}
                      <div style={{ 
                        width: '100%', 
                        height: '2px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                        marginTop: '1.8rem', 
                        borderRadius: '2px', 
                        overflow: 'hidden' 
                      }}>
                        <div 
                          style={{ 
                            width: `${cultureProgress}%`, 
                            height: '100%', 
                            backgroundColor: 'var(--harvest-gold)', 
                            transition: 'width 0.03s linear' 
                          }} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* Current Openings — Search, Filter & Interactive Cards */}
            <section style={{ padding: '6rem 8%', backgroundColor: 'var(--isabelline)' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                  <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.8rem' }}>
                    Join the Movement
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.3rem', color: 'var(--wine)', fontWeight: 700, margin: 0 }}>
                    Current Openings
                  </h2>
                  <p style={{ color: 'var(--raisin-black)', opacity: 0.7, maxWidth: '520px', margin: '1rem auto 0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    We are actively looking for compassionate professionals. Hover a role to explore — or write to <strong>supradawellness@gmail.com</strong>
                  </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <div style={{
                    position: 'relative',
                    maxWidth: '560px',
                    margin: '0 auto'
                  }}>
                    <span style={{
                      position: 'absolute', left: '1.2rem', top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1.1rem', pointerEvents: 'none', opacity: 0.5
                    }}>🔍</span>
                    <input
                      type="text"
                      placeholder="Search by role, skill or department…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.2rem 1rem 3rem',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(94, 39, 53, 0.12)',
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(12px)',
                        fontSize: '0.95rem',
                        color: 'var(--raisin-black)',
                        outline: 'none',
                        boxShadow: '0 4px 20px rgba(94, 39, 53, 0.05)',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(220,160,50,0.5)';
                        e.target.style.boxShadow = '0 0 0 4px rgba(220,160,50,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(94, 39, 53, 0.12)';
                        e.target.style.boxShadow = '0 4px 20px rgba(94, 39, 53, 0.05)';
                      }}
                    />
                  </div>
                </motion.div>

                {/* Department Filter Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    flexWrap: 'wrap',
                    marginBottom: '3rem'
                  }}
                >
                  {departments.map(dept => {
                    const active = selectedDept === dept;
                    return (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        style={{
                          padding: '0.5rem 1.1rem',
                          borderRadius: '999px',
                          border: active ? '1.5px solid var(--wine)' : '1.5px solid rgba(94, 39, 53, 0.15)',
                          backgroundColor: active ? 'var(--wine)' : 'rgba(255,255,255,0.7)',
                          color: active ? '#ffffff' : 'var(--raisin-black)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          transition: 'all 0.25s ease',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </motion.div>

                {/* Job Cards Grid */}
                <AnimatePresence mode="popLayout">
                  {filteredJobs.length > 0 ? (
                    <motion.div
                      layout
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem',
                        alignItems: 'start'
                      }}
                    >
                      {filteredJobs.map((job, i) => (
                        <motion.div
                          key={job.id}
                          layout
                          initial={{ opacity: 0, y: 35, scale: 0.97 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          viewport={{ once: false, margin: '-30px' }}
                          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <JobOpeningCard
                            job={job}
                            onDetailClick={() => setDetailJobId(job.id)}
                            onApplyClick={() => setSelectedJob(job)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--raisin-black)', opacity: 0.5 }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>No openings match your search.</p>
                      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try a different keyword or department filter.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </section>
          </motion.div>
        ) : (
          // JOB DETAILS DEDICATED VIEW (Vercel sub-page style)
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 8% 8rem 8%' }}
          >
            {/* Back Button Link */}
            <div 
              onClick={() => setDetailJobId(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--redwood)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2.5rem', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.target.style.opacity = 0.8}
              onMouseLeave={(e) => e.target.style.opacity = 1}
            >
              ← Back to All Openings
            </div>

            {/* Detail Page Title Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <span style={{ color: 'var(--redwood)' }}>{detailJob.dept}</span>
                <span style={{ color: 'var(--raisin-black)', opacity: 0.5 }}>•</span>
                <span style={{ color: 'var(--raisin-black)', opacity: 0.6 }}>{detailJob.type}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--wine)', fontWeight: 700, margin: '0.5rem 0' }}>
                {detailJob.title}
              </h1>
              <div style={{ fontSize: '0.95rem', color: '#666', fontWeight: 500 }}>
                📍 Suprada Wellness, Bangalore &nbsp; | &nbsp; Reports to: {detailJob.reportsTo}
              </div>
            </div>

            {/* Split Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'start' }}>
              {/* Left Details Block */}
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2.5rem' }} className="bento-box-12-tablet">
                
                {/* Overview */}
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--wine)', fontWeight: 700, borderBottom: '1px solid rgba(94,39,53,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    Role Overview
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.7, margin: 0 }}>
                    {detailJob.overview}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--wine)', fontWeight: 700, borderBottom: '1px solid rgba(94,39,53,0.1)', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>
                    Key Responsibilities
                  </h2>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1.2rem', margin: 0, fontSize: '0.92rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.6 }}>
                    {detailJob.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                {detailJob.skills.length > 0 && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--wine)', fontWeight: 700, borderBottom: '1px solid rgba(94,39,53,0.1)', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>
                      Skills & Competencies
                    </h2>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1.2rem', margin: 0, fontSize: '0.92rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.6 }}>
                      {detailJob.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Side Info Card */}
              <div style={{
                gridColumn: 'span 4',
                backgroundColor: '#ffffff',
                border: '1.5px solid rgba(220, 160, 50, 0.25)',
                borderRadius: '16px',
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.8rem',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.04)',
                position: 'sticky',
                top: '7rem'
              }} className="bento-box-12-tablet">
                <div>
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Qualifications</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.5 }}>
                    {detailJob.qualifications}
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Experience Required</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.5 }}>
                    {detailJob.experience || "Freshers and experienced candidates can apply."}
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, margin: '0 0 0.4rem 0' }}>Benefits & Pay</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.5 }}>
                    Best in the industry, commensurate with experience and skill sets.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedJob(detailJob)}
                  className="btn-luxury"
                  style={{ width: '100%', padding: '1rem', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center' }}
                >
                  Apply For This Position
                </button>
              </div>
            </div>

            {/* Explore Other Openings */}
            <div style={{ marginTop: '7rem', borderTop: '1px solid rgba(94,39,53,0.1)', paddingTop: '4rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--wine)', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>
                Explore Other Openings
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {jobOpenings.filter(j => j.id !== detailJobId).slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    onClick={() => { setDetailJobId(job.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(94,39,53,0.06)',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.8rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 700, textTransform: 'uppercase' }}>{job.dept}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--wine)', fontWeight: 700, margin: 0 }}>{job.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>📍 Bangalore &nbsp;•&nbsp; {job.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-Drawer Slide-in Application Modal (Kept clean and matching project style) */}
      <AnimatePresence>
        {selectedJob && (
          <div
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(37, 36, 37, 0.65)', zIndex: 10000,
              display: 'flex', justifyContent: 'flex-end', backdropFilter: 'blur(5px)'
            }}
            onClick={() => { setSelectedJob(null); setApplied(false); }}
          >
            {/* Slide-in container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff', height: '100vh', width: '100%',
                maxWidth: '560px', boxShadow: '-15px 0 40px rgba(0,0,0,0.15)',
                display: 'flex', flexDirection: 'column', position: 'relative',
                borderLeft: '1px solid rgba(220,160,50,0.2)',
                overflow: 'hidden'
              }}
            >
              
              {/* Drawer content area */}
              <div style={{ padding: '3.5rem 3rem', overflowY: 'scroll', flexGrow: 1, display: 'flex', flexDirection: 'column', height: 0, minHeight: 0 }}>
                {applied ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', margin: 'auto 0' }}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '1.2rem' }}>🌿</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--wine)', marginBottom: '0.8rem', fontWeight: 700 }}>Application Received</h3>
                    <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6, maxWidth: '360px', margin: '0 auto' }}>
                      Thank you for applying. Your credentials have been registered and our HR director will connect with you via email shortly.
                    </p>
                    <button 
                      onClick={() => { setSelectedJob(null); setApplied(false); }}
                      className="btn-luxury" 
                      style={{ padding: '0.8rem 2.2rem', fontSize: '0.78rem', marginTop: '2.5rem', width: '100%', textAlign: 'center' }}
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{selectedJob.dept}</span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--wine)', margin: '0.2rem 0 0 0', fontWeight: 700 }}>{selectedJob.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--wine)', opacity: 0.6 }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--raisin-black)', opacity: 0.9, borderBottom: '1px solid rgba(94,39,53,0.08)', paddingBottom: '1.8rem' }}>
                      <p style={{ margin: 0, lineHeight: 1.6 }}><strong>Type:</strong> {selectedJob.type}</p>
                      <p style={{ margin: 0, lineHeight: 1.6 }}><strong>Role:</strong> {selectedJob.overview}</p>
                    </div>

                    <form onSubmit={handleApplySubmit} className="luxury-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="app-name" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--wine)' }}>Your Full Name</label>
                        <input 
                          type="text" id="app-name" name="name" required placeholder="e.g. Dr. Ramesh Rao" 
                          value={applyData.name} onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="app-email" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--wine)' }}>Email Address</label>
                        <input 
                          type="email" id="app-email" name="email" required placeholder="e.g. ramesh@example.com" 
                          value={applyData.email} onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="app-phone" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--wine)' }}>Phone Number</label>
                        <input 
                          type="tel" id="app-phone" name="phone" required placeholder="e.g. +91 98765 43210" 
                          value={applyData.phone} onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="app-cv" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--wine)' }}>Resume Link (Google Drive / Dropbox)</label>
                        <input 
                          type="url" id="app-cv" name="cv" required placeholder="e.g. https://drive.google.com/.../cv.pdf" 
                          value={applyData.cv} onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="app-msg" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--wine)' }}>Cover Note (Optional)</label>
                        <textarea 
                          id="app-msg" name="message" rows="4" placeholder="Tell us why you would love to work by the riverbanks..."
                          value={applyData.message} onChange={handleInputChange}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                        />
                      </div>

                      <button type="submit" className="btn-luxury" style={{ padding: '1rem', width: '100%', fontSize: '0.82rem', marginTop: '0.5rem', textAlign: 'center' }}>
                        Submit Application
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
