import React from 'react';
import { Sparkles, Quote, Heart, BookOpen, Award } from 'lucide-react';

export default function TeacherSection({ data }) {
  const teacher = data?.teacher || {};

  return (
    <section id="teacher" className="teacher-section">
      <div className="section-header">
        <div className="section-badge">
          <Heart size={14} />
          <span>Guru Parampara & Homage</span>
        </div>
        <h2 className="section-title">My Teacher & Musical Inspiration</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Honoring the lineage of legendary masters who shaped my vocal journey and art."
        </p>
      </div>

      <div className="teacher-card">
        {/* Left Photo Frame */}
        <div>
          <div className="teacher-photo-frame">
            <img
              src={teacher.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"}
              alt={teacher.name || "Guru Photograph"}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', fontWeight: '700' }}>
              {teacher.tradition || "Hindustani Classical Tradition"}
            </span>
          </div>
        </div>

        {/* Right Details */}
        <div>
          <h3 style={{ fontSize: '2.25rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            {teacher.name || "Vidushi Saraswati Devi"}
          </h3>
          <div style={{ fontSize: '1.1rem', color: 'var(--gold-dark)', fontWeight: '600', marginBottom: '1.5rem', fontFamily: 'var(--font-serif-sub)', fontStyle: 'italic' }}>
            {teacher.title || "Revered Guru & Classical Doyen"}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.7' }}>
            <p><strong>Background & Lineage:</strong> {teacher.background}</p>
            <p><strong>Qualifications & Mastery:</strong> {teacher.qualifications}</p>
            <p><strong>Relationship & Mentorship:</strong> {teacher.relationship}</p>
            <p><strong>Key Lessons & Influence:</strong> {teacher.influence}</p>
          </div>

          {/* Reverent Quote */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--gold-primary)' }}>
            <Quote size={20} style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem' }} />
            <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif-sub)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
              "{teacher.quote || "Music is not just something we learn; it is something we experience, preserve and share."}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
