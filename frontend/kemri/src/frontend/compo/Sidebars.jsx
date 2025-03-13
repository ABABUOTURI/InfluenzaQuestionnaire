

import React from "react";
import "../styles/Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import StaffLists from "../compo/Registeredstaff";
import SubmittedForm from "../compo/SubmittedForm";
import Analytic from "../compo/Analytic";

// Sample Dashboard Component
const Dashboard = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to the Company Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>
  </div>
);

const Sidebars = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <nav>
        <h2 style={{marginTop:"25px"}}>Company Panel</h2>
        <ul>
          <li onClick={() => onNavigate(<Dashboard />)}>
            <DashboardIcon /> Dashboard
          </li>
          <li onClick={() => onNavigate(<StaffLists />)}>
            <PeopleIcon /> Staff List
          </li>
          <li onClick={() => onNavigate(<SubmittedForm />)}>
            <AssignmentIcon /> Submitted Forms
          </li>
          <li onClick={() => onNavigate(<Analytic />)}>
            <BarChartIcon /> Analytics
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebars;
