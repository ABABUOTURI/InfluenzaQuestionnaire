import React, { useState } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    IconButton, 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Reset = () => {
    // Handles error messages display function
    const [error, setError] = useState('');

    // Handles navigation
    const navigate = useNavigate();

    // Handles the email function
    const [email, setEmail] = useState('');

    // Handle form submission and regex for the accepted email format
    const handleSubmit = async () => {
        setError('');
        const emailRegex = /^[A-Za-z]{1}[a-z]{2,}@kemri\.go\.ke$/;
        if (!emailRegex.test(email)) {
            setError('Email must follow the format Axyz@kemri.go.ke');
            return;
        }

        // Navigate to LoginPage.jsx page
        navigate('/');
    };

    return (
        <Box
            sx={{
                background: '#F2E9E4',
                minHeight: '97vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column', // Keeps form centered on small screens
                padding: { xs: '20px', sm: '40px' }, // Responsive padding
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    width: { xs: '90%', sm: '70%', md: '50%' }, // Adjust width based on screen size
                    minWidth: { md: '450px' }, // Prevents form from getting too narrow on large screens
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    p: { xs: 3, sm: 4 }, // Responsive padding
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 1)',
                    textAlign: 'center', // Centers content on small screens
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Reset Password
                </Typography>
                {error && <Typography color="error">{error}</Typography>}

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                />

                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        borderRadius: '25px',
                        backgroundColor: '#57707A',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.8)',
                        '&:hover': { backgroundColor: '#C5BAC4' },
                        width: { xs: '100%', sm: '60%' }, // Adjust width for smaller screens
                        alignSelf: 'center',
                    }}
                    onClick={handleSubmit}
                >
                    Send
                </Button>

                {/* Back Arrow Button */}
                <IconButton
                    sx={{
                        mt: 2,
                        color: '#57707A',
                        alignSelf: { xs: 'center', sm: 'flex-start' }, // Centers on small screens
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={() => navigate('/')}
                >
                    <ArrowBack fontSize="small" />
                    <Typography sx={{ fontSize: '0.75rem', ml: 0.5 }}>GO BACK</Typography>
                </IconButton>
            </Container>
        </Box>
    );
};

export default Reset;
