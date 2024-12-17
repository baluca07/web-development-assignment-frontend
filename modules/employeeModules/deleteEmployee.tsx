"use client";
import {useState} from "react";
import {ErrorModule} from "@/modules/errorModule";
import {
    Employee,
    EmployeeArrayProp,
    OnSuccessCallBackProp
} from "@/modules/interfaces";
import { useAdminCheck } from '@/hooks/useAdminCheck';
import {useToken} from "@/hooks/useToken";
import {SuccessModule} from "@/modules/successModule";
import {DeleteEmployeeRequest} from "@/modules/employeeModules/employeeRequest";

type DeleteEmployeeFormProps = EmployeeArrayProp & OnSuccessCallBackProp;

export default function DeleteEmployeeForm({ employees, onSuccess }: DeleteEmployeeFormProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const isAdmin = useAdminCheck();

    const {token} = useToken()

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        const employee = employees.find((emp) => emp.id === id) || null;
        setSelectedEmployee(employee);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedEmployee) {
            setError("Please select an employee.");
            return;
        }
        if (token === null) {
            setError("You must be logged in to perform this action.");
            return;
        }

        try {
            await DeleteEmployeeRequest(selectedEmployee.id);

            setMessage("Employee deleted successfully.");
            setError(null);
            setSelectedEmployee(null);
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
            {isAdmin ? <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="employeeId">Select Employee to Delete:</label>
                        <select id="employeeId" onChange={handleDepartmentChange}>
                            <option value="">Select an employee</option>
                            {employees.map((employees) => (
                                <option key={employees.id} value={employees.id}>
                                    {employees.id} - {employees.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`buttonContainer`}>
                        <button type="submit" disabled={!selectedEmployee}>
                            Delete Employee
                        </button>
                    </div>
                    <ErrorModule message={error}/>
                    <SuccessModule message={message}/>
                </form>
            </> : <p>You must be logged in as an admin.</p>}
        </div>
    );
}
