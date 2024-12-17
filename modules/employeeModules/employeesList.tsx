"use client";
import { useEffect, useState } from "react";
import { ErrorModule } from "@/modules/errorModule";
import { Department, Employee } from "@/modules/interfaces";
import { GetEmployeesRequest } from "@/modules/employeeModules/employeeRequest";
import { GetDepartmentsRequest } from "@/modules/departmentModules/departmentRequest";

export default function EmployeesList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchEmployeesAndDepartments = async () => {
            try {
                const employees = await GetEmployeesRequest();
                setEmployees(employees);
                const departments = await GetDepartmentsRequest();
                setDepartments(departments);
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
        fetchEmployeesAndDepartments();
    }, []);

    return (
        <div>
            {loading ? (
                <p className={'loading'}>Loading employees...</p>
            ) : employees.length === 0 ? (
                <ErrorModule message={"No employees."} />
            ) : (
                <div>
                    <p className={`text-center`}>Click on the Department ID for department details.</p>
                    <table>
                        <thead>
                        <tr>
                            <th className={`idColumn`}>ID</th>
                            <th>Name</th>
                            <th className={`depId`}>Department ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className={`id`}>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td
                                    className={`depId`}
                                    onClick={() => window.location.href = `../departments/${employee.departmentId.toString()}`}
                                >
                                    {employee.departmentId} - {departments.find((department) => department.id === employee.departmentId)?.name}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ErrorModule message={error} />
        </div>
    );
}
