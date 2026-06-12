import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { USE_MOCK, MOCK_ADMIN } from '../data/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('yachtUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (USE_MOCK) {
          // Trust local storage directly in mock mode (no token verification needed)
          setUser(parsed);
          setLoading(false);
        } else {
          // Verify token with backend
          api
            .get('/auth/me')
            .then((res) => setUser(res.data))
            .catch(() => {
              localStorage.removeItem('yachtUser');
              setUser(null);
            })
            .finally(() => setLoading(false));
        }
      } catch {
        localStorage.removeItem('yachtUser');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (USE_MOCK) {
      // ── Mock login: validate against hardcoded admin ──────────────
      if (
        email.trim().toLowerCase() === MOCK_ADMIN.email.toLowerCase() &&
        password === MOCK_ADMIN.password
      ) {
        const adminUser = { email: MOCK_ADMIN.email, name: MOCK_ADMIN.name, role: MOCK_ADMIN.role, token: MOCK_ADMIN.token };
        localStorage.setItem('yachtUser', JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }
      throw { response: { data: { message: 'Invalid credentials. Use admin@tropicalboat.com / admin123' } } };
    }

    // ── Real API login ──────────────────────────────────────────────
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('yachtUser', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('yachtUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
