import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { USE_MOCK } from '../../data/config';
import { mockLeads } from '../../data/leads';

const LeadsInbox = () => {
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockLeads)
        : api.get('/leads').then(r => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => api.put(`/leads/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast.success('Status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      toast.success('Lead removed');
    },
  });

  const statusColor = { new: 'badge-red', read: 'badge-gold', replied: 'badge-green' };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Leads Inbox</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{leads?.length ?? 0} total enquiries</p>
      </div>

      {isLoading ? (
        <div className="loading-spinner"><div className="spinner" /></div>
      ) : leads?.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📭</p>
          <p>No enquiries yet. Share your fleet and they will come!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {leads.map((lead, i) => (
            <motion.div
              key={lead._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ background: 'var(--bg-card)', border: `1px solid ${lead.status === 'new' ? 'rgba(248,113,113,0.3)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-lg)', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{lead.name}</span>
                  <span className={`badge ${statusColor[lead.status] || 'badge-gold'}`}>{lead.status}</span>
                  {lead.yachtName && <span className="badge badge-gold">Re: {lead.yachtName}</span>}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={`mailto:${lead.email}`} style={{ color: 'var(--gold)', fontSize: '0.85rem', textDecoration: 'none' }}>{lead.email}</a>
                  {lead.phone && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{lead.phone}</span>}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(lead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', borderLeft: '2px solid var(--border)' }}>
                  {lead.message}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '140px' }}>
                {lead.status !== 'read' && (
                  <button onClick={() => updateMutation.mutate({ id: lead._id, status: 'read' })} className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem', justifyContent: 'center' }}>
                    Mark Read
                  </button>
                )}
                {lead.status !== 'replied' && (
                  <button onClick={() => updateMutation.mutate({ id: lead._id, status: 'replied' })} className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem', justifyContent: 'center' }}>
                    Mark Replied
                  </button>
                )}
                <a href={`mailto:${lead.email}?subject=Re: Your Yacht Enquiry&body=Dear ${lead.name},%0D%0A%0D%0AThank you for your enquiry.%0D%0A%0D%0ABest regards,%0D%0ATropical Boat Team`} className="btn btn-gold" style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem', textAlign: 'center' }}>
                  Reply
                </a>
                <button onClick={() => { if(window.confirm('Delete this lead?')) deleteMutation.mutate(lead._id); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.78rem', padding: '0.25rem', textAlign: 'center' }}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsInbox;
