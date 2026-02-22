import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { USE_MOCK } from '../../data/config';
import { mockYachts } from '../../data/yachts';
import { mockLeads } from '../../data/leads';

const statCard = (label, value, color = 'var(--gold)') => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem 2rem' }}
  >
    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</p>
    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 600, color, lineHeight: 1 }}>{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const { data: yachts } = useQuery({
    queryKey: ['admin-yachts'],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockYachts)
        : api.get('/yachts').then(r => r.data),
  });
  const { data: leads } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockLeads)
        : api.get('/leads').then(r => r.data),
  });

  const totalYachts = yachts?.length ?? '—';
  const availableYachts = yachts?.filter(y => y.status === 'available').length ?? '—';
  const totalLeads = leads?.length ?? '—';
  const newLeads = leads?.filter(l => l.status === 'new').length ?? '—';

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Overview of your yacht platform.</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '3rem' }}>
        {statCard('Total Yachts', totalYachts)}
        {statCard('Available', availableYachts, '#4ade80')}
        {statCard('Total Leads', totalLeads)}
        {statCard('New Leads', newLeads, '#f87171')}
      </div>

      {/* Recent Leads */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'Manrope, sans-serif', fontWeight: 600 }}>Recent Enquiries</h3>
        </div>
        <div>
          {leads?.slice(0, 5).map((lead) => (
            <div key={lead._id} style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{lead.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{lead.email}</p>
                {lead.yachtName && <p style={{ color: 'var(--gold)', fontSize: '0.75rem', marginTop: '2px' }}>Re: {lead.yachtName}</p>}
              </div>
              <span className={`badge ${lead.status === 'new' ? 'badge-red' : lead.status === 'replied' ? 'badge-green' : 'badge-gold'}`}>
                {lead.status}
              </span>
            </div>
          ))}
          {!leads?.length && (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)' }}>No enquiries yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
