import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInstitutionById, saveInstitution } from '../../services/institutionService';

const InstitutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ code: '', name: '', status: 1 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getInstitutionById(id)
        .then(data => setFormData(data))
        .catch(() => navigate('/institutions'));
    }
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.code) {
      newErrors.code = 'Code is required';
    } else if (!/^\d+$/.test(formData.code)) {
      newErrors.code = 'Code must be numeric';
    } else if (formData.code.length > 5) {
      newErrors.code = 'Code must be max 5 digits';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be max 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await saveInstitution({ ...formData, id: id ? parseInt(id) : 0 });
      navigate('/institutions');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Create'} Institution</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
          {errors.code && <span style={{ color: 'red' }}>{errors.code}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default InstitutionForm;
