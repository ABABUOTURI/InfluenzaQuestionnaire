// import React, { useState, useEffect } from "react";
// import "../styles/CompanyDashboard.css"; // Import external CSS
// //import { Table } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const CompanyDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     // Fetch reports and staff data (Replace with actual API calls)
//     setReports([
//       { id: 1, staffNo: "KM001", name: "John Kamau", time: "10:00 AM", status: "Submitted" },
//       { id: 2, staffNo: "KM002", name: "Bil Smith", time: "11:30 AM", status: "Pending" },
//       { id: 3, staffNo: "KM004", name: "Oroo Davis", time: "11:30 AM", status: "Submitted" },
//       { id: 4, staffNo: "KM007", name: "Rigathi Gachagua", time: "15:30 PM", status: "Pending" },
//       { id: 5, staffNo: "KM012", name: "Otieno Smith", time: "08:30 AM", status: "Pending" },
//       { id: 5, staffNo: "KM014", name: "Korir Samuel", time: "06:30 AM", status: "Pending" },
//       { id: 5, staffNo: "KM005", name: "Wendy Simiyu", time: "18:30 AM", status: "Pending" },
//     ]);
//     setStaffList([
//       { staffNo: "KM001", name: "John Kamau", email: "john@kemri.go.ke" },
//       { staffNo: "KM002", name: "Bil Smith", email: "bill@kemri.go.ke" },
//       { staffNo: "KM004", name: "Oroo Davis", email: "oroo@kemri.go.ke" },
//       { staffNo: "KM007", name: "Rigathi Gachagua", email: "rigathi@kemri.go.ke" },
//       { staffNo: "KM012", name: "Otieno Smith", email: "otieno@kemri.go.ke" },
//       { staffNo: "KM014", name: "Korir Samuel", email: "korir@kemri.go.ke" },
//     { staffNo: "KM005", name: "Wendy Simiyu", email: "simiyu@kemri.go.ke" },
//     ]);
//   }, []);

//   const filteredReports = reports.filter(report =>
//     report.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="company-dashboard">
//       <h2>Company Dashboard</h2>
      
//       <div className="reports-section">
//         <h3>Reports</h3>
//         <input
//           type="text"
//           placeholder="Search by Name"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <table className="reports-table">
//           <thead>
//             <tr>
//               <th>Staff No</th>
//               <th>Name</th>
//               <th>Time</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map((report) => (
//               <tr key={report.id}>
//                 <td>{report.staffNo}</td>
//                 <td>{report.name}</td>
//                 <td>{report.time}</td>
//                 <td>{report.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="activity-overview">
//         <h3>Staff Activity Overview</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={reports}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="status" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
      
//       <div className="staff-list">
//         <h3>Registered Staff</h3>
//         <table className="staff-table">
//           <thead>
//             <tr>
//               <th>Staff No</th>
//               <th>Name</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((staff) => (
//               <tr key={staff.staffNo}>
//                 <td>{staff.staffNo}</td>
//                 <td>{staff.name}</td>
//                 <td>{staff.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CompanyDashboard;



import React, { useState } from "react";
import "../styles/CompanyDashboard.css";
import Sidebars from "../compo/Sidebars";
import Headers from "../compo/Headers";
import StaffLists from "../compo/StaffLists";
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
