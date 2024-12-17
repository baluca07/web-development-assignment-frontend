"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";
import {Employee} from "@/modules/interfaces";



export default function EmployeesList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/employees/all")
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
                        <th className={`idColumn`}>ID</th>
                        <th>Name</th>
                        <th className={`depId`}>DepartmentID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className={`idTable`}>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td className={`depId`}>{employee.departmentId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ErrorModule message={error}/>
        </div>
    );
}
