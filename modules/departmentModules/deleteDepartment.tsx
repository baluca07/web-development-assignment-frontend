"use client";
import {useState} from "react";
import {ErrorModule} from "@/modules/errorModule";
import {Department, DepartmentArrayProp, OnSuccessCallBackProp} from "@/modules/interfaces";
import {DeleteDepartmentRequest} from "@/modules/departmentModules/departmentRequest";
import { useAdminCheck } from '@/hooks/useAdminCheck';

type DeleteDepartmentFormProps = DepartmentArrayProp & OnSuccessCallBackProp;

export default function DeleteDepartmentForm({ departments, onSuccess }: DeleteDepartmentFormProps) {
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const isAdmin = useAdminCheck();


    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        const department = departments.find((dept) => dept.id === id) || null;
        setSelectedDepartment(department);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedDepartment) {
            setError("Please select a department");
            return;
        }

        try {
            await DeleteDepartmentRequest(selectedDepartment.id);

            setMessage("Department deleted successfully");
            setError(null);
            setSelectedDepartment(null);
            onSuccess();
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
            {isAdmin ? <>
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
            </> : <p>You must be logged in as an admin.</p>}
        </div>
    );
}
