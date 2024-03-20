import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import toast from "react-hot-toast";

export default function ForgotPasswordModal({open, handleClose}) {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        // Implement your password reset logic here
        toast.success("Please check your email.")
        console.log(email);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{m: 0, p: 2}}>
                Forgot Password
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom variant="body2">
                    Enter your email address below, and we'll send you instructions to reset your password.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
