import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const articles = [
  {
    title: 'The Med Season: Where to Charter in 2026',
    category: 'Destinations',
    description: 'From the turquoise bays of Croatia to the glamour of the Côte d\'Azur, discover the finest charter cruising grounds of the Mediterranean season.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
  },
  {
    title: 'What\'s Included in a Luxury Yacht Charter',
    category: 'Guide',
    description: 'Crew, fuel, provisions — understanding what your charter fee covers and how to plan for extras. Everything first-timers need to know.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    title: 'The Art of the Charter Contract',
    category: 'Guide',
    description: 'Everything you need to know before signing your charter agreement — from MYBA terms to advance provisioning allowances.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80',
  },
  {
    title: 'Hidden Anchorages Only a Superyacht Can Reach',
    category: 'Destinations',
    description: 'Anchor off white-sand shores inaccessible to any other vessel. Our curators\' picks for the most secluded charter escapes on earth.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
  },
  {
    title: 'Water Toys: What to Expect on Your Charter',
    category: 'Lifestyle',
    description: 'Jet skis, foiling boards, underwater scooters, and more — the onboard toys that make every charter day unforgettable.',
    image: 'https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&q=80',
  },
  {
    title: 'How to Choose the Right Yacht for Your Group',
    category: 'Tips',
    description: 'Motor yacht or sailing catamaran? 8 guests or 18? Our specialists break down the key factors to find your perfect charter vessel.',
    image: 'https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=800&q=80',
  },
];

const Lifestyle = () => {
  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label">Stories & Guides</span>
          <h1>The Yachting <span className="gold-gradient">Lifestyle</span></h1>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
          <p style={{ maxWidth: '500px', margin: '0 auto' }}>Curated insights, destination guides, and the stories behind the world's most extraordinary voyages.</p>
        </div>
      </div>

      {/* Featured Article */}
      <section style={{ marginBottom: '0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '4rem' }}
          >
            <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <div style={{ background: 'var(--bg-card)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '1.25rem' }}>{articles[0].category}</span>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>{articles[0].title}</h2>
              <p style={{ marginBottom: '2rem' }}>{articles[0].description}</p>
              <Link to="/contact" className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>Read More →</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {articles.slice(1).map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card"
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>{article.category}</span>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{article.title}</h3>
                  <p style={{ fontSize: '0.875rem' }}>{article.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lifestyle;
