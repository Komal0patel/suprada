import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Utensils, Heart, Sparkles, BookOpen, Clock, ShieldCheck, Sun, CheckCircle2, ArrowRight } from 'lucide-react';

const holisticPillars = [
  {
    title: 'Farm to Table',
    desc: 'Organic vegetables and herbs grown in our on-site gardens, harvested daily for maximum freshness and prana.'
  },
  {
    title: 'Body-Type Balancing',
    desc: 'Meals carefully prepared according to your unique body type and current state of balance.'
  },
  {
    title: 'Seasonal Eating',
    desc: 'Menu changes with the seasons, aligning with nature’s cycles for optimal digestion and vitality.'
  },
  {
    title: 'Mindful Preparation',
    desc: 'Every dish prepared with intention, positive energy, and traditional holistic cooking methods.'
  }
];

const culinaryOfferings = [
  { title: 'Freshly cooked regional Indian meals', desc: 'Regional plates prepared fresh and aligned to body balance.' },
  { title: 'Oriental-inspired dishes', desc: 'Light, mindful Oriental dishes with clean flavors.' },
  { title: 'Clean Western eats', desc: 'Wholesome Western-inspired plates with simple ingredients.' },
  { title: 'Middle Eastern flavours', desc: 'Mediterranean and Middle Eastern flavors adapted to wellness.' },
  { title: 'Sprouts, fruits, and salad bowls', desc: 'Sprouts, fruits and salads for vitality and balance.' },
  { title: 'Cold-pressed juices', desc: 'Juice blends to support detox and energy.' },
  { title: 'Herbal infusions & wellness beverages', desc: 'Herbal infusions for digestion, calm and clarity.' }
];

const culinaryWorkshops = [
  { title: 'Planning & Sustaining Your Diet', desc: 'Design sustainable meal plans aligned to your goals with grocery lists, routine timing and portion guidance.' },
  { title: 'Breakfast 101', desc: 'Build balanced morning plates supporting digestion using porridges, idlis, herbal teas and fruit combinations.' },
  { title: 'Lunch Box 101', desc: 'Pack wholesome lunch boxes with grains, proteins and seasonal vegetables that stay fresh and satwik.' },
  { title: 'Juicing 101', desc: 'Understand cold-pressed basics, healing combinations, ideal timing and detox guidelines.' },
  { title: 'Salads 101', desc: 'Craft seasonal salads with sprouts, greens and gentle dressings aiding digestion.' },
  { title: 'The Recipes Workshop', desc: 'Hands-on recipes and mindful cooking techniques adapted to different body types.' },
  { title: 'Cooking Classes', desc: 'Guided preparation methods including steaming, sautéing and batch-cooking.' },
  { title: 'Experience Our Kitchen', desc: 'Walk through sourcing, prep flow, safety and sustainability practices inside the Suprada kitchen.' },
  { title: 'Private Dinners & Wellness Dining', desc: 'Curated menus and mindful dining experiences for celebrations aligned to your wellness programme.' }
];

const therapeuticAspects = [
  { title: 'Therapeutic Properties', desc: 'Each spice and herb is chosen for specific healing — turmeric for inflammation, ginger for digestion, cumin for metabolism.' },
  { title: 'Bioavailability & Synergy', desc: 'Food combinations are carefully designed to enhance nutrient absorption and amplify healing effects.' },
  { title: 'Timing & Digestion', desc: 'Meal timing aligns with your body natural digestive rhythms, maximizing nutrient assimilation.' },
  { title: 'Energetic Qualities', desc: 'Foods selected based on heating, cooling, or balancing properties to restore equilibrium.' },
  { title: 'Emotional Nourishment', desc: 'Prepared with intention and served in peaceful settings to nourish the heart and calm the mind.' },
  { title: 'Preventive Medicine', desc: 'Regular consumption of healing foods builds resilience as a form of daily preventive medicine.' }
];

