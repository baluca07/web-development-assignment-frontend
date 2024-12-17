"use client";
import {useState} from "react";
import {ErrorModule} from "@/modules/errorModule";
import {DepartmentArrayProp, EmployeeArrayProp, OnSuccessCallBackProp} from "@/modules/interfaces";
import {useAdminCheck} from "@/hooks/useAdminCheck";
import {useToken} from "@/hooks/useToken";
import {SuccessModule} from "@/modules/successModule";
import {PutEmployeeRequest} from "@/modules/employeeModules/employeeRequest";

type UpdateEmployeeFormProps = EmployeeArrayProp & DepartmentArrayProp & OnSuccessCallBackProp;

export default function UpdateEmployeeForm({employees, departments, onSuccess}: UpdateEmployeeFormProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [employeeName, setEmployeeName] = useState<string>("");
    const [departmentId, setDepartmentId] = useState<number>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const isAdmin = useAdminCheck();
    const {token} = useToken();

    const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setSelectedId(id);

        const employee = employees.find((emp) => emp.id === id);
        if (employee) {
            setEmployeeName(employee.name);
            setDepartmentId(employee.departmentId);
        } else {
            setEmployeeName("");
            setDepartmentId(null)
        }
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setDepartmentId(id);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (token === null) {
            setError("You must be logged in to perform this action.");
            return;
        }

        if (!selectedId) {
            setError("Please select a employee.");
            return;
        }

        try {
            await PutEmployeeRequest(selectedId, employeeName, departmentId);

            setMessage("Employee updated.");
            setError(null);
            setSelectedId(null);
            setEmployeeName("");
            setDepartmentId(null);

            await new Promise((resolve) => setTimeout(resolve, 3000));

            setMessage("");
            onSuccess();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className={`formContainer`}>
            {isAdmin ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="employeeId">Select Employee ID:</label>
                            <select id="employeeId" onChange={handleEmployeeChange} value={selectedId || ""}>
                                <option value="">Select an Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.id} - {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="employeeName">Employee Name:</label>
                            <input
                                type="text"
                                id="employeeName"
                                value={employeeName}
                                onChange={handleNameChange}
                                disabled={!selectedId}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="departmentId">Select Department:</label>
                            <select id="departmentId" onChange={handleDepartmentChange} value={departmentId || ""}>
                                <option value="">Select a department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.id} - {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`buttonContainer`}>
                            <button type="submit" disabled={!selectedId}>
                                Update Department
                            </button>
                        </div>
                        <ErrorModule message={error}/>
                        <SuccessModule message={message}/>
                    </form>
                </>
            ) : (
                <p>You must be logged in as an admin.</p>
            )}
        </div>
    );
}
