import { motion } from 'framer-motion';
import { mockBookings } from '../../data/bookings';

const STATUS_COLORS = {
  confirmed: { bg: 'rgba(74,222,128,0.12)', color: '#4ade80', border: 'rgba(74,222,128,0.25)' },
  pending:   { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  cancelled: { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.25)' },
};

const fmt = (price, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);

const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const AdminBookings = () => {
  const confirmed = mockBookings.filter(b => b.status === 'confirmed').length;
  const pending = mockBookings.filter(b => b.status === 'pending').length;
  const revenue = mockBookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.totalPrice, 0);

  const STATS = [
    { label: 'Total Bookings', value: mockBookings.length, color: 'var(--gold)' },
    { label: 'Confirmed', value: confirmed, color: '#4ade80' },
    { label: 'Pending', value: pending, color: '#fbbf24' },
    { label: 'Revenue (Confirmed)', value: fmt(revenue), color: 'var(--gold)' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Bookings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>All charter reservations — confirmed, pending and cancelled.</p>
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

      {/* Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>All Reservations</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Reference', 'Client', 'Yacht', 'Destination', 'Dates', 'Guests', 'Total', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b, i) => {
                const s = STATUS_COLORS[b.status] || STATUS_COLORS.pending;
                return (
                  <motion.tr key={b._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>{b.reference}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.client}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{b.email}</p>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{b.yacht}</td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{b.destination}</td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                      {fmtDate(b.startDate)} → {fmtDate(b.endDate)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)', textAlign: 'center' }}>{b.guests}</td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(b.totalPrice, b.currency)}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.72rem', fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}`, textTransform: 'capitalize' }}>
                        {b.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
