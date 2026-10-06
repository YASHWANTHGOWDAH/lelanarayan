import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Send, MessageSquare, Instagram, Youtube, Facebook, Linkedin, CheckCircle } from 'lucide-react';

export default function ContactSection({ data, onAddInquiry }) {
  const contact = data?.contact || {};
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required.';
    if (!formData.message.trim()) errs.message = 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onAddInquiry(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setIsSubmitting(false);
      alert('Failed to send message. Please try again.');
    }
  };

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber || "919876543210"}?text=${encodeURIComponent("Hello Leela Narayan, I would like to get in touch regarding a performance/anchoring/music inquiry.")}`;

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <div className="section-badge">
          <Mail size={14} />
          <span>Connect & Booking</span>
        </div>
        <h2 className="section-title">Get in Touch</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Reach out for concert bookings, anchoring inquiries, music academy admissions, or media collaborations."
        </p>
      </div>

      <div className="contact-container">
        {/* Left Column: Contact Cards */}
        <div className="contact-info-card">
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1.75rem' }}>
            Contact Information
          </h3>

          <div className="info-item">
            <div className="info-icon">
              <Phone size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone / Enquiries</div>
              <a href={`tel:${contact.phoneClean || '+919876543210'}`} style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {contact.phone || "+91 98765 43210"}
              </a>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <Mail size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Official Email</div>
              <a href={`mailto:${contact.email || 'contact@leelanarayan.com'}`} style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                {contact.email || "contact@leelanarayan.com"}
              </a>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Studio Location</div>
              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {contact.address || "Malleshwaram, Bengaluru, Karnataka, India"}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Follow Leela Narayan
            </div>
            <div className="social-links">
              <a href={contact.socials?.instagram || '#'} target="_blank" rel="noreferrer" className="social-icon-btn" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href={contact.socials?.youtube || '#'} target="_blank" rel="noreferrer" className="social-icon-btn" title="YouTube">
                <Youtube size={20} />
              </a>
              <a href={contact.socials?.facebook || '#'} target="_blank" rel="noreferrer" className="social-icon-btn" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href={contact.socials?.linkedin || '#'} target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
              <MessageSquare size={20} />
              <span>WhatsApp Me</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="registration-card" style={{ margin: 0 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--gold-dark)', display: 'flex', itemsAlign: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                Thank you for reaching out to Leela Narayan. We will get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1.75rem' }}>
                Send a Direct Message
              </h3>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="form-input" />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="form-input" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Purpose</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Concert Booking, Anchoring, Academy" className="form-input" />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Message *</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Write your message here..." className="form-textarea" />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
