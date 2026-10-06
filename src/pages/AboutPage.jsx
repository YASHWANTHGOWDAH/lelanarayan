import React from 'react';
import AboutSection from '../components/AboutSection';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';

export default function AboutPage({ data, onNavigate }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Dedicated Biography Page</span>
        </div>
        <h1 className="section-title">Biography of Leela Narayan</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Classical & Semi-Classical Vocalist, Stage Anchor, and Dedicated Music Educator based in Bengaluru, India."
        </p>
      </div>

      <AboutSection data={data} />

      <div style={{ textAlign: 'center', margin: '4rem 0 2rem 0' }}>
        <button onClick={() => onNavigate('/classes')} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
          <GraduationCap size={20} />
          <span>Explore Music Classes with Leela</span>
        </button>
      </div>
    </div>
  );
}
