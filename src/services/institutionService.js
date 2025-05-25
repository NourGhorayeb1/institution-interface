import { fetchWithToken } from './api';
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getAllInstitutions = () =>
    axios.get(`${API_BASE}/api/institutions`, authHeader());

export const getActiveInstitutions = () => fetchWithToken('/api/institutions/active');

export const getInstitutionById = (id) => fetchWithToken(`/api/institutions/${id}`);

export const saveInstitution = (institution) =>
    fetchWithToken('/api/institutions', {
        method: 'POST',
        body: JSON.stringify(institution),
    });

export const deleteInstitution = (id) =>
    fetchWithToken(`/api/institutions/${id}`, { method: 'DELETE' });
