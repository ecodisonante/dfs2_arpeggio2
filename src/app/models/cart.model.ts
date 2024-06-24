import { Product } from "./product.model";

/**
 * Modelo para Carrito de Compras
 */
export class Cart {
    /** Nombre de usuario al que pertenece el carrito */
    username: string;
    /** Lista de productos en el carrito */
    items: Product[];
    /** Costo total de los productos en el carrito */
    total: number;
    /** Total de descuentos aplicados en los productos del carrito */
    discount: number;

    /** constructor */
    constructor(username: string, items: Product[], total: number, discount: number) {
        this.username = username;
        this.items = items;
        this.total = total;
        this.discount = discount;
    }

}