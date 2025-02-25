import React, { useContext, useState, useEffect } from 'react';
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
import { FormContext } from '../../store/form';


const Socio = () => {
const form = useContext(FormContext);

// Used to handle conditional questions
const [hasOlderSiblings, setHasOlderSiblings] = useState(false);
const [hasPocketMoney, setHasPocketMoney] = useState(false);
const [tabValue, setTabValue] = useState(0);
const navigate = useNavigate();

// State to store form data
const [formData, setFormData] = useState({
  serial_number: "",
  date_of_data_collection: "",
  field1: "",
  field2: "",
  field3: "" // Add other required form fields
});

// Function to check if the form is valid
const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

// Automatically generate serial number and date when the component mounts
useEffect(() => {
  const generateSerialNumber = () => `SN${Math.floor(100000 + Math.random() * 900000)}`;

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  setFormData((prevData) => ({
    ...prevData, // Preserve existing form data
    serial_number: generateSerialNumber(),
    date_of_data_collection: formattedDate
  }));
}, []);

    return (
        <Formik
            initialValues={{
              serial_number: '',
              date_of_data_collection: '',
              age: form.data.age,
              relationship: form.data.relationship,
              guardian_occupation: form.data.guardian_occupation,
              guardian_education: form.data.guardian_education,
              respondent_religion: form.data.respondent_religion,
              family_size: form.data.family_size,
              has_siblings: form.data.has_siblings,
              siblings_have_partners: form.data.siblings_have_partners,
              gets_pocket_money: form.data.gets_pocket_money,
              pocket_money_adequate: form.data.pocket_money_adequate,
            }}
            validationSchema={socioValidationSchema} // Validation schema imported
            onSubmit={(values) => {
              console.log(values);
            }}
        >
    
    
        {({ values, handleChange, setFieldValue }) => (
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
            form.setForm((data) => ({ ...data, age: e.target.value }));
            setFieldValue("age", e.target.value);
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
                form.setForm((data) => ({ ...data, relationship: e.target.value }));
                setFieldValue("relationship", e.target.value);
            }}
            label="Whom do you stay with?"
        >
            <MenuItem value="Father and mother">Father and mother</MenuItem>
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
            onChange={(event) => {
                form.setForm((data) => ({ ...data, guardian_occupation: event.target.value }));
                setFieldValue("guardian_occupation", event.target.value);
            }}
            label="Occupation of the Guardian"
        >
            <MenuItem value="Farm worker">Farm worker</MenuItem>
            <MenuItem value="Self employed">Self employed</MenuItem>
            <MenuItem value="Employed by someone">Employed by someone</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
        </Select>
    </FormControl>

    {values.guardian_occupation === "Others" && (
        <TextField
            label="Specify Occupation"
            name="otherGuardianOccupation"
            onChange={handleChange}
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
                form.setForm((data) => ({ ...data, guardian_education: e.target.value }));
                setFieldValue("guardian_education", e.target.value);
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
                form.setForm(data => ({ ...data, respondent_religion: e.target.value }));
                setFieldValue("respondent_religion", e.target.value);
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
            form.setForm(data => ({ ...data, family_size: e.target.value }));
            setFieldValue("family_size", e.target.value);
        }}
        fullWidth
        sx={{ width: { xs: '100%', sm: '450px', md: '500px' }, marginTop: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}
        inputProps={{ min: 1, max: 50 }}
    />

    {/* Siblings Question */}
    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2, width: { xs: '100%', sm: '450px', md: '500px' }, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <InputLabel>Do you have older siblings?</InputLabel>
        <Select
            name="has_siblings"
            value={values.has_siblings}
            onChange={(e) => {
                form.setForm(data => ({ ...data, has_siblings: e.target.value }));
                setFieldValue('has_siblings', e.target.value);
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
                    form.setForm(data => ({ ...data, siblings_have_partners: e.target.value }));
                    setFieldValue('siblings_have_partners', e.target.value);
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
                form.setForm(data => ({ ...data, gets_pocket_money: e.target.value }));
                setFieldValue('gets_pocket_money', e.target.value);
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
                    form.setForm(data => ({ ...data, pocket_money_adequate: e.target.value }));
                    setFieldValue('pocket_money_adequate', e.target.value);
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
<Button
  type="submit"
  variant="contained"
  sx={{
    minWidth: 100,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
    backgroundColor: "#57707A",
    "&:hover": { backgroundColor: "#3d525a" },
  }}
  // Disables button if form is not valid
  onClick={() => {
    if (isFormValid) {
      navigate("/index");
    }
  }}
>
  NEXT
</Button>

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