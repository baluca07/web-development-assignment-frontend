"use client";
import { useEffect, useState } from "react";

export default function LoginButton() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, []);

    const handelLogin = () => {
        window.location.href = '/login';
    };

    if (!token) {
        return (
            <button onClick={handelLogin}>Login</button>
        );
    }

    return null;
}
