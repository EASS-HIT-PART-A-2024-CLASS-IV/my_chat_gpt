import LogoutButton from "@/sections/auth/logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const iconStyle = {height: 16, width: 16, mb: "-3px", mr: 0.5}
export const menuItems = [
    {
        icon: <HomeIcon sx={iconStyle}/>,
        label: "Home",
        tooltip: "Home Page",
        path: "/",
        authenticated: null
    },
    {
        icon: <LoginIcon sx={iconStyle}/>,
        label: "Login",
        tooltip: "Login Page",
        path: "/login",
        authenticated: false
    },
    {
        icon: <DashboardIcon sx={iconStyle}/>,
        label: "Dashboard",
        tooltip: "Dashboard Page",
        path: "/dashboard",
        authenticated: true
    },
    {
        icon: <PeopleAltIcon sx={iconStyle}/>,
        label: "Users",
        tooltip: "Users",
        path: "/users",
        authenticated: true
    },
    {
        icon: <AccountBoxIcon sx={iconStyle}/>,
        label: "Profile",
        tooltip: "Profile Page",
        path: "/profile",
        authenticated: true
    }
];
