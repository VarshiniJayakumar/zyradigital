import { useState, useEffect } from 'react';
import Logo from './Logo';

const links = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Features',   href: '#features'   },
  { label: 'Mentor',     href: '#mentor'      },
  { label: 'Pricing',    href: '#pricing'     },
];

export default function Navbar({ onEnroll }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0B1120]/95 backdrop-blur-md shadow-lg shadow-blue-900/20 border-b border-[#1E3A5F]/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={36} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => nav(l.href)}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={onEnroll}
            className="blue-btn text-sm font-bold px-5 py-2 rounded-full">
            Join Now →
          </button>
        </nav>

        {/* Hamburger */}
        <button className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen
            ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111827] border-t border-[#1E3A5F] px-4 py-5 flex flex-col gap-4">
          {links.map(l => (
            <button key={l.label} onClick={() => nav(l.href)}
              className="text-slate-300 hover:text-white text-sm font-medium text-left">
              {l.label}
            </button>
          ))}
          <button onClick={() => { setMenuOpen(false); onEnroll(); }}
            className="blue-btn text-sm font-bold px-5 py-2.5 rounded-full w-fit">
            Join Now →
          </button>
        </div>
      )}
    </header>
  );
}
