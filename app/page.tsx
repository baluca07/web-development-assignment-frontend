import Link from "next/link";
import LogoutButton from "@/modules/logoutButton";

export default function Home() {
    return (
        <div>
            <h1>Welcome in the frontend app!</h1>
            <p>Get data from http://localhost:8080/api</p>
            <ul>
                <li><Link href={"./employees"}>Employees</Link></li>
                <li><Link href={"./departments"}>Departments</Link></li>
                <li><Link href={"./add-department"}>Add Departments</Link></li>
                <li><Link href={"./edit-department"}>Edit Department</Link></li>
                <li><Link href={"./delete-department"}>Delete Department</Link></li>
            </ul>
            <LogoutButton/>
        </div>
    );
}
