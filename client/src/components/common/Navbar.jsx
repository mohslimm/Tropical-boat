import { useState, useEffect, useCallback, memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Anchor } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/fleet',     label: 'The Fleet' },
  { to: '/about',     label: 'About' },
  { to: '/lifestyle', label: 'Lifestyle' },
  { to: '/contact',   label: 'Contact' },
];

const MOBILE_MENU_VARIANTS = {
  hidden:  { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.25 } },
};

const LINK_VARIANTS = {
  hidden:  { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07 + 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ───────────────────────────────────────────────
const Navbar = memo(() => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Scroll detection with cleanup
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes menu
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen(o => !o), []);
  const closeMenu  = useCallback(() => setMenuOpen(false),  []);

  return (
    <>
      <header
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          padding:        scrolled ? '0.75rem 0' : '1.5rem 0',
          background:     scrolled
            ? 'rgba(6, 6, 16, 0.95)'
            : 'linear-gradient(to bottom, rgba(6,6,16,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:   scrolled ? '1px solid rgba(197,160,89,0.12)' : 'none',
          transition:     'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Logo */}
          <Link
            to="/"
            aria-label="Tropical Boat — Accueil"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <Anchor size={18} color="var(--gold)" strokeWidth={1.5} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--gold)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                Tropical
              </span>
              <span style={{
                fontSize: '0.55rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontFamily: 'Outfit, sans-serif',
              }}>
                Boat
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav */}
          <nav className="desktop-nav" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: 'Outfit, sans-serif',
                  color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                  padding: '0.25rem 0',
                  borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/enquire" className="btn btn-gold" style={{ padding: '0.6rem 1.5rem', fontSize: '0.72rem' }}>
              Enquire
            </Link>
          </nav>

          {/* ── Hamburger */}
          <button
            onClick={toggleMenu}
            className="hamburger"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              style={{
                position:   'fixed',
                inset:      0,
                background: 'rgba(6,6,16,0.6)',
                zIndex:     98,
              }}
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu mobile"
              variants={MOBILE_MENU_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position:   'fixed',
                top:        0,
                right:      0,
                bottom:     0,
                width:      'min(320px, 85vw)',
                background: 'var(--bg-primary)',
                borderLeft: '1px solid var(--border-subtle)',
                zIndex:     99,
                display:    'flex',
                flexDirection: 'column',
                padding:    '2rem 1.5rem',
              }}
            >
              {/* Close button */}
              <button
                onClick={closeMenu}
                aria-label="Fermer le menu"
                style={{
                  alignSelf:   'flex-end',
                  background:  'none',
                  border:      'none',
                  color:       'var(--text-primary)',
                  cursor:      'pointer',
                  padding:     '0.5rem',
                  minWidth:    '44px',
                  minHeight:   '44px',
                  display:     'flex',
                  alignItems:  'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  borderRadius: 'var(--radius)',
                  transition:  'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={20} />
              </button>

              {/* Logo mini */}
              <div style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: 'var(--gold)' }}>
                  Tropical Boat
                </span>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.to} custom={i} variants={LINK_VARIANTS} initial="hidden" animate="visible">
                    <NavLink
                      to={link.to}
                      onClick={closeMenu}
                      style={({ isActive }) => ({
                        display:        'block',
                        padding:        '1rem 1.25rem',
                        fontFamily:     'Outfit, sans-serif',
                        fontSize:       '1rem',
                        fontWeight:     isActive ? 500 : 300,
                        color:          isActive ? 'var(--gold)' : 'var(--text-primary)',
                        borderRadius:   'var(--radius)',
                        background:     isActive ? 'rgba(197,160,89,0.08)' : 'transparent',
                        borderLeft:     isActive ? '2px solid var(--gold)' : '2px solid transparent',
                        transition:     'all 0.2s',
                        minHeight:      '44px',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={LINK_VARIANTS}
                initial="hidden"
                animate="visible"
                style={{ marginTop: '2rem' }}
              >
                <Link
                  to="/enquire"
                  onClick={closeMenu}
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                >
                  Enquire Now
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
