import { useState, useEffect } from 'react';

const links = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Features', href: '#features' },
  { label: 'Mentor', href: '#mentor' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar({ onEnroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-purple-900/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <span className="text-xl font-bold gradient-text cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ZyraDigital
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={onEnroll}
            className="gradient-btn text-white text-sm font-semibold px-5 py-2 rounded-full"
          >
            Join Now →
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-card border-t border-brand-border px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-gray-300 hover:text-white text-sm font-medium text-left transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onEnroll(); }}
            className="gradient-btn text-white text-sm font-semibold px-5 py-2 rounded-full w-fit"
          >
            Join Now →
          </button>
        </div>
      )}
    </nav>
  );
}
