import { motion } from 'framer-motion';
import { mockBookings } from '../../data/bookings';
import { mockYachts } from '../../data/yachts';
import { mockLeads } from '../../data/leads';

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 95000 },
  { month: 'Mar', revenue: 210000 },
  { month: 'Apr', revenue: 175000 },
  { month: 'May', revenue: 760000 },
  { month: 'Jun', revenue: 480000 },
  { month: 'Jul', revenue: 520000 },
  { month: 'Aug', revenue: 390000 },
  { month: 'Sep', revenue: 145000 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 },
];

const TOP_DESTINATIONS = [
  { name: 'Mediterranean', bookings: 14, pct: 38 },
  { name: 'Caribbean', bookings: 9, pct: 24 },
  { name: 'Greek Islands', bookings: 7, pct: 19 },
  { name: 'Côte d\'Azur', bookings: 5, pct: 14 },
  { name: 'Balearics', bookings: 2, pct: 5 },
];

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 0 }).format(n);

const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.revenue));

const AdminAnalytics = () => {
  const totalRevenue = mockBookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.totalPrice, 0);
  const conversionRate = Math.round((mockBookings.filter(b => b.status === 'confirmed').length / mockLeads.length) * 100);
  const avgCharter = Math.round(totalRevenue / mockBookings.filter(b => b.status === 'confirmed').length);

  const STATS = [
    { label: 'Total Revenue (YTD)', value: fmt(totalRevenue), color: 'var(--gold)' },
    { label: 'Lead → Booking Rate', value: `${conversionRate}%`, color: '#4ade80' },
    { label: 'Avg. Charter Value', value: fmt(avgCharter), color: 'var(--gold)' },
    { label: 'Active Yachts', value: mockYachts.filter(y => y.status === 'available').length, color: '#4ade80' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Analytics</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Revenue trends, lead conversion, and top destinations.</p>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {STATS.map(({ label, value, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem 1.75rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color, lineHeight: 1 }}>{value}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Revenue Bar Chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Monthly Revenue</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>Charter revenue Jan – Dec 2026</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '160px' }}>
            {MONTHLY_REVENUE.map(({ month, revenue }, i) => {
              const h = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
              return (
                <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.5 }}
                    style={{ width: '100%', borderRadius: '4px 4px 0 0', background: revenue > 0 ? 'linear-gradient(to top, var(--gold), rgba(197,179,89,0.5))' : 'var(--border-subtle)', minHeight: '4px' }}
                    title={`${month}: ${fmt(revenue)}`}
                  />
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Destinations */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Top Destinations</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>By booking volume</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {TOP_DESTINATIONS.map(({ name, bookings, pct }, i) => (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>{name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bookings} bookings</p>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-subtle)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }}
                    style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(to right, var(--gold), rgba(197,179,89,0.5))' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Requested Yachts */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Most Requested Yachts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {[
            { name: 'Lürssen Areti', requests: 12, revenue: 760000 },
            { name: 'Majesty 175', requests: 9, revenue: 360000 },
            { name: 'Feadship Excellence', requests: 8, revenue: 250000 },
            { name: '150 Palmer-Johnson', requests: 7, revenue: 120000 },
            { name: 'Benetti Vivace 125', requests: 5, revenue: 95000 },
            { name: 'Sunreef 80', requests: 4, revenue: 65000 },
          ].map(({ name, requests, revenue }, i) => (
            <motion.div key={name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'rgba(197,179,89,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{name}</p>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--gold)' }}>#{i + 1}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{requests} requests &nbsp;·&nbsp; <span style={{ color: 'var(--gold)' }}>{fmt(revenue)}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
