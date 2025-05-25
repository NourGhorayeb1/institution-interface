// src/services/api.js
const BASE_URL = 'http://localhost:8080';

export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, config);

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (!response.ok) {
    const message = isJson ? (await response.json()).message : response.statusText;
    throw new Error(message || 'API error');
  }

  return isJson ? response.json() : response;
};
