import {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, CardHeader, Grid, IconButton, TextField, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BlockIcon from '@mui/icons-material/Block';
import {amber, blue, deepPurple, green, pink, red} from '@mui/material/colors';
import Loading from "@/components/loading";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        // Check if window is defined (i.e., if we are running in the browser)
        if (typeof window !== 'undefined') {
            const currentToken = localStorage.getItem('accessToken'); // Move this inside useEffect

            // Ensure that we have a token before attempting to fetch profile
            if (currentToken) {
                const fetchProfile = async () => {
                    const response = await fetch('http://localhost:8000/api/v1/users/profile', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'api-key': currentToken,
                        },
                    });

                    if (!response.ok) {
                        console.error("Failed to fetch user profile.");
                        return;
                    }

                    const data = await response.json();
                    setUser(data);
                    setEditedUser(data); // Initialize editable fields with fetched data
                };

                fetchProfile();
            }
        }
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        console.log('Saving data', editedUser);
        // After saving data, exit the edit mode
        setEditMode(false);
        // Here, you would typically send a PUT request to your server to save the updated user data
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedUser({...editedUser, [name]: value});
    };

    if (!user) {
        return <Loading/>;
    }

    return (
        <Card sx={{m: 2, borderRadius: '16px', boxShadow: 3}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: deepPurple[500]}} aria-label="profile">
                        {user.full_name[0].toUpperCase()}
                    </Avatar>
                }
                title={<Typography variant="h6">{editMode ? "Edit Profile" : "Profile"}</Typography>}
                action={
                    editMode ? (
                        <IconButton aria-label="save" onClick={handleSave}>
                            <SaveIcon sx={{color: green[500]}}/>
                        </IconButton>
                    ) : (
                        <IconButton aria-label="edit" onClick={handleEditToggle}>
                            <EditIcon sx={{color: blue[500]}}/>
                        </IconButton>
                    )
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <BadgeIcon sx={{color: pink[500], mr: 1}}/>
                        <Typography variant="body2">ID: {user._id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        {user.disabled ? (
                            <BlockIcon sx={{color: red[500], mr: 1}}/>
                        ) : (
                            <VerifiedUserIcon sx={{color: blue[500], mr: 1}}/>
                        )}
                        <Typography variant="body2">Status: {user.disabled ? 'Disabled' : 'Active'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <AccountCircleIcon sx={{color: blue[500], mr: 1}}/>
                        {editMode ? (
                            <TextField fullWidth label="Full Name" variant="outlined" defaultValue={user.full_name}
                                       name="full_name" onChange={handleChange}/>
                        ) : (
                            <Typography variant="body2">Full Name: {user.full_name}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <AccountCircleIcon sx={{color: deepPurple[500], mr: 1}}/>
                        <Typography variant="body2">Username: {user.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <EmailIcon sx={{color: green[500], mr: 1}}/>
                        {editMode ? (
                            <TextField fullWidth label="Email" variant="outlined" defaultValue={user.email} name="email"
                                       onChange={handleChange}/>
                        ) : (
                            <Typography variant="body2">Email: {user.email}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <AdminPanelSettingsIcon sx={{color: amber[700], mr: 1}}/>
                        <Typography variant="body2">Role: {user.role}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}