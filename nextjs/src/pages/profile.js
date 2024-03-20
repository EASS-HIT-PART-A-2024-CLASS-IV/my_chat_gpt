import React from "react";
import UserProfile from "@/sections/profile/user-profile";
import useAuthenticatedRoute from "@/hooks/use-authenticated-route";

function Profile() {
    return (
        <>
            <UserProfile/>
        </>
    );
}


export default useAuthenticatedRoute(Profile);

