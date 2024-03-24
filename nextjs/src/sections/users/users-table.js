// noinspection JSIgnoredPromiseFromCall,JSUnresolvedReference

import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
    Box,
    Fab,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDialog from "@/sections/users/user-dialog";
import Loading from "@/components/loading";
import ErrorDisplay from "@/components/error";
import {useAuth} from "@/api/auth/auth-context";
import AddIcon from '@mui/icons-material/Add';
import toast from "react-hot-toast";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {createUser, deleteUser, fetchUsers, updateUser} from "@/api/endpoints";

export const initialUser = {
    "username": '',
    "email": '',
    "full_name": '',
    "disabled": false,
    "role": 'user',
    "password": ''
}

function UserTable() {
    const {accessToken} = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const queryClient = useQueryClient();
     const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const {data: users, isLoading, isError} = useQuery('users', () => fetchUsers(accessToken));

     const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing the number of rows per page
  };

    const updateMutation = useMutation((user) => updateUser(user, accessToken), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            toast.success('User updated successfully!');
        },
        onError: (error) => {
            // toast.error('Failed to update user.');
            const errorMessage = error?.response?.data?.detail || 'Failed to update user for an unknown reason.';
            toast.error(errorMessage);
        },
    });

    const deleteMutation = useMutation((id) => deleteUser(id, accessToken), {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            toast.success('User deleted successfully!');
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.detail || 'Failed to delete the user for an unknown reason.';
            toast.error(errorMessage);
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

      const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


    return (
        <>
            <Box sx={{display: "flex", justifyContent: "end"}}>
                <Fab size="small" color="primary" aria-label="add" onClick={handleAddUser}>
                    <AddIcon/>
                </Fab>
            </Box>
              <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.disabled ? <RemoveCircleOutlineIcon color="error" /> : <CheckCircleOutlineIcon color="success" />}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, { value: -1, label: 'All' }]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

export default UserTable;
