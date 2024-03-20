import React, {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/auth-context";
import LogoutButton from "@/sections/auth/logout";
import Image from 'next/image';


export default function Menu({logo, title, navItems}) {
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (path) => {
        router.push(path);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const filteredNavItems = navItems.filter(item => item.authenticated === null || item.authenticated === isAuthenticated);

    const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ pt: 8 }}> {/* Add padding top */}
        <List>
            {filteredNavItems.map((item, index) => (
                <ListItem button key={index} onClick={() => handleClick(item.path)}>
                    <ListItemText primary={item.label}/>
                </ListItem>
            ))}
        </List>
    </Box>
);


    return (
        <>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Image
                        sx={{m: 2}}
                        src={logo}
                        alt={title}
                        width={48}
                        height={48}
                      />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, m: 2}}>
                        {title}
                    </Typography>
                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {md: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    ) : (
                        filteredNavItems.map((item, index) => (
                            <Tooltip title={item.tooltip}>
                                <Button key={index} color="inherit" onClick={() => handleClick(item.path)}
                                        sx={{color: 'inherit'}}>
                                    <Box>{item.icon}</Box><Box>{item.label}</Box>
                                </Button>
                            </Tooltip>
                        ))
                    )}
                    {isAuthenticated && (
                        <Box sx={{mx: 1}}>
                            <LogoutButton/>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="div" sx={{height: 64}}/>
        </>
    );
}
