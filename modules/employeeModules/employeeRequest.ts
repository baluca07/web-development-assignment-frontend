import { Employee} from "@/modules/interfaces";

export async function GetEmployeesRequest(): Promise<Employee[]> {
    const response = await fetch("http://localhost:8080/api/employees/all", {
        method: "GET"
    });
    if (!response.ok) {
        throw new Error("Failed to get employees: " + response.status);
    }
    return response.json();
}

export async function DeleteEmployeeRequest(selectedEmployeeId: number): Promise<void> {
    const token = localStorage.getItem('jwt-token');
    const response = await fetch(`http://localhost:8080/api/employees/delete?id=${selectedEmployeeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("Failed to delete employee: Invalid token, please log in again.");
        }
        throw new Error("Failed to delete employee: " + response.status);
    }
}

export async function PostEmployeeRequest(employeeName: string, departmentId: number | null): Promise<void> {
    const employee = {
        name: employeeName,
        departmentId: departmentId,
    };
    const token = localStorage.getItem('jwt-token');
    const response = await fetch("http://localhost:8080/api/employees/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(employee)
    })
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("Failed to add employee: Invalid token, please log in again.");
        }
        throw new Error("Failed to add employee: " + response.status);
    }
}

export async function PutEmployeeRequest(selectedId: number, employeeName: string, departmentId: number): Promise<void> {
    const updatedEmployee = {
        id: selectedId,
        name: employeeName,
        departmentId: departmentId
    };
    const token = localStorage.getItem('jwt-token');
    const response = await fetch(`http://localhost:8080/api/employees/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedEmployee)
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("Failed to update employee: Invalid token, please log in again.");
        }
        throw new Error("Failed to update employee: " + response.status);
    }
}
