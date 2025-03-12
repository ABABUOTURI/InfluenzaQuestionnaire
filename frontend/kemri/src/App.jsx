import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./frontend/questionnaire/Index";
import Socio from "./frontend/questionnaire/Socio";
import LoginPage from "./frontend/auth/LoginPage";
import Signup from "./frontend/auth/Signup";
import Reset from "./frontend/auth/ResetPass";
import CompanyDashboard from "./frontend/questionnaire/company";
import AdminDashboard from "./frontend/questionnaire/admin";
import { FormContextProvider } from "./store/form"; 
import StaffList from "./frontend/component/StaffList";
import Analytics from "./frontend/component/Analytics";
import SubmittedForms from "./frontend/component/SubmittedForms";

const App = () => {
  return (
    <FormContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/socio" element={<Socio />} />
          <Route path="/index" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/staff-list" element={<StaffList />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/submitted-forms" element={<SubmittedForms />} />
        </Routes>
      </Router>
    </FormContextProvider>
  );
};

export default App;
