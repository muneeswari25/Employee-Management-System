import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Form.css';

function AddEmployee({ employees, setEmployees }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    joinDate: '',
    address: '',
  });

  const departments = ['HR', 'IT', 'Finance', 'Operations', 'Marketing', 'Sales'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.position || !formData.department) {
      alert('Please fill all required fields');
      return;
    }

    const newEmployee = {
      id: uuidv4(),
      ...formData,
      salary: parseFloat(formData.salary),
      status: 'present'
    };

    setEmployees([...employees, newEmployee]);
    alert('Employee added successfully!');
    navigate('/employees');
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter position"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Employee</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
