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
            <span className="hero__company hero__company--amazon">
              {/* Amazon: not in Simple Icons (trademark); using branded 'a' initial mark */}
              <span className="hero__company-icon hero__company-icon--amazon" aria-hidden>a</span>
              Amazon
            </span>
            <span className="hero__companies-sep">·</span>
            <span className="hero__company hero__company--ge">
              {/* General Electric — Simple Icons siGeneralelectric (MIT) */}
              <span className="hero__company-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M12.001 24C5.385 24 0 18.647 0 11.999 0 5.385 5.385 0 12.001 0 18.614 0 24 5.385 24 11.999 24 18.647 18.614 24 12.001 24zm0-23.436C5.684.564.565 5.685.565 12c0 6.316 5.12 11.435 11.436 11.435 6.315 0 11.434-5.119 11.434-11.435C23.434 5.717 18.316.564 12.001.564zM22.169 15.42l-.062.013-.034-.043c.002-.019.403-1.202.4-2.56-.005-1.463-.599-2.36-1.363-2.36-.465 0-.798.334-.798.831 0 .898 1.097.964 1.097 2.926 0 .798-.166 1.561-.432 2.393-1.23 4.154-5.153 6.082-8.975 6.082-1.763 0-3.014-.361-3.387-.529-.015-.008-.028-.037-.016-.066l.048-.034c.151.06 1.226.397 2.556.397 1.463 0 2.327-.598 2.327-1.33a.823.823 0 0 0-.832-.829c-.898 0-.964 1.13-2.892 1.13-.831 0-1.561-.166-2.427-.432-4.122-1.263-6.087-5.154-6.084-9.01.002-1.878.527-3.372.536-3.388l.059-.01.035.043c-.049.155-.398 1.228-.398 2.556 0 1.463.598 2.327 1.362 2.327a.789.789 0 0 0 .799-.798c0-.898-1.098-.997-1.098-2.925 0-.831.167-1.562.432-2.426 1.265-4.12 5.154-6.052 8.977-6.081 1.776-.013 3.331.518 3.39.565l.011.06-.044.033c-.018-.002-1.029-.425-2.559-.425-1.429-.001-2.327.598-2.327 1.363 0 .432.333.798.831.798.898 0 .964-1.097 2.892-1.097.831 0 1.562.166 2.427.432 4.156 1.261 6.05 5.185 6.084 8.974.018 1.941-.529 3.41-.535 3.42zm-5.715-2.855c-1.13 0-1.995.832-1.995 1.828 0 .831.498 1.495 1.164 1.495.233 0 .465-.133.465-.432 0-.431-.573-.537-.528-1.184.028-.427.43-.711.828-.711.798 0 1.171.774 1.171 1.57-.034 1.23-.938 2.086-2.001 2.086-1.398 0-2.293-1.33-2.293-2.759 0-2.128 1.396-2.959 2.127-3.158.008-.001 1.911.34 1.852-.499-.026-.369-.575-.511-.974-.527-.441-.017-.885.142-.885.142-.233-.117-.393-.346-.492-.611 1.363-1.03 2.326-2.027 2.326-3.158 0-.598-.4-1.131-1.164-1.131-1.363 0-2.394 1.729-2.394 3.291 0 .266 0 .532.067.766-.865.631-1.507 1.023-2.671 1.721 0-.146.031-.521.128-1.008.399-.432.946-1.079.946-1.578 0-.233-.132-.432-.4-.432-.664 0-1.164.998-1.296 1.695-.3.366-.897.832-1.397.832-.399 0-.531-.366-.566-.498 1.263-.432 2.826-2.162 2.826-3.724 0-.333-.133-1.064-1.13-1.064-1.496 0-2.759 2.228-2.759 3.955-.532 0-.731-.565-.731-.996 0-.432.166-.865.166-.997 0-.134-.067-.3-.266-.3-.499 0-.798.664-.798 1.429.034 1.064.732 1.729 1.663 1.795.132.632.698 1.23 1.396 1.23.432 0 .964-.133 1.33-.465-.034.233-.067.431-.1.631-1.463.765-2.527 1.297-3.491 2.161-.762.698-1.195 1.628-1.195 2.359 0 .997.632 1.928 1.928 1.928 1.529 0 2.693-1.23 3.257-2.925.267-.798.373-1.958.44-3.022 1.529-.864 2.254-1.364 3.051-1.931.099.166.2.3.334.399-.699.366-2.36 1.397-2.36 3.823 0 1.729 1.164 3.656 3.457 3.656 1.895 0 3.191-1.562 3.191-3.057 0-1.362-.765-2.625-2.227-2.625zm-9.141 4.653c-.498.023-.83-.296-.83-.827 0-1.429 1.981-2.793 3.477-3.526-.266 1.996-.939 4.275-2.647 4.353zM8.41 9.374c0-1.097 1.082-3.182 1.745-2.962.781.26-.648 2.364-1.745 2.962zm6.283-.499c0-1.362.923-2.688 1.427-2.436.574.287-.43 1.572-1.427 2.436z"/>
                </svg>
              </span>
              GE Vernova
            </span>
            <span className="hero__companies-sep">·</span>
            <span className="hero__company hero__company--wf">
              {/* Wells Fargo — Simple Icons siWellsfargo (MIT) */}
              <span className="hero__company-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                  <path d="M12.136 13.949c0 .392-.245.616-.719.616h-.628v-1.226h.628c.48 0 .72.212.72.61zM6.922 15.06h1.044l-.523-1.443-.521 1.443zm12.46-1.82c-.72 0-1.109.562-1.109 1.526 0 .97.384 1.526 1.108 1.526.725 0 1.108-.556 1.108-1.526 0-.964-.389-1.526-1.108-1.526zM23.73 0v24H.269V0h23.462zm-5.548 10.652c.484.245.948.354 1.571.354.895 0 1.481-.458 1.481-1.171 0-.6-.357-1.014-1.028-1.172l-.677-.158c-.394-.092-.559-.25-.559-.517 0-.322.25-.523.74-.523s.778.18.89.604l.048.186h.383v-.943a2.927 2.927 0 0 0-1.352-.338c-.911 0-1.497.447-1.497 1.166 0 .556.34.965.996 1.112l.676.152c.432.099.592.273.592.562 0 .354-.261.55-.784.55-.59 0-.894-.24-1.027-.697l-.07-.235h-.383v1.068zm-3.378.245h3.02V9.595h-.383l-.043.19c-.106.486-.255.638-.607.638h-.74V7.557h.506v-.474h-1.753v.474h.453v2.866h-.453v.474zm-3.355 0h3.02V9.595h-.384l-.042.19c-.107.486-.256.638-.608.638h-.74V7.557h.506v-.474H11.45v.474h.452v2.866h-.452v.474zm-8.758-3.34.938 3.34h.74l.778-2.768.756 2.768h.74l.932-3.34h.736v2.866h-.453v.474h3.201V9.595h-.383l-.043.19c-.106.486-.26.638-.607.638h-.922V9.241h1.071a.58.58 0 0 0 .059-.273.55.55 0 0 0-.059-.26h-1.07v-1.15h.884c.357 0 .48.157.596.615l.038.147h.383V7.083H6.49v.474h.522l-.613 2.305-.762-2.779h-.766l-.746 2.774-.624-2.3h.501v-.474H2.266v.474h.426zm1.412 7.002v-1.22h.947c.358 0 .48.158.597.615l.038.147h.383v-1.236H2.857v.474h.453v2.866h-.453v.474h1.78v-.474h-.533v-1.112H5.2a.58.58 0 0 0 .058-.272.551.551 0 0 0-.058-.262H4.104zm9.114 1.913a.461.461 0 0 0-.048-.224.663.663 0 0 1-.112.011c-.245 0-.309-.142-.34-.458l-.022-.201c-.048-.43-.245-.708-.73-.746v-.017c.48-.022.975-.349.975-.964 0-.621-.496-1.008-1.257-1.008H9.542v.474h.453v2.866H9.26l-1.332-3.34H7.22l-1.305 3.34h-.373v.474h1.412v-.474h-.448l.245-.682h1.385l.245.682h-.437v.474h3.35v-.474h-.505v-1.16h.293c.586 0 .761.212.826.762l.02.19c.06.507.31.725.826.725.15 0 .299-.01.416-.027a.46.46 0 0 0 .048-.223zm3.633-1.788h-1.417a.52.52 0 0 0-.059.256c0 .11.016.18.059.268h.634v.964a1.598 1.598 0 0 1-.629.125c-.767 0-1.166-.56-1.166-1.53s.4-1.532 1.124-1.532c.485 0 .767.245.932.67l.058.153h.384v-.976a3.063 3.063 0 0 0-1.412-.337c-1.172 0-1.96.8-1.96 2.027 0 1.231.767 2.016 1.96 2.016.474 0 .964-.136 1.492-.404v-1.7zm4.512.082c0-1.182-.831-2.021-1.982-2.021-1.145 0-1.981.839-1.981 2.021 0 1.188.83 2.022 1.981 2.022 1.156 0 1.982-.834 1.982-2.022z"/>
                </svg>
              </span>
              Wells Fargo
            </span>
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
              href="https://www.linkedin.com/in/harshith-ch"
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
              href="https://wa.me/14088230811"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
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

      <div className="hero__featured-header">
        <span className="hero__featured-label">Featured Work</span>
        <h2 className="hero__featured-title">A sample of what I'm building</h2>
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
            icon: '🤖',
            title: 'AI Agent Platform',
            status: 'planned',
            desc: 'Multi-agent orchestration platform to automate enterprise workflows, triage tickets, and surface contextual insights.',
            tags: ['LangGraph', 'FastAPI', 'TBD'],
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
              <span className={`hero__feat-status hero__feat-status--${p.status === 'live' ? 'live' : p.status === 'planned' ? 'planned' : 'in-dev'}`}>
                {p.status === 'live' ? 'Live' : p.status === 'planned' ? 'Planned' : 'In Dev'}
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
