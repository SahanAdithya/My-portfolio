import React from 'react';
import './App.css';
// --- IMPORTS ---
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub, FaWhatsapp } from 'react-icons/fa';

function App() {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      
      {/* --- NAVIGATION --- */}
      <nav className="navbar">
        <div className="nav-links">
          <span onClick={() => scrollToSection('home')}>Home</span>
          <span onClick={() => scrollToSection('about')}>About</span>
          <span onClick={() => scrollToSection('resume')}>Resume</span>
          <span onClick={() => scrollToSection('contact')}>Contact</span>
        </div>
        <div className="phone-number">+94 71 679 0508</div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="hero-section">
        <div className="hero-overlay">
          
          {/* 1. Name Container */}
          <div className="name-container">
            <h2 className="first-name">SAHAN</h2>
            <h1 className="last-name">ADITHYA</h1>
            <p className="subtitle">Computer Science Student</p>
            <div className="hero-buttons">
              <button className="btn-outline" onClick={() => scrollToSection('resume')}>Resume</button>
              <button className="btn-outline" onClick={() => scrollToSection('about')}>About Me</button>
            </div>
          </div>

          {/* 2. Social Icons */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>

        </div>
      </header>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-section">
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
              <span>Open for Internships</span>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Profile" />
          </div>
        </div>
      </section>

      {/* --- RESUME SECTION --- */}
      <section id="resume" className="resume-section">
        <div className="resume-grid">
          
          {/* COLUMN 1: SKILLS */}
          <div className="resume-col">
            <h4>SOFTWARE SKILLS</h4>
            
            <div className="skill-bar">
              <div className="skill-info"><span>Java</span><span>90%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}></div></div>
            </div>

            <div className="skill-bar">
              <div className="skill-info"><span>Python</span><span>85%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}></div></div>
            </div>

            <div className="skill-bar">
              <div className="skill-info"><span>JavaScript</span><span>80%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '80%'}}></div></div>
            </div>

            <div className="skill-bar">
              <div className="skill-info"><span>SQL / Database</span><span>85%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}></div></div>
            </div>

            <div className="skill-bar">
              <div className="skill-info"><span>React / Web</span><span>60%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '60%'}}></div></div>
            </div>

            <div className="skill-bar">
              <div className="skill-info"><span>Git / Version Control</span><span>75%</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '75%'}}></div></div>
            </div>

            <h4 className="mt-large">LANGUAGES</h4>
            <div className="skill-bar">
              <div className="skill-info"><span>English</span><span>Fluent</span></div>
              <div className="bar-bg"><div className="bar-fill" style={{width: '100%'}}></div></div>
            </div>
          </div>

          {/* COLUMN 2: EXPERIENCE */}
          <div className="resume-col">
            <h4>EXPERIENCE & PROJECTS</h4>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2026 - Present</div>
              <div className="timeline-title">GitHub Portfolio</div>
              <div className="timeline-desc">Building open-source projects.</div>
            </div>
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
            <h4 className="mt-large">EDUCATION</h4>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024 - 2027</div>
              <div className="timeline-title">BSc in Computer Science</div>
              <div className="timeline-desc">University of Westminster</div>
            </div>
          </div>

          {/* COLUMN 3: WHAT CAN I DO? */}
          <div className="resume-col">
            <h4>WHAT CAN I DO?</h4>
            <ul className="service-list">
              <li>Backend Development</li>
              <li>Database Design (SQL)</li>
              <li>REST API Construction</li>
              <li>Unit Testing (JUnit)</li>
            </ul>
            <h4 className="mt-large">DESIGN SKILLS</h4>
            <ul className="service-list">
              <li>UI/UX Prototyping</li>
              <li>AI Image Generation</li>
              <li>Prompt Engineering</li>
            </ul>
            <h4 className="mt-large">INTERESTS</h4>
            <div className="interests-icons">
              <span>💻 Coding</span>
              <span>🎮 Gaming</span>
              <span>📸 AI Art</span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <p>© 2026 Sahan Adithya. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;