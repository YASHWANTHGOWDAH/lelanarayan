import React from 'react';
import ClassesSection from '../components/ClassesSection';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function ClassesPage({ data, onNavigate }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <GraduationCap size={14} />
          <span>Vocal Academy & Courses Page</span>
        </div>
        <h1 className="section-title">Learn Music with Leela Narayan</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Discover your voice, develop your musical skills and experience the joy of learning music."
        </p>
      </div>

      <ClassesSection data={data} />

      <div style={{ textAlign: 'center', margin: '4rem 0 2rem 0' }}>
        <button onClick={() => onNavigate('/register')} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          <GraduationCap size={20} />
          <span>Proceed to Music Class Registration Form</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
