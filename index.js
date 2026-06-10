document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME TOGGLE (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check localStorage or system preferences
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = htmlElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }


  /* ==========================================================================
     2. NAVIGATION & RESPONSIVE MENU
     ========================================================================== */
  const header = document.querySelector('.header');
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgress = document.getElementById('scroll-progress');

  // Shrink header on scroll & update scroll progress bar
  window.addEventListener('scroll', () => {
    // Header styling
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }

    // Scroll progress progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';

    // Active link highlighting on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Toggle mobile menu
  menuToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggleBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggleBtn.querySelector('i');
      icon.className = 'fa-solid fa-bars';
    });
  });


  /* ==========================================================================
     3. INTERSECTION OBSERVER ANIMATIONS (SCROLL REVEAL & METERS)
     ========================================================================== */
  // General Scroll Reveal
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Stats Counters & Academic Gauge
  const statsSection = document.getElementById('stats-container');
  const statNumbers = document.querySelectorAll('.stat-num');
  const academicGauge = document.getElementById('academic-gauge');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  let statsAnimated = false;

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Counter numbers
        if (!statsAnimated && (entry.target.id === 'stats-container' || entry.target.contains(statsSection))) {
          statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            animateCounter(num, target);
          });
          statsAnimated = true;
        }

        // 2. Academic Gauge Circle
        if (entry.target.id === 'academic') {
          animateAcademicGauge();
        }

        // 3. Skills Progress Bars
        if (entry.target.id === 'skills') {
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        }
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) animationObserver.observe(statsSection);
  const academicSec = document.getElementById('academic');
  if (academicSec) animationObserver.observe(academicSec);
  const skillsSec = document.getElementById('skills');
  if (skillsSec) animationObserver.observe(skillsSec);

  // Counter helper
  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    const suffix = element.innerText; // Keep % or +

    const timer = setInterval(() => {
      current += 1;
      element.innerHTML = current + (suffix.includes('%') ? '%' : suffix.includes('+') ? '+' : '');
      if (current >= target) {
        element.innerHTML = target + (suffix.includes('%') ? '%' : suffix.includes('+') ? '+' : '');
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Radial gauge helper
  function animateAcademicGauge() {
    const percent = 92;
    const circumference = 2 * Math.PI * 40; // 251.2
    const offset = circumference - (percent / 100) * circumference;
    
    academicGauge.style.strokeDashoffset = offset;
  }


  /* ==========================================================================
     4. PROJECT SHOWCASE (FILTERS)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* ==========================================================================
     5. CERTIFICATES GALLERY (LIGHTBOX)
     ========================================================================== */
  const certCards = document.querySelectorAll('.cert-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const title = card.getAttribute('data-title');
      
      lightboxImg.setAttribute('src', src);
      lightboxTitle.innerText = title;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Escape key closes lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeBlogModal();
      closeVideoModal();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }


  /* ==========================================================================
     6. STUDENT BLOG DATA & MODAL
     ========================================================================== */
  const blogsData = {
    "1": {
      category: "Academics & Abacus",
      date: "May 15, 2026",
      title: "How Abacus Improved My Mental Math Skills",
      content: `
        <p>When I first joined the GEMMA Abacus Club, I thought it was just about sliding beads back and forth on a wooden frame. However, I soon discovered that the abacus is a gateway to something much more powerful: <strong>spatial math visualization.</strong></p>
        
        <h4>Visualizing the Soroban</h4>
        <p>In the beginning, we learned physical movements for addition and subtraction. But as we advanced, the magic began. We were taught to close our eyes and construct a mental image of the abacus (the Soroban). Today, when I see a complex multiplication problem, my mind automatically visualizes the beads shifting. This mental math technique allows me to solve multi-digit equations in seconds—faster than someone typing it into a phone calculator!</p>
        
        <h4>Key Benefits I Experienced:</h4>
        <ul>
          <li><strong>Laser Focus:</strong> Speed calculations require absolute concentration. Training my brain to visualize the abacus has boosted my attention span in all subjects.</li>
          <li><strong>Memory Enhancement:</strong> Retaining intermediate steps of a calculation in my mind has drastically improved my working memory.</li>
          <li><strong>Math Confidence:</strong> Math is no longer intimidating. I see it as a puzzle that I have the tools to solve quickly.</li>
        </ul>
        <p>Participating in the International Abacus Olympiad and winning the Gold Medal proved to me that mental calculation is a trainable sport, and it has set a strong foundation for my aspiration to study Aerospace Engineering.</p>
      `
    },
    "2": {
      category: "Competitions",
      date: "April 2, 2026",
      title: "My Experience at the International Student Speaker Competition",
      content: `
        <p>Public speaking is often listed as one of people's greatest fears. I was no exception. Before joining the GEMMA Public Speaking Club, the thought of standing in front of a classroom made my palms sweat. Here is how I overcame my fears and placed Bronze at the International Student Speaker Competition.</p>
        
        <h4>Overcoming the Fear</h4>
        <p>My mentor taught me that nervousness is just energy that needs a channel. Instead of trying to suppress the butterflies, I learned to redirect them into enthusiasm. We practiced vocal exercises, posture adjustments, and eye contact templates (looking at the forehead of audience members if eye contact is too intimidating!).</p>
        
        <h4>Structuring the Persuasion</h4>
        <p>A great speech is not just about confident delivery; it requires solid structure. I structured my competition speech, <em>"Coding as a Modern Language,"</em> using the Rule of Three:
        <ol>
          <li>Hook the audience with a story about writing my first line of code.</li>
          <li>Present three clear reasons why programming should be taught alongside math and writing.</li>
          <li>Deliver a strong call to action urging schools to expand coding clubs.</li>
        </ol>
        </p>
        <p>The competition was intense, with student representatives from 12 countries. Placing 3rd was an amazing feeling, but the true prize was the realization that my voice has the power to inspire others when backed by preparation and passion.</p>
      `
    },
    "3": {
      category: "Technology & Coding",
      date: "February 28, 2026",
      title: "Why Coding is Important for Future Careers",
      content: `
        <p>Many students think that learning to code is only for those who want to become software engineers. But through my projects in the GEMMA Coding Club, I've realized that <strong>coding is a foundational skill</strong> that benefits almost every modern career pathway.</p>
        
        <h4>Learning Computational Thinking</h4>
        <p>At its core, coding teaches you how to think. It breaks down into three key processes:
        <ul>
          <li><strong>Decomposition:</strong> Breaking a large, scary problem (like building a game) into tiny, manageable steps (like making a sprite move left).</li>
          <li><strong>Pattern Recognition:</strong> Identifying elements that repeat and using functions or loops to save time.</li>
          <li><strong>Algorithmic Thinking:</strong> Creating a step-by-step logic rule to solve a challenge.</li>
        </ul>
        </p>
        
        <h4>Real-World Application: Aerospace Engineering</h4>
        <p>My goal is to design spacecraft. Aerospace engineers do not just draw planes; they write complex code to simulate aerodynamics, optimize fuel efficiency, and guide orbital trajectories. By learning block programming in Scratch and transitioning to HTML/CSS, I am building the analytical pathways I'll need to write rocket guidance software in the future.</p>
        <p>If you haven't started coding yet, don't worry about learning syntax. Start with logical flow, build simple games, and enjoy the process of turning ideas into functional digital creations!</p>
      `
    }
  };

  const blogCards = document.querySelectorAll('.blog-card');
  const blogModal = document.getElementById('blog-modal');
  const blogModalClose = document.getElementById('blog-modal-close');
  const modalBlogCategory = document.getElementById('modal-blog-category');
  const modalBlogDate = document.getElementById('modal-blog-date');
  const modalBlogTitle = document.getElementById('modal-blog-title');
  const modalBlogBody = document.getElementById('modal-blog-body');

  blogCards.forEach(card => {
    card.addEventListener('click', () => {
      const blogId = card.getAttribute('data-blog-id');
      const data = blogsData[blogId];
      
      if (data) {
        modalBlogCategory.innerText = data.category;
        modalBlogDate.innerText = data.date;
        modalBlogTitle.innerText = data.title;
        modalBlogBody.innerHTML = data.content;
        
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  blogModalClose.addEventListener('click', closeBlogModal);
  blogModal.addEventListener('click', (e) => {
    if (e.target === blogModal) {
      closeBlogModal();
    }
  });

  function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = '';
  }


  /* ==========================================================================
     7. TESTIMONIALS SLIDER (CAROUSEL)
     ========================================================================== */
  const testimonialsSlider = document.getElementById('testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlideIndex = 0;
  let slideTimer;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    currentSlideIndex = index;
    
    // Slide translate
    testimonialsSlider.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active classes
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Dots click events
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(index);
      resetSlideTimer();
    });
  });

  // Auto slide function
  function startSlideTimer() {
    slideTimer = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 6000); // Change slide every 6 seconds
  }

  function resetSlideTimer() {
    clearInterval(slideTimer);
    startSlideTimer();
  }

  startSlideTimer();


  /* ==========================================================================
     8. SIMULATED VIDEO INTRODUCTION PLAYER
     ========================================================================== */
  const videoPreviewBtn = document.getElementById('video-preview-btn');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoPlayToggle = document.getElementById('video-play-toggle');
  const videoMuteToggle = document.getElementById('video-mute-toggle');
  const videoProgressFill = document.getElementById('video-progress-fill');
  const videoTimer = document.getElementById('video-timer');
  const videoSubtitles = document.getElementById('video-subtitles');
  const audioWaves = document.getElementById('audio-waves');

  let isPlaying = false;
  let isMuted = false;
  let videoCurrentTime = 0; // seconds
  const videoDuration = 65; // 1 min 5 seconds
  let videoPlaybackInterval;

  const subtitlesTimeline = [
    { time: 0, text: "Hi everyone! Welcome to my GEMA Club portfolio website." },
    { time: 4, text: "My name is Aarav Sharma, and I'm a Grade 8 student at Sunrise International School." },
    { time: 10, text: "Since joining the GEMA clubs, I've developed a passion for mathematics and computer science." },
    { time: 17, text: "In the Coding Club, I learned to program games using Scratch and build basic websites." },
    { time: 24, text: "I also represented my school in the International Abacus Olympiad, winning the Gold Medal!" },
    { time: 31, text: "Here, you can find my STEM project, the Smart Irrigation System, which won our school award." },
    { time: 39, text: "I've also written articles about mental math and learning code on my student blog page." },
    { time: 47, text: "My goal is to become an Aerospace Engineer to build spacecraft and guide rockets." },
    { time: 54, text: "Feel free to check out my project list, view certificates, or contact me through the form." },
    { time: 61, text: "Thank you for visiting, and have a wonderful day!" }
  ];

  videoPreviewBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playVideo();
  });

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  videoPlayToggle.addEventListener('click', () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  });

  videoMuteToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    const icon = videoMuteToggle.querySelector('i');
    if (isMuted) {
      icon.className = 'fa-solid fa-volume-xmark';
      audioWaves.classList.remove('playing');
    } else {
      icon.className = 'fa-solid fa-volume-high';
      if (isPlaying) audioWaves.classList.add('playing');
    }
  });

  function playVideo() {
    isPlaying = true;
    videoPlayToggle.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    if (!isMuted) audioWaves.classList.add('playing');
    
    videoPlaybackInterval = setInterval(() => {
      videoCurrentTime += 1;
      
      // Update timer display
      const currentMin = Math.floor(videoCurrentTime / 60).toString().padStart(2, '0');
      const currentSec = (videoCurrentTime % 60).toString().padStart(2, '0');
      const durationMin = Math.floor(videoDuration / 60).toString().padStart(2, '0');
      const durationSec = (videoDuration % 60).toString().padStart(2, '0');
      videoTimer.innerText = `${currentMin}:${currentSec} / ${durationMin}:${durationSec}`;
      
      // Update progress bar
      const progressPercent = (videoCurrentTime / videoDuration) * 100;
      videoProgressFill.style.width = progressPercent + '%';

      // Update subtitles
      const currentSubtitle = subtitlesTimeline.slice().reverse().find(sub => videoCurrentTime >= sub.time);
      if (currentSubtitle) {
        videoSubtitles.innerText = currentSubtitle.text;
      }

      // Handle video end
      if (videoCurrentTime >= videoDuration) {
        stopVideo();
      }
    }, 1000);
  }

  function pauseVideo() {
    isPlaying = false;
    videoPlayToggle.innerHTML = '<i class="fa-solid fa-play"></i> Play';
    audioWaves.classList.remove('playing');
    clearInterval(videoPlaybackInterval);
  }

  function stopVideo() {
    pauseVideo();
    videoCurrentTime = 0;
    videoProgressFill.style.width = '0%';
    videoTimer.innerText = `00:00 / 01:05`;
    videoSubtitles.innerText = "Video finished. Press play to restart.";
  }

  function closeVideoModal() {
    stopVideo();
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }


  /* ==========================================================================
     9. CONTACT FORM VALIDATION & MOCK SUBMIT
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    // Show loader
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.setAttribute('disabled', true);
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    // Simulate Network Request
    setTimeout(() => {
      submitBtn.removeAttribute('disabled');
      submitBtn.innerHTML = originalBtnText;

      if (name && email && subject && message) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + name + '! Your message has been sent successfully. Aarav will get back to you soon.';
        contactForm.reset();
      } else {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill out all required fields before submitting.';
      }

      // Hide status toast after 7 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 7000);

    }, 1500); // 1.5 second loading latency
  });

});
