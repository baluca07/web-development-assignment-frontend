"use client";
import {useLoggedIn} from "@/hooks/useLoggedIn";

export default function SignUpButton() {
    const isLoggedIn = useLoggedIn()


    const handelClick = () => {
        window.location.href = '../sign-up';
    };

    if (!isLoggedIn) {
        return (
            <button onClick={handelClick}>Sing Up</button>
        );
    }

    return null;
}
