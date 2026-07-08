import React from 'react';
import { FaBars, FaUser, FaBell } from 'react-icons/fa';
import '../styles/Navigation.css';

function Navigation({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button 
            className="menu-toggle" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1 className="navbar-title">Employee Management System</h1>
        </div>
        <div className="navbar-right">
          <button className="nav-icon">
            <FaBell />
            <span className="badge">3</span>
          </button>
          <button className="nav-icon">
            <FaUser />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
