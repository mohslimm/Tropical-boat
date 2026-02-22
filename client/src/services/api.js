import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('yachtUser');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    } catch { /* ignore */ }
  }
  return config;
});

// Handle 401 - clear user and redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('yachtUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
