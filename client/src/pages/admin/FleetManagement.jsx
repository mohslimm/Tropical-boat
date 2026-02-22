import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { USE_MOCK } from '../../data/config';
import { mockYachts } from '../../data/yachts';

const defaultYacht = {
  name: '', brand: '', year: '', length: '', guests: '', cabins: '', crew: '',
  price: '', priceType: 'charter', currency: 'USD', description: '',
  amenities: '', images: '', featured: false, status: 'available',
  specs_beam: '', specs_draft: '', specs_engines: '', specs_speed: '', specs_range: '',
};

const buildPayload = (data) => ({
  ...data,
  year: Number(data.year) || undefined,
  length: Number(data.length) || undefined,
  guests: Number(data.guests) || undefined,
  cabins: Number(data.cabins) || undefined,
  crew: Number(data.crew) || undefined,
  price: Number(data.price) || undefined,
  amenities: data.amenities ? data.amenities.split(',').map(s => s.trim()).filter(Boolean) : [],
  images: data.images ? data.images.split('\n').map(s => s.trim()).filter(Boolean) : [],
  specs: {
    beam: Number(data.specs_beam) || undefined,
    draft: Number(data.specs_draft) || undefined,
    engines: data.specs_engines || undefined,
    speed: Number(data.specs_speed) || undefined,
    range: Number(data.specs_range) || undefined,
  },
});

