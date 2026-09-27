import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#hero" className="footer__logo">HC</a>

        <p className="footer__copy">
          © {year} Harshith Chittajallu. Built with React + TypeScript. Deployed on Vercel.
        </p>

        <div className="footer__links">
          <a href="https://github.com/Harshith5299" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/harshith-ch" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:harshithchittajallu5299@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
