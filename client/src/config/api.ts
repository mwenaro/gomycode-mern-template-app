// API configuration constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    TODOS: '/todos',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

// API utility functions
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common headers
export const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
