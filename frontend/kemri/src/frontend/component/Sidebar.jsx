// // Sidebar.js
// import React, { useState } from "react";
// import "../styles/Sidebar.css";
// import { Link } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import StaffList from "../component/StaffList";
// import SubmittedForms from "../component/SubmittedForms";
// import Analytics from "../component/Analytics";

// const Sidebar = () => {
//   const [staffList, setStaffList] = useState([]);
//   return (
//     <div className="sidebar">
//       <nav className="sidebar">
//       <h2>Admin Panel</h2>
//       <ul>
//         <li>
//           <Link to="/staff-list">
//             <DashboardIcon /> Dashboard
//           </Link>
//         </li>
//         <li>
//         <Link to="/staff-list">
//             <PeopleIcon /> Staff List
//           </Link>
//         </li>
//         <li>
//           <Link to="/submitted-forms">
//             <AssignmentIcon /> Submitted Forms
//           </Link>
//         </li>
//         <li>
//           <Link to="/analytics">
//             <BarChartIcon /> Analytics
//           </Link>
//         </li>
//       </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import "../styles/Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import StaffList from "../component/StaffList";
import SubmittedForms from "../component/SubmittedForms";
import Analytics from "../component/Analytics";

// Sample Dashboard Component
const Dashboard = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to the Admin Dashboard</h2>
    <p>Select an option from the sidebar to get started.</p>
  </div>
);

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <nav>
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => onNavigate(<Dashboard />)}>
            <DashboardIcon /> Dashboard
          </li>
          <li onClick={() => onNavigate(<StaffList />)}>
            <PeopleIcon /> Staff List
          </li>
          <li onClick={() => onNavigate(<SubmittedForms />)}>
            <AssignmentIcon /> Submitted Forms
          </li>
          <li onClick={() => onNavigate(<Analytics />)}>
            <BarChartIcon /> Analytics
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
