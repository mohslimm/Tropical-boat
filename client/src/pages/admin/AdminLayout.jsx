import { useState, useCallback, useEffect, memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';

// ─── Constants ───────────────────────────────────────────────
const DRAWER_VARIANTS = {
  hidden:  { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '-100%', transition: { duration: 0.25 } },
};

// ─── Component ───────────────────────────────────────────────
const AdminLayout = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  // Lock body scroll on mobile drawer
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Escape key closes drawer
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);
  const closeSidebar  = useCallback(() => setSidebarOpen(false),  []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>

      {/* ── Desktop Sidebar (hidden on mobile) */}
      <div className="admin-sidebar-desktop">
        <AdminSidebar onClose={closeSidebar} />
      </div>

      {/* ── Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSidebar}
              style={{ position: 'fixed', inset: 0, background: 'rgba(6,6,16,0.7)', zIndex: 200 }}
            />
            <motion.div
              variants={DRAWER_VARIANTS}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 201, width: '260px' }}
            >
              <AdminSidebar onClose={closeSidebar} mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Mobile topbar */}
        <div className="admin-mobile-topbar">
          <button
            onClick={toggleSidebar}
            aria-label="Ouvrir la navigation admin"
            aria-expanded={sidebarOpen}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius)',
            }}
          >
            <Menu size={20} />
          </button>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--gold)',
          }}>
            Tropical Boat
          </span>
          <div style={{ width: '44px' }} /> {/* Spacer for centering */}
        </div>

        <main style={{ flex: 1, padding: 'clamp(1.25rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
});

AdminLayout.displayName = 'AdminLayout';
export default AdminLayout;
