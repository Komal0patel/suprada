import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';
import { Wifi, Wind, Coffee, Droplet, Sparkles, Leaf, Waves, Trees, Sunrise, MapPin, Check, X } from 'lucide-react';
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
      category: 'Exclusive Private Haven',
      catGroup: 'Secluded Enclaves',
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
      viewType: 'Private Garden View',
      areaSqFt: 750,
      material: 'Organic Lime Plaster & Reclaimed Wood',
      inRoomTherapy: true,
      bestFor: 'Deep Silence Seekers & Executive Wellness',
      highlights: [
        'Enhanced privacy inside a quiet secluded private enclave',
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
    { name: 'Digital Balance', desc: 'High-speed WiFi in rooms, digital-free zones elsewhere.', icon: <Wifi size={20} />, tag: 'Mental Detox' },
    { name: 'Climate Control', desc: 'Eco-friendly air conditioning and natural cross-ventilation.', icon: <Wind size={20} />, tag: 'Fresh Air' },
    { name: 'Herbal Station', desc: 'In-room herbal teas and infusions for daily detox.', icon: <Coffee size={20} />, tag: 'Organic Infusions' },
    { name: 'Pure Water', desc: 'Mineral-rich, filtered drinking water provided daily.', icon: <Droplet size={20} />, tag: 'Mineral Hydration' },
    { name: 'Eco Toiletries', desc: 'Handcrafted, chemical-free soaps and shampoos.', icon: <Sparkles size={20} />, tag: 'Chemical-Free' },
    { name: 'Daily Housekeeping', desc: 'Mindful cleaning service with eco-safe products.', icon: <Sparkles size={20} />, tag: 'Mindful Care' }
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

  // Mobile Responsiveness States
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCottageLimit, setMobileCottageLimit] = useState(3);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    { id: 'All', name: 'All Estate Zones', icon: null },
    { id: 'North Garden Quad', name: 'North Garden Quad', icon: <Leaf size={14} /> },
    { id: 'Riverfront Bend', name: 'Riverfront Bend', icon: <Waves size={14} /> },
    { id: 'Forest Seclusion', name: 'Deep Forest Seclusion', icon: <Trees size={14} /> },
    { id: 'Canopy Ridge', name: 'Canopy Ridge', icon: <Sunrise size={14} /> }
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
        {/* Ambient Wine & Gold Bokeh Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '10%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.12) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '300px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Background Rotating Mandala Watermark (Spaces Hero Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(190px, 55vw, 440px)', height: 'clamp(190px, 55vw, 440px)',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

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
              src="/assets/extracted/logo.svg" 
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
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontWeight: 800,
              display: 'block',
              marginBottom: '1rem'
            }}>
              ✦ Mindful Living ✦
            </span>

            <h1 style={{lineHeight: 1.08,
              color: 'var(--wine)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'}}>
              A Haven for Mindful Living
            </h1>

            {/* Thoughtful Words & Reflections */}
            <p style={{
              fontSize: isMobile ? '1.02rem' : '1.28rem',
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
              fontSize: isMobile ? '0.96rem' : '1.12rem',
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
                fontSize: '1.02rem',
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
            <span style={{ fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, color: 'var(--wine)' }}>
              Living Haven
            </span>
          </div>
          <h2 style={{color: 'var(--wine)', marginBottom: '1.2rem'}}>
            Your Personal <span style={{ color: 'var(--harvest-gold)' }}>Haven</span>
          </h2>
          <p style={{ fontSize: 'var(--fs-body)', lineHeight: 1.7, opacity: 0.88, maxWidth: '750px', margin: '0 auto', fontWeight: 400 }}>
            Our accommodations are designed to be an extension of your therapy. Built with natural materials and positioned to maximize natural light and ventilation, each room offers a serene environment for deep relaxation and healing.
          </p>
        </div>
        {/* Logo decorative SVG */}
        <DecorativeSVG src="/assets/extracted/suprada-logo.svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', opacity: 0.1, pointerEvents: 'none', zIndex: -1 }} />
      </section>

      {/* ========================================================================= */}
      {/* --- GUHANTARA-INSPIRED ASYMMETRIC STAGGERED ROOM SHOWCASE --- */}
      {/* ========================================================================= */}
      <section style={{ padding: '3.5rem 5%', backgroundColor: '#f4f1e9', color: 'var(--raisin-black)' }}>
        <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: 'var(--fs-small)', fontWeight: 800, display: 'block', marginBottom: '0.4rem' }}>
              ✦ Villa Portfolio ✦
            </span>
            <h2 style={{color: 'var(--wine)',}}>
              Distinctive Living Spaces
            </h2>
            <p style={{ opacity: 0.88, maxWidth: '650px', margin: '0.5rem auto 0 auto', fontSize: 'var(--fs-body)', lineHeight: 1.7, fontWeight: 400 }}>
              Filter by estate campus location and explore our 9 handcrafted cottages designed with organic eco-lime, warm timber, and private sit-out verandas.
            </p>
          </div>

          {/* Campus Filter Pills */}
          <div className="campus-filter-container">
            {/* Filter pills watermark */}
            <DecorativeSVG src="/assets/extracted/logo-mandala.svg" style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '250px', opacity: 0.08, pointerEvents: 'none', zIndex: -1 }} />
            {campusZones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`btn-luxury-pill ${selectedZone === z.id ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.48rem' }}
              >
                {selectedZone === z.id && <span>✦</span>}
                {z.icon}
                <span>{z.name}</span>
              </button>
            ))}
          </div>

          {/* Alternating Staggered Guhantara Room Stack */}
          <div className="room-stack-container" style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            <AnimatePresence>
              {(isMobile ? filteredBlocks.slice(0, mobileCottageLimit) : filteredBlocks).map((cottage, idx) => {
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

                            {/* Dynamic Photo Count Badge */}
                            <div style={{
                              position: 'absolute',
                              top: '1.4rem',
                              right: '1.4rem',
                              backgroundColor: 'rgba(58, 21, 32, 0.85)',
                              backdropFilter: 'blur(12px)',
                              color: 'var(--harvest-gold)',
                              padding: '0.4rem 0.9rem',
                              borderRadius: '50px',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              zIndex: 6,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}>
                              Photo {activePhotoIdx + 1} of {photoList.length}
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
                      {!isMobile && cottage.hotspots.map((hs, hsi) => (
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
                        <span style={{ color: 'var(--tan)', fontSize: '1.08rem', fontStyle: 'italic' }}>
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
                      <div style={{ fontSize: '0.88rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>
                        {cottage.roman} • {cottage.zone}
                      </div>

                      <h3 style={{color: 'var(--wine)', marginTop: '0.1rem', marginBottom: '0.5rem'}}>
                        {cottage.name}
                      </h3>

                      <p style={{ fontSize: 'var(--fs-body)', opacity: 0.95, lineHeight: 1.6, color: 'var(--raisin-black)', marginBottom: '1rem', fontWeight: 450 }}>
                        {cottage.desc}
                      </p>

                      {/* Room Specification Grid */}
                      <div className="hero-grid-split room-spec-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.6rem',
                        padding: '0.8rem 1rem',
                        background: 'rgba(245, 235, 217, 0.5)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1.5px solid rgba(94, 39, 53, 0.2)',
                        borderRadius: '16px',
                        fontSize: '0.88rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <span style={{ color: 'var(--redwood)', fontWeight: 800, opacity: 0.95, display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Primary View</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.viewType}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--redwood)', fontWeight: 800, opacity: 0.95, display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Room Area</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.areaSqFt} Sq.Ft</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--redwood)', fontWeight: 800, opacity: 0.95, display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>★ Privacy Rating</span>
                          <strong style={{ color: '#b5801c' }}>{'★'.repeat(Math.floor(cottage.privacyScore))} ({cottage.privacyScore}/5)</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--redwood)', fontWeight: 800, opacity: 0.95, display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Materials</span>
                          <strong style={{ color: 'var(--wine)' }}>{cottage.material.split('&')[0]}</strong>
                        </div>
                      </div>

                      {/* Amenities Micro Badges – hidden on mobile */}
{!isMobile && (
  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
    {cottage.features.slice(0, 3).map((f, fidx) => (
      <span 
        key={fidx}
        style={{ 
          fontSize: '0.88rem', 
          backgroundColor: 'rgba(94, 39, 53, 0.1)', 
          color: 'var(--wine)', 
          padding: '0.35rem 0.85rem', 
          borderRadius: '50px',
          fontWeight: 700
        }}
      >
        ✦ {f}
      </span>
    ))}
  </div>
)}

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
                          {isCompared ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Check size={14} /> Compared</span> : '+ Compare'}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mobile View Explore More / Show Less Toggle Button */}
            {isMobile && filteredBlocks.length > mobileCottageLimit && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setMobileCottageLimit(filteredBlocks.length)}
                  className="btn-primary"
                  style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}
                >
                  ✦ Explore All Sanctuaries ({filteredBlocks.length - mobileCottageLimit} More)
                </button>
              </div>
            )}
            {isMobile && mobileCottageLimit >= filteredBlocks.length && filteredBlocks.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setMobileCottageLimit(3)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1.5px solid var(--wine)',
                    color: 'var(--wine)',
                    padding: '0.75rem 1.8rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Show Fewer Sanctuaries ↑
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* --- THOUGHTFUL AMENITIES SECTION (Sage Green & Ivory Palette Redesign) --- */}
      <section style={{ padding: '7.5rem 6% 5.5rem 6%', background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)', color: 'var(--wine)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative gradient orbs */}
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', maxWidth: '400px', width: '100%', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', maxWidth: '350px', width: '100%', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '2.2rem', gap: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--wine)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.3rem', opacity: 0.85 }}>
                ✦ CURATED COMFORTS
              </span>
              <h2 style={{ color: 'var(--wine)', lineHeight: 1.15, margin: 0, fontSize: 'var(--fs-h2)' }}>
                Thoughtful Amenities
              </h2>
            </div>
            <p style={{ color: 'var(--wine)', opacity: 0.85, maxWidth: '600px', fontSize: 'var(--fs-body)', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
              Every detail is intentional — from the water you drink to the air you breathe. Wellness woven into every comfort.
            </p>
          </div>

          <style>{`
            .campus-filter-container {
              position: relative;
              display: flex;
              gap: 0.65rem;
              justify-content: center;
              align-items: center;
              flex-wrap: nowrap !important;
              margin-bottom: 2.5rem;
              width: 100%;
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch;
              padding-bottom: 0.5rem;
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            .campus-filter-container::-webkit-scrollbar {
              display: none;
            }
            .campus-filter-container .btn-luxury-pill {
              flex-shrink: 0 !important;
              white-space: nowrap !important;
              padding: 0.65rem 1.4rem !important;
              font-size: 0.92rem !important;
            }
            @media (max-width: 900px) {
              .campus-filter-container {
                justify-content: flex-start !important;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
              }
            }

            .amenities-unified-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.25rem;
              width: 100%;
            }
            @media (max-width: 960px) {
              .amenities-unified-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
              }
            }
            @media (max-width: 768px) {
              .amenities-unified-grid {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
                gap: 0.85rem !important;
                padding: 0.5rem 0.2rem 1.2rem 0.2rem !important;
                justify-content: flex-start !important;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .amenities-unified-grid::-webkit-scrollbar {
                display: none;
              }
              .amenities-unified-grid .amenity-card-item {
                flex: 0 0 85% !important;
                width: 85% !important;
                min-width: 85% !important;
                scroll-snap-align: center !important;
              }
            }
            .amenity-card-item {
              background: rgba(255, 255, 255, 0.88);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1.5px solid rgba(94, 39, 53, 0.14);
              border-radius: 18px;
              padding: 1.5rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-height: 155px;
              box-shadow: 0 8px 24px rgba(94, 39, 53, 0.05);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              box-sizing: border-box;
            }
            .amenity-card-item:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 36px rgba(94, 39, 53, 0.12);
              border-color: rgba(94, 39, 53, 0.3);
            }
          `}</style>

          <div className="amenities-unified-grid">
            {amenitiesList.map((item, idx) => (
              <motion.div
                key={idx}
                className="amenity-card-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem', width: '100%' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    color: 'var(--wine)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    color: '#b5801c',
                    backgroundColor: 'rgba(181, 128, 28, 0.12)',
                    border: '1px solid rgba(181, 128, 28, 0.25)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '50px',
                    fontWeight: 800,
                    letterSpacing: '0.06em'
                  }}>
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 style={{ color: 'var(--wine)', fontSize: 'var(--fs-h3)', fontWeight: 700, margin: '0 0 0.35rem 0', lineHeight: 1.25 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-body)', color: 'var(--wine)', opacity: 0.85, lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EARTH ARCHITECTURE BANNER --- */}
      <section style={{ backgroundColor: 'var(--wine)', padding: '6.5rem 8%', color: 'var(--isabelline)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background logo SVG */}
        <DecorativeSVG src="/assets/extracted/suprada-logo.svg" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '350px', opacity: 0.09, pointerEvents: 'none', zIndex: -1 }} />
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--harvest-gold)', fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 800, display: 'block', marginBottom: '1rem' }}>
            Built with Earth in Mind
          </span>
          <h2 style={{color: 'var(--tan)', lineHeight: 1.25}}>
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
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>

              <span style={{ color: 'var(--redwood)', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
                Direct Reservation
              </span>
              <h2 style={{color: 'var(--wine)', marginTop: '0.2rem', marginBottom: '1rem'}}>
                Reserve {activeBookingModal.name}
              </h2>

              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '180px', marginBottom: '1.5rem', backgroundColor: 'var(--isabelline)' }}>
                <img src={activeBookingModal.img} alt={activeBookingModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Booking Form Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.4rem' }}>
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
                      fontSize: '1.05rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--wine)', display: 'block', marginBottom: '0.5rem' }}>
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
                          <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>{gOpt.label}</div>
                          <div style={{ fontSize: '0.78rem', opacity: isSelected ? 0.9 : 0.75, marginTop: '0.15rem' }}>{gOpt.sub}</div>
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
                style={{ width: '100%', padding: '1.1rem', fontSize: '1.02rem', letterSpacing: '0.12em', textAlign: 'center' }}
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
                style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
              <MapPin size={32} style={{ color: 'var(--wine)', display: 'block', marginBottom: '0.5rem' }} />
              <h3 style={{color: 'var(--wine)', marginBottom: '0.5rem'}}>
                {selectedHotspot.title}
              </h3>
              <p style={{ fontSize: 'var(--fs-body)', opacity: 0.8, lineHeight: 1.6 }}>
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
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>

              {/* Multi-Image Gallery Strip in Modal */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {activeModal.gallery.map((gImg, gIdx) => (
                  <div key={gIdx} style={{ borderRadius: '10px', overflow: 'hidden', height: '140px' }}>
                    <img src={gImg} alt={`${activeModal.name} - View ${gIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <span style={{ color: 'var(--redwood)', fontSize: 'var(--fs-small)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>
                {activeModal.category}
              </span>
              <h2 style={{color: 'var(--wine)', marginTop: '0.2rem'}}>
                {activeModal.name}
              </h2>
              <p style={{ fontSize: 'var(--fs-body)', opacity: 0.8, lineHeight: 1.7, marginTop: '0.8rem' }}>
                {activeModal.desc}
              </p>

              <div style={{ backgroundColor: 'var(--isabelline)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
                <h4 style={{color: 'var(--wine)', marginBottom: '0.8rem'}}>
                  Architectural Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--fs-body)' }}>
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
                  style={{ flexGrow: 1, padding: '1rem', fontSize: '0.98rem' }}
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
            <span style={{ fontSize: '0.98rem' }}>
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
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              View Comparison Matrix
            </button>

            <button
              onClick={() => setComparedBlocks([])}
              style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
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
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>

              <h2 style={{color: 'var(--wine)', marginBottom: '0.4rem'}}>
                Living Spaces Comparison Matrix
              </h2>
              <p style={{ fontSize: 'var(--fs-body)', opacity: 0.7, marginBottom: '2rem' }}>
                Compare specs, materials, views, and privacy across your chosen blocks.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--fs-body)' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--wine)' }}>
                      <th style={{ padding: '1rem', width: '25%' }}>Attribute</th>
                      {comparedBlocks.map(b => (
                        <th key={b.id} style={{ padding: '1rem', color: 'var(--wine)', fontSize: 'var(--fs-h3)' }}>
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
