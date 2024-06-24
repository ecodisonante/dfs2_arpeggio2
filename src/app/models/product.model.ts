export class Product {
    id: number;
    name: string;
    brand: string;
    category: number;
    price: number;
    stock: number;
    onSale: boolean;
    salePrice: number;
    available: boolean;
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