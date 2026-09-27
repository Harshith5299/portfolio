import profilePic from '../assets/profile.jpg';
import profilePicWebp from '../assets/profile.webp';
import { GitHubIcon } from './Icons';
import './Hero.css';

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__grid-bg" aria-hidden />
      <div className="hero__blob hero__blob--1" aria-hidden />
      <div className="hero__blob hero__blob--2" aria-hidden />

      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__name">Harshith<br />Chittajallu</h1>
          <div className="hero__role-line">
            <span className="hero__role">Full Stack &amp; Gen AI Developer</span>
          </div>
          <div className="hero__companies">
            <span className="hero__companies-label">Previously at</span>
            <span className="hero__company">Company A</span>
            <span className="hero__companies-sep">·</span>
            <span className="hero__company">Company B</span>
            <span className="hero__companies-sep">·</span>
            <span className="hero__company">Company C</span>
          </div>
          <p className="hero__tagline">
            Building scalable backend services, modern web UIs, and AI&#8209;driven
            applications that help teams make faster, smarter decisions.
          </p>
          <div className="hero__ctas">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v7.44l2.97-2.97a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 111.06-1.06l2.97 2.97V3.75A.75.75 0 0110 3zm-6.25 13.5a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H3.75z" clipRule="evenodd" />
              </svg>
              Resume
            </a>
            <a
              href="https://github.com/Harshith5299"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/harshith-chittajallu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:harshithchittajallu5299@gmail.com"
              className="btn btn-ghost"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              Email
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">5+</span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
            <div className="hero__stat-divider" aria-hidden />
            <div className="hero__stat">
              <span className="hero__stat-num">20+</span>
              <span className="hero__stat-label">Technologies</span>
            </div>
            <div className="hero__stat-divider" aria-hidden />
            <div className="hero__stat">
              <span className="hero__stat-num">Banking</span>
              <span className="hero__stat-label">Domain Expert</span>
            </div>
          </div>
        </div>

        <div className="hero__image">
          <div className="hero__image-ring" aria-hidden />
          <div className="hero__image-ring hero__image-ring--2" aria-hidden />
          <picture>
            <source srcSet={profilePicWebp} type="image/webp" />
            <img src={profilePic} alt="Harshith Chittajallu" className="hero__photo" />
          </picture>
        </div>
      </div>

      <div className="hero__featured">
        {[
          {
            icon: '🎬',
            title: 'Netflix Clone',
            status: 'in-dev',
            desc: 'Full-stack streaming platform with user authentication, dynamic content catalogues, and personalised ML recommendations.',
            tags: ['React', 'FastAPI', 'PostgreSQL'],
            href: '#projects',
          },
          {
            icon: '▶️',
            title: 'YouTube Clone',
            status: 'in-dev',
            desc: 'Video-sharing platform with upload/transcode pipeline, search, subscriptions, and microservices architecture.',
            tags: ['React', 'Kafka', 'FFmpeg'],
            href: '#projects',
          },
          {
            icon: '🛡️',
            title: 'Cybersecurity Dashboard',
            status: 'in-dev',
            desc: 'AI-driven banking security tool using LangGraph agents to surface contextual risk insights and reduce manual review time.',
            tags: ['LangGraph', 'FastAPI', 'AWS'],
            href: '#projects',
          },
        ].map(p => (
          <a
            key={p.title}
            href={p.href}
            className="hero__feat-card"
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <div className="hero__feat-header">
              <div className="hero__feat-icon-title">
                <span className="hero__feat-icon">{p.icon}</span>
                <span className="hero__feat-title">{p.title}</span>
              </div>
              <span className={`hero__feat-status hero__feat-status--${p.status === 'live' ? 'live' : 'in-dev'}`}>
                {p.status === 'live' ? 'Live' : 'In Dev'}
              </span>
            </div>
            <p className="hero__feat-desc">{p.desc}</p>
            <div className="hero__feat-tags">
              {p.tags.map(t => <span key={t} className="hero__feat-tag">{t}</span>)}
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
