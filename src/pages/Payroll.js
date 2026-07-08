import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import '../styles/Payroll.css';

function Payroll({ employees }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const calculatePayroll = () => {
    const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const averageSalary = employees.length > 0 ? totalSalary / employees.length : 0;

    return {
      totalSalary,
      averageSalary,
      employeeCount: employees.length,
      deductionRate: 0.15 // 15% deduction
    };
  };

  const payroll = calculatePayroll();

  const generatePayslip = (employee) => {
    const salary = employee.salary || 0;
    const deductions = salary * payroll.deductionRate;
    const netSalary = salary - deductions;

    return { salary, deductions, netSalary };
  };

  return (
    <div className="payroll">
      <h2>Payroll Management</h2>

      <div className="payroll-summary">
        <div className="summary-card">
          <h3>Total Employees</h3>
          <p>{payroll.employeeCount}</p>
        </div>
        <div className="summary-card">
          <h3>Total Payroll</h3>
          <p>${payroll.totalSalary.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Average Salary</h3>
          <p>${payroll.averageSalary.toLocaleString()}</p>
        </div>
      </div>

      <div className="payroll-filters">
        <label>
          Month:
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </label>
      </div>

      <div className="table-container">
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => {
                const payslip = generatePayslip(emp);
                return (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.position}</td>
                    <td>${payslip.salary.toLocaleString()}</td>
                    <td>${payslip.deductions.toLocaleString()}</td>
                    <td className="net-salary">${payslip.netSalary.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-small">
                        <FaDownload /> Download
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="6" className="no-data">No employees found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
