import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Eye, Ticket, X, ChevronRight } from 'lucide-react';

export default function EventsSection({ data }) {
  const allEvents = data?.events || [];
  const upcomingEvents = allEvents.filter(e => e.status === 'upcoming');
  const pastEvents = allEvents.filter(e => e.status === 'past');

  const primaryEvent = upcomingEvents[0];
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Countdown timer calculation for primary event
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!primaryEvent?.date) return;

    const targetDate = new Date(`${primaryEvent.date}T18:30:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [primaryEvent]);

  return (
    <section id="events" className="events-section">
      <div className="section-header">
        <div className="section-badge">
          <Calendar size={14} />
          <span>Stage & Concerts</span>
        </div>
        <h2 className="section-title">Upcoming & Featured Events</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Experience the magic of live vocal recitals, anchoring galas, and musical masterclasses."
        </p>
      </div>

      {/* COUNTDOWN TIMER FOR NEXT UPCOMING EVENT */}
      {primaryEvent && (
        <div className="countdown-box">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197, 160, 89, 0.2)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>Next Flagship Performance</span>
          </div>

          <h3 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '0.5rem' }}>
            {primaryEvent.title}
          </h3>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>
            📍 {primaryEvent.venue}, {primaryEvent.city} • 📅 {primaryEvent.date}
          </p>

          <div className="timer-grid">
            <div className="timer-unit">
              <div className="timer-val">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="timer-label">Days</div>
            </div>
            <div className="timer-unit">
              <div className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="timer-label">Hours</div>
            </div>
            <div className="timer-unit">
              <div className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="timer-label">Mins</div>
            </div>
            <div className="timer-unit">
              <div className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="timer-label">Secs</div>
            </div>
          </div>

          <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Ticket size={18} />
            <span>Reserve Pass / Event Details</span>
          </a>
        </div>
      )}

      {/* UPCOMING EVENTS GRID */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 4rem auto' }}>
        <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Upcoming Schedule
        </h3>

        <div className="events-grid">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="event-card">
              <img src={evt.image} alt={evt.title} className="event-card-img" />
              <div className="event-card-body">
                <div>
                  <h4 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{evt.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={15} style={{ color: 'var(--gold-dark)' }} />
                      <span>{evt.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={15} style={{ color: 'var(--gold-dark)' }} />
                      <span>{evt.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={15} style={{ color: 'var(--gold-dark)' }} />
                      <span>{evt.venue}, {evt.city}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {evt.description}
                  </p>
                </div>

                <button onClick={() => setSelectedEvent(evt)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Eye size={16} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAST EVENTS SECTION */}
      {pastEvents.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Past Performances & Stage Highlights
          </h3>

          <div className="events-grid">
            {pastEvents.map((evt) => (
              <div key={evt.id} className="event-card" style={{ opacity: 0.9 }}>
                <img src={evt.image} alt={evt.title} className="event-card-img" />
                <div className="event-card-body">
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', fontWeight: '700' }}>
                      Conducted: {evt.date}
                    </span>
                    <h4 style={{ fontSize: '1.25rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>{evt.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>📍 {evt.venue}, {evt.city}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{evt.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="admin-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="registration-card" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>{selectedEvent.title}</h3>
              <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <img src={selectedEvent.image} alt={selectedEvent.title} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <p>📅 <strong>Date & Time:</strong> {selectedEvent.date} at {selectedEvent.time}</p>
              <p>📍 <strong>Venue:</strong> {selectedEvent.venue}, {selectedEvent.city}</p>
              <p style={{ lineHeight: '1.6' }}>{selectedEvent.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#contact" onClick={() => setSelectedEvent(null)} className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center' }}>
                Inquire / Book Seat
              </a>
              <button onClick={() => setSelectedEvent(null)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
