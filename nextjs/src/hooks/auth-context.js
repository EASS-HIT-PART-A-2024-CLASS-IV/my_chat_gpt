import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getProfile, logout as apiLogout } from "@/api/endpoints";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkForExistingSession = async () => {
            if (typeof window !== "undefined") {
                const storedToken = Cookies.get('accessToken');
                if (storedToken) {
                    try {
                        await getProfile(storedToken);
                        setIsAuthenticated(true);
                        setAccessToken(storedToken);
                    } catch (error) {
                        setIsAuthenticated(false);
                        Cookies.remove('accessToken');
                    }
                }
            }
            setIsLoading(false);
        };

        checkForExistingSession();
    }, []);

    const logout = async () => {
        if (accessToken) {
            try {
                await apiLogout(accessToken);
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
        setIsAuthenticated(false);
        setAccessToken(null);
        if (typeof window !== 'undefined') {
            Cookies.remove('accessToken');
        }
        setIsLoading(false);
    };

    const value = {
        accessToken,
        setAccessToken: (token) => {
            Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'strict' }); // Adjust options as needed
            setAccessToken(token);
        },
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
