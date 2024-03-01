export interface BasicCostumer{
    id: number;
}

export interface Costumer extends BasicCostumer{
    name: string;
    email?: string;
    password?: string;
}