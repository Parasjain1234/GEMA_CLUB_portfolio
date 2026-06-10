import os
import sys
import subprocess

# Auto-install fpdf2 if not installed
try:
    from fpdf import FPDF
except ImportError:
    print("fpdf2 library not found. Installing now...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])
    from fpdf import FPDF

class PDFReport(FPDF):
    def header(self):
        # Draw top accent bar
        self.set_fill_color(59, 48, 224) # Indigo primary
        self.rect(0, 0, 210, 4, 'F')
        
        self.set_text_color(100, 116, 139) # Slate gray
        self.set_font("helvetica", "B", 8)
        self.cell(0, 10, "GEMA CLUB PORTFOLIO CHALLENGE | STUDENT SUBMISSION", 0, 0, "L")
        self.cell(0, 10, "PAGE " + str(self.page_no()), 0, 1, "R")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_text_color(148, 163, 184) # Light slate
        self.set_font("helvetica", "I", 8)
        self.cell(0, 10, "Submitted by Aarav Sharma | Grade 8 - Sunrise International School", 0, 0, "C")

    def chapter_title(self, label):
        self.set_font("helvetica", "B", 14)
        self.set_text_color(59, 48, 224) # Indigo
        self.cell(0, 8, label, 0, 1, "L")
        # Draw short line under title
        title_width = self.get_string_width(label)
        self.set_draw_color(6, 214, 160) # Accent teal
        self.set_line_width(0.8)
        self.line(self.get_x(), self.get_y() + 1, self.get_x() + 40, self.get_y() + 1)
        self.ln(4)

    def heading2(self, label):
        self.set_font("helvetica", "B", 11)
        self.set_text_color(30, 41, 59) # Dark slate
        self.cell(0, 6, label, 0, 1, "L")
        self.ln(2)

    def body_text(self, text):
        self.set_font("helvetica", "", 9.5)
        self.set_text_color(71, 85, 105) # Muted slate
        self.multi_cell(0, 5, text)
        self.ln(4)

    def bullet_point(self, title, desc):
        self.set_font("helvetica", "B", 9.5)
        self.set_text_color(30, 41, 59)
        self.write(5, " - " + title + ": ")
        self.set_font("helvetica", "", 9.5)
        self.set_text_color(71, 85, 105)
        self.write(5, desc + "\n")
        self.ln(1)


def generate_report():
    pdf = PDFReport()
    pdf.set_margins(15, 15, 15)
    pdf.add_page()
    
    # Report Header Block
    pdf.set_font("helvetica", "B", 18)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 10, "GEMA Club Portfolio Submission Report", 0, 1, "L")
    
    pdf.set_font("helvetica", "B", 10)
    pdf.set_text_color(6, 214, 160) # Teal accent
    pdf.cell(0, 5, "MIDDLE SCHOOL STUDENT EXCELLENCE PORTFOLIO", 0, 1, "L")
    pdf.ln(6)

    # Info card block
    pdf.set_fill_color(248, 250, 252) # Light blue-gray bg
    pdf.set_draw_color(226, 232, 240)
    pdf.rect(15, 36, 180, 24, 'FD')
    
    pdf.set_xy(18, 38)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(40, 5, "Student Name: Aarav Sharma")
    pdf.cell(50, 5, "Grade: Grade 8")
    pdf.cell(80, 5, "School: Sunrise International School", 0, 1)
    
    pdf.set_xy(18, 44)
    pdf.cell(40, 5, "Overall Score: 92%")
    pdf.cell(50, 5, "Clubs Joined: 5 GEMMA Clubs")
    pdf.cell(80, 5, "Aspirations: Aerospace Engineer", 0, 1)
    
    pdf.set_xy(18, 50)
    pdf.cell(80, 5, "Technology Stack: Custom Semantic HTML5, CSS3 Variables, Vanilla JS")
    pdf.ln(12)

    # Section 1
    pdf.chapter_title("1. WordPress Theme Mapping")
    pdf.body_text(
        "For a standard GEMA Club deployment, the portfolio maps cleanly to the Astra Theme or the Hello Elementor theme. "
        "Astra provides a light, performance-focused framework that is ideal for fast page loads (critical for the middle-school portfolio scoring). "
        "The layout utilizes custom theme builders to inject headers and footers across all landing sections."
    )
    
    # Section 2
    pdf.chapter_title("2. WordPress Plugins & Widget Mapping")
    pdf.body_text(
        "The advanced interactive features and bonuses requested in the portfolio guidelines map to the following industry-standard WordPress plugins:"
    )
    pdf.bullet_point("Elementor Pro", "Used to construct the custom homepage grid, responsive columns, and hover scaling actions.")
    pdf.bullet_point("WPForms (Lite/Pro)", "Handles the Contact Form validation, input checking, success notifications, and dummy routing.")
    pdf.bullet_point("Premium Addons for Elementor", "Utilized for the Animated Statistics (Count-up counters) and the responsive Achievements Vertical Timeline widget.")
    pdf.bullet_point("Envira Gallery / Lightbox", "Powers the interactive Certificates Grid, enabling lightbox slide overlays when a certificate is clicked.")
    pdf.bullet_point("Simple Local Avatars", "Manages the custom student profile photographs and mock project thumbnails.")
    pdf.ln(4)

    # Section 3
    pdf.chapter_title("3. Architectural Design Decisions")
    pdf.body_text(
        "The following core design systems were crafted to produce a high-end, premium portfolio representation:"
    )
    pdf.bullet_point("Aesthetic Harmony", "Avoided plain primary colors in favor of a tailored HSL Indigo (primary) and Teal (accent/secondary) palette. This maintains professional visual branding.")
    pdf.bullet_point("Typography Scale", "Implemented 'Outfit' for titles to convey a clean modern brand, and 'Plus Jakarta Sans' for the body text to guarantee legibility on screen sizes from mobile to 4K displays.")
    pdf.bullet_point("Micro-Animations", "Incorporated subtle CSS keyframes for morphing the student portrait shape, floating info cards in the hero visual, and scale offsets on hover. Animated counters and gauges trigger dynamically on-scroll using Javascript Intersection Observers.")
    pdf.bullet_point("Dual-Mode Compatibility", "Crafted CSS variables enabling a seamless theme switch between Dark and Light mode, respecting user settings and retaining setting state in local browser storage.")

    # Page 2
    pdf.add_page()
    
    # Section 4
    pdf.chapter_title("4. Development Challenges & Solutions")
    pdf.body_text(
        "During the development of the Aarav Sharma GEMA Club student portfolio, several architectural challenges were encountered and successfully resolved:"
    )
    pdf.bullet_point("Challenge 1: Print Optimization for Resume Download", 
                     "Standard web pages do not print cleanly, resulting in page cuts and misaligned flexboxes. Solution: Created a dedicated 'resume.html' template with a print stylesheet (@media print) hiding margins, navigation headers, and forcing a lettersize grid flow. This outputs a neat PDF directly from the browser.")
    
    pdf.bullet_point("Challenge 2: Dynamic Scroll Counters Triggers", 
                     "Standard JS count-up animations execute immediately on page load, causing users to miss the animation before scrolling down. Solution: Leveraged Javascript Intersection Observer API to detect when the statistics block enters the viewport, initiating counts only when fully visible.")
    
    pdf.bullet_point("Challenge 3: Timeline Responsive Squeezing", 
                     "Standard horizontal timelines break on mobile screens, squeezing text cards into unreadable columns. Solution: Crafted a vertical timeline that reflows on mobile (max-width: 768px), moving the central timeline indicator bar to the left and stacking cards in a single-column layout.")
    
    pdf.bullet_point("Challenge 4: Embedding Video Without Latency", 
                     "Loading large media directly decreases page load speed, hurting evaluation grades. Solution: Built a high-performance mockup video card that loads a static thumbnail with play overlays. When clicked, it launches a custom modal with progressive faux subtitles and audio wave animations, simulating the video intro without heavy video load overhead.")

    pdf.ln(5)
    pdf.chapter_title("5. Student Self-Evaluation & Summary")
    pdf.body_text(
        "This portfolio achieves a complete middle school showcase, capturing Aarav Sharma's excellence across academic scores (92%), GEMA clubs, awards, and technical abilities. "
        "The project demonstrates that modern web standards (HTML5/CSS3/Vanilla JS) can deliver a highly engaging, custom middle school portfolio which can be easily adapted to a WordPress theme."
    )
    
    # Save Report
    pdf.output("GEMA_Club_Portfolio_Report.pdf")
    print("Report compiled successfully as GEMA_Club_Portfolio_Report.pdf")


