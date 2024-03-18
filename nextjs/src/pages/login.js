import React from "react";
import {Grid} from "@mui/material";
import LoginBox from "@/sections/auth/login-box";

export default function Login() {
    return (
        <div>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <LoginBox/>
                </Grid>
            </Grid>
        </div>
    );
}
