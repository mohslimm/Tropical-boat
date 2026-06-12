import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { USE_MOCK } from '../data/config';

const INFO_CARDS = [
  {
    icon: '✉️',
    label: 'Email Us',
    value: 'info@tropicalboat.com',
    sub: 'We respond within 2 hours',
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: '+1 305 000 0000',
    sub: 'Mon – Sat, 9am – 7pm EST',
  },
  {
    icon: '📍',
    label: 'Miami Office',
    value: '1 Biscayne Tower',
    sub: 'Miami, FL 33131, USA',
  },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const yachtId = searchParams.get('yacht');
  const yachtName = searchParams.get('name');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      message: yachtName ? `I am interested in chartering the ${yachtName}.` : '',
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 800));
      } else {
        await api.post('/leads', { ...data, yachtId, yachtName });
      }
      setSubmitted(true);
      toast.success('Your enquiry has been sent!');
      reset();
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.82) 100%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', textAlign: 'center', padding: '0 1rem' }}
        >
          <span className="section-label">We're Here to Help</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            Contact <span className="gold-gradient">Us</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.75rem', fontSize: '1rem' }}>
            {yachtName
              ? `You're enquiring about the ${yachtName}. We'll be in touch shortly.`
              : 'Have a question? Our charter specialists are ready to assist.'}
          </p>
        </motion.div>
      </section>

      {/* ── Info Cards ───────────────────────────────── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="grid-3">
            {INFO_CARDS.map(({ icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center',
                  transition: 'border-color 0.3s',
                }}
                whileHover={{ borderColor: 'var(--gold)' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{icon}</div>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>{label}</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{value}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────── */}
      <section style={{ padding: '1rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">Reach Out</span>
            <h2>Send Us a <span className="gold-gradient">Message</span></h2>
            <div className="divider" style={{ margin: '1.2rem auto' }} />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--gold)',
                borderRadius: 'var(--radius-lg)', padding: '4rem 2rem', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚓</div>
              <h3 style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>Message Received</h3>
              <p style={{ color: 'var(--text-muted)' }}>Our specialists will reach out within 24 hours.</p>
              <button className="btn btn-ghost" style={{ marginTop: '2rem' }} onClick={() => setSubmitted(false)}>Send Another</button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              {/* Row 1: Name + Email */}
              <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your name" {...register('name', { required: 'Required' })} />
                  {errors.name && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.name.message}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="your@email.com" {...register('email', { required: 'Required' })} />
                  {errors.email && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
                </div>
              </div>

              {/* Row 2: Phone + Destination */}
              <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" placeholder="+1 305 000 0000" {...register('phone')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Destination</label>
                  <input className="form-input" placeholder="Mediterranean, Caribbean…" {...register('location')} />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Tell us about your ideal charter experience — dates, group size, destinations…"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}
              >
                {submitting ? 'Sending…' : '✉  Send Enquiry'}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────── */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', height: 'clamp(280px, 40vw, 460px)' }}>
            <iframe
              title="Tropical Boat Miami Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.0!2d-80.1918!3d25.7742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6823ed15813%3A0xd4d7b3b3e3b3e3b3!2sMiami%2C%20FL%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%" height="100%"
              style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay badge */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem',
              background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)',
              padding: '1rem 1.5rem',
            }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>Our Office</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>1 Biscayne Tower</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Miami, FL 33131, USA</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
