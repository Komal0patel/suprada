import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';

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
    transition: { staggerChildren: 0.12 }
  }
};

// Static fallbacks in case Sanity cannot be fetched
const localArticlesFallback = [
  {
    id: 'naturopathy-science',
    category: 'Science',
    title: 'The Science of Naturopathy: Healing with Natural Elements',
    excerpt: "Discover how mud, water, sun, and fasting work to stimulate the body's innate healing mechanisms without drug intervention.",
    date: 'July 10, 2026',
    author: 'Dr. Lakshmi',
    authorRole: 'Resident Consultant',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    content: `
      Naturopathy is based on the fundamental belief that the human body has a powerful, self-healing mechanism. When we fall ill, it is often because our lifestyle or environment has created a state of toxicity or imbalance. Drug-based medicines often treat symptoms rather than root causes. Naturopathy, on the other hand, aims to restore balance using the five natural elements (Pancha Mahabhutas).

      Mud therapy utilizes clay or mud packs to absorb toxins from the digestive tract and cool the abdominal organs. Hydrotherapy uses hot and cold water applications to stimulate circulation and boost the lymphatic system. Fasting therapy allows the body to redirect its energy from digestion to cellular repair and deep-tissue detoxification. 

      By incorporating these elemental therapies into a daily routine, we can prevent chronic ailments and live in total cellular vitality.
    `
  },
  {
    id: 'circadian-rhythm-correction',
    category: 'Circadian Rhythm',
    title: 'Circadian Rhythm Correction: Aligning with Brahma Muhurta',
    excerpt: 'Waking up at 5:30 AM is more than a spiritual rule. Explore the biological and endocrinological science of waking up before sunrise.',
    date: 'June 28, 2026',
    author: 'Dr. Arjun Rao',
    authorRole: 'Naturopathy Specialist',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    content: `
      Brahma Muhurta, which literally translates to "the creator's time," is the period that begins 1 hour and 36 minutes before sunrise. In yogic and ayurvedic traditions, this time is considered sacred for meditation, reflection, and setting intentions. 

      From a modern scientific perspective, waking up during this window aligns perfectly with our natural circadian rhythms. During the early morning hours, cortisol levels begin to rise naturally to wake us up, while melatonin (the sleep hormone) falls. The atmosphere is rich in nascent oxygen, which helps oxygenate our tissues.

      Waking up during Brahma Muhurta, followed by deep breathing or pranayama, helps regulate cortisol production, reduces daily stress levels, and improves focus throughout the day.
    `
  },
  {
    id: 'mindful-eating-satwik',
    category: 'Nutrition',
    title: 'Mindful Eating and the Principles of Satwik Nutrition',
    excerpt: 'Food is the first medicine. Learn how a Satwik diet cleanses the digestive tract, improves gut health, and nurtures mental peace.',
    date: 'June 15, 2026',
    author: 'Ms. Kavya Nair',
    authorRole: 'Dietary Director',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    content: `
      In the yogic tradition, food is categorized into three types: Satwik, Rajasik, and Tamasik. Satwik food is fresh, light, organic, and cooked with love and awareness. It is food that is easy to digest and nourishes both the physical body and mental clarity.

      A Satwik diet consists of fresh organic fruits, vegetables, whole grains, nuts, seeds, and herbal infusions. We avoid processed items, refined sugars, onion, garlic, and excessive spices, which can irritate the gut lining or overstimulate the nervous system.

      Modern research shows that the gut and brain are connected through the vagus nerve (the gut-brain axis). A clean, Satwik diet nourishes the gut microbiome, leading to improved serotonin production (90% of which is synthesized in the gut) and a calmer, more peaceful state of mind.
    `
  },
  {
    id: 'sound-healing-resonance',
    category: 'Sound Healing',
    title: 'Sound Healing: How Vibrations Calm the Nervous System',
    excerpt: 'Explore the physics and physiology of sound baths, singing bowls, and how resonance reduces anxiety and improves sleep.',
    date: 'May 30, 2026',
    author: 'Mr. Sunil Jayaraj',
    authorRole: 'Resonance Therapist',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    content: `
      Sound healing and music therapy are ancient practices that are gaining rapid clinical recognition today. When we play therapeutic instruments like crystal singing bowls, gongs, or tuning forks, they produce pure harmonic frequencies.

      These frequencies work through a process called brainwave entrainment. When the brain is stressed, it produces fast Beta waves. The pure tones of a sound bath help ease the brain into slower Alpha and Theta waves, which are associated with deep relaxation, meditation, and cellular repair.

      Physiologically, sound therapy stimulates the vagus nerve, which slows down heart rate, lowers blood pressure, and shifts the body from a sympathetic (fight-or-flight) state to a parasympathetic (rest-and-digest) state. This is why sound healing is exceptionally powerful for chronic stress and sleep disorders.
    `
  }
];

