import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private catalogKey = 'catalogKey';

    constructor() { }

    setCatalog(catalog: Product[]): void {
        localStorage.setItem(this.catalogKey, JSON.stringify(catalog));
    }

    getCatalog(): Product[] | null {
        let catalog = localStorage.getItem(this.catalogKey);
        return catalog ? JSON.parse(catalog) : null;
    }

    removeCatalog(): void {
        localStorage.removeItem(this.catalogKey);
    }

    filterProducts(sale?: boolean, category?: number): Product[] {
        let catalogo = this.getCatalog();
        if (catalogo == null) return [];

        if (sale != undefined)
            catalogo = catalogo!.filter(x => x.onSale);

        if (category)
            catalogo = catalogo!.filter(x => x.category.id == category);

        return catalogo!;
    }

}
