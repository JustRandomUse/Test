export interface Employee {
    id: number;
    name: string ;
    office: number ;
}

export interface EmployeeResponse {
    items: Employee[];
    limit: number;
    page: number;
    total: number;
}