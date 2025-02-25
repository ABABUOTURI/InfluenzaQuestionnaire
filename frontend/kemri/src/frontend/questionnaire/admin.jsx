import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
//import { Table, Button } from "@/components/ui/table";
import { Table, Button } from "@mui/material";
import { Card, CardContent} from "@mui/material";
//import { Card, CardContent } from "@/components/ui/card";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    //CartesianGrid, 
    Tooltip, 
    //Legend, 
    ResponsiveContainer,
} from 'recharts';


const AdminDashboard = () => {
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // Fetch data from API or backend
    fetch("/api/visitor-logs").then(res => res.json()).then(data => setVisitorLogs(data));
    fetch("/api/submitted-forms").then(res => res.json()).then(data => setSubmittedForms(data));
    fetch("/api/staff-list").then(res => res.json()).then(data => setStaffList(data));
    fetch("/api/analytics").then(res => res.json()).then(data => setAnalyticsData(data));
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
