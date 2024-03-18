import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import useAuthenticatedRoute from "@/hooks/use-authenticated-route.js";
import {useAuth} from "@/hooks/auth-context";

const Dashboard = () => {
    const {isAuthenticated} = useAuth(); // Using the hypothetical useAuth hook

    console.log(isAuthenticated)
    return (
        <Container>
            <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <Typography variant="body1">
                    Welcome to your Dashboard!
                </Typography>
            </Box>
        </Container>
    );
};

export default useAuthenticatedRoute(Dashboard);

