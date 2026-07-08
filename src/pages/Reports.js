import React, { useMemo } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import '../styles/Reports.css';

function Reports({ employees }) {
  const stats = useMemo(() => {
    const deptMap = {};
    const positionMap = {};
    
    employees.forEach(emp => {
      // Department stats
      if (!deptMap[emp.department]) {
        deptMap[emp.department] = { count: 0, totalSalary: 0 };
      }
      deptMap[emp.department].count++;
      deptMap[emp.department].totalSalary += emp.salary || 0;

      // Position stats
      if (!positionMap[emp.position]) {
        positionMap[emp.position] = { count: 0, totalSalary: 0 };
      }
      positionMap[emp.position].count++;
      positionMap[emp.position].totalSalary += emp.salary || 0;
    });

    return { deptMap, positionMap };
  }, [employees]);

  const generateReport = (type) => {
    alert(`${type} report generated!`);
  };

  return (
    <div className="reports">
      <h2>Reports</h2>

      <div className="reports-actions">
        <button className="btn btn-primary" onClick={() => generateReport('Employee List')}>
          <FaFileDownload /> Employee List Report
        </button>
        <button className="btn btn-primary" onClick={() => generateReport('Department Summary')}>
          <FaFileDownload /> Department Report
        </button>
        <button className="btn btn-primary" onClick={() => generateReport('Salary Analysis')}>
          <FaFileDownload /> Salary Report
        </button>
      </div>

      <div className="reports-section">
        <h3>Department-wise Analysis</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Employee Count</th>
              <th>Total Salary</th>
              <th>Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.deptMap).map(([dept, data]) => (
              <tr key={dept}>
                <td>{dept}</td>
                <td>{data.count}</td>
                <td>${data.totalSalary.toLocaleString()}</td>
                <td>${(data.totalSalary / data.count).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reports-section">
        <h3>Position-wise Analysis</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Employee Count</th>
              <th>Total Salary</th>
              <th>Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.positionMap).map(([pos, data]) => (
              <tr key={pos}>
                <td>{pos}</td>
                <td>{data.count}</td>
                <td>${data.totalSalary.toLocaleString()}</td>
                <td>${(data.totalSalary / data.count).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
