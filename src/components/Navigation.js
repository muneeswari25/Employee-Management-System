import React from 'react';

const Navigation = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle">
          ☰
        </button>
        <h1 className="nav-title">Employee Management System</h1>
        <div className="nav-user">
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
