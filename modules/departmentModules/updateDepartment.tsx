"use client";
import {useState} from "react";
import {ErrorModule} from "@/modules/errorModule";
import {DepartmentArrayProp, OnSuccessCallBackProp} from "@/modules/interfaces";
import {PutDepartmentRequest} from "@/modules/departmentModules/departmentRequest";
import {useAdminCheck} from "@/hooks/useAdminCheck";
import {useToken} from "@/hooks/useToken";
import {SuccessModule} from "@/modules/successModule";

type UpdateDepartmentFormProps = DepartmentArrayProp & OnSuccessCallBackProp;

export default function UpdateDepartmentForm({ departments, onSuccess }: UpdateDepartmentFormProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [departmentName, setDepartmentName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const isAdmin = useAdminCheck();
    const {token} = useToken();

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        setSelectedId(id);

        const department = departments.find((dept) => dept.id === id);
        if (department) {
            setDepartmentName(department.name);
        } else {
            setDepartmentName("");
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepartmentName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (token === null) {
            setError("You must be logged in to perform this action.");
            return;
        }

        if (!selectedId) {
            setError("Please select a department.");
            return;
        }

        try {
            await PutDepartmentRequest(selectedId, departmentName);

            setMessage("Department updated.");
            setError(null);
            setSelectedId(null);
            setDepartmentName("");

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
                            <label htmlFor="departmentId">Select Department ID:</label>
                            <select id="departmentId" onChange={handleDepartmentChange} value={selectedId || ""}>
                                <option value="">Select a department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.id} - {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="departmentName">Department Name:</label>
                            <input
                                type="text"
                                id="departmentName"
                                value={departmentName}
                                onChange={handleNameChange}
                                disabled={!selectedId}
                                required
                            />
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
