"use client";
import {useState} from "react";
import {ErrorModule} from "@/modules/errorModule";
import {OnSuccessCallBackProp} from "@/modules/interfaces";
import {PostDepartmentRequest} from "@/modules/departmentModules/departmentRequest";
import {useToken} from "@/hooks/useToken";
import {SuccessModule} from "@/modules/successModule";

export default function AddDepartmentForm({onSuccess}: OnSuccessCallBackProp) {
    const [departmentName, setDepartmentName] = useState("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const {token} = useToken();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (token === null) {
            setError("You must be logged in to perform this action.");
            return;
        }
        try {
            await PostDepartmentRequest(departmentName)

            setMessage("Department added.");
            setDepartmentName("");
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

    return (
        <div className={`formContainer`}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="departmentName">Department Name:</label>
                <input
                    type="text"
                    id="departmentName"
                    name="departmentName"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                />
                <div className={`buttonContainer`}>
                    <button type="submit">Add Department</button>
                </div>
                <ErrorModule message={error}/>
                <SuccessModule message={message}/>
            </form>
        </div>
    );
}
