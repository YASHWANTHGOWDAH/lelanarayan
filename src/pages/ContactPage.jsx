import React from 'react';
import ContactSection from '../components/ContactSection';
import { Mail } from 'lucide-react';

export default function ContactPage({ data, onAddInquiry }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Mail size={14} />
          <span>Contact Page</span>
        </div>
        <h1 className="section-title">Get in Touch</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Reach out for concert bookings, anchoring inquiries, music academy admissions, or media collaborations."
        </p>
      </div>

      <ContactSection data={data} onAddInquiry={onAddInquiry} />
    </div>
  );
}
