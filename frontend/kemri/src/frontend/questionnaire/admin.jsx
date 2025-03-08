import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import { Table, Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // Dummy Data
    const dummyVisitors = [
      { ip: "192.168.1.1", timestamp: "2024-03-05 10:00", userType: "Admin" },
      { ip: "192.168.1.2", timestamp: "2024-03-05 11:00", userType: "Staff" },
      { ip: "192.168.1.3", timestamp: "2024-03-05 17:00", userType: "Staff" },
      { ip: "192.168.1.4", timestamp: "2024-03-05 13:00", userType: "Staff" },
      { ip: "192.168.1.5", timestamp: "2024-03-05 07:00", userType: "Company" },
    ];
    setVisitorLogs(dummyVisitors);

    const dummyForms = [
      { staffNo: "KM001", name: "John Kamau", submissionTime: "10:30 AM", status: "Approved" },
      { staffNo: "KM002", name: "Bil Smith", submissionTime: "11:00 AM", status: "Pending" },
      { staffNo: "KM004", name: "Oroo Davis", submissionTime: "11:00 AM", status: "Approved" },
      { staffNo: "KM007", name: "Rigathi Gachagua", submissionTime: "11:00 AM", status: "Pending" },
      { staffNo: "KM012", name: "Otieno Smith", submissionTime: "11:00 AM", status: "Aproved" },
    ];
    setSubmittedForms(dummyForms);

    const dummyStaff = [
      { name: "John Kamau", staffNo: "KM001", email: "john@kemri.go.ke", role: "Staff" },
      { name: "Bil Smith", staffNo: "KM002", email: "bill@kemri.go.ke", role: "Staff" },
      { name: "Oroo Davis", staffNo: "KM004", email: "oroo@kemri.go.ke", role: "Staff" },
      { name: "Rigathi Gachagua", staffNo: "KM007", email: "rigathi@kemri.go.ke", role: "Staff" },
      { name: "Otieno Smith", staffNo: "KM012", email: "otieno@kemri.go.ke", role: "Staff" },
    ];
   
    setStaffList(dummyStaff);

    const dummyAnalytics = [
      { date: "Mar 1", submissions: 5 },
      { date: "Mar 2", submissions: 10 },
      { date: "Mar 3", submissions: 8 },
    ];
    setAnalyticsData(dummyAnalytics);
  }, []);

  return (
    <div className="admin-container">
      <h1 className="title">Admin Dashboard</h1>
      
      <div className="grid-layout">
        {/* Visitor Logs Table */}
        <Card>
          <CardContent>
            <h2>Visitor Logs</h2>
            <Table>
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>Timestamp</th>
                  <th>User Type</th>
                </tr>
              </thead>
              <tbody>
                {visitorLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.ip}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.userType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Submitted Forms Table */}
        <Card>
          <CardContent>
            <h2>Submitted Forms</h2>
            <Table>
              <thead>
                <tr>
                  <th>Staff No</th>
                  <th>Name</th>
                  <th>Submission Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submittedForms.map((form, index) => (
                  <tr key={index}>
                    <td>{form.staffNo}</td>
                    <td>{form.name}</td>
                    <td>{form.submissionTime}</td>
                    <td>{form.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Staff List */}
        <Card>
          <CardContent>
            <h2>Staff List</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Staff No</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.name}</td>
                    <td>{staff.staffNo}</td>
                    <td>{staff.email}</td>
                    <td>{staff.role}</td>
                    <td>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Analytics Chart */}
        <Card>
          <CardContent>
            <h2>Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
