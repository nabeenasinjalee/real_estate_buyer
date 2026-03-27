import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't automatically redirect on 401 for login attempts
    // Check if it's a login endpoint to avoid redirect loop
    const isLoginEndpoint = error.config?.url?.includes('/auth/login');
    
    if (error.response?.status === 401 && !isLoginEndpoint) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: async (credentials) => {
    try {
      // Use the configured api instance instead of axios.post
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      // Log the error for debugging
      console.log('Login error in api:', error.response?.data);
      // Re-throw the error to be handled by the component
      throw error;
    }
  },
};

export const favourites = {
  getAll: () => api.get('/favourites'),
  add: (propertyData) => {
    console.log("API add favourite called with:", propertyData); // Debug log
    return api.post('/favourites', propertyData);
  },
  remove: (propertyId) => api.delete(`/favourites/${propertyId}`),
};

export default api;