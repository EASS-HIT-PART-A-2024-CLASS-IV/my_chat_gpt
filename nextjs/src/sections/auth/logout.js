// LogoutButton.js
import React, {useState} from 'react';
import {useAuth} from "@/hooks/auth-context";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import ConfirmModal from "@/components/confirmation-modal";


export default function LogoutButton() {
    const {setAccessToken} = useAuth();
    const router = useRouter();
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)

    const handleLogout = async () => {
        try {
            const currentToken = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage
            // If you're storing the token in context or another state management solution, retrieve it from there instead

            await fetch('http://localhost:8000/api/v1/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'api-key': currentToken, // Use the current token as the API key
                },
            });

            // Assuming you have a context or state management solution to manage the accessToken
            setAccessToken(''); // Clear the access token from context/global state
            localStorage.removeItem('accessToken'); // Also clear the token from localStorage
            toast.success('Logout successful!');
            await router.push('/'); // Redirect to the homepage or login page
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('An error occurred during logout.');
        }
    };


    return (
        <ConfirmModal
            open={showCancelConfirmation}
            onClose={() => setShowCancelConfirmation(false)}
            onConfirm={handleLogout}
            buttonName="Logout"
            confirmButtonName="Logout"
            title="You are about to logout"
            confirmationText="Please confirm you want to logout"
            color="error"
        />
    );
}
