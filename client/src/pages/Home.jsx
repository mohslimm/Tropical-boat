import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import YachtCard from '../components/yacht/YachtCard';
import api from '../services/api';
import { USE_MOCK } from '../data/config';
import { mockYachts } from '../data/yachts';

// ─── Constants ──────────────────────────────────────────────
const HERO_IMAGE = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80';

const STATS = [
  { value: '150+', label: 'Charter Yachts' },
  { value: '40+',  label: 'Destinations' },
  { value: '2,000+', label: 'Charters Completed' },
  { value: '500+', label: 'Happy Clients' },
];

const ITEM_VARIANTS = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Component ──────────────────────────────────────────────
const Home = () => {
  const { data: featured, isLoading } = useQuery({
    queryKey: ['yachts', 'featured'],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockYachts.filter(y => y.featured && y.status === 'available'))
        : api.get('/yachts?featured=true&status=available').then(r => r.data),
  });

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'brightness(0.3)',
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(6,6,16,0.95) 0%, rgba(6,6,16,0.4) 60%, rgba(6,6,16,0.7) 100%)',
        }} />
        {/* Gold accent line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
          opacity: 0.5,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="section-label"
          >
            The World's Finest Yachts
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}
          >
            Where Luxury<br />
            <span className="gold-gradient">Meets the Sea</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ fontSize: '1.05rem', maxWidth: '480px', marginBottom: '2.5rem' }}
          >
            Discover an exclusive collection of the world's most prestigious superyachts.
            Charter for a week or acquire your permanent masterpiece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link to="/fleet" className="btn btn-gold" style={{ fontSize: '0.8rem', padding: '1rem 2.5rem' }}>
              Explore the Fleet
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '1rem 2.5rem' }}>
              Make an Enquiry
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ color: 'var(--gold)', fontSize: '1.25rem', opacity: 0.7 }}
          >↓</motion.div>
        </div>
      </section>

      {/* ── Featured Yachts ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Handpicked for You</span>
            <h2>Featured <span className="gold-gradient">Vessels</span></h2>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
          </div>

          {isLoading ? (
            <div className="grid-3">
              {[0, 1, 2].map(i => (
                <div key={i} className="skeleton" style={{ height: '380px', borderRadius: 'var(--radius-lg)' }} />
              ))}
            </div>
          ) : featured && featured.length > 0 ? (
            <div className="grid-3">
              {featured.slice(0, 3).map((yacht, i) => (
                <YachtCard key={yacht._id} yacht={yacht} index={i} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                Aucun yacht disponible pour le moment — notre flotte sera bientôt mise à jour.
              </p>
              <Link to="/contact" className="btn btn-gold">Nous contacter</Link>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/fleet" className="btn btn-outline">View All Yachts</Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '5rem 0',
      }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                variants={ITEM_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '1rem' }}
              >
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>{value}</p>
                <p style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '0.75rem',
                  fontWeight: 500,
                }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Begin Your Journey</span>
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to <span className="gold-gradient">Set Sail?</span></h2>
          <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem', fontSize: '1rem' }}>
            Our charter specialists are available 24/7 to craft your perfect yachting experience.
          </p>
          <Link to="/enquire" className="btn btn-gold" style={{ padding: '1rem 3rem' }}>
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
