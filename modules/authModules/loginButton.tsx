"use client";
import { useEffect } from "react";
import {useLoggedIn} from "@/hooks/useLoggedIn";

export default function LoginButton() {
    const isLoggedIn = useLoggedIn()

    const handelClick = () => {
        window.location.href = '../login';
    };

    if (!isLoggedIn) {
        return (
            <button onClick={handelClick}>Login</button>
        );
    }

    return null;
}
