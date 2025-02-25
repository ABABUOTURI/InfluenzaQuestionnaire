import  {createContext} from "react";

export const FormContext = createContext({
    data: {
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
    },
    setForm: (func) => {}})

// export function FormContextProvider({children}) {
//     const [data, setData] = useState({
//         age: null,
//         relationship: null
//     });

//     const setForm = (func) => {
//         setData(func)
//     }
//     const form = {
//         data: data,
//         setForm: setForm
//     }
//     // ...
//     return (
//       <FormContext.Provider value={form}>
//         {children}
//       </FormContext.Provider>
//     );
//   }


//   <formContext>
//     <Socio/>
//     </formContext>