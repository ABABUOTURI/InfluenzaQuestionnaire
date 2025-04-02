

import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
// import StaffList from "../component/StaffList";
// import SubmittedForms from "../component/SubmittedForms";
// import Analytics from "../component/Analytics";

// Sample Dashboard Component (Default View)
// const Dashboard = () => (
//   <div style={{ textAlign: "center", padding: "20px" }}>
//     <h2>Welcome to the Admin Dashboard</h2>
//     <p>Select an option from the sidebar to get started.</p>
//   </div>
// );
const Dashboard = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to the Admin Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>

    {/* Quick Summary Cards */}
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
      <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", width: "150px" }}>
        <h3>Staff</h3>
        <p>25 Members</p>
      </div>
      <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", width: "150px" }}>
        <h3>Forms</h3>
        <p>12 Submitted</p>
      </div>
      <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", width: "150px" }}>
        <h3>Reports</h3>
        <p>5 Analytics</p>
      </div>
    </div>

    {/* Recent Activity */}
    <div style={{ marginTop: "30px", textAlign: "left", padding: "10px" }}>
      <h3>Recent Activity</h3>
      <ul>
        <li>Form #102 submitted by John Doe</li>
        <li>New staff member added: Jane Smith</li>
        <li>Analytics report updated</li>
      </ul>
    </div>

    {/* Quick Links */}
    <div style={{ marginTop: "30px" }}>
      <button style={{ margin: "10px", padding: "10px 15px" }}>View Staff List</button>
      <button style={{ margin: "10px", padding: "10px 15px" }}>Check Submitted Forms</button>
    </div>
  </div>
);


const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(<Dashboard />);

  // Function to update the content dynamically
  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="admin-container">
      {/* Sidebar with Navigation Handling */}
      <Sidebar onNavigate={handleNavigation} />

      {/* Main content area remains fixed */}
      <div className="main-content">
        <Header />
        
        {/* Dynamic Content Container */}
        <div className="main-contents">
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
