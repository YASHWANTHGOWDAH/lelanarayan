import React from 'react';
import RegistrationSection from '../components/RegistrationSection';
import { GraduationCap } from 'lucide-react';

export default function RegistrationPage({ onAddRegistration, contactInfo }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <GraduationCap size={14} />
          <span>Student Enrollment Page</span>
        </div>
        <h1 className="section-title">Register for Music Classes</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Fill in your details below to enroll in Leela Narayan's online or offline music academy."
        </p>
      </div>

      <RegistrationSection onAddRegistration={onAddRegistration} contactInfo={contactInfo} />
    </div>
  );
}
