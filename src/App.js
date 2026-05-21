import React, { useState, useEffect } from 'react';
import './App.css';

// --- 1. ICONS IMPORTS ---
import {
  FaJava, FaPython, FaJs, FaReact, FaGitAlt,
  FaServer, FaLaptopCode, FaHtml5, FaCss3Alt, FaFigma,
  FaCode
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiRaspberrypi } from 'react-icons/si';
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';


import sahanLogo from './sahan-logo.webp';
import sahanLogoNavy from './sahan-logo-navy.webp';

// --- 3. IMAGE IMPORTS ---
import adorixImg from './adorix.webp';
import electricityAnalystImg from './electricity-analyst.webp';
import financeTrackerImg from './finance-tracker.webp';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// --- COUNT UP ANIMATOR ---
function CountUpNumber({ target, duration = 1500, startTrigger = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration, startTrigger]);

  return <>{count}</>;
}


function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState(2); // Folio is the middle card by default
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [resumeInView, setResumeInView] = useState(false);

  // --- CONTACT FORM STATE ---
  const [formState, setFormState] = useState({ name: '', email: '', company: '', website: '', service: '', description: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/adithyasahan09@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Company: formState.company,
          Website: formState.website,
          Service: formState.service,
          Message: formState.description,
          _subject: `New Portfolio Message from ${formState.name}`
        })
      });

      await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', company: '', website: '', service: '', description: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const projects = [
    {
      id: 'read-later',
      title: 'Read Later AI',
      subtitle: 'AI Summarizer & Reading List',
      largeText: 'READ',
      color: '#00d2ff',
      tech: ['React', 'Python', 'FastAPI', 'Gemini AI'],
      description: 'An AI-powered reading companion that scrapes articles, generates concise summaries, and categorizes content using custom tags.',
      image: '',
      status: '(TECHNICAL EXPERIMENT - COMPLETE)',
      link: 'https://github.com/SahanAdithya'
    },
    {
      id: 'cohort',
      title: 'Cohort App',
      subtitle: 'Next.js Study Platform',
      largeText: 'COHORT',
      color: '#ff2a5f',
      tech: ['Next.js', 'Supabase', 'Clerk', 'Tailwind'],
      description: 'A modern study group collaboration platform featuring interactive classrooms, real-time whiteboards, and Supabase backend integration.',
      image: '',
      status: '(2ND YEAR PROJECT - ONGOING)',
      link: 'https://github.com/SahanAdithya'
    },
    {
      id: 'adorix',
      title: 'Adorix',
      subtitle: 'AI Interactive Kiosk',
      largeText: 'ADORIX',
      color: '#00f2fe',
      tech: ['React', 'Python', 'OpenCV', 'FastAPI', 'TensorFlow'],
      description: 'Adorix transforms static screens into intelligent agents. Track motion, interact with voice, and serve personalized content in real-time.',
      image: adorixImg,
      status: '(2ND YEAR PROJECT - COMPLETE)',
      link: 'https://www.adorixit.com/'
    },
    {
      id: 'electricity-analyst',
      title: 'Electricity Analyst',
      subtitle: 'electricity analysis platform',
      largeText: 'ELECTRICITY',
      color: '#ffd700',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      description: 'An intelligent electricity analysis platform designed to track power usage, analyze energy efficiency, and provide personalized insights for optimizing electricity consumption.',
      image: electricityAnalystImg,
      status: '(ACADEMIC WORK - COMPLETE)',
      link: 'https://electricity-analysis-2zyk.vercel.app/'
    },
    {
      id: 'finance-tracker',
      title: 'Finance Tracker',
      subtitle: 'Personal Wealth Dashboard',
      largeText: 'FINANCE',
      color: '#00e676',
      tech: ['React', 'Chart.js', 'Node.js', 'Express', 'MongoDB'],
      description: 'A comprehensive personal wealth and budget tracking dashboard featuring real-time expense visualization, monthly savings goal tracking, and automated financial health analytics.',
      image: financeTrackerImg,
      status: '(ACADEMIC WORK - COMPLETE)',
      link: 'https://finance-tracker-two-neon.vercel.app/'
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

    // A2. IntersectionObserver specifically for triggering Resume statistics counters
    const resumeSection = document.getElementById('resume');
    const resumeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setResumeInView(true);
        } else {
          setResumeInView(false); // Reset to allow re-triggering animations on scroll re-entry
        }
      });
    }, { threshold: 0.15 });

    if (resumeSection) {
      resumeObserver.observe(resumeSection);
    }

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
      if (resumeSection) {
        resumeObserver.unobserve(resumeSection);
      }
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

        <div
          className="coverflow-container-lux"
          onMouseLeave={() => {
            if (!isDetailOpen) {
              setActiveProjectIndex(2);
            }
          }}
        >

          <div className="coverflow-slider-lux">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card-coverflow ${index === activeProjectIndex ? 'active' : ''}`}
                style={getCardStyle(index)}
                onClick={() => {
                  if (index === activeProjectIndex) {
                    setIsDetailOpen(true);
                  } else {
                    setActiveProjectIndex(index);
                  }
                }}
                onMouseEnter={() => {
                  setActiveProjectIndex(index);
                }}
              >


                {/* Glassy card body */}
                <div className="card-inner-body">


                  {/* Optional background image - free space for user */}
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="card-bg-image" />
                  ) : (
                    <div className="card-bg-gradient"></div>
                  )}

                  {/* Bottom Text metadata */}
                  <div className="card-project-info">
                    <h3 className="card-project-title">{project.title}</h3>
                    <p className="card-project-subtitle">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>

      </section>

      {/* --- RESUME SECTION (Daham-Inspired Borderless Layout with Animated Stats) --- */}
      <section id="resume" className="resume-section-lux fade-in-section">
        <div className="resume-container-lux">
          {/* Left Column: Core Professional Profile */}
          <div className="resume-content-col">
            <div className="resume-title-block">
              <h2 className="resume-main-title">Resume</h2>
              <div className="resume-subtitle-row">
                <span className="resume-subtitle-line"></span>
                <span className="resume-subtitle-text">CORE EXPERTISE</span>
              </div>
            </div>

            <div className="resume-details-flat">
              <div className="resume-details-header">
                <span className="resume-details-icon"><FaCode /></span>
                <h3 className="resume-details-title">Full Stack Developer</h3>
              </div>
              <p className="resume-details-desc">
                Building scalable, high-performance web applications with modern frameworks and smart IoT solutions. Bridging the physical and digital worlds using efficient firmware, custom PCBs, and intelligent neural networks.
              </p>
              <div className="resume-details-tech">
                {["React", "Next.js", "Node.js", "TypeScript", "Python", "C++"].map((tag) => (
                  <span key={tag} className="resume-tech-badge">{tag}</span>
                ))}
              </div>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="resume-download-btn"
            >
              View Full Resume <span className="resume-btn-circle-arrow">↗</span>
            </a>
          </div>

          {/* Right Column: Stats Grid Cards */}
          <div className="resume-stats-col">
            <div className="resume-stat-card">
              <div className="resume-stat-number">
                <CountUpNumber target={3} startTrigger={resumeInView} /><span className="plus">+</span>
              </div>
              <div className="resume-stat-label">
                <span>Years</span>
                <span>of experience</span>
              </div>
            </div>

            <div className="resume-stat-card">
              <div className="resume-stat-number">
                <CountUpNumber target={30} startTrigger={resumeInView} /><span className="plus">+</span>
              </div>
              <div className="resume-stat-label">
                <span>Projects</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="resume-stat-card">
              <div className="resume-stat-number">
                <CountUpNumber target={25} startTrigger={resumeInView} /><span className="plus">+</span>
              </div>
              <div className="resume-stat-label">
                <span>Clients</span>
                <span>Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="contact-section-new fade-in-section">
        <div className="contact-top-row">
          <div className="contact-heading-area">
            <div className="contact-label-row">
              <span className="contact-label-block"></span>
              <span className="contact-label-block"></span>
              <span className="contact-label-block dark"></span>
              <span className="contact-label-text">Contact</span>
            </div>
            <h2 className="contact-main-title">Contact Us</h2>
          </div>
          <p className="contact-intro-text">
            Explore ideas, strategies, and creative insights that help brands grow and digital experiences stand out.
          </p>
        </div>

        <div className="contact-body-row">
          {/* Left: Info Column */}
          <div className="contact-info-col">
            <div className="contact-info-block">
              <h4>Office Location</h4>
              <p>149/25,<br />Amandoluwa Seeduwa.</p>
            </div>
            <div className="contact-info-block">
              <h4>Office Time</h4>
              <p>Monday - Sunday<br />8am - 7pm</p>
            </div>
            <div className="contact-info-block">
              <h4>Support</h4>
              <p>adithyasahan09@gmail.com<br />+94 71 679 0508</p>
            </div>
          </div>

          {/* Right: Form Column */}
          <div className="contact-form-col">
            {submitStatus === 'success' ? (
              <div className="contact-success-card">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Sahan has received your project details and will reply within 24 hours.</p>
                <p className="success-subtext">A verification/submission alert will arrive in your inbox shortly.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="contact-submit-btn"
                  style={{ marginTop: '20px', width: 'auto', padding: '12px 30px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form-new">
                <div className="form-row-pair">
                  <div className="form-field-new">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field-new">
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row-pair">
                  <div className="form-field-new">
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    />
                  </div>
                  <div className="form-field-new">
                    <input
                      type="url"
                      placeholder="www.example.com"
                      value={formState.website}
                      onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-field-new full-width">
                  <select
                    required
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  >
                    <option value="" disabled>Select your services</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Branding">Branding</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-field-new full-width">
                  <textarea
                    rows="3"
                    placeholder="Project description"
                    required
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  ></textarea>
                </div>
                {submitStatus === 'error' && (
                  <p className="contact-error-text">❌ Failed to send message. Please try again.</p>
                )}
                <button type="submit" className="contact-submit-btn" disabled={submitStatus === 'submitting'}>
                  {submitStatus === 'submitting' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer-section-lux">
        <div className="footer-content-lux">
          {/* Left Column: Brand info */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <span className="footer-brand-text">Sahan Adithya</span>
            </div>
            <p className="footer-tagline">
              Crafting premium digital experiences, full stack systems, and intelligent IoT solutions with absolute precision.
            </p>
            <div className="footer-socials-square">
              <a href="https://github.com/SahanAdithya" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/sahan-adithya-32a941359/" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              <a href="https://www.instagram.com/__.sahan.adithya.__/" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
              <a href="mailto:adithyasahan09@gmail.com"><FiMail /></a>
            </div>
          </div>

          {/* Right Columns: Nav Grid */}
          <div className="footer-nav-grid-lux">
            <div className="footer-nav-col">
              <h3>Quick Links</h3>
              <ul>
                <li onClick={() => scrollToSection('home')}>Home</li>
                <li onClick={() => scrollToSection('about')}>About</li>
                <li onClick={() => scrollToSection('projects')}>Projects</li>
                <li onClick={() => scrollToSection('resume')}>Resume</li>
                <li onClick={() => scrollToSection('contact')}>Contact</li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3>Contact Info</h3>
              <ul>
                <li className="footer-contact-item">adithyasahan09@gmail.com</li>
                <li className="footer-contact-item">+94 71 679 0508</li>
                <li className="footer-contact-item">149/25, Amandoluwa Seeduwa.</li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3>Services</h3>
              <ul>
                <li>Full Stack Web</li>
                <li>Machine Learning</li>
                <li>Embedded Systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized cropped background watermark watermark text */}
        <div className="footer-giant-bg-text">
          Sahan
        </div>

        <div className="footer-bottom-lux">
          <span className="copyright-lux">© 2026 Sahan Adithya. All Rights Reserved.</span>
        </div>
      </footer>

      {/* Full-section Hover Details Overlay - Positioned outside all container clipping layers */}
      <div
        className={`projects-hover-overlay-lux ${isDetailOpen ? 'visible' : ''}`}
        onClick={() => {
          setIsDetailOpen(false);
          setActiveProjectIndex(2);
        }}
      >
        {isDetailOpen && (
          <div className="hover-overlay-content-structured" onClick={(e) => e.stopPropagation()}>
            {/* Sleek Close Button directly inside the card */}
            <div className="hover-overlay-close-btn" onClick={() => {
              setIsDetailOpen(false);
              setActiveProjectIndex(2);
            }}>✕</div>

            {/* Left Column: Image Box */}
            <div className="overlay-image-column">
              {activeProject.image ? (
                <img src={activeProject.image} alt={activeProject.title} className="overlay-project-img" />
              ) : (
                <div className="overlay-image-placeholder" style={{ '--accent-color': activeProject.color }}>
                  <span style={{ color: activeProject.color }}>{activeProject.title}</span>
                </div>
              )}
            </div>

            {/* Right Column: Structured Details */}
            <div className="overlay-details-column">
              <div className="details-header-tag">About the project</div>
              <div className="details-project-status">{activeProject.status}</div>
              <h2 className="details-project-title">{activeProject.title}</h2>

              <p className="details-project-description">
                {activeProject.description}
              </p>

              <a
                href={activeProject.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="details-view-more"
              >
                View More <span className="arrow">↗</span>
              </a>

              <div className="details-tech-section">
                <div className="tech-section-title">TECHNOLOGIES</div>
                <div className="details-tech-grid">
                  {activeProject.tech.map((tag) => (
                    <span key={tag} className="tech-badge-structured">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}

export default App;