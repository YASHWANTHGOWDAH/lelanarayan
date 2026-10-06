import React from 'react';
import AdminPanel from '../components/AdminPanel';
import { Lock } from 'lucide-react';

export default function AdminPage({
  data,
  onSaveData,
  registrations,
  onDeleteRegistration,
  inquiries,
  onDeleteInquiry,
  onNavigate
}) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-badge">
          <Lock size={14} />
          <span>Admin Portal</span>
        </div>
        <h1 className="section-title">Website Management Dashboard</h1>
        <div className="gold-divider" />
        <p className="section-subtitle">
          "Manage student registrations, CSV data exports, inquiry messages, and website content."
        </p>
      </div>

      <AdminPanel
        isOpen={true}
        onClose={() => onNavigate('/')}
        data={data}
        onSaveData={onSaveData}
        registrations={registrations}
        onDeleteRegistration={onDeleteRegistration}
        inquiries={inquiries}
        onDeleteInquiry={onDeleteInquiry}
      />
    </div>
  );
}
