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
import { FaXTwitter } from 'react-icons/fa6'; 

// --- 3. IMAGE IMPORTS ---
import voiceImg from './voice-assistant.png';
import libraryImg from './library-system.png';
import travelImg from './travel-api.png';
import ecommerceImg from './ecommerce-platform.png'; 
import cryptoImg from './crypto-tracker.png';       


function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      const sections = ['home', 'about', 'resume', 'projects', 'contact'];
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollY + (viewportHeight * 0.3);

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

  const iconStyle = { marginRight: '8px', verticalAlign: 'middle' };

  return (
    <div className="App">
      
      {/* --- NAVIGATION --- */}
      <nav className="navbar">
        <div className="nav-links">
          <span className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</span>
          <span className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</span>
          <span className={activeSection === 'resume' ? 'active' : ''} onClick={() => scrollToSection('resume')}>Resume</span>
          <span className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</span>
          <span className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</span>
        </div>
        <div className="phone-number">adithyasahan09@gmail.com</div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="hero-section">
        <div className="hero-overlay">
          <div className="name-container fade-in-section">
            <h2 className="first-name">SAHAN</h2>
            <h1 className="last-name">ADITHYA</h1>
            <p className="subtitle">Computer Science Student</p>
            <div className="hero-buttons">
              <button className="btn-outline" onClick={() => scrollToSection('resume')}>Resume</button>
              <button className="btn-outline" onClick={() => scrollToSection('projects')}>My Projects</button>
            </div>
          </div>
          <div className="social-icons fade-in-section">
            <a href="https://www.linkedin.com/in/sahan-adithya-32a941359/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://github.com/SahanAdithya" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.facebook.com/sahan.adithya.311" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/__.sahan.adithya.__/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://x.com/sahan_adithya09" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          </div>
        </div>
      </header>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-section fade-in-section">
        <div className="about-container">
          <div className="about-text">
            <h3>ABOUT</h3>
            <p className="email">adithyasahan09@gmail.com</p>
            <p className="bio">
              "Motivated Computer Science student at University of Westminster with a strong foundation 
              in software engineering and algorithms. I am passionate about building scalable web applications 
              and solving complex problems through code. Currently honing my skills in Java and Python, 
              I am seeking opportunities to apply my technical knowledge in a real-world setting. Let's build 
              something impactful."
            </p>
            <div className="location-info">
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>
          <div className="about-image">
            {/* Replace this URL with {myProfilePic} if you uncommented the import above */}
            <img src={myProfilePic} alt="Profile" />
          </div>
        </div>
      </section>

      {/* --- RESUME SECTION --- */}
      <section id="resume" className="resume-section">
        <div className="resume-stack">
          
          {/* SOFTWARE SKILLS */}
          <div className="resume-block fade-in-section">
            <h4>SOFTWARE SKILLS</h4>
            <div className="two-column-list">
              <div className="skill-bar">
                <div className="skill-info"><span><FaJava style={iconStyle} /> Java</span><span>90%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}></div></div>
              </div>
              <div className="skill-bar">
                <div className="skill-info"><span><FaPython style={iconStyle} /> Python</span><span>85%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}></div></div>
              </div>
              <div className="skill-bar">
                <div className="skill-info"><span><FaJs style={iconStyle} /> JavaScript</span><span>80%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '80%'}}></div></div>
              </div>
              <div className="skill-bar">
                <div className="skill-info"><span><FaDatabase style={iconStyle} /> SQL / Database</span><span>85%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}></div></div>
              </div>
              <div className="skill-bar">
                <div className="skill-info"><span><FaReact style={iconStyle} /> React / Web</span><span>60%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '60%'}}></div></div>
              </div>
              <div className="skill-bar">
                <div className="skill-info"><span><FaGitAlt style={iconStyle} /> Git / Version Control</span><span>75%</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width: '75%'}}></div></div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="resume-block fade-in-section">
            <h4>EXPERIENCE</h4>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Oct 2025 - Jan 2026</div>
              <div className="timeline-title">Foodz@Yourz Project</div>
              <div className="timeline-desc">Lead Database Architect. Designed EERD and SQL schema for grocery delivery system.</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024 - 2025</div>
              <div className="timeline-title">University Java Suite</div>
              <div className="timeline-desc">Developed OOP-based applications for alumni management.</div>
            </div>
          </div>

          {/* WHAT I DO (Services Grid) */}
          <div className="resume-block services-block fade-in-section">
            <h4>WHAT I DO</h4>
            <p className="services-subtitle">
              I combine technical expertise with creative problem-solving to build robust and user-centric digital solutions.
            </p>
            <div className="services-grid">
              
              <div className="service-card">
                <div className="service-icon"><FaServer /></div>
                <h5>Backend Development</h5>
                <p>Building scalable and secure server-side applications using Java and Python to power your business logic.</p>
              </div>

              <div className="service-card">
                <div className="service-icon"><FaDatabase /></div>
                <h5>Database Design</h5>
                <p>Designing efficient SQL schemas and managing data integrity for high-performance applications.</p>
              </div>

              <div className="service-card">
                <div className="service-icon"><FaNetworkWired /></div>
                <h5>API Construction</h5>
                <p>Creating RESTful APIs that ensure seamless communication between your front-end and back-end systems.</p>
              </div>

              <div className="service-card">
                <div className="service-icon"><FaLaptopCode /></div>
                <h5>Frontend Integration</h5>
                <p>Connecting user interfaces with backend services using modern frameworks like React for dynamic experiences.</p>
              </div>

            </div>
          </div>

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