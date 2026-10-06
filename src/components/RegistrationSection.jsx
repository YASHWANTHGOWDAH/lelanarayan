import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle, Phone, Mail, MessageSquare, AlertCircle } from 'lucide-react';

export default function RegistrationSection({ onAddRegistration, contactInfo }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    age: '',
    gender: 'Female',
    phone: '',
    email: '',
    city: 'Bengaluru',
    preferredClass: 'Vocal Music',
    experienceLevel: 'Beginner',
    preferredMode: 'Online',
    preferredDays: 'Weekends',
    preferredTime: 'Morning',
    trainingDetails: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onAddRegistration(formData);
      setIsSubmitting(false);
      setShowModal(true);
      // Reset form
      setFormData({
        studentName: '',
        parentName: '',
        age: '',
        gender: 'Female',
        phone: '',
        email: '',
        city: 'Bengaluru',
        preferredClass: 'Vocal Music',
        experienceLevel: 'Beginner',
        preferredMode: 'Online',
        preferredDays: 'Weekends',
        preferredTime: 'Morning',
        trainingDetails: '',
        message: ''
      });
    } catch (err) {
      setIsSubmitting(false);
      alert('Registration failed. Please check your connection or try again.');
    }
  };

  const phoneClean = contactInfo?.whatsappNumber || "919876543210";
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent("Hello Leela Narayan, I would like to inquire about registering for music classes.")}`;

  return (
    <section id="register" className="registration-section">
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Student Enrollment</span>
        </div>
        <h2 className="section-title">Register for Music Classes</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Begin your musical journey under expert guidance. Fill in your details below to secure a batch slot.
        </p>
      </div>

      <div className="registration-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Student Name */}
            <div className="form-group">
              <label className="form-label">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Full name of student"
                className="form-input"
              />
              {errors.studentName && <span className="form-error">{errors.studentName}</span>}
            </div>

            {/* Parent / Guardian Name */}
            <div className="form-group">
              <label className="form-label">Parent / Guardian Name (If minor)</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent's name"
                className="form-input"
              />
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 14 or 28"
                className="form-input"
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="form-input"
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className="form-input"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="form-label">City / Location</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Bengaluru, Mumbai, London"
                className="form-input"
              />
            </div>

            {/* Preferred Class */}
            <div className="form-group">
              <label className="form-label">Preferred Class Category</label>
              <select name="preferredClass" value={formData.preferredClass} onChange={handleChange} className="form-select">
                <option value="Vocal Music">Vocal Music (Comprehensive)</option>
                <option value="Beginner Classes">Beginner Classes (Swara Foundation)</option>
                <option value="Intermediate Classes">Intermediate Classes (Raga & Sugama Sangeetha)</option>
                <option value="Advanced Training">Advanced Training (1-on-1 Concert Prep)</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="form-group">
              <label className="form-label">Prior Experience Level</label>
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="form-select">
                <option value="Beginner">Beginner (No prior training)</option>
                <option value="Intermediate">Intermediate (1-3 years basic practice)</option>
                <option value="Advanced">Advanced (3+ years classical training)</option>
              </select>
            </div>

            {/* Preferred Mode */}
            <div className="form-group">
              <label className="form-label">Preferred Learning Mode</label>
              <select name="preferredMode" value={formData.preferredMode} onChange={handleChange} className="form-select">
                <option value="Online">Online (Zoom / Google Meet)</option>
                <option value="Offline">Offline Studio (Malleshwaram, Bengaluru)</option>
                <option value="Flexible">Flexible (Hybrid)</option>
              </select>
            </div>

            {/* Preferred Days */}
            <div className="form-group">
              <label className="form-label">Preferred Days</label>
              <select name="preferredDays" value={formData.preferredDays} onChange={handleChange} className="form-select">
                <option value="Weekends">Weekends (Saturday / Sunday)</option>
                <option value="Weekdays">Weekdays (Mon / Wed / Fri)</option>
                <option value="Flexible">Any Day / Flexible</option>
              </select>
            </div>

            {/* Preferred Time */}
            <div className="form-group">
              <label className="form-label">Preferred Time Slot</label>
              <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="form-select">
                <option value="Morning">Morning (8:00 AM - 11:00 AM)</option>
                <option value="Afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Evening">Evening (5:00 PM - 8:30 PM)</option>
              </select>
            </div>

            {/* Previous Musical Training */}
            <div className="form-group full-width">
              <label className="form-label">Previous Musical Training / Instruments Played (Optional)</label>
              <input
                type="text"
                name="trainingDetails"
                value={formData.trainingDetails}
                onChange={handleChange}
                placeholder="Mention any past gurus, examinations, or instruments learned..."
                className="form-input"
              />
            </div>

            {/* Message */}
            <div className="form-group full-width">
              <label className="form-label">Additional Message or Specific Goals</label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you hope to achieve in your musical journey..."
                className="form-textarea"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', maxWidth: '380px', justifyContent: 'center', padding: '0.9rem 2rem', fontSize: '1.05rem' }}
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Direct Action Enquiry Bar */}
        <div className="contact-quick-options">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp">
            <MessageSquare size={18} />
            <span>WhatsApp Enquiry</span>
          </a>

          <a href={`mailto:${contactInfo?.email || 'contact@leelanarayan.com'}`} className="btn-secondary">
            <Mail size={18} />
            <span>Email Enquiry</span>
          </a>

          <a href={`tel:${contactInfo?.phoneClean || '+919876543210'}`} className="btn-secondary">
            <Phone size={18} />
            <span>Call Directly</span>
          </a>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="registration-card" style={{ maxWidth: '520px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
              Registration Submitted!
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Thank you for your interest in learning music with <strong>Leela Narayan</strong>. We will contact you shortly to confirm your batch time and schedule.
            </p>
            <button onClick={() => setShowModal(false)} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
