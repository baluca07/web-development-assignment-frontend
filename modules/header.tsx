"use client";
import LoginButton from "@/modules/authModules/loginButton";
import SignInButton from "@/modules/authModules/signUpButton";
import LogoutButton from "@/modules/authModules/logoutButton";
import {useLoggedIn} from "@/hooks/useLoggedIn";
import {useAdminCheck} from "@/hooks/useAdminCheck";

export default function Header(){
    const isLoggedIn = useLoggedIn()
    const isAdmin = useAdminCheck()

    return (
        <div className="header">
            {isLoggedIn &&
            <p>Current role: {isAdmin ? "Admin" : "User"}</p>
            }
            <LoginButton/>
            <SignInButton/>
            <LogoutButton/>
        </div>
    )
}