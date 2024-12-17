import React from "react";

interface SuccessModuleProps {
    message: string | null;
}

export const SuccessModule: React.FC<SuccessModuleProps> = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div>
            <p className={`success`}>{message}</p>
    </div>
);
};