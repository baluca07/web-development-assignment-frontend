"use client";

import { useState, FormEvent } from 'react';
import {ErrorModule} from "@/modules/errorModule";

export default function SignUpForm(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            window.location.href = '../login';
        }
        if (response.status == 400) {
            setError("User already exists with this email.");
        }
        else {
            try {
                const data = await response.json();
                setError(data);
            } catch (err) {
                setError('An error occurred while processing the request: ' + err);
            }
        }
    };

    return (
        <div className={"authForm"}>
            <form onSubmit={handleSignUp}>
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
                    <button type="submit">Sign up</button>
                </div>
                <ErrorModule message={error}/>
            </form>
        </div>
    );
};
