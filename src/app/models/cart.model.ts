import { Product } from "./product.model";

export class Cart {
    username: string;
    items: Product[];
    total: number;
    discount: number;

    constructor(username: string, items: Product[], total: number, discount: number) {
        this.username = username;
        this.items = items;
        this.total = total;
        this.discount = discount;
    }

}