export interface EmployeeEquipment {
    id: number;
    employees_id: number;
    technique_id: number ;
}

export interface EmployeeEquipmentResponse {
    items: EmployeeEquipment[];
    limit: number;
    page: number;
    total: number;
}