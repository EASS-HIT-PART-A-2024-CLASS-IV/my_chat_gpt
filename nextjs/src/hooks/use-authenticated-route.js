import React from 'react';
import {useRouter} from 'next/router';
import {useAuth} from './auth-context';
import Loading from "@/components/loading";

const useAuthenticatedRoute = (WrappedComponent, redirectUrl = '/') => {
    return function ProtectedRoute(props) {
        const {accessToken: contextAccessToken, isLoading, setAccessToken} = useAuth();
        const [isLocalLoading, setIsLocalLoading] = React.useState(true); // State to handle local loading
        const router = useRouter();

        // Function to check and retrieve the access token from localStorage
        const checkLocalStorageForToken = () => {
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
                setAccessToken(storedToken); // Update context or state with the retrieved token
            }
            setIsLocalLoading(false); // Update local loading state
        };

        React.useEffect(() => {
            // On component mount, check localStorage for an access token
            checkLocalStorageForToken();
        }, []);

        React.useEffect(() => {
            // Whenever the accessToken changes and is not null, store it in localStorage
            if (contextAccessToken) {
                localStorage.setItem('accessToken', contextAccessToken);
            }
        }, [contextAccessToken]);

        React.useEffect(() => {
            // Redirect logic considering the isLoading states and the presence of an access token
            if (!isLocalLoading && !isLoading && !contextAccessToken) {
                // If both loading states are complete and there's no access token, redirect
                router.push(redirectUrl);
            }
        }, [contextAccessToken, isLoading, isLocalLoading, router, redirectUrl]);

        if (isLoading || isLocalLoading) {
            return <Loading/>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default useAuthenticatedRoute;
