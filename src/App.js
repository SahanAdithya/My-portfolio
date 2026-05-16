import React, { useState, useEffect } from 'react';
import './App.css';

// --- 1. ICONS IMPORTS ---
import {
  FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub,
  FaDiscord,
  FaJava, FaPython, FaJs, FaDatabase, FaReact, FaGitAlt, FaEnvelope, FaPhone,
  FaServer, FaNetworkWired, FaLaptopCode
} from 'react-icons/fa';

import myProfilePic from './profile.jpg';
import sahanLogo from './sahan-logo.png';
import sahanLogoNavy from './sahan-logo-navy.png';
import { FaXTwitter } from 'react-icons/fa6';

// --- 3. IMAGE IMPORTS ---
import heroBg from './hero-bg.png';
import voiceImg from './voice-assistant.png';
import libraryImg from './library-system.png';
import travelImg from './travel-api.png';
import ecommerceImg from './ecommerce-platform.png';
import cryptoImg from './crypto-tracker.png';


function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    everyone: "I’m a Computer Science undergraduate with a lifelong passion for technology and a knack for building clean, well-planned solutions to real-world problems. For me, writing code isn't just about making things work—it's about clarity, proper formatting, and purposeful, modern execution.",
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

        {/* TECH STACK BAR */}
        <div className="tech-stack-bar-lux">
          <div className="tech-item-lux"><span>JS</span> JAVASCRIPT</div>
          <div className="tech-item-lux"><span>TS</span> TYPESCRIPT</div>
          <div className="tech-item-lux"><span>JAVA</span> JAVA</div>
          <div className="tech-item-lux"><span>C++</span> C++</div>
          <div className="tech-item-lux"><span>NEXT</span> NEXT.JS</div>
          <div className="tech-item-lux"><span>REACT</span> REACT</div>
          <div className="tech-item-lux"><span>CSS</span> TAILWIND CSS</div>
          <div className="tech-item-lux"><span>FIGMA</span> FIGMA</div>
        </div>
      </section>



      {/* --- PROJECTS SECTION (Marquee Animation) --- */}
      <section id="projects" className="projects-section fade-in-section">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="section-underline"></div>
        </div>

        <div className="projects-scroll-container">
          <div className="projects-track">

            {/* === SET 1: ORIGINAL CARDS === */}

            {/* Project 1 */}
            <div className="project-card">
              <div className="image-container">
                <img src={voiceImg} alt="AI Voice Assistant" />
              </div>
              <div className="card-content">
                <h3>AI Voice Assistant</h3>
                <p>A desktop voice assistant capable of automating tasks, managing schedules, and retrieving web information using natural language processing.</p>
                <div className="tech-tags">
                  <span className="tag">Python</span>
                  <span className="tag">NLP</span>
                  <span className="tag">APIs</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="image-container">
                <img src={libraryImg} alt="Library System" />
              </div>
              <div className="card-content">
                <h3>Library System</h3>
                <p>A comprehensive Java application for managing library books, member records, and loan history with a MySQL database integration.</p>
                <div className="tech-tags">
                  <span className="tag">Java</span>
                  <span className="tag">MySQL</span>
                  <span className="tag">OOP</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="image-container">
                <img src={travelImg} alt="Travel Booking API" />
              </div>
              <div className="card-content">
                <h3>Travel Booking API</h3>
                <p>Designed a RESTful API for a travel booking platform. Handles user authentication, flight search, and secure payment processing.</p>
                <div className="tech-tags">
                  <span className="tag">Node.js</span>
                  <span className="tag">Express</span>
                  <span className="tag">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card">
              <div className="image-container">
                <img src={ecommerceImg} alt="E-commerce Platform" />
              </div>
              <div className="card-content">
                <h3>ShopEasy E-commerce</h3>
                <p>A full-stack e-commerce application with product listings, a shopping cart, user authentication, and secure payment integration.</p>
                <div className="tech-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card">
              <div className="image-container">
                <img src={cryptoImg} alt="Crypto Price Tracker" />
              </div>
              <div className="card-content">
                <h3>Crypto Price Tracker</h3>
                <p>A real-time dashboard tracking cryptocurrency prices, market caps, and historical data using a public API with interactive charts.</p>
                <div className="tech-tags">
                  <span className="tag">React</span>
                  <span className="tag">API</span>
                  <span className="tag">Chart.js</span>
                </div>
              </div>
            </div>


            {/* === SET 2: DUPLICATE CARDS (For Seamless Loop) === */}

            {/* Project 1 Duplicate */}
            <div className="project-card">
              <div className="image-container">
                <img src={voiceImg} alt="AI Voice Assistant" />
              </div>
              <div className="card-content">
                <h3>AI Voice Assistant</h3>
                <p>A desktop voice assistant capable of automating tasks, managing schedules, and retrieving web information using natural language processing.</p>
                <div className="tech-tags">
                  <span className="tag">Python</span>
                  <span className="tag">NLP</span>
                  <span className="tag">APIs</span>
                </div>
              </div>
            </div>

            {/* Project 2 Duplicate */}
            <div className="project-card">
              <div className="image-container">
                <img src={libraryImg} alt="Library System" />
              </div>
              <div className="card-content">
                <h3>Library System</h3>
                <p>A comprehensive Java application for managing library books, member records, and loan history with a MySQL database integration.</p>
                <div className="tech-tags">
                  <span className="tag">Java</span>
                  <span className="tag">MySQL</span>
                  <span className="tag">OOP</span>
                </div>
              </div>
            </div>

            {/* Project 3 Duplicate */}
            <div className="project-card">
              <div className="image-container">
                <img src={travelImg} alt="Travel Booking API" />
              </div>
              <div className="card-content">
                <h3>Travel Booking API</h3>
                <p>Designed a RESTful API for a travel booking platform. Handles user authentication, flight search, and secure payment processing.</p>
                <div className="tech-tags">
                  <span className="tag">Node.js</span>
                  <span className="tag">Express</span>
                  <span className="tag">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 4 Duplicate */}
            <div className="project-card">
              <div className="image-container">
                <img src={ecommerceImg} alt="E-commerce Platform" />
              </div>
              <div className="card-content">
                <h3>ShopEasy E-commerce</h3>
                <p>A full-stack e-commerce application with product listings, a shopping cart, user authentication, and secure payment integration.</p>
                <div className="tech-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 5 Duplicate */}
            <div className="project-card">
              <div className="image-container">
                <img src={cryptoImg} alt="Crypto Price Tracker" />
              </div>
              <div className="card-content">
                <h3>Crypto Price Tracker</h3>
                <p>A real-time dashboard tracking cryptocurrency prices, market caps, and historical data using a public API with interactive charts.</p>
                <div className="tech-tags">
                  <span className="tag">React</span>
                  <span className="tag">API</span>
                  <span className="tag">Chart.js</span>
                </div>
              </div>
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