import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const SubmittedForm = () => {
  const [submittedForms, setSubmittedForms] = useState([]); // Ensure it's an array by default

  useEffect(() => {
    fetch("http://localhost:8001/api/submitted-forms/") // Replace with your actual API
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSubmittedForms(data);
        } else if (data && typeof data === "object") {
          // If API returns an object, extract the relevant array
          setSubmittedForms(data.forms || []); // Adjust based on API response structure
        } else {
          setSubmittedForms([]); // Fallback to empty array
        }
      })
      .catch(error => {
        console.error("Error fetching submitted forms:", error);
        setSubmittedForms([]); // Ensure it remains an array in case of an error
      });
  }, []);

  return (
    <Card style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <CardContent>
        <h2>Submitted Forms</h2>
        {submittedForms.length === 0 ? (
          <p>No submitted forms available.</p>
        ) : (
          <Table style={{ width: "100%" }} border={1}>
            <TableHead>
              <TableRow>
                <TableCell><b>Serial No</b></TableCell>
                {/* <TableCell><b>Staff No</b></TableCell> */}
                <TableCell><b>Submission Time</b></TableCell>
                {/* <TableCell><b>Date of Collection</b></TableCell> */}
                {/* <TableCell><b>Status</b></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedForms.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form.serial_number}</TableCell>
                  {/* <TableCell>{form.staffNo}</TableCell> */}
                  <TableCell>{form.submission_time}</TableCell>
                  {/* <TableCell>{form.date_of_data_collection}</TableCell> */}
                  {/* <TableCell>{form.status}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmittedForm;
