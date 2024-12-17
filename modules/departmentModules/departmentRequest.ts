import {Department} from "@/modules/interfaces";
import {useToken} from "@/hooks/useToken";

export async function GetDepartmentsRequest():Promise<Department[]> {
    const response = await fetch("http://localhost:8080/api/departments/all", {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error("Failed to get departments: " + response.status);
    }
    return response.json();
}

export async function DeleteDepartmentRequest(selectedDepartmentId:number):Promise<void> {
    const {getToken} = useToken()
    const token = await getToken()
    const response = await fetch(`http://localhost:8080/api/departments/delete?id=${selectedDepartmentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("Failed to delete department: Invalid token, please log in again.");
        }
        throw new Error("Failed to delete department: " + response.status);
    }
}

export async function PostDepartmentRequest(departmentName:String):Promise<void> {
    const {getToken} = useToken()
    const token = await getToken()
    const department = {
        name: departmentName
    };
    const response = await fetch("http://localhost:8080/api/departments/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(department)
    })
    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("Failed to add: Invalid token, please log in again.");
        }
        throw new Error("Failed to add department: " + response.status);
    }
}

export async function PutDepartmentRequest(selectedId:number,departmentName:String):Promise<void> {
    const {getToken} = useToken()
    const token = await getToken()
    const updatedDepartment = {
        id: selectedId,
        name: departmentName
    };
    const response = await fetch(`http://localhost:8080/api/departments/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedDepartment)
    });

    if (!response.ok) {
        if(response.status === 403) {
            throw new Error("Failed to update department: Invalid token, please log in again.");
        }
        throw new Error("Failed to update department: " + response.status);
    }
}