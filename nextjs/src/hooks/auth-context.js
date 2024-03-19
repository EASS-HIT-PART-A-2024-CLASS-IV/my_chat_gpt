import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {getProfile} from "@/api/endpoints";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');

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
            onSuccess: () => {},
            onError: () => {
                localStorage.removeItem('accessToken');
                setAccessToken('');
            },
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    const isAuthenticated = !!accessToken && !isError;

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
