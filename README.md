# CRE 26 Tokyo - Official Conference Website

## Project Overview
This is the official static website for the **Current Research in Egyptology 26 (CRE 26)** conference, to be held in Central Tokyo (venue to be confirmed), July 11-15, 2026. The site features a modern "Cyber-Tokyo" aesthetic with neon accents and glassmorphism effects, fully responsive design, and comprehensive multilingual support (English, Japanese, Arabic).

## Key Features

### 1. Multilingual Support (Hybrid Approach)
- **Languages**: English (EN), Japanese (JP), Arabic (AR).
- **Implementation**: 
  - **Core Content**: Critical text (menus, hero sections, dates) is manually translated via `js/translations.js` to ensure accuracy.
  - **Full Coverage**: Google Translate widget runs in the background to translate dynamic or remaining content.
  - **RTL Support**: Arabic mode automatically switches the layout to Right-to-Left (RTL).
  - **Language Switcher**: Custom neon-styled toggle button (AR | EN | JP) that persists user preference.

### 2. Design & UI/UX
- **Theme**: "Cyber-Modern" / "Neo-Tokyo" style.
- **Visuals**: 
  - Full-screen background slideshow (`js/main.js`).
  - Frosted glass cards (`.glass-card`) with animated neon borders.
  - Responsive grid layouts for committee and program.
- **Navigation**: Sticky header, mobile hamburger menu, and smooth scrolling.
- **Maps**: Interactive dark-mode map using Leaflet.js (`tokyo-guide.html`).

### 3. Content Sections
- **Home (`index.html`)**: Hero section, Important Dates, Conference Highlights, Quick Links.
- **Committee (`committee.html`)**: Card-based roster of the Organizing Committee with bios and photos.
- **Venue (`venue.html`)**: Location details and access information.
- **Call for Papers (`call-for-papers.html`)**: Topics, formats, and submission guidelines.
- **Tokyo Guide (`tokyo-guide.html`)**: Tourist information with interactive map.
- **Support (`support.html`)**: Information on crowdfunding and sponsorship.

## Project Structure
```
├── index.html              # Main landing page
├── committee.html          # Organizing committee members
├── venue.html             # Venue & Access info
├── call-for-papers.html   # Submission guidelines
├── tokyo-guide.html       # Tokyo tourism guide
├── support.html           # Support/Donation page
├── ... (other subpages)
├── css/
│   ├── style.css          # Main stylesheet (Cyber-Modern theme)
│   └── i18n.css           # Internationalization styles
├── js/
│   ├── main.js            # Core logic (UI, Lang Switcher, Slideshow)
│   └── translations.js    # Manual translation dictionary
└── images/
    ├── cre-26-logo.png    # Official Logo
    ├── committee/         # Member photos
    └── ...                # Backgrounds and assets
```

## Setup & Deployment
1.  **Static Hosting**: The project is purely static (HTML/CSS/JS) and can be hosted on any static file server (GitHub Pages, Netlify, Vercel, etc.).
2.  **Google Translate**: Requires internet access to load the Google Translate script.
3.  **Leaflet Maps**: Requires internet access to load map tiles (CartoDB Dark Matter).

## Recent Updates
- **Branding**: Updated all references to "CRE 26" and "26th International Conference".
- **Committee Page**: Refined layout to a photo-based card grid; verified member photos.
- **Translation**: Enhanced Arabic/Japanese support with manual overrides for key terms.

## Credits
- **Organizing Committee**: CRE Japan Committee
- **Chair**: Dr. Tokihisa Higo (University of Tsukuba)
