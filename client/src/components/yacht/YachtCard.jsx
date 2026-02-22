import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const formatPrice = (price, currency = 'USD', priceType = 'charter') => {
  if (!price) return 'Price on Request';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
  return priceType === 'charter' ? `${formatted}/week` : formatted;
};

const YachtCard = ({ yacht, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/yacht/${yacht._id}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
          <img
            src={yacht.images?.[0] || 'https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=800&q=80'}
            alt={yacht.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 50%)' }} />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
            {yacht.featured && (
              <span className="badge badge-gold" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                Featured
              </span>
            )}
            <span
              className={`badge ${yacht.status === 'available' ? 'badge-green' : 'badge-red'}`}
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            >
              {yacht.status}
            </span>
          </div>

          {/* Price */}
          <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold)',
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              padding: '0.25rem 0.6rem', borderRadius: 'var(--radius)',
            }}>
              {formatPrice(yacht.price, yacht.currency, yacht.priceType)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {yacht.name}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            {yacht.brand} · {yacht.year}
          </p>

          {/* Specs Row */}
          <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            {[
              { label: 'Length', value: yacht.length ? `${yacht.length}ft` : '—' },
              { label: 'Guests', value: yacht.guests ?? '—' },
              { label: 'Cabins', value: yacht.cabins ?? '—' },
            ].map((spec) => (
              <div key={spec.label}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2px' }}>{spec.label}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default YachtCard;