const FleetManagement = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editYacht, setEditYacht] = useState(null);

  const { data: yachts, isLoading } = useQuery({
    queryKey: ['admin-yachts'],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(mockYachts)
        : api.get('/yachts').then(r => r.data),
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({ defaultValues: defaultYacht });

  const openAdd = () => { reset(defaultYacht); setEditYacht(null); setModalOpen(true); };
  const openEdit = (yacht) => {
    reset({
      ...defaultYacht, ...yacht,
      amenities: yacht.amenities?.join(', ') ?? '',
      images: yacht.images?.join('\n') ?? '',
      specs_beam: yacht.specs?.beam ?? '',
      specs_draft: yacht.specs?.draft ?? '',
      specs_engines: yacht.specs?.engines ?? '',
      specs_speed: yacht.specs?.speed ?? '',
      specs_range: yacht.specs?.range ?? '',
    });
    setEditYacht(yacht);
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data) => editYacht
      ? api.put(`/yachts/${editYacht._id}`, buildPayload(data)).then(r => r.data)
      : api.post('/yachts', buildPayload(data)).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-yachts'] });
      toast.success(editYacht ? 'Yacht updated!' : 'Yacht added!');
      setModalOpen(false);
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Error saving yacht'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/yachts/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-yachts'] }); toast.success('Yacht removed'); },
    onError: () => toast.error('Error deleting yacht'),
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) deleteMutation.mutate(id);
  };

  const inputStyle = { width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '0.7rem 0.9rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'Manrope, sans-serif', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Fleet Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{yachts?.length ?? 0} yachts in the system</p>
        </div>
        <button onClick={openAdd} className="btn btn-gold" style={{ fontSize: '0.85rem' }}>+ Add Yacht</button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {isLoading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Yacht', 'Brand', 'Length', 'Price', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yachts?.map((y) => (
                <tr key={y._id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {y.images?.[0] && <img src={y.images[0]} alt={y.name} style={{ width: '44px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />}
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{y.name}</span>
                      {y.featured && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>★</span>}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{y.brand}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{y.length ? `${y.length}ft` : '—'}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600 }}>
                    {y.price ? new Intl.NumberFormat('en-US', { style: 'currency', currency: y.currency || 'USD', maximumFractionDigits: 0 }).format(y.price) : 'POR'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}><span className="badge badge-gold">{y.priceType}</span></td>
                  <td style={{ padding: '1rem 1.25rem' }}><span className={`badge ${y.status === 'available' ? 'badge-green' : 'badge-red'}`}>{y.status}</span></td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(y)} className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>Edit</button>
                      <button onClick={() => handleDelete(y._id, y.name)} className="btn" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '720px', padding: '2.5rem', margin: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>{editYacht ? 'Edit Yacht' : 'Add New Yacht'}</h3>
                <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
              </div>

              <form onSubmit={handleSubmit(d => saveMutation.mutate(d))}>
                {/* Basic Info */}
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Basic Information</p>
                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>Name *</label><input style={inputStyle} {...register('name', { required: true })} placeholder="Yacht name" /></div>
                  <div><label style={labelStyle}>Brand</label><input style={inputStyle} {...register('brand')} placeholder="e.g. Feadship" /></div>
                  <div><label style={labelStyle}>Year</label><input style={inputStyle} type="number" {...register('year')} placeholder="2022" /></div>
                  <div><label style={labelStyle}>Length (ft)</label><input style={inputStyle} type="number" {...register('length')} placeholder="150" /></div>
                  <div><label style={labelStyle}>Guests</label><input style={inputStyle} type="number" {...register('guests')} placeholder="12" /></div>
                  <div><label style={labelStyle}>Cabins</label><input style={inputStyle} type="number" {...register('cabins')} placeholder="6" /></div>
                  <div><label style={labelStyle}>Crew</label><input style={inputStyle} type="number" {...register('crew')} placeholder="8" /></div>
                  <div><label style={labelStyle}>Status</label>
                    <select style={inputStyle} {...register('status')}>
                      <option value="available">Available</option>
                      <option value="chartered">Chartered</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', margin: '1.5rem 0 1rem' }}>Pricing</p>
                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>Price</label><input style={inputStyle} type="number" {...register('price')} placeholder="120000" /></div>
                  <div><label style={labelStyle}>Type</label>
                    <select style={inputStyle} {...register('priceType')}>
                      <option value="charter">Charter (per week)</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                  <div><label style={labelStyle}>Currency</label>
                    <select style={inputStyle} {...register('currency')}>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem' }}>
                    <input type="checkbox" id="featured" {...register('featured')} style={{ width: '18px', height: '18px', accentColor: 'var(--gold)' }} />
                    <label htmlFor="featured" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Mark as Featured</label>
                  </div>
                </div>

                {/* Specs */}
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', margin: '1.5rem 0 1rem' }}>Specifications</p>
                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>Beam (ft)</label><input style={inputStyle} type="number" {...register('specs_beam')} /></div>
                  <div><label style={labelStyle}>Draft (ft)</label><input style={inputStyle} type="number" {...register('specs_draft')} /></div>
                  <div><label style={labelStyle}>Engines</label><input style={inputStyle} {...register('specs_engines')} placeholder="Twin MTU..." /></div>
                  <div><label style={labelStyle}>Top Speed (kn)</label><input style={inputStyle} type="number" {...register('specs_speed')} /></div>
                  <div><label style={labelStyle}>Range (nm)</label><input style={inputStyle} type="number" {...register('specs_range')} /></div>
                </div>

                {/* Description & Media */}
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', margin: '1.5rem 0 1rem' }}>Description & Media</p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inputStyle, height: '90px', resize: 'vertical' }} {...register('description')} placeholder="Describe this yacht..." />
                </div>
                <div className="grid-2">
                  <div>
                    <label style={labelStyle}>Amenities (comma-separated)</label>
                    <input style={inputStyle} {...register('amenities')} placeholder="Jacuzzi, Helipad, Gym" />
                  </div>
                  <div>
                    <label style={labelStyle}>Image URLs (one per line)</label>
                    <textarea style={{ ...inputStyle, height: '60px', resize: 'vertical' }} {...register('images')} placeholder="https://..." />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost">Cancel</button>
                  <button type="submit" disabled={isSubmitting || saveMutation.isPending} className="btn btn-gold">
                    {saveMutation.isPending ? 'Saving...' : editYacht ? 'Save Changes' : 'Add Yacht'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetManagement;
