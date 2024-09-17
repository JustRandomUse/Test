export interface TechniqueTypes {
    id: number;
    name: string ;
}

export interface TechniqueTypesResponse {
    items: TechniqueTypes[];
    limit: number;
    page: number;
    total: number;
}