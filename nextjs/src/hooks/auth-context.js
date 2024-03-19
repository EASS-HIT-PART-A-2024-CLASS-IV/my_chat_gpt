import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getProfile } from "@/api/endpoints";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Access localStorage after the component mounts
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const { isLoading, isError } = useQuery(
        ['validateToken', accessToken],
        () => getProfile(accessToken),
        {
            enabled: !!accessToken,
            onSuccess: (data) => {
                setUserProfile(data); // Set the user profile upon successful fetch
            },
            onError: () => {
                localStorage.removeItem('accessToken');
                setAccessToken('');
                setUserProfile(null); // Reset user profile on error
            },
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    const isAuthenticated = !!accessToken && !isError && !!userProfile;

    // Now, we also pass userProfile and setUserProfile to the context value
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, isAuthenticated, userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
