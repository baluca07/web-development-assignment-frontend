export interface OnSuccessCallBackProp {
    onSuccess: () => void;
}

export interface Department {
    id: number;
    name: string;
    employees: Employee[];
}

export interface DepartmentArrayProp {
    departments: Department[];
}

export interface Employee {
    id: number;
    name: string;
    departmentId: number;
}

export interface EmployeeArrayProp {
    employees: Employee[];
}
