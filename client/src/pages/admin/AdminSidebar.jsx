import { memo } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Anchor, CalendarCheck,
  Inbox, Users, Settings, LogOut, X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─── Constants ───────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/admin',           label: 'Dashboard',    icon: LayoutDashboard, end: true },
      { to: '/admin/analytics', label: 'Analytics',    icon: TrendingUp },
    ],
  },
  {
    label: 'Charter',
    items: [
      { to: '/admin/fleet',    label: 'Fleet',        icon: Anchor },
      { to: '/admin/bookings', label: 'Bookings',     icon: CalendarCheck },
      { to: '/admin/leads',    label: 'Leads Inbox',  icon: Inbox },
      { to: '/admin/clients',  label: 'Clients',      icon: Users },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────
const AdminSidebar = memo(({ onClose, mobile = false }) => {
  const { user, logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <aside style={{
      width:          '240px',
      minHeight:      '100vh',
      background:     '#08080f',
      borderRight:    '1px solid rgba(255,255,255,0.06)',
      display:        'flex',
      flexDirection:  'column',
      flexShrink:     0,
    }}>

      {/* ── Brand ── */}
      <div style={{ padding: '1.5rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #c5a059, #9e7a3a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Anchor size={14} color="#0a0a0f" strokeWidth={2} />
            </div>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: 'var(--gold)', fontWeight: 600, lineHeight: 1.1 }}>
                Tropical Boat
              </p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>
                Admin Panel
              </p>
            </div>
          </div>

          {/* Close button — mobile only */}
          {mobile && (
            <button
              onClick={onClose}
              aria-label="Fermer la navigation"
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer', padding: '0.35rem', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '32px', minHeight: '32px',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Nav Groups ── */}
      <nav
        aria-label="Navigation admin"
        style={{ flex: 1, padding: '0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        {NAV_GROUPS.map(({ label, items }) => (
          <div key={label}>
            <p style={{
              fontFamily:    'Outfit, sans-serif',
              fontSize:      '0.58rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.22)',
              fontWeight:    600,
              padding:       '0 0.5rem',
              marginBottom:  '0.35rem',
            }}>{label}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {items.map(({ to, label: itemLabel, icon: Icon, end }) => {
                const isActive = end
                  ? location.pathname === to
                  : location.pathname.startsWith(to);
                return (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '0.65rem',
                      padding:        '0.65rem 0.85rem',
                      borderRadius:   '8px',
                      fontSize:       '0.82rem',
                      fontFamily:     'Outfit, sans-serif',
                      fontWeight:     isActive ? 500 : 300,
                      color:          isActive ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                      background:     isActive ? 'rgba(197,160,89,0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition:     'all 0.15s ease',
                      position:       'relative',
                      borderLeft:     isActive ? '2px solid var(--gold)' : '2px solid transparent',
                      minHeight:      '40px',
                    }}
                  >
                    <Icon
                      size={15}
                      strokeWidth={isActive ? 2 : 1.5}
                      style={{ opacity: isActive ? 1 : 0.55, flexShrink: 0 }}
                    />
                    {itemLabel}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User / Logout ── */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem', borderRadius: '8px',
          background: 'rgba(255,255,255,0.03)', marginBottom: '0.5rem',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #c5a059, #9e7a3a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 700, color: '#0a0a0f',
            fontFamily: 'Outfit, sans-serif',
          }}>{initials}</div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', fontWeight: 500,
              color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{user?.email ?? 'Admin'}</p>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)' }}>Administrateur</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Se déconnecter"
          style={{
            width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.15s ease', minHeight: '40px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#f87171';
            e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          <LogOut size={14} strokeWidth={1.5} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
});

AdminSidebar.displayName = 'AdminSidebar';
export default AdminSidebar;
