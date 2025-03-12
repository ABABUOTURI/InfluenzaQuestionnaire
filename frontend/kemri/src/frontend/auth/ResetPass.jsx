import React, { useState } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    IconButton, 
    Snackbar,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setShowAlert(false);
        const emailRegex = /^[A-Za-z]{1}[a-z]{2,}@kemri\.go\.ke$/;
        
        if (!emailRegex.test(email)) {
            setAlertType("error");
            setAlertMessage("Email must follow the format Axyz@kemri.go.ke");
            setShowAlert(true);
            return;
        }

        try {
            // Simulating email send request
            await fetch("http://127.0.0.1:8000/api/send-reset-email/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            setAlertType("success");
            setAlertMessage("Reset password email sent successfully!");
            setShowAlert(true);
        } catch (error) {
            setAlertType("error");
            setAlertMessage("An error occurred. Please try again.");
            setShowAlert(true);
        }
    };

    return (
        <Box sx={{ background: '#F2E9E4', minHeight: '97vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: { xs: '20px', sm: '40px' } }}>
            <Container maxWidth="sm" sx={{ width: { xs: '90%', sm: '70%', md: '50%' }, minWidth: { md: '450px' }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 1)', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Reset Password</Typography>
                <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} InputLabelProps={{ shrink: true }} type="email" sx={{ '& .MuiOutlinedInput-root': { boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' } }} />
                <Button variant="contained" sx={{ mt: 2, borderRadius: '25px', backgroundColor: '#57707A', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.8)', '&:hover': { backgroundColor: '#C5BAC4' }, width: { xs: '100%', sm: '60%' }, alignSelf: 'center' }} onClick={handleSubmit}>Send</Button>
                <IconButton sx={{ mt: 2, color: '#57707A', alignSelf: { xs: 'center', sm: 'flex-start' }, display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}> <ArrowBack fontSize="small" /> <Typography sx={{ fontSize: '0.75rem', ml: 0.5 }}>GO BACK</Typography> </IconButton>
            </Container>

            {/* Snackbar Alert */}
            <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={() => setShowAlert(false)} severity={alertType} sx={{ width: "100%", fontSize: "16px", fontWeight: "bold" }}>{alertMessage}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Reset;
