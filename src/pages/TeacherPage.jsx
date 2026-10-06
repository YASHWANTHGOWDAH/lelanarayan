import React from 'react';
import TeacherSection from '../components/TeacherSection';
import { Heart } from 'lucide-react';

export default function TeacherPage({ data }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Heart size={14} />
          <span>Guru Parampara & Inspiration Page</span>
        </div>
        <h1 className="section-title">My Teacher & Musical Inspiration</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Honoring the lineage of legendary masters who shaped my vocal journey and art."
        </p>
      </div>

      <TeacherSection data={data} />
    </div>
  );
}
