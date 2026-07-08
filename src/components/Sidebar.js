import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">Dashboard</Link>
        <Link to="/employees" className="sidebar-link">Employees</Link>
        <Link to="/employees/add" className="sidebar-link">Add Employee</Link>
        <Link to="/departments" className="sidebar-link">Departments</Link>
        <Link to="/attendance" className="sidebar-link">Attendance</Link>
        <Link to="/payroll" className="sidebar-link">Payroll</Link>
        <Link to="/reports" className="sidebar-link">Reports</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
