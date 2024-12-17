"use client";
import { useEffect, useState } from "react";
import {ErrorModule} from "@/modules/errorModule";
import {GetDepartmentsRequest} from "@/modules/departmentModules/departmentRequest";
import {Department} from "@/modules/interfaces";


export default function DepartmentsList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await GetDepartmentsRequest();
                setDepartments(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDepartments();
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
                        <th className={`idColumn`}>ID</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td className={`id`} >{department.id}</td>
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
