import { Product } from "./product.model";

export class Cart {
    username: string;
    items: Product[];
    total: number;
    discount: number;
    fecha: Date;

    constructor(username: string, items: Product[], total: number, discount: number, fecha: Date,) {
        this.username = username;
        this.items = items;
        this.total = total;
        this.discount = discount;
        this.fecha = fecha;
    }

}