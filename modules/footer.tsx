'use client';

import { useState, useEffect } from "react";
import HomeButton from "@/modules/homeButton";


export default function Footer() {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isHomePage = window.location.pathname === "/";
            setShowFooter(!isHomePage);
        }
    }, []);

    if (!showFooter) return null;

    return (
        <footer>
            <HomeButton/>
        </footer>
    );
}
