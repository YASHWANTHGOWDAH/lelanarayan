# 🎵 Leela Narayan — Official Website & Music Academy Portal

Welcome to the official web application for **Leela Narayan** (**Artist | Anchor | Musician**).

This repository contains a full-stack, responsive, and luxury personal website with a built-in **Music Academy Registration System**, **Concert Event Countdown**, **Interactive Media Gallery**, and a **Secure Admin Panel**.

---

## 🌟 Key Features

1. **Brand & Visual Theme:**
   - Standard light luxury color palette: **Warm Ivory (`#FAF8F5`)**, **Soft Beige (`#F5EFE6`)**, **Warm Gold accents (`#C5A059`)**, and **Deep Charcoal (`#2C221E`)** text.
   - Clean typography with *Playfair Display*, *Cormorant Garamond*, and *Plus Jakarta Sans*.
   - Subtle Indian musical motifs (Tanpura SVG art, swara badges, soundwave graphics, and an optional ambient tanpura audio player).

2. **Multi-Page & Hash Navigation:**
   - `http://localhost:3000/#home` — Visual Hero banner & section highlight cards (Artist, Anchor, Music).
   - `http://localhost:3000/#about` — Detailed biography, personal philosophy, and interactive artistic timeline.
   - `http://localhost:3000/#classes` — Music academy courses (Vocal Music, Beginner, Intermediate, Advanced), fees, formats, and schedules.
   - `http://localhost:3000/#register` — Interactive registration form with real-time validation, confirmation modal, and direct WhatsApp / Email / Call buttons.
   - `http://localhost:3000/#teacher` — Guru homage section dedicated to **Vidushi Saraswati Devi**, lineage, qualifications, and mentorship.
   - `http://localhost:3000/#awards` — Awards showcase with certificate lightbox preview.
   - `http://localhost:3000/#events` — Live countdown timer for upcoming concerts and past stage highlights.
   - `http://localhost:3000/#gallery` — Filterable photo and video gallery with fullscreen lightboxes.
   - `http://localhost:3000/#contact` — Contact info, direct message form, and social media links.
   - `http://localhost:3000/#admin` — Secure Admin Dashboard portal.

3. **Admin Dashboard (`/admin` or 🔒 Lock Icon):**
   - **Password:** `leela2026`
   - **Registrations Table:** View, search, filter by course category or mode (Online/Offline), delete records, and **Export Registrations to CSV**.
   - **Direct Messages:** View, search, and delete contact inquiries.
   - **Live Content Editor:** Modify biography, course cards, awards, events, gallery items, teacher info, and contact details without editing code.

---

## 📂 Project Structure

```
yashwanth-portfolio/
├── server.js                   # Node.js + Express backend server
├── index.html                  # HTML template with Google Fonts & SEO metadata
├── package.json                # NPM dependencies and scripts
├── data.json                   # Saved site content JSON
├── registrations.json          # Stored student registrations JSON
├── inquiries.json              # Stored contact messages JSON
└── src/
    ├── main.jsx                # React app root & hash router
    ├── styles.css              # Custom luxury CSS stylesheet
    ├── data/
    │   └── defaultData.js      # Initial default dataset for Leela Narayan
    ├── pages/                  # Dedicated page views
    │   ├── HomePage.jsx
    │   ├── AboutPage.jsx
    │   ├── ClassesPage.jsx
    │   ├── RegistrationPage.jsx
    │   ├── TeacherPage.jsx
    │   ├── AwardsPage.jsx
    │   ├── EventsPage.jsx
    │   ├── GalleryPage.jsx
    │   └── ContactPage.jsx
    └── components/             # Reusable UI components
        ├── Navbar.jsx
        ├── HeroSection.jsx
        ├── AboutSection.jsx
        ├── ClassesSection.jsx
        ├── RegistrationSection.jsx
        ├── TeacherSection.jsx
        ├── AwardsSection.jsx
        ├── EventsSection.jsx
        ├── GallerySection.jsx
        ├── ContactSection.jsx
        ├── Footer.jsx
        ├── AdminPanel.jsx
        └── AudioPlayer.jsx
```

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Lucide React Icons, Custom Modular CSS.
- **Backend:** Node.js, Express 5.
- **Storage:** JSON File System persistence (`data.json`, `registrations.json`) + `localStorage` fallback.

---

## 🚀 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Start Server
```bash
node server.js
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/data` | Retrieve site content |
| `POST` | `/api/data` | Save site content |
| `GET` | `/api/registrations` | Fetch student registrations |
| `POST` | `/api/registrations` | Add new student registration |
| `DELETE` | `/api/registrations/:id` | Delete student registration |
| `GET` | `/api/registrations/export` | Download registrations CSV |
| `GET` | `/api/inquiries` | Fetch contact messages |
| `POST` | `/api/inquiries` | Add new contact message |
| `DELETE` | `/api/inquiries/:id` | Delete contact message |
| `POST` | `/api/admin/login` | Verify admin password (`leela2026`) |

---

## 📜 License & Copyright
© 2026 **Leela Narayan**. All Rights Reserved.
