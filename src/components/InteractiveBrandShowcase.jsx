import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveBrandShowcase() {
  const [activeTab, setActiveTab] = useState('business-card');

  return (
    <div>
      {/* Tab Selectors */}
      <ul className="tab-header-list">
        <li 
          className={`tab-header-item ${activeTab === 'business-card' ? 'active' : ''}`}
          onClick={() => setActiveTab('business-card')}
        >
          Business Card
        </li>
        <li 
          className={`tab-header-item ${activeTab === 'letterhead' ? 'active' : ''}`}
          onClick={() => setActiveTab('letterhead')}
        >
          Letterhead &amp; Poster
        </li>
        <li 
          className={`tab-header-item ${activeTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setActiveTab('amenities')}
        >
          Hotel Amenities
        </li>
        <li 
          className={`tab-header-item ${activeTab === 'folder' ? 'active' : ''}`}
          onClick={() => setActiveTab('folder')}
        >
          Folder &amp; Envelope
        </li>
      </ul>

      {/* Tab Contents */}
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {activeTab === 'business-card' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--redwood)', marginBottom: '2rem' }}>
              Hover over cards to flip in 3D
            </p>
            <div className="flip-card-wrapper">
              
              {/* Card 1: Front */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front" style={{ backgroundColor: 'var(--wine)' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: '0.05em', color: 'var(--tan)' }}>Kanakapura, Karnataka</div>
                    <div style={{ fontSize: '2.4rem', color: 'var(--harvest-gold)', letterSpacing: '0.12em', fontWeight: 400 }}>Suprada</div>
                  </div>
                  <div className="flip-card-back" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: 'var(--wine)', width: '38px', height: '38px', margin: '0 auto 0.75rem auto' }}>
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                        </svg>
                      </div>
                      <div style={{ fontSize: '0.84rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)' }}>Front Side</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Back (Details) */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front luxury-paper" style={{ backgroundColor: 'var(--antique-white)', color: 'var(--wine)', border: '1px solid rgba(94, 39, 53, 0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                      <span style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: '0.05em', color: 'var(--wine)' }}>www.suprada.in</span>
                      
                      {/* Mini Logo */}
                      <div style={{ width: '25px', height: '25px', color: 'var(--wine)' }}>
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                      <h4 style={{color: 'var(--wine)'}}>
                        Sreeram Kayanadath
                      </h4>
                      <p style={{ fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--redwood)', marginTop: '0.15rem', fontWeight: 600 }}>
                        Brand Partner
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.86rem', borderTop: '1px solid rgba(94, 39, 53, 0.15)', paddingTop: '0.6rem', opacity: 0.9 }}>
                      <span>sreeram@suprada.in</span>
                      <span>+91 8547045768</span>
                    </div>
                  </div>

                  <div className="flip-card-back" style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: 'var(--tan)', width: '38px', height: '38px', margin: '0 auto 0.75rem auto' }}>
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                        </svg>
                      </div>
                      <div style={{ fontSize: '0.84rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--tan)' }}>Back Side</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'letterhead' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <div className="card-grid-split" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              
              {/* Document Mockup */}
              <div className="letterhead-preview gold-foil-border luxury-paper">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(94,39,53,0.1)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
                    <div>
                      <h4 style={{color: 'var(--wine)', letterSpacing: '0.05em',}}>Suprada</h4>
                      <p style={{ fontSize: '0.84rem', opacity: 0.6, color: 'var(--raisin-black)' }}>Kanakapura, Bengaluru Rural</p>
                    </div>
                    <span style={{ fontSize: '0.9rem', opacity: 0.6, color: 'var(--wine)', fontWeight: 500 }}>www.suprada.in</span>
                  </div>

                  <h3 style={{color: 'var(--wine)', marginBottom: '1.5rem',}}>
                    Let Nature Guide The Way
                  </h3>
                  
                  <div style={{ fontSize: '1.02rem', color: 'var(--raisin-black)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.85 }}>
                    <p>
                      At Suprada, wellness is a transformative journey that nourishes your mind, body, and soul. Nestled in the serene embrace of nature, our retreat offers a peaceful haven where you can escape the stresses of daily life and embark on a path of rejuvenation.
                    </p>
                    <p>
                      Through carefully curated programs and holistic practices, we guide you towards inner harmony and restored balance. Reconnect with your true vitality.
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(94,39,53,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--wine)', fontWeight: 500 }}>Suprada Wellness</span>
                  <span style={{ fontSize: '0.84rem', opacity: 0.5 }}>Official Stationery</span>
                </div>

                {/* Decorative border scallop */}
                <div className="letterhead-scallop"></div>
              </div>

              {/* Poster/Right Panel Layout */}
              <div style={{ backgroundColor: 'var(--brand-bg)', borderRadius: '12px', padding: '3.5rem 3rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }} className="luxury-clay gold-foil-border">
                <div style={{ position: 'absolute', right: '-15%', bottom: '-10%', width: '180px', height: '180px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }}>
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                  </svg>
                </div>
                
                <span style={{ color: 'var(--redwood)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Stationery Leaflet</span>
                
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{color: 'var(--wine)', lineHeight: 1.25}}>
                    Disconnect With<br />The World,<br />Reconnect Within.
                  </h3>
                  <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--redwood)', margin: '1.5rem 0' }}></div>
                  <p style={{ fontSize: '1.02rem', color: 'var(--raisin-black)', opacity: 0.8, lineHeight: 1.6 }}>
                    A tangible manifestation of the wellness retreat ecosystem. Curated textures, heavy cotton paper stocks, and deep burgundy hot-stamped gold foil logos.
                  </p>
                </div>

                <div style={{ fontSize: '0.95rem', color: 'var(--wine)', fontWeight: 600, letterSpacing: '0.1em', marginTop: '2.5rem' }}>
                  www.suprada.in
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'amenities' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
              
              {/* Towel Wrap Box Mockup */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 15px 35px rgba(94,39,53,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '290px' }} className="gold-foil-border luxury-paper">
                <span style={{ fontSize: '0.84rem', color: 'var(--wine)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>// Towel Wrap</span>
                <div style={{ color: 'var(--wine)', width: '38px', height: '38px', margin: '1.5rem auto' }}>
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                  </svg>
                </div>
                <h4 style={{color: 'var(--wine)', letterSpacing: '0.05em'}}>Suprada Wellness</h4>
              </div>

              {/* Body Wash */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 15px 35px rgba(94,39,53,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '290px' }} className="gold-foil-border luxury-paper">
                <span style={{ fontSize: '0.84rem', color: 'var(--wine)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>// Wall Dispenser</span>
                
                <div style={{ margin: '1rem 0' }}>
                  <h5 style={{color: 'var(--wine)',}}>Body Wash</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, color: 'var(--redwood)', letterSpacing: '0.05em', fontWeight: 500 }}>Sandalwood &amp; Neem</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--wine)', fontSize: '0.95rem', fontWeight: 600 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--harvest-gold)' }}></div>
                  <span>Suprada</span>
                </div>
              </div>

              {/* Shampoo */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 15px 35px rgba(94,39,53,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '290px' }} className="gold-foil-border luxury-paper">
                <span style={{ fontSize: '0.84rem', color: 'var(--wine)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>// Wall Dispenser</span>
                
                <div style={{ margin: '1rem 0' }}>
                  <h5 style={{color: 'var(--wine)',}}>Shampoo</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, color: 'var(--redwood)', letterSpacing: '0.05em', fontWeight: 500 }}>Bhringraj &amp; Shikakai</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--wine)', fontSize: '0.95rem', fontWeight: 600 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--harvest-gold)' }}></div>
                  <span>Suprada</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'folder' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <div className="card-grid-split" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              
              {/* Folder Mockup */}
              <div style={{ backgroundColor: 'var(--wine)', color: 'var(--isabelline)', borderRadius: '12px', padding: '4.5rem 3.5rem', minHeight: '390px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 25px 55px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }} className="gold-foil-border">
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', backgroundColor: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}></div>
                <span style={{ color: 'var(--tan)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>// Brand Folder</span>
                
                <h3 style={{color: 'var(--isabelline)', lineHeight: 1.15,}}>
                  DO NOT<br />DISTURB
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--tan)', width: '36px', height: '36px' }}>
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '1.02rem', color: 'var(--tan)', letterSpacing: '0.12em', fontWeight: 500 }}>Suprada Wellness</span>
                </div>
              </div>

              {/* Envelope Mockup */}
              <div style={{ backgroundColor: 'var(--brand-bg)', borderRadius: '12px', padding: '4.5rem 3.5rem', minHeight: '390px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(94, 39, 53, 0.08)', boxShadow: '0 25px 55px rgba(0,0,0,0.1)', position: 'relative' }} className="luxury-clay gold-foil-border">
                <span style={{ color: 'var(--wine)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>// Envelope</span>
                
                <div style={{ center: 'center', margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: 'var(--wine)', width: '45px', height: '45px', margin: '0 auto 1rem auto' }}>
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M50 15 C62 30 75 38 85 50 C75 62 62 70 50 85 C38 70 25 62 15 50 C25 38 38 30 50 15 Z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '2rem', color: 'var(--wine)', letterSpacing: '0.05em' }}>Suprada</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--wine)', opacity: 0.8, borderTop: '1px solid rgba(94, 39, 53, 0.15)', paddingTop: '1.2rem', fontWeight: 500 }}>
                  <span>Kanakapura, Karnataka</span>
                  <span>www.suprada.in</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
