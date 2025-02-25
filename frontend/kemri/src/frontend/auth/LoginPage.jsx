import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment, useMediaQuery } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Importing images
import Logo from '../../assets/k.png';
import girl from '../../assets/g.jpg';

const LoginPage = () => {
    const [staffNo, setStaffNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Detects small screens

    const validateStaffNo = (staffNo) => {
        const staffNoPattern = /^KM\d{1,3}$/;
        return staffNoPattern.test(staffNo);
    };

    const handleSubmit = async () => {
        setError('');

        if (!validateStaffNo(staffNo)) {
            setError('Staff number must be in the format KM followed by 1 to 3 digits (e.g., KM1, KM12, KM123).');
            return;
        }

        if (password !== 'admin123') {
            setError('Invalid password');
            return;
        }

        navigate('/socio');
    };

    return (
        <Box
            sx={{
                background: '#F2E9E4',
                minHeight: '97vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: { xs: 'column', md: 'row' },
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

            {/* Left Side (Hide Image on Small Screens) */}
           {/* Left Side (Hide Image on Small Screens) */}
<Box
    sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }}
>
    <Container sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mt: 2 }}>
            Welcome Back To Influenza Program
        </Typography>
        <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ mt: 2 }}>
            Questionnaire for the girls aged between 15-19 years
        </Typography>
        <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ mt: 1 }}>
            To study the influence of sexual abstinence among the adolescent girls in Kisumu City
        </Typography>

        {/* Show image only on larger screens */}
        {!isSmallScreen && (
            <img
                src={girl}
                alt="Girl"
                style={{
                    width: '40%',
                    borderRadius: '10px',
                    marginTop: '20px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
                }}
            />
        )}
    </Container>
</Box>


            {/* Right Side (Login Form - Centered on Small Screens) */}
            <Container
                maxWidth="sm"
                sx={{
                    width: { xs: '90%', md: '50%' },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 1)',
                    textAlign: 'center',
                    marginTop: isSmallScreen ? '10px' : '0', // Push form down on small screens
                }}
            >
                <Typography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom>
                    Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}

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
                        fontSize: isSmallScreen ? '14px' : '16px', // Reduce font size on small screens
                    }}
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
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
                        fontSize: isSmallScreen ? '14px' : '16px', // Reduce font size on small screens
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
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
                        width: { xs: '90%', sm: '50%' }, // Full width on small screens
                        alignSelf: 'center',
                        fontSize: isSmallScreen ? '14px' : '16px', // Adjust button text size
                    }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
                {/* Back Arrow Button */}
                              
                                    <Typography
                                        sx={{
                                            marginTop:1,
                                            fontSize: '1rem',
                                            ml: 0.5,
                                            cursor: 'pointer',
                                            '&:hover': { color: 'blue' },
                                        }}
                                        onClick={() => navigate('/signup')}
                                    >
                                        Don't have an account? Signup
                                    </Typography>
                               
                              
        
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            ml: 0.5,
                                            cursor: 'pointer',
                                            '&:hover': { color: 'blue' },
                                        }}
                                        onClick={() => navigate('/reset')}
                                    >
                                        Forgot Password? Reset
                                    </Typography>
                                
            </Container>
        </Box>
    );
};

export default LoginPage;
