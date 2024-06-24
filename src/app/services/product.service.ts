import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private catalogKey = 'catalogKey';

    getProduct(id: number): Product | null {
        let prod = this.getCatalog()?.find(x => x.id === id);
        return prod ?? null;
    }

    updateProduct(prod: Product) {
        let catalog = this.getCatalog();
        if (catalog) {
            let index = catalog.findIndex(x => x.id === prod.id);
            catalog[index] = prod;
            this.setCatalog(catalog);
        }
    }

    // --- Repositorio --- //

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

    /**
     * @description
     * Obtiene un listado de productos según los filtros especificados
     * 
     * @param sale [boolean] Indicador de ofertas. 
     * - Si es _true_ mostrará solo ofertas. 
     * - Si es _false_ mostrará solo productos que no estén en oferta
     * - Si no se envía el parámetro, no se aplica filtro de ofertas.
     * 
     * @param category [number] Indicador de categoría
     * - Si es numero se mostrarán solo los productos de la categoría con el id indicado
     * - Si no se envía el parámetro, no se aplica filtro de categoría.
     * 
     * @returns Product[]
     */
    filterProducts(sale?: boolean, category?: number): Product[] {
        let catalogo = this.getCatalog();
        if (catalogo == null) return [];

        if (sale != undefined)
            catalogo = catalogo!.filter(x => x.onSale);

        if (category)
            catalogo = catalogo!.filter(x => x.category == category);

        return catalogo!;
    }

}
