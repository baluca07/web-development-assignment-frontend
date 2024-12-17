"use client";
import {useEffect, useState} from "react";
import { Department } from "@/modules/interfaces";
import { ErrorModule } from "@/modules/errorModule";
import {SuccessModule} from "@/modules/successModule";

export default function DepartmentDetail({ departmentId }: {departmentId: string}) {
    const [department, setDepartment] = useState<Department | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`http://localhost:8080/api/departments/get?id=${departmentId}`);
                if (!response.ok) {
                    setError("Failed to fetch department.");
                }
                const data = await response.json();
                setDepartment(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [departmentId]);

    if (loading) {
        return <><h1>Department Details:</h1><p className={`loading`}>Loading department...</p></>;
    }

    return (
        <div>
            {error ? (
                <ErrorModule message={error} />
            ) : (
                <div>
                    {department ? (
                        <div>
                            <h1>Department Details: {department.name}(#{department.id})</h1>
                            <div className={`buttonContainer`}>
                                <button onClick={() => window.location.href = "../departments"}>Departments</button>
                            </div>
                            {(department.employees && department.employees.length > 0) ? (
                                <div>
                                    <h2>Employees at {department.name}</h2>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className={`idColumn`}>ID</th>
                                            <th>Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {department.employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className={`id`}>{employee.id}</td>
                                                <td>{employee.name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : <div>
                                <h2>Employees at {department.name}</h2>
                                <p className={`text-center`}>There are no employees working at this department.</p>
                            </div>}
                        </div>
                    ) : (
                        <SuccessModule message={"Department not found"}/>
                    )}
                </div>
            )}
        </div>
    );
}
