import React, { useState } from 'react';
import { Menu, X, Music, Lock, GraduationCap, Phone } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar({ currentHash, onNavigateHash, onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', hash: '#home' },
    { name: 'About', hash: '#about' },
    { name: 'Music Classes', hash: '#classes' },
    { name: 'Teacher', hash: '#teacher' },
    { name: 'Awards & Achievements', hash: '#awards' },
    { name: 'Upcoming Events', hash: '#events' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Contact', hash: '#contact' },
  ];

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    onNavigateHash(hash);
    setMobileOpen(false);
  };

  const activeHash = currentHash || '#home';

  return (
    <header className="site-header shadow-md">
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <div className="brand-icon-box">
            <Music size={22} />
          </div>
          <div>
            <span>Leela Narayan</span>
            <span className="brand-sub">Artist • Anchor • Musician</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              onClick={(e) => handleLinkClick(e, link.hash)}
              className={`nav-link ${activeHash === link.hash ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <AudioPlayer />

          <a
            href="#register"
            onClick={(e) => handleLinkClick(e, '#register')}
            className="btn-primary"
            style={{ padding: '0.6rem 1.3rem', fontSize: '0.88rem' }}
          >
            <GraduationCap size={16} />
            <span>Join Music Class</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className="social-icon-btn"
            style={{ width: '36px', height: '36px' }}
            title="Admin Dashboard Modal"
            aria-label="Admin Dashboard"
          >
            <Lock size={15} />
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`drawer-backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div className="brand-logo">
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <Music size={18} />
            </div>
            <span style={{ fontSize: '1.2rem' }}>Leela Narayan</span>
          </div>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              onClick={(e) => handleLinkClick(e, link.hash)}
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: activeHash === link.hash ? 'var(--gold-dark)' : 'var(--text-primary)'
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a
            href="#register"
            onClick={(e) => handleLinkClick(e, '#register')}
            className="btn-primary"
            style={{ justifyContent: 'center' }}
          >
            <GraduationCap size={18} />
            <span>Join Music Class</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="btn-secondary"
            style={{ justifyContent: 'center' }}
          >
            <Phone size={18} />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </header>
  );
}
