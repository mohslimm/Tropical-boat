import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/fleet', label: 'The Fleet' },
    { to: '/about', label: 'About' },
    { to: '/lifestyle', label: 'Lifestyle' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 0' : '1.5rem 0',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.95)'
            : 'linear-gradient(to bottom, rgba(10,10,15,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(197,179,89,0.1)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Stepping
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Stones
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                  padding: '0.25rem 0',
                  borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/enquire" className="btn btn-gold" style={{ padding: '0.6rem 1.5rem' }}>
              Enquire
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
            className="hamburger"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--bg-dark)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'Cormorant Garamond, serif' }} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
