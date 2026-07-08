import React from 'react';
import { FaUsers, FaUserTie, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Card from '../components/Card';
import '../styles/Dashboard.css';

function Dashboard({ employees }) {
  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <FaUsers />,
      color: 'blue'
    },
    {
      title: 'Present Today',
      value: employees.filter(e => e.status === 'present').length,
      icon: <FaCheckCircle />,
      color: 'green'
    },
    {
      title: 'Absent Today',
      value: employees.filter(e => e.status === 'absent').length,
      icon: <FaExclamationCircle />,
      color: 'red'
    },
    {
      title: 'Departments',
      value: new Set(employees.map(e => e.department)).size,
      icon: <FaUserTie />,
      color: 'purple'
    }
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <Card key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-section">
        <h3>Recent Employees</h3>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.slice(0, 5).map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
