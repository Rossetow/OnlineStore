import { Costumer, BasicCostumer } from "./costumer";
import { Product, BasicProduct } from "./product";

//product and costumer = foreign keys

export interface BasicOrder {
    product: BasicProduct;
    costumer: BasicCostumer;
    quantity: number;
}

export interface Order extends BasicOrder{
    orderId:number;   
}

export interface OrderWithDetails extends Order {
    product: Product;
    costumer: Costumer;
}