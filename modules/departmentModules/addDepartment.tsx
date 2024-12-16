"use client";
import { useState } from "react";
import {ErrorModule} from "@/modules/errorModule";
import {OnSuccessCallBackProp} from "@/modules/interfaces";
import {PostDepartmentRequest} from "@/modules/departmentModules/departmentRequest";

export default function AddDepartmentForm({onSuccess}:OnSuccessCallBackProp) {
    const [departmentName, setDepartmentName] = useState("");
    const [error,setError] = useState<string>("");
    const [message,setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (token === null) {
            setError("You must be logged in to perform this action");
            return;
        }
        try {
            await PostDepartmentRequest(departmentName)
            setMessage("Department added");
            setDepartmentName("");
            onSuccess();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="departmentName">Department Name:</label>
                <input
                    type="text"
                    id="departmentName"
                    name="departmentName"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                />
                <button type="submit">Add Department</button>
            </form>
            <ErrorModule message={error}/>
            <p>{message}</p>
        </div>
    );
}
