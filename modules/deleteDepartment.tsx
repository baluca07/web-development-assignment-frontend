"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";

interface Department {
    id: number;
    name: string;
}

export default function DeleteDepartmentForm() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/departments/all",{
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((err) => setError("Failed to load departments: " + err));
    }, []);

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        const department = departments.find((dept) => dept.id === id) || null;
        setSelectedDepartment(department);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (token === null) {
            setError("You must be logged in to perform this action");
            return;
        }

        if (!selectedDepartment) {
            setError("Please select a department");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/departments/delete?id=${selectedDepartment.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                setError("Failed to delete department");
                return;
            }

            setMessage("Department deleted successfully");
            setError(null);
            setSelectedDepartment(null); // Reset selected department after successful delete
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
                    <label htmlFor="departmentId">Select Department to Delete:</label>
                    <select id="departmentId" onChange={handleDepartmentChange}>
                        <option value="">Select a department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.id} - {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" disabled={!selectedDepartment}>
                    Delete Department
                </button>
            </form>
            <ErrorModule message={error}/>
            <p>{message}</p>
        </div>
    );
}
