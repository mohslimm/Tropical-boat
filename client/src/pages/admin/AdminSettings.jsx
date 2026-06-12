import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const INITIAL = {
  companyName: 'Tropical Boat',
  tagline: 'The world\'s finest crewed charter yachts',
  email: 'enquiries@tropical-boat.com',
  phone: '+1 305 000 0000',
  address: '1 Biscayne Tower, Miami, FL 33131, USA',
  instagram: '@tropical-boat',
  facebook: 'facebook.com/tropical-boat',
  linkedin: 'linkedin.com/company/tropical-boat',
  footer: 'The world\'s finest superyachts, curated for the discerning few. Charter your floating masterpiece.',
  adminEmail: 'admin@tropical-boat.com',
  responseTime: '24 hours',
  currency: 'USD',
};

const Field = ({ label, value, name, onChange, type = 'text', hint }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{hint}</p>}
    <input className="form-input" type={type} name={name} value={value} onChange={onChange} />
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '1.5rem' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>{children}</div>
  </div>
);

const AdminSettings = () => {
  const [form, setForm] = useState(INITIAL);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Company details, contact info, and platform preferences.</p>
      </div>

      <motion.form onSubmit={handleSave} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Section title="🏢 Company">
          <Field label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
          <Field label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Footer Description" name="footer" value={form.footer} onChange={handleChange} hint="Shown in the site footer." />
          </div>
        </Section>

        <Section title="📞 Contact">
          <Field label="Public Email" name="email" value={form.email} onChange={handleChange} type="email" />
          <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Office Address" name="address" value={form.address} onChange={handleChange} />
          </div>
        </Section>

        <Section title="📱 Social Media">
          <Field label="Instagram" name="instagram" value={form.instagram} onChange={handleChange} />
          <Field label="Facebook" name="facebook" value={form.facebook} onChange={handleChange} />
          <Field label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
        </Section>

        <Section title="⚙️ Platform">
          <Field label="Admin Notification Email" name="adminEmail" value={form.adminEmail} onChange={handleChange} type="email" hint="Leads and booking alerts go here." />
          <Field label="Response Time (displayed)" name="responseTime" value={form.responseTime} onChange={handleChange} hint='Shown on the Enquire page, e.g. "24 hours".' />
          <div>
            <label className="form-label">Default Currency</label>
            <select className="form-input" name="currency" value={form.currency} onChange={handleChange}>
              {['USD', 'EUR', 'GBP'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </Section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" className="btn btn-ghost" onClick={() => setForm(INITIAL)}>Reset</button>
          <button type="submit" className="btn btn-gold" style={{ padding: '0.75rem 2rem' }}>Save Changes</button>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminSettings;
