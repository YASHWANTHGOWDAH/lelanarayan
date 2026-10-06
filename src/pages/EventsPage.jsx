import React from 'react';
import EventsSection from '../components/EventsSection';
import { Calendar } from 'lucide-react';

export default function EventsPage({ data }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Calendar size={14} />
          <span>Stage & Events Page</span>
        </div>
        <h1 className="section-title">Upcoming & Past Events</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Experience the magic of live vocal recitals, anchoring galas, and musical masterclasses."
        </p>
      </div>

      <EventsSection data={data} />
    </div>
  );
}
