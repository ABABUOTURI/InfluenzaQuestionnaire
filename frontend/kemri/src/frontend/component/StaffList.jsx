

import React from "react";
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";

const dummyStaffList = [
  { name: "John Doe", staffNo: "S001", email: "john.doe@example.com", role: "Manager" },
  { name: "Jane Smith", staffNo: "S002", email: "jane.smith@example.com", role: "HR" },
  { name: "Michael Johnson", staffNo: "S003", email: "michael.johnson@example.com", role: "Engineer" },
  { name: "Emily Davis", staffNo: "S004", email: "emily.davis@example.com", role: "Accountant" },
];

const StaffList = ({ staffList = dummyStaffList }) => {
  return (
    <Card style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <CardContent>
        <h2>Staff List</h2>
        <Table style={{ width: "100%" }} border={1}>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Staff No</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.staffNo}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Button style={{ marginRight: "5px" }} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StaffList;
