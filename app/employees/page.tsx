"use client";
import EmployeesList from "@/modules/employeeModules/employeesList";

export default function Employees() {
    const handleClick = () => {
        window.location.href = "../employees/operations";
    };
    return (
        <div>

            <h1>Employees</h1>
            <div className={`buttonContainer`}>
                <button onClick={handleClick}>Employee Operations</button>
            </div>
            <EmployeesList/>
        </div>
    )
}