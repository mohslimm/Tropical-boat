import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: '▦', end: true },
      { to: '/admin/analytics', label: 'Analytics', icon: '↗' },
    ],
  },
  {
    label: 'Charter',
    items: [
      { to: '/admin/fleet', label: 'Fleet', icon: '⛵' },
      { to: '/admin/bookings', label: 'Bookings', icon: '◫' },
      { to: '/admin/leads', label: 'Leads Inbox', icon: '◉' },
      { to: '/admin/clients', label: 'Clients', icon: '◎' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: '⊙' },
    ],
  },
];

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0d0d12',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* ── Brand ── */}
      <div style={{ padding: '1.75rem 1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--gold), #a8873a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', color: '#0a0a0f', fontWeight: 700,
          }}>⚓</div>
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: 'var(--gold)', fontWeight: 600, lineHeight: 1.1 }}>Stepping Stones</p>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* ── Nav Groups ── */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {NAV_GROUPS.map(({ label, items }) => (
          <div key={label}>
            <p style={{
              fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', fontWeight: 700,
              padding: '0 0.6rem', marginBottom: '0.4rem',
            }}>{label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {items.map(({ to, label: itemLabel, icon, end }) => {
                const isActive = end
                  ? location.pathname === to
                  : location.pathname.startsWith(to);
                return (
                  <NavLink
                    key={to} to={to} end={end}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.7rem',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                      background: isActive ? 'rgba(197,179,89,0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {isActive && (
                      <span style={{
                        position: 'absolute', left: 0, top: '20%', bottom: '20%',
                        width: '3px', borderRadius: '0 3px 3px 0',
                        background: 'var(--gold)',
                      }} />
                    )}
                    <span style={{ fontSize: '0.85rem', width: '18px', textAlign: 'center', opacity: isActive ? 1 : 0.6 }}>{icon}</span>
                    {itemLabel}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User / Logout ── */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 0.85rem', borderRadius: '8px',
          background: 'rgba(255,255,255,0.03)', marginBottom: '0.5rem',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--gold), #a8873a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 700, color: '#0a0a0f',
          }}>{initials}</div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email ?? 'Admin'}</p>
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          ← Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
