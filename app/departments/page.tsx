import DepartmentsList from "@/modules/departmentModules/departmentsList";
import Link from "next/link";

export default function Departments() {
    return(
        <div>
            <h1>Departments</h1>
            <Link href={"./departments/operations"}>Department operations</Link>
            <DepartmentsList/>
        </div>
    )
}