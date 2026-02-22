import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import YachtCard from '../components/yacht/YachtCard';
import api from '../services/api';
import { USE_MOCK } from '../data/config';
import { mockYachts } from '../data/yachts';

const Fleet = () => {
  const [priceType, setPriceType] = useState('');
  const [status, setStatus] = useState('available');

  const { data: yachts, isLoading } = useQuery({
    queryKey: ['yachts', priceType, status],
    queryFn: () => {
      if (USE_MOCK) {
        let results = [...mockYachts];
        if (priceType) results = results.filter(y => y.priceType === priceType);
        if (status) results = results.filter(y => y.status === status);
        return Promise.resolve(results);
      }
      const params = new URLSearchParams();
      if (priceType) params.set('priceType', priceType);
      if (status) params.set('status', status);
      return api.get(`/yachts?${params.toString()}`).then(r => r.data);
    },
  });

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, var(--bg-card), var(--bg-dark))', borderBottom: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label">Our Collection</span>
          <h1>The <span className="gold-gradient">Fleet</span></h1>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
          <p style={{ maxWidth: '500px', margin: '0 auto' }}>From sleek 80-foot sailing yachts to 200-foot megayachts — your perfect vessel awaits.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '1.25rem 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Filter:</span>
          {[
            { label: 'All', value: '' },
            { label: 'Charter', value: 'charter' },
            { label: 'For Sale', value: 'sale' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setPriceType(opt.value)}
              className={`btn ${priceType === opt.value ? 'btn-gold' : 'btn-ghost'}`}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.78rem' }}
            >
              {opt.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            {[
              { label: 'Available', value: 'available' },
              { label: 'All Status', value: '' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`btn ${status === opt.value ? 'btn-outline' : 'btn-ghost'}`}
                style={{ padding: '0.5rem 1rem', fontSize: '0.78rem' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          {isLoading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : yachts?.length > 0 ? (
            <motion.div
              className="grid-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {yachts.map((yacht, i) => (
                <YachtCard key={yacht._id} yacht={yacht} index={i} />
              ))}
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>No yachts found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
