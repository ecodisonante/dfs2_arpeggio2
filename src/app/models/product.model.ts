/**
 * Modelo para Productos
 */
export class Product {
    /**
     * Identificador unico del producto
     */
    id: number;
    /**
     * Nombre del producto
     */
    name: string;
    /**
     * Marca del producto
     */
    brand: string;
    /**
     * ID de categoría del producto
     */
    category: number;
    /**
     * Precio del producto
     */
    price: number;
    /**
     * Stock del producto
     */
    stock: number;
    /**
     * Indicador si el producto está en oferta
     */
    onSale: boolean;
    /**
     * Precio en oferta del producto
     */
    salePrice: number;
    /**
     * Indicador si el producto está disponible
     */
    available: boolean;
    /**
     * Ruta de imagen del producto
     */
    image: string;

    constructor(id: number, name: string, brand: string, category: number, price: number, stock: number, onSale: boolean, salePrice: number, available: boolean, image: string) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.onSale = onSale;
        this.salePrice = salePrice;
        this.available = available;
        this.image = image;
    }
}