import React, { 
  // useContext, 
  useState, 
  useEffect 
} from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    Tabs,
    Tab,
    Box,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    Button,
     TextField,
     Grid,
    // Typography,
   } from '@mui/material';
import socioValidationSchema from '../validations/socioValidation';
import { useFormContext } from '../../store/form';

const Socio = () => {
  // Always call hooks at the top level
  const context = useFormContext(); 
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate(); 
  // const [form] = useState({});
  // const { setForm } = useFormContext(); 
  // const [hasOlderSiblings, setHasOlderSiblings] = useState(false);
  // const [hasPocketMoney, setHasPocketMoney] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Ensure `context` is available before extracting values
  const { data } = context || { data: {}};
  //const { form } = context || { form: {}, setForm: () => {} };

  const generateSerialNumber = () => `SN-${Date.now()}`;

  // Function to get the current date & time in "YYYY-MM-DD HH:MM:SS" format
  const getCurrentDateTime = () => new Date().toISOString().slice(0, 19).replace("T", " ");

  const [formData, setFormData] = useState({
    // serial_number: generateSerialNumber(), // Auto-generate serial number
    // date_of_data_collection: getCurrentDateTime(), 
    serial_number: "",
    date_of_data_collection: "",
    age: "",
    relationship: "",
    guardian_occupation: "",
    guardian_education:"",
    respondent_religion: "",
    family_size: "",
    has_siblings: "",
    siblings_have_partners: "",
    gets_pocket_money: "",
    pocket_money_adequate: "",
  });

  // Generate serial number and date only once when component mounts
  // useEffect(() => {
  //   const generateSerialNumber = () => `SN${Math.floor(100000 + Math.random() * 900000)}`;
  //   const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     serial_number: generateSerialNumber(),
  //     date_of_data_collection: getCurrentDateTime(),
  //     // date_of_data_collection: currentDate,
  //   }));
  // }, []);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      serial_number: generateSerialNumber(),
      date_of_data_collection: getCurrentDateTime(),
    }));
  }, []);

  // Handle form input changes
  // const handle = (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleNext = async (validateForm) => {
  //   try {
  //     const errors = await validateForm(); // Validate using Formik
  //     console.log("Validation errors:", errors); // Debugging
  
  //     if (Object.keys(errors).length > 0) {
  //       showPopup("Please fill in all required fields before proceeding.", "error");
  //       return;
  //     }
  
  //     localStorage.setItem("formdata", JSON.stringify(formData));
  //     showPopup("Form saved successfully! Redirecting to Next page", "success");
  
  //     setTimeout(() => {
  //       navigate("/index");
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Validation error:", error);
  //   }
  // };
  const handleNext = async (validateForm) => {
    const errors = await validateForm(); // Validate using Formik
  
    if (Object.keys(errors).length > 0) {
      // Show an alert for each specific field that has an error
      Object.keys(errors).forEach((field) => {
        showPopup(errors[field], "error");
      });
      return;
    }
  
    // Save form data
    localStorage.setItem("formdata", JSON.stringify(formData));
    showPopup("Form saved successfully! Redirecting to Next page", "success");
  
    setTimeout(() => {
      navigate("/index");
    }, 3000);
  };
  
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
  
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };
  
 

    return (
        // <Formik
        //     initialValues={{
        //       serial_number: data?.serial_number,
        //       date_of_data_collection: data?.date_of_data_collection,
        //       age: data?.age,
        //       relationship: data?.relationship,
        //       guardian_occupation: data?.guardian_occupation,
        //       guardian_education: data?.guardian_education,
        //       respondent_religion: data?.respondent_religion,
        //       family_size: data?.family_size,
        //       has_siblings: data?.has_siblings,
        //       siblings_have_partners: data?.siblings_have_partners,
        //       gets_pocket_money: data?.gets_pocket_money,
        //       pocket_money_adequate: data?.pocket_money_adequate,
        //     }}
        //     validationSchema={socioValidationSchema} // Validation schema imported
        //     onSubmit={(values) => {
        //       console.log(values);
        //     }}
        // >
      //   <Formik
      //   initialValues={{
      //     serial_number: generateSerialNumber(),
      //     date_of_data_collection: getCurrentDateTime(),
      //     age: data?.age,
      //     relationship: data?.relationship,
      //     guardian_occupation: data?.guardian_occupation,
      //     guardian_education: data?.guardian_education,
      //     respondent_religion: data?.respondent_religion,
      //     family_size: data?.family_size,
      //     has_siblings: data?.has_siblings,
      //     siblings_have_partners: data?.siblings_have_partners,
      //     gets_pocket_money:data?.gets_pocket_money,
      //     pocket_money_adequate: data?.pocket_money_adequate,
      //   }}
      //   validationSchema={socioValidationSchema}
      //   onSubmit={handleNext}
      // >
      

      <Formik
  initialValues={JSON.parse(localStorage.getItem("formdata")) || {
    serial_number: generateSerialNumber(),
    date_of_data_collection: getCurrentDateTime(),
    age: data?.age || '',
    relationship: data?.relationship || '',
    guardian_occupation: data?.guardian_occupation || '',
    guardian_education: data?.guardian_education || '',
    respondent_religion: data?.respondent_religion || '',
    family_size: data?.family_size || '',
    has_siblings: data?.has_siblings || '',
    siblings_have_partners: data?.siblings_have_partners || '',
    gets_pocket_money: data?.gets_pocket_money || '',
    pocket_money_adequate: data?.pocket_money_adequate || '',
  }}
  validationSchema={socioValidationSchema}
  onSubmit={handleNext}
>


        {({validateForm , values, handleChange, setFieldValue }) => (
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
            onChange={(event, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            sx={{
              color: "black",
              borderRadius: "10px",
              maxWidth: "1200px",
            }}
          >
            <Tab label="Socio-Economic & Demographic Data" />
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
              {/* First Box: Serial Number and Date of Collection */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row", // Always row layout
                  flexWrap: "wrap", // Wrap if needed on smaller screens
                  alignItems: "center",
                  justifyContent: "flex-start", // Left-align on large screens
                  gap: { xs: 1, sm: 2 }, // Smaller gap on small screens
                }}
              >
                {/* Serial Number */}
                <TextField
                  label="Serial Number"
                  name="serial_number"
                  value={formData.serial_number}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#57707A",
                      padding: "0 8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                      borderRadius: "4px",
                    },
                  }}
                  sx={{
                    width: { xs: "45%", sm: "200px" }, // Adjust width for smaller screens
                    minWidth: "140px", // Ensure minimum width
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                    backgroundColor: "#57707A",
                    border: "1px solid white",
                    color: "white",
                    input: { color: "white", fontSize: "14px" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                    },
                    marginRight: { xs: 1, sm: 2 }, // Reduce margin for small screens
                  }}
                  InputProps={{ readOnly: true }}
                />
        
                {/* Date of Collection */}
                <TextField
                  label="Date of Collection"
                  name="date_of_data_collection"
                  value={formData.date_of_data_collection}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#57707A",
                      padding: "0 8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                      borderRadius: "4px",
                    },
                  }}
                  sx={{
                    width: { xs: "45%", sm: "200px" }, // Same as Serial Number
                    minWidth: "140px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                    backgroundColor: "#57707A",
                    border: "1px solid white",
                    color: "white",
                    input: { color: "white", fontSize: "14px" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                    },
                  }}
                  InputProps={{ readOnly: true }}
                />
              </Box>

 {/*Grid layout*/}
 <Grid container spacing={2}>
 <Grid item xs={12} md={6} 
   
  >
    {/* Age */}
    <InputLabel sx={{ marginTop: 1 }}>How old are you?</InputLabel>
    <TextField
        name="age"
        type="number"
        value={values.age}
        onChange={(e) => {
          setFieldValue("age", e.target.value);
          setFormData((prev) => ({ ...prev, age: e.target.value }));
        }}
        fullWidth
        sx={{
            marginRight: 2,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            width: { xs: "100%", sm: "450px", md: "500px" }, // Responsive width
            maxWidth: "100%",
        }}
        inputProps={{ min: 15, max: 19 }}
    />

    <Box sx={{ marginBottom: 1, marginTop: 1 }}>
        <strong>Guardian Details</strong>
    </Box>

    {/* Guardian Relationship */}
    <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: "100%", sm: "450px", md: "500px" }, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}>
        <InputLabel>Whom do you stay with?</InputLabel>
        <Select
      name="relationship"
      value={values.relationship}
      onChange={(e) => {
        // setForm((prevData) => ({ ...prevData, relationship: e.target.value })); // ✅ Correct usage
        // setFieldValue("relationship", e.target.value);

        setFieldValue("relationship", e.target.value);
        setFormData((prev) => ({ ...prev, relationship: e.target.value }));
      }}
      label="Whom do you stay with?"
    >
      <MenuItem value="Father and Mother">Father and mother</MenuItem>
      <MenuItem value="Mother only">Mother only</MenuItem>
      <MenuItem value="Father only">Father only</MenuItem>
      <MenuItem value="Relative">Relative</MenuItem>
    </Select>
    </FormControl>

    {/* Guardian Occupation */}
    <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: "100%", sm: "450px", md: "500px" }, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}>
        <InputLabel>Occupation of the Guardian</InputLabel>
        <Select
      name="guardian_occupation"
      value={values.guardian_occupation}
      onChange={(e) => {
        setFieldValue("guardian_occupation", e.target.value);
        setFormData(prev => ({ ...prev,  guardian_occupation: e.target.value }));
        // setForm((prevData) => ({ ...prevData, guardian_occupation: event.target.value })); // ✅ Correct usage
        // setFieldValue("guardian_occupation", event.target.value);
      }}
      label="Occupation of the Guardian"
    >
      <MenuItem value="Farm Worker">Farm worker</MenuItem>
      <MenuItem value="Self Employed">Self employed</MenuItem>
      <MenuItem value="Employed by someone">Employed by someone</MenuItem>
      <MenuItem value="Professional">Professional</MenuItem>
      <MenuItem value="Other">Others</MenuItem>
    </Select>
    </FormControl>

    {values.guardian_occupation === "Others" && (
        <TextField
            label="Specify Occupation"
            name="otherGuardianOccupation"
            onChange={(e) => {
              setFieldValue("otherGuardianOccupation", e.target.value);
              setFormData(prev => ({ ...prev,  otherGuardianOccupation: e.target.value }));
            }}
            fullWidth
            sx={{
                width: { xs: "100%", sm: "450px", md: "500px" }, // Responsive width
                marginRight: 2,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
        />
    )}

    {/* Guardian Education */}
    <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: "100%", sm: "450px", md: "500px" }, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}>
        <InputLabel>Academic Level of Guardian</InputLabel>
        <Select
      name="guardian_education"
      value={values.guardian_education}
      onChange={(e) => {
        setFieldValue("guardian_education", e.target.value);
        setFormData(prev => ({ ...prev, guardian_education: e.target.value }));
        // setForm((prevData) => ({ ...prevData, guardian_education: e.target.value })); // ✅ Correct usage
        // setFieldValue("guardian_education", e.target.value);
      }}
      label="Academic Level of Guardian"
    >
      <MenuItem value="None">None</MenuItem>
      <MenuItem value="Primary">Primary</MenuItem>
      <MenuItem value="Secondary">Secondary</MenuItem>
      <MenuItem value="Tertiary Education">Tertiary Education</MenuItem>
    </Select>
    </FormControl>
