// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './InstitutionList.css';
// import {
//   getAllInstitutions,
//   getActiveInstitutions,
//   deleteInstitution
// } from '../../services/institutionService';

// const InstitutionList = () => {
//   const [institutions, setInstitutions] = useState([]);
//   const [activeInstitutions, setActiveInstitutions] = useState([]);
//   const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInstitutions();
//     fetchActiveInstitutions();
//   }, []);

//   const fetchInstitutions = async () => {
//     try {
//       const response = await getAllInstitutions();
//       const data = response.data;

//       // Defensive check to ensure it's an array
//       setInstitutions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Failed to fetch institutions:', error);
//       setInstitutions([]);
//     }
//   };
//   const fetchActiveInstitutions = async () => {
//     const token = localStorage.getItem('token');
//     const response = await fetch('http://localhost:8080/institutions/active', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setActiveInstitutions(data);
//   };

//   const handleDelete = async (id) => {
//     await deleteInstitution(id);
//     fetchInstitutions();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/'; // RETURN TO LOGIN PAGE
//   };

//   return (
//     <div className="institution-list">
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Institutions</h2>
//       <div className="top-bar">
//         <select onChange={e => setSelectedInstitutionId(e.target.value)}>
//           <option value="">Select Active Institution</option>
//           {Array.isArray(institutions) &&
//             institutions.map(inst => (
//               <tr key={inst.id}>
//                 <td>{inst.id}</td>
//                 <td>{inst.code}</td>
//                 <td>{inst.name}</td>
//                 <td>{inst.status === 1 ? 'Active' : 'Inactive'}</td>
//                 <td>
//                   <button onClick={() => navigate(`/edit/${inst.id}`)}>Edit</button>
//                   <button onClick={() => handleDelete(inst.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//         </select>
//         <button onClick={handleLogout}>Logout</button>
//         <button onClick={() => window.print()}>Print</button>
//         <button onClick={() => navigate('/create')}>Add Institution</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Code</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {institutions.map(inst => (
//             <tr key={inst.id}>
//               <td>{inst.id}</td>
//               <td>{inst.code}</td>
//               <td>{inst.name}</td>
//               <td>{inst.status === 1 ? 'Active' : 'Inactive'}</td>
//               <td>
//                 <div className="actions">
//                   <button onClick={() => navigate(`/edit/${inst.id}`)}>Edit</button>
//                   <button onClick={() => handleDelete(inst.id)}>Delete</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InstitutionList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstitutionList.css';
import {
  getAllInstitutions,
  getActiveInstitutions,
  deleteInstitution
} from '../../services/institutionService';

const InstitutionList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await getAllInstitutions();
      const data = Array.isArray(response.data) ? response.data : [];
      setAllInstitutions(data);
      setInstitutions(data);
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
      setInstitutions([]);
      setAllInstitutions([]);
    }
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    if (filter === 'all') {
      setInstitutions(allInstitutions);
    } else {
      const filtered = allInstitutions.filter(inst =>
        filter === 'active' ? inst.status === 1 : inst.status === 0
      );
      setInstitutions(filtered);
    }
  };

  const handleDelete = async (id) => {
    await deleteInstitution(id);
    fetchInstitutions();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="institution-list">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Institutions</h2>
      <div className="top-bar">
        <select onChange={handleFilterChange} value={selectedFilter}>
          <option value="all">All Institutions</option>
          <option value="active">Active Institutions</option>
          <option value="inactive">Inactive Institutions</option>
        </select>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => window.print()}>Print</button>
        <button onClick={() => navigate('/create')}>Add Institution</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map(inst => (
            <tr key={inst.id}>
              <td>{inst.id}</td>
              <td>{inst.code}</td>
              <td>{inst.name}</td>
              <td>{inst.status === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <div className="actions">
                  <button onClick={() => navigate(`/edit/${inst.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(inst.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionList;
