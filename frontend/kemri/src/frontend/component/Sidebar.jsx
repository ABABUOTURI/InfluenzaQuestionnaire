

import React from "react";
import "../styles/Sidebar.css";
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import StaffList from "../component/StaffList";
import SubmittedForms from "../component/SubmittedForms";
import Analytics from "../component/Analytics";
// import InsightsPage from "../component/Insights";
// import ClusterVisualization from "../component/clusterVisualization";

// Sample Dashboard Component
// const Dashboard = () => (
//   <div style={{ textAlign: "center", padding: "20px" }}>
//     <h2>Welcome to the Admin Dashboard</h2>
//     <p>Select an option from the sidebar to get started.</p>
//   </div>
// );

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <nav>
        <h2>Admin Panel</h2>
        <ul>
        <li onClick={() => onNavigate(<Analytics />)}>
            <BarChartIcon /> Analytics
          </li>
          <li onClick={() => onNavigate(<StaffList />)}>
            <PeopleIcon /> Staff List
          </li>
          <li onClick={() => onNavigate(<SubmittedForms />)}>
            <AssignmentIcon /> Submitted Forms
          </li>
          {/* <li onClick={() => onNavigate(<InsightsPage />)}>
            <InsightsIcon /> Insights
          </li>
          <li onClick={() => onNavigate(<ClusterVisualization />)}>
            <InsightsIcon /> Visual
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
