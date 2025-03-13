
import React from 'react';
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const dummySubmittedForm = [
  { serialNo: "001", staffNo: "S001", name: "John Doe", submissionTime: "10:30 AM", dateOfCollection: "2024-07-12", status: "Approved" },
  { serialNo: "002", staffNo: "S002", name: "Jane Smith", submissionTime: "11:15 AM", dateOfCollection: "2024-07-12", status: "Pending" },
  { serialNo: "003", staffNo: "S003", name: "Michael Johnson", submissionTime: "02:00 PM", dateOfCollection: "2024-07-12", status: "Rejected" },
  { serialNo: "004", staffNo: "S004", name: "Emily Davis", submissionTime: "03:45 PM", dateOfCollection: "2024-07-12", status: "Approved" },
];

const SubmittedForm = ({ submittedForm = dummySubmittedForm }) => {
  return (
    <Card style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <CardContent>
        <h2>Submitted Forms</h2>
        <Table style={{ width: "100%" }} border={1}>
          <TableHead>
            <TableRow>
              <TableCell><b>Serial No</b></TableCell>
              <TableCell><b>Staff No</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Submission Time</b></TableCell>
              <TableCell><b>Date of Collection</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedForm.map((form, index) => (
              <TableRow key={index}>
                <TableCell>{form.serialNo}</TableCell>
                <TableCell>{form.staffNo}</TableCell>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.submissionTime}</TableCell>
                <TableCell>{form.dateOfCollection}</TableCell>
                <TableCell>{form.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubmittedForm;
