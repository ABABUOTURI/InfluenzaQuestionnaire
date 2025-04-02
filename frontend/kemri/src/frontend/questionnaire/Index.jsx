
import React, { 
  useState, 
} from 'react';
import { useFormik, Formik, Form } from 'formik';
import { 
  useNavigate, 
} from 'react-router-dom';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import {
 Tabs,
 Tab,
 Box,
 MenuItem,
 InputLabel,
 FormControl,
 Select,
  Button,
  Grid,
} from '@mui/material';
import indexValidationSchema from '../validations/indexValidation';
import { useFormContext } from "../../store/form";
//import { useFormikContext } from "formik";


const Index = () => {
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const context = useFormContext();
  const [tabValue] = useState(0);
  const { data } = context || { data: {} };

  // Retrieve passed data from Socio.jsx
  const receivedFormData = JSON.parse(localStorage.getItem("formdata")) || {};
  receivedFormData.age = +receivedFormData.age || "";

  // Function to get the current date & time in "YYYY-MM-DD HH:MM:SS" format
  const getCurrentDateTime = () => new Date().toUTCString();

  // Initialize form data, merging received data from Socio.jsx
  const [formData, setFormData] = useState({
    serial_number: receivedFormData.serial_number || "",
    date_of_data_collection: getCurrentDateTime(),
    age: receivedFormData.age || "",
    relationship: receivedFormData.relationship || "",
    guardian_occupation: receivedFormData.guardian_occupation || "",
    guardian_education: receivedFormData.guardian_education || "",
    respondent_religion: receivedFormData.respondent_religion || "",
    family_size: receivedFormData.family_size || "",
    has_siblings: receivedFormData.has_siblings || "",
    siblings_have_partners: receivedFormData.siblings_have_partners || "",
    gets_pocket_money: receivedFormData.gets_pocket_money || "",
    pocket_money_adequate: receivedFormData.pocket_money_adequate || "",
    financial_support: "",
    guardian_visits: "",
    alternative_visitor: "",
    access_to_reproductive_health_info: "",
    information_adequate: "",
    educator_name: [],
    topic_name: [],
  });

  const handleCheckboxChange = (event, fieldName) => {
    const { value, checked } = event.target;

    setFormData((prevData) => {
        const updatedArray = checked
            ? [...prevData[fieldName], value]  // Add value if checked
            : prevData[fieldName].filter((item) => item !== value); // Remove if unchecked

        return {
            ...prevData,
            [fieldName]: updatedArray,  // Update the correct field dynamically
        };
    });
};


  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Define `validateForm` function before passing it to `handleSubmit`
  const validateForm = async () => {
    let errors = {};

    if (!formData.age) errors.age = "Age is required";
    if (!formData.relationship) errors.relationship = "Relationship is required";
    if (!formData.guardian_occupation) errors.guardian_occupation = "Guardian occupation is required";
    
    return errors;
  };


  const formik = useFormik({
    initialValues: {
        educator_name: [], // Ensure this is an array
    },
    onSubmit: (values) => {
        console.log("Form submitted:", values);
    },
});


  // ✅ Properly structured `handleSubmit` function
  const handleSubmit = async () => {
    const errors = await validateForm();
  
    if (Object.keys(errors).length > 0) {
      setPopup({ show: true, message: "Please fill in all required fields.", type: "error" });
  
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 3000);
  
      return;
    }
    console.log("Sending form data:", JSON.stringify(formData, null, 2));

    try {
      // Send form data to backend API
      const response = await fetch("http://localhost:8000/api/forms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
  
      // Optionally, save form data locally
      localStorage.setItem("formdata", JSON.stringify(formData));
  
      // Show success popup
      setPopup({ show: true, message: "Form saved successfully! Redirecting...", type: "success" });
  
      // Clear the form after saving
      setFormData({
        serial_number: "",
        date_of_data_collection: getCurrentDateTime(),
        age: "",
        relationship: "",
        guardian_occupation: "",
        guardian_education: "",
        respondent_religion: "",
        family_size: "",
        has_siblings: "",
        siblings_have_partners: "",
        gets_pocket_money: "",
        pocket_money_adequate: "",
        financial_support: "",
        guardian_visits: "",
        alternative_visitor: "",
        access_to_reproductive_health_info: "",
        information_adequate: "",
        educator_name: [],
        topic_name: [],
      });
  
      // Hide popup and navigate after 3 seconds
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        navigate("/socio");
      }, 3000);
    } catch (error) {
      console.error("Error saving form data:", error);
  
      // Show error popup
      setPopup({ show: true, message: "An error occurred while saving data!", type: "error" });
  
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 3000);
    }
  };
  



  //   if (!formData || Object.values(formData).some((value) => value === "" || value === null)) {
  //     showPopup("Please fill in all required fields.", "error");
  //     return;
  //   }
  
  //   console.log("Submitting:", JSON.stringify(formData, null, 2));
  
  //   try {
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const responseData = await response.json();
  //     console.log("Response from server:", responseData);
  
  //     if (response.ok) {
  //       showPopup("Form submitted successfully!", "success");
  
  //       // Hide success message after 3 seconds and navigate to /socio
  //       setTimeout(() => {
  //         navigate("/socio");
  //       }, 3000); 
  //     } else {
  //       showPopup(`Submission failed: ${responseData.message || JSON.stringify(responseData)}`, "error");

  //     }
  //   } catch (error) {
  //     showPopup("An error occurred. Please try again.", "error");
  //   }
  // };
  
  // const showPopup = (message, type) => {
  //   setPopup({ show: true, message, type });
  
  //   // Hide popup after 3 seconds
  //   setTimeout(() => {
  //     setPopup({ show: false, message: "", type: "" });
  //   }, 3000);
  // };


    return (
      <Formik
      initialValues={{
        financial_support: data?.financial_support || '',
        guardian_visits: data?.guardian_visits || '',
        alternative_visitor: data?.alternative_visitor || '',
        access_to_reproductive_health_info: data?.access_to_reproductive_health_info || '',
        information_adequate: data?.information_adequate || '',
        educator_name: data?.educator_name || '',
        topic_name: data?.topic_name || '',
      }}
      validationSchema={indexValidationSchema}
      onSubmit={(values) => {
        setFormData(prev => ({...prev, values}));
        console.log(values);
      }}
    >
    
{({ values, setFieldValue }) => (
      <Box
               sx={{
                 width: "82%",
                 maxWidth: "1100px",
                 minWidth: "300px", 
                 margin: { xs: "10px", sm: "15px auto" },
                 padding: 3,
                 display: "flex",
                 flexDirection: "column",
                 alignItems: "center",
                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                 borderRadius: 2,
                 backgroundColor: "white",
                 minHeight: "fit-content", 
                 flexGrow: 2, 
                 position: { xs: "sticky", md: "relative" }, 
                 top: 0, 
                 overflow: { xs: "hidden", md: "visible" }, 
                 maxHeight: { xs: "80vh", md: "auto" },
               }}
             >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="#101010"
          indicatorColor="primary"
          sx={{ color: 'black', borderRadius: '10px', maxWidth: '1200px' }}
        >
          <Tab label="Sources Information & Sexual Behavior" />
        </Tabs>
        <Box
            sx={{
              overflowY: "auto", 
              maxHeight: { xs: "calc(100vh - 50px)", md: "auto" }, 
              width: "100%",
              padding: 2,
            }}
          >
            <Form>
                <Grid container spacing={2}>
                              {/* Respondent Details Box */}
                              
                     <Grid item xs={12} md={6} >
                     <Box sx={{ marginBottom: 2 }}>
                                                <strong>Respondent Details</strong>
                    </Box>
                    <FormControl fullWidth sx={{ marginBottom: 2, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
                                          <InputLabel>Who else meets your financial needs?</InputLabel>
                                          <Select
                                            name="financial_support"
                                            value={values.financial_support}
                                            onChange={(e) => {
                                              setFieldValue("financial_support", e.target.value);
                                              setFormData((prev) => ({...prev, financial_support: e.target.value }));
                                
                                            }}
                                            label="Who else meets your financial needs?"
                                          >
                                            <MenuItem value="Relative">Relative</MenuItem>
                                            <MenuItem value="Boyfriend">Boyfriend</MenuItem>
                                            <MenuItem value="Grandparents">Grandparents</MenuItem>
                                            <MenuItem value="Other friends">Other friends</MenuItem>
                                          </Select>
                    </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 , boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)'}}>
                                              <InputLabel>Does your guardian always visit you during visiting days?</InputLabel>
                                              <Select
                                                name="guardian_visits"
                                                value={values.guardian_visits}
                                                onChange={(e) => {
                                                  setFieldValue("guardian_visits", e.target.value);
                                                  setFormData((prev) => ({...prev, guardian_visits: e.target.value }));
                                            
                                                }}
                                               
                                                label="Does your guardian always visit you during visiting days?"
                                              >
                                                <MenuItem value="YES">YES</MenuItem>
                                                <MenuItem value="NO">NO</MenuItem>
                                              </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}  >
                        <FormControl
                          fullWidth
                          sx={{
                            marginBottom: { xs: 1, sm: 2, md: 3 }, 
                            marginTop: { xs: 2, sm: 3, md: 4 },
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                          }}
                        >

                                              <InputLabel>If NO, who else visits you in school?</InputLabel>
                                              <Select
                                                name="alternative_visitor"
                                                value={values.alternative_visitor}
                                                onChange={(e) => {
                                                  setFieldValue(" alternative_visitor", e.target.value);
                                                  setFormData((prev) => ({...prev, alternative_visitor: e.target.value }));
                                              
                                                }}
                                               
                                                label="If NO, who else visits you in school?"
                                              >
                                                <MenuItem value="Boyfriend">Boyfriend</MenuItem>
                                                <MenuItem value="Relatives">Relatives</MenuItem>
                                                <MenuItem value="Brothers/Sisters">Brothers/Sisters</MenuItem>
                                                <MenuItem value="Man friend">Man friend (Any other close friend who is a casual boyfriend)</MenuItem>
                                                <MenuItem value="None">None</MenuItem>
                                              </Select>
                            </FormControl>
                            </Grid>
                     </Grid>


                     <Grid item xs={12} md={6} >
                        <Box sx={{ marginBottom: 2 }}>
                          <strong>Health Information</strong>
                        </Box>
                        <Grid container spacing={2} sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}>
                        <Grid item xs={12} md={6}>
                        <FormControl
      fullWidth
      sx={{
        marginBottom: { xs: 2, md: 0 },
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
                              <InputLabel>Do you have any access to reproductive health information?</InputLabel>
                              <Select
                                name="access_to_reproductive_health_info"
                                value={values.access_to_reproductive_health_info}
                                onChange={(e) => {
                                  setFieldValue("access_to_reproductive_health_info", e.target.value);
                                  setFormData((prev) => ({...prev, access_to_reproductive_health_info: e.target.value }));
                                 
                                }}
                               
                                label="Do you have any access to reproductive health information?"
                              >
                                <MenuItem value="YES">YES</MenuItem>
                                <MenuItem value="NO">NO</MenuItem>
                              </Select>
                        </FormControl>
                        </Grid>
                        {values.access_to_reproductive_health_info === "YES" && (
<Grid item xs={12} md={6}>
  <FormControl
    fullWidth
    sx={{
      marginBottom: { xs: 2, md: 0 }, 
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    }}
  >
                              <InputLabel>Is the information adequate?</InputLabel>
                              <Select
                                name="information_adequate"
                                value={values.information_adequate}
                                onChange={(e) => {
                                  setFieldValue("information_adequate", e.target.value);
                                  setFormData((prev) => ({...prev, information_adequate: e.target.value }));
                      
                                }}
                               
                                label="Is the information adequate?"
                              >
                                <MenuItem value="YES">YES</MenuItem>
                                <MenuItem value="NO">NO</MenuItem>
                              </Select>
                        </FormControl>
                        </Grid>
                        )}
                        </Grid>
                        {values.access_to_reproductive_health_info === "YES" && (
                          
                          <Grid container spacing={2} sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}>
                          <Grid item xs={12} md={6}>
    <Box sx={{ marginTop: 2 }}>
        Who educates you about reproductive health?
    </Box> 
    <FormGroup sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
        borderRadius: '8px', 
        border: '1px solid #ccc', 
        padding: '16px', 
        marginBottom: 2
    }}>
        {['Teacher', 'Parents', 'Health worker', 'Friends', 'Radio/Magazines/TV'].map((educator) => (
            <FormControlLabel
                key={educator}
                control={
                    <Checkbox
                        checked={formik.values.educator_name.includes(educator)}
                        onChange={(e) => {
                            const updatedEducators = e.target.checked
                                ? [...formik.values.educator_name, educator]  // Add checked item
                                : formik.values.educator_name.filter(item => item !== educator); // Remove unchecked item
                                
                            formik.setFieldValue("educator_name", updatedEducators);
                        }}
                        value={educator}
                    />
                }
                label={educator}
            />
        ))}
    </FormGroup>
</Grid>

                     
                      
                                <Grid item xs={12} md={6}>
  <Box sx={{ marginTop: 2 }}>
    What topics have you learned about reproductive health?
  </Box>
  <FormGroup
    sx={{
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "16px",
      marginBottom: 2,
    }}
  >
    {[
      "Sexuality",
      "Abstinence",
      "Condoms",
      "HIV/STI",
      "Relationships",
    ].map((topic) => (
      <FormControlLabel
        key={topic}
        control={
          <Checkbox
            checked={values.topic_name.includes(topic)}
            onChange={(e) => {
              setFieldValue(
                "topic_name",
                e.target.checked
                  ? [...values.topic_name, topic]
                  : values.topic_name.filter((item) => item !== topic)
              );
            }}
            value={topic}
          />
        }
        label={topic}
      />
    ))}
  </FormGroup>
</Grid>

                        </Grid>
                        )}
                     </Grid>
                {/* Back and Submit Buttons */}
    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
      <Button
        type="button"
        variant="contained"
        sx={{
          minWidth: 100,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          backgroundColor: "#57707A",
        }}
        onClick={() => navigate("/Socio")}
      >
        BACK
      </Button>

      {/* <Button
        type="button"
        variant="contained"
        sx={{
          minWidth: 100,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          backgroundColor: "#57707A",
        }}
        onClick={handleSubmit} 
      >
        SUBMIT
      </Button> */}
      <div>
      {popup.show && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: popup.type === "success" ? "#f7c948" : "#ff4d4d", // Gold/yellow for success, Red for error
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
        }}>
          <span style={{
            fontSize: "18px",
            marginRight: "10px",
            fontWeight: "bold"
          }}>
            {popup.type === "success" ? "✔" : "✖"}
          </span>
          <span>{popup.message}</span>
        </div>
      )}
      <Button
        type="button"
        variant="contained"
        sx={{
          minWidth: 100,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          backgroundColor: "#57707A",
        }}
        // onClick={handleSubmit} 
        onClick={() => handleSubmit(validateForm)}
      >
        SUBMIT
      </Button> 
    </div>
    </Box>

            </Form>
        </Box>
</Box>
)}
        </Formik>
    );
};

export default Index; 