import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/k.png';

const Signup = () => {
    const [staffNo, setStaffNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Staff Number Validation
    const validateStaffNo = (staffNo) => {
        const staffNoPattern = /^(KM|AD|CM)\d{1,3}$/; // KM, AD, or CM followed by 1 to 3 digits
        return staffNoPattern.test(staffNo);
    };
    

    // Email Validation
    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z]{1}[a-z]{2,}@kemri\.go\.ke$/;
        return emailRegex.test(email);
    };

    // Password Validation
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = () => {
        setError('');

        if (!validateStaffNo(staffNo)) {
            setError("Staff Number invalid.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Email must follow the format Axyz@kemri.go.ke");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("Signup successful!");
    };

    return (
        <Box
            sx={{
                background: '#F2E9E4',
                minHeight: '97vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative',
                paddingX: { xs: 2, sm: 4, md: 6 },
                paddingTop: '20px',
            }}
        >
            {/* Logo */}
            <img
    src={Logo}
    alt="Logo"
    style={{
        position: 'fixed', // Stick to the top
        top: '10px',
        left: '40px',
        transform: 'translateX(-50%)', // Center horizontally
        width: '60px', // Reduce size for better appearance
        height: '60px', // Maintain aspect ratio
        borderRadius: '50%',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
        zIndex: 1000, // Ensure it stays above other elements
    }}
/>


            <Container
                maxWidth="sm"
                sx={{
                    width: { xs: '90%', sm: '80%', md: '50%' },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 1)',
                }}
            >
                <Typography variant="h4" gutterBottom textAlign="center">
                    Signup
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        textAlign: 'center',
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: 2,
                    }}
                >
                    Create An Account
                </Typography>

                {error && (
                    <Typography color="error" sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                {/* Staff Number Field */}
                <TextField
                    label="Staff No"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={staffNo}
                    onChange={(e) => setStaffNo(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                />

                {/* Email Field */}
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

                {/* Password Field */}
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Confirm Password Field */}
                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Signup Button */}
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        borderRadius: '25px',
                        backgroundColor: '#57707A',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.8)',
                        '&:hover': { backgroundColor: '#C5BAC4' },
                        width: { xs: '100%', sm: '80%', md: '50%' },
                        alignSelf: 'center',
                        textTransform: 'none',
                    }}
                    onClick={handleSubmit}
                >
                    Signup
                </Button>

                {/* Back Arrow Button */}
             
                    
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            ml: 0.5,
                            cursor: 'pointer',
                            '&:hover': { color: 'blue' },
                        }}
                        onClick={() => navigate('/')}
                    >
                        Already have an account? Login
                    </Typography>
               
            </Container>
        </Box>
    );
};

export default Signup;
