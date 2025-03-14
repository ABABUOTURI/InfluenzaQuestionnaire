
import React, { 
  // useContext, 
  useState, 
  // useEffect 
} from 'react';
import { Formik, Form } from 'formik';
import { 
  useNavigate, 
  // useLocation 
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
  //Snackbar,
  //Alert,
  //Typography,
} from '@mui/material';
import indexValidationSchema from '../validations/indexValidation';
import { useFormContext } from "../../store/form";
// import { submitForm } from '../../api//api3';



const Index = () => {
  // const location = useLocation();
  // const [showSuccess, setShowSuccess] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const context = useFormContext();
  const [tabValue] = useState(0);
  // const { setForm } = useFormContext();
  const { data } = context || { data: {} };

  // Retrieve passed data from Socio.jsx
  const receivedFormData = JSON.parse(localStorage.getItem("formdata"))
  receivedFormData.age = +receivedFormData.age
  console.log(receivedFormData)

  // Function to generate a unique serial number
  // const generateSerialNumber = () => `SN-${Date.now()}`;

  // Function to get the current date & time in "YYYY-MM-DD HH:MM:SS" format
  const getCurrentDateTime = () => new Date().toUTCString()

  // Initialize form data, merging received data from Socio.jsx
  const [formData, setFormData] = useState({
    serial_number: receivedFormData.serial_number, // Auto-generate serial number
    date_of_data_collection: getCurrentDateTime(), // Auto-fill date & time
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
    guardian_visits:  "",
    alternative_visitor: "",
    access_to_reproductive_health_info: "",
    information_adequate: "",
    educator_name: [],
    topic_name: [],
  });

  // useEffect(() => {
  //   console.log("Received form data from Socio.jsx:", receivedFormData);
  // }, [receivedFormData]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate required fields
  // const validateForm = () => {
  //   const requiredFields = [
  //     "serial_number",
  //     "date_of_data_collection",
  //     "age",
  //     "relationship",
  //     "guardian_occupation",
  //     "guardian_education",
  //     "respondent_religion",
  //     "family_size",
  //   ];

  //   for (let field of requiredFields) {
  //     if (!formData[field]) {
  //       alert(`Error: ${field} is required`);
  //       return false;
  //     }
  //   }
  //   return true;
  // };


  
  // Submit form data to API
  const API_URL = "http://localhost:8000/api/forms/"; // Updated endpoint

 

  const handleSubmit = async () => {
    if (!formData || Object.values(formData).some((value) => value === "" || value === null)) {
      showPopup("Please fill in all required fields.", "error");
      return;
    }
  
    console.log("Submitting:", JSON.stringify(formData, null, 2));
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      console.log("Response from server:", responseData);
  
      if (response.ok) {
        showPopup("Form submitted successfully!", "success");
  
        // Hide success message after 3 seconds and navigate to /socio
        setTimeout(() => {
          navigate("/socio");
        }, 3000); // Adjusted timeout to 3 seconds
      } else {
        showPopup(`Submission failed: ${responseData.message || JSON.stringify(responseData)}`, "error");

      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showPopup("An error occurred. Please try again.", "error");
    }
  };
  
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
  
    // Hide popup after 3 seconds
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };


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
                 minWidth: "300px", // Prevents collapsing on small screens
                 margin: { xs: "10px", sm: "15px auto" }, // Responsive margin
                 padding: 3,
                 display: "flex",
                 flexDirection: "column",
                 alignItems: "center",
                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                 borderRadius: 2,
                 backgroundColor: "white",
                 minHeight: "fit-content", // Adjusts height based on content
                 flexGrow: 2, // Allows expansion if needed
                 position: { xs: "sticky", md: "relative" }, // Sticky on small screens, normal on larger screens
                 top: 0, // Keeps it at the top when scrolling
                 overflow: { xs: "hidden", md: "visible" }, // Hides overflow on small screens, normal on large screens
                 maxHeight: { xs: "80vh", md: "auto" }, // Restricts height on small screens
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
              overflowY: "auto", // Enables vertical scrolling inside
              maxHeight: { xs: "calc(100vh - 50px)", md: "auto" }, // Limits scroll height
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
                                              // form.setForm(data => ({...data, financial_support: e.target.value})) 
                                              // setFieldValue('financial_support', e.target.value)
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
                                              // setForm({ guardian_visits: e.target.value });
                                                  // form.setForm(data => ({...data, guardian_visits: e.target.value})) 
                                                  // setFieldValue('guardian_visits', e.target.value)
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
    marginBottom: { xs: 1, sm: 2, md: 3 }, // Adjusts margin for different screens
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
                                              // setForm({  alternative_visitor: e.target.value });
                                                  // form.setForm(data => ({...data, alternative_visitor: e.target.value})) 
                                                  // setFieldValue('alternative_visitor', e.target.value)
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
        marginBottom: { xs: 2, md: 0 }, // Space for small screens but none for large screens
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
                              <InputLabel>Do you have any access to reproductive health information?</InputLabel>
                              <Select
                                name="access_to_reproductive_health_info"
                                value={values.access_to_reproductive_health_info}
                                onChange={(e) => {
                                  setFieldValue(" access_to_reproductive_health_info", e.target.value);
                                  setFormData((prev) => ({...prev, access_to_reproductive_health_info: e.target.value }));
                                  // setForm({  access_to_reproductive_health_info: e.target.value });
                                  // form.setForm(data => ({...data, access_to_reproductive_health_info: e.target.value})) 
                                  // setFieldValue('access_to_reproductive_health_info', e.target.value)
                                }}
                               
                                label="Do you have any access to reproductive health information?"
                              >
                                <MenuItem value="YES">YES</MenuItem>
                                <MenuItem value="NO">NO</MenuItem>
                              </Select>
                        </FormControl>
                        </Grid>

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
                                  setFieldValue(" information_adequate", e.target.value);
                                  setFormData((prev) => ({...prev, information_adequate: e.target.value }));
                                  // setForm({   information_adequate: e.target.value });
                                  // form.setForm(data => ({...data, information_adequate: e.target.value})) 
                                  // setFieldValue('information_adequate', e.target.value)
                                }}
                               
                                label="Is the information adequate?"
                              >
                                <MenuItem value="YES">YES</MenuItem>
                                <MenuItem value="NO">NO</MenuItem>
                              </Select>
                        </FormControl>
                        </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}>
  <Grid item xs={12} md={6}>
                            <Box sx={{ marginTop: 2 }}>
                                Who educates you about reproductive health?
                               </Box> 
                               <FormGroup sx={{
                               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Apply shadow
                               borderRadius: '8px', // Rounded corners
                               border: '1px solid #ccc', // Light border color
                               padding: '16px', // Optional padding to give space inside
                               marginBottom: 2 // Optional margin
                               }}>
                                <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.educator_name.includes('Teacher')}
                                            onChange={(e) => {
                                              setFieldValue("educator_name",  e.target.checked ? [...values.educator_name, 'Teacher'] : values.educator_name.filter(item => item !== 'Teacher'));
                                              setFormData((prev) => ({...prev,educator_name: e.target.value }));
                                              // setForm({  educator_name: e.target.value });
                                              // form.setForm(data => ({...data, educator_name: e.target.value})) 
                                              // setFieldValue('educator_name', e.target.checked ? [...values.educator_name, 'Teacher'] : values.educator_name.filter(item => item !== 'Teacher'))
                                            }
                                          }
                                            value="Teacher"
                                          />
                                        }
                                        label="Teacher"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.educator_name.includes('Parents')}
                                            onChange={(e) => {
                                              setFieldValue("educator_name",  e.target.checked ? [...values.educator_name, 'Parents'] : values.educator_name.filter(item => item !== 'Parents'));
                                              setFormData((prev) => ({...prev,educator_name: e.target.value }));
                                              // form.setForm(data => ({...data, educator_name: e.target.value})) 
                                              // setFieldValue('educator_name', e.target.checked ? [...values.educator_name, 'Parents'] : values.educator_name.filter(item => item !== 'Parents'))
                                            }
                                          }
                                            value="Parents"
                                          />
                                        }
                                        label="Parents"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.educator_name.includes('Health worker')}
                                            onChange={(e) => {
                                              setFieldValue("educator_name",  e.target.checked ? [...values.educator_name, 'Health worker'] : values.educator_name.filter(item => item !== 'Health worker'));
                                              setFormData((prev) => ({...prev,educator_name: e.target.value }));
                                              // form.setForm(data => ({...data, educator_name: e.target.value})) 
                                              // setFieldValue('educator_name', e.target.checked ? [...values.educator_name, 'Health worker'] : values.educator_name.filter(item => item !== 'Health worker'))
                                            }
                                          }
                                            value="Health worker"
                                          />
                                        }
                                        label="Health worker"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.educator_name.includes('Friends')}
                                            onChange={(e) => {
                                              setFieldValue("educator_name",  e.target.checked ? [...values.educator_name, 'Friends'] : values.educator_name.filter(item => item !== 'Friends'));
                                              setFormData((prev) => ({...prev,educator_name: e.target.value }));
                                              // form.setForm(data => ({...data, educator_name: e.target.value})) 
                                              // setFieldValue('educator_name', e.target.checked ? [...values.educator_name, 'Friends'] : values.educator_name.filter(item => item !== 'Friends'))
                                            }
                                          }
                                            value="Friends"
                                          />
                                        }
                                        label="Friends"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.educator_name.includes('Radio/Magazines/TV')}
                                            onChange={(e) => {
                                              setFieldValue("educator_name",   e.target.checked ? [...values.educator_name, 'Radio/Magazine/TV'] : values.educator_name.filter(item => item !== 'Radio/Magazine/TV'));
                                              setFormData((prev) => ({...prev,educator_name: e.target.value }));
                                              // form.setForm(data => ({...data, educator_name: e.target.value})) 
                                              // setFieldValue('educator_name', e.target.checked ? [...values.educator_name, 'Radio/Magazine/TV'] : values.educator_name.filter(item => item !== 'Radio/Magazine/TV'))
                                            }
                                          }
                                            value="Radio/Magazines/TV"
                                          />
                                        }
                                        label="Radio/Magazines/TV"
                                      />
                               </FormGroup>
                               </Grid>
                               <Grid item xs={12} md={6}>
                                <Box sx={{ marginTop: 2 }}>
                                    What topics have you learned about reproductive health?
                                    </Box>
                                    <FormGroup sx={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Apply shadow
                                borderRadius: '8px', // Rounded corners
                                border: '1px solid #ccc', // Light border color
                                padding: '16px', // Optional padding to give space inside
                                marginBottom: 2 // Optional margin
                                }}>
                                
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.topic_name.includes('Sexuality')}
                                            onChange={(e) => {
                                              setFieldValue("topic_name", e.target.checked ? [...values.topic_name, 'Sexuality'] : values.topic_name.filter(item => item !== 'Sexuality'));
                                              setFormData((prev) => ({...prev,topic_name: e.target.value }));
                                              // form.setForm(data => ({...data, topic_name: e.target.value})) 
                                              // setFieldValue('topic_name', e.target.checked ? [...values.topic_name, 'Sexuality'] : values.topic_name.filter(item => item !== 'Sexuality'))
                                            }
                                            }
                                            value="Sexuality"
                                          />
                                        }
                                        label="Sexuality"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.topic_name.includes('Abstinence')}
                                            onChange={(e) => {
                                              setFieldValue("topic_name",e.target.checked ? [...values.topic_name, 'Abstinence'] : values.topic_name.filter(item => item !== 'Abstinence'));
                                              setFormData((prev) => ({...prev,topic_name: e.target.value }));
                                              // form.setForm(data => ({...data, topic_name: e.target.value})) 
                                              // setFieldValue('topic_name', e.target.checked ? [...values.topic_name, 'Abstinence'] : values.topic_name.filter(item => item !== 'Abstinence'))
                                            }
                                            }
                                            value="Abstinence"
                                          />
                                        }
                                        label="Abstinence"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.topic_name.includes('Condoms')}
                                            onChange={(e) => {
                                              setFieldValue("topic_name", e.target.checked ? [...values.topic_name, 'Condoms'] : values.topic_name.filter(item => item !== 'Condoms'));
                                              setFormData((prev) => ({...prev,topic_name: e.target.value }));
                                              // form.setForm(data => ({...data, topic_name: e.target.value})) 
                                              // setFieldValue('topic_name', e.target.checked ? [...values.topic_name, 'Condoms'] : values.topic_name.filter(item => item !== 'Condoms'))
                                            }
                                            }
                                            value="Condoms"
                                          />
                                        }
                                        label="Condoms"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.topic_name.includes('STI/HIV')}
                                            onChange={(e) => {
                                              setFieldValue("topic_name", e.target.checked ? [...values.topic_name, 'STI/HIV'] : values.topic_name.filter(item => item !== 'STI/HIV'));
                                              setFormData((prev) => ({...prev,topic_name: e.target.value }));
                                              // form.setForm(data => ({...data, topic_name: e.target.value})) 
                                              // setFieldValue('topic_name', e.target.checked ? [...values.topic_name, 'STI/HIV'] : values.topic_name.filter(item => item !== 'STI/HIV'))
                                            }
                                            }
                                            value="STI/HIV"
                                          />
                                        }
                                        label="STI/HIV"
                                      />
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={values.topic_name.includes('Relationships')}
                                            onChange={(e) => {
                                              setFieldValue("topic_name", e.target.checked ? [...values.topic_name, 'Relationship'] : values.topic_name.filter(item => item !== 'Relationship'));
                                              setFormData((prev) => ({...prev,topic_name: e.target.value }));
                                              // form.setForm(data => ({...data, topic_name: e.target.value})) 
                                              // setFieldValue('topic_name', e.target.checked ? [...values.topic_name, 'Relationship'] : values.topic_name.filter(item => item !== 'Relationship'))
                                            }
                                            }
                                            value="Relationships"
                                          />
                                        }
                                        label="Relationships"
                                      />
                                    </FormGroup>
                                </Grid>
                        </Grid>
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
        onClick={handleSubmit} 
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