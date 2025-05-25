import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InstitutionForm.css';
import { getInstitutionById, saveInstitution } from '../../services/institutionService';

const InstitutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ code: '', name: '', status: 1 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getInstitutionById(id)
        .then(data => {
          setFormData({
            code: data.code || '',
            name: data.name || '',
            status: data.status != null ? data.status : 1,
          });
        })
        .catch(err => console.error("Failed to fetch institution", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.code || isNaN(formData.code) || formData.code.length > 5) {
      setError("Institution code must be numeric and max 5 characters.");
      return;
    }
    if (!formData.name || formData.name.length > 50 || !isNaN(formData.name)) {
      setError("Institution name must be text (non-numeric) and max 50 characters.");
      return;
    }

    await saveInstitution({ ...formData, id: id ? parseInt(id) : 0 });
    navigate('/institutions');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit' : 'Create'} Institution</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <label>Institution Code</label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          maxLength={5}
          required
        />

        <label>Institution Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          maxLength={50}
          required
        />

        <label>Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <div className="form-buttons">
          <button type="submit">{id ? 'Update' : 'Create'}</button>
          <button type="button" onClick={() => navigate('/institutions')} className="cancel-button">
            Cancel
          </button>
        </div>      </form>
    </div>
  );
};

export default InstitutionForm;
