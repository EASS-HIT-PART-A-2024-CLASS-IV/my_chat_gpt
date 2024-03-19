import React, {useCallback} from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import Menu from "@/sections/header/menu";
import {menuItems} from "@/sections/header/menu-items";
import WrapperEffects from "@/components/warp-effects";
import {Toaster} from "react-hot-toast";
import Footer from "@/sections/footer/footer";
import {AuthProvider} from "@/hooks/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import {darkTheme} from "@/theme/dark-theme";

const queryClient = new QueryClient();
import { loadSlim } from "tsparticles-slim";
import {Particles} from "react-tsparticles"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.


function MyApp({Component, pageProps}) {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    return (
         <QueryClientProvider client={queryClient}> {/* Provide the queryClient instance */}
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                 <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
                <Toaster position="bottom-right" reverseOrder={false}/>
                <AuthProvider> {/* Wrap your component tree with AuthProvider */}
                    <Menu title="Your Website Name" navItems={menuItems}/>
                    <WrapperEffects effect={"softSlideInDown"} pageProps={pageProps}>
                        <Container sx={{mt: 3}}>
                            <Component {...pageProps} />
                        </Container>
                    </WrapperEffects>
                    <Footer/>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
