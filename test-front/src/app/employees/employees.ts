export interface Employee {
    id: number;
    Name: string ;
    Office: number ;
}

export interface EmployeeResponse {
    items: Employee[];
    limit: number;
    page: number;
    total: number;
}