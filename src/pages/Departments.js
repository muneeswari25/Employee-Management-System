import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/Departments.css';

function Departments() {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT', manager: 'John Doe', employees: 15, location: 'Floor 2' },
    { id: 2, name: 'HR', manager: 'Jane Smith', employees: 8, location: 'Floor 1' },
    { id: 3, name: 'Finance', manager: 'Mike Johnson', employees: 12, location: 'Floor 3' },
    { id: 4, name: 'Operations', manager: 'Sarah Williams', employees: 20, location: 'Floor 2' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    const newDept = {
      id: Date.now(),
      ...formData,
      employees: 0
    };
    setDepartments([...departments, newDept]);
    setFormData({ name: '', manager: '', location: '' });
    setShowForm(false);
  };

  const deleteDept = (id) => {
    if (window.confirm('Are you sure?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  return (
    <div className="departments">
      <div className="page-header">
        <h2>Departments</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus /> Add Department
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddDept} className="dept-form">
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="manager"
            placeholder="Manager Name"
            value={formData.manager}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">Save</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="departments-grid">
        {departments.map(dept => (
          <div key={dept.id} className="dept-card">
            <h3>{dept.name}</h3>
            <p><strong>Manager:</strong> {dept.manager}</p>
            <p><strong>Employees:</strong> {dept.employees}</p>
            <p><strong>Location:</strong> {dept.location}</p>
            <div className="card-actions">
              <button className="btn btn-small btn-edit"><FaEdit /></button>
              <button 
                className="btn btn-small btn-delete"
                onClick={() => deleteDept(dept.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departments;
