import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color: 'var(--gold)' }}>Prestige Yachts</span>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '280px', lineHeight: 1.8 }}>
              The world's finest superyachts, curated for the discerning few. Charter or acquire your floating masterpiece.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[{ to: '/fleet', label: 'The Fleet' }, { to: '/about', label: 'About Us' }, { to: '/lifestyle', label: 'Lifestyle' }].map(l => (
                <Link key={l.to} to={l.to} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Charter', 'Sales', 'Management', 'Crew'].map(s => (
                <span key={s} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Make an Enquiry</Link>
              <a href="mailto:info@prestigeyachts.com" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>info@prestigeyachts.com</a>
              <a href="tel:+33000000000" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>+33 6 00 00 00 00</a>
            </div>
          </div>
        </div>

        <div className="gold-line" />

        <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {year} Prestige Yachts. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/admin" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
