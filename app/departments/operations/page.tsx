"use client";
import Link from "next/link";
import AddDepartmentForm from "@/modules/departmentModules/addDepartment";
import UpdateDepartmentForm from "@/modules/departmentModules/updateDepartment";
import DeleteDepartmentForm from "@/modules/departmentModules/deleteDepartment";
import {useEffect, useState} from "react";
import {GetDepartmentsRequest, GetToken} from "@/modules/departmentModules/departmentRequest";
import {Department} from "@/modules/interfaces";
import {ErrorModule} from "@/modules/errorModule";

export default function DepartmentsOperations(){
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>("");

    const fetchDepartments = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await GetDepartmentsRequest();
            setDepartments(data);
        } catch (error: any) {
            console.error(error);
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        GetToken();
        fetchDepartments();
    }, []);

    const refreshDepartments = () => {
        fetchDepartments();
    };

    return(
        <div>
            <h1>Operations - Departments</h1>
            <ErrorModule message={error}/>
            <Link href={"../departments"}>See departments here...</Link>
            <h2>Add new department</h2>
            <AddDepartmentForm onSuccess={refreshDepartments} />
            <h2>Update department</h2>
            {!loading ? <UpdateDepartmentForm departments={departments} onSuccess={refreshDepartments}/> : <p>Loading...</p>}
            <h2>Delete department</h2>
            {!loading ? <DeleteDepartmentForm departments={departments} onSuccess={refreshDepartments}/> : <p>Loading...</p>}
        </div>
    )
}