export interface OnSuccessCallBackProp {
    onSuccess: () => void;
}

export interface Department {
    id: number;
    name: string;
}

export interface DepartmentArrayProp {
    departments: Department[];
}

export interface Employee {
    id: number;
    name: string;
    departmentId: number;
}