export default function Nutrition({ onNavigate }) {
  return (
    <div style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 1.5rem 5rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(42, 14, 24, 0.75), rgba(42, 14, 24, 0.88)), url("/assets/more_images/nutrition.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#ffffff'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(234,169,54,0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}
        >
          <span style={{
            display: 'inline-block',
            color: 'var(--harvest-gold)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            border: '1px solid rgba(234,169,54,0.3)',
            padding: '0.4rem 1.2rem',
            borderRadius: '50px',
            background: 'rgba(94,39,53,0.4)',
            backdropFilter: 'blur(8px)'
          }}>
            ✦ Satwik & Therapeutic Cuisine ✦
          </span>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--tan)',
            marginBottom: '1.8rem',
            textShadow: '0 4px 16px rgba(0,0,0,0.6)'
          }}>
            Where Food Becomes a Pathway to Healing & Balance.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.8,
            color: 'rgba(230,211,192,0.92)',
            marginBottom: '2.5rem',
            fontWeight: 400
          }}>
            "At Suprada Wellness, nourishment goes beyond calories and taste. Food is a conscious practice — one that supports digestion, strengthens immunity, calms the mind, and nurtures the spirit."
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.85rem' }}
            >
              Consult Our Nutritionist <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('programmes')}
              className="btn-secondary"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              View Wellness Programs
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY & SANSKRIT SLOKA */}
      <section style={{
        padding: '5.5rem 5%',
        background: 'linear-gradient(135deg, #5E2735 0%, #3a1520 100%)',
        color: 'var(--tan)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ color: 'var(--harvest-gold)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 800 }}>
            ✦ Ancient Nutritional Wisdom ✦
          </span>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
            color: 'var(--harvest-gold)',
            margin: '1.2rem 0 0.8rem'
          }}>
            आहारशुद्धौ सत्त्वशुद्धिः।
          </h2>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'rgba(230,211,192,0.7)', marginBottom: '1.5rem' }}>
            Ahāraśuddhau sattvaśuddhiḥ — "When food is pure, the mind becomes pure."
          </p>

          <div style={{ width: '50px', height: '1px', background: 'var(--harvest-gold)', margin: '0 auto 1.8rem', opacity: 0.5 }} />

          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--tan)' }}>
            We believe that true wellness begins in the gut — the body’s second brain. Nutrition at Suprada is not restrictive; it is restorative. By aligning mindful eating with natural, wholesome foods, we support the body’s innate ability to heal and rebalance itself.
          </p>
        </div>
      </section>

      {/* 3. FOUR CORE APPROACHES (FARM TO TABLE, etc.) */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Customized Nourishment ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
              Food Aligned to Your Wellness Formula
            </h2>
            <p className="body-paragraph" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              Food at Suprada is never generic — it is personal, purposeful, and deeply healing. Every meal is curated based on your health assessment and body constitution.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            {holisticPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem 1.6rem',
                  border: '1px solid rgba(94,39,53,0.08)',
                  boxShadow: '0 10px 30px rgba(94,39,53,0.05)'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(94,39,53,0.06)',
                  color: 'var(--wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem'
                }}>
                  <Leaf size={22} />
                </div>
                <h3 className="card-heading" style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>
                  {pillar.title}
                </h3>
                <p className="body-paragraph" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CULINARY DIVERSITY GRID */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--isabelline)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Diverse & Flavorful ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
              Global Culinary Offerings
            </h2>
            <p className="body-paragraph">
              From grain-free therapeutic diets to freshly cooked regional satwik plates, our menu brings together global inspiration with holistic principles.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {culinaryOfferings.map((item, cIdx) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '1.6rem 1.4rem',
                  border: '1px solid rgba(94,39,53,0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}
              >
                <CheckCircle2 size={20} style={{ color: 'var(--harvest-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--wine)', marginBottom: '0.4rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--raisin-black)', opacity: 0.85, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CULINARY EXPERIENCES (NANDI BATTALU) */}
      <section style={{ padding: '6rem 5%', backgroundColor: 'var(--antique-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
              ✦ Nandi Battalu Culinary Experiences ✦
            </span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
              Workshops You Take Home
            </h2>
            <p className="body-paragraph" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              At Suprada, food becomes an experience you integrate into your daily life. Learn mindful cooking, juicing guidelines, and meal planning from our expert chefs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}>
            {culinaryWorkshops.map((ws, wIdx) => (
              <motion.div
                key={ws.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: wIdx * 0.05 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.8rem 1.5rem',
                  border: '1px solid rgba(94,39,53,0.08)',
                  boxShadow: '0 8px 25px rgba(94,39,53,0.04)'
                }}
              >
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.6rem' }}>
                  Culinary Workshop
                </span>
                <h3 className="card-heading" style={{ fontSize: '1.18rem', marginBottom: '0.6rem' }}>
                  {ws.title}
                </h3>
                <p className="body-paragraph" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {ws.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HIPPOCRATES QUOTE & THERAPEUTIC PROPERTIES */}
      <section style={{
        padding: '6rem 5%',
        background: 'linear-gradient(135deg, #5E2735 0%, #2a0e18 100%)',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--harvest-gold)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              ✦ Timeless Wisdom ✦
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
              color: 'var(--tan)',
              margin: '1.2rem 0 0.8rem'
            }}>
              "Let food be thy medicine and medicine be thy food."
            </h2>
            <span style={{ fontSize: '0.9rem', color: 'rgba(230,211,192,0.7)', fontStyle: 'italic' }}>
              — Hippocrates
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {therapeuticAspects.map((aspect, aIdx) => (
              <div
                key={aspect.title}
                style={{
                  backgroundColor: 'rgba(42, 14, 24, 0.65)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(234, 169, 54, 0.2)',
                  borderRadius: '16px',
                  padding: '1.8rem 1.5rem'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--harvest-gold)', marginBottom: '0.6rem' }}>
                  {aspect.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--tan)', opacity: 0.9, lineHeight: 1.7 }}>
                  {aspect.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-luxury"
              style={{ padding: '0.9rem 2.5rem' }}
            >
              Plan Your Wellness Stay
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
