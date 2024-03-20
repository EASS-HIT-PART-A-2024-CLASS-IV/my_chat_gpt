import React from 'react';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CoffeeIcon from '@mui/icons-material/Coffee';
import {Box, IconButton, Tooltip, Typography, useTheme, Link} from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                zIndex: 1,
                py: 2,
                px: 3,
                mt: 'auto',
                color: theme.palette.text.secondary,
                textAlign: 'center',
                // backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography variant="body1">
                © Copyright {currentYear} |
                <Link
                    href="https://github.com/georgekhananaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 0.5 }}
                >
                    George Khananaev
                </Link>
            </Typography>
            <Box sx={{mt: 1}}>
                <Tooltip title="GitHub">
                    <IconButton
                        component="a"
                        href="https://github.com/georgekhananaev"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ p: 0.3, m: 0 }}
                    >
                        <GitHubIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="LinkedIn">
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/georgekhananaev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ p: 0.3, m: 0 }}
                    >
                        <LinkedInIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Buy me a coffee">
                    <IconButton
                        component="a"
                        href="https://www.buymeacoffee.com/georgekhananaev"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ p: 0.3, m: 0 }}
                    >
                        <CoffeeIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Footer;
