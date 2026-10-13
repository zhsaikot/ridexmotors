# RideX Motors - Trusted Second Hand Motorbike Showroom

An ultra-modern, high-performance, 100% serverless static website for **RideX Motors** (Sakhipur, Tangail). Built based on modern dealership UI mockups, combining a racing dark theme with rich dynamic motorcycle inventory management, instant WhatsApp inquiry flow, bilingual EN/BN support, and complete Firebase backend integration with seamless LocalStorage fallback.

---

## 🏍️ Showroom Overview
- **Brand**: RideX Motors
- **Tagline**: Trusted Second Hand Motorbike Showroom | Quality Used Bikes | Verified Papers | Best Price Guarantee | Buy-Sell-Exchange
- **Location**: Kachua Road, Sakhipur, Tangail, 1950
- **Hotlines**: 01868-546518, 01681-103565
- **Email**: ridexmotors0405@gmail.com
- **Facebook**: [RideX Motors](https://www.facebook.com/profile.php?id=61566059999995)

---

## 🚀 Key Features

1. **Ultra-Modern Dealership Design (UI Mockup)**
   - Dark dynamic hero banner with high-contrast racing red accents (`#dc2626`).
   - Floating search & filter bar with category tabs (`All Bikes`, `Used`, `New`, `Sports`, `Commuter`) and dropdown selectors.
   - Brand pills (Yamaha, Suzuki, Honda, Bajaj, Hero, TVS, Kawasaki).
   - Dynamic motorcycle cards with specs (Engine CC, Mileage, Brakes/ABS, Price in BDT, and Badges).
   - "Why Choose Us" dark banner featuring 4 pillars.
   - Comprehensive Services section (Buy & Sell, Trade-In Exchange, BRTA Papers & Name Transfer, Motul Lubricants & Helmets).
   - Real showroom photos (Storefront and interior display shelves).
   - Real rider customer reviews & ratings.
   - Riding & maintenance guides.

2. **No-Cart WhatsApp Order Flow**
   - Click-to-chat WhatsApp button dynamically pre-fills bike details:
     - Model Name, Price, Showroom location, and stock inquiry.
   - Direct hotline call integration (`tel:01868546518`).

3. **Dual Language (EN | বাংলা)**
   - Real-time language switcher (`assets/js/i18n.js`).
   - Custom Bengali font (`Hind Siliguri`) and number formatting.

4. **100% Serverless & Free Hosting**
   - Zero Node.js or PHP backend requirements.
   - Compatible with **GitHub Pages**, Cloudflare Pages, Netlify, or Vercel.

5. **Full Admin Dashboard (`admin.html`)**
   - One-Click Demo Mode (instant access without credentials).
   - Firebase Auth + Firestore + Storage integration.
   - Add, edit, and delete motorcycles with multiple gallery photos, specs, and status badges.
   - Brand and category management.
   - One-click seed data restore.

---

## 📁 Project Structure

```
ridexmotors/
├── index.html              # Homepage matching UI mockup
├── inventory.html          # Full motorcycle catalog & filter page
├── bike-details.html       # Single bike specs, gallery & WhatsApp inquiry
├── about.html              # Sakhipur showroom story & real photos
├── contact.html            # Location, phone hotlines & Google Map
├── admin.html              # Admin CRUD dashboard
├── 404.html                # Custom 404 page
├── favicon.ico             # Tab icon
└── assets/
    ├── css/
    │   └── style.css       # Tailwind extensions, dark mode, red brand palette
    ├── images/
    │   ├── logo.png        # RideX Motors logo
    │   ├── showroom-exterior.jpg # Real storefront photo
    │   ├── showroom-interior.jpg # Real display shelf photo
    │   └── bikes/          # Bike photos (including real Hero Splendor+)
    └── js/
        ├── firebase-config.js # Firebase credentials & connection wrapper
        ├── seed-data.js       # Pre-loaded popular Bangladesh motorcycles
        ├── db.js              # Firestore + LocalStorage fallback engine
        ├── i18n.js            # English & Bengali translations
        ├── main.js            # Global WhatsApp, mobile drawer, search modal
        ├── inventory.js       # Bike catalog filtering & rendering
        ├── bike-details.js    # Single bike gallery switcher & specs sheet
        └── admin.js           # Admin panel logic & authentication
```

---

## 🛠️ Firebase Setup Guide (Optional for Cloud Live Sync)

The website works immediately out of the box using local storage! To activate multi-device cloud synchronization:

1. Visit [Firebase Console](https://console.firebase.google.com/) and create a project (e.g. `ridex-motors`).
2. Add a **Web App** and copy the `firebaseConfig` keys into `assets/js/firebase-config.js`.
3. Enable **Authentication** > Sign-in method > **Email/Password**.
4. Create a **Firestore Database** in production mode with these rules:
   ```text
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /bikes/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /categories/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
5. Enable **Firebase Storage** (for image uploads) with read public and write authenticated rules.

---

## 🌐 Free Deployment to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete RideX Motors dealership website"
   git push origin main
   ```
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://zhsaikot.github.io/ridexmotors/`

---
© 2026 RideX Motors. All rights reserved.