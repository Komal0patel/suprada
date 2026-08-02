import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern27 } from '../AnimatedPatterns';
import TwinklingLights from '../components/TwinklingLights';
import DecorativeSVG from '../components/DecorativeSVG';

// --- Sub-Component: Ambient Gold Ember Dust Particles ---
function GoldEmberParticles({ count = 25 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * -9,
      opacity: 0.2 + Math.random() * 0.6
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: `${p.y}%`, x: `${p.x}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${(p.y - 25 + 100) % 100}%`],
            opacity: [0, p.opacity, p.opacity, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: 'var(--harvest-gold)',
            boxShadow: '0 0 16px rgba(220, 160, 50, 0.9)'
          }}
        />
      ))}
    </div>
  );
}

// --- Sub-Component: Interactive 3D Perspective Canvas ---
function PerspectiveCardCanvas({ children, style, className, onClick }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(-((y - centerY) / 22));
    setRotateY((x - centerX) / 22);
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  return (
    <motion.div
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: "1200px",
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: isHovered 
            ? `radial-gradient(800px circle at ${glowPos.x}% ${glowPos.y}%, rgba(220, 160, 50, 0.3), transparent 50%)`
            : 'none',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background 0.15s ease'
        }} 
      />
      <div style={{ transform: "translateZ(30px)", width: "100%", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

// --- Main Complete Stay Page Component ---
export default function Stay({ onNavigate }) {
  // Scraped Master Data List with MULTIPLE IMAGES PER ROOM TYPE (Extracted from supradawellness-v3.vercel.app/stay)
  const cottageList = [
    {
      id: 'samprada',
      num: '01',
      roman: 'I',
      name: 'Samprada Block',
      titleName: 'Samprada',
      category: 'Heritage Garden Cottages',
      catGroup: 'Heritage & Gardens',
      zone: 'North Garden Quad',
      tagline: 'Rustic Charm & Grounded Connection',
      desc: 'Experience the essence of tradition in our Samprada block. These Deluxe and Super Deluxe cottages offer a harmonious blend of rustic charm and modern comfort, perfect for those seeking a grounded connection with nature.',
      features: ['Garden View', 'Private Sit-out', 'Heritage Architecture', 'Close to Dining'],
      config: 'Deluxe Cottage (U1 & U2) | Super Deluxe Cottage (L1)',
      img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2096608/pexels-photo-2096608.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.3,
      viewType: 'Garden View',
      areaSqFt: 580,
      material: 'Locally Sourced Stone & Lime Plaster',
      inRoomTherapy: false,
      bestFor: 'Nature Lovers & Grounded Wellness Seekers',
      highlights: [
        'Garden View with traditional private sit-out veranda',
        'Built with local stone and breathable lime plaster',
        'Close proximity to main dining and therapy spaces',
        'Heritage architecture with natural cross-ventilation'
      ],
      hotspots: [
        { top: '35%', left: '42%', title: 'Lime Plaster Walls', desc: 'Porous lime plaster absorbs morning humidity and cools room air naturally.' },
        { top: '65%', left: '72%', title: 'Private Sit-out', desc: 'Shaded veranda facing lush botanical garden trails.' }
      ]
    },
    {
      id: 'samrduddhi',
      num: '02',
      roman: 'II',
      name: 'Samrduddhi / Supritha Block',
      titleName: 'Samrduddhi / Supritha',
      category: 'Exclusive Private Sanctuary',
      catGroup: 'Secluded Sanctuaries',
      zone: 'Forest Seclusion',
      tagline: 'Seclusion & Deeper Immersion in Silence',
      desc: 'Designed for exclusivity, these premium private cottages offer an elevated level of privacy and luxury. Ideal for guests who desire seclusion and a deeper immersion into silence.',
      features: ['Enhanced Privacy', 'Spacious Interiors', 'Luxury Amenities', 'Personal Meditation Corner'],
      config: 'Premium Private Cottage (L2)',
      img: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 5.0,
      viewType: 'Private Sanctuary View',
      areaSqFt: 750,
      material: 'Organic Lime Plaster & Reclaimed Wood',
      inRoomTherapy: true,
      bestFor: 'Deep Silence Seekers & Executive Wellness',
      highlights: [
        'Enhanced privacy inside a quiet secluded sanctuary enclave',
        'Personal meditation corner for daily inner practice',
        'Spacious luxury interiors with premium organic linen',
        'Dedicated silent space for uninterrupted rest'
      ],
      hotspots: [
        { top: '45%', left: '55%', title: 'Spacious Interiors', desc: 'Airy luxury layout with handcrafted wooden decor.' },
        { top: '75%', left: '28%', title: 'Meditation Corner', desc: 'Quiet nook for morning pranayama and contemplation.' }
      ]
    },
    {
      id: 'spandana',
      num: '03',
      roman: 'III',
      name: 'Spandana Block',
      titleName: 'Spandana',
      category: 'River Breeze Retreat',
      catGroup: 'River & Breeze',
      zone: 'Riverfront Bend',
      tagline: 'Resonating Energy & Cooling Winds',
      desc: "The 'Vibration' block resonates with life and energy. Spandana offers a mix of Deluxe and Super Deluxe cottages, situated to capture the morning light and the gentle river breeze.",
      features: ['River Breeze', 'Natural Lighting', 'Traditional Decor', 'Reading Nook'],
      config: 'Deluxe Cottage (U1 & U2) | Super Deluxe Cottage (L1 & L2)',
      img: 'https://images.pexels.com/photos/2096608/pexels-photo-2096608.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/2096608/pexels-photo-2096608.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.4,
      viewType: 'River & Sunrise View',
      areaSqFt: 620,
      material: 'Stone Pillars & Clay Mortar',
      inRoomTherapy: false,
      bestFor: 'Breeze Seekers & Natural Lighting Enthusiasts',
      highlights: [
        'Positioned to capture cooling gentle river breeze',
        'Abundant morning natural lighting',
        'Traditional decor with cozy reading nook',
        'Deluxe & Super Deluxe two-tier configurations'
      ],
      hotspots: [
        { top: '30%', left: '60%', title: 'River Breeze Draft', desc: 'Cross-breeze layout bringing fresh river winds into the room.' },
        { top: '60%', left: '25%', title: 'Reading Nook', desc: 'Quiet window seat overlooking nature.' }
      ]
    },
    {
      id: 'samprapti',
      num: '04',
      roman: 'IV',
      name: 'Samprapti Block',
      titleName: 'Samprapti',
      category: 'Wellness Restoration Cottages',
      catGroup: 'River & Breeze',
      zone: 'Riverfront Bend',
      tagline: 'Restoration & Quiet Serenity',
      desc: "Samprapti, meaning 'Achievement', is designed to support your wellness goals. These cottages provide a serene environment for rest after your daily treatments and yoga sessions.",
      features: ['Quiet Zone', 'Ergonomic Design', 'Nature Integration', 'Calming Atmosphere'],
      config: 'Deluxe Cottage (U1 & U2) | Super Deluxe Cottage (L1 & L2)',
      img: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.6,
      viewType: 'Forest Nature View',
      areaSqFt: 640,
      material: 'Stabilized Earth Blocks & Natural Wood',
      inRoomTherapy: false,
      bestFor: 'Post-Therapy Rest & Recovery Guests',
      highlights: [
        'Located in a dedicated quiet zone for deep sleep',
        'Ergonomic furniture design for post-treatment rest',
        'Seamless integration with surrounding greenery',
        'Calming neutral color palette for nervous system relaxation'
      ],
      hotspots: [
        { top: '50%', left: '50%', title: 'Ergonomic Rest Bed', desc: 'Designed for optimal spinal alignment post-treatment.' }
      ]
    },
    {
      id: 'sphatika',
      num: '05',
      roman: 'V',
      name: 'Sphatika Block',
      titleName: 'Sphatika',
      category: 'Prismatic Nature Suites',
      catGroup: 'Prismatic & Canopy',
      zone: 'Canopy Ridge',
      tagline: 'Crystal Clarity & Bright Open Space',
      desc: 'Inspired by the clarity of crystal, Sphatika cottages are bright, airy, and designed to clear the mind. Enjoy the pristine surroundings and the sound of nature right at your doorstep.',
      features: ['Crystal Clear Views', 'Airy Interiors', 'Modern Bath Amenities', 'Veranda'],
      config: 'Deluxe Cottage (U1 & U2) | Super Deluxe Cottage (L1 & L2)',
      img: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.3,
      viewType: 'Pristine Nature Views',
      areaSqFt: 660,
      material: 'High-Ceiling Glass & Polished Oxide',
      inRoomTherapy: false,
      bestFor: 'Sunlight Seekers & Creative Minds',
      highlights: [
        'Crystal clear views of surrounding green canopy',
        'Bright, airy interior architecture promoting mental clarity',
        'Modern, spacious bathroom amenities',
        'Private veranda facing pristine forest trees'
      ],
      hotspots: [
        { top: '22%', left: '48%', title: 'Airy Interior Design', desc: 'High ceilings and large windows maximize mental clarity.' }
      ]
    },
    {
      id: 'sukruthi',
      num: '06',
      roman: 'VI',
      name: 'Sukruthi Block',
      titleName: 'Sukruthi',
      category: 'Traditional Courtyard Living',
      catGroup: 'Heritage & Gardens',
      zone: 'North Garden Quad',
      tagline: 'Shared Courtyard & Water Fountain Harmony',
      desc: 'The Courtyard Block fosters a sense of community while maintaining individual privacy. These units open onto a shared green space, perfect for morning contemplation or evening reflection.',
      features: ['Shared Courtyard', 'Community Feel', 'Central Water Feature', 'Traditional Columns'],
      config: 'Courtyard Units (1, 2, 3, 4)',
      img: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 3.8,
      viewType: 'Central Courtyard & Fountain',
      areaSqFt: 550,
      material: 'Carved Stone Columns & Terracotta Tiles',
      inRoomTherapy: false,
      bestFor: 'Group Retreats, Families & Communal Seekers',
      highlights: [
        'Opens onto a shared central courtyard green space',
        'Traditional stone columns and heritage courtyard charm',
        'Central water feature providing soothing ambient sounds',
        'Ideal for morning meditation or evening reflection'
      ],
      hotspots: [
        { top: '55%', left: '50%', title: 'Central Water Feature', desc: 'Soothing water trickles creating natural relaxation sound.' }
      ]
    },
    {
      id: 'samhita',
      num: '07',
      roman: 'VII',
      name: 'Samhita Block',
      titleName: 'Samhita',
      category: 'Grounded Earth Cottages',
      catGroup: 'Heritage & Gardens',
      zone: 'North Garden Quad',
      tagline: 'North Block Ground Access & Earth Connection',
      desc: 'Located in the peaceful North Block, Samhita offers Super Deluxe Cottages on the ground floor, ensuring easy accessibility and a grounded connection to the earth element.',
      features: ['Ground Floor Access', 'Earth Tones', 'Spacious Layout', 'Garden Access'],
      config: 'Super Deluxe Cottage (3 Units)',
      img: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.5,
      viewType: 'North Lawn & Herb Garden',
      areaSqFt: 700,
      material: 'Earth Mortar & Smooth Walkways',
      inRoomTherapy: false,
      bestFor: 'Senior Guests & Grounding Travelers',
      highlights: [
        'Ground floor location in quiet North Block',
        'Easy step-free accessibility for all guests',
        'Warm earth tones and spacious interior layout',
        'Direct garden access right from your room'
      ],
      hotspots: [
        { top: '70%', left: '40%', title: 'Ground Floor Access', desc: 'Barrier-free entry connecting directly to organic garden paths.' }
      ]
    },
    {
      id: 'subhiksha',
      num: '08',
      roman: 'VIII',
      name: 'Subhiksha Block',
      titleName: 'Subhiksha',
      category: 'Private Treatment Residence',
      catGroup: 'Secluded Sanctuaries',
      zone: 'Forest Seclusion',
      tagline: 'In-House Hydro Treatment Suite & Abundance',
      desc: 'Subhiksha represents abundance. This exclusive Premium Private Cottage features in-house treatment facilities, allowing for the ultimate private wellness experience without stepping out.',
      features: ['In-room Treatment Area', 'Ultimate Privacy', 'Butler Service Option', 'Premium Furnishings'],
      config: 'Premium Private Cottage (1 Unit) with in-house treatment facilities',
      img: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 5.0,
      viewType: 'Private Secluded Forest',
      areaSqFt: 950,
      material: 'Local Stone, Copper Fixtures & Teak',
      inRoomTherapy: true,
      bestFor: 'VIP Guests, Private Doctors & High-Privacy Retreats',
      highlights: [
        'Exclusive in-house treatment room setup for private therapies',
        'Ultimate privacy without needing to leave your cottage',
        'Option for personalized butler service',
        'Premium luxury furnishings and spacious layout'
      ],
      hotspots: [
        { top: '40%', left: '65%', title: 'In-Room Treatment Suite', desc: 'Equipped for private massages and hydrotherapy treatments in room.' }
      ]
    },
    {
      id: 'suyoga',
      num: '09',
      roman: 'IX',
      name: 'Suyoga Block',
      titleName: 'Suyoga',
      category: 'Elevated Canopy Suites',
      catGroup: 'Prismatic & Canopy',
      zone: 'Canopy Ridge',
      tagline: 'Tree Canopy Balcony & River Perspective',
      desc: "Suyoga, meaning 'Right Union', offers Executive Cottages on the upper floors. These elevated rooms provide sweeping views of the tree canopy and the distant river, elevating your perspective.",
      features: ['Elevated Views', 'Canopy Walk', 'Executive Work Desk', 'Private Balcony'],
      config: 'Executive Cottages (4 Units First Floor | 2 Units Second Floor)',
      img: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      privacyScore: 4.7,
      viewType: 'Sweeping Tree Canopy & Distant River',
      areaSqFt: 680,
      material: 'Timber Decking & Large Windows',
      inRoomTherapy: false,
      bestFor: 'Long-stay Writers, Executives & Sunset Admirers',
      highlights: [
        'Elevated upper floor position with sweeping canopy views',
        'Private balcony overlooking distant river scenery',
        'Executive work desk facing natural tree tops',
        'Executive Cottages (First Floor & Second Floor)'
      ],
      hotspots: [
        { top: '35%', left: '75%', title: 'Canopy Balcony', desc: 'Elevated deck overlooking the tree canopy and distant river.' }
      ]
    }
  ];

  // Scraped Amenities
  const amenitiesList = [
    { name: 'Digital Balance', desc: 'High-speed WiFi in rooms, digital-free zones elsewhere.', icon: '📶', tag: 'Mental Detox' },
    { name: 'Climate Control', desc: 'Eco-friendly air conditioning and natural cross-ventilation.', icon: '🍃', tag: 'Fresh Air' },
    { name: 'Herbal Station', desc: 'In-room herbal teas and infusions for daily detox.', icon: '🍵', tag: 'Organic Infusions' },
    { name: 'Pure Water', desc: 'Mineral-rich, filtered drinking water provided daily.', icon: '💧', tag: 'Mineral Hydration' },
    { name: 'Eco Toiletries', desc: 'Handcrafted, chemical-free soaps and shampoos.', icon: '🧼', tag: 'Chemical-Free' },
    { name: 'Daily Housekeeping', desc: 'Mindful cleaning service with eco-safe products.', icon: '🧹', tag: 'Mindful Care' }
  ];

  // Configurator Addons & Diets
  const configuratorAddons = [
    { id: 'steam', name: 'Private Hydro Steam Chamber', desc: 'In-suite natural herb steam box for daily pore detox.' },
    { id: 'sound', name: 'Tibetan Singing Bowl Setup', desc: 'Hand-hammered brass bowls for evening resonance meditation.' },
    { id: 'bath', name: 'Aromatic Herbal Bath Soak', desc: 'Fresh floral and neem decoctions prepared in room soak tub.' }
  ];

  const configuratorDiets = [
    { id: 'satwik', name: 'Satwik Organic Farm Diet', desc: 'Freshly harvested low-sodium vegetarian cuisine.' },
    { id: 'panchakarma', name: 'Panchakarma Warm Kitchari', desc: 'Therapeutic spiced mung & rice cleansing protocol.' },
    { id: 'juicing', name: 'Raw Organic Juice Fast', desc: 'Cold-pressed green juices & botanical elixirs.' }
  ];

  // Main Page State
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedZone, setSelectedZone] = useState('All');
  
  // Modals & Drawers
  const [activeModal, setActiveModal] = useState(null);
  const [activeBookingModal, setActiveBookingModal] = useState(null); // Direct Booking Trigger
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [comparedBlocks, setComparedBlocks] = useState([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Configurator Studio State
  const [configBlock, setConfigBlock] = useState('samprada');
  const [configAddon, setConfigAddon] = useState('steam');
  const [configDiet, setConfigDiet] = useState('satwik');

  // Booking Form State inside Booking Modal
  const [bookingDate, setBookingDate] = useState('2026-08-01');
  const [bookingGuests, setBookingGuests] = useState('2 Guests');

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3");
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Lock body scroll cleanly without shifting or jumping background scroll position
  useEffect(() => {
    const isAnyModalOpen = Boolean(activeModal || activeBookingModal || selectedHotspot || showCompareDrawer);
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal, activeBookingModal, selectedHotspot, showCompareDrawer]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const currentBlock = cottageList[selectedBlockIndex];

  // Reset active gallery index when room block changes
  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [selectedBlockIndex]);

  // Campus Zones
  const campusZones = [
    { id: 'All', name: 'All Estate Zones' },
    { id: 'North Garden Quad', name: '🌿 North Garden Quad' },
    { id: 'Riverfront Bend', name: '🌊 Riverfront Bend' },
    { id: 'Forest Seclusion', name: '🌲 Deep Forest Seclusion' },
    { id: 'Canopy Ridge', name: '🌄 Canopy Ridge' }
  ];

  const [cardPhotoMap, setCardPhotoMap] = useState({});

  const handlePrevCardPhoto = (e, cottage) => {
    e.stopPropagation();
    const current = cardPhotoMap[cottage.id] || 0;
    const total = cottage.gallery?.length || 1;
    setCardPhotoMap({ ...cardPhotoMap, [cottage.id]: (current - 1 + total) % total });
  };

  const handleNextCardPhoto = (e, cottage) => {
    e.stopPropagation();
    const current = cardPhotoMap[cottage.id] || 0;
    const total = cottage.gallery?.length || 1;
    setCardPhotoMap({ ...cardPhotoMap, [cottage.id]: (current + 1) % total });
  };

  const filteredBlocks = selectedZone === 'All' 
    ? cottageList 
    : cottageList.filter(b => b.zone === selectedZone);

  // Toggle Compare
  const toggleCompare = (cottage) => {
    if (comparedBlocks.some(b => b.id === cottage.id)) {
      setComparedBlocks(comparedBlocks.filter(b => b.id !== cottage.id));
    } else {
      if (comparedBlocks.length >= 3) {
        alert("You can compare up to 3 blocks simultaneously.");
        return;
      }
      setComparedBlocks([...comparedBlocks, cottage]);
    }
  };

  return (
    <div style={{ backgroundColor: '#12070c', color: '#ffffff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Sacred Lights & Particles */}
      <TwinklingLights count={20} />
      <GoldEmberParticles count={25} />

      {/* ========================================================================= */}
      {/* --- SECTION 1: LIGHT-THEMED SERENE HERO WITH ANIMATED SVG LINE DRAWING --- */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        height: '100vh',
        maxHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 6%',
        backgroundColor: '#f5ebd9', // Light cotton paper / antique white background
        color: 'var(--wine)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Subtle Organic Background Clay Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(94, 39, 53, 0.04) 1.5px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          pointerEvents: 'none'
        }} />
        {/* Mandala decorative SVG */}
        <DecorativeSVG src="/assets/logo-mandala.svg" style={{ position: 'absolute', top: '10%', right: '5%', width: '200px', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }} />

        {/* Clean Center Content Box */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Official Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '90px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span style={{
              color: 'var(--harvest-gold)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '1rem'
            }}>
              ✦ Sanctuary Living ✦
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.2rem, 5.8vw, 5.2rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              color: 'var(--wine)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'
            }}>
              A Sanctuary for Mindful Living
            </h1>

            {/* Thoughtful Words & Reflections */}
            <p style={{
              fontSize: '1.15rem',
              opacity: 0.9,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: '740px',
              margin: '0 auto 1rem auto',
              color: 'var(--raisin-black)'
            }}>
              "Every cottage at Supradha is an intentional haven—crafted with natural eco-lime, warm timber, and ancient Vastu alignment to echo the peaceful rhythm of the Suvarnamukhi river."
            </p>

            <p style={{
              fontSize: '0.96rem',
              color: 'var(--redwood)',
              fontStyle: 'italic',
              marginBottom: '2.8rem',
              fontWeight: 500
            }}>
              Rest, reflect, and reconnect in spaces created for true inner stillness.
            </p>

            {/* Explore The Stay Button */}
            <a
              href="#guhantara-rooms-showcase"
              className="btn-luxury"
              style={{
                padding: '1.1rem 3rem',
                fontSize: '0.88rem',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'var(--wine)',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(94, 39, 53, 0.25)'
              }}
            >
              <span>Explore The Stay</span>
              <span style={{ fontSize: '1.1rem' }}>↓</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* --- OVERVIEW PHILOSOPHY SECTION --- */}
      <section style={{ padding: '6rem 8%', backgroundColor: 'var(--brand-bg)', color: 'var(--wine)', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1.2rem', backgroundColor: 'rgba(94, 39, 53, 0.08)', borderRadius: '50px', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, color: 'var(--wine)' }}>
              Sanctuary
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 600, color: 'var(--wine)', marginBottom: '1.2rem' }}>
            Your Personal <span style={{ color: 'var(--harvest-gold)' }}>Sanctuary</span>
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.85, maxWidth: '800px', margin: '0 auto', fontWeight: 300 }}>
            Our accommodations are designed to be an extension of your therapy. Built with natural materials and positioned to maximize natural light and ventilation, each room offers a serene environment for deep relaxation and healing.
          </p>
        </div>
        {/* Logo decorative SVG */}
        <DecorativeSVG src="/assets/suprada-logo.svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', opacity: 0.1, pointerEvents: 'none', zIndex: -1 }} />
      </section>

      {/* ========================================================================= */}
      {/* --- GUHANTARA-INSPIRED ASYMMETRIC STAGGERED ROOM SHOWCASE --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '3.5rem 5%', backgroundColor: '#f4f1e9', color: 'var(--raisin-black)' }}>
        <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ Sanctuary Portfolio ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem, 4.8vw, 4.2rem)', color: 'var(--wine)', fontWeight: 600 }}>
              Distinctive Living Spaces
            </h2>
            <p style={{ opacity: 0.8, maxWidth: '650px', margin: '0.5rem auto 0 auto', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 300 }}>
              Filter by estate campus location and explore our 9 handcrafted sanctuaries designed with organic eco-lime, warm timber, and private sit-out verandas.
            </p>
          </div>

          {/* Campus Filter Pills */}
          <div style={{ position: 'relative', display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {/* Filter pills watermark */}
            <DecorativeSVG src="/assets/logo-mandala.svg" style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '250px', opacity: 0.08, pointerEvents: 'none', zIndex: -1 }} />
            {campusZones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`btn-luxury-pill ${selectedZone === z.id ? 'active' : ''}`}
              >
                {selectedZone === z.id && <span>✦</span>} {z.name}
              </button>
            ))}
          </div>

          {/* Alternating Staggered Guhantara Room Stack */}
          <div className="room-stack-container" style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            <AnimatePresence>
              {filteredBlocks.map((cottage, idx) => {
                const isEven = idx % 2 === 0;
                const isCompared = comparedBlocks.some(cb => cb.id === cottage.id);

                return (
                  <motion.div
                    layout
                    key={cottage.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      flexDirection: isEven ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      position: 'relative',
                      width: '100%',
                      minHeight: '490px'
                    }}
                    className="room-row-responsive"
                  >
                    {/* Large Visual Canvas (58% width) */}
                    <div 
                      className="room-visual-canvas"
                      style={{
                        flex: '0 0 58%',
                        height: '490px',
                        position: 'relative',
                        borderRadius: '36px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 55px rgba(0, 0, 0, 0.12)',
                        zIndex: 1
                      }}
                    >
                      {(() => {
                        const activePhotoIdx = cardPhotoMap[cottage.id] || 0;
                        const photoList = cottage.gallery && cottage.gallery.length > 0 ? cottage.gallery : [cottage.img];
                        const currentPhotoSrc = photoList[activePhotoIdx] || cottage.img;

                        return (
                          <>
                            <AnimatePresence mode="wait">
                              <motion.img 
                                key={cottage.id + '_' + activePhotoIdx}
                                initial={{ opacity: 0.3, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0.3 }}
                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                src={currentPhotoSrc} 
                                alt={cottage.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </AnimatePresence>

                            {/* Left Prev Arrow Button */}
                            <button
                              onClick={(e) => handlePrevCardPhoto(e, cottage)}
                              className="room-arrow-btn-left"
                              style={{
                                position: 'absolute',
                                left: isEven ? '1.2rem' : '3.8rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 6,
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                color: '#ffffff',
                                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                                backdropFilter: 'blur(16px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1.4rem',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              ‹
                            </button>

                            {/* Right Next Arrow Button */}
                            <button
                              onClick={(e) => handleNextCardPhoto(e, cottage)}
                              className="room-arrow-btn-right"
                              style={{
                                position: 'absolute',
                                right: isEven ? '3.8rem' : '1.2rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 6,
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                color: '#ffffff',
                                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                                backdropFilter: 'blur(16px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1.4rem',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              ›
                            </button>

                            {/* Dynamic Photo Count Badge — always opposite side from category badge */}
                            <div className="room-photo-badge" style={{
                              position: 'absolute',
                              top: '1.4rem',
                              left: isEven ? 'auto' : '3.8rem',
                              right: isEven ? '3.8rem' : 'auto',
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              backdropFilter: 'blur(12px)',
                              color: 'var(--harvest-gold)',
                              padding: '0.4rem 0.9rem',
                              borderRadius: '50px',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              zIndex: 6,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}>
                              📷 Photo {activePhotoIdx + 1} of {photoList.length}
                            </div>

                            {/* Interactive Dot Pagination Bar */}
                            <div style={{
                              position: 'absolute',
                              bottom: '1.4rem',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              zIndex: 6,
                              display: 'flex',
                              gap: '0.6rem',
                              padding: '0.45rem 1rem',
                              borderRadius: '50px',
                              backgroundColor: 'rgba(0,0,0,0.65)',
                              backdropFilter: 'blur(16px)',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                            }}>
                              {photoList.map((_, pIdx) => (
                                <span
                                  key={pIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardPhotoMap({ ...cardPhotoMap, [cottage.id]: pIdx });
                                  }}
                                  style={{
                                    width: activePhotoIdx === pIdx ? '22px' : '8px',
                                    height: '8px',
                                    borderRadius: '10px',
                                    backgroundColor: activePhotoIdx === pIdx ? 'var(--harvest-gold)' : 'rgba(255,255,255,0.45)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        );
                      })()}

                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)',
                        pointerEvents: 'none'
                      }} />

                      {/* Category Badge — safe side away from glass card */}
                      <div className="room-category-badge" style={{
                        position: 'absolute',
                        top: '1.4rem',
                        left: isEven ? '1.4rem' : 'auto',
                        right: isEven ? 'auto' : '1.4rem',
                        zIndex: 5
                      }}>
                        <span style={{ 
                          backgroundColor: 'rgba(94, 39, 53, 0.92)', 
                          color: '#ffffff', 
                          padding: '0.45rem 1.1rem', 
                          borderRadius: '50px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backdropFilter: 'blur(10px)'
                        }}>
                          {cottage.category}
                        </span>
                      </div>

                      {/* Hotspots */}
                      {cottage.hotspots.map((hs, hsi) => (
                        <div
                          key={hsi}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHotspot(hs);
                          }}
                          style={{
                            position: 'absolute',
                            top: hs.top,
                            left: hs.left,
                            zIndex: 5,
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--harvest-gold)',
                            border: '2px solid #ffffff',
                            display: 'block',
                            boxShadow: '0 0 18px var(--harvest-gold)'
                          }} className="rotate-slow" />
                        </div>
                      ))}

                      <div className="room-tagline-text" style={{
                        position: 'absolute',
                        bottom: '3.5rem',
                        left: isEven ? '2rem' : 'auto',
                        right: isEven ? 'auto' : '2rem',
                        zIndex: 5,
                        pointerEvents: 'none',
                        maxWidth: '55%',
                        textAlign: isEven ? 'left' : 'right'
                      }}>
                        <span style={{ color: 'var(--tan)', fontSize: '0.92rem', fontStyle: 'italic' }}>
                          "{cottage.tagline}"
                        </span>
                      </div>
                    </div>

                    {/* Floating Glass Content Card (46% width) */}
                    <div 
                      className="room-content-card"
                      style={{
                        flex: '0 0 46%',
                        background: 'rgba(255, 252, 248, 0.22)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        padding: '1.8rem 2.2rem',
                        borderRadius: '28px',
                        boxShadow: '0 25px 60px rgba(94, 39, 53, 0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
                        position: 'relative',
                        zIndex: 2,
                        marginLeft: isEven ? '-4%' : '0',
                        marginRight: isEven ? '0' : '-4%'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>
                        {cottage.roman} • {cottage.zone}
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--wine)', fontWeight: 600, marginTop: '0.1rem', marginBottom: '0.5rem' }}>
                        {cottage.name}
                      </h3>

                      <p style={{ fontSize: '0.88rem', opacity: 0.85, lineHeight: 1.6, color: 'var(--raisin-black)', marginBottom: '1rem', fontWeight: 300 }}>
                        {cottage.desc}
                      </p>

                      {/* Room Specification Grid */}
                      <div className="hero-grid-split room-spec-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.6rem',
                        padding: '0.8rem 1rem',
                        background: 'rgba(245, 235, 217, 0.3)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '16px',
                        fontSize: '0.8rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <span style={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>🌿 Primary View</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.viewType}</strong>
                        </div>
                        <div>
                          <span style={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>📐 Room Area</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.areaSqFt} Sq.Ft</strong>
                        </div>
                        <div>
                          <span style={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>★ Privacy Rating</span>
                          <strong style={{ color: '#b5801c' }}>{'★'.repeat(Math.floor(cottage.privacyScore))} ({cottage.privacyScore}/5)</strong>
                        </div>
                        <div>
                          <span style={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>🏛️ Materials</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.material.split('&')[0]}</strong>
                        </div>
                      </div>

                      {/* Amenities Micro Badges */}
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                        {cottage.features.slice(0, 3).map((f, fidx) => (
                          <span 
                            key={fidx}
                            style={{ 
                              fontSize: '0.7rem', 
                              backgroundColor: 'rgba(94, 39, 53, 0.07)', 
                              color: 'var(--wine)', 
                              padding: '0.3rem 0.75rem', 
                              borderRadius: '50px',
                              fontWeight: 600
                            }}
                          >
                            ✦ {f}
                          </span>
                        ))}
                      </div>

                      {/* Action Triggers */}
                      <div className="action-triggers-responsive" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setActiveBookingModal(cottage)}
                          className="btn-primary room-btn-primary"
                        >
                          Book Room Now
                        </button>

                        <button
                          onClick={() => setActiveModal(cottage)}
                          className="btn-secondary room-btn-secondary"
                        >
                          Full Specs
                        </button>

                        <button
                          onClick={() => toggleCompare(cottage)}
                          className="btn-luxury-text room-btn-tertiary"
                          style={{
                            color: isCompared ? 'var(--harvest-gold)' : 'var(--wine)'
                          }}
                        >
                          {isCompared ? '✓ Compared' : '+ Compare'}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* --- THOUGHTFUL AMENITIES SECTION (Sage Green & Ivory Palette Redesign) --- */}
      <section style={{ padding: '7.5rem 6% 5.5rem 6%', background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)', color: 'var(--wine)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative gradient orbs */}
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', maxWidth: '400px', width: '100%', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', maxWidth: '350px', width: '100%', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Section Header — left-aligned with ample indent to clear fixed top-left logo pill */}
          <div className="amenities-header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem', paddingLeft: 'clamp(0px, 14vw, 220px)', paddingTop: '0.5rem' }}>
            <div>
              <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.7rem', fontWeight: 800, display: 'block', marginBottom: '0.4rem', opacity: 0.85 }}>
                ✦ Curated Comforts
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', color: 'var(--wine)', fontWeight: 600, lineHeight: 1.15, margin: 0 }}>
                Thoughtful<br />Amenities
              </h2>
            </div>
            <p style={{ color: 'var(--wine)', opacity: 0.85, maxWidth: '360px', fontSize: '0.88rem', lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              Every detail is intentional — from the water you drink to the air you breathe. Wellness woven into every comfort.
            </p>
          </div>

          {/* MOBILE 2-COLUMN GRID (Shown only on Mobile Devices < 769px) */}
          <div className="amenities-mobile-grid">
            {amenitiesList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  border: '1px solid rgba(94, 39, 53, 0.18)',
                  borderRadius: '16px',
                  padding: '1rem 0.9rem',
                  boxShadow: '0 8px 25px rgba(94, 39, 53, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.6rem',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '0.56rem',
                    textTransform: 'uppercase',
                    color: '#b5801c',
                    backgroundColor: 'rgba(181, 128, 28, 0.12)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '50px',
                    fontWeight: 800,
                    letterSpacing: '0.05em'
                  }}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', color: 'var(--wine)', fontWeight: 600, margin: '0 0 0.25rem 0', lineHeight: 1.25 }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--wine)', opacity: 0.85, lineHeight: 1.45, margin: 0, fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP BENTO GRID LAYOUT (Shown on Desktop >= 769px) */}
          <div className="bento-grid-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '1.2rem'
          }}>

            {/* HERO CARD — spans 7 columns, row 1 */}
            <motion.div
              whileHover={{ scale: 1.01, boxShadow: '0 25px 55px rgba(90, 100, 60, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.65)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                gridColumn: '1 / 8',
                gridRow: '1 / 2',
                background: 'rgba(255, 255, 255, 0.42)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                borderRadius: '24px',
                padding: '2.2rem 2.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.75)',
                boxShadow: '0 20px 45px rgba(90, 100, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.35)'
              }}
            >
              {/* Corner ornament */}
              <DecorativeSVG src="/assets/logo-mandala.svg" style={{ position: 'absolute', top: 0, left: 0, width: '80px', opacity: 0.07, pointerEvents: 'none', zIndex: -1 }} />
              
              {/* Decorative pattern */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '0', right: '0', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.3)', pointerEvents: 'none' }} />
              
              <div>
                <div className="amenities-card-toprow" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 15px rgba(255, 255, 255, 0.4)' }}>
                    {amenitiesList[0].icon}
                  </div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--wine)', backgroundColor: 'rgba(255, 255, 255, 0.65)', padding: '0.35rem 1rem', borderRadius: '50px', fontWeight: 800, letterSpacing: '0.12em', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
                    {amenitiesList[0].tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', color: 'var(--wine)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {amenitiesList[0].name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--wine)', opacity: 0.85, lineHeight: 1.6, maxWidth: '380px' }}>
                  {amenitiesList[0].desc}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem' }}>
                <div style={{ width: '36px', height: '2px', backgroundColor: 'var(--wine)', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--wine)', fontWeight: 700, letterSpacing: '0.08em' }}>Featured Amenity</span>
              </div>
            </motion.div>

            {/* ACCENT CARD — spans 5 columns, row 1 */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 25px 55px rgba(90, 100, 60, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 0.65)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                gridColumn: '8 / 13',
                gridRow: '1 / 2',
                background: 'rgba(255, 255, 255, 0.42)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                borderRadius: '24px',
                padding: '1.8rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.4rem',
                border: '1px solid rgba(255, 255, 255, 0.75)',
                boxShadow: '0 20px 45px rgba(90, 100, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.35)',
                minHeight: '220px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Corner ornament */}
              <DecorativeSVG src="/assets/logo-mandala.svg" style={{ position: 'absolute', top: 0, left: 0, width: '80px', opacity: 0.07, pointerEvents: 'none', zIndex: -1 }} />
              {[amenitiesList[1], amenitiesList[2]].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(255, 255, 255, 0.65)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    border: '1px solid rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.4)'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: '#b5801c', fontWeight: 800, letterSpacing: '0.1em' }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--wine)', opacity: 0.82, lineHeight: 1.55, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              {/* Divider between the two items */}
              <div style={{ position: 'absolute', left: '2.5rem', right: '2.5rem', top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)', pointerEvents: 'none' }} />
            </motion.div>

            {/* BOTTOM ROW — 3 equal cards spanning 4 columns each */}
            {amenitiesList.slice(3).map((item, idx) => (
              <motion.div
                key={idx + 3}
                whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 1)', boxShadow: '0 25px 50px rgba(90, 100, 60, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.6)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  gridColumn: `${(idx * 4) + 1} / ${(idx * 4) + 5}`,
                  gridRow: '2 / 3',
                  background: 'rgba(255, 255, 255, 0.42)',
                  backdropFilter: 'blur(22px)',
                  WebkitBackdropFilter: 'blur(22px)',
                  borderRadius: '20px',
                  padding: '1.6rem 1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.75)',
                  boxShadow: '0 15px 35px rgba(90, 100, 60, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default'
                }}
              >
                {/* Corner ornament */}
                <DecorativeSVG src="/assets/logo-mandala.svg" style={{ position: 'absolute', top: 0, left: 0, width: '80px', opacity: 0.07, pointerEvents: 'none', zIndex: -1 }} />
                
                {/* Subtle corner accent */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle at top right, ${idx === 0 ? 'rgba(100,160,220,0.18)' : idx === 1 ? 'rgba(220,120,80,0.18)' : 'rgba(160,200,100,0.18)'} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                
                <div className="amenities-card-toprow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.65)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                    border: '1px solid rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.4)'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', color: '#b5801c', backgroundColor: 'rgba(255, 255, 255, 0.65)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 800, letterSpacing: '0.1em', border: '1px solid rgba(255, 255, 255, 0.85)' }}>
                    {item.tag}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--wine)', fontWeight: 600, margin: 0 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--wine)', opacity: 0.82, lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* --- EARTH ARCHITECTURE BANNER --- */}
      <section style={{ backgroundColor: 'var(--wine)', padding: '6.5rem 8%', color: 'var(--isabelline)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background logo SVG */}
        <DecorativeSVG src="/assets/suprada-logo.svg" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '350px', opacity: 0.09, pointerEvents: 'none', zIndex: -1 }} />
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--harvest-gold)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 800, display: 'block', marginBottom: '1rem' }}>
            Built with Earth in Mind
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--tan)', fontWeight: 500, lineHeight: 1.25 }}>
            "Our structures are built using locally sourced stone, lime plaster, and reclaimed wood. We honor the land so that the land may heal you."
          </h2>
        </div>
      </section>

      {/* --- DIRECT ROOM BOOKING MODAL --- */}
      <AnimatePresence>
        {activeBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBookingModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 1600,
              display: 'grid',
              placeItems: 'center',
              padding: '2rem 1rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--raisin-black)',
                borderRadius: '24px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <button
                onClick={() => setActiveBookingModal(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>

              <span style={{ color: 'var(--redwood)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
                Direct Reservation
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--wine)', marginTop: '0.2rem', marginBottom: '1rem' }}>
                Reserve {activeBookingModal.name}
              </h2>

              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px', marginBottom: '1.5rem', backgroundColor: 'var(--isabelline)' }}>
                <img src={activeBookingModal.img} alt={activeBookingModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Booking Form Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.4rem' }}>
                    Preferred Check-in Date:
                  </label>
                  <input 
                    type="date" 
                    value={bookingDate} 
                    onChange={(e) => setBookingDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(94, 39, 53, 0.2)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.5rem' }}>
                    Number of Guests:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>
                    {[
                      { value: '1 Guest', label: '1 Guest', sub: 'Single Stay' },
                      { value: '2 Guests', label: '2 Guests', sub: 'Double Retreat' },
                      { value: '3 Guests', label: '3 Guests', sub: 'Family Suite' }
                    ].map((gOpt) => {
                      const isSelected = bookingGuests === gOpt.value;
                      return (
                        <button
                          key={gOpt.value}
                          type="button"
                          onClick={() => setBookingGuests(gOpt.value)}
                          style={{
                            padding: '0.75rem 0.3rem',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid var(--wine)' : '1px solid rgba(94, 39, 53, 0.2)',
                            backgroundColor: isSelected ? 'var(--wine)' : 'rgba(245, 235, 217, 0.35)',
                            color: isSelected ? '#ffffff' : 'var(--wine)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.25s ease',
                            boxShadow: isSelected ? '0 4px 14px rgba(94, 39, 53, 0.25)' : 'none',
                            boxSizing: 'border-box'
                          }}
                        >
                          <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{gOpt.label}</div>
                          <div style={{ fontSize: '0.65rem', opacity: isSelected ? 0.9 : 0.75, marginTop: '0.15rem' }}>{gOpt.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Thank you! Your booking request for ${activeBookingModal.name} on ${bookingDate} (${bookingGuests}) has been initiated. Redirecting to concierge...`);
                  setActiveBookingModal(null);
                  onNavigate('contact');
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '1.1rem', fontSize: '0.88rem', letterSpacing: '0.12em', textAlign: 'center' }}
              >
                ✦ Confirm &amp; Proceed to Contact Concierge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HOTSPOT MODAL --- */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHotspot(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(10px)',
              zIndex: 1300,
              display: 'grid',
              placeItems: 'center',
              padding: '2rem 1rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--raisin-black)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '420px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setSelectedHotspot(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' }}>📍</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--wine)', marginBottom: '0.5rem' }}>
                {selectedHotspot.title}
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                {selectedHotspot.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ARCHITECTURAL SPECS & FULL MULTI-IMAGE GALLERY MODAL --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 1400,
              display: 'grid',
              placeItems: 'center',
              padding: '2rem 1rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--raisin-black)',
                borderRadius: '20px',
                maxWidth: '720px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setActiveModal(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>

              {/* Multi-Image Gallery Strip in Modal */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {activeModal.gallery.map((gImg, gIdx) => (
                  <div key={gIdx} style={{ borderRadius: '10px', overflow: 'hidden', height: '140px' }}>
                    <img src={gImg} alt={`${activeModal.name} - View ${gIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <span style={{ color: 'var(--redwood)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>
                {activeModal.category}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--wine)', marginTop: '0.2rem' }}>
                {activeModal.name}
              </h2>
              <p style={{ fontSize: '0.94rem', opacity: 0.8, lineHeight: 1.7, marginTop: '0.8rem' }}>
                {activeModal.desc}
              </p>

              <div style={{ backgroundColor: 'var(--isabelline)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--wine)', marginBottom: '0.8rem' }}>
                  Architectural Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
                  {activeModal.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem' }}>
                      <span style={{ color: 'var(--harvest-gold)', fontWeight: 700 }}>✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  onClick={() => {
                    const sel = activeModal;
                    setActiveModal(null);
                    setActiveBookingModal(sel);
                  }}
                  className="btn-luxury"
                  style={{ flexGrow: 1, padding: '1rem', fontSize: '0.85rem' }}
                >
                  Book {activeModal.name} Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COMPARISON FLOATING DRAWER BAR --- */}
      <AnimatePresence>
        {comparedBlocks.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '1.8rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--raisin-black)',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '50px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              border: '1.5px solid var(--harvest-gold)'
            }}
          >
            <span style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--harvest-gold)' }}>{comparedBlocks.length}</strong> Blocks Selected
            </span>

            <button
              onClick={() => setShowCompareDrawer(true)}
              style={{
                backgroundColor: 'var(--harvest-gold)',
                color: 'var(--wine)',
                border: 'none',
                padding: '0.55rem 1.3rem',
                borderRadius: '50px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              View Comparison Matrix
            </button>

            <button
              onClick={() => setComparedBlocks([])}
              style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.6, cursor: 'pointer' }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SIDE BY SIDE COMPARISON MATRIX MODAL --- */}
      <AnimatePresence>
        {showCompareDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCompareDrawer(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 1500,
              display: 'grid',
              placeItems: 'center',
              padding: '2rem 1rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--raisin-black)',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '960px',
                maxHeight: '85vh',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setShowCompareDrawer(false)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--wine)', marginBottom: '0.4rem' }}>
                Sanctuary Comparison Matrix
              </h2>
              <p style={{ fontSize: '0.88rem', opacity: 0.7, marginBottom: '2rem' }}>
                Compare specs, materials, views, and privacy across your chosen blocks.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--wine)' }}>
                      <th style={{ padding: '1rem', width: '25%' }}>Attribute</th>
                      {comparedBlocks.map(b => (
                        <th key={b.id} style={{ padding: '1rem', color: 'var(--wine)', fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>
                          {b.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--redwood)' }}>Category</td>
                      {comparedBlocks.map(b => <td key={b.id} style={{ padding: '1rem' }}>{b.category}</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--redwood)' }}>Privacy Score</td>
                      {comparedBlocks.map(b => <td key={b.id} style={{ padding: '1rem', color: '#b5801c' }}>{'★'.repeat(Math.floor(b.privacyScore))} ({b.privacyScore}/5)</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--redwood)' }}>View Type</td>
                      {comparedBlocks.map(b => <td key={b.id} style={{ padding: '1rem' }}>{b.viewType}</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--redwood)' }}>Room Area</td>
                      {comparedBlocks.map(b => <td key={b.id} style={{ padding: '1rem' }}>{b.areaSqFt} sq.ft</td>)}
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--redwood)' }}>Building Materials</td>
                      {comparedBlocks.map(b => <td key={b.id} style={{ padding: '1rem' }}>{b.material}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



    </div>
  );
}
