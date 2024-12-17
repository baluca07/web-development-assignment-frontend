'use client';

import { useState, useEffect } from 'react';

const TOKEN_KEY = 'jwt-token';

export const useToken = () => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(TOKEN_KEY);
            setTokenState(storedToken);
        }
    }, []);

    const setToken = (response: Response) => {
        response.text().then((tokenText) => {
            localStorage.setItem(TOKEN_KEY, tokenText);
            setTokenState(tokenText);
        }).catch(error => {
            console.error('Failed to set token:', error);
        });
    };

    const getToken = (): string | null => {
        return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    };

    const removeToken = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
            setTokenState(null);
        }
    };

    return { token, setToken, getToken, removeToken };
};
