import React from 'react';
import HeroSection from '../components/HeroSection';
import { Sparkles, ArrowRight, GraduationCap, Heart } from 'lucide-react';

export default function HomePage({ data, onNavigateHash }) {
  const bio = data?.biography || {};
  const classesList = data?.classes || [];
  const teacher = data?.teacher || {};

  return (
    <div className="page-wrapper">
      {/* Visual Hero Section */}
      <HeroSection data={data} onNavigateHash={onNavigateHash} />

      {/* QUICK SECTION HIGHLIGHT CARDS & PREVIEWS */}
      <section className="about-section" style={{ padding: '5rem 1.5rem' }}>
        <div className="section-header">
          <div className="section-badge"><Sparkles size={14} /><span>Artist Overview</span></div>
          <h2 className="section-title">About Leela Narayan</h2>
          <div className="gold-divider" />
        </div>

        <div className="about-container">
          <div className="about-image-card">
            <img src={bio.profileImage} alt="Leela Narayan" />
          </div>
          <div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {bio.storyParagraphs?.[0]}
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
              {bio.storyParagraphs?.[1]}
            </p>
            <button onClick={() => onNavigateHash('#about')} className="btn-primary">
              <span>Read Full Biography Page</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Music Classes Preview */}
      <section className="classes-section" style={{ padding: '5rem 1.5rem' }}>
        <div className="section-header">
          <div className="section-badge"><GraduationCap size={14} /><span>Vocal Academy</span></div>
          <h2 className="section-title">Learn Music with Leela Narayan</h2>
          <div className="gold-divider" />
        </div>

        <div className="classes-grid">
          {classesList.slice(0, 2).map(cls => (
            <div key={cls.id} className="class-card">
              <div>
                <span className="class-category-badge">{cls.category}</span>
                <h3 className="class-title">{cls.title}</h3>
                <p className="class-summary">{cls.summary}</p>
              </div>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--gold-dark)', marginBottom: '1rem' }}>{cls.fee}</div>
                <button onClick={() => onNavigateHash('#register')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Register for Class
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button onClick={() => onNavigateHash('#classes')} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>
            <span>Explore All Classes & Fees</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Guru Preview */}
      <section className="teacher-section" style={{ padding: '5rem 1.5rem' }}>
        <div className="section-header">
          <div className="section-badge"><Heart size={14} /><span>Guru Homage</span></div>
          <h2 className="section-title">My Teacher & Musical Inspiration</h2>
          <div className="gold-divider" />
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-border)' }}>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {teacher.name}
          </h3>
          <p style={{ fontStyle: 'italic', color: 'var(--gold-dark)', marginBottom: '1rem' }}>{teacher.title}</p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>"{teacher.quote}"</p>
          <button onClick={() => onNavigateHash('#teacher')} className="btn-secondary">
            <span>Read Guru Homage Page</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
