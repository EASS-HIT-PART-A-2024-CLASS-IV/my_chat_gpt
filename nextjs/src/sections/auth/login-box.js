import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from "@/hooks/auth-context"; // Ensure this is the correct path
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getToken } from "@/api/endpoints"; // Ensure this is the correct path

export default function LoginBox() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAccessToken, setIsAuthenticated } = useAuth(); // Update based on the revised context
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = await getToken(username, password);
            // noinspection JSUnresolvedReference
            if (data.access_token) {
                setAccessToken(data.access_token); // Update accessToken in context
                setIsAuthenticated(true); // Update isAuthenticated state
                toast.success('Login successful!');
                await router.push('/dashboard'); // Redirect to the dashboard or another path as needed
            } else {
                // Handle cases where login is successful but no token is returned
                toast.error('Login succeeded, but no access token was returned.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#333',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography component="h1" variant="h5" style={{color: '#fff', marginBottom: '20px'}}>
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, mb: 2, width: '100%' }} onSubmit={handleLogin}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        variant="outlined"
                        color="primary"
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        color="primary"
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
