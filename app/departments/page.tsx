"use client";
import DepartmentsList from "@/modules/departmentModules/departmentsList";

export default function Departments() {
    const handleClick = () => {
        window.location.href = "../departments/operations";
    };

    return (
        <div>
            <h1>Departments</h1>
            <div className={`buttonContainer`}>
                <button onClick={handleClick}>Department Operations</button>
            </div>
            <DepartmentsList />
        </div>
    );
}
