"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";

interface Employee {
    id: number;
    name: string;
    departmentId: number;
}

export default function EmployeesList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/departments")
            .then((response) => {
                if (!response.ok) {
                    setError("Failed to fetch employees");
                }
                return response.json();
            })
            .then((data) => {
                setEmployees(data);
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
                <p>Loading employees...</p>
            ) : employees.length === 0 ? (
                <p>No employees.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DepartmentID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.departmentId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ErrorModule message={error}/>
        </div>
    );
}
