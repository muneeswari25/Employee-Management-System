import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/Attendance.css';

function Attendance({ employees }) {
  const [attendance, setAttendance] = useState(
    employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      date: new Date().toISOString().split('T')[0],
      status: 'present'
    }))
  );

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const toggleAttendance = (id) => {
    setAttendance(prev =>
      prev.map(att =>
        att.id === id
          ? { ...att, status: att.status === 'present' ? 'absent' : 'present' }
          : att
      )
    );
  };

  const saveAttendance = () => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
    alert('Attendance saved successfully!');
  };

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;

  return (
    <div className="attendance">
      <h2>Attendance Management</h2>

      <div className="attendance-summary">
        <div className="summary-card">
          <h3>Present</h3>
          <p className="count present">{presentCount}</p>
        </div>
        <div className="summary-card">
          <h3>Absent</h3>
          <p className="count absent">{absentCount}</p>
        </div>
        <div className="summary-card">
          <h3>Attendance Rate</h3>
          <p className="count">
            {attendance.length > 0 
              ? ((presentCount / attendance.length) * 100).toFixed(1) 
              : 0}%
          </p>
        </div>
      </div>

      <div className="attendance-controls">
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={saveAttendance}>
          Save Attendance
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(att => (
            <tr key={att.id}>
              <td>{att.name}</td>
              <td className={`status ${att.status}`}>
                {att.status === 'present' ? <FaCheck /> : <FaTimes />}
                {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
              </td>
              <td>
                <button
                  className={`status-btn ${att.status}`}
                  onClick={() => toggleAttendance(att.id)}
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
