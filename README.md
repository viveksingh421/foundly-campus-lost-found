# FOUNDLY — Campus Lost & Found Platform 🎒🔍

> **"Lost something? Let's bring it back."**  
> *Campus Lost & Found Platform — CODE VARIANT BUILD 01, PS 02*

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide_React-F56565)](https://lucide.dev/)

---

## 🎯 Project Overview

**FOUNDLY** is a modern, responsive, privacy-conscious campus lost-and-found platform. It replaces chaotic bulletin boards and group chat noise with a structured, explainable matching engine that unites students who lost personal property with campus custody desks (libraries, dining halls, security offices, and gym facilities).

The application features a startup-grade UI designed with a **Midnight Navy (`#111827`)**, **Electric Lime (`#C7F36B`)**, and **Warm White (`#F8FAF5`)** palette, crisp typography (Inter), and subtle card borders.

---

## 🌟 Key Features

### 1. 📊 Real-Time Dynamic Dashboard
- **Dynamic KPI Metrics**: Open reports, candidate match pairs, pending claims, and reunited items derived directly from active application state.
- **Top Match Suggestions**: Displays high-confidence matches detected by the explainable rules engine with instant inspection triggers.
- **Recent Campus Activity**: Quick overview of recent submissions across campus sectors.

### 2. 🔍 Explore Registry & Faceted Search
- **Live Search**: Instant keyword search across title, description, color, campus facility, and report ID.
- **Type Filtering**: Instant toggle between **All Items**, **Lost Only**, and **Found Only**.
- **Faceted Filters**: Category selection, campus location selector, and sort ordering (Newest, Oldest, A–Z).
- **Empty States**: Informative empty states with 1-click filter reset.

### 3. 📝 Structured Report Flow
- **Lost vs. Found Bifurcation**: Tailored flows for students reporting missing items or custodians logging found goods.
- **Comprehensive Fields**: Item title, category, primary color, location (with custom option), date/time, public description, and optional photo.
- **Confidential Ownership Details**: Form field for private proof (e.g. internal engravings, custom stickers, serial numbers) that remains concealed from the public registry.
- **Image Input Handling**: Supports local image file uploads with preview or 1-click selection from demo campus presets.

### 4. 🧠 Explainable Rules-Based Matching Engine (`src/utils/matchingEngine.js`)
Instead of a "black box" claim of ownership, Foundly computes transparent relevance scores (0–100%) across 5 distinct dimensions:
1. **Category Alignment (30 pts)**: Strict prerequisite classification match.
2. **Keyword & Token Overlap (25 pts)**: Lexical stem matching across titles and descriptions.
3. **Color Harmony (15 pts)**: Exact or related color match.
4. **Campus Location Proximity (15 pts)**: Facility & campus zone clustering (e.g. Library, Science Complex, Engineering Hall).
5. **Timeline Plausibility (15 pts)**: Checks that the found timestamp is chronologically plausible relative to the loss date.

- **Match Explainer Panel**: Shows side-by-side lost vs. found comparison, itemized points earned, gaps/differences, and transparent disclaimer.

### 5. 🛡️ Verification Claim Flow (`src/components/ClaimModal.jsx`)
- Enables prospective owners to submit private evidence not publicly displayed on the card.
- Automatically transitions the found item's status to **Claim Pending**.
- Records the claim in **My Claims** for custody staff pickup verification.

### 6. 🗂️ My Reports & My Claims Management
- **Status Progression**: Open ➔ Potential Match ➔ Claim Pending ➔ Returned ➔ Closed.
- Working status update controls that instantly propagate throughout the application and persist across sessions.
- **Reset Demo Data**: Easily restore the 11 baseline sample records at any point.

---

## 🗄️ File Organization

```
foundly-campus-lost-found/
├── index.html                   # HTML entry point with Inter font & favicon
├── tailwind.config.js           # Midnight Navy, Electric Lime, and Warm White tokens
├── package.json                 # React 19, Vite, Lucide React, Tailwind CSS
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Main application state, routing & modal coordinator
│   ├── index.css                # Base Tailwind layer & custom scrollbars
│   ├── data/
│   │   └── sampleData.js        # 11 Believable campus reports & 2 compatible demo pairs
│   ├── utils/
│   │   ├── matchingEngine.js    # 5-factor explainable relevance scoring engine
│   │   └── storage.js           # LocalStorage persistence & factory reset helpers
│   ├── components/
│   │   ├── Sidebar.jsx          # Desktop navigation with live record badges
│   │   ├── MobileNavbar.jsx     # Responsive mobile header and bottom tab bar
│   │   ├── ItemCard.jsx         # Reusable card with status badges & match tags
│   │   ├── ItemDetailModal.jsx  # Detailed item modal & candidate matches list
│   │   ├── MatchExplainer.jsx   # Side-by-side explainable match breakdown
│   │   └── ClaimModal.jsx       # Privacy-conscious ownership claim submission
│   └── pages/
│       ├── Dashboard.jsx        # Live metrics, hero action, top match carousel
│       ├── ExplorePage.jsx      # Search, type tabs, category & location filters
│       ├── ReportItemPage.jsx   # Lost / Found report form with image preview
│       ├── MyReportsPage.jsx    # Status tracking and match inspection
│       └── MyClaimsPage.jsx     # Ownership verification claim log
```

---

## ⚡ Quick Start

### 1. Installation
```bash
cd foundly-campus-lost-found
npm install
```

### 2. Run Development Server
```bash
npm run dev -- --port 5174
```
Open **[http://localhost:5174](http://localhost:5174)** in your web browser.

### 3. Production Build Validation
```bash
npm run build
```

---

## 🎬 Hackathon Demonstration Script (Step-by-Step)

When demonstrating **FOUNDLY** to hackathon judges, follow this concise user journey:

1. **Dashboard (Live Overview)**
   - Open [http://localhost:5174](http://localhost:5174).
   - Point out that summary metrics (Open Reports, Possible Matches, Pending Claims, Returned Items) are **dynamically derived** from the data.
   - Point out the **High-Confidence Match Suggestions** card pairing the *Black Hydro Flask* with the *Black Metal Vacuum Flask*.

2. **Explainable Match Engine**
   - Click **"Inspect Match"** on the suggested pair card.
   - Show the **92% Relevance Score** breakdown:
     - ✅ Category Match (+30 pts)
     - ✅ Keyword Overlap (`flask`, `vacuum`, `metal`) (+25 pts)
     - ✅ Color Match (Black) (+15 pts)
     - ✅ Location Proximity (Main Library 2nd Floor) (+15 pts)
     - ✅ Timeline Alignment (+15 pts)
   - Explain the design decision: **Foundly explains the evidence, it does not falsely claim the match is guaranteed ownership**.

3. **Confidential Ownership Claim Flow**
   - Click **"Claim This Item (Verify Ownership)"** from the match inspector.
   - Fill in:
     - Name: `Jordan Student`
     - Email: `jordan@campus.edu`
     - Secret Proof: `Has a faint sticker residue on the bottom and minor dent under the carry handle.`
   - Submit the claim. Notice the item immediately transitions to **Claim Pending**.

4. **Explore & Instant Filter**
   - Go to **Explore Items**.
   - Type `"notebook"` into the search bar. Observe instant real-time filtering down to the *Blue Spiral Notebook* records.
   - Toggle between **Lost Only** and **Found Only** tabs.
   - Click **Reset** to clear all active filters.

5. **Report an Item**
   - Click **Report an Item**.
   - Select **"I Lost An Item"**.
   - Enter `Sony WH-1000XM4 Headphones`, category `Electronics & Chargers`, color `Silver`, location `Student Union`, and a brief description.
   - Select a demo stock photo preset and submit.
   - Verify that the item immediately appears on the **Dashboard** and in **My Reports**.

6. **Persistence & Reset**
   - Refresh the browser page (`Cmd+R` / `F5`).
   - Show that your new report and submitted claim remain intact thanks to `localStorage`.
   - Click **Reset Sample Data** in the sidebar to demonstrate the clean factory reset mechanism.

---

## 🔒 Limitations & Privacy Disclaimers

- **Frontend-Only Prototype**: Built for a 12-hour hackathon environment; uses browser `localStorage` for state persistence without external cloud backends.
- **Ownership Verification**: Physical handoff requires manual comparison of distinguishing details at campus security desks. Foundly facilitates the discovery and claim audit trail.

---

## 📄 License
MIT License — Created for CODE VARIANT BUILD 01, PS 02.
