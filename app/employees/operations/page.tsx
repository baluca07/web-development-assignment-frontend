"use client";
import {useEffect, useState} from "react";
import {GetDepartmentsRequest} from "@/modules/departmentModules/departmentRequest";
import {Department, Employee} from "@/modules/interfaces";
import {ErrorModule} from "@/modules/errorModule";
import {useLoggedIn} from "@/hooks/useLoggedIn";
import {GetEmployeesRequest} from "@/modules/employeeModules/employeeRequest";
import AddEmployeeForm from "@/modules/employeeModules/addEmployee";
import DeleteEmployeeForm from "@/modules/employeeModules/deleteEmployee";
import UpdateEmployeeForm from "@/modules/employeeModules/updateEmployee";

export default function EmployeeOperations() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const isLoggedIn = useLoggedIn()


    const fetchDepartmentsAndEmployees = async () => {
        setLoading(true);
        setError("");

        try {
            const departments = await GetDepartmentsRequest();
            setDepartments(departments);
            const employees = await GetEmployeesRequest();
            setEmployees(employees);
        } catch (error: any) {
            console.error(error);
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDepartmentsAndEmployees();
    }, []);

    const handleClick = () => {
        window.location.href = "../employees";
    };

    const refreshDepartments = () => {
        fetchDepartmentsAndEmployees();
    };
    return (
        <div>
            <h1>Operations - Employees</h1>
            <ErrorModule message={error}/>
            <div className={`buttonContainer`}>
                <button onClick={handleClick}>See Employees</button>
            </div>
            {loading && (<p className="loading">Loading...</p>)}
            {(!loading && !isLoggedIn) && <ErrorModule message={"You must be logged in perform these operations."}/>}
            {isLoggedIn && <>
                <h1>User operations:</h1>
                <h2>Add new employee</h2>
                <AddEmployeeForm onSuccess={refreshDepartments} departments={departments}/>
                <h1>Admin operations:</h1>
                <h2>Update department</h2>
                <UpdateEmployeeForm employees={employees} departments={departments} onSuccess={refreshDepartments}/>
                <h2>Delete department</h2>
                <DeleteEmployeeForm employees={employees} onSuccess={refreshDepartments}/>
            </>}
        </div>
    )
}