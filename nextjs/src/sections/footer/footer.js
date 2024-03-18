import React from 'react';
import {Box, Link, Typography, useTheme} from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: 'auto',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                © Copyright {currentYear} |
                <Link
                    href="https://github.com/georgekhananaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{color: 'inherit', ml: 0.5}}
                >
                    George Khananaev
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
