"use client";
import { useState } from "react";
import {ErrorModule} from "@/modules/errorModule";
import {DepartmentArrayProp, OnSuccessCallBackProp} from "@/modules/interfaces";
import {useToken} from "@/hooks/useToken";
import {SuccessModule} from "@/modules/successModule";
import {PostEmployeeRequest} from "@/modules/employeeModules/employeeRequest";

type AddEmployeeFormProps = DepartmentArrayProp & OnSuccessCallBackProp;

export default function AddEmployeeForm({ departments, onSuccess }: AddEmployeeFormProps) {
    const [employeeName, setEmployeeName] = useState<string>("");
    const [departmentId, setDepartmentId] = useState<number | null>(null);
    const [error,setError] = useState<string>("");
    const [message,setMessage] = useState<string>("");
    const {token} = useToken();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (token === null) {
            setError("You must be logged in to perform this action.");
            return;
        }
        try {
            await PostEmployeeRequest(employeeName, departmentId);
            setMessage("Employee added");
            setEmployeeName("");
            setDepartmentId(null);
            setTimeout(() => {
                setMessage("");
            }, 3000);
            onSuccess();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setDepartmentId(id);
    };

    return (
        <div className={`formContainer`}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="employeeName">Employee Name:</label>
                <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                />
                <label htmlFor="departmentId">Select Department:</label>
                <select id="departmentId" onChange={handleDepartmentChange} value={departmentId || ""}>
                    <option value="">Select a department</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.id} - {department.name}
                        </option>
                    ))}
                </select>
                <div className={`buttonContainer`}>
                    <button type="submit" disabled={!departmentId}>Add Department</button>
                </div>
                <ErrorModule message={error}/>
                <SuccessModule message={message}/>
            </form>
        </div>
    );
}
