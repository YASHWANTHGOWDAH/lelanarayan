import React from 'react';
import { Music, Lock, Heart, Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

export default function Footer({ currentHash, onNavigateHash, onOpenAdmin }) {
  const quickLinks = [
    { name: 'Home', hash: '#home' },
    { name: 'About', hash: '#about' },
    { name: 'Music Classes', hash: '#classes' },
    { name: 'Register', hash: '#register' },
    { name: 'Teacher', hash: '#teacher' },
    { name: 'Awards & Achievements', hash: '#awards' },
    { name: 'Upcoming Events', hash: '#events' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Contact', hash: '#contact' },
  ];

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    onNavigateHash(hash);
  };

  const activeHash = currentHash || '#home';

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Summary */}
        <div>
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="brand-logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
            <div className="brand-icon-box" style={{ width: '36px', height: '36px' }}>
              <Music size={20} />
            </div>
            <span>Leela Narayan</span>
          </a>

          <div style={{ color: 'var(--gold-light)', fontWeight: '600', fontSize: '0.95rem', marginBottom: '1rem' }}>
            Artist | Anchor | Musician
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', maxWidth: '400px', lineHeight: '1.6' }}>
            Celebrating the beauty of music, art and expression through performance, teaching and a lifelong journey in Indian classical and light music.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
            Website Pages
          </h4>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.hash}
                  onClick={(e) => handleLinkClick(e, link.hash)}
                  style={{
                    color: activeHash === link.hash ? 'var(--gold-light)' : 'rgba(255,255,255,0.75)',
                    fontSize: '0.9rem',
                    fontWeight: activeHash === link.hash ? '600' : '400',
                    transition: 'var(--transition)'
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect & Admin */}
        <div>
          <h4 style={{ color: 'var(--gold-light)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
            Connect With Leela
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Bengaluru, Karnataka, India
          </p>

          <div className="social-links" style={{ marginBottom: '1.5rem' }}>
            <a href="https://instagram.com/leelanarayan_official" target="_blank" rel="noreferrer" className="social-icon-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: 'none' }}>
              <Instagram size={18} />
            </a>
            <a href="https://youtube.com/@leelanarayanmusic" target="_blank" rel="noreferrer" className="social-icon-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: 'none' }}>
              <Youtube size={18} />
            </a>
            <a href="https://facebook.com/leelanarayan.artist" target="_blank" rel="noreferrer" className="social-icon-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: 'none' }}>
              <Facebook size={18} />
            </a>
            <a href="https://linkedin.com/in/leela-narayan" target="_blank" rel="noreferrer" className="social-icon-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: 'none' }}>
              <Linkedin size={18} />
            </a>
          </div>

          <button
            onClick={onOpenAdmin}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(197, 160, 89, 0.2)',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              color: 'var(--gold-light)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <Lock size={14} />
            <span>Admin Dashboard Modal</span>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © 2026 Leela Narayan. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Crafted with <Heart size={14} style={{ color: 'var(--gold-primary)' }} /> for Music & Arts
        </div>
      </div>
    </footer>
  );
}
