import React from 'react';
import { Mic, Radio, Music, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';

export default function HeroSection({ data, onNavigateHash }) {
  const bio = data?.biography || {};

  const handleNav = (e, hash) => {
    e.preventDefault();
    if (onNavigateHash) {
      onNavigateHash(hash);
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Copy */}
        <div style={{ zIndex: 2 }}>
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>Classical Vocalist • Presenter • Guru</span>
          </div>

          <h1 className="hero-heading">
            Leela Narayan
          </h1>

          <div className="hero-subtitle-line gold-gradient-text">
            {bio.heroTagline || "Artist | Anchor | Musician"}
          </div>

          <p className="hero-intro">
            {bio.heroIntro || "Celebrating the beauty of music, art and expression through performance, teaching and a lifelong journey in the arts."}
          </p>

          <div className="hero-buttons">
            <a href="#about" onClick={(e) => handleNav(e, '#about')} className="btn-primary">
              <span>Explore My Journey</span>
              <ArrowRight size={18} />
            </a>

            <a href="#classes" onClick={(e) => handleNav(e, '#classes')} className="btn-secondary">
              <GraduationCap size={18} />
              <span>Join Music Classes</span>
            </a>
          </div>
        </div>

        {/* Right Artist Portrait Frame */}
        <div className="hero-image-wrapper">
          <div style={{ position: 'absolute', inset: '-30px', opacity: 0.12, pointerEvents: 'none', zIndex: 1 }}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path fill="#C5A059" d="M44.7,-58.2C56.6,-48.5,64,-33.2,67.8,-17.1C71.6,-1,71.8,15.9,64.7,29.8C57.6,43.7,43.2,54.7,27.1,61.8C11,68.9,-6.8,72,-24.1,67.2C-41.4,62.4,-58.2,49.7,-66.6,33.1C-75,16.5,-75,-4,-68.2,-21.2C-61.4,-38.4,-47.8,-52.3,-33.1,-60.7C-18.4,-69.1,-2.6,-72,12.7,-68.7C28,-65.4,32.8,-67.9,44.7,-58.2Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="hero-image-frame" style={{ zIndex: 2 }}>
            <img
              src={bio.profileImage || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000"}
              alt="Leela Narayan - Artist, Anchor & Musician"
            />
          </div>

          {/* Floating Badge */}
          <div className="floating-music-badge" style={{ zIndex: 3 }}>
            <div className="brand-icon-box" style={{ width: '44px', height: '44px' }}>
              <Music size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>15+ Years</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dedicated to Music & Arts</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 HIGHLIGHT CARDS BELOW HERO */}
      <div className="highlights-grid">
        <div className="highlight-card" onClick={(e) => handleNav(e, '#about')} style={{ cursor: 'pointer' }}>
          <div className="highlight-icon-box">
            <Mic size={26} />
          </div>
          <h3 className="highlight-title">🎤 Artist</h3>
          <p className="highlight-desc">
            Professional stage performances, classical recitals, and emotive artistic expression across India & globally.
          </p>
        </div>

        <div className="highlight-card" onClick={(e) => handleNav(e, '#events')} style={{ cursor: 'pointer' }}>
          <div className="highlight-icon-box">
            <Radio size={26} />
          </div>
          <h3 className="highlight-title">🎙️ Anchor</h3>
          <p className="highlight-desc">
            Hosting prestigious cultural festivals, television shows, and corporate events with grace, warmth & confidence.
          </p>
        </div>

        <div className="highlight-card" onClick={(e) => handleNav(e, '#classes')} style={{ cursor: 'pointer' }}>
          <div className="highlight-icon-box">
            <Music size={26} />
          </div>
          <h3 className="highlight-title">🎵 Music</h3>
          <p className="highlight-desc">
            Nurturing aspiring singers, conducting masterclasses, and sharing the joy of music with students worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
