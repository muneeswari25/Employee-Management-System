import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import Departments from './pages/Departments';
import Reports from './pages/Reports';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load initial data (can be replaced with API calls)
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    setLoading(true);
    // Simulate loading from localStorage or API
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
    setLoading(false);
  };

  const saveEmployees = (updatedEmployees) => {
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <Router>
      <div className="app">
        <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="app-container">
          <Sidebar open={sidebarOpen} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard employees={employees} />} />
              <Route 
                path="/employees" 
                element={<EmployeeList employees={employees} setEmployees={saveEmployees} />} 
              />
              <Route 
                path="/employees/add" 
                element={<AddEmployee employees={employees} setEmployees={saveEmployees} />} 
              />
              <Route 
                path="/employees/edit/:id" 
                element={<EditEmployee employees={employees} setEmployees={saveEmployees} />} 
              />
              <Route path="/departments" element={<Departments />} />
              <Route path="/attendance" element={<Attendance employees={employees} />} />
              <Route path="/payroll" element={<Payroll employees={employees} />} />
              <Route path="/reports" element={<Reports employees={employees} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
