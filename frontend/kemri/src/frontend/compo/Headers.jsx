// Header.js
import React from "react";
import "../styles/Header.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Headers = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform logout actions, such as clearing authentication tokens
        localStorage.removeItem("authToken"); // Example: remove token from local storage
    
        // Redirect to the login page
        navigate("/");
      };
  return (
    <div className="header">
      <h1>Company Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
    </div>
  );
};

export default Headers;
