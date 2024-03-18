import React, {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        setAccessToken(storedToken);
        setIsLoading(false);
    }, []);

    // Determine if the user is authenticated based on the presence of an accessToken
    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, isLoading, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
