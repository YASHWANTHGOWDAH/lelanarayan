import React, { useState } from 'react';
import { Award, Trophy, Star, Sparkles, ExternalLink, Eye, X } from 'lucide-react';

export default function AwardsSection({ data }) {
  const awardsList = data?.awards || [];
  const [selectedAward, setSelectedAward] = useState(null);

  return (
    <section id="awards" className="awards-section">
      <div className="section-header">
        <div className="section-badge">
          <Trophy size={14} />
          <span>Honors & Recognition</span>
        </div>
        <h2 className="section-title">Awards & Achievements</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Celebrating milestones, state honors, and contributions to music & media presentation."
        </p>
      </div>

      <div className="awards-grid">
        {awardsList.map((award) => (
          <div key={award.id} className="award-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="award-trophy-icon">
                  <Trophy size={24} />
                </div>
                <span className="award-year-tag">{award.year}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {award.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: '600', marginBottom: '0.75rem' }}>
                Presented by: {award.organization}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {award.description}
              </p>
            </div>

            {award.image && (
              <button
                onClick={() => setSelectedAward(award)}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.5rem 1rem', fontSize: '0.82rem' }}
              >
                <Eye size={14} />
                <span>View Certificate / Photo</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Certificate Modal */}
      {selectedAward && (
        <div className="lightbox-modal" onClick={() => setSelectedAward(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedAward(null)}>
              <X size={32} />
            </button>

            <img src={selectedAward.image} alt={selectedAward.title} />

            <div style={{ marginTop: '1rem', color: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{selectedAward.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                {selectedAward.year} • {selectedAward.organization}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
