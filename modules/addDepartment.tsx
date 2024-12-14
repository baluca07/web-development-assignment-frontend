"use client";
import { useState } from "react";
import {ErrorModule} from "@/modules/errorModule";

export default function AddDepartmentForm() {
    const [departmentName, setDepartmentName] = useState("");
    const [error,setError] = useState<string>("");
    const [message,setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const department = {
            name: departmentName
        };

        try {
            const response = await fetch("http://localhost:8080/api/departments/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(department)
            });

            if (!response.ok) {
                setError("Failed to add department");
            }

            const data = await response.json();
            console.log("Department added:", data);
            setMessage("Department added");
            setDepartmentName("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add Department</h1>
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
