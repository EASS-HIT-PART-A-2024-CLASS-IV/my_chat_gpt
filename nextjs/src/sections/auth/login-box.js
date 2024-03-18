// LoginBox.js
import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {useAuth} from "@/hooks/auth-context";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

export default function LoginBox() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setAccessToken} = useAuth();
    const router = useRouter(); // Initialize useRouter hook

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/v1/token?username=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Instead of throwing an error, directly show a toast message
                toast.error('Login failed. Please check your credentials.');
                return; // Stop execution if login failed
            }

            const data = await response.json();
            setAccessToken(data.access_token); // Store the access token in context
            toast.success('Login successful!'); // Show success message
            await router.push('/dashboard'); // Redirect to dashboard
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
                <Box component="form" noValidate sx={{width: '100%'}} onSubmit={handleLogin}>
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
                        InputProps={{
                            style: {color: '#fff'},
                        }}
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
                        InputProps={{
                            style: {color: '#fff'},
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: '#1976d2'}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
