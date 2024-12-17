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
            await setToken(response).then(() =>
                window.location.href = '../'
            )
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
        }
    };

    return (
        <div>
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
                <button type="submit">Login</button>
            </form>
            <ErrorModule message={error}/>
        </div>
    );
}