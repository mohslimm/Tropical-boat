import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const team = [
  { name: 'Alexandre Moreau', role: 'Founder & CEO', bio: '25 years in luxury yacht charter across the Mediterranean and Caribbean, curating unforgettable voyages.' },
  { name: 'Sophie Laurent', role: 'Charter Director', bio: 'Former captain turned charter specialist, with 15 years of client relations and itinerary excellence.' },
  { name: 'Marco Vitali', role: 'Charter Consultant', bio: 'Expert in matching clients with the perfect crewed vessel for their destination and group profile.' },
];

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{
        position: 'relative', height: '60vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          // backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80)',
          backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1750283221181-b21b820fab7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg0fHx8ZW58MHx8fHx8?w=1920&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, transparent)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Our Story</span>
          <h1>Trust &amp; <span className="gold-gradient">Excellence</span></h1>
          <div className="divider" />
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="section-label">Since 2010</span>
            <h2 style={{ marginBottom: '1.5rem' }}>A Legacy of <span className="gold-gradient">Excellence</span></h2>
            <p style={{ marginBottom: '1rem' }}>
              Stepping Stones was founded on a simple belief: that booking the world's finest charter yachts should be as effortless as the voyages they offer. Since 2010, we have been the trusted partner for discerning clients worldwide.
            </p>
            <p>
              From Monaco to the Maldives, our curated fleet of crewed charter yachts spans the globe's most coveted destinations. Each vessel is personally inspected and vetted by our specialist team.
            </p>
            <div className="divider" style={{ marginTop: '2rem' }} />
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem' }}>
              {[['200+', 'Yachts'], ['50+', 'Countries'], ['15', 'Years']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>{v}</p>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img src="https://images.unsplash.com/photo-1667412319085-144022cc8df6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Luxury yacht" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '420px', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">The People Behind</span>
          <h2 style={{ marginBottom: '3rem' }}>Meet the <span className="gold-gradient">Team</span></h2>
          <div className="grid-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.75rem', color: '#0a0a0f', fontWeight: 600 }}>{member.name[0]}</span>
                </div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.25rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{member.role}</p>
                <p style={{ fontSize: '0.875rem' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
