import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { USE_MOCK } from '../data/config';
import { mockYachts } from '../data/yachts';

const YachtDetail = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const { data: yacht, isLoading } = useQuery({
    queryKey: ['yacht', id],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockYachts.find(y => y._id === id) ?? null)
        : api.get(`/yachts/${id}`).then(r => r.data),
  });

  if (isLoading) return <div className="loading-spinner" style={{ height: '100vh' }}><div className="spinner" /></div>;
  if (!yacht) return <div style={{ textAlign: 'center', padding: '10rem 2rem' }}><p>Yacht not found.</p><Link to="/fleet" className="btn btn-gold" style={{ marginTop: '1.5rem' }}>Back to Fleet</Link></div>;

  const imgs = yacht.images?.length ? yacht.images : ['https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=1920&q=80'];

  return (
    <div>
      <Navbar />

      {/* Gallery Hero — full-cover */}
      <div style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
        <motion.img
          key={activeImg}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={imgs[activeImg]}
          alt={yacht.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.35) 50%, rgba(10,10,15,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.3) 0%, transparent 60%)' }} />

        {/* Overlay content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 2rem' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {yacht.featured && <span className="badge badge-gold">Featured</span>}
              <span className={`badge ${yacht.status === 'available' ? 'badge-green' : 'badge-red'}`}>{yacht.status}</span>
              <span className="badge badge-gold">Charter</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.4rem', lineHeight: 1.1 }}
            >
              {yacht.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
            >
              {yacht.brand} · {yacht.year}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
            >
              {[
                { label: 'Length', value: `${yacht.length} ft` },
                { label: 'Guests', value: yacht.guests ?? '—' },
                { label: 'Cabins', value: yacht.cabins ?? '—' },
                { label: 'Crew', value: yacht.crew ?? '—' },
              ].map(s => (
                <div key={s.label} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem' }}>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>{s.label}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>{String(s.value)}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Thumbnail strip — floating bottom right */}
        {imgs.length > 1 && (
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '0.5rem' }}>
            {imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  border: i === activeImg ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  cursor: 'pointer',
                  opacity: i === activeImg ? 1 : 0.65,
                  transition: 'all 0.2s',
                }}
              >
                <img src={img} alt="" style={{ width: '72px', height: '50px', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
        <div>
          <div className="divider" style={{ marginBottom: '2rem' }} />

          <p style={{ margin: '2rem 0', fontSize: '1rem', lineHeight: 1.85 }}>{yacht.description}</p>

          {/* Specs Grid */}
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Specifications</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
            {[
              { label: 'Length', value: `${yacht.length} ft` },
              { label: 'Beam', value: yacht.specs?.beam ? `${yacht.specs.beam} ft` : '—' },
              { label: 'Draft', value: yacht.specs?.draft ? `${yacht.specs.draft} ft` : '—' },
              { label: 'Max Guests', value: yacht.guests ?? '—' },
              { label: 'Cabins', value: yacht.cabins ?? '—' },
              { label: 'Crew', value: yacht.crew ?? '—' },
              { label: 'Top Speed', value: yacht.specs?.speed ? `${yacht.specs.speed} kn` : '—' },
              { label: 'Range', value: yacht.specs?.range ? `${yacht.specs.range} nm` : '—' },
              { label: 'Engines', value: yacht.specs?.engines ?? '—' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>{s.label}</p>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{String(s.value)}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          {yacht.amenities?.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Amenities</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {yacht.amenities.map(a => <span key={a} className="badge badge-gold">{a}</span>)}
              </div>
            </>
          )}
        </div>

        {/* Inquiry Card */}
        <div style={{ position: 'sticky', top: '5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '0.25rem' }}>
            {yacht.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: yacht.currency || 'USD', maximumFractionDigits: 0 }).format(yacht.price) : 'Price on Request'}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            per week
          </p>
          <Link
            to={`/enquire?yacht=${yacht._id}&name=${encodeURIComponent(yacht.name)}`}
            className="btn btn-gold"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '1rem' }}
          >
            Make an Enquiry
          </Link>
          <Link to="/fleet" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.8rem' }}>
            ← Back to Fleet
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default YachtDetail;
