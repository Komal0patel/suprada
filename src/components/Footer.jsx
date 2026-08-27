import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer-normal-section">
      <div className="footer-normal-container">
        
        {/* 4-Column Clean Normal Footer Layout */}
        <div className="footer-normal-grid">
          
          {/* Column 1: Brand & Philosophy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
              <img src="/assets/logo.svg" alt="Suprada Logo" style={{ height: '38px' }} />
              <div>
                <span style={{ fontSize: '1.7rem', color: 'var(--wine)', fontWeight: 600, display: 'block', lineHeight: 1 }}>
                  Suprada
                </span>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--redwood)', opacity: 0.9, fontWeight: 500 }}>
                  Naturopathy &amp; Yoga Sanctuary
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'rgba(94, 39, 53, 0.82)', lineHeight: 1.65, margin: 0 }}>
              Ancient wisdom for modern wellness by the sacred Suvarnamukhi River. Experience true cellular healing through doctor-guided Naturopathy, classical Yoga, and organic living.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-normal-social" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-normal-social" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-normal-social" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://wa.me/919876554321" target="_blank" rel="noreferrer" className="footer-normal-social" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columns 2 & 3 Duo Wrapper */}
          <div className="footer-links-duo">
            {/* Column 2: Quick Links */}
            <div>
              <h4 className="footer-normal-title">Explore Suprada</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <span onClick={() => onNavigate('home')} className="footer-normal-link">Home Sanctuary</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('about')} className="footer-normal-link">About Us</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('spaces')} className="footer-normal-link">Our Spaces</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Retreat Programs</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('gallery')} className="footer-normal-link">Gallery</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('careers')} className="footer-normal-link">Careers</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('contact')} className="footer-normal-link">Contact Us</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Treatments */}
            <div>
              <h4 className="footer-normal-title">Treatments Focus</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Cellular Detoxification</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Weight Management</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Stress &amp; Sleep Restorative</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Diabetes Care</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Pain &amp; Joints Wellness</span>
                </li>
                <li>
                  <span onClick={() => onNavigate('programmes')} className="footer-normal-link">Digestive Health</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h4 className="footer-normal-title">Get in Touch</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.86rem', color: 'rgba(94, 39, 53, 0.85)', lineHeight: 1.6 }}>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--redwood)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '3px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Suprada Estate, By River Suvarnamukhi, Kanakapura Road, Bangalore, India</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--redwood)" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+91 98765 54321</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--redwood)" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>admissions@supradawellness.com</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', opacity: 0.8, fontSize: '0.8rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Mon - Sun: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-normal-bottom">
          <div>
            © {new Date().getFullYear()} Suprada Naturopathy &amp; Yoga Sanctuary. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span onClick={() => onNavigate('contact')} className="footer-normal-link" style={{ fontSize: '0.8rem' }}>Privacy Policy</span>
            <span onClick={() => onNavigate('contact')} className="footer-normal-link" style={{ fontSize: '0.8rem' }}>Terms of Service</span>
            <span onClick={() => onNavigate('contact')} className="footer-normal-link" style={{ fontSize: '0.8rem' }}>Medical Disclaimer</span>
          </div>

          <div>
            Powered by <strong style={{ color: 'var(--wine)', fontWeight: 600 }}>Mahati Innovations Private Limited</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
