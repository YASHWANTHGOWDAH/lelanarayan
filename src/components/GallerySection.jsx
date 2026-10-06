import React, { useState } from 'react';
import { Sparkles, Eye, X, Image as ImageIcon, Play } from 'lucide-react';

export default function GallerySection({ data }) {
  const galleryItems = data?.gallery || [];
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = ['All', 'Music Performances', 'Anchoring', 'Events', 'Awards', 'Students', 'Behind the Scenes'];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-header">
        <div className="section-badge">
          <ImageIcon size={14} />
          <span>Visual Portfolio</span>
        </div>
        <h2 className="section-title">Artistic Gallery</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Moments captured across concerts, television presentations, award ceremonies, and music academy workshops."
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="gallery-item" onClick={() => setSelectedMedia(item)}>
            <img src={item.url} alt={item.title} />

            <div className="gallery-overlay">
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-light)', fontWeight: '700' }}>
                {item.category}
              </span>
              <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', margin: '0.2rem 0' }}>{item.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="lightbox-modal" onClick={() => setSelectedMedia(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedMedia(null)}>
              <X size={32} />
            </button>

            {selectedMedia.type === 'video' ? (
              <div style={{ width: '100%', maxWidth: '800px', aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedMedia.url}
                  title={selectedMedia.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img src={selectedMedia.url} alt={selectedMedia.title} />
            )}

            <div style={{ marginTop: '1.25rem', color: '#FFFFFF' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold-light)', fontWeight: '700' }}>
                {selectedMedia.category}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', margin: '0.2rem 0' }}>
                {selectedMedia.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto' }}>
                {selectedMedia.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
