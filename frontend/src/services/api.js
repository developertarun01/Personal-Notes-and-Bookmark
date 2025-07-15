import axios from 'axios';

// In services/api.js
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://personal-notes-and-bookmark-api.vercel.app/api'
    : 'http://localhost:5000/api'
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with non-2xx status
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle specific error codes
      if (error.response.status === 503) {
        alert('Database is currently unavailable. Please try again later.');
      }
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request);
      alert('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;