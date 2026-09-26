import { useState, type FormEvent } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GitHubIcon } from './Icons';
import './Contact.css';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'harshithchittajallu5299@gmail.com',
    href: 'mailto:harshithchittajallu5299@gmail.com',
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Harshith5299',
    href: 'https://github.com/Harshith5299',
    icon: (
      <GitHubIcon size={18} />
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/harshith-chittajallu',
    href: 'https://linkedin.com/in/harshith-chittajallu',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setFormState('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref as React.RefObject<HTMLElement>}>
      <div className="contact__bg" aria-hidden />
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let's <span>Work Together</span>
          </h2>
          <p className="section-subtitle">
            Open to new opportunities, collaborations, or just a good conversation about tech.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info reveal">
            <h3 className="contact__info-heading">Get in touch</h3>
            <p className="contact__info-text">
              Whether you have a role in mind, a project to discuss, or want to connect —
              my inbox is always open. I typically respond within 24 hours.
            </p>

            <div className="contact__links">
              {CONTACT_LINKS.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="contact__link">
                  <span className="contact__link-icon">{link.icon}</span>
                  <div>
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact__availability">
              <span className="contact__avail-dot" aria-hidden />
              <span>Available for full‑time and contract roles</span>
            </div>
          </div>

          <form className="contact__form reveal" style={{ transitionDelay: '0.1s' }} onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={fields.name}
                onChange={handleChange}
                required
                disabled={formState === 'loading'}
              />
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={fields.email}
                onChange={handleChange}
                required
                disabled={formState === 'loading'}
              />
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={fields.message}
                onChange={handleChange}
                required
                disabled={formState === 'loading'}
              />
            </div>

            {formState === 'success' && (
              <div className="contact__feedback contact__feedback--success">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}

            {formState === 'error' && (
              <div className="contact__feedback contact__feedback--error">
                ✗ Something went wrong. Please try emailing me directly.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={formState === 'loading'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {formState === 'loading' ? (
                <>
                  <span className="contact__spinner" aria-hidden />
                  Sending…
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
