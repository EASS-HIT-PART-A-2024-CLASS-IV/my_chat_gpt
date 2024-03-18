import React from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Menu from "@/sections/header/menu";
import {menuItems} from "@/sections/header/menu-items";
import WrapperEffects from "@/components/warp-effects";
import {Toaster} from "react-hot-toast";
import Footer from "@/sections/footer/footer";
import {AuthProvider} from "@/hooks/auth-context";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Toaster position="bottom-right" reverseOrder={false}/>
            <AuthProvider> {/* Wrap your component tree with AuthProvider */}
                <Menu title="Your Website Name" navItems={menuItems}/>
                <WrapperEffects effect={"fadeIn"} pageProps={pageProps}>
                    <Container sx={{mt: 3}}>
                        <Component {...pageProps} />
                    </Container>
                </WrapperEffects>
                <Footer/>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;
