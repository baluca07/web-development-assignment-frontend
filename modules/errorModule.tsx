import React from "react";

interface ErrorModuleProps {
    message: string | null;
}

export const ErrorModule: React.FC<ErrorModuleProps> = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div>
            <p className={`error`}>{message}</p>
        </div>
    );
};