class PDFResume(FPDF):
    def header(self):
        # Draw header color bars
        self.set_fill_color(59, 48, 224) # Indigo
        self.rect(0, 0, 210, 5, 'F')
        
    def add_section_header(self, text):
        self.ln(3)
        self.set_font("helvetica", "B", 11)
        self.set_text_color(59, 48, 224)
        self.cell(0, 6, text.upper(), 0, 1, "L")
        # Line
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.5)
        self.line(self.get_x(), self.get_y(), 195, self.get_y())
        self.ln(3)

def generate_resume():
    pdf = PDFResume()
    pdf.set_margins(15, 10, 15)
    pdf.add_page()
    
    # Header Info
    pdf.set_y(12)
    pdf.set_font("helvetica", "B", 20)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(110, 8, "AARAV SHARMA", 0, 0, "L")
    
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(70, 4, "Sunrise International School, Middle Section", 0, 1, "R")
    
    pdf.set_xy(125, 16)
    pdf.cell(70, 4, "Email: aarav.sharma@example.com", 0, 1, "R")
    
    pdf.set_xy(125, 20)
    pdf.cell(70, 4, "Location: New Delhi, India | Grade 8", 0, 1, "R")
    
    pdf.set_y(26)
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(6, 214, 160)
    pdf.cell(0, 5, "GEMA CLUB AMBASSADOR | ASPIRING AEROSPACE ENGINEER", 0, 1, "L")
    pdf.ln(2)
    
    # Career Goal Card
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(226, 232, 240)
    pdf.rect(15, 34, 180, 20, 'FD')
    
    pdf.set_xy(18, 36)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(59, 48, 224)
    pdf.cell(0, 4, "CAREER GOAL: AEROSPACE ENGINEER", 0, 1)
    
    pdf.set_x(18)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.multi_cell(174, 4, 
        "Passionate Grade 8 student with exceptional scores in mathematics and computer science (A+ grades). "
        "Leveraging mental calculations and digital programming skills developed across GEMMA Clubs to "
        "design model aircraft prototypes and pursue space science research."
    )
    pdf.ln(12)
    
    # Left Column (Education, Projects, Achievements)
    col1_x = 15
    col1_w = 110
    
    # Right Column (Academics, Clubs, Skills)
    col2_x = 132
    col2_w = 63
    
    start_y = pdf.get_y()
    
    # --- LEFT COLUMN CONTENT ---
    pdf.set_xy(col1_x, start_y)
    pdf.add_section_header("Education")
    
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w, 4, "Sunrise International School - Grade 8", 0, 1)
    
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "I", 8.5)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(col1_w, 4, "New Delhi, India | 2018 - Present", 0, 1)
    
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(col1_w, 4, "- Academic grade average: 92% (Passed with Distinction)", 0, 1)
    pdf.set_x(col1_x)
    pdf.cell(col1_w, 4, "- Grade A+ in Mathematics (98/100) and Computers (99/100)", 0, 1)
    pdf.ln(3)

    pdf.set_x(col1_x)
    pdf.add_section_header("STEM Projects")
    
    # Proj 1
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w, 4, "Smart Irrigation System (Science Prototyping)", 0, 1)
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.multi_cell(col1_w, 3.5, 
        "- Created an automated irrigation model using moisture sensors.\n"
        "- Won School Innovation Award; finished Top 20 in Young Scientist Award."
    )
    pdf.ln(2)

    # Proj 2
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w, 4, "Scratch Game: Temple Adventure (Coding)", 0, 1)
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.multi_cell(col1_w, 3.5, 
        "- Designed a 2D game in Scratch with health system, scores, and 5 levels.\n"
        "- Introduced variables and conditionals logic in club challenges."
    )
    pdf.ln(2)

    # Proj 3
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w, 4, "Climate Change Awareness Website (HTML/CSS)", 0, 1)
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.multi_cell(col1_w, 3.5, 
        "- Built a responsive layout containing graphics and data maps.\n"
        "- Implemented basic custom CSS styling grids."
    )
    pdf.ln(3)

    pdf.set_x(col1_x)
    pdf.add_section_header("Competition Achievements")
    
    # Ach 1
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w - 20, 4, "International Abacus Olympiad", 0, 0)
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(6, 214, 160)
    pdf.cell(20, 4, "GOLD MEDAL", 0, 1, "R")
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(col1_w, 4, "Ranked 1st globally in speed mental arithmetic (2025).", 0, 1)
    pdf.ln(2)

    # Ach 2
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w - 20, 4, "International Essay Competition", 0, 0)
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(59, 48, 224)
    pdf.cell(20, 4, "SILVER MEDAL", 0, 1, "R")
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(col1_w, 4, "Essay on carbon footprints and environmental tech (2025).", 0, 1)
    pdf.ln(2)

    # Ach 3
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(col1_w - 20, 4, "Student Speaker Competition", 0, 0)
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(20, 4, "BRONZE MEDAL", 0, 1, "R")
    pdf.set_x(col1_x)
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(col1_w, 4, "Persuasive speech on school computer curricula (2024).", 0, 1)

    # --- RIGHT COLUMN CONTENT (DRAWN DYNAMICALLY VIA COORDINATES) ---
    right_y = start_y
    
    # 1. Academic Table
    pdf.set_xy(col2_x, right_y)
    pdf.add_section_header("Academic Grades")
    
    # Table headers
    pdf.set_xy(col2_x, pdf.get_y())
    pdf.set_font("helvetica", "B", 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(38, 4, "Subject", 0, 0)
    pdf.cell(15, 4, "Grade", 0, 1, "R")
    
    # Table rows
    subjects = [
        ("Mathematics", "A+ (98%)"),
        ("Science", "A (93%)"),
        ("Computer Science", "A+ (99%)"),
        ("English", "A (91%)"),
        ("Social Studies", "B+ (87%)")
    ]
    pdf.set_font("helvetica", "", 8)
    pdf.set_text_color(71, 85, 105)
    for subj, grade in subjects:
        pdf.set_x(col2_x)
        pdf.cell(38, 4, subj, 0, 0)
        pdf.set_font("helvetica", "B", 8)
        pdf.cell(15, 4, grade, 0, 1, "R")
        pdf.set_font("helvetica", "", 8)
    pdf.ln(3)

    # 2. GEMMA Club Participation
    pdf.set_x(col2_x)
    pdf.add_section_header("GEMMA Clubs")
    
    clubs = [
        ("Abacus Club (2 Years)", "Visualization arithmetic; State Finalist."),
        ("Coding Club (3 Years)", "Scratch structures, HTML basics."),
        ("Mathematics Club (1 Year)", "Olympiad challenge organizer."),
        ("Public Speaking (1 Year)", "Debate and presentation structure."),
        ("Science Club (2 Years)", "Conducted sustainable energy labs.")
    ]
    for club_title, club_desc in clubs:
        pdf.set_x(col2_x)
        pdf.set_font("helvetica", "B", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(col2_w, 3.5, club_title, 0, 1)
        pdf.set_x(col2_x)
        pdf.set_font("helvetica", "", 7.5)
        pdf.set_text_color(100, 116, 139)
        pdf.multi_cell(col2_w, 3, club_desc)
        pdf.ln(1)
    pdf.ln(2)

    # 3. Skills Matrix
    pdf.set_x(col2_x)
    pdf.add_section_header("Skills Matrix")
    
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "B", 8)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(col2_w, 4.5, "ACADEMIC", 0, 1)
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "", 7.5)
    pdf.cell(col2_w, 3.5, "Mental Math, Logical Reasoning", 0, 1)
    
    pdf.ln(1)
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "B", 8)
    pdf.cell(col2_w, 4.5, "TECHNICAL", 0, 1)
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "", 7.5)
    pdf.cell(col2_w, 3.5, "Scratch Coding, HTML & CSS, Canva", 0, 1)
    
    pdf.ln(1)
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "B", 8)
    pdf.cell(col2_w, 4.5, "SOFT SKILLS", 0, 1)
    pdf.set_x(col2_x)
    pdf.set_font("helvetica", "", 7.5)
    pdf.cell(col2_w, 3.5, "Leadership, Debating, Teamwork", 0, 1)
    
    # Save Resume
    os.makedirs("assets", exist_ok=True)
    pdf.output("assets/resume.pdf")
    print("Resume compiled successfully as assets/resume.pdf")

if __name__ == "__main__":
    generate_report()
    generate_resume()
