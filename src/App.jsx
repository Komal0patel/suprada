import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Search, ChevronRight, ChevronDown, Download, Menu, Sparkles } from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Spaces from './pages/Spaces';
import Stay from './pages/Stay';
import Programmes from './pages/Programmes';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Occasions from './pages/Occasions';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ComprehensiveCare from './pages/ComprehensiveCare';
import Naturopathy from './pages/Naturopathy';
import YogaMeditation from './pages/YogaMeditation';
import HolisticTherapies from './pages/HolisticTherapies';
import HolisticWellness from './pages/HolisticWellness';
import NutritionLifestyle from './pages/NutritionLifestyle';
import MentalEmotional from './pages/MentalEmotional';
import DetoxCleansing from './pages/DetoxCleansing';
import Physiotherapy from './pages/Physiotherapy';
import Ayurveda from './pages/Ayurveda';
import Wellness from './pages/Wellness';
import Nutrition from './pages/Nutrition';
import Activities from './pages/Activities';
import ProgrammeDetail from './pages/ProgrammeDetail';
import PillarDetail from './pages/PillarDetail';
import Book from './pages/Book';

// Import Global Components
import Footer from './components/Footer';
import StarfieldBackground from './components/StarfieldBackground';

const searchIndex = [
  // ================= PAGES =================
  { 
    type: 'page', title: "Home Page", category: "Page", pageName: "Home", path: "home", 
    desc: "Welcome to Suprada Sanctuary & Riverfront Wellness",
    keywords: ["home", "homepage", "welcome", "suprada", "sanctuary", "suvarnamukhi", "river", "riverfront", "wellness", "natural", "healing", "drugless", "main"]
  },
  { 
    type: 'page', title: "About Us & Founders", category: "Page", pageName: "About Us", path: "about", 
    desc: "Meet Renuka Nagaraju, Sunil Jayaraj, Dr. Prema Ramadas, MD & our drugless healing philosophy",
    keywords: ["about", "about us", "founder", "founders", "renuka", "renuka nagaraju", "nagaraju", "sunil", "sunil jayaraj", "prema", "dr prema", "dr. prema ramadas", "ramadas", "md", "managing trustee", "medical director", "leadership", "team", "philosophy", "story", "mission"]
  },
  { 
    type: 'page', title: "Spaces & Sanctuaries", category: "Page", pageName: "Spaces", path: "spaces", 
    desc: "Explore Swasthya, Sauhithya, Samiksha, Sukhada, Goshala & Cottages",
    keywords: ["spaces", "sanctuary", "sanctuaries", "cottages", "residences", "blocks", "architecture", "swasthya", "sankalpa", "sauhithya", "suyoga", "prakruti", "salila"]
  },
  { 
    type: 'page', title: "Retreat Packages & Pricing", category: "Page", pageName: "Programmes/Packages", path: "programmes/packages", 
    desc: "2-Day Weekend Reset, 7-Day Renewal & 21-Day Chronic Recovery",
    keywords: ["packages", "pricing", "plans", "retreat", "weekend reset", "7 day renewal", "21 day chronic recovery", "rates", "cost", "programs", "package"]
  },
  { 
    type: 'page', title: "Programmes & Approach", category: "Page", pageName: "Programmes", path: "programmes", 
    desc: "Personalized Wellness Formula, Rooted in Nature approach",
    keywords: ["programmes", "programs", "approach", "formula", "wellness formula", "rooted in nature", "discovery", "custom", "personalized"]
  },
  { 
    type: 'page', title: "Naturopathy & Drugless Modalities", category: "Page", pageName: "Naturopathy", path: "naturopathy", 
    desc: "Iris diagnosis, hydrotherapy, abhyanga, mud baths, acoustic sound",
    keywords: ["naturopathy", "drugless", "modalities", "therapies", "iris diagnosis", "hydrotherapy", "abhyanga", "mud bath", "massage", "sound healing", "natural medicine"]
  },
  { 
    type: 'page', title: "Comprehensive Clinical Care", category: "Page", pageName: "Comprehensive Care", path: "comprehensivecare", 
    desc: "Doctor-supervised treatments for diabetes, arthritis, IBS, anxiety & PCOS",
    keywords: ["clinical", "comprehensive care", "conditions", "medical", "doctor supervised", "diabetes", "arthritis", "ibs", "anxiety", "pcos", "diseases", "treatment"]
  },
  { 
    type: 'page', title: "Satwik Nutrition & Organic Dining", category: "Page", pageName: "Nutrition", path: "nutrition", 
    desc: "Farm-to-table organic meals, custom dosha diets, detox juices & decoctions",
    keywords: ["nutrition", "dining", "satwik", "food", "organic", "meals", "farm to table", "detox", "juices", "diet", "ayurvedic kitchen", "culinary"]
  },
  { 
    type: 'page', title: "Careers & Join Our Team", category: "Page", pageName: "Careers", path: "careers", 
    desc: "Open positions for Naturopathy Doctors, Therapists & Culinary Heads",
    keywords: ["careers", "jobs", "hiring", "openings", "join our team", "vacancies", "doctor jobs", "therapist jobs", "positions", "employment"]
  },
  { 
    type: 'page', title: "Photo Gallery & Moments", category: "Page", pageName: "Gallery", path: "gallery", 
    desc: "Explore riverfront views, cottage interiors, treatment suites & grounds",
    keywords: ["gallery", "photos", "pictures", "images", "tour", "moments", "album", "visuals"]
  },
  { 
    type: 'page', title: "Healing Journal & Blog", category: "Page", pageName: "Blog", path: "blog", 
    desc: "Educational articles on gut-brain axis, iris diagnostics & natural health",
    keywords: ["blog", "journal", "articles", "news", "insights", "read", "education", "gut brain", "health articles"]
  },
  { 
    type: 'page', title: "Occasions & Sacred Events", category: "Page", pageName: "Occasions", path: "occasions", 
    desc: "Weddings, executive retreats, family reunions & quiet celebrations",
    keywords: ["occasions", "events", "weddings", "reunions", "corporate retreats", "celebrations", "gatherings", "venue"]
  },
  { 
    type: 'page', title: "Stay & Accommodations", category: "Page", pageName: "Stay", path: "stay", 
    desc: "Heritage garden cottages, river breeze retreats & canopy suites",
    keywords: ["stay", "accommodations", "rooms", "booking stay", "lodging", "veranda", "suites", "comfort"]
  },
  { 
    type: 'page', title: "Book Retreat & Reservation", category: "Page", pageName: "Book", path: "book", 
    desc: "Reserve your customized retreat programme and stay",
    keywords: ["book", "booking", "reservation", "reserve", "dates", "register", "apply"]
  },
  { 
    type: 'page', title: "Contact Us & Location Map", category: "Page", pageName: "Contact", path: "contact", 
    desc: "Location map by Suvarnamukhi river, directions & contact form",
    keywords: ["contact", "location", "map", "directions", "address", "phone", "email", "reach us", "suvarnamukhi river"]
  },

  // ================= FOUNDERS & LEADERSHIP =================
  { 
    type: 'card', title: "Late Mrs. Renuka Nagaraju (Founder Inspiration)", cardName: "Late Mrs. Renuka Nagaraju", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Inspiring Suprada's core vision of compassionate holistic living and sacred healing",
    keywords: ["renuka", "renuka nagaraju", "nagaraju", "late mrs renuka nagaraju", "founder inspiration", "inspiration", "founders", "leadership", "founder"]
  },
  { 
    type: 'card', title: "Acharya Dr. M. Nagaraju (Chairperson)", cardName: "Acharya Dr. M. Nagaraju", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Pioneering traditional Vedic wisdom and holistic health systems",
    keywords: ["acharya", "m nagaraju", "dr nagaraju", "acharya dr m nagaraju", "nagaraju", "chairperson", "chairman", "founders", "leadership"]
  },
  { 
    type: 'card', title: "Mr. Sunil Jayaraj (Founder & Managing Trustee)", cardName: "Sunil Jayaraj", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Visionary founder of Suprada Sanctuary, dedicating life to riverfront drugless healing & nature preservation",
    keywords: ["sunil", "jayaraj", "sunil jayaraj", "mr sunil jayaraj", "founder", "managing trustee", "trustee", "leadership", "visionary", "creator", "owner"]
  },
  { 
    type: 'card', title: "Dr. Prema Ramadas, MD (Chief Medical Director & Co-Founder)", cardName: "Dr. Prema Ramadas", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Pioneer in BNYS & MD Naturopathy, leading doctor consultations, iris diagnostics & natural healing protocols",
    keywords: ["prema", "dr prema", "dr. prema", "ramadas", "dr prema ramadas", "dr. prema ramadas", "medical director", "chief doctor", "doctor", "physician", "naturopath", "bnys", "md", "co-founder", "founder"]
  },
  { 
    type: 'card', title: "Smt. Priya Amaresh (Chief Yoga and Wellness Advisor)", cardName: "Smt. Priya Amaresh", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Guiding classical yoga practices, pranayama, and holistic lifestyle integration",
    keywords: ["priya", "amaresh", "priya amaresh", "smt priya amaresh", "yoga advisor", "wellness advisor", "yoga", "leadership"]
  },
  { 
    type: 'card', title: "Srinivas Ramadas (Director Operations)", cardName: "Srinivas Ramadas", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Crafting the standard of luxury wellness operations and guest experience",
    keywords: ["srinivas", "ramadas", "srinivas ramadas", "director operations", "operations", "leadership"]
  },
  { 
    type: 'card', title: "Dr. Vinaya, B.N.Y.S (Chief Medical Officer)", cardName: "Dr. Vinaya", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Pioneering natural healing and drugless integrative medical protocols",
    keywords: ["vinaya", "dr vinaya", "cmo", "chief medical officer", "medical officer", "doctor", "bnys", "leadership"]
  },

  // ================= SECTIONS =================
  { 
    type: 'section', title: "The Suprada Rhythm (15-Step Daily Schedule)", sectionName: "The Suprada Rhythm", pageName: "Home", path: "home#rhythm-schedule", 
    desc: "Nature-led daily Dinacharya schedule from 5:30 AM Brahma Muhurta to 9:30 PM sleep",
    keywords: ["rhythm", "suprada rhythm", "daily rhythm", "schedule", "daily schedule", "dinacharya", "circadian rhythm", "15 step", "brahma muhurta", "sunrise yoga", "gograsa", "mud pack", "nature immersion"]
  },
  { 
    type: 'section', title: "Signature Wellness Programmes", sectionName: "Signature Programmes", pageName: "Home", path: "home#signature-programmes", 
    desc: "Personalized retreat packages ranging from 2-day weekend reset to 21-day chronic disease recovery",
    keywords: ["signature programmes", "signature wellness", "healing programmes", "retreats list", "programmes section", "weekend reset", "renewal", "recovery"]
  },
  { 
    type: 'section', title: "Targeted Clinical Spectrum & Interventions", sectionName: "Clinical Spectrum", pageName: "Home", path: "home#clinical-spectrum-home", 
    desc: "Doctor-supervised protocols for detoxification, diabetes, neurological & liver health",
    keywords: ["clinical spectrum", "clinical interventions", "targeted clinical", "detoxification", "diabetes management", "neurological disorders", "liver health"]
  },
  { 
    type: 'section', title: "Guided by Founders & Medical Visionaries", sectionName: "Founders & Leadership", pageName: "Home", path: "home#founders-section", 
    desc: "Meet Late Mrs. Renuka Nagaraju, Acharya Dr. M. Nagaraju, Sunil Jayaraj & Dr. Prema Ramadas, MD",
    keywords: ["guided by founders", "medical visionaries", "founders section", "leadership authority", "renuka", "sunil", "prema", "nagaraju"]
  },
  { 
    type: 'section', title: "Discover Your Wellness Path (Health Diagnostic Quiz)", sectionName: "Wellness Quiz", pageName: "Home", path: "home#wellness-quiz-section", 
    desc: "Interactive 3-tab wellness assessment quiz to customize your retreat journey",
    keywords: ["wellness quiz", "discover path", "health quiz", "diagnostic quiz", "assessment quiz", "dosha test", "quiz"]
  },
  { 
    type: 'section', title: "The Sacred Wellness Gateway & Stay Reservation", sectionName: "Wellness Gateway", pageName: "Home", path: "home#transformation-gateway", 
    desc: "Reserve your stay and schedule medical consultations by Suvarnamukhi river",
    keywords: ["wellness gateway", "transformation", "reserve stay", "schedule medical consultation", "gateway", "booking"]
  },
  { 
    type: 'section', title: "The Sanctum Zones (The Spaces That Shape the Journey)", sectionName: "The Sanctum Zones", pageName: "Spaces", path: "spaces#sanctum-zones", 
    desc: "Architectural structures built for reception, therapies, dining & yoga",
    keywords: ["sanctum", "sanctum zones", "journey", "spaces that shape the journey", "reception", "therapies", "dining", "yoga", "sacred spaces"]
  },
  { 
    type: 'section', title: "Suprada Residences & Cottages (Resting Blocks)", sectionName: "Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", 
    desc: "9 lodging blocks crafted with mud plaster, local granite & teakwood",
    keywords: ["residences", "cottages", "resting blocks", "lodging", "suites", "rooms", "blocks", "mud plaster"]
  },
  { 
    type: 'section', title: "Current Openings & Career Roles", sectionName: "Current Openings", pageName: "Careers", path: "careers#current-openings", 
    desc: "Apply for Naturopathy Doctors, Hydro Therapists & Satwik Chefs",
    keywords: ["current openings", "openings", "roles", "jobs list", "hiring now", "vacancies list", "career roles"]
  },
  { 
    type: 'section', title: "Specialized Doctor-Supervised Clinical Spectrum", sectionName: "Clinical Care Spectrum", pageName: "Comprehensive Care", path: "comprehensivecare#clinical-spectrum", 
    desc: "Therapeutic care for metabolic, musculoskeletal, gastrointestinal & nervous disorders",
    keywords: ["clinical spectrum", "specialized care", "doctor supervised", "diseases care", "medical conditions", "spectrum"]
  },
  { 
    type: 'section', title: "Core Drugless Medical Modalities", sectionName: "Drugless Modalities", pageName: "Naturopathy", path: "naturopathy#drugless-modalities", 
    desc: "Iris diagnosis, hydrotherapy, mud packs, acupuncture & sound healing",
    keywords: ["drugless modalities", "core modalities", "naturopathic methods", "natural therapies", "treatments list"]
  },
  { 
    type: 'section', title: "Satwik Culinary Philosophy & Kitchen", sectionName: "Satwik Dining", pageName: "Nutrition", path: "nutrition#satwik-philosophy", 
    desc: "Organic vegetarian food curated according to Ayurvedic principles",
    keywords: ["satwik philosophy", "satwik kitchen", "ayurvedic dining", "organic culinary", "nutrition philosophy"]
  },
  { 
    type: 'section', title: "Our Founders & Leadership Vision", sectionName: "Founders & Leadership", pageName: "About Us", path: "about#founders-section", 
    desc: "Meet Late Mrs. Renuka Nagaraju, Acharya Dr. M. Nagaraju, Sunil Jayaraj & Dr. Prema Ramadas",
    keywords: ["founders section", "leadership vision", "our founders", "founders", "leadership team", "renuka", "sunil", "prema"]
  },
  { 
    type: 'section', title: "Sacred Events & Mindful Gatherings", sectionName: "Sacred Events", pageName: "Occasions", path: "occasions#sacred-occasions", 
    desc: "Eco-friendly weddings, corporate retreats & family milestones",
    keywords: ["sacred events", "mindful gatherings", "events section", "occasions section"]
  },

  // ================= CARDS & ITEMS =================
  // Sanctum Zone Cards (Spaces)
  { type: 'card', title: "Sankalpa (Reception)", cardName: "Sankalpa", sectionName: "The Sanctum Zones (Reception & Admin)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Welcoming entry point where guests register, orient, and set healing intentions", keywords: ["sankalpa", "reception", "welcome", "entry", "checkin", "arrival"] },
  { type: 'card', title: "Swasthya (Consultation Block)", cardName: "Swasthya", sectionName: "The Sanctum Zones (Reception & Admin)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Diagnostic heart of Suprada for iris assessments & doctor consultations", keywords: ["swasthya", "consultation", "doctor block", "iris diagnosis", "diagnostics", "checkup"] },
  { type: 'card', title: "Samanvaya (Admin Block)", cardName: "Samanvaya", sectionName: "The Sanctum Zones (Reception & Admin)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Operational backbone coordinating a seamless, undisturbed healing experience", keywords: ["samanvaya", "admin", "office", "operations"] },
  { type: 'card', title: "Samiksha (Conference Hall)", cardName: "Samiksha", sectionName: "The Sanctum Zones (Reception & Admin)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Indoor learning theater for health workshops, talks, and community dialogues", keywords: ["samiksha", "conference", "hall", "theater", "workshop", "auditorium"] },
  
  { type: 'card', title: "Prakruti (Female Treatment Block)", cardName: "Prakruti", sectionName: "The Sanctum Zones (Therapeutic Sanctuaries)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Private therapeutic haven dedicated to women's care, cleansing, and rejuvenation", keywords: ["prakruti", "female treatment", "women therapy", "ladies spa", "female block"] },
  { type: 'card', title: "Prakriya (Male Treatment Block)", cardName: "Prakriya", sectionName: "The Sanctum Zones (Therapeutic Sanctuaries)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Dedicated block offering strength, detoxification, and deep-tissue recovery for men", keywords: ["prakriya", "male treatment", "men therapy", "gentlemen spa", "male block"] },
  { type: 'card', title: "Salila (Aqua Block)", cardName: "Salila", sectionName: "The Sanctum Zones (Therapeutic Sanctuaries)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Hydrotherapy suites featuring separate male/female zones, steam, sauna & mud therapies", keywords: ["salila", "aqua block", "hydrotherapy pool", "steam", "sauna", "water therapy"] },
  { type: 'card', title: "Samvardhana (Salon & Personal Care)", cardName: "Samvardhana", sectionName: "The Sanctum Zones (Therapeutic Sanctuaries)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Space for organic beauty treatments and hair health using botanical elements", keywords: ["samvardhana", "salon", "beauty", "hair care", "botanical care"] },

  { type: 'card', title: "Sauhithya (Indoor Dining)", cardName: "Sauhithya", sectionName: "The Sanctum Zones (Nourishment & Dining)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Primary dining hall serving customized satwik diets with floor seating", keywords: ["sauhithya", "indoor dining", "dining hall", "food hall", "satwik meals", "restaurant"] },
  { type: 'card', title: "Santrupthi (Outdoor Riverfront Dining)", cardName: "Santrupthi", sectionName: "The Sanctum Zones (Nourishment & Dining)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Mindful eating by the banks of the river under a canopy of trees", keywords: ["santrupthi", "outdoor dining", "riverfront dining", "eating", "river bank food"] },
  { type: 'card', title: "Surasa (Juice & Elixir Bar)", cardName: "Surasa", sectionName: "The Sanctum Zones (Nourishment & Dining)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Freshly extracted organic juices, herbal infusions, and cleansing detox decoctions", keywords: ["surasa", "juice bar", "elixir", "detox drinks", "herbal tea", "smoothies"] },

  { type: 'card', title: "Suyoga (Indoor Yoga Hall)", cardName: "Suyoga", sectionName: "The Sanctum Zones (Yoga & Movement)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Peaceful haven for group asanas, breathwork, and sound bathing", keywords: ["suyoga", "yoga hall", "indoor yoga", "asanas", "breathwork hall", "meditation room"] },
  { type: 'card', title: "Mahabilva (Traditional Outdoor Sitting)", cardName: "Mahabilva", sectionName: "The Sanctum Zones (Yoga & Movement)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Open-air deck for meditation by the river under the sacred nine-leaved Mahabilva", keywords: ["mahabilva", "outdoor deck", "river deck", "meditation deck", "sitting"] },
  { type: 'card', title: "Aqua Yoga", cardName: "Aqua Yoga", sectionName: "The Sanctum Zones (Yoga & Movement)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Yogic movement designed for pool yoga and gentle joint mobilization", keywords: ["aqua yoga", "water yoga", "pool yoga", "hydro yoga"] },
  { type: 'card', title: "Sanmarga (Walking Track)", cardName: "Sanmarga", sectionName: "The Sanctum Zones (Yoga & Movement)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Ornamental track designed for meditative barefoot walking and deep breathing", keywords: ["sanmarga", "walking track", "barefoot walking", "reflexology path", "trail"] },
  { type: 'card', title: "Sukhada (Wellness Gym)", cardName: "Sukhada", sectionName: "The Sanctum Zones (Yoga & Movement)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Equipped with light conditioning gear for gentle strength building", keywords: ["sukhada", "gym", "fitness", "conditioning", "rehab"] },

  { type: 'card', title: "Antara Gange (Sacred Kalyani)", cardName: "Antara Gange", sectionName: "The Sanctum Zones (Nature & Sacred Spaces)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Stepped water tank inspired by ancient architecture with Nandi idol", keywords: ["antara gange", "kalyani", "water tank", "stepped tank", "sacred pond", "nandi"] },
  { type: 'card', title: "Sanjivani Vatika (Herbal Garden)", cardName: "Sanjivani Vatika", sectionName: "The Sanctum Zones (Nature & Sacred Spaces)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Living library of medicinal herbs and shrubs used in teas, packs & oils", keywords: ["sanjivani vatika", "herbal garden", "medicinal plants", "botanical garden", "herbs"] },
  { type: 'card', title: "Saparya (Goshala)", cardName: "Saparya", sectionName: "The Sanctum Zones (Nature & Sacred Spaces)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Traditional cow shelter promoting grounding, compassion & Gograsa care", keywords: ["saparya", "goshala", "cow shelter", "cows", "gograsa", "cattle"] },
  { type: 'card', title: "Sanidhya (Amphitheatre)", cardName: "Sanidhya", sectionName: "The Sanctum Zones (Nature & Sacred Spaces)", pageName: "Spaces", path: "spaces#sanctum-zones", desc: "Open-air stone theater for evening musical performances and Satsang", keywords: ["sanidhya", "amphitheatre", "open air theater", "satsang stage", "stone theater"] },

  // Residence Cards (Spaces)
  { type: 'card', title: "Samprada Block (Heritage Garden Cottages)", cardName: "Samprada Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Rustic garden cottage close to dining and herbal gardens", keywords: ["samprada", "garden cottage", "cottage 1", "samprada block"] },
  { type: 'card', title: "Samrduddhi / Supritha Block (Private Enclaves)", cardName: "Samrduddhi Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Elevated luxury and privacy for deep silence and solitude", keywords: ["samrduddhi", "supritha", "private enclave", "luxury cottage"] },
  { type: 'card', title: "Spandana Block (River Breeze Retreats)", cardName: "Spandana Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Captures morning sunlight and cooling Suvarnamukhi river breeze", keywords: ["spandana", "river breeze", "breeze cottage"] },
  { type: 'card', title: "Samprapti Block (Wellness Restoration Cottages)", cardName: "Samprapti Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Quiet zones designed to support deep sleep after daily therapies", keywords: ["samprapti", "sleep cottage", "restoration cottage"] },
  { type: 'card', title: "Sphatika Block (Prismatic Nature Suites)", cardName: "Sphatika Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Bright airy structure with large veranda facing the forest", keywords: ["sphatika", "forest veranda", "nature suite"] },
  { type: 'card', title: "Sukruthi Block (Traditional Courtyard Living)", cardName: "Sukruthi Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Units opening onto a shared green courtyard with central water feature", keywords: ["sukruthi", "courtyard living", "courtyard cottage"] },
  { type: 'card', title: "Samhita Block (Grounded Earth Cottages)", cardName: "Samhita Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Ground floor cottages with direct garden access", keywords: ["samhita", "grounded earth", "earth cottage", "garden access"] },
  { type: 'card', title: "Subhiksha Block (Private Treatment Residence)", cardName: "Subhiksha Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Ultra-private cottage featuring in-house treatment area", keywords: ["subhiksha", "treatment residence", "private suite", "in house therapy"] },
  { type: 'card', title: "Samruddhi Block (Elevated Canopy Suites)", cardName: "Samruddhi Block", sectionName: "Suprada Residences & Cottages", pageName: "Spaces", path: "spaces#resting-blocks", desc: "Upper floor executive rooms offering sweeping views of tree canopy", keywords: ["samruddhi block", "canopy suite", "executive cottage", "tree view"] },

  // Package Cards (Programmes)
  { type: 'card', title: "Weekend Reset (2 Days / 1 Night)", cardName: "Weekend Reset", sectionName: "Retreat Packages & Pricing", pageName: "Programmes", path: "programmes/packages#pricing-plans", desc: "Quick mental detox, circadian realignment & hydrotherapy", keywords: ["weekend reset", "2 days", "short retreat", "weekend package", "mini detox"] },
  { type: 'card', title: "7-Day Renewal (7 Days / 6 Nights)", cardName: "7-Day Renewal", sectionName: "Retreat Packages & Pricing", pageName: "Programmes", path: "programmes/packages#pricing-plans", desc: "Deep tissue detox, metabolic reset & customized satwik diet", keywords: ["7 day renewal", "7 days", "one week retreat", "renewal package", "detox week"] },
  { type: 'card', title: "21-Day Chronic Disease Recovery", cardName: "21-Day Chronic Recovery", sectionName: "Retreat Packages & Pricing", pageName: "Programmes", path: "programmes/packages#pricing-plans", desc: "Comprehensive doctor-supervised reversal for diabetes, hypertension & arthritis", keywords: ["21 day recovery", "21 days", "chronic disease", "diabetes reversal", "arthritis package", "long retreat"] },

  // Modality Cards (Naturopathy)
  { type: 'card', title: "Iris & Facial Diagnosis", cardName: "Iris Diagnosis", sectionName: "Core Drugless Modalities", pageName: "Naturopathy", path: "naturopathy#drugless-modalities", desc: "Non-invasive organ analysis, iris mapping & facial markers", keywords: ["iris diagnosis", "facial diagnosis", "iris mapping", "nadi pariksha", "body typing"] },
  { type: 'card', title: "Therapeutic Massages & Powders", cardName: "Therapeutic Massages", sectionName: "Core Drugless Modalities", pageName: "Naturopathy", path: "naturopathy#drugless-modalities", desc: "Powder Vibrio, Deep Tissue, Shiatsu & Thai massages", keywords: ["massages", "abhyanga", "powder massage", "deep tissue", "shiatsu", "thai massage"] },
  { type: 'card', title: "Hydrotherapy & Mud Baths", cardName: "Hydrotherapy", sectionName: "Core Drugless Modalities", pageName: "Naturopathy", path: "naturopathy#drugless-modalities", desc: "Spinal Spray, Hip Bath, Jacuzzi & Full Body Mud Packs", keywords: ["hydrotherapy", "mud bath", "mud pack", "spinal spray", "hip bath", "jacuzzi"] },

  // Career Cards (Careers)
  { type: 'card', title: "Chief Resident Medical Officer (BNYS / MD)", cardName: "Medical Officer", sectionName: "Current Openings", pageName: "Careers", path: "careers#current-openings", desc: "Lead clinical diagnostics, patient care & naturopathy protocols", keywords: ["medical officer", "chief doctor", "bnys doctor", "md naturopathy", "doctor job"] },
  { type: 'card', title: "Senior Naturopathy & Yoga Physician", cardName: "Naturopathy Physician", sectionName: "Current Openings", pageName: "Careers", path: "careers#current-openings", desc: "Conduct consultations, iris diagnosis & prescribe wellness plans", keywords: ["naturopathy physician", "yoga doctor", "physician job", "consulting doctor"] },
  { type: 'card', title: "Satwik Organic Culinary Head", cardName: "Culinary Head", sectionName: "Current Openings", pageName: "Careers", path: "careers#current-openings", desc: "Curate farm-to-table organic satwik menus aligned with Ayurvedic principles", keywords: ["culinary head", "satwik chef", "organic cook", "head chef job", "kitchen lead"] },

  // Clinical Spectrum Cards (Comprehensive Care)
  { type: 'card', title: "Metabolic & Lifestyle Diseases", cardName: "Metabolic Care", sectionName: "Specialized Clinical Spectrum", pageName: "Comprehensive Care", path: "comprehensivecare#clinical-spectrum", desc: "Drugless protocols for Type-2 Diabetes, Hypertension & Obesity", keywords: ["metabolic", "diabetes", "hypertension", "obesity", "blood pressure", "sugar"] },
  { type: 'card', title: "Musculoskeletal & Rheumatic Disorders", cardName: "Musculoskeletal Care", sectionName: "Specialized Clinical Spectrum", pageName: "Comprehensive Care", path: "comprehensivecare#clinical-spectrum", desc: "Relief for Osteoarthritis, Spondylosis, Sciatica & Chronic Joint Pain", keywords: ["arthritis", "spondylosis", "sciatica", "back pain", "joint pain", "knee pain"] },
  { type: 'card', title: "Digestive & Gastrointestinal Health", cardName: "Digestive Health", sectionName: "Specialized Clinical Spectrum", pageName: "Comprehensive Care", path: "comprehensivecare#clinical-spectrum", desc: "Treatments for IBS, Acidity, Fatty Liver & Chronic Constipation", keywords: ["ibs", "acidity", "fatty liver", "constipation", "gut health", "digestion"] }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToPage = (pathname) => pathname.replace(/^\//, '') || 'home';

  const [currentPage, setCurrentPage] = useState(() => pathToPage(location.pathname));
  const [bookingProgramme, setBookingProgramme] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('prog') || '';
  });

  useEffect(() => {
    setCurrentPage(pathToPage(location.pathname));
    const params = new URLSearchParams(location.search);
    if (params.get('prog')) {
      setBookingProgramme(params.get('prog'));
    }
  }, [location.pathname, location.search]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1120);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showFloatingWidget, setShowFloatingWidget] = useState(true);

  // Programmes dropdown state
  const [programmesDropdownOpen, setProgrammesDropdownOpen] = useState(false);
  const [pillarsSubOpen, setPillarsSubOpen] = useState(false);
  const [mobileProgrammesOpen, setMobileProgrammesOpen] = useState(false);
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileProgrammesOpen(false);
    setMobilePillarsOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileProgrammesOpen(false);
    setMobilePillarsOpen(false);
    setMobileMenuOpen(true);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProgrammesDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProgrammesDropdownOpen(false);
      setPillarsSubOpen(false);
    }, 200);
  }, []);

  // Programme sub-page definitions (Exact match to reference site)
  const programmesDropdownItems = [
    {
      label: 'Pillars of Wellness',
      hasChildren: true,
      children: [
        { id: 'programmes/naturopathy', label: 'Naturopathy' },
        { id: 'programmes/yoga-meditation', label: 'Yoga & Meditation' },
        { id: 'programmes/holistic-therapies', label: 'Holistic Therapies' },
        { id: 'programmes/nutrition-lifestyle', label: 'Nutrition & Lifestyle' },
        { id: 'programmes/mental-emotional', label: 'Mental & Emotional Well-Being' },
        { id: 'programmes/detox-cleansing', label: 'Detox & Cleansing' },
        { id: 'programmes/physiotherapy', label: 'Physiotherapy' },
        { id: 'programmes/ayurveda', label: 'Ayurveda' }
      ]
    },
    { id: 'programmes/wellness', label: 'Wellness' },
    { id: 'programmes/packages', label: 'Programs & Packages' },
    { id: 'programmes/nutrition', label: 'Nutrition' },
    { id: 'programmes/activities', label: 'Activities' }
  ];

  const { scrollY } = useScroll();
  const lenisRef = useRef(null);

  const [scrollYPos, setScrollYPos] = useState(0);
  const scrollPositionsRef = useRef({});
  const isBackNavRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isBackNavRef.current = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollYPos(scrollPos);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard listener for Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll init
  useEffect(() => {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9, 
        touchMultiplier: 1.5,
        infinite: false,
      });
      lenisRef.current = lenis;
      window.lenis = lenis;

      let rafId;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  useEffect(() => {
    const savedPos = scrollPositionsRef.current[currentPage];
    if (isBackNavRef.current && savedPos !== undefined) {
      window.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(savedPos, { immediate: true });
      }
      setScrollYPos(savedPos);
      isBackNavRef.current = false;
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      setScrollYPos(0);
    }
  }, [currentPage]);

  const handlePageChange = (page, extra) => {
    scrollPositionsRef.current[currentPage] = window.scrollY || document.documentElement.scrollTop || 0;
    
    let targetPage = page;
    let targetSection = extra?.sectionId || null;

    if (typeof page === 'string' && page.includes('#')) {
      const parts = page.split('#');
      targetPage = parts[0];
      targetSection = parts[1];
    }

    if (targetPage === 'programmes' && extra?.progId) {
      targetPage = 'programmes/packages';
    }
    if (targetPage === 'book' || targetPage === 'booking') {
      if (extra?.programme) {
        setBookingProgramme(extra.programme);
      }
    }

    setCurrentPage(targetPage);

    let path = targetPage === 'home' ? '/' : `/${targetPage}`;
    if (extra?.progId) {
      path += `?prog=${extra.progId}`;
    } else if (extra?.programme) {
      path += `?prog=${extra.programme}`;
    }
    if (targetSection) {
      path += `#${targetSection}`;
    }

    navigate(path);
    closeMobileMenu();

    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.lenis) {
            window.lenis.scrollTo(el, { duration: 1.2 });
          }
        }
      }, 150);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'spaces', label: 'Our Spaces' },
    { id: 'programmes', label: 'Programmes' },
    { id: 'launching-soon', label: 'Launching Soon', highlighted: true },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'occasions', label: 'Occasions' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <StarfieldBackground />
      <div className="app-container" style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', color: 'var(--raisin-black)', fontFamily: 'var(--font-body)', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
        
        {/* ========================================================================= */}
        {/* --- UNIVERSAL STATIC 100% TRANSPARENT HEADER NAVBAR --- */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* --- UNIVERSAL DYNAMIC LIGHT/DARK ADAPTIVE HEADER NAVBAR --- */}
        {/* ========================================================================= */}
        {(() => {
          const isBookPage = currentPage === 'book' || currentPage === 'booking';
          if (isBookPage) {
            return null;
          }

          const isScrolled = scrollYPos > 200;
          const isDarkHeroPage = currentPage === 'home' || currentPage === 'contact' || currentPage === 'comprehensivecare' || currentPage === 'naturopathy';
          const isLightHeader = !isDarkHeroPage && !isScrolled;

          return (
            <nav 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                zIndex: 99999,
                padding: isMobile ? '0.5rem 0.6rem' : '0.85rem 1.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isScrolled 
                  ? 'rgba(94, 39, 53, 0.95)' 
                  : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
                boxShadow: isScrolled ? '0 8px 24px rgba(94, 39, 53, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Left: Brand Logo & Title */}
              <div 
                onClick={() => handlePageChange('home')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: isMobile ? '0.3rem' : '0.75rem', 
                  cursor: 'pointer',
                  marginRight: isMobile ? '0' : 'clamp(2.2rem, 3.5vw, 4rem)',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/assets/extracted/logo.svg" 
                  alt="Suprada Logo" 
                  style={{
                    height: isMobile ? '34px' : '48px',
                    filter: isLightHeader
                      ? 'drop-shadow(0 2px 6px rgba(94, 39, 53, 0.15))'
                      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
                <img 
                  src="/assets/extracted/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  style={{
                    height: isMobile ? '19px' : '30px',
                    filter: isLightHeader
                      ? 'brightness(0.22)'
                      : 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
                  }} 
                />
              </div>

              {/* Center/Right Navigation Links (Desktop) */}
              {!isMobile && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'clamp(0.5rem, 0.9vw, 1.1rem)', 
                  flexWrap: 'nowrap', 
                  marginRight: '1.5rem',
                  flexShrink: 1
                }}>
                  {menuItems.map((item) => {
                    if (item.highlighted) {
                      return (
                        <button
                          key={item.id}
                          onClick={() => setIsComingSoonOpen(true)}
                          className="nav-launching-soon-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.26rem 0.8rem',
                            borderRadius: '30px',
                            backgroundColor: 'var(--antique-white)',
                            color: 'var(--wine)',
                            border: '1.2px solid rgba(255, 255, 255, 0.6)',
                            fontWeight: 800,
                            fontSize: '0.67rem',
                            letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)',
                            transition: 'all 0.3s ease',
                            animation: 'launchingPulseGlow 2.5s infinite ease-in-out',
                            margin: '0 0.15rem'
                          }}
                        >
                          <span className="live-dot" style={{ backgroundColor: '#B85645', width: '5px', height: '5px', boxShadow: '0 0 5px rgba(184, 86, 69, 0.5)' }} />
                          <span>{item.label}</span>
                          <span style={{ fontSize: '0.75rem' }}>✨</span>
                        </button>
                      );
                    }

                    if (item.id === 'programmes') {
                      const isProgActive = currentPage === 'programmes' || currentPage.startsWith('programmes/');
                      return (
                        <div
                          key={item.id}
                          className="nav-dropdown-wrapper"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                          style={{ position: 'relative' }}
                        >
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setProgrammesDropdownOpen(prev => !prev);
                            }}
                            style={{
                              cursor: 'pointer',
                              color: isProgActive 
                                ? (isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)')
                                : (isLightHeader ? 'rgba(40, 38, 37, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                              fontWeight: isProgActive ? 800 : 600,
                              fontSize: '0.75rem',
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              transition: 'all 0.3s ease',
                              whiteSpace: 'nowrap',
                              textShadow: isLightHeader ? 'none' : '0 2px 8px rgba(0,0,0,0.6)',
                              borderBottom: isProgActive && isLightHeader ? '2px solid var(--wine)' : '2px solid transparent',
                              paddingBottom: '2px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem'
                            }}
                            className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                          >
                            {item.label}
                            <motion.span
                              animate={{ rotate: programmesDropdownOpen ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{ display: 'inline-flex', lineHeight: 1 }}
                            >
                              <ChevronDown size={12} />
                            </motion.span>
                          </span>

                          {/* === PROGRAMMES MEGA-MENU DROPDOWN === */}
                          <AnimatePresence>
                            {programmesDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scaleY: 0.95 }}
                                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                exit={{ opacity: 0, y: 5, scaleY: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="nav-mega-dropdown"
                                style={{
                                  position: 'absolute',
                                  top: 'calc(100% + 10px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  transformOrigin: 'top center',
                                  zIndex: 100000
                                }}
                              >
                                {/* Level 1: Main dropdown panel */}
                                <div className="nav-dropdown-panel">
                                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--harvest-gold), transparent)', borderRadius: '2px' }} />
                                  
                                  {programmesDropdownItems.map((dropItem, idx) => (
                                    <motion.div
                                      key={dropItem.label}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                                      className={`nav-dropdown-item ${pillarsSubOpen && dropItem.hasChildren ? 'active' : ''}`}
                                      onMouseEnter={() => dropItem.hasChildren && setPillarsSubOpen(true)}
                                      onClick={() => {
                                        if (!dropItem.hasChildren) {
                                          handlePageChange(dropItem.id);
                                          setProgrammesDropdownOpen(false);
                                        }
                                      }}
                                      style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <span>{dropItem.label}</span>
                                      {dropItem.hasChildren && (
                                        <motion.span
                                          animate={{ x: pillarsSubOpen ? 3 : 0 }}
                                          transition={{ duration: 0.2 }}
                                          style={{ color: 'var(--harvest-gold)', display: 'inline-flex', fontSize: '0.75rem' }}
                                        >
                                          <ChevronRight size={13} />
                                        </motion.span>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Level 2: Pillars of Wellness flyout sub-panel */}
                                <AnimatePresence>
                                  {pillarsSubOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -12, scaleX: 0.95 }}
                                      animate={{ opacity: 1, x: 0, scaleX: 1 }}
                                      exit={{ opacity: 0, x: -8, scaleX: 0.97 }}
                                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                      className="nav-dropdown-subpanel"
                                      onMouseEnter={() => setPillarsSubOpen(true)}
                                      onMouseLeave={() => setPillarsSubOpen(false)}
                                    >
                                      {programmesDropdownItems[0].children.map((sub, sIdx) => (
                                        <motion.div
                                          key={sub.id}
                                          initial={{ opacity: 0, x: -8 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.18, delay: sIdx * 0.025 }}
                                          className="nav-dropdown-item nav-dropdown-subitem"
                                          onClick={() => {
                                            handlePageChange(sub.id);
                                            setProgrammesDropdownOpen(false);
                                            setPillarsSubOpen(false);
                                          }}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          <span>{sub.label}</span>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <span
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        style={{
                          cursor: 'pointer',
                          color: currentPage === item.id 
                            ? (isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)')
                            : (isLightHeader ? 'rgba(40, 38, 37, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                          fontWeight: currentPage === item.id ? 800 : 600,
                          fontSize: '0.75rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap',
                          textShadow: isLightHeader ? 'none' : '0 2px 8px rgba(0,0,0,0.6)',
                          borderBottom: currentPage === item.id && isLightHeader ? '2px solid var(--wine)' : '2px solid transparent',
                          paddingBottom: '2px'
                        }}
                        className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                      >
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Right Action: Search Bar & Mobile Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.2rem' : '0.5rem', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Mobile Highlighted Launching Soon Button */}
                {isMobile && (
                  <button
                    onClick={() => setIsComingSoonOpen(true)}
                    className="nav-launching-soon-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.2rem 0.45rem',
                      borderRadius: '16px',
                      backgroundColor: 'var(--antique-white)',
                      color: 'var(--wine)',
                      border: '1.2px solid rgba(255, 255, 255, 0.6)',
                      fontWeight: 800,
                      fontSize: '0.54rem',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      animation: 'launchingPulseGlow 2.5s infinite ease-in-out'
                    }}
                  >
                    <span className="live-dot" style={{ backgroundColor: '#B85645', width: '4px', height: '4px', boxShadow: '0 0 4px rgba(184, 86, 69, 0.5)' }} />
                    <span>Launching Soon</span>
                    <span style={{ fontSize: '0.62rem' }}>✨</span>
                  </button>
                )}

                {/* Search Bar Button — Icon Only on Mobile */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: isMobile ? '0.25rem 0.35rem' : '0.35rem 0.8rem',
                    backgroundColor: isLightHeader ? 'rgba(94, 39, 53, 0.06)' : 'rgba(255, 255, 255, 0.12)',
                    border: isLightHeader ? '1px solid rgba(94, 39, 53, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    color: isLightHeader ? 'var(--raisin-black)' : 'rgba(255, 255, 255, 0.95)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.03em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    boxShadow: isLightHeader ? '0 2px 8px rgba(94, 39, 53, 0.05)' : '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                  className={isLightHeader ? 'hover-wine' : 'hover-gold'}
                  aria-label="Search"
                >
                  <Search size={13} style={{ color: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)' }} />
                  {!isMobile && <span>Search</span>}
                </button>

                {/* Mobile Drawer Trigger */}
                {isMobile && (
                  <button
                    onClick={openMobileMenu}
                    style={{
                      backgroundColor: isLightHeader ? 'var(--wine)' : 'var(--harvest-gold)',
                      color: isLightHeader ? '#ffffff' : '#632633',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.32rem 0.52rem',
                      fontWeight: 800,
                      fontSize: '0.68rem',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <Menu size={13} /> MENU
                  </button>
                )}
              </div>
            </nav>
          );
        })()}

        {/* Global Search Overlay Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="search-modal-backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999999,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '6vh',
                paddingLeft: '1rem',
                paddingRight: '1rem'
              }}
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="search-modal-card"
                style={{
                  width: '100%',
                  maxWidth: '680px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Search Input Header */}
                <div className="search-modal-header" style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', gap: '1rem' }}>
                  <Search size={22} style={{ color: 'var(--wine)', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search therapies, spaces, programmes, stay, about..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="search-input-field"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="search-modal-close-btn"
                    style={{ border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Filtered Search Results */}
                <div className="custom-light-scrollbar" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}>
                  {(() => {
                    if (!searchQuery.trim()) {
                      return (
                        <div style={{ padding: '1rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                          <div>
                            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, color: 'var(--wine)', display: 'block', marginBottom: '0.5rem' }}>
                              📌 POPULAR SECTIONS TO EXPLORE
                            </span>
                            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                              {[
                                { label: 'Suprada Rhythm', query: 'Suprada Rhythm' },
                                { label: 'Founders & Leadership', query: 'Founders & Leadership' },
                                { label: 'Sanctum Zones', query: 'Sanctum Zones' },
                                { label: 'Clinical Spectrum', query: 'Clinical Spectrum' },
                                { label: 'Current Openings', query: 'Current Openings' }
                              ].map(item => (
                                <button
                                  key={item.label}
                                  onClick={() => setSearchQuery(item.query)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    border: '1.5px solid rgba(94, 39, 53, 0.2)',
                                    backgroundColor: 'rgba(94, 39, 53, 0.06)',
                                    color: 'var(--wine)',
                                    fontSize: '0.76rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  📌 {item.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, color: 'var(--redwood)', display: 'block', marginBottom: '0.5rem' }}>
                              🂠 FEATURED CARDS & SANCTUARIES
                            </span>
                            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                              {[
                                { label: 'Sankalpa', query: 'Sankalpa' },
                                { label: 'Suyoga Block', query: 'Suyoga Block' },
                                { label: 'Iris Diagnosis', query: 'Iris Diagnosis' },
                                { label: 'Weekend Reset', query: 'Weekend Reset' },
                                { label: 'Saparya (Goshala)', query: 'Goshala' }
                              ].map(item => (
                                <button
                                  key={item.label}
                                  onClick={() => setSearchQuery(item.query)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    border: '1.5px solid rgba(184, 94, 76, 0.2)',
                                    backgroundColor: '#ffffff',
                                    color: 'var(--wine)',
                                    fontSize: '0.76rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  🂠 {item.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, color: 'var(--raisin-black)', opacity: 0.7, display: 'block', marginBottom: '0.5rem' }}>
                              📄 QUICK PAGE LINKS
                            </span>
                            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                              {['Spaces', 'Programmes', 'Naturopathy', 'Stay', 'About Us', 'Careers'].map(pName => (
                                <button
                                  key={pName}
                                  onClick={() => setSearchQuery(pName)}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(40, 38, 37, 0.15)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    color: 'var(--raisin-black)',
                                    fontSize: '0.76rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                  }}
                                >
                                  📄 {pName}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const qRaw = searchQuery.toLowerCase().trim();
                    const rawTokens = qRaw.split(/\s+/).filter(Boolean);
                    const cleanTokens = rawTokens.map(t => t.replace(/[^a-z0-9]/g, '')).filter(Boolean);

                    const filtered = searchIndex.filter(item => {
                      const searchableParts = [
                        item.title,
                        item.desc,
                        item.cardName,
                        item.sectionName,
                        item.pageName,
                        item.category,
                        ...(item.keywords || [])
                      ].filter(Boolean).map(s => String(s).toLowerCase());

                      const rawBlob = searchableParts.join(' ');
                      const cleanBlob = rawBlob.replace(/[^a-z0-9]/g, ' ');

                      return rawTokens.every((rawToken, idx) => {
                        const cleanToken = cleanTokens[idx];
                        return (
                          rawBlob.includes(rawToken) ||
                          (cleanToken && cleanBlob.includes(cleanToken))
                        );
                      });
                    });

                    if (filtered.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(40, 38, 37, 0.65)' }}>
                          <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--wine)', margin: 0 }}>No matches found for "{searchQuery}"</p>
                          <p style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: '0.4rem', lineHeight: 1.5 }}>
                            Try searching for a section (e.g. <em>Sanctum Zones</em>), card (e.g. <em>Suyoga Block</em>, <em>Sankalpa</em>, <em>Renuka</em>), or page.
                          </p>
                        </div>
                      );
                    }

                    // Split into distinct groups
                    const sectionResults = filtered.filter(item => item.type === 'section');
                    const cardResults = filtered.filter(item => item.type === 'card');
                    const pageResults = filtered.filter(item => item.type === 'page');

                    // Deduce matching parent section suggestions from cards if sectionResults is empty
                    const deducedSectionSuggestions = [];
                    if (sectionResults.length === 0 && cardResults.length > 0) {
                      const sectionNamesSeen = new Set();
                      cardResults.forEach(card => {
                        if (card.sectionName && !sectionNamesSeen.has(card.sectionName)) {
                          sectionNamesSeen.add(card.sectionName);
                          const matchedSec = searchIndex.find(s => s.type === 'section' && (s.sectionName === card.sectionName || s.title.includes(card.sectionName)));
                          if (matchedSec) {
                            deducedSectionSuggestions.push(matchedSec);
                          } else {
                            deducedSectionSuggestions.push({
                              type: 'section',
                              title: card.sectionName,
                              sectionName: card.sectionName,
                              pageName: card.pageName,
                              path: card.path,
                              desc: `Suggested section containing ${card.cardName || 'this feature'} in ${card.pageName}`
                            });
                          }
                        }
                      });
                    }

                    const allSectionsToDisplay = [...sectionResults, ...deducedSectionSuggestions];

                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        
                        {/* CATEGORY 1: SECTION SUGGESTIONS */}
                        {allSectionsToDisplay.length > 0 && (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', paddingLeft: '0.2rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--wine)', backgroundColor: 'rgba(234, 169, 54, 0.25)', padding: '0.25rem 0.75rem', borderRadius: '12px', border: '1px solid rgba(234, 169, 54, 0.5)' }}>
                                📌 SECTION SUGGESTIONS ({allSectionsToDisplay.length})
                              </span>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(40, 38, 37, 0.65)', fontWeight: 500 }}>
                                Click to jump directly to this section
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {allSectionsToDisplay.map((item, idx) => (
                                <div
                                  key={`sec-${idx}`}
                                  onClick={() => {
                                    handlePageChange(item.path);
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                  }}
                                  style={{
                                    padding: '1rem 1.25rem',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#FFFDF9',
                                    border: '2px solid var(--harvest-gold)',
                                    boxShadow: '0 4px 15px rgba(94, 39, 53, 0.08)',
                                    transition: 'all 0.25s ease'
                                  }}
                                >
                                  <div style={{ paddingRight: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                                      <span style={{ fontSize: '0.68rem', backgroundColor: 'var(--wine)', color: 'var(--harvest-gold)', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        📌 Section Suggestion
                                      </span>
                                      {item.pageName && (
                                        <span style={{ fontSize: '0.74rem', color: 'var(--redwood)', fontWeight: 700 }}>
                                          Located in: <strong style={{ color: 'var(--wine)' }}>{item.pageName} Page</strong>
                                        </span>
                                      )}
                                    </div>

                                    <h4 style={{ color: 'var(--wine)', fontSize: '1.1rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                                      {item.title}
                                    </h4>
                                    <p style={{ color: 'rgba(40, 38, 37, 0.8)', fontSize: '0.84rem', margin: '0.25rem 0 0 0', lineHeight: 1.45 }}>
                                      {item.desc}
                                    </p>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--wine)', flexShrink: 0, fontSize: '0.78rem', fontWeight: 800, backgroundColor: 'rgba(234, 169, 54, 0.2)', padding: '0.4rem 0.85rem', borderRadius: '20px', border: '1px solid rgba(234, 169, 54, 0.5)' }}>
                                    <span>Open Section</span>
                                    <ChevronRight size={16} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CATEGORY 2: CARDS & SPECIFIC FEATURES */}
                        {cardResults.length > 0 && (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', paddingLeft: '0.2rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--wine)', backgroundColor: 'rgba(94, 39, 53, 0.08)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                                🂠 CARDS & SPECIFIC FEATURES ({cardResults.length})
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {cardResults.map((item, idx) => (
                                <div
                                  key={`card-${idx}`}
                                  onClick={() => {
                                    handlePageChange(item.path);
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                  }}
                                  style={{
                                    padding: '0.9rem 1.2rem',
                                    borderRadius: '14px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    border: '1.5px solid rgba(94, 39, 53, 0.1)',
                                    transition: 'all 0.25s ease'
                                  }}
                                >
                                  <div style={{ paddingRight: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                                      <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--wine)', color: '#ffffff', fontWeight: 800, padding: '0.18rem 0.55rem', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        🂠 Card Result
                                      </span>
                                      {item.sectionName && (
                                        <span style={{ fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 700 }}>
                                          Belongs to section: <strong style={{ color: 'var(--wine)' }}>{item.sectionName}</strong> ({item.pageName} Page)
                                        </span>
                                      )}
                                    </div>

                                    <h4 style={{ color: 'var(--wine)', fontSize: '1.02rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                                      {item.title}
                                    </h4>
                                    <p style={{ color: 'rgba(40, 38, 37, 0.76)', fontSize: '0.82rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>
                                      {item.desc}
                                    </p>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--wine)', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>
                                    <span>Open</span>
                                    <ChevronRight size={16} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CATEGORY 3: MATCHING PAGES */}
                        {pageResults.length > 0 && (
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', paddingLeft: '0.2rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--raisin-black)', opacity: 0.7, backgroundColor: 'rgba(40, 38, 37, 0.06)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                                📄 PAGES ({pageResults.length})
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              {pageResults.map((item, idx) => (
                                <div
                                  key={`page-${idx}`}
                                  onClick={() => {
                                    handlePageChange(item.path);
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                  }}
                                  style={{
                                    padding: '0.85rem 1.15rem',
                                    borderRadius: '14px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    border: '1.5px solid rgba(40, 38, 37, 0.08)',
                                    transition: 'all 0.25s ease'
                                  }}
                                >
                                  <div style={{ paddingRight: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                      <span style={{ fontSize: '0.64rem', backgroundColor: 'rgba(184, 94, 76, 0.12)', color: 'var(--redwood)', fontWeight: 800, padding: '0.18rem 0.5rem', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        📄 Page
                                      </span>
                                    </div>

                                    <h4 style={{ color: 'var(--wine)', fontSize: '1rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                                      {item.title}
                                    </h4>
                                    <p style={{ color: 'rgba(40, 38, 37, 0.75)', fontSize: '0.81rem', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>
                                      {item.desc}
                                    </p>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--wine)', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>
                                    <span>Go to Page</span>
                                    <ChevronRight size={16} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Full-screen Drawer (Fully Responsive & Scrollable) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100vh',
                maxHeight: '100dvh',
                backgroundColor: 'rgba(25, 12, 17, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 9999999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 'clamp(4.2rem, 8vh, 5.5rem) 1.2rem clamp(2rem, 4vh, 3.5rem) 1.2rem',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                boxSizing: 'border-box'
              }}
            >
              {/* Fixed Close Button Top Right */}
              <button
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                style={{
                  position: 'fixed',
                  top: '1.2rem',
                  right: '1.2rem',
                  background: 'rgba(234, 169, 54, 0.15)',
                  border: '1px solid rgba(234, 169, 54, 0.3)',
                  color: 'var(--harvest-gold)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  cursor: 'pointer',
                  zIndex: 10000000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <X size={22} />
              </button>

              {/* Brand Logo Header inside Drawer */}
              <div 
                onClick={() => {
                  handlePageChange('home');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1.8rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/assets/extracted/logo.svg" 
                  alt="Suprada" 
                  style={{ height: '38px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} 
                />
                <img 
                  src="/assets/extracted/suprada-wellness.svg" 
                  alt="Suprada Wellness" 
                  style={{ height: '22px', filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} 
                />
              </div>

              {/* Menu List */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700
              }}>
                {menuItems.map((item) => {
                  if (item.highlighted) {
                    return (
                      <motion.li
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={item.id}
                        onClick={() => {
                          closeMobileMenu();
                          setIsComingSoonOpen(true);
                        }}
                        style={{
                          cursor: 'pointer',
                          color: 'var(--wine)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.35rem 1rem',
                          borderRadius: '30px',
                          border: '1.2px solid rgba(255, 255, 255, 0.6)',
                          backgroundColor: 'var(--antique-white)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                          margin: '0.2rem 0'
                        }}
                      >
                        <span className="live-dot" style={{ backgroundColor: '#B85645', width: '5px', height: '5px', boxShadow: '0 0 5px rgba(184, 86, 69, 0.5)' }} />
                        <span>{item.label}</span>
                        <span style={{ fontSize: '0.85rem' }}>✨</span>
                      </motion.li>
                    );
                  }

                  if (item.id === 'programmes') {
                    const isProgActive = currentPage === 'programmes' || currentPage.startsWith('programmes/') || currentPage === 'nutrition' || currentPage === 'new-nutrition' || currentPage === 'comprehensivecare' || currentPage === 'naturopathy';
                    return (
                      <li key={item.id} style={{ width: '100%', textAlign: 'center' }}>
                        <div
                          onClick={() => setMobileProgrammesOpen(!mobileProgrammesOpen)}
                          style={{
                            cursor: 'pointer',
                            color: isProgActive ? 'var(--harvest-gold)' : 'var(--isabelline)',
                            padding: '0.45rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: mobileProgrammesOpen ? 'rgba(234, 169, 54, 0.14)' : 'transparent',
                            border: mobileProgrammesOpen ? '1px solid rgba(234, 169, 54, 0.35)' : '1px solid transparent',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          <span>{item.label}</span>
                          <motion.span
                            animate={{ rotate: mobileProgrammesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline-flex' }}
                          >
                            <ChevronDown size={16} style={{ color: 'var(--harvest-gold)' }} />
                          </motion.span>
                        </div>

                        <AnimatePresence>
                          {mobileProgrammesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden', marginTop: '0.5rem' }}
                            >
                              <div style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                borderRadius: '14px',
                                padding: '0.9rem 0.8rem',
                                border: '1px solid rgba(234, 169, 54, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                              }}>
                                {/* Direct Programmes Category Links */}
                                <div style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(2, 1fr)',
                                  gap: '0.45rem'
                                }}>
                                  {programmesDropdownItems.slice(1).map((dropItem) => {
                                    const isSubActive = currentPage === dropItem.id || (dropItem.id === 'programmes/nutrition' && (currentPage === 'nutrition' || currentPage === 'new-nutrition'));
                                    return (
                                      <motion.div
                                        key={dropItem.id}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePageChange(dropItem.id);
                                        }}
                                        style={{
                                          fontSize: '0.74rem',
                                          color: isSubActive ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                                          backgroundColor: isSubActive ? 'var(--wine)' : 'rgba(234, 169, 54, 0.1)',
                                          border: isSubActive ? '1px solid var(--harvest-gold)' : '1px solid rgba(234, 169, 54, 0.25)',
                                          borderRadius: '8px',
                                          padding: '0.55rem 0.35rem',
                                          cursor: 'pointer',
                                          fontWeight: 700,
                                          letterSpacing: '0.04em',
                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                          boxShadow: isSubActive ? '0 2px 8px rgba(94, 39, 53, 0.5)' : 'none',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          minHeight: '38px'
                                        }}
                                      >
                                        {dropItem.label}
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Pillars of Wellness nested accordion */}
                                <div style={{ borderTop: '1px solid rgba(234, 169, 54, 0.18)', paddingTop: '0.65rem' }}>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMobilePillarsOpen(!mobilePillarsOpen);
                                    }}
                                    style={{
                                      fontSize: '0.76rem',
                                      color: 'var(--harvest-gold)',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      letterSpacing: '0.08em',
                                      padding: '0.45rem 0.75rem',
                                      borderRadius: '8px',
                                      backgroundColor: 'rgba(234, 169, 54, 0.12)',
                                      border: '1px solid rgba(234, 169, 54, 0.25)'
                                    }}
                                  >
                                    <span>✦ 8 Pillars of Wellness</span>
                                    <motion.span
                                      animate={{ rotate: mobilePillarsOpen ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ display: 'inline-flex' }}
                                    >
                                      <ChevronDown size={14} />
                                    </motion.span>
                                  </div>

                                  <AnimatePresence>
                                    {mobilePillarsOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                          display: 'grid',
                                          gridTemplateColumns: 'repeat(2, 1fr)',
                                          gap: '0.4rem',
                                          marginTop: '0.55rem'
                                        }}
                                      >
                                        {programmesDropdownItems[0].children.map((sub) => {
                                          const isPillarActive = currentPage === sub.id;
                                          return (
                                            <motion.div
                                              key={sub.id}
                                              whileTap={{ scale: 0.96 }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handlePageChange(sub.id);
                                              }}
                                              style={{
                                                fontSize: '0.68rem',
                                                color: isPillarActive ? '#ffffff' : 'var(--tan)',
                                                backgroundColor: isPillarActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.05)',
                                                border: isPillarActive ? '1px solid var(--harvest-gold)' : '1px solid rgba(234, 169, 54, 0.2)',
                                                borderRadius: '8px',
                                                padding: '0.45rem 0.25rem',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                letterSpacing: '0.02em',
                                                textAlign: 'center',
                                                textTransform: 'none',
                                                fontFamily: 'var(--font-body)',
                                                boxShadow: isPillarActive ? '0 2px 8px rgba(94, 39, 53, 0.4)' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minHeight: '34px'
                                              }}
                                            >
                                              {sub.label}
                                            </motion.div>
                                          );
                                        })}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <motion.li
                      whileHover={{ scale: 1.05, color: 'var(--harvest-gold)' }}
                      whileTap={{ scale: 0.95 }}
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      style={{
                        cursor: 'pointer',
                        color: currentPage === item.id ? 'var(--harvest-gold)' : 'var(--isabelline)',
                        transition: 'color 0.2s ease',
                        padding: '0.35rem 0.6rem'
                      }}
                    >
                      {item.label}
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Drawer Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                marginTop: '2rem',
                width: '100%',
                maxWidth: '280px',
                alignItems: 'center',
                flexShrink: 0,
                paddingBottom: '1rem'
              }}>
                <a
                  href="/assets/Suprada_Wellness_Brochure.pdf"
                  download="Suprada_Wellness_Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.7rem 1.2rem',
                    backgroundColor: 'rgba(234, 169, 54, 0.15)',
                    border: '1.5px solid var(--harvest-gold)',
                    borderRadius: '30px',
                    color: 'var(--harvest-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  <Download size={15} /> Download Brochure
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coming Soon Showcase Modal matching user design */}
        <AnimatePresence>
          {isComingSoonOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999999,
                backgroundColor: 'rgba(20, 10, 15, 0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setIsComingSoonOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 15, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '660px',
                  backgroundColor: '#FBF7F2',
                  color: 'var(--wine)',
                  borderRadius: '28px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.28)',
                  padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsComingSoonOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.2rem',
                    background: 'rgba(94, 39, 53, 0.06)',
                    border: 'none',
                    color: 'var(--wine)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Header Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '1.8rem' }}>
                  <img 
                    src="/assets/extracted/logo.svg" 
                    alt="Suprada Logo" 
                    style={{ height: '42px' }} 
                  />
                  <img 
                    src="/assets/extracted/suprada-wellness.svg" 
                    alt="Suprada Wellness" 
                    style={{ height: '24px', filter: 'brightness(0.22)' }} 
                  />
                </div>

                {/* Launching Soon Pill Badge */}
                <div 
                  style={{
                    display: 'inline-block',
                    border: '1px solid rgba(184, 125, 117, 0.45)',
                    borderRadius: '50px',
                    padding: '0.35rem 1.4rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: '#B87D75',
                    textTransform: 'uppercase',
                    marginBottom: '1.6rem',
                    backgroundColor: 'rgba(184, 125, 117, 0.06)'
                  }}
                >
                  LAUNCHING SOON
                </div>

                {/* Main Heading: Coming Soon */}
                <h1 
                  style={{ 
                    fontSize: isMobile ? '2.6rem' : '3.8rem', 
                    fontFamily: 'var(--font-heading)', 
                    color: 'var(--wine)', 
                    margin: '0 0 1rem 0', 
                    fontWeight: 400, 
                    lineHeight: 1.05 
                  }}
                >
                  Coming <em style={{ fontStyle: 'italic', color: '#B87D75', fontWeight: 400, fontFamily: 'serif' }}>Soon</em>
                </h1>

                {/* Decorative Separator Line with Diamond */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.2rem auto 1.6rem auto', maxWidth: '220px' }}>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(94, 39, 53, 0.18)' }} />
                  <span style={{ color: '#B87D75', fontSize: '0.75rem' }}>♢</span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(94, 39, 53, 0.18)' }} />
                </div>

                {/* Subheading */}
                <h3 
                  style={{ 
                    fontSize: isMobile ? '1.25rem' : '1.6rem', 
                    color: 'var(--wine)', 
                    fontFamily: 'var(--font-heading)', 
                    margin: '0 0 0.8rem 0', 
                    fontWeight: 500 
                  }}
                >
                  Holistic Wellness. Thoughtfully Curated.
                </h3>

                {/* Paragraph */}
                <p 
                  style={{ 
                    fontSize: '0.95rem', 
                    color: 'rgba(40, 38, 37, 0.78)', 
                    lineHeight: 1.6, 
                    maxWidth: '520px', 
                    margin: '0 auto 2.2rem auto', 
                    fontWeight: 400 
                  }}
                >
                  Experience a new destination for preventive healthcare, holistic therapies, mindful living, and personalized wellness programmes.
                </p>

                {/* Email Input & Notify Me Form */}
                <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                  {waitlistSubmitted ? (
                    <div style={{ color: 'var(--wine)', fontWeight: 700, fontSize: '0.95rem', padding: '0.75rem', backgroundColor: 'rgba(94, 39, 53, 0.08)', borderRadius: '12px' }}>
                      ✦ Thank you! We will notify you as soon as we launch.
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (waitlistEmail.trim()) {
                          setWaitlistSubmitted(true);
                        }
                      }}
                      style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '0.65rem' }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        required
                        style={{
                          flex: 1,
                          padding: '0.85rem 1.25rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(94, 39, 53, 0.22)',
                          backgroundColor: '#ffffff',
                          color: 'var(--raisin-black)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxShadow: '0 2px 8px rgba(94, 39, 53, 0.04)'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          backgroundColor: 'var(--wine)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.85rem 1.6rem',
                          fontWeight: 600,
                          fontSize: '0.92rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Page Routing Switcher — URL-based */}
        <div key={location.pathname} style={{ paddingTop: '0px' }}>
          {currentPage === 'home'       && <Home        onNavigate={handlePageChange} />}
          {currentPage === 'about'      && <About       onNavigate={handlePageChange} />}
          {currentPage === 'spaces'     && <Spaces      onNavigate={handlePageChange} />}
          {currentPage === 'stay'       && <Stay        onNavigate={handlePageChange} />}
          {currentPage === 'programmes' && <Wellness    onNavigate={handlePageChange} />}
          {currentPage === 'gallery'    && <Gallery     onNavigate={handlePageChange} />}
          {currentPage === 'blog'       && <Blog        onNavigate={handlePageChange} />}
          {currentPage === 'occasions'  && <Occasions   onNavigate={handlePageChange} />}
          {currentPage === 'careers'    && <Careers     onNavigate={handlePageChange} />}
          {currentPage === 'contact'    && <Contact     onNavigate={handlePageChange} />}
          {currentPage === 'comprehensivecare' && <ComprehensiveCare onNavigate={handlePageChange} />}
          {currentPage === 'naturopathy' && <Naturopathy onNavigate={handlePageChange} />}

          {/* Programme & Pillars Sub-Pages */}
          {currentPage === 'programmes/packages'            && <Programmes onNavigate={handlePageChange} />}
          {currentPage === 'packages'                       && <Programmes onNavigate={handlePageChange} />}
          {currentPage === 'programmes/wellness'            && <Wellness onNavigate={handlePageChange} />}
          {currentPage === 'programmes/nutrition'           && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'nutrition'                      && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'new-nutrition'                  && <Nutrition onNavigate={handlePageChange} />}
          {currentPage === 'programmes/activities'          && <Activities onNavigate={handlePageChange} />}
          
          {/* Pillars of Wellness Sub-Routes */}
          {currentPage === 'programmes/naturopathy'         && <Naturopathy onNavigate={handlePageChange} />}
          {currentPage === 'programmes/yoga-meditation'     && <YogaMeditation onNavigate={handlePageChange} />}
          {currentPage === 'programmes/holistic-therapies'   && <HolisticTherapies onNavigate={handlePageChange} />}
          {currentPage === 'programmes/nutrition-lifestyle'  && <NutritionLifestyle onNavigate={handlePageChange} />}
          {currentPage === 'nutrition-lifestyle'             && <NutritionLifestyle onNavigate={handlePageChange} />}
          {currentPage === 'programmes/mental-emotional'    && <MentalEmotional onNavigate={handlePageChange} />}
          {currentPage === 'programmes/mental-wellbeing'    && <MentalEmotional onNavigate={handlePageChange} />}
          {currentPage === 'mental-emotional'               && <MentalEmotional onNavigate={handlePageChange} />}
          {currentPage === 'mental-wellbeing'               && <MentalEmotional onNavigate={handlePageChange} />}
          {currentPage === 'programmes/detox-cleansing'     && <DetoxCleansing onNavigate={handlePageChange} />}
          {currentPage === 'detox-cleansing'                && <DetoxCleansing onNavigate={handlePageChange} />}
          {currentPage === 'programmes/physiotherapy'       && <Physiotherapy onNavigate={handlePageChange} />}
          {currentPage === 'physiotherapy'                  && <Physiotherapy onNavigate={handlePageChange} />}
          {currentPage === 'programmes/ayurveda'            && <Ayurveda onNavigate={handlePageChange} />}
          {currentPage === 'ayurveda'                       && <Ayurveda onNavigate={handlePageChange} />}

          {/* Program Package Sub-Routes */}
          {currentPage === 'programmes/weekend-reset'       && <ProgrammeDetail progId="weekend-reset" onNavigate={handlePageChange} />}
          {currentPage === 'weekend-reset'                  && <ProgrammeDetail progId="weekend-reset" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/rejuvenation'        && <ProgrammeDetail progId="rejuvenation" onNavigate={handlePageChange} />}
          {currentPage === 'rejuvenation'                   && <ProgrammeDetail progId="rejuvenation" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/holistic-wellness'   && <ProgrammeDetail progId="holistic-wellness" onNavigate={handlePageChange} />}
          {currentPage === 'holistic-wellness'              && <ProgrammeDetail progId="holistic-wellness" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/detox'               && <ProgrammeDetail progId="detox" onNavigate={handlePageChange} />}
          {currentPage === 'detox'                          && <ProgrammeDetail progId="detox" onNavigate={handlePageChange} />}
          {currentPage === 'programmes/advanced-healing'    && <ProgrammeDetail progId="advanced-healing" onNavigate={handlePageChange} />}
          {currentPage === 'advanced-healing'               && <ProgrammeDetail progId="advanced-healing" onNavigate={handlePageChange} />}

          {/* Booking & Reservation Sanctuary Wizard */}
          {(currentPage === 'book' || currentPage === 'booking') && (
            <Book onNavigate={handlePageChange} preselectedProgramme={bookingProgramme} />
          )}
        </div>

        {/* Global Footer */}
        <Footer onNavigate={handlePageChange} />

        {/* Global Constant Floating Contact Actions (Invisible Container with Dismiss × Button & Compact Sizes) */}
        <AnimatePresence>
          {showFloatingWidget && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                bottom: isMobile ? '16px' : '24px',
                right: isMobile ? '14px' : '24px',
                zIndex: 999998,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0
              }}
            >
              {/* Dismiss / Cancel (×) Button */}
              <button
                onClick={() => setShowFloatingWidget(false)}
                aria-label="Dismiss floating contact shortcuts"
                title="Hide contact shortcuts"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(40, 38, 37, 0.82)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-end',
                  marginBottom: '2px'
                }}
              >
                <X size={12} />
              </button>

              {/* Floating "We're Hiring" Pill Button (2 Lines) */}
              <motion.button
                onClick={() => handlePageChange('careers')}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: isMobile ? '0.32rem 0.62rem' : '0.38rem 0.72rem',
                  backgroundColor: 'var(--wine)',
                  border: '1.5px solid var(--harvest-gold)',
                  borderRadius: '14px',
                  color: 'var(--harvest-gold)',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(94, 39, 53, 0.35)'
                }}
                aria-label="We are hiring - View Careers"
              >
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--harvest-gold)',
                  display: 'inline-block',
                  boxShadow: '0 0 6px var(--harvest-gold)',
                  animation: 'pulse-dot 1.8s infinite ease-in-out',
                  flexShrink: 0
                }} />
                <span style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  lineHeight: 1.15,
                  fontSize: isMobile ? '0.62rem' : '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  <span>We're</span>
                  <span>Hiring</span>
                </span>
              </motion.button>

              {/* WhatsApp Floating Button (Bit Smaller) */}
              <motion.a
                href="https://wa.me/917892596969?text=Hello%20Suprada%20Wellness%2C%20I%20would%20like%20to%20inquire%20about%20your%20retreats"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '38px' : '44px',
                  height: isMobile ? '38px' : '44px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.94 9.94 0 0 0 1.341 5.011L2 22l5.143-1.343a9.96 9.96 0 0 0 4.869 1.327h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.668-1.038-5.176-2.925-7.062A9.92 9.92 0 0 0 12.012 2zm5.836 14.137c-.246.692-1.228 1.332-1.996 1.498-.526.113-1.213.203-3.518-.751-2.951-1.221-4.85-4.227-4.998-4.425-.147-.197-1.202-1.602-1.202-3.056 0-1.454.761-2.169 1.033-2.464.272-.295.592-.369.79-.369.197 0 .395.002.568.01.184.008.434-.07.679.518.246.591.838 2.043.912 2.191.074.148.123.321.025.518-.099.197-.148.321-.296.493-.148.172-.311.384-.443.516-.148.148-.303.309-.131.605.172.296.764 1.261 1.637 2.039 1.122.999 2.068 1.309 2.364 1.457.296.148.468.123.64-.074.172-.197.739-.862.936-1.157.197-.295.395-.246.666-.148.271.099 1.724.813 2.02 0.96.295.148.493.222.566.345.074.123.074.715-.172 1.407z"/>
                </svg>
              </motion.a>

              {/* Call Floating Button (Bit Smaller) */}
              <motion.a
                href="tel:+917892596969"
                aria-label="Call Suprada Wellness"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '38px' : '44px',
                  height: isMobile ? '38px' : '44px',
                  borderRadius: '50%',
                  backgroundColor: '#258CFB',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(37, 140, 251, 0.4)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <svg width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

// Suprada Wellness — Integrated Application Build v1.0.4
export default App;