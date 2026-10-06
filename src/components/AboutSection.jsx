import React from 'react';
import { Sparkles, Quote, Award, Calendar, Heart } from 'lucide-react';

export default function AboutSection({ data }) {
  const bio = data?.biography || {};
  const paragraphs = bio.storyParagraphs || [];
  const timeline = bio.timeline || [];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Biographical Portrait</span>
        </div>
        <h2 className="section-title">{bio.aboutHeading || "About Leela Narayan"}</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "A lifetime devoted to classical melody, stage eloquence, and preserving Indian cultural heritage."
        </p>
      </div>

      <div className="about-container">
        {/* Left Column: Portrait & Quote */}
        <div>
          <div className="about-image-card">
            <img
              src={bio.profileImage || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000"}
              alt="Leela Narayan Portrait"
            />
          </div>

          <div className="about-quote-box">
            <Quote size={24} style={{ color: 'var(--gold-primary)', marginBottom: '0.5rem' }} />
            <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>
              {bio.philosophy || "Music is not just something we learn; it is something we experience, preserve and share."}
            </p>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--gold-dark)' }}>— Leela Narayan</span>
          </div>
        </div>

        {/* Right Column: Detailed Narrative */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {/* Core Strengths */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2.5rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                Hindustani & Light
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Vocal Excellence & Raga Mastery</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                State & TV Anchor
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>100+ Prestigious Events Hosted</div>
            </div>
          </div>
        </div>
      </div>

      {/* ARTISTIC JOURNEY TIMELINE */}
      <div style={{ maxWidth: '1000px', margin: '5rem auto 0 auto' }}>
        <div style={{ textAlignment: 'center', marginBottom: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>Artistic Journey & Milestones</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Key chapters in her musical evolution</p>
        </div>

        <div className="timeline-container">
          {timeline.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-node" />
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.3rem 0', color: 'var(--text-primary)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
