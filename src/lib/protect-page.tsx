"use client";

import { useEffect } from "react";
import { getCookie } from 'cookies-next';

const requireAuth = () => {
    //const loggedIn = document.cookie.includes("logged-in=true");
    const loggedIn = getCookie('userLogged');

    if (!loggedIn) {
        window.location.href = "/login";
    }
};

export const AuthPageInvisible = () => {
    useEffect(() => {
        requireAuth();
    }, []);

    return <></>;
};
