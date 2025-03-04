import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './frontend/questionnaire/Index';
import Socio from './frontend/questionnaire/Socio'; 
import LoginPage from './frontend/auth/LoginPage';
import { FormContext } from './store/form';
import Signup from './frontend/auth/Signup';
import Reset from './frontend/auth/ResetPass';
import CompanyDashboard from './frontend/questionnaire/company';
import AdminDashboard from './frontend/questionnaire/admin';


// export const FormContext = createContext({data: {age: null, relationship: null}, setForm: (func) => {}})


const App = () => {
  const [data, setData] = useState({
    age: null,
    relationship: null,
    guardian_occupation: null,
    guardian_education: null,
    respondent_religion: null,
    family_size: null,
    has_siblings: null,
    siblings_have_partners: null,
    gets_pocket_money: null,
    pocket_money_adequate: null,
    financial_support: null,
    guardian_visits: null,
    alternative_visitor: null,
    access_to_reproductive_health_info: null,
    information_adequate: null,
    educator_name: null,
    topic_name: null
});

const setForm = (func) => {
    setData(func)
}
const form = {
    data: data,
    setForm: setForm
}
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/socio" element={<FormContext.Provider value={form}><Socio /></FormContext.Provider>} />
        <Route path="/index" element={<FormContext.Provider value={form}><Index /></FormContext.Provider>} />

        <Route path="/signup" element={<FormContext.Provider value={form}><Signup /></FormContext.Provider>} />
        <Route path="/reset" element={<FormContext.Provider value={form}><Reset /></FormContext.Provider>} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        

      </Routes>
    </Router>
  );
};

export default App;