// Helper to resolve Sanity Image references
const urlForSanityImage = (ref) => {
  if (!ref) return '';
  const parts = ref.split('-');
  if (parts.length < 4) return '';
  const id = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  return `https://cdn.sanity.io/images/y5kizl9g/production/${id}-${dimensions}.${extension}`;
};

// Fixed-Height Glassmorphism Overlay Blog Card Component
function BlogCard({ art, colors, imageUrl, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(94, 39, 53, 0.12)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(94, 39, 53, 0.08)',
        boxShadow: '0 10px 30px rgba(94, 39, 53, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        height: '420px' // Fixed height! Grid layout remains completely stable
      }}
    >
      {/* Base Card Image Header */}
      <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={imageUrl}
          alt={art.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '1.2rem',
          left: '1.2rem',
          backgroundColor: colors.bg,
          color: colors.text,
          padding: '0.4rem 0.9rem',
          borderRadius: '20px',
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${colors.text}25`
        }}>
          {art.category}
        </div>
      </div>

      {/* Base Card Body Content */}
      <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--redwood)', fontWeight: 600 }}>
          <span>{art.date}</span>
          <span>{art.readTime}</span>
        </div>

        <h3 style={{ color: 'var(--wine)', margin: '0.2rem 0', lineHeight: 1.4, fontSize: 'var(--fs-h3)', fontWeight: 700 }}>
          {art.title}
        </h3>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(94, 39, 53, 0.06)', fontSize: '0.78rem', color: 'var(--wine)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>By {art.author}</span>
          <span style={{ color: 'var(--redwood)', fontWeight: 700 }}>Hover to read &rarr;</span>
        </div>
      </div>

      {/* Glassmorphism Hover Overlay Screen */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              backgroundColor: 'rgba(94, 39, 53, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#ffffff',
              padding: '2rem 1.8rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'rgba(220,160,50,0.2)', color: 'var(--harvest-gold)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {art.category}
                </span>
                <span style={{ fontSize: '0.7rem', opacity: 0.7, color: 'var(--tan)' }}>{art.readTime}</span>
              </div>

              <h4 style={{ color: 'var(--tan)', margin: '0 0 0.6rem 0', lineHeight: 1.3, fontSize: 'var(--fs-h3)', fontWeight: 700 }}>
                {art.title}
              </h4>

              <p style={{ fontSize: 'var(--fs-body)', opacity: 0.9, lineHeight: 1.6, fontWeight: 300, margin: 0, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {art.excerpt}
              </p>
            </div>

            <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--tan)', fontWeight: 600 }}>By {art.author}</span>
              <button
                style={{
                  backgroundColor: 'var(--harvest-gold)',
                  color: 'var(--wine)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.5rem 1.2rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s'
                }}
              >
                <span>Read Article</span>
                <span style={{ fontSize: '0.9rem' }}>&rarr;</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Blog({ onNavigate }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState(localArticlesFallback);
  const [loading, setLoading] = useState(true);

  // Mobile responsiveness states
  const [isMobile, setIsMobile] = useState(false);
  const [mobileBlogLimit, setMobileBlogLimit] = useState(3);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top when article is opened
  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.resize();
      }
    }
  }, [selectedArticle]);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();

  // Fetch blogs dynamically from Sanity CMS
  useEffect(() => {
    const fetchSanityBlogs = async () => {
      const query = '*[_type == "blog"]{_id,author->,body,category->,coverImage,excerpt,publishedAt,slug,title}';
      const url = `https://y5kizl9g.api.sanity.io/v2021-03-25/data/query/production?query=${encodeURIComponent(query)}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.result && data.result.length > 0) {
          // Map Sanity blogs to our layout structure
          const sanityArticles = data.result.map(post => {
            const dateObj = post.publishedAt ? new Date(post.publishedAt) : new Date();
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return {
              id: post._id,
              isSanityPost: true,
              category: post.category?.title || 'Naturopathy',
              categoryColor: post.category?.color || '#632633',
              title: post.title,
              excerpt: post.excerpt || '',
              date: formattedDate,
              author: post.author?.name || 'Dr. Vinaya Prasad',
              authorRole: post.author?.bio || 'Chief Medical Officer',
              authorImgRef: post.author?.image?.asset?._ref || '',
              readTime: '8 min read',
              imgRef: post.coverImage?.asset?._ref || '',
              // Keep raw blocks body for complex render
              bodyBlocks: post.body,
              content: '' // populated by renderer
            };
          });

          // Prepend sanity posts to fallback list
          setArticles([...sanityArticles, ...localArticlesFallback]);
        }
      } catch (err) {
        console.warn("Failed to fetch live Sanity posts, using local fallback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSanityBlogs();
  }, []);

  // Helper to color codes for tags
  const getBadgeColors = (art) => {
    if (art.categoryColor) {
      return { bg: `${art.categoryColor}15`, text: art.categoryColor };
    }
    switch (art.category) {
      case 'Science':
        return { bg: 'rgba(184, 94, 76, 0.12)', text: 'var(--redwood)' };
      case 'Circadian Rhythm':
        return { bg: 'rgba(179, 186, 142, 0.18)', text: '#7d8557' };
      case 'Nutrition':
        return { bg: 'rgba(220, 160, 50, 0.12)', text: 'var(--harvest-gold)' };
      case 'Sound Healing':
      default:
        return { bg: 'rgba(94, 39, 53, 0.1)', text: 'var(--wine)' };
    }
  };

  // Helper to render Sanity block content body
  const renderBodyBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, i) => {
      if (block._type === 'block') {
        const isHeading = block.style && block.style.startsWith('h');
        const text = block.children ? block.children.map(child => child.text).join('') : '';
        if (isHeading) {
          const Tag = block.style; // h2, h3
          return (
            <Tag key={i} style={{ color: 'var(--wine)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 700, fontSize: '1.6rem' }}>
              {text}
            </Tag>
          );
        }
        return (
          <p key={i} style={{ fontSize: 'var(--fs-body)', lineHeight: 1.85, color: 'var(--raisin-black)', opacity: 0.85, marginBottom: '1.2rem', fontWeight: 300 }}>
            {text}
          </p>
        );
      }
      return null;
    });
  };

  // Filter categories
  const categories = ['All', 'Science', 'Circadian Rhythm', 'Nutrition', 'Sound Healing'];
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(art => art.category.toLowerCase() === activeCategory.toLowerCase());

  // Helper for related articles
  const relatedArticles = selectedArticle 
    ? articles.filter(art => art.id !== selectedArticle.id).slice(0, 2)
    : [];

  return (
    <div style={{ backgroundColor: 'var(--isabelline)', minHeight: '100vh', paddingTop: 0, position: 'relative', overflowX: 'hidden' }}>
      
      {/* Botanical Leaf Vector Watermarks */}
      <Pattern24 style={{ position: 'absolute', top: '25%', left: '-80px', width: '320px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />
      <Pattern25 style={{ position: 'absolute', top: '55%', right: '-80px', width: '320px', height: 'auto', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Scroll indicator for reading view */}
      {selectedArticle && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'var(--harvest-gold)',
            transformOrigin: '0%',
            scaleX: scrollYProgress,
            zIndex: 2000
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          // Blog List View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Unified Luxury Hero Section */}
            <section 
              className="mobile-hero-compact"
              style={{
                boxSizing: 'border-box',
                padding: '6rem 8% 3rem 8%',
                background: 'linear-gradient(135deg, #ded2bf 0%, #d5c6b0 60%, #c8b79e 100%)',
                color: 'var(--wine)',
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
              <Pattern24 className="pattern-side-left" style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />
              <Pattern25 className="pattern-side-right" style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.12, color: 'var(--wine)', pointerEvents: 'none' }} />

              {/* Ambient Golden & Green Bokeh Glows */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.18) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,94,76,0.12) 0%, rgba(184,94,76,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

              {/* Background Rotating Mandala Watermark (Spaces Hero Animation) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  x: '-50%', y: '-50%',
                  width: 'clamp(340px, 80vw, 540px)', height: 'clamp(340px, 80vw, 540px)',
                  opacity: 0.08,
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              >
                <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
              </motion.div>

              <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%', textAlign: 'center', marginTop: '-2.5rem' }}>
                {/* Official Suprada Emblem Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}
                >
                  <img 
                    src="/assets/extracted/logo.svg" 
                    alt="Suprada Official Emblem Logo" 
                    style={{ height: '85px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.15))' }} 
                  />
                </motion.div>

                <span style={{ color: 'var(--redwood)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 800, display: 'block', marginBottom: '1.2rem' }}>
                  Readings &amp; Articles
                </span>
                <motion.h1
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } }
                  }}
                  initial="hidden"
                  animate="visible"
                  style={{color: 'var(--wine)',
                    lineHeight: 1.15, margin: 0, display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap'}}
                >
                  {["Wellness", "Journal"].map((word, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { scale: 0.4, rotate: -15, opacity: 0, filter: 'blur(8px)' },
                        visible: { scale: [0.4, 1.05, 1], rotate: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
                      }}
                      animate={{
                        scale: [1, 1.015, 1],
                        transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 + 1.2 }
                      }}
                      style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                <p style={{ color: 'var(--raisin-black)', opacity: 0.85, maxWidth: '680px', margin: '1.5rem auto 0 auto', fontSize: 'var(--fs-body)', lineHeight: 1.8, fontWeight: 300 }}>
                  Insights, clinical perspectives, and ancient wisdom on drugless healing, satwik nutrition, and holistic lifestyle.
                </p>
              </div>
            </section>

            {/* Category Filter Pills */}
            <section style={{ padding: '2.25rem 8% 1.5rem 8%' }}>
              <style dangerouslySetInnerHTML={{__html: `
                .blog-filter-container {
                  display: flex;
                  justify-content: center;
                  gap: 0.8rem;
                  flex-wrap: wrap;
                  max-width: 900px;
                  margin: 0 auto;
                  position: relative;
                }
                @media (max-width: 768px) {
                  .blog-filter-container {
                    display: flex !important;
                    flex-wrap: nowrap !important;
                    justify-content: flex-start !important;
                    overflow-x: auto !important;
                    padding-bottom: 0.8rem !important;
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                    -webkit-overflow-scrolling: touch !important;
                    max-width: 100% !important;
                    width: 100% !important;
                  }
                  .blog-filter-container::-webkit-scrollbar {
                    display: none !important;
                  }
                  .blog-filter-btn {
                    flex-shrink: 0 !important;
                  }
                }
              `}} />
              <div className="blog-filter-container">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      className="blog-filter-btn"
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        position: 'relative',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '30px',
                        border: '1.5px solid transparent',
                        backgroundColor: 'transparent',
                        color: isActive ? '#ffffff' : 'var(--wine)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        zIndex: 1,
                        flexShrink: 0,
                        transition: 'color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeBlogTabPill"
                          style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'var(--redwood)',
                            borderRadius: '30px',
                            zIndex: -1
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      {!isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            borderRadius: '30px',
                            border: '1.5px solid rgba(94, 39, 53, 0.12)',
                            pointerEvents: 'none'
                          }}
                        />
                      )}
                      <span>{cat}</span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Articles Grid */}
            <section style={{ padding: '0 8% 4.5rem 8%' }}>
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 640px) {
                  .grid-4-laptop {
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 1.5rem !important;
                  }
                }
                @media (max-width: 639px) {
                  .grid-4-laptop {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 0.85rem !important;
                  }
                  .grid-4-laptop > div {
                    padding: 0.85rem !important;
                    border-radius: 14px !important;
                  }
                  .grid-4-laptop img {
                    height: 125px !important;
                    border-radius: 10px !important;
                  }
                  .grid-4-laptop h3 {
                    font-size: 0.95rem !important;
                    line-height: 1.3 !important;
                  }
                }
              `}} />
              <motion.div 
                className="grid-4-laptop"
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}
              >
                {(isMobile ? filteredArticles.slice(0, mobileBlogLimit) : filteredArticles).map((art) => {
                  const colors = getBadgeColors(art);
                  const imageUrl = art.isSanityPost ? urlForSanityImage(art.imgRef) : art.img;
                  
                  return (
                    <BlogCard
                      key={art.id}
                      art={art}
                      colors={colors}
                      imageUrl={imageUrl}
                      onSelect={() => setSelectedArticle(art)}
                    />
                  );
                })}
              </motion.div>

              {/* Dynamic View All / Show Fewer Blogs Toggles for Mobile */}
              {isMobile && filteredArticles.length > mobileBlogLimit && (
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => setMobileBlogLimit(filteredArticles.length)}
                    style={{
                      backgroundColor: 'var(--wine)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 2.2rem',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                      boxShadow: '0 8px 24px rgba(94, 39, 53, 0.15)'
                    }}
                  >
                    ✦ See All Blogs ({filteredArticles.length - mobileBlogLimit} More)
                  </button>
                </div>
              )}
              {isMobile && mobileBlogLimit >= filteredArticles.length && filteredArticles.length > 3 && (
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => setMobileBlogLimit(3)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1.5px solid var(--wine)',
                      color: 'var(--wine)',
                      padding: '0.8rem 2rem',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Show Fewer Blogs ↑
                  </button>
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          // Article Read View
          <motion.div
            key="read"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '850px', margin: '0 auto', padding: '4.5rem 5% 4.5rem 5%', position: 'relative', zIndex: 1 }}
          >
            {/* Back Button */}
            <motion.button
              whileHover={{ x: -6 }}
              onClick={() => setSelectedArticle(null)}
              style={{
                background: 'none', border: 'none', color: 'var(--redwood)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontSize: '0.82rem', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              &larr; Back to Journal
            </motion.button>

            {/* Article Head */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <span style={{
                  backgroundColor: getBadgeColors(selectedArticle).bg,
                  color: getBadgeColors(selectedArticle).text,
                  padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.68rem',
                  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {selectedArticle.category}
                </span>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--raisin-black)', opacity: 0.6, fontWeight: 500 }}>{selectedArticle.date}</span>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--raisin-black)', opacity: 0.6, fontWeight: 500 }}>{selectedArticle.readTime}</span>
              </div>
              
              <h1 style={{color: 'var(--wine)', lineHeight: 1.25, margin: '0.5rem 0 0 0',}}>
                {selectedArticle.title}
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(94, 39, 53, 0.08)' }}>
                {selectedArticle.isSanityPost && selectedArticle.authorImgRef ? (
                  <img 
                    src={urlForSanityImage(selectedArticle.authorImgRef)} 
                    alt={selectedArticle.author} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--tan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', color: 'var(--wine)' }}>
                    {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--raisin-black)' }}>{selectedArticle.author}</span>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--redwood)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedArticle.authorRole}</span>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div style={{ height: '440px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3.5rem', boxShadow: '0 25px 50px rgba(94, 39, 53, 0.06)' }}>
              <img 
                src={selectedArticle.isSanityPost ? urlForSanityImage(selectedArticle.imgRef) : selectedArticle.img} 
                alt={selectedArticle.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Article Body */}
            <div style={{ fontSize: 'var(--fs-body)', color: 'var(--raisin-black)', opacity: 0.9, lineHeight: 1.95, fontWeight: 300, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {selectedArticle.isSanityPost ? (
                renderBodyBlocks(selectedArticle.bodyBlocks)
              ) : (
                selectedArticle.content.trim().split('\n\n').map((para, pidx) => {
                  const text = para.trim();
                  if (pidx === 0) {
                    // Apply drop cap to first paragraph
                    const firstLetter = text.charAt(0);
                    const restOfText = text.slice(1);
                    return (
                      <p key={pidx} style={{ position: 'relative' }}>
                        <span style={{
                          float: 'left',
                          fontSize: '4.2rem',
                          lineHeight: '3.5rem',
                          paddingTop: '4px',
                          paddingRight: '10px',
                          paddingLeft: '3px',
                          fontWeight: 700,
                          color: 'var(--wine)',
                        }}>
                          {firstLetter}
                        </span>
                        {restOfText}
                      </p>
                    );
                  }
                  return <p key={pidx}>{text}</p>;
                })
              )}
            </div>

            {/* Related Posts Drawer Section */}
            {relatedArticles.length > 0 && (
              <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid rgba(94, 39, 53, 0.08)' }}>
                <h3 style={{color: 'var(--wine)', marginBottom: '2rem',}}>Related Articles</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {relatedArticles.map((art) => {
                    const relatedImg = art.isSanityPost ? urlForSanityImage(art.imgRef) : art.img;
                    return (
                      <div 
                        key={art.id}
                        onClick={() => {
                          setSelectedArticle(art);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{ display: 'flex', gap: '1.2rem', cursor: 'pointer', alignItems: 'center', backgroundColor: '#ffffff', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(94,39,53,0.04)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={relatedImg} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <span style={{ fontSize: '0.65rem', color: 'var(--redwood)', fontWeight: 700, textTransform: 'uppercase' }}>{art.category}</span>
                          <h4 style={{color: 'var(--wine)', margin: 0, lineHeight: 1.3}}>{art.title}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Final CTA in post */}
            <div style={{ border: '1px solid rgba(220,160,50,0.3)', borderRadius: '12px', padding: '3rem 2.5rem', backgroundColor: 'var(--antique-white)', marginTop: '4.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(220,160,50,0.03) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
              <h3 style={{color: 'var(--wine)', marginBottom: '0.8rem', position: 'relative', zIndex: 1}}>Inspired by this article?</h3>
              <p style={{ fontSize: 'var(--fs-body)', opacity: 0.8, lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 2rem auto', position: 'relative', zIndex: 1 }}>
                Join our retreats to experience these therapies firsthand, custom-prescribed for your body type.
              </p>
              <button 
                onClick={() => onNavigate('programmes')}
                className="btn-luxury" 
                style={{ padding: '0.8rem 2.5rem', fontSize: '0.78rem', position: 'relative', zIndex: 1 }}
              >
                Explore Retreats &rarr;
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
