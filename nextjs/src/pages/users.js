import React from "react";
import UserTable from "@/sections/users/users-table";
import useAuthenticatedRoute from "@/hooks/use-authenticated-route";

function Users() {
    return (
        <>
            <UserTable/>
        </>
    );
}

export default useAuthenticatedRoute(Users);
