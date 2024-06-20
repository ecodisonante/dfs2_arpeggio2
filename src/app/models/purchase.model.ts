import { Cart } from "./cart.model";

export class PurchaseHistory {
    username: string;
    carts: Cart[];

    constructor(username: string, carts: Cart[]) {
        this.username = username;
        this.carts = carts;
    }
}