import { motion } from 'framer-motion';
import { mockClients } from '../../data/bookings';

const STATUS_STYLES = {
  vip:      { bg: 'rgba(197,179,89,0.12)', color: 'var(--gold)', border: 'rgba(197,179,89,0.3)' },
  active:   { bg: 'rgba(74,222,128,0.12)', color: '#4ade80',     border: 'rgba(74,222,128,0.25)' },
  inactive: { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8',     border: 'rgba(148,163,184,0.2)' },
};

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const AdminClients = () => {
  const vipCount   = mockClients.filter(c => c.status === 'vip').length;
  const totalSpent  = mockClients.reduce((s, c) => s + c.totalSpent, 0);
  const totalCharters = mockClients.reduce((s, c) => s + c.totalCharters, 0);

  const STATS = [
    { label: 'Total Clients', value: mockClients.length, color: 'var(--gold)' },
    { label: 'VIP Clients', value: vipCount, color: 'var(--gold)' },
    { label: 'Total Charters', value: totalCharters, color: '#4ade80' },
    { label: 'Total Revenue', value: fmt(totalSpent), color: 'var(--gold)' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Clients</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your client roster — charter history and contact details.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {STATS.map(({ label, value, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 1.75rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color, lineHeight: 1 }}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Client Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {mockClients.map((c, i) => {
          const s = STATUS_STYLES[c.status] || STATUS_STYLES.inactive;
          const initials = c.name.split(' ').map(w => w[0]).join('').slice(0, 2);
          return (
            <motion.div key={c._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #a8873a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#0a0a0f', flexShrink: 0 }}>{initials}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{c.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.country}</p>
                </div>
                <span style={{ padding: '0.25rem 0.65rem', borderRadius: '2rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{c.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Charters', value: c.totalCharters },
                  { label: 'Total Spent', value: fmt(c.totalSpent) },
                  { label: 'Last Charter', value: fmtDate(c.lastCharter) },
                  { label: 'Member Since', value: fmtDate(c.joinedAt) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{label}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <a href={`mailto:${c.email}`} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>✉ {c.email}</a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminClients;
