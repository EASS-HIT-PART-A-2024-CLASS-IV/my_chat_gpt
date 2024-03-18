import LogoutButton from "@/sections/auth/logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

export const menuItems = [
    {
        icon: <HomeIcon sx={{height: 16, width: 16, mb: "-3px", mr: 0.5}}/>,
        label: "Home",
        tooltip: "Home Page",
        path: "/",
        authenticated: null
    },
    {
        icon: <LoginIcon sx={{height: 16, width: 16, mb: "-3px", mr: 0.5}}/>,
        label: "Login",
        tooltip: "Login Page",
        path: "/login",
        authenticated: false
    },
    {
        icon: <DashboardIcon sx={{height: 16, width: 16, mb: "-3px", mr: 0.5}}/>,
        label: "Dashboard",
        tooltip: "Dashboard Page",
        path: "/dashboard",
        authenticated: true
    },
    {
        icon: <AccountBoxIcon sx={{height: 16, width: 16, mb: "-3px", mr: 0.5}}/>,
        label: "Profile",
        tooltip: "Profile Page",
        path: "/profile",
        authenticated: true
    },
    // {   icon: "",
    //     label: <LogoutButton/>,
    //     tooltip: "Logout",
    //     path: "",
    //     authenticated: true
    // },
];
