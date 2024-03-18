import {Box, Card, CardContent, List, ListItem, ListItemText, Typography,} from "@mui/material";
import {useEffect, useState} from "react";
import WarpEffect from "@/components/warp-effects";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const sections = [
    {title: "Overview", id: "overview"},
    {title: "Key Features", id: "key-features"},
    {title: "Technologies Used", id: "technologies-used"},
    {title: "Getting Started", id: "getting-started"},
    {title: "Usage", id: "usage"},
    {title: "Security Practices", id: "security-practices"},
    {title: "License", id: "license"},
    {title: "Credits", id: "credits"},
];

const Home = () => {
    const [isClient, setIsClient] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const scrollToSection = (id) => {
        setActiveSection(id); // Set the active section for styling
        const element = document.getElementById(id);
        if (element) {
            const offset = 200; // Height of the floating navigation bar + extra space
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };


    return (
        <Box>
            <List component="nav" aria-label="Readme sections" sx={{width: '100%'}}>
                {sections.map((section, index) => (
                    <ListItem
                        key={section.id}
                        button
                        onClick={() => scrollToSection(section.id)}
                        sx={{
                            py: 0.5, // Reduce padding on the Y axis for a more compact look
                            px: 2, // Adjust padding on the X axis as needed
                            minHeight: 32, // Reduce the minimum height of the list items
                            backgroundColor: section.id === activeSection ? "primary.dark" : "inherit",
                            color: section.id === activeSection ? "primary.contrastText" : "inherit",
                            '&:hover': {
                                backgroundColor: section.id === activeSection ? "primary.dark" : "",
                                '.MuiListItemText-primary': { // Change font color on hover
                                    color: section.id === activeSection ? "inherit" : "secondary.main",
                                },
                            },
                            '.MuiListItemText-primary': { // Adjust primary text styles here
                                fontSize: '0.875rem', // Smaller font size for a more compact look
                            },
                        }}
                    >
                        <ListItemText primary={`${index + 1}. ${section.title}`}/>
                    </ListItem>
                ))}
            </List>

            <Box mt={4}>
                {isClient && sections.map((section, index) => (
                    <Box key={section.id} mb={index !== sections.length - 1 ? 4 : 0}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h2" id={section.id}
                                            sx={{mb: 5, display: 'flex', alignItems: 'center'}}>
                                    {section.title}
                                    {section.id === activeSection && (
                                        <WarpEffect effect={"fadeInRight"}>
                                            <ArrowLeftIcon color="primary" sx={{height: 35, width: 35, ml: 1}}/>
                                        </WarpEffect>
                                    )}
                                </Typography>
                                {section.id === 'key-features' && (
                                    <div>
                                        <Typography paragraph>
                                            Key features of this system include:
                                        </Typography>
                                        <ul>
                                            <li>Secure user registration and authentication</li>
                                            <li>Profile management functionality</li>
                                            <li>Usage of JSON Web Tokens (JWT) for authentication</li>
                                            <li>Documentation access control</li>
                                        </ul>
                                    </div>
                                )}
                                {section.id === 'technologies-used' && (
                                    <div>
                                        <Typography paragraph>
                                            Technologies used in this project include:
                                        </Typography>
                                        <ul>
                                            <li>React for the frontend</li>
                                            <li>Node.js and FastAPI for the backend</li>
                                            <li>Material-UI for styling</li>
                                            <li>JSON Web Tokens (JWT) for authentication</li>
                                            <li>...</li>
                                        </ul>
                                    </div>
                                )}
                                {section.id === 'getting-started' && (
                                    <div>
                                        <Typography paragraph>
                                            To get started with this project, follow these steps:
                                        </Typography>
                                        <ol>
                                            <li>Clone the repository</li>
                                            <li>Install dependencies using npm or yarn</li>
                                            <li>Set up environment variables</li>
                                            <li>Run the application</li>
                                        </ol>
                                    </div>
                                )}
                                {section.id === 'usage' && (
                                    <div>
                                        <Typography paragraph>
                                            This section will provide guidelines on how to use the application,
                                            including:
                                        </Typography>
                                        <ul>
                                            <li>User registration process</li>
                                            <li>Authentication steps</li>
                                            <li>Profile management</li>
                                            <li>...</li>
                                        </ul>
                                    </div>
                                )}
                                {section.id === 'security-practices' && (
                                    <div>
                                        <Typography paragraph>
                                            Security practices implemented in this system include:
                                        </Typography>
                                        <ul>
                                            <li>Input validation</li>
                                            <li>Password hashing</li>
                                            <li>JWT token expiration</li>
                                            <li>...</li>
                                        </ul>
                                    </div>
                                )}
                                {section.id === 'license' && (
                                    <Typography paragraph>
                                        This project is licensed under the MIT License.
                                    </Typography>
                                )}
                                {section.id === 'credits' && (
                                    <Typography paragraph>
                                        Special thanks to contributors and libraries used in this project.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                        {index !== sections.length - 1 && <Box mt={2}/>} {/* Add spacing between cards */}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Home;
