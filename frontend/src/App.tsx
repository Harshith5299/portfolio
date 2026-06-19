import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import profilePic from './assets/profile.jpg'
import './App.css'
import { AboutMeSection } from './components/AboutMeSection';

function App() {
  const [count, setCount] = useState(0)
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)

  return (
    <>
      {/* Welcome Section — normal document flow, centres via CSS */}
      <div className="welcome-section">
        <h1>Welcome to my Portfolio Website!</h1>
        <p>This website showcases my projects and skills as a full stack software developer.</p>
      </div>

      {/* About Me Card — full-width on mobile, capped on wider screens */}
      <div className={`about-me-container ${isAboutExpanded ? 'expanded' : ''}`}>
        <div
          className={`about-me-header ${isAboutExpanded ? 'expanded' : ''}`}
          onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          role="button"
          aria-expanded={isAboutExpanded}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsAboutExpanded(!isAboutExpanded)}
        >
          <img src={profilePic} alt="Profile picture of Harshith Chittajallu" className="profile-pic" />
          <span className="expand-btn">{isAboutExpanded ? 'About Me ▲' : 'About Me ▼'}</span>
        </div>

        {isAboutExpanded && (
          <div className="about-me-content">
            <h3>Harshith Chittajallu</h3>
            <p>Full Stack Software Developer</p>
            <AboutMeSection />
            <div className="skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">FastAPI</span>
            </div>
          </div>
        )}
      </div>

      {/* Vite + React demo section */}
      <div className="logo-row">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
