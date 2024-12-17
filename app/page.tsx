"use client";

export default function Home() {
    return (
        <div>
            <h1>Welcome in the frontend app!</h1>
            <p className={`text-center`}>Get data from http://localhost:8080/api</p>
            <p className={`font-bold italic`}>See data:</p>
            <ul>
                <li><button onClick={()=> window.location.href = "../departments"}>Departments</button></li>
                <li><button onClick={()=> window.location.href = "../employees"}>Employees</button></li>
            </ul>
        </div>
    );
}
