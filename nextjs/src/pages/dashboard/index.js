import React from 'react';
import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material';
import useAuthenticatedRoute from "@/hooks/use-authenticated-route.js";
import {useAuth} from "@/api/auth/auth-context";

const Dashboard = () => {
    const {userProfile} = useAuth();

    // Example content for a dashboard
    const stats = [
        {label: 'Total Projects', value: 12},
        {label: 'Completed Tasks', value: 87},
        {label: 'Open Tickets', value: 5},
    ];

    return (
        <Container component="main" maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography component="h1" variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="h6" gutterBottom>
                Welcome back, {userProfile?.full_name || 'User'}!
            </Typography>
            <Grid container spacing={3} sx={{mt: 2}}>
                {/* Stats Section */}
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {stat.label}
                            </Typography>
                            <Typography component="p" variant="h4">
                                {stat.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
                {/* Additional Sections could go here */}
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                <Button variant="contained" color="primary"
                        onClick={() => alert('This could lead to more detailed stats or actions.')}>
                    View More Details
                </Button>
            </Box>
        </Container>
    );
};

export default useAuthenticatedRoute(Dashboard);
