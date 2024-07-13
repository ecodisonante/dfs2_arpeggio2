import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, of } from 'rxjs';

/**
 * Clase de servicios relacionados a Producto
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   * URL de almacenamiento de productos
   */
  private productUrl: string = 'https://firebasestorage.googleapis.com/v0/b/dfs2-1f652.appspot.com/o/arpeggio%2Fproduct.json?alt=media&token=3aaf6e9c-996e-4022-a780-29ccfe9ab44c';

  /**
   * Cabecera para acceder al almacenamiento de productos
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3aaf6e9c-996e-4022-a780-29ccfe9ab44c'
    })
  }

  /**
   * Constructor de la clase
   */
  constructor(private http: HttpClient) { }


  /**
   * Obtiene el cataolgo completo de productos
   * @returns `Observable` lista completa de `Product`
   */
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  /**
   * Obtiene un producto a través de su ID
   * @param id ID del producto solicitado
   * @returns `Observable` del `Product` buscado o `undefined` si no se encuentra
   */
  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      map((prods: Product[]) => {
        return prods.find(p => p.id === id);
      })
    );
  }

  /**
   * Actualiza un producto en el catalogo de productos
   * @param prod Producto a actualizar
   * @returns Observable<boolean> indica si la operacion se realizó con exito
   */
  updateProduct(prod: Product): Observable<boolean> {
    const result = new Subject<boolean>();

    this.getProductList().subscribe({
      next: (products) => {
        // actualiza producto
        let index = products.findIndex(x => x.id === prod.id);
        products[index] = prod;

        this.http.post(this.productUrl, products, this.httpOptions).pipe(
          map(() => {
            result.next(true);
            result.complete();
          }),
          catchError((error) => {
            result.error(false);
            return of(false);
          })
        ).subscribe();
      },
      error: (err) => {
        result.error(false);
      }
    });

    return result.asObservable();
  }


  /**
  * Obtiene un listado de productos según los filtros especificados
  * @param sale [boolean] Indicador de ofertas. 
  * - Si es _true_ mostrará solo ofertas. 
  * - Si es _false_ mostrará solo productos que no estén en oferta
  * - Si no se envía el parámetro, no se aplica filtro de ofertas.
  * @param category [number] Indicador de categoría
  * - Si es numero se mostrarán solo los productos de la categoría con el id indicado
  * - Si no se envía el parámetro, no se aplica filtro de categoría.
  * @returns `Observable` lista de `Product` filtrados
  */
  filterProducts(sale?: boolean, category?: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
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
