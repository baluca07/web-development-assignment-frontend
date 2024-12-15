"use client";
import { useEffect, useState } from "react";

export default function LogoutButton() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!token) {
        return null;
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}
