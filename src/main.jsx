import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { defaultSiteData } from './data/defaultData';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Separate Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ClassesPage from './pages/ClassesPage';
import RegistrationPage from './pages/RegistrationPage';
import TeacherPage from './pages/TeacherPage';
import AwardsPage from './pages/AwardsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  const [siteData, setSiteData] = useState(() => {
    const local = localStorage.getItem('leela_site_data');
    return local ? JSON.parse(local) : defaultSiteData;
  });

  const [registrations, setRegistrations] = useState(() => {
    const local = localStorage.getItem('leela_registrations');
    return local ? JSON.parse(local) : [
      {
        id: "reg-101",
        studentName: "Ananya Sharma",
        parentName: "Rajesh Sharma",
        age: "14",
        gender: "Female",
        phone: "+91 98450 12345",
        email: "ananya.sharma@example.com",
        city: "Bengaluru",
        preferredClass: "Beginner Classes",
        experienceLevel: "Beginner",
        preferredMode: "Online",
        preferredDays: "Weekends",
        preferredTime: "Morning",
        trainingDetails: "Learned basic swaras at school.",
        message: "Eager to start classical vocal training.",
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [inquiries, setInquiries] = useState(() => {
    const local = localStorage.getItem('leela_inquiries');
    return local ? JSON.parse(local) : [];
  });

  const [adminOpen, setAdminOpen] = useState(false);

  // Hash Routing Listener
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash || '#home';
      setCurrentHash(h);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateHash = (hash) => {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fetch API data on mount
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.biography) {
          setSiteData(data);
          localStorage.setItem('leela_site_data', JSON.stringify(data));
        }
      })
      .catch(err => console.log('Using local dataset'));

    fetch('/api/registrations')
      .then(res => res.ok ? res.json() : null)
      .then(regs => {
        if (Array.isArray(regs) && regs.length > 0) {
          setRegistrations(regs);
          localStorage.setItem('leela_registrations', JSON.stringify(regs));
        }
      })
      .catch(err => console.log('Using local registrations'));

    fetch('/api/inquiries')
      .then(res => res.ok ? res.json() : null)
      .then(inq => {
        if (Array.isArray(inq)) {
          setInquiries(inq);
          localStorage.setItem('leela_inquiries', JSON.stringify(inq));
        }
      })
      .catch(err => console.log('Using local inquiries'));
  }, []);

  // Save Data Handler
  const handleSaveData = async (newData) => {
    setSiteData(newData);
    localStorage.setItem('leela_site_data', JSON.stringify(newData));
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    } catch (err) {
      console.warn('Backend sync error:', err);
    }
  };

  // Add Registration
  const handleAddRegistration = async (reg) => {
    const newReg = {
      ...reg,
      id: `reg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem('leela_registrations', JSON.stringify(updated));

    try {
      await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg)
      });
    } catch (err) {
      console.warn('API reg sync error:', err);
    }
  };

  // Delete Registration
  const handleDeleteRegistration = async (id) => {
    const updated = registrations.filter(r => r.id !== id);
    setRegistrations(updated);
    localStorage.setItem('leela_registrations', JSON.stringify(updated));

    try {
      await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API delete reg error:', err);
    }
  };

  // Add Inquiry
  const handleAddInquiry = async (inq) => {
    const newInq = {
      ...inq,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('leela_inquiries', JSON.stringify(updated));

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inq)
      });
    } catch (err) {
      console.warn('API inquiry sync error:', err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('leela_inquiries', JSON.stringify(updated));

    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API delete inquiry error:', err);
    }
  };

  // Render individual non-stacked separate page per hash
  const renderActivePage = () => {
    switch (currentHash) {
      case '#home':
      case '':
        return <HomePage data={siteData} onNavigateHash={navigateHash} />;
      case '#about':
        return <AboutPage data={siteData} onNavigate={navigateHash} />;
      case '#classes':
        return <ClassesPage data={siteData} onNavigate={navigateHash} />;
      case '#register':
        return <RegistrationPage onAddRegistration={handleAddRegistration} contactInfo={siteData.contact} />;
      case '#teacher':
        return <TeacherPage data={siteData} />;
      case '#awards':
        return <AwardsPage data={siteData} />;
      case '#events':
        return <EventsPage data={siteData} />;
      case '#gallery':
        return <GalleryPage data={siteData} />;
      case '#contact':
        return <ContactPage data={siteData} onAddInquiry={handleAddInquiry} />;
      default:
        return <HomePage data={siteData} onNavigateHash={navigateHash} />;
    }
  };

  return (
    <div className="site-wrapper">
      <Navbar
        currentHash={currentHash}
        onNavigateHash={navigateHash}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main>{renderActivePage()}</main>

      <Footer
        currentHash={currentHash}
        onNavigateHash={navigateHash}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={siteData}
        onSaveData={handleSaveData}
        registrations={registrations}
        onDeleteRegistration={handleDeleteRegistration}
        inquiries={inquiries}
        onDeleteInquiry={handleDeleteInquiry}
      />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
