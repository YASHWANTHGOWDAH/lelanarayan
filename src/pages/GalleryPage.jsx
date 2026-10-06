import React from 'react';
import GallerySection from '../components/GallerySection';
import { Image as ImageIcon } from 'lucide-react';

export default function GalleryPage({ data }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <ImageIcon size={14} />
          <span>Artistic Gallery Page</span>
        </div>
        <h1 className="section-title">Artistic Gallery</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Browse high-resolution concert photos, TV hosting captures, student workshops, and behind-the-scenes moments."
        </p>
      </div>

      <GallerySection data={data} />
    </div>
  );
}