</Grid>

<Grid item xs={12} md={6} 
   
  >
    <Box sx={{ marginBottom: 1 }}>
        <strong>Respondent Details</strong>
    </Box>

    {/* Religion Selection */}
    <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <InputLabel>What is your religion?</InputLabel>
        <Select
      name="respondent_religion"
      value={values.respondent_religion}
      onChange={(e) => {
        setFieldValue("respondent_religion", e.target.value);
        setFormData(prev => ({ ...prev, respondent_religion: e.target.value }));
        // setForm((prevData) => ({ ...prevData, respondent_religion: e.target.value })); // ✅ Correct usage
        // setFieldValue("respondent_religion", e.target.value);
      }}
      label="What is your religion?"
    >
      <MenuItem value="Catholic">Catholic</MenuItem>
      <MenuItem value="Protestant">Protestant</MenuItem>
      <MenuItem value="Muslim">Muslim</MenuItem>
      <MenuItem value="SDA">SDA</MenuItem>
      <MenuItem value="None">None</MenuItem>
    </Select>
    </FormControl>

    {/* Family Size Input */}
    <TextField
      label="How many are you in the family?"
      name="family_size"
      type="number"
      value={values.family_size}
      onChange={(e) => {
        setFieldValue("family_size", e.target.value);
        setFormData(prev => ({ ...prev, family_size: e.target.value }));
        // setForm((prevData) => ({ ...prevData, family_size: e.target.value })); // ✅ Use setForm directly
        // setFieldValue("family_size", e.target.value);
      }}
      fullWidth
      sx={{
        width: { xs: "100%", sm: "450px", md: "500px" },
        marginTop: 3,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      }}
      inputProps={{ min: 1, max: 50 }}
    />

    {/* Siblings Question */}
    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <InputLabel>Do you have older siblings?</InputLabel>
        <Select
      name="has_siblings"
      value={values.has_siblings}
      onChange={(e) => {
        setFieldValue("has_siblings", e.target.value);
        setFormData(prev => ({...prev, has_siblings: e.target.value }));
        // setForm((prevData) => ({ ...prevData, has_siblings: e.target.value })); // ✅ Correct function call
        // setFieldValue("has_siblings", e.target.value);
      }}
      label="Do you have older siblings?"
    >
      <MenuItem value="YES">Yes</MenuItem>
      <MenuItem value="NO">No</MenuItem>
    </Select>
    </FormControl>

    {/* If siblings exist, ask about their relationships */}
    {values.has_siblings === 'YES' && (
        <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
            <InputLabel>If Yes, do they have girlfriends/boyfriends?</InputLabel>
            <Select
      name="siblings_have_partners"
      value={values.siblings_have_partners}
      onChange={(e) => {
        setFieldValue("siblings_have_partners", e.target.value);
        setFormData(prev => ({...prev, siblings_have_partners: e.target.value }));
        // setForm((prevData) => ({ ...prevData, siblings_have_partners: e.target.value })); // ✅ Correct function call
        // setFieldValue("siblings_have_partners", e.target.value);
      }}
      label="If Yes, do they have girlfriends/boyfriends?"
    >
      <MenuItem value="YES">Yes</MenuItem>
      <MenuItem value="NO">No</MenuItem>
    </Select>
        </FormControl>
    )}

    {/* Pocket Money Question */}
    <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <InputLabel>Do you receive pocket money?</InputLabel>
        <Select
            name="gets_pocket_money"
            value={values.gets_pocket_money}
            onChange={(e) => {
              setFieldValue("gets_pocket_money", e.target.value);
              setFormData(prev => ({...prev, gets_pocket_money: e.target.value }));
                // setForm(data => ({ ...data, gets_pocket_money: e.target.value }));
                // setFieldValue('gets_pocket_money', e.target.value);

        //         setForm((prevData) => ({ ...prevData, siblings_have_partners: e.target.value })); // ✅ Correct function call
        // setFieldValue("siblings_have_partners", e.target.value);
            }}
            label="Do you receive pocket money?"
        >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
        </Select>
    </FormControl>

    {/* If pocket money is received, ask about its adequacy */}
    {values.gets_pocket_money === 'YES' && (
        <FormControl fullWidth sx={{ marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
            <InputLabel>If Yes, is it adequate?</InputLabel>
            <Select
      name="pocket_money_adequate"
      value={values.pocket_money_adequate}
      onChange={(e) => {
        setFieldValue("pocket_money_adequate", e.target.value);
              setFormData(prev => ({...prev, pocket_money_adequate: e.target.value }));
        // setForm((prevData) => ({ ...prevData, pocket_money_adequate: e.target.value })); // ✅ Correct function call
        // setFieldValue("pocket_money_adequate", e.target.value);
      }}
      label="If Yes, is it adequate?"
    >
      <MenuItem value="YES">Yes</MenuItem>
      <MenuItem value="NO">No</MenuItem>
    </Select>
        </FormControl>
    )}
</Grid>

</Grid>


<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
<div>
      {popup.show && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: popup.type === "success" ? "#f7c948" : "#ff4d4d",
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
        "&:hover": { backgroundColor: "#3d525a" },
      }}
      onClick={() => handleNext(validateForm)}
    >
      NEXT
    </Button>

    </div>


            </Box>

            </Form>
            
          </Box>
        </Box>
          )
    }
   
</Formik>
);
};
export default Socio; 