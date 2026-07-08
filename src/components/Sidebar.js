import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaChartBar 
} from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar({ open }) {
  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/' },
    { label: 'Employees', icon: <FaUsers />, path: '/employees' },
    { label: 'Departments', icon: <FaBuilding />, path: '/departments' },
    { label: 'Attendance', icon: <FaCalendarAlt />, path: '/attendance' },
    { label: 'Payroll', icon: <FaMoneyBillWave />, path: '/payroll' },
    { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
  ];

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="sidebar-item"
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {open && <span className="sidebar-label">{item.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
