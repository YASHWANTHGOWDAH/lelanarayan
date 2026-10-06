# 📘 Project Technical Documentation — Leela Narayan Website

## 1. Project Specifications

- **Client / Entity Name:** Leela Narayan
- **Tagline:** Artist | Anchor | Musician
- **Location:** Malleshwaram, Bengaluru, Karnataka, India
- **Application Type:** Single Localhost Full-Stack Web Application with Hash Routing & Admin Dashboard
- **Primary URL:** `http://localhost:3000`

---

## 2. File Path Directory Map

### Root & Backend Files
- **Backend Entrypoint:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\server.js`
- **HTML Shell:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\index.html`
- **Manifest / Dependencies:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\package.json`
- **Primary README:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\README.md`
- **Site Content Storage:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\data.json`
- **Registrations Storage:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\registrations.json`
- **Inquiries Storage:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\inquiries.json`

### Frontend Application (`src/`)
- **Main React Root:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\main.jsx`
- **Luxury CSS Styles:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\styles.css`
- **Default Dataset:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\data\defaultData.js`

### Standalone Page Views (`src/pages/`)
- **Home View (`#home`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\HomePage.jsx`
- **About View (`#about`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\AboutPage.jsx`
- **Classes View (`#classes`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\ClassesPage.jsx`
- **Registration View (`#register`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\RegistrationPage.jsx`
- **Teacher View (`#teacher`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\TeacherPage.jsx`
- **Awards View (`#awards`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\AwardsPage.jsx`
- **Events View (`#events`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\EventsPage.jsx`
- **Gallery View (`#gallery`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\GalleryPage.jsx`
- **Contact View (`#contact`):** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\pages\ContactPage.jsx`

### Reusable UI Components (`src/components/`)
- **Navigation Header:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\Navbar.jsx`
- **Hero Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\HeroSection.jsx`
- **About Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\AboutSection.jsx`
- **Classes Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\ClassesSection.jsx`
- **Registration Form:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\RegistrationSection.jsx`
- **Teacher Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\TeacherSection.jsx`
- **Awards Grid:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\AwardsSection.jsx`
- **Events & Countdown:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\EventsSection.jsx`
- **Gallery & Lightbox:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\GallerySection.jsx`
- **Contact Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\ContactSection.jsx`
- **Footer Section:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\Footer.jsx`
- **Admin Dashboard Modal:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\AdminPanel.jsx`
- **Audio Toggle Player:** `c:\Users\yashw\Downloads\Yashwanth_Gowda_Portfolio\yashwanth-portfolio\src\components\AudioPlayer.jsx`

---

## 3. Data Schemas

### Registration Entry Object Schema
```json
{
  "id": "reg-1728211000000",
  "studentName": "Student Full Name",
  "parentName": "Parent Name (if minor)",
  "age": "14",
  "gender": "Female",
  "phone": "+91 98765 43210",
  "email": "student@example.com",
  "city": "Bengaluru",
  "preferredClass": "Vocal Music",
  "experienceLevel": "Beginner",
  "preferredMode": "Online",
  "preferredDays": "Weekends",
  "preferredTime": "Morning",
  "trainingDetails": "Previous training description...",
  "message": "Personal goals...",
  "createdAt": "2026-10-06T10:30:00.000Z"
}
```

---

## 4. Operational Instructions

To build and run the application locally:

```powershell
# 1. Build static production bundle
npm run build

# 2. Start Express server on port 3000
node server.js
```
