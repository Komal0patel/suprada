import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{ 
      backgroundColor: 'var(--raisin-black)', 
      color: 'var(--isabelline)', 
      padding: '7rem 10% 4rem 10%', 
      borderTop: '1px solid rgba(244, 240, 236, 0.05)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Background Soft Glow */}
      <div style={{ 
        position: 'absolute', right: '-10%', bottom: '-10%', width: '500px', height: '500px', 
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.04) 0%, rgba(0,0,0,0) 70%)', 
        pointerEvents: 'none' 
      }}></div>

      <div className="footer-grid-mobile" style={{ 
        maxWidth: '1200px', margin: '0 auto', 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '4rem', textCombineUpright: 'none', position: 'relative', zIndex: 2 
      }}>
        {/* Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img src="/assets/logo.svg" alt="Suprada Logo" style={{ height: '35px' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', letterSpacing: '0.08em', color: 'var(--tan)', fontWeight: 500 }}>Suprada</span>
          </div>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.7, fontWeight: 300 }}>
            Ancient wisdom for modern wellness by the sacred Suvarnamukhi River. Experience true healing through authentic Naturopathy &amp; Yoga.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            <span style={{ cursor: 'pointer' }} className="hover-tan">📸</span>
            <span style={{ cursor: 'pointer' }} className="hover-tan">🎥</span>
            <span style={{ cursor: 'pointer' }} className="hover-tan">👥</span>
          </div>
        </div>

        {/* Company Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--tan)', margin: 0, fontWeight: 500 }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
            <li onClick={() => onNavigate('home')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Home</li>
            <li onClick={() => onNavigate('about')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">About Us</li>
            <li onClick={() => onNavigate('spaces')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Our Spaces</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Wellness Programs</li>
            <li onClick={() => onNavigate('gallery')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Gallery</li>
            <li onClick={() => onNavigate('careers')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Careers</li>
            <li onClick={() => onNavigate('contact')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Contact Us</li>
          </ul>
        </div>

        {/* Treatments links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--tan)', margin: 0, fontWeight: 500 }}>Treatments Focus</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Detoxification</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Weight Management</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Stress Management</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Diabetes Care</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Pain &amp; Joints</li>
            <li onClick={() => onNavigate('programmes')} style={{ cursor: 'pointer', opacity: 0.8 }} className="hover-tan">Digestive Health</li>
          </ul>
        </div>

        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--tan)', margin: 0, fontWeight: 500 }}>Get in Touch</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <li style={{ opacity: 0.8 }}>
              📍 Suprada Wellness Estate, By the River Suvarnamukhi, Kanakapura Road, Bangalore, India
            </li>
            <li style={{ opacity: 0.8 }}>
              📞 +91 98765 54321
            </li>
            <li style={{ opacity: 0.8 }}>
              ✉️ info@supradawellness.com
            </li>
            <li style={{ opacity: 0.8, fontSize: '0.78rem' }}>
              ⏰ Mon - Sun: 9:00 AM - 7:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', margin: '4rem auto 0 auto', 
        paddingTop: '2rem', borderTop: '1px solid rgba(244, 240, 236, 0.08)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', opacity: 0.6,
        position: 'relative', zIndex: 2 
      }}>
        <span>© {new Date().getFullYear()} Suprada Wellness. All rights reserved.</span>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span style={{ cursor: 'pointer' }} className="hover-tan">Privacy Policy</span>
          <span style={{ cursor: 'pointer' }} className="hover-tan">Terms of Service</span>
          <span style={{ cursor: 'pointer' }} className="hover-tan">Medical Disclaimer</span>
        </div>

        <span>Powered by Mahati Innovations Private Limited</span>
      </div>
    </footer>
  );
}
