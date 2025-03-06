import { createContext, useState, useContext } from "react";

const FormContext = createContext(null);

export function FormContextProvider({ children }) {
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

    // ✅ Correct function for updating form data
    const setForm = (newData) => {
        setData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
      <FormContext.Provider value={{ data, setForm }}> 
        {children}
      </FormContext.Provider>
    );
}

// ✅ Custom hook to access context
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used inside a FormContextProvider.");
    }
    return context;
};
