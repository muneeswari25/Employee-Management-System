import React, { useState } from 'react';

const AddEmployee = ({ employees, setEmployees }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(),
      ...formData
    };
    setEmployees([...employees, newEmployee]);
    setFormData({ name: '', email: '', department: '', position: '' });
  };

  return (
    <div className="add-employee">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
        <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
