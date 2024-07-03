import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * @description
 * Clase de servicios relacionados a Producto
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = 'https://firebasestorage.googleapis.com/v0/b/dfs2-1f652.appspot.com/o/arpeggio%2Fproduct.json?alt=media&token=3aaf6e9c-996e-4022-a780-29ccfe9ab44c';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3aaf6e9c-996e-4022-a780-29ccfe9ab44c'
    })
  }

  constructor(
    private http: HttpClient
  ) { }


  /**
   * @description
   * Obtiene el cataolgo completo de productos
   */
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  /**
   * @description
   * Obtiene un producto a través de su ID
   * 
   * @param id ID del producto solicitado
   */
  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.url).pipe(
      map((prods: Product[]) => {
        return prods.find(p => p.id === id);
      })
    );
  }


  // /**
  //  * @description
  //  * Actualiza un producto en el catalogo de productos
  //  * 
  //  * @param prod Producto a actualizar
  //  */
  // TODO
  // updateProduct(prod: Product) {
  //   let catalog = this.getCatalog();
  //   if (catalog) {
  //     let index = catalog.findIndex(x => x.id === prod.id);
  //     catalog[index] = prod;
  //     this.setCatalog(catalog);
  //   }
  // }

  // --- Repositorio --- //


  // /**
  //  * @description
  //  * Almacena el cataolgo completo de productos en el _localStorage_
  //  * 
  //  * @param catalog Listado de productos a almacenar
  //  */
  //TODO
  // setCatalog(catalog: Product[]): void {
  //   localStorage.setItem(this.catalogKey, JSON.stringify(catalog));
  // }


  // /**
  //  * @description
  //  * Elimina el cataolgo completo de productos de _localStorage_
  //  */
  //TODO
  // removeCatalog(): void {
  //   localStorage.removeItem(this.catalogKey);
  // }

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
  filterProducts(sale?: boolean, category?: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map((prods: Product[]) => {

        // Soluciona problema de parametros string ¿?
        if (typeof sale === "string") sale = sale === "true";
        if (typeof category === "string") category = parseInt(category);

        if (category !== undefined) prods = prods.filter(p => p.category === category);
        if (sale !== undefined) prods = prods.filter(p => p.onSale === sale);

        return prods;
      })
    );
  }


}
