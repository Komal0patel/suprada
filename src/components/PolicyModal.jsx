import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function PolicyModal({ policy, onClose }) {
  useEffect(() => {
    if (policy) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      };
    }
  }, [policy]);

  if (!policy) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 10, 8, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 9999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'hidden'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '780px',
            maxHeight: '86vh',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              backgroundColor: 'rgba(94, 39, 53, 0.08)',
              color: 'var(--wine)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-gold"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Modal Header — Clean Typography, No Images */}
          <div
            style={{
              padding: '1.8rem 2.2rem 1.2rem 2.2rem',
              borderBottom: '1px solid rgba(94, 39, 53, 0.12)',
              paddingRight: '4rem',
              flexShrink: 0,
              backgroundColor: '#ffffff'
            }}
          >
            <span
              style={{
                color: 'var(--redwood)',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem',
                fontFamily: 'var(--font-body)'
              }}
            >
              ✦ {policy.category || 'RESORT POLICIES'}
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 1.9rem)',
                margin: 0,
                fontWeight: 700,
                color: 'var(--wine)',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.2
              }}
            >
              {policy.title}
            </h2>
          </div>

          {/* Modal Scrollable Body — Clean Point-by-Point Alignment */}
          <div
            style={{
              padding: '1.6rem 2.2rem 2rem 2.2rem',
              overflowY: 'auto',
              flex: 1,
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Standard Point-by-Point List */}
            {policy.points && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {policy.points.map((pt, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.8rem',
                      backgroundColor: 'var(--isabelline)',
                      padding: '0.9rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(94, 39, 53, 0.08)'
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--wine)',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        marginTop: '2px',
                        flexShrink: 0,
                        display: 'inline-block',
                        lineHeight: 1
                      }}
                    >
                      ✦
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        color: 'var(--raisin-black)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}
                    >
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Sectioned Point List (for Pricing Policy) */}
            {policy.sections && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                {policy.sections.map((sec, sIdx) => (
                  <div key={sIdx}>
                    <h3
                      style={{
                        color: 'var(--wine)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        margin: '0 0 0.8rem 0',
                        fontWeight: 700,
                        borderBottom: '2px solid var(--harvest-gold)',
                        paddingBottom: '0.35rem',
                        display: 'inline-block'
                      }}
                    >
                      {sec.heading}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 640 ? '1fr' : '1fr 1fr', gap: '0.65rem' }}>
                      {sec.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            backgroundColor: 'var(--isabelline)',
                            padding: '0.7rem 0.95rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(94, 39, 53, 0.08)'
                          }}
                        >
                          <Check size={15} style={{ color: 'var(--wine)', flexShrink: 0 }} />
                          <span
                            style={{
                              fontSize: '0.9rem',
                              color: 'var(--raisin-black)',
                              fontFamily: 'var(--font-body)',
                              fontWeight: 500
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
