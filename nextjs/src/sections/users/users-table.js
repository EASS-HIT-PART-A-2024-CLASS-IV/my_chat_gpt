import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {Fab, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDialog from "@/sections/users/user-dialog";
import Loading from "@/components/loading";
import ErrorDisplay from "@/components/error";
import {useAuth} from "@/hooks/auth-context";
import useAuthenticatedRoute from "@/hooks/use-authenticated-route";
import AddIcon from '@mui/icons-material/Add';
import {Box} from "@mui/system";
import toast from "react-hot-toast";

export const initialUser = {
    "username": '',
    "email": '',
    "full_name": '',
    "disabled": false,
    "role": 'user',
    "password": ''
}

// Create a basic axios instance without auth headers
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'accept': 'application/json',
    },
});

// Update your API calls to include the accessToken dynamically
const fetchUsers = async (accessToken) => {
    const {data} = await apiClient.get('/users/', {
        headers: {'api-key': accessToken}
    });
    return data;
};

const updateUser = async (user, accessToken) => {
    const {data} = await apiClient.put(`/users/${user._id}`, user, {
        headers: {'api-key': accessToken}
    });
    return data;
};

const deleteUser = async (id, accessToken) => {
    await apiClient.delete(`/users/${id}`, {
        headers: {'api-key': accessToken}
    });
    return id;
};

const createUser = async (user, accessToken) => {
    console.log(user)
    const {data} = await apiClient.post('/users/', user, {
        headers: {'api-key': accessToken}
    });
    return data;
};

function UserTable() {
    const {accessToken} = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const queryClient = useQueryClient();
    const {data: users, isLoading, isError} = useQuery('users', () => fetchUsers(accessToken));

    const updateMutation = useMutation((user) => updateUser(user, accessToken), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            toast.success('User updated successfully!');
        },
        onError: () => {
            toast.error('Failed to update user.');
        },
    });

    const deleteMutation = useMutation((id) => deleteUser(id, accessToken), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            toast.success('User deleted successfully!');
        },
        onError: () => {
            toast.error('Failed to delete user.');
        },
    });

    const createMutation = useMutation((user) => createUser(user, accessToken), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            setOpenDialog(false); // Close dialog after successful creation
            toast.success('User created successfully!');
        },
        onError: () => {
            toast.error('Failed to create user.');
        },
    });

    // Function to open the dialog in "add user" mode
    const handleAddUser = () => {
        setCurrentUser(initialUser);
        setOpenDialog(true);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <Loading/>;
    if (isError) return <ErrorDisplay message={"Oops, the remote server is down.."}/>;

    const onSave = (userData) => {
        if (userData._id) {
            updateMutation.mutate(userData); // Existing user, update
        } else {
            createMutation.mutate(userData); // New user, create
        }
        setOpenDialog(false); // Close dialog after operation
        setCurrentUser(null); // Reset current user
    };

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "end"}}>
                <Fab size="small" color="primary" aria-label="add" onClick={handleAddUser}>
                    <AddIcon/>
                </Fab>
            </Box>
            <TableContainer sx={{mt: 3}} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(user)}><EditIcon/></IconButton>
                                    <IconButton onClick={() => handleDelete(user._id)}><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {currentUser && (
                <UserDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    user={currentUser}
                    onSave={onSave}
                />
            )}
        </>
    );
}

export default useAuthenticatedRoute(UserTable);
