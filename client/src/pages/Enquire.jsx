import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { USE_MOCK } from '../data/config';

const ENQUIRY_TYPES = [
  { id: 'charter', label: 'Yacht Charter', icon: '⚓', desc: 'Charter a yacht for a period' },
  { id: 'general', label: 'General Enquiry', icon: '✉️', desc: 'Any other questions' },
];

const YACHT_TYPES = ['Motor Yacht', 'Sailing Yacht', 'Catamaran', 'Explorer Yacht', 'Classic Yacht', 'No Preference'];
const BUDGETS = ['Under $50k', '$50k – $100k', '$100k – $250k', '$250k – $500k', '$500k+', 'Flexible'];
const DURATIONS = ['Weekend (2–3 days)', '1 Week', '2 Weeks', '1 Month', '3+ Months', 'TBD'];

const InfoCard = ({ icon, label, value }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '1rem',
    padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)',
    background: 'rgba(197,179,89,0.04)', border: '1px solid rgba(197,179,89,0.12)',
  }}>
    <span style={{ fontSize: '1.1rem', width: '2rem', textAlign: 'center' }}>{icon}</span>
    <div>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.15rem' }}>{label}</p>
      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>{value}</p>
    </div>
  </div>
);

const StepLabel = ({ n, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
    <div style={{
      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, var(--gold), #a8873a)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.7rem', fontWeight: 700, color: '#0a0a0f',
    }}>{n}</div>
    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>{label}</p>
  </div>
);

const Enquire = () => {
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryType, setEnquiryType] = useState('charter');
  const [yachtType, setYachtType] = useState('No Preference');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const yachtId = searchParams.get('yacht');
  const yachtName = searchParams.get('name');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      message: yachtName ? `I am interested in the ${yachtName}.` : '',
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        yachtId,
        yachtName,
        enquiryType,
        yachtType,
        budget,
        duration,
      };
      if (!USE_MOCK) {
        await api.post('/leads', payload);
      }
      setSubmitted(true);
      toast.success('Your enquiry has been received. We\'ll be in touch within 24 hours.');
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1rem 4rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '520px' }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
            >⚓</motion.div>
            <h1 style={{ marginBottom: '1rem' }}>
              Enquiry <span className="gold-gradient">Received</span>
            </h1>
            <div className="divider" style={{ margin: '1.5rem auto' }} />
            <p style={{ fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              Thank you for your enquiry. One of our charter specialists will review your requirements and contact you within <strong style={{ color: 'var(--gold)' }}>24 hours</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/fleet" className="btn btn-gold" style={{ padding: '0.75rem 2rem' }}>Browse the Fleet</Link>
              <Link to="/" className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>Back to Home</Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────── */}
      <div style={{
        position: 'relative', height: '52vh', minHeight: '360px',
        display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        {/* Multi-layer gradients for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3.5rem' }}>
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Begin Your Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '0.75rem' }}
          >
            {yachtName ? (<>Enquire About <span className="gold-gradient">{yachtName}</span></>) : (<>Make an <span className="gold-gradient">Enquiry</span></>)}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '480px', fontSize: '1rem' }}
          >
            Tell us your vision and we'll curate the perfect yachting experience, tailored to you.
          </motion.p>
        </div>
      </div>

      {/* ── Form + Info ─────────────────────────────── */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container grid-1-2">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: '7rem' }}
          >
            {/* Specialist card */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), #a8873a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>⚓</div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Sophie Laurent</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Charter Specialist</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  <span style={{ fontSize: '0.65rem', color: '#4ade80' }}>Available</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                A dedicated advisor will personally handle your enquiry and respond within 24 hours.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <InfoCard icon="📧" label="Email" value="enquiries@tropical-boat.com" />
              <InfoCard icon="📞" label="Phone" value="+1 305 000 0000" />
              <InfoCard icon="📍" label="Office" value="Miami, FL — USA" />
              <InfoCard icon="🕐" label="Response Time" value="Within 24 hours" />
            </div>

            <div style={{ background: 'rgba(197,179,89,0.06)', border: '1px solid rgba(197,179,89,0.2)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>🔒 Discreet & Confidential</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>All enquiries are handled with the utmost discretion. Your information is never shared with third parties.</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Step 1: Enquiry Type */}
            <div style={{ marginBottom: '2.5rem' }}>
              <StepLabel n="01" label="Type of Enquiry" />
              <div className="grid-2" style={{ gap: '0.75rem' }}>
                {ENQUIRY_TYPES.map((t) => (
                  <button
                    key={t.id} type="button" onClick={() => setEnquiryType(t.id)}
                    style={{
                      padding: '1.5rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: enquiryType === t.id ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                      borderLeft: enquiryType === t.id ? '3px solid var(--gold)' : '1px solid var(--border-subtle)',
                      background: enquiryType === t.id ? 'rgba(197,179,89,0.07)' : 'var(--bg-card)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>{t.icon}</div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: enquiryType === t.id ? 'var(--gold)' : 'var(--text-primary)', marginBottom: '0.2rem' }}>{t.label}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferences (charter only) */}
            {enquiryType !== 'general' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                style={{ marginBottom: '2.5rem', overflow: 'hidden' }}
              >
                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0 0 2rem' }} />
                <StepLabel n="02" label="Charter Preferences" />
                <div className="grid-2" style={{ gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Yacht Type</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {YACHT_TYPES.map((t) => (
                        <button
                          key={t} type="button" onClick={() => setYachtType(t)}
                          style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '2rem',
                            fontSize: '0.75rem',
                            border: yachtType === t ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                            background: yachtType === t ? 'rgba(197,179,89,0.12)' : 'transparent',
                            color: yachtType === t ? 'var(--gold)' : 'var(--text-muted)',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                        >{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {BUDGETS.map((b) => (
                        <button
                          key={b} type="button" onClick={() => setBudget(b)}
                          style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '2rem',
                            fontSize: '0.75rem',
                            border: budget === b ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                            background: budget === b ? 'rgba(197,179,89,0.12)' : 'transparent',
                            color: budget === b ? 'var(--gold)' : 'var(--text-muted)',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                        >{b}</button>
                      ))}
                    </div>
                  </div>
                  {enquiryType === 'charter' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Preferred Start Date</label>
                        <input className="form-input" type="date" {...register('startDate')} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Duration</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {DURATIONS.map((d) => (
                            <button
                              key={d} type="button" onClick={() => setDuration(d)}
                              style={{
                                padding: '0.4rem 0.9rem',
                                borderRadius: '2rem',
                                fontSize: '0.75rem',
                                border: duration === d ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                                background: duration === d ? 'rgba(197,179,89,0.12)' : 'transparent',
                                color: duration === d ? 'var(--gold)' : 'var(--text-muted)',
                                cursor: 'pointer', transition: 'all 0.2s',
                              }}
                            >{d}</button>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Number of Guests</label>
                        <input className="form-input" type="number" min="1" max="40" placeholder="e.g. 8" {...register('guests')} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Destination / Region</label>
                        <input className="form-input" placeholder="e.g. Mediterranean, Caribbean…" {...register('destination')} />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Details */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0 0 2rem' }} />
              <StepLabel n={enquiryType !== 'general' ? '03' : '02'} label="Your Details" />
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                <div className="grid-2" style={{ gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your full name" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.name.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" placeholder="your@email.com" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" placeholder="+1 234 567 890" {...register('phone')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Residence</label>
                    <input className="form-input" placeholder="e.g. United Kingdom" {...register('country')} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '0.5rem' }}>
                  <label className="form-label">Your Message</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Describe your ideal experience, any specific requirements, or questions…"
                    {...register('message')}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0 0 2rem' }} />
            <button
              type="submit" disabled={submitting} className="btn btn-gold"
              style={{
                width: '100%', justifyContent: 'center', padding: '1.1rem',
                fontSize: '0.9rem', letterSpacing: '0.12em',
                boxShadow: submitting ? 'none' : '0 0 24px rgba(197,179,89,0.25)',
              }}
            >
              {submitting ? 'Sending Enquiry…' : '✉  Submit Enquiry →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              By submitting this form you agree to our privacy policy. All information is handled with complete discretion.
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enquire;
