import React, { useState, useEffect } from "react";
import "../styles/CompanyDashboard.css"; // Import external CSS
//import { Table } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CompanyDashboard = () => {
  const [reports, setReports] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch reports and staff data (Replace with actual API calls)
    setReports([
      { id: 1, staffNo: "S001", name: "John Doe", time: "10:00 AM", status: "Submitted" },
      { id: 2, staffNo: "S002", name: "Jane Smith", time: "11:30 AM", status: "Pending" },
    ]);
    setStaffList([
      { staffNo: "S001", name: "John Doe", email: "john@example.com" },
      { staffNo: "S002", name: "Jane Smith", email: "jane@example.com" },
    ]);
  }, []);

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="company-dashboard">
      <h2>Company Dashboard</h2>
      
      <div className="reports-section">
        <h3>Reports</h3>
        <input
          type="text"
          placeholder="Search by Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <table className="reports-table">
          <thead>
            <tr>
              <th>Staff No</th>
              <th>Name</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.staffNo}</td>
                <td>{report.name}</td>
                <td>{report.time}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="activity-overview">
        <h3>Staff Activity Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reports}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="status" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="staff-list">
        <h3>Registered Staff</h3>
        <table className="staff-table">
          <thead>
            <tr>
              <th>Staff No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.staffNo}>
                <td>{staff.staffNo}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard;
