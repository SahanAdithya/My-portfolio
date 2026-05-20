import React, { useState, useEffect } from 'react';
import './App.css';

// --- 1. ICONS IMPORTS ---
import {
  FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub,
  FaDiscord,
  FaJava, FaPython, FaJs, FaDatabase, FaReact, FaGitAlt, FaEnvelope, FaPhone,
  FaServer, FaNetworkWired, FaLaptopCode, FaHtml5, FaCss3Alt, FaFigma
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiRaspberrypi } from 'react-icons/si';


import sahanLogo from './sahan-logo.webp';
import sahanLogoNavy from './sahan-logo-navy.webp';
import { FaXTwitter } from 'react-icons/fa6';

// --- 3. IMAGE IMPORTS ---
import heroBg from './hero-bg.webp';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';


function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState(2); // Folio is the middle card by default

  const projects = [
    {
      id: 'read-later',
      title: 'Read Later AI',
      subtitle: 'AI Summarizer & Reading List',
      largeText: 'READ',
      color: '#00d2ff',
      tech: ['React', 'Python', 'FastAPI', 'Gemini AI'],
      description: 'An AI-powered reading companion that scrapes articles, generates concise summaries, and categorizes content using custom tags.',
      image: ''
    },
    {
      id: 'cohort',
      title: 'Cohort App',
      subtitle: 'Next.js Study Platform',
      largeText: 'COHORT',
      color: '#ff2a5f',
      tech: ['Next.js', 'Supabase', 'Clerk', 'Tailwind'],
      description: 'A modern study group collaboration platform featuring interactive classrooms, real-time whiteboards, and Supabase backend integration.',
      image: ''
    },
    {
      id: 'folio',
      title: 'Folio Engine',
      subtitle: 'Creative Portfolio Theme',
      largeText: 'FOLIO',
      color: '#00f2fe',
      tech: ['React', 'CSS3', 'Lenis Scroll', 'Framer'],
      description: 'A highly polished, high-performance portfolio engine for developers and designers with fluid animations and responsive glassmorphism styles.',
      image: ''
    },
    {
      id: 'barter',
      title: 'Barter Marketplace',
      subtitle: 'P2P Swapping System',
      largeText: 'BARTER',
      color: '#ffd700',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      description: 'A peer-to-peer item swapping marketplace utilizing advanced matching algorithms to connect traders and facilitate zero-cash exchanges.',
      image: ''
    },
    {
      id: 'tweaks',
      title: 'Tweaks Panel',
      subtitle: 'Dynamic Theme Dashboard',
      largeText: 'TWEAKS',
      color: '#b026ff',
      tech: ['React', 'Local Storage', 'CSS Variables'],
      description: 'A lightweight settings panel enabling developers to live-tweak layouts, toggle theme variables, and visualize UI components in real-time.',
      image: ''
    }
  ];

  const activeProject = projects[activeProjectIndex];

  const getCardStyle = (index) => {
    const offset = index - activeProjectIndex;
    const absOffset = Math.abs(offset);
    
    // Scale down cards as they get further from center
    const scale = 1 - absOffset * 0.15; 
    
    // Translate X: active is 0, left is negative, right is positive
    let translateX = offset * 240; // base offset
    if (offset < 0) {
      translateX += 40; 
    } else if (offset > 0) {
      translateX -= 40; 
    }
    
    // Rotate Y
    const rotateY = offset * -25;
    
    // Z-index
    const zIndex = 10 - absOffset;
    
    // Opacity
    const opacity = absOffset > 2 ? 0 : (1 - absOffset * 0.25);
    const pointerEvents = absOffset > 2 ? 'none' : 'auto';

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents,
    };
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- SMOOTH SCROLL (LENIS) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // --- PRELOADER TIMEOUT ---
  useEffect(() => {
    // Start fading out after zoom animation finishes (3s)
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Remove from DOM after background fade finishes
      setTimeout(() => setIsLoading(false), 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- SCROLL SPY & ANIMATION LOGIC ---
  useEffect(() => {
    // A. Animation Observer (Fade-in effect)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% is visible

    const hiddenElements = document.querySelectorAll('.fade-in-section');
    hiddenElements.forEach((el) => observer.observe(el));

    // B. Scroll Spy (Navbar Highlight)
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollY > 10 ? scrollY + (viewportHeight * 0.3) : 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            triggerPoint >= offsetTop &&
            triggerPoint < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    return () => window.removeEventListener('scroll', handleNavbarScroll);
  }, []);

  const iconStyle = { marginRight: '8px', verticalAlign: 'middle' };

  const [aboutPov, setAboutPov] = useState('everyone');

  const povData = {
    everyone: "I’m a Computer Science undergraduate with a lifelong passion for technology and a knack for building clean, well-planned solutions to real-world problems. For me, writing code isn't just about making things work it's about clarity, proper formatting, and purposeful, modern execution.",
    recruiters: "A dedicated Computer Science student at the University of Westminster with a track record of delivering high-quality academic and personal projects. I specialize in Java, Python, and React, focusing on building scalable systems that meet business requirements.",
    developers: "Full-stack developer with a passion for clean architecture and efficient algorithms. I enjoy working with React, Node.js, and complex SQL schemas. I'm always looking for ways to optimize performance and improve developer experience."
  };

  return (
    <div className="App">

      {/* --- PRELOADER --- */}
      {isLoading && (
        <div className={`preloader ${isFadingOut ? 'fade-out' : ''}`}>
          <img src={sahanLogo} alt="Sahan Adithya" className="preloader-signature" />
        </div>
      )}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <img src={sahanLogoNavy} alt="Sahan" className="nav-signature" />
        </div>
        <div className="nav-links">
          <span className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About Me</span>
          <span className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</span>
          <span className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</span>
        </div>
        <div className="nav-button">
          <button className="btn-work-together" onClick={() => scrollToSection('contact')}>Let's Work Together</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="hero-section">
        <div className="hero-container-lux">
          <div className="hero-main-content">
            <h1 className="hero-title-lux">Sahan Adithya</h1>
            <p className="hero-tagline-lux">Web Desighner & Developer.</p>
            <div className="hero-actions-lux">
              <button className="btn-primary-lux" onClick={() => scrollToSection('contact')}>Get In Touch</button>
              <button className="btn-secondary-lux" onClick={() => scrollToSection('projects')}>View Projects</button>
            </div>
          </div>

          <div className="hero-footer-lux">
            <div className="hero-description-lux">
              <p>
                Premium web desighn, development and SEO services to help your business stand out in the digital world.
              </p>
            </div>
            <div className="hero-scroll-lux">
              <span>Scroll Down ↓</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- ABOUT SECTION (Real Me Layout) --- */}
      <section id="about" className="about-section-lux fade-in-section">
        <div className="about-container-lux">
          <div className="about-left-lux">
            <h2 className="about-title-lux">Hello !</h2>
            <div className="pov-selector-lux">
              <div className="pov-label-lux">
                <div className="pov-line-lux"></div>
                <span>CHOOSE YOUR POV</span>
              </div>
              <div className="pov-tabs-lux">
                <button
                  className={`pov-tab ${aboutPov === 'everyone' ? 'active' : ''}`}
                  onClick={() => setAboutPov('everyone')}
                >
                  <FaLaptopCode style={iconStyle} /> Everyone
                </button>
                <button
                  className={`pov-tab ${aboutPov === 'recruiters' ? 'active' : ''}`}
                  onClick={() => setAboutPov('recruiters')}
                >
                  <FaServer style={iconStyle} /> Recruiters
                </button>
                <button
                  className={`pov-tab ${aboutPov === 'developers' ? 'active' : ''}`}
                  onClick={() => setAboutPov('developers')}
                >
                  <FaJs style={iconStyle} /> Developers
                </button>
              </div>
            </div>
          </div>

          <div className="about-right-lux">
            <p className="about-quote-lux">
              "{povData[aboutPov]}"
            </p>
          </div>
        </div>

        {/* TECH STACK MARQUEE */}
        <div className="marquee-lux">
          <div className="marquee-track-lux">
            <div className="tech-item-lux"><FaGitAlt /> GIT</div>
            <div className="tech-item-lux"><SiTailwindcss /> TAILWIND</div>
            <div className="tech-item-lux"><FaReact /> REACT</div>
            <div className="tech-item-lux"><FaPython /> PYTHON</div>
            <div className="tech-item-lux"><FaJs /> JAVASCRIPT</div>
            <div className="tech-item-lux"><SiRaspberrypi /> RASPBERRY</div>
            <div className="tech-item-lux"><FaFigma /> FIGMA</div>
            <div className="tech-item-lux"><FaJava /> JAVA</div>
            <div className="tech-item-lux"><SiNextdotjs /> NEXT.JS</div>
            <div className="tech-item-lux"><FaHtml5 /> HTML</div>
            <div className="tech-item-lux"><FaCss3Alt /> CSS</div>
            
            {/* DUPLICATE FOR SEAMLESS LOOP */}
            <div className="tech-item-lux"><FaGitAlt /> GIT</div>
            <div className="tech-item-lux"><SiTailwindcss /> TAILWIND</div>
            <div className="tech-item-lux"><FaReact /> REACT</div>
            <div className="tech-item-lux"><FaPython /> PYTHON</div>
            <div className="tech-item-lux"><FaJs /> JAVASCRIPT</div>
            <div className="tech-item-lux"><SiRaspberrypi /> RASPBERRY</div>
            <div className="tech-item-lux"><FaFigma /> FIGMA</div>
            <div className="tech-item-lux"><FaJava /> JAVA</div>
            <div className="tech-item-lux"><SiNextdotjs /> NEXT.JS</div>
            <div className="tech-item-lux"><FaHtml5 /> HTML</div>
            <div className="tech-item-lux"><FaCss3Alt /> CSS</div>
          </div>
        </div>
      </section>



      {/* --- PROJECTS SECTION (3D Coverflow Carousel) --- */}
      <section id="projects" className="projects-section-lux fade-in-section">
        <div className="section-header-lux">
          <h2>My Adventures in Code</h2>
          <p>Explore some of my most impactful projects and technical experiments.</p>
        </div>

        <div className="coverflow-container-lux">
          {/* Dynamic background glow matching the active project's color */}
          <div 
            className="coverflow-bg-glow" 
            style={{ '--active-color': activeProject.color }}
          ></div>
          
          <div className="coverflow-slider-lux">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card-coverflow ${index === activeProjectIndex ? 'active' : ''}`}
                style={getCardStyle(index)}
                onClick={() => setActiveProjectIndex(index)}
              >
                {/* Sleek outer glow border */}
                <div 
                  className="card-glow-border" 
                  style={{ '--accent-color': project.color }}
                ></div>
                
                {/* Glassy card body */}
                <div className="card-inner-body">
                  {/* Stylized background outline letters */}
                  <div className="card-large-outline-text">{project.largeText}</div>

                  {/* Optional background image - free space for user */}
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="card-bg-image" />
                  ) : (
                    <div className="card-bg-gradient"></div>
                  )}

                  {/* Bottom Text metadata */}
                  <div className="card-project-info">
                    <h3 className="card-project-title">{project.title}</h3>
                    <p className="card-project-subtitle" style={{ color: project.color }}>
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="coverflow-pagination">
            {projects.map((_, index) => (
              <span 
                key={index} 
                className={`pagination-dot ${index === activeProjectIndex ? 'active' : ''}`}
                style={{ '--active-color': activeProject.color }}
                onClick={() => setActiveProjectIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Detailed Info Pane for the Active Project */}
        <div className="active-project-details-lux">
          <div className="project-detail-content">
            <h3 style={{ color: activeProject.color }}>{activeProject.title}</h3>
            <p className="project-detail-description">{activeProject.description}</p>
            <div className="project-detail-tech">
              {activeProject.tech.map((tag) => (
                <span 
                  key={tag} 
                  className="tech-badge" 
                  style={{ borderColor: activeProject.color, color: activeProject.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="contact-section fade-in-section">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <div className="section-underline"></div>
        </div>

        <div className="contact-card">
          <h3>Send Me a Message</h3>
          <form className="contact-form">
            <div className="form-group">
              <label>Your Name *</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Your Email *</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Project Inquiry" />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea rows="5" placeholder="Hello, I'd like to talk about..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => scrollToSection('home')}>Home</li>
              <li onClick={() => scrollToSection('about')}>About</li>
              <li onClick={() => scrollToSection('resume')}>Resume</li>
              <li onClick={() => scrollToSection('projects')}>Projects</li>
              <li onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact Info</h3>
            <p><FaEnvelope style={iconStyle} /> adithyasahan09@gmail.com</p>
            <p><FaPhone style={iconStyle} /> +94 71 679 0508</p>
          </div>
          <div className="footer-col">
            <h3>Follow Me</h3>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/sahan-adithya-32a941359/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://github.com/SahanAdithya" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.facebook.com/sahan.adithya.311" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/__.sahan.adithya.__/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://x.com/sahan_adithya09" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Sahan Adithya. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;