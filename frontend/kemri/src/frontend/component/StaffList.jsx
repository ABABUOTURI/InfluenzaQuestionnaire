
import React, { useEffect, useState } from "react";
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const StaffLists = () => {
  const [staffLists, setStaffLists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/staff/")  // ✅ Updated endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Staff data:", data); // Debugging to inspect response structure
        // Ensure that the response is an array
        if (Array.isArray(data)) {
          setStaffLists(data);
        } else {
          console.error("Received data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching staff data:", error));
  }, []);

  return (
    <Card style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <CardContent>
        <h2>Staff List</h2>
        <Table style={{ width: "100%" }} border={1}>
          <TableHead style={{ position: "sticky", top: 0, background: "#808080", zIndex: 2 }}>
            <TableRow>
              <TableCell style={{ color: "white" }}><b>Staff No</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Email</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Role</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(staffLists) && staffLists.length > 0 ? (
              staffLists.map((staff, index) => {
                let role = "Unknown"; // Default role
                if (staff.staff_no.startsWith("CM")) role = "Company";
                else if (staff.staff_no.startsWith("KM")) role = "Staff";
                else if (staff.staff_no.startsWith("AD")) role = "Admin";

                return (
                  <TableRow key={index}>
                    <TableCell>{staff.staff_no}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{role}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No staff data available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StaffLists;
