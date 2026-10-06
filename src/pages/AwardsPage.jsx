import React from 'react';
import AwardsSection from '../components/AwardsSection';
import { Trophy } from 'lucide-react';

export default function AwardsPage({ data }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Trophy size={14} />
          <span>Awards & Achievements Page</span>
        </div>
        <h1 className="section-title">Awards & Achievements</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Celebrating national titles, state honors, and contributions to music & media presentation."
        </p>
      </div>

      <AwardsSection data={data} />
    </div>
  );
}
