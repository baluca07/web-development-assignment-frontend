"use client";
import {FormEvent, useState} from "react";
import {useToken} from "@/hooks/useToken";
import {ErrorModule} from "@/modules/errorModule";

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {setToken} = useToken();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            setToken(response);
            window.location.href = '../';
        }
        if (response.status == 400) {
            setError("Incorrect username or password");
        }
        else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    };

    return (
        <div className={"authForm"}>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="buttonContainer">
                    <button type="submit">Login</button>
                </div>
                <ErrorModule message={error}/>
            </form>
        </div>
    );
}