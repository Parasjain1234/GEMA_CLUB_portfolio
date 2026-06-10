# GEMA Club Middle School Student Portfolio - Aarav Sharma

A modern, responsive middle school student portfolio website for Aarav Sharma, a Grade 8 student at Sunrise International School and GEMA Clubs Ambassador. This project incorporates all core requirements, custom design aesthetics (dark/light themes, smooth scrolling, micro-animations), and multiple bonus features.

---

## File Structure

```
GEMA_CLUB_portfolio/
│
├── index.html               # Main single-page interactive portfolio
├── index.css                # Global styles, variables, typography, layouts, animations, dark mode
├── index.js                 # JS actions: counters, lightboxes, carousels, blog modals, simulated video
├── resume.html              # Standalone print-optimized middle school student CV
│
├── assets/                  # High-quality visual assets
│   ├── profile.png          # Student portrait
│   ├── project_irrigation.png # Smart Irrigation project mockup
│   ├── project_scratch.png    # Scratch Platformer game mockup
│   ├── project_climate.png    # Climate Change website mockup
│   ├── certificate_abacus.png # Abacus Gold Medal certificate mockup
│   ├── certificate_essay.png  # Essay Writing Silver Medal certificate mockup
│   ├── certificate_science.png# Young Scientist Top 20 finalist certificate mockup
│   └── resume.pdf           # Programmatically compiled PDF resume
│
├── generate_pdfs.py         # Automated Python script to generate report.pdf and resume.pdf using fpdf2
├── GEMA_Club_Portfolio_Report.pdf # Submission report mapping layout to WordPress themes/plugins
└── README.md                # This documentation
```

---

## Implemented Features

### 1. Interactive Portfolio Website
*   **Sticky Glassmorphism Header:** Beautiful, translucent menu with indicator highlights and a dark/light mode toggle.
*   **Hero Visuals:** Interactive student portrait that morphs subtly, floating statistics panels, and an overlay thumbnail to watch a video intro.
*   **Animated Statistics Counters:** Counts up when scrolled into view (92% academic, 5+ clubs, 5+ medals, 10+ project prototypes).
*   **Subject & Grade Cards:** Academic achievements laid out in a clean, striped table with color-coded grade badges (A+, A, B+).
*   **Overall Score Radial Chart:** An SVG radial progress ring that grows dynamically to represent the overall percentage (92%).
*   **GEMMA Club Participations:** Detailed club involvements in Abacus, Coding, Math, Public Speaking, and Science Clubs.
*   **Persuasive Timeline:** Vertical competition achievements showing Olympiad medals and years (Gold, Silver, Bronze).
*   **Filterable Projects Grid:** Seamlessly sort project categories (Science, Coding, Web Design) with click transitions.
*   **Interactive Lightbox Gallery:** Zoom in and preview certificate credentials within a fullscreen overlay modal.
*   **Skills Matrix Progress Indicators:** Dynamic loading meters for Academic, Technical, and Soft skills.
*   **Reading Blog Modal:** Click on blog cards to open the complete text of Aarav's sample articles inside a custom modal.
*   **Parent-Teacher Testimonials Carousel:** Auto-sliding slider showcasing teacher/parent reviews with custom index dots.
*   **Validated Contact Form:** Verifies input, renders a loading spinner upon submission, and creates a success toast.

### 2. Standalone Printable Resume
*   A print-optimized stylesheet is configured on `resume.html` to output a letter-size, professional, dual-column middle school student CV directly through standard web browsers (Ctrl + P / Cmd + P).

### 3. Automated PDF Generator Script
*   Running `python generate_pdfs.py` checks for the Python package `fpdf2` (auto-installs if missing) and outputs:
    1.  `assets/resume.pdf` - Professional PDF CV layout.
    2.  `GEMA_Club_Portfolio_Report.pdf` - 2-page report detailing design decisions, WordPress plugin mappings, and development challenges.

---

## Local Development & Setup

### Running the Web Server
Since the website is built with vanilla web standards, you can open `index.html` directly in any web browser. For active development, start a local HTTP server:

Using **Node.js**:
```bash
npx http-server ./
```

Using **Python**:
```bash
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Compiling PDFs
To recompile the PDF report or resume manually:
```bash
python generate_pdfs.py
```
This will regenerate both `GEMA_Club_Portfolio_Report.pdf` and `assets/resume.pdf`.
