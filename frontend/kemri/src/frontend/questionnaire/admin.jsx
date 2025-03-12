

import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import StaffList from "../component/StaffList";
import SubmittedForms from "../component/SubmittedForms";
import Analytics from "../component/Analytics";

// Sample Dashboard Component (Default View)
const Dashboard = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to the Admin Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>
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
