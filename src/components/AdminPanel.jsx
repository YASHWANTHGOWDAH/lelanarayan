import React, { useState } from 'react';
import { X, Lock, Save, Trash2, Plus, Download, Search, Filter, Check, RefreshCw, Eye } from 'lucide-react';

export default function AdminPanel({
  isOpen,
  onClose,
  data,
  onSaveData,
  registrations,
  onDeleteRegistration,
  inquiries,
  onDeleteInquiry
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('registrations');

  // Search & Filter state for Registrations
  const [regSearch, setRegSearch] = useState('');
  const [regClassFilter, setRegClassFilter] = useState('All');
  const [selectedReg, setSelectedReg] = useState(null);

  // Editable Site Data Copy
  const [editData, setEditData] = useState(JSON.parse(JSON.stringify(data)));
  const [saveStatus, setSaveStatus] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'leela2026' || passwordInput === 'admin') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Default password is "leela2026".');
    }
  };

  const handleSaveAllData = async () => {
    setSaveStatus('Saving changes...');
    try {
      await onSaveData(editData);
      setSaveStatus('Saved successfully! Site content updated.');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving data.');
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Student Name', 'Parent Name', 'Age', 'Gender', 'Phone', 'Email', 'City', 'Preferred Class', 'Mode', 'Days', 'Time', 'Training Details', 'Message', 'Date Submitted'];
    const rows = registrations.map(r => [
      `"${r.id || ''}"`,
      `"${(r.studentName || '').replace(/"/g, '""')}"`,
      `"${(r.parentName || '').replace(/"/g, '""')}"`,
      `"${r.age || ''}"`,
      `"${r.gender || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      `"${(r.city || '').replace(/"/g, '""')}"`,
      `"${(r.preferredClass || '').replace(/"/g, '""')}"`,
      `"${r.preferredMode || ''}"`,
      `"${r.preferredDays || ''}"`,
      `"${r.preferredTime || ''}"`,
      `"${(r.trainingDetails || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'leela_narayan_registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = (r.studentName || '').toLowerCase().includes(regSearch.toLowerCase()) ||
                          (r.email || '').toLowerCase().includes(regSearch.toLowerCase()) ||
                          (r.phone || '').includes(regSearch);
    const matchesFilter = regClassFilter === 'All' || r.preferredClass === regClassFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-modal-overlay">
      <div className="admin-card">
        {/* Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Lock size={20} style={{ color: 'var(--gold-light)' }} />
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>
              Leela Narayan Website Administration
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Auth Check */}
        {!authenticated ? (
          <div style={{ padding: '4rem 2rem', maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
            <div className="brand-icon-box" style={{ width: '56px', height: '56px', margin: '0 auto 1.5rem auto' }}>
              <Lock size={28} />
            </div>
            <h4 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Admin Security Access</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Enter password to access site management & registration data.</p>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password (default: leela2026)"
                className="form-input"
                autoFocus
              />
              {authError && <div style={{ color: 'var(--accent-terracotta)', fontSize: '0.85rem' }}>{authError}</div>}
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Login to Dashboard
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="admin-tabs">
              <button className={`admin-tab-btn ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')}>
                📊 Student Registrations ({registrations.length})
              </button>
              <button className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
                📩 Direct Messages ({inquiries.length})
              </button>
              <button className={`admin-tab-btn ${activeTab === 'biography' ? 'active' : ''}`} onClick={() => setActiveTab('biography')}>
                👤 Biography & Timeline
              </button>
              <button className={`admin-tab-btn ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
                🎵 Music Classes
              </button>
              <button className={`admin-tab-btn ${activeTab === 'awards' ? 'active' : ''}`} onClick={() => setActiveTab('awards')}>
                🏆 Awards & Achievements
              </button>
              <button className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
                📅 Events & Schedule
              </button>
              <button className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                🖼️ Gallery Portfolio
              </button>
              <button className={`admin-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`} onClick={() => setActiveTab('teacher')}>
                👳 Guru / Teacher Section
              </button>
              <button className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
                📞 Contact & Socials
              </button>
            </div>

            {/* Content Body */}
            <div className="admin-body">
              {/* Save Notification Bar for editable sections */}
              {['biography', 'classes', 'awards', 'events', 'gallery', 'teacher', 'contact'].includes(activeTab) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--gold-border)' }}>
                  <div>
                    <strong>Content Management Mode</strong> — Edit content below and click Save Changes.
                    {saveStatus && <span style={{ marginLeft: '1rem', color: 'var(--gold-dark)', fontWeight: '700' }}>{saveStatus}</span>}
                  </div>
                  <button onClick={handleSaveAllData} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}>
                    <Save size={16} />
                    <span>Save All Changes</span>
                  </button>
                </div>
              )}

              {/* TAB 1: REGISTRATIONS */}
              {activeTab === 'registrations' && (
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexGrow: 1, maxWidth: '600px' }}>
                      <div style={{ position: 'relative', flexGrow: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={regSearch}
                          onChange={e => setRegSearch(e.target.value)}
                          placeholder="Search student, email, phone..."
                          className="form-input"
                          style={{ paddingLeft: '2.5rem' }}
                        />
                      </div>

                      <select
                        value={regClassFilter}
                        onChange={e => setRegClassFilter(e.target.value)}
                        className="form-select"
                        style={{ width: '200px' }}
                      >
                        <option value="All">All Categories</option>
                        <option value="Vocal Music">Vocal Music</option>
                        <option value="Beginner Classes">Beginner Classes</option>
                        <option value="Intermediate Classes">Intermediate Classes</option>
                        <option value="Advanced Training">Advanced Training</option>
                      </select>
                    </div>

                    <button onClick={handleExportCSV} className="btn-secondary" style={{ padding: '0.6rem 1.25rem' }}>
                      <Download size={16} />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {filteredRegistrations.length === 0 ? (
                    <div style={{ padding: '3rem', textAlignment: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No student registrations found matching criteria.
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Class Category</th>
                            <th>Mode</th>
                            <th>Phone & Email</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRegistrations.map((r) => (
                            <tr key={r.id}>
                              <td>
                                <strong>{r.studentName}</strong>
                                {r.parentName && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parent: {r.parentName} (Age {r.age})</div>}
                              </td>
                              <td>{r.preferredClass}</td>
                              <td><span className="award-year-tag">{r.preferredMode}</span></td>
                              <td>
                                <div>{r.phone}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.email}</div>
                              </td>
                              <td>{r.city}</td>
                              <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button onClick={() => setSelectedReg(r)} className="social-icon-btn" style={{ width: '32px', height: '32px' }} title="View Full Details">
                                    <Eye size={14} />
                                  </button>
                                  <button onClick={() => onDeleteRegistration(r.id)} className="social-icon-btn" style={{ width: '32px', height: '32px', color: 'var(--accent-terracotta)' }} title="Delete Registration">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Student View Details Modal */}
                  {selectedReg && (
                    <div className="admin-modal-overlay" onClick={() => setSelectedReg(null)}>
                      <div className="registration-card" style={{ maxWidth: '550px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>Registration Details</h4>
                          <button onClick={() => setSelectedReg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={20} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          <div><strong>Student Name:</strong> {selectedReg.studentName}</div>
                          <div><strong>Parent/Guardian:</strong> {selectedReg.parentName || 'N/A'}</div>
                          <div><strong>Age & Gender:</strong> {selectedReg.age} yrs • {selectedReg.gender}</div>
                          <div><strong>Phone:</strong> {selectedReg.phone}</div>
                          <div><strong>Email:</strong> {selectedReg.email}</div>
                          <div><strong>City:</strong> {selectedReg.city}</div>
                          <div><strong>Preferred Class:</strong> {selectedReg.preferredClass}</div>
                          <div><strong>Experience Level:</strong> {selectedReg.experienceLevel}</div>
                          <div><strong>Learning Mode:</strong> {selectedReg.preferredMode}</div>
                          <div><strong>Preferred Days & Slot:</strong> {selectedReg.preferredDays} ({selectedReg.preferredTime})</div>
                          <div><strong>Training Background:</strong> {selectedReg.trainingDetails || 'None stated'}</div>
                          <div><strong>Message/Note:</strong> {selectedReg.message || 'None'}</div>
                        </div>
                        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                          <button onClick={() => setSelectedReg(null)} className="btn-secondary">Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Received Contact Form Inquiries</h4>
                  {inquiries.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No direct messages received yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {inquiries.map((inq) => (
                        <div key={inq.id} style={{ background: 'var(--bg-card-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{inq.name} ({inq.email})</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}>Phone: {inq.phone || 'N/A'} • Subject: {inq.subject || 'General'}</div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{inq.message}</p>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{new Date(inq.createdAt).toLocaleString()}</div>
                          </div>
                          <button onClick={() => onDeleteInquiry(inq.id)} className="social-icon-btn" style={{ color: 'var(--accent-terracotta)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BIOGRAPHY */}
              {activeTab === 'biography' && (
                <div className="form-grid" style={{ gap: '1.5rem' }}>
                  <div className="form-group full-width">
                    <label className="form-label">Hero Tagline</label>
                    <input
                      type="text"
                      value={editData.biography.heroTagline}
                      onChange={e => setEditData({ ...editData, biography: { ...editData.biography, heroTagline: e.target.value } })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Hero Introduction Sentence</label>
                    <textarea
                      rows={2}
                      value={editData.biography.heroIntro}
                      onChange={e => setEditData({ ...editData, biography: { ...editData.biography, heroIntro: e.target.value } })}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Profile Image URL</label>
                    <input
                      type="text"
                      value={editData.biography.profileImage}
                      onChange={e => setEditData({ ...editData, biography: { ...editData.biography, profileImage: e.target.value } })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Personal Philosophy Quote</label>
                    <input
                      type="text"
                      value={editData.biography.philosophy}
                      onChange={e => setEditData({ ...editData, biography: { ...editData.biography, philosophy: e.target.value } })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Biography Paragraphs (1 per line)</label>
                    <textarea
                      rows={6}
                      value={editData.biography.storyParagraphs.join('\n\n')}
                      onChange={e => setEditData({ ...editData, biography: { ...editData.biography, storyParagraphs: e.target.value.split('\n\n').filter(Boolean) } })}
                      className="form-textarea"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: CLASSES */}
              {activeTab === 'classes' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4>Manage Music Academy Courses</h4>
                    <button
                      onClick={() => {
                        const newCls = {
                          id: `class-${Date.now()}`,
                          category: "Specialized Masterclass",
                          title: "New Music Course Title",
                          summary: "Brief course summary...",
                          level: "Beginner",
                          features: ["Voice culture", "Raga training"],
                          fee: "₹2,500 / Month",
                          schedule: "Weekend Slots"
                        };
                        setEditData({ ...editData, classes: [...editData.classes, newCls] });
                      }}
                      className="btn-secondary"
                    >
                      <Plus size={16} />
                      <span>Add New Course</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {editData.classes.map((cls, idx) => (
                      <div key={cls.id} style={{ background: 'var(--bg-card-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <h5>Course #{idx + 1}: {cls.title}</h5>
                          <button
                            onClick={() => {
                              const updated = editData.classes.filter(c => c.id !== cls.id);
                              setEditData({ ...editData, classes: updated });
                            }}
                            className="social-icon-btn" style={{ color: 'var(--accent-terracotta)' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">Course Title</label>
                            <input type="text" value={cls.title} onChange={e => {
                              const copy = [...editData.classes];
                              copy[idx].title = e.target.value;
                              setEditData({ ...editData, classes: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Category</label>
                            <input type="text" value={cls.category} onChange={e => {
                              const copy = [...editData.classes];
                              copy[idx].category = e.target.value;
                              setEditData({ ...editData, classes: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Fee Details</label>
                            <input type="text" value={cls.fee} onChange={e => {
                              const copy = [...editData.classes];
                              copy[idx].fee = e.target.value;
                              setEditData({ ...editData, classes: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Schedule</label>
                            <input type="text" value={cls.schedule} onChange={e => {
                              const copy = [...editData.classes];
                              copy[idx].schedule = e.target.value;
                              setEditData({ ...editData, classes: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group full-width">
                            <label className="form-label">Summary</label>
                            <textarea rows={2} value={cls.summary} onChange={e => {
                              const copy = [...editData.classes];
                              copy[idx].summary = e.target.value;
                              setEditData({ ...editData, classes: copy });
                            }} className="form-textarea" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: AWARDS */}
              {activeTab === 'awards' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4>Manage Awards & Achievements</h4>
                    <button
                      onClick={() => {
                        const newAward = {
                          id: `award-${Date.now()}`,
                          title: "New Award Title",
                          year: "2026",
                          organization: "Organization Name",
                          category: "Excellence in Music",
                          description: "Short award description..."
                        };
                        setEditData({ ...editData, awards: [...editData.awards, newAward] });
                      }}
                      className="btn-secondary"
                    >
                      <Plus size={16} />
                      <span>Add New Award</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {editData.awards.map((award, idx) => (
                      <div key={award.id} style={{ background: 'var(--bg-card-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <h5>Award #{idx + 1}: {award.title}</h5>
                          <button
                            onClick={() => {
                              const updated = editData.awards.filter(a => a.id !== award.id);
                              setEditData({ ...editData, awards: updated });
                            }}
                            className="social-icon-btn" style={{ color: 'var(--accent-terracotta)' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">Award Title</label>
                            <input type="text" value={award.title} onChange={e => {
                              const copy = [...editData.awards];
                              copy[idx].title = e.target.value;
                              setEditData({ ...editData, awards: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Year</label>
                            <input type="text" value={award.year} onChange={e => {
                              const copy = [...editData.awards];
                              copy[idx].year = e.target.value;
                              setEditData({ ...editData, awards: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Presenting Organization</label>
                            <input type="text" value={award.organization} onChange={e => {
                              const copy = [...editData.awards];
                              copy[idx].organization = e.target.value;
                              setEditData({ ...editData, awards: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Certificate / Photo Image URL</label>
                            <input type="text" value={award.image || ''} onChange={e => {
                              const copy = [...editData.awards];
                              copy[idx].image = e.target.value;
                              setEditData({ ...editData, awards: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group full-width">
                            <label className="form-label">Description</label>
                            <textarea rows={2} value={award.description} onChange={e => {
                              const copy = [...editData.awards];
                              copy[idx].description = e.target.value;
                              setEditData({ ...editData, awards: copy });
                            }} className="form-textarea" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: EVENTS */}
              {activeTab === 'events' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4>Manage Upcoming & Past Events</h4>
                    <button
                      onClick={() => {
                        const newEvt = {
                          id: `evt-${Date.now()}`,
                          title: "New Performance Title",
                          date: "2026-11-20",
                          time: "6:00 PM IST",
                          venue: "Venue Name",
                          city: "Bengaluru",
                          description: "Event description...",
                          image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
                          status: "upcoming"
                        };
                        setEditData({ ...editData, events: [...editData.events, newEvt] });
                      }}
                      className="btn-secondary"
                    >
                      <Plus size={16} />
                      <span>Add Event</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {editData.events.map((evt, idx) => (
                      <div key={evt.id} style={{ background: 'var(--bg-card-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <h5>Event: {evt.title} ({evt.status})</h5>
                          <button
                            onClick={() => {
                              const updated = editData.events.filter(e => e.id !== evt.id);
                              setEditData({ ...editData, events: updated });
                            }}
                            className="social-icon-btn" style={{ color: 'var(--accent-terracotta)' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">Title</label>
                            <input type="text" value={evt.title} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].title = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Status</label>
                            <select value={evt.status} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].status = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-select">
                              <option value="upcoming">Upcoming</option>
                              <option value="past">Past Event</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Date (YYYY-MM-DD)</label>
                            <input type="text" value={evt.date} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].date = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Time</label>
                            <input type="text" value={evt.time} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].time = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Venue & City</label>
                            <input type="text" value={evt.venue} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].venue = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Image URL</label>
                            <input type="text" value={evt.image} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].image = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-input" />
                          </div>

                          <div className="form-group full-width">
                            <label className="form-label">Description</label>
                            <textarea rows={2} value={evt.description} onChange={e => {
                              const copy = [...editData.events];
                              copy[idx].description = e.target.value;
                              setEditData({ ...editData, events: copy });
                            }} className="form-textarea" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: GALLERY */}
              {activeTab === 'gallery' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4>Manage Gallery Portfolio</h4>
                    <button
                      onClick={() => {
                        const newItem = {
                          id: `gal-${Date.now()}`,
                          title: "New Gallery Photo",
                          category: "Music Performances",
                          type: "image",
                          url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000",
                          caption: "Photo caption..."
                        };
                        setEditData({ ...editData, gallery: [...editData.gallery, newItem] });
                      }}
                      className="btn-secondary"
                    >
                      <Plus size={16} />
                      <span>Add Gallery Item</span>
                    </button>
                  </div>

                  <div className="form-grid">
                    {editData.gallery.map((item, idx) => (
                      <div key={item.id} style={{ background: 'var(--bg-card-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <strong>{item.title}</strong>
                          <button onClick={() => {
                            const updated = editData.gallery.filter(g => g.id !== item.id);
                            setEditData({ ...editData, gallery: updated });
                          }} className="social-icon-btn" style={{ color: 'var(--accent-terracotta)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                          <input type="text" value={item.title} onChange={e => {
                            const copy = [...editData.gallery];
                            copy[idx].title = e.target.value;
                            setEditData({ ...editData, gallery: copy });
                          }} className="form-input" placeholder="Title" />
                        </div>
                        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                          <select value={item.category} onChange={e => {
                            const copy = [...editData.gallery];
                            copy[idx].category = e.target.value;
                            setEditData({ ...editData, gallery: copy });
                          }} className="form-select">
                            <option value="Music Performances">Music Performances</option>
                            <option value="Anchoring">Anchoring</option>
                            <option value="Events">Events</option>
                            <option value="Awards">Awards</option>
                            <option value="Students">Students</option>
                            <option value="Behind the Scenes">Behind the Scenes</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input type="text" value={item.url} onChange={e => {
                            const copy = [...editData.gallery];
                            copy[idx].url = e.target.value;
                            setEditData({ ...editData, gallery: copy });
                          }} className="form-input" placeholder="Image / Video URL" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: TEACHER */}
              {activeTab === 'teacher' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Teacher's Full Name</label>
                    <input type="text" value={editData.teacher.name} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, name: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Title & Honorifics</label>
                    <input type="text" value={editData.teacher.title} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, title: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Teacher Photograph URL</label>
                    <input type="text" value={editData.teacher.photo} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, photo: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tradition / Lineage</label>
                    <input type="text" value={editData.teacher.tradition} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, tradition: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Qualifications</label>
                    <input type="text" value={editData.teacher.qualifications} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, qualifications: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Musical Background</label>
                    <textarea rows={2} value={editData.teacher.background} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, background: e.target.value } })} className="form-textarea" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Relationship & Mentorship</label>
                    <textarea rows={2} value={editData.teacher.relationship} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, relationship: e.target.value } })} className="form-textarea" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Featured Quote</label>
                    <input type="text" value={editData.teacher.quote} onChange={e => setEditData({ ...editData, teacher: { ...editData.teacher, quote: e.target.value } })} className="form-input" />
                  </div>
                </div>
              )}

              {/* TAB 9: CONTACT & SOCIALS */}
              {activeTab === 'contact' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Phone Number (Display)</label>
                    <input type="text" value={editData.contact.phone} onChange={e => setEditData({ ...editData, contact: { ...editData.contact, phone: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp Number (Digits with country code)</label>
                    <input type="text" value={editData.contact.whatsappNumber} onChange={e => setEditData({ ...editData, contact: { ...editData.contact, whatsappNumber: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Official Email</label>
                    <input type="email" value={editData.contact.email} onChange={e => setEditData({ ...editData, contact: { ...editData.contact, email: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Studio Location Address</label>
                    <input type="text" value={editData.contact.address} onChange={e => setEditData({ ...editData, contact: { ...editData.contact, address: e.target.value } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Instagram Link</label>
                    <input type="text" value={editData.contact.socials.instagram} onChange={e => setEditData({ ...editData, contact: { ...editData, contact: { ...editData.contact, socials: { ...editData.contact.socials, instagram: e.target.value } } } })} className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">YouTube Channel Link</label>
                    <input type="text" value={editData.contact.socials.youtube} onChange={e => setEditData({ ...editData, contact: { ...editData, contact: { ...editData.contact, socials: { ...editData.contact.socials, youtube: e.target.value } } } })} className="form-input" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
