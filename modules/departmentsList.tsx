"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";

interface Department {
    id: number;
    name: string;
}

export default function DepartmentsList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/departments/all",{
            method: "GET"
        })
            .then((response) => {
                if (!response.ok) {
                    setError("Failed to fetch departments");
                }
                return response.json();
            })
            .then((data) => {
                setDepartments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading departments...</p>
            ) : departments.length === 0 ? (
                <p>No departments.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ErrorModule message={error}/>
        </div>
    );
}
