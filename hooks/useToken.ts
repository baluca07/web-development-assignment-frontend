'use client';

import { useState } from 'react';

const TOKEN_KEY = 'jwt-token';

export const useToken = () => {
    const [token, setTokenState] = useState<string | null>(
        localStorage.getItem(TOKEN_KEY)
    );

    const setToken = (response: Response) => {
        response.text().then((tokenText) => {
            localStorage.setItem(TOKEN_KEY, tokenText);
            setTokenState(tokenText);
        }).catch(error => {
            console.error('Failed to set token:', error);
        });
    };

    const getToken = (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    };

    const removeToken = () => {
        localStorage.removeItem(TOKEN_KEY);
        setTokenState(null);
    };

    return { token, setToken, getToken, removeToken };
};
