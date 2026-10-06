import React from 'react';
import { Sparkles, Check, GraduationCap, Clock, Globe, Users, BookOpen, CreditCard, Calendar } from 'lucide-react';

export default function ClassesSection({ data }) {
  const classesList = data?.classes || [];

  return (
    <section id="classes" className="classes-section">
      <div className="section-header">
        <div className="section-badge">
          <GraduationCap size={14} />
          <span>Vocal Academy</span>
        </div>
        <h2 className="section-title">Learn Music with Leela Narayan</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Discover your voice, develop your musical skills and experience the joy of learning music."
        </p>
      </div>

      {/* Course Cards Grid */}
      <div className="classes-grid">
        {classesList.map((cls) => (
          <div key={cls.id} className="class-card">
            <div>
              <span className="class-category-badge">{cls.level || cls.category}</span>
              <h3 className="class-title">{cls.title}</h3>
              <p className="class-summary">{cls.summary}</p>

              <ul className="class-feature-list">
                {(cls.features || []).map((feat, i) => (
                  <li key={i}>
                    <Check size={16} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fee & Schedule</div>
                <div style={{ fontWeight: '700', color: 'var(--gold-dark)', fontSize: '0.95rem' }}>{cls.fee}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{cls.schedule}</div>
              </div>

              <a
                href="#register"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}
              >
                <span>Register for {cls.category}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CLASS FORMAT & ESSENTIAL INFORMATION GRID */}
      <div className="course-overview-card">
        <div style={{ textAlignment: 'center', marginBottom: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>Class Format & Features</h3>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need to know about joining Leela Narayan's music academy</p>
        </div>

        <div className="overview-grid">
          <div className="overview-item">
            <div className="overview-icon">
              <Globe size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Mode of Learning</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Online:</strong> Live interactive HD classes on Zoom/Meet.<br />
                <strong>Offline:</strong> Personal studio sessions in Bengaluru.
              </p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-icon">
              <Users size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Batch Structure</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Choose between <strong>Individual 1-on-1 Mentorship</strong> or <strong>Small Focused Batches (Max 5 Students)</strong> for personal attention.
              </p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-icon">
              <Clock size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Duration & Frequency</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                60-minute weekly sessions, custom riyaz audio files provided for home practice.
              </p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-icon">
              <BookOpen size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Curriculum & Materials</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Structured notes, swara exercises, ragas, devotional bhajans, and sugama sangeetha songbooks.
              </p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Age & Eligibility</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Open to children (Age 6+), working professionals, adults, and senior music enthusiasts. No prior test required!
              </p>
            </div>
          </div>

          <div className="overview-item">
            <div className="overview-icon">
              <Calendar size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Flexible Scheduling</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Morning and evening slots available on both weekdays & weekends to suit your convenience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#register" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
            <GraduationCap size={20} />
            <span>Register for Music Class</span>
          </a>
        </div>
      </div>
    </section>
  );
}
