"use client";
import { useEffect, useState } from "react";

export default function SignInButton() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, []);

    const handelSignIn = () => {
        window.location.href = '/sign-in';
    };

    if (!token) {
        return (
            <button onClick={handelSignIn}>Sing In</button>
        );
    }

    return null;
}
