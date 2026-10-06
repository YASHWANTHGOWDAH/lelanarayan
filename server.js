import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { defaultSiteData } from './src/data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Paths for JSON storage
const DATA_FILE = path.join(__dirname, 'data.json');
const REGISTRATIONS_FILE = path.join(__dirname, 'registrations.json');
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Helper functions for file I/O
function loadFile(filePath, fallbackData) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return fallbackData;
}

function saveFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// Initialize files if they don't exist
if (!fs.existsSync(DATA_FILE)) {
  saveFile(DATA_FILE, defaultSiteData);
}
if (!fs.existsSync(REGISTRATIONS_FILE)) {
  const sampleRegistrations = [
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
      preferredTime: "Morning (9 AM - 12 PM)",
      trainingDetails: "Learned basic swaras at school 2 years ago.",
      message: "Eager to start formal training in classical music.",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "reg-102",
      studentName: "Karthik Venkatesh",
      parentName: "N/A",
      age: "28",
      gender: "Male",
      phone: "+91 99001 88776",
      email: "karthik.v@example.com",
      city: "Bengaluru",
      preferredClass: "Intermediate Classes",
      experienceLevel: "Intermediate",
      preferredMode: "Offline",
      preferredDays: "Weekdays",
      preferredTime: "Evening (5 PM - 8 PM)",
      trainingDetails: "4 years of vocal training in Carnatic music.",
      message: "Looking to refine raga elaboration and Sugama Sangeetha.",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  saveFile(REGISTRATIONS_FILE, sampleRegistrations);
}

if (!fs.existsSync(INQUIRIES_FILE)) {
  saveFile(INQUIRIES_FILE, []);
}

// Serve static build in production/preview
app.use(express.static(path.join(__dirname, 'dist')));

// API ENDPOINTS

// 1. Site Data
app.get('/api/data', (req, res) => {
  const data = loadFile(DATA_FILE, defaultSiteData);
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const updatedData = req.body;
  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  const success = saveFile(DATA_FILE, updatedData);
  if (success) {
    res.json({ message: 'Site data saved successfully', data: updatedData });
  } else {
    res.status(500).json({ error: 'Failed to write data file' });
  }
});

// 2. Admin Auth
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Default PIN / Password
  if (password === 'leela2026' || password === 'admin') {
    res.json({ success: true, token: 'token-leela-admin-2026' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password. Try "leela2026"' });
  }
});

// 3. Registrations
app.get('/api/registrations', (req, res) => {
  const regs = loadFile(REGISTRATIONS_FILE, []);
  res.json(regs);
});

app.post('/api/registrations', (req, res) => {
  const reg = req.body;
  if (!reg.studentName || !reg.phone || !reg.email) {
    return res.status(400).json({ error: 'Name, Phone and Email are required fields.' });
  }
  const regs = loadFile(REGISTRATIONS_FILE, []);
  const newReg = {
    ...reg,
    id: `reg-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  regs.unshift(newReg);
  saveFile(REGISTRATIONS_FILE, regs);
  res.status(201).json({ success: true, registration: newReg });
});

app.delete('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  let regs = loadFile(REGISTRATIONS_FILE, []);
  regs = regs.filter(r => r.id !== id);
  saveFile(REGISTRATIONS_FILE, regs);
  res.json({ success: true, message: 'Registration deleted' });
});

// CSV Export for Registrations
app.get('/api/registrations/export', (req, res) => {
  const regs = loadFile(REGISTRATIONS_FILE, []);
  const headers = ['ID', 'Student Name', 'Parent Name', 'Age', 'Gender', 'Phone', 'Email', 'City', 'Preferred Class', 'Mode', 'Days', 'Time', 'Date Submitted'];
  const rows = regs.map(r => [
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
    `"${r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="music_class_registrations.csv"');
  res.send(csvContent);
});

// 4. Contact Inquiries
app.get('/api/inquiries', (req, res) => {
  const inquiries = loadFile(INQUIRIES_FILE, []);
  res.json(inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const inq = req.body;
  if (!inq.name || !inq.email || !inq.message) {
    return res.status(400).json({ error: 'Name, Email and Message are required.' });
  }
  const inquiries = loadFile(INQUIRIES_FILE, []);
  const newInq = {
    ...inq,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInq);
  saveFile(INQUIRIES_FILE, inquiries);
  res.status(201).json({ success: true, inquiry: newInq });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  let inquiries = loadFile(INQUIRIES_FILE, []);
  inquiries = inquiries.filter(i => i.id !== id);
  saveFile(INQUIRIES_FILE, inquiries);
  res.json({ success: true, message: 'Inquiry deleted' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
