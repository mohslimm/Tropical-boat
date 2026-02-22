import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import YachtDetail from './pages/YachtDetail';
import About from './pages/About';
import Lifestyle from './pages/Lifestyle';
import Contact from './pages/Contact';
import Enquire from './pages/Enquire';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import FleetManagement from './pages/admin/FleetManagement';
import LeadsInbox from './pages/admin/LeadsInbox';
import AdminBookings from './pages/admin/AdminBookings';
import AdminClients from './pages/admin/AdminClients';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/yacht/:id" element={<YachtDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/lifestyle" element={<Lifestyle />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/enquire" element={<Enquire />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="leads" element={<LeadsInbox />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
