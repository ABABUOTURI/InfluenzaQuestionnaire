// Header.js
import React from "react";
import "../styles/Header.css";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <Button variant="contained" color="primary">Logout</Button>
    </div>
  );
};

export default Header;
