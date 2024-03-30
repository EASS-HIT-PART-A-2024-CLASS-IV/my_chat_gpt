import React from 'react';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Box, IconButton, Link, Tooltip, Typography, useTheme} from '@mui/material';

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
                    href="https://github.com/itayMenashe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    color="inherit"
                    sx={{mx: 0.5}}
                >
                    Itay Menashe
                </Link>
            </Typography>
            <Box sx={{mt: 1}}>
                <Tooltip title="GitHub">
                    <IconButton
                        component="a"
                        href="https://github.com/itayMenashe7"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{p: 0.3, m: 0}}
                    >
                        <GitHubIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="LinkedIn">
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/itay-menashe-0a827a225/"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{p: 0.3, m: 0}}
                    >
                        <LinkedInIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Footer;
