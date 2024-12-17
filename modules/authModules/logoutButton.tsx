"use client";
import {useLoggedIn} from "@/hooks/useLoggedIn";
import {useToken} from "@/hooks/useToken";

export default function LogoutButton() {
    const isLoggedIn = useLoggedIn()
    const {removeToken} = useToken()

    const handleLogout = () => {
        removeToken()
        window.location.href = '../login';
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}
