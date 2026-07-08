import React from 'react';

const Dashboard = ({ employees }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <p>{employees.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
