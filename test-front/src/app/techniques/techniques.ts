export interface Techniques {
    id: number;
    name: string ;
    type_id: number ;
}

export interface TechniquesResponse {
    items: Techniques[];
    limit: number;
    page: number;
    total: number;
}