"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";

interface Department {
    id: number;
    name: string;
}

export default function EditDepartmentForm() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [departmentName, setDepartmentName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/departments/all")
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((err) => setError("Failed to load departments: " + err));
    }, []);

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setSelectedId(id);

        const department = departments.find((dept) => dept.id === id);
        if (department) {
            setDepartmentName(department.name);
        } else {
            setDepartmentName("");
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepartmentName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (token === null) {
            setError("You must be logged in to perform this action");
            return;
        }

        if (!selectedId) {
            setError("Please select a department");
            return;
        }

        const updatedDepartment = {
            id: selectedId,
            name: departmentName
        };

        try {
            const response = await fetch(`http://localhost:8080/api/departments/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedDepartment)
            });

            if (!response.ok) {
                setError("Failed to update department");
                return
            }

            const data = await response.json();
            console.log("Department updated:", data);
            setMessage("Department updated");
            setError(null);
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
                <div>
                    <label htmlFor="departmentId">Select Department ID:</label>
                    <select id="departmentId" onChange={handleDepartmentChange}>
                        <option value="">Select a department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="departmentName">Department Name:</label>
                    <input
                        type="text"
                        id="departmentName"
                        value={departmentName}
                        onChange={handleNameChange}
                        disabled={!selectedId}
                        required
                    />
                </div>

                <button type="submit" disabled={!selectedId}>
                    Update Department
                </button>
            </form>
            <ErrorModule message={error}/>
            <p>{message}</p>
        </div>
    );
}