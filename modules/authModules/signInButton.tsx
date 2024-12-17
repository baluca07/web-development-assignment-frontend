"use client";
import {useLoggedIn} from "@/hooks/useLoggedIn";

export default function SignUpButton() {
    const isLoggedIn = useLoggedIn()


    const handelClick = () => {
        window.location.href = '../sign-up';
    };

    if (!isLoggedIn) {
        return (
            <button onClick={handelClick}>Sing In</button>
        );
    }

    return null;
}
