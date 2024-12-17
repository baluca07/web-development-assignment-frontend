"use client";


export default function Home() {
    return (
        <div>
            <h1>Welcome in the frontend app!</h1>
            <p className={`text-center`}>Get data from http://localhost:8080/api</p>
            <p className={`text-center`}><b className={`text-red-600`}>IMPORTANT:</b> The app should be launched
                at <a
                    href="http://localhost:3000">http://localhost:3000</a> , not from an IP address (e.g.:
                http://192.168.0.6:3000)!</p>
            <p className={`font-bold italic text-center my-3`}>See data:</p>
            <ul className={`text-center`}>
                <li>
                    <button onClick={() => window.location.href = "../departments"}>Departments</button>
                </li>
                <li>
                    <button onClick={() => window.location.href = "../employees"}>Employees</button>
                </li>
            </ul>
        </div>
    );
}
