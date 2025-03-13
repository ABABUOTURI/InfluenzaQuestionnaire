import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TextField, Container, Typography } from "@mui/material";

const Analytic = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch reports and staff data (Replace with actual API calls)
    setReports([
      { id: 1, staffNo: "KM001", name: "John Kamau", time: "10:00 AM", status: "Submitted" },
      { id: 2, staffNo: "KM002", name: "Bil Smith", time: "11:30 AM", status: "Pending" },
      { id: 3, staffNo: "KM004", name: "Oroo Davis", time: "11:30 AM", status: "Submitted" },
      { id: 4, staffNo: "KM007", name: "Rigathi Gachagua", time: "15:30 PM", status: "Pending" },
      { id: 5, staffNo: "KM012", name: "Otieno Smith", time: "08:30 AM", status: "Pending" },
      { id: 6, staffNo: "KM014", name: "Korir Samuel", time: "06:30 AM", status: "Pending" },
      { id: 7, staffNo: "KM005", name: "Wendy Simiyu", time: "18:30 AM", status: "Pending" },
    ]);
  }, []);

  // Filter reports based on search input
  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container style={{marginTop:"25px"}}>
      <Typography variant="h4" gutterBottom>
        Staff Activity Analytics
      </Typography>

      {/* Search Filter */}
      <TextField
        label="Search Staff"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Bar Chart Visualization */}
      <div className="activity-overview" style={{ marginTop: "20px" }}>
        <Typography variant="h6">Staff Activity Overview</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredReports}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="status" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default Analytic;
