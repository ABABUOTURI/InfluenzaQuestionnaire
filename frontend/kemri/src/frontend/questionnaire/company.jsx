
import React, { useState } from "react";
import "../styles/CompanyDashboard.css";
import Sidebars from "../compo/Sidebars";
import Headers from "../compo/Headers";
import StaffLists from "../compo/Registeredstaff";
import SubmittedForm from "../compo/SubmittedForm";
import Analytic from "../compo/Analytic";

// Sample Dashboard Component (Default View)
const Dashboard = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to the Company Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>
  </div>
);

const CompanyDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(<Dashboard />);

  // Function to update the content dynamically
  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="admin-container">
      {/* Sidebar with Navigation Handling */}
      <Sidebars onNavigate={handleNavigation} />

      {/* Main content area remains fixed */}
      <div className="main-content">
        <Headers />
        
        {/* Dynamic Content Container */}
        <div className="main-contents">
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
