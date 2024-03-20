/* eslint-disable no-unused-vars */
// noinspection JSUnusedLocalSymbols
import React, {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {getProfile, logout as apiLogout} from "@/api/endpoints";

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

        checkForExistingSession().then(() => {
            // Empty function to silence any warnings about unhandled promise rejections
            // No operation is performed here
        }).catch(error => {
            // Handle any errors thrown by the async function
            console.error("Error in session check:", error);
        });
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
            const inTwoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
            Cookies.set('accessToken', token, {expires: inTwoHours, secure: true, sameSite: 'strict'}); // Cookie expires in 2 hours
            setAccessToken(token);
        },
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
