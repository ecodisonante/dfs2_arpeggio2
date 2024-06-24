import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

/**
 * @description
 * Clase de servicios relacionados a Carrito de Compras
 */
@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartKey = 'cartKey';
    private cartListKey = 'cartListKey';

    // ---  Carrito actual --- //

    /**
     * @description
     * Obtener el carrito de compras actual del almacenamiento _sessionStorage_
     */
    getActiveCart(): Cart | null {
        let cartList = sessionStorage.getItem(this.cartKey);
        return cartList ? JSON.parse(cartList) : null;
    }

    /**
     * @description
     * Actualiza el carrito actual en el almacenamiento _sessionStorage_
     * 
     * @param cart Carrito a guardar
     */
    setActiveCart(cart: Cart) {
        sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
    }

    /**
     * @description
     * Elimina el carrito de compras del almacenamiento _sessionStorage_
     */
    clearActiveCart() {
        sessionStorage.removeItem(this.cartKey);
    }

    // Agrega prod al carrito

    /**
     * @description
     * - Agrega un producto al carrito actual
     * - Actualiza el calculo de total y descuento
     * - Actualiza el carrito del almacenamiento _sessionStorage_
     * 
     * @param product Producto a agregar
     */
    addToActiveCart(product: Product) {
        let cart = this.getActiveCart();
        if (cart) {
            cart.items.push(product);
            cart = this.getTotals(cart);
            this.setActiveCart(cart);
        }
    }

    /**
     * @description
     * - Elimina un producto del carrito actual
     * - Actualiza el calculo de total y descuento
     * - Actualiza el carrito del almacenamiento _sessionStorage_
     * 
     * @param product Producto a agregar
     */
    removeFromActiveCart(productId: number) {
        let cart = this.getActiveCart();
        if (cart) {
            cart.items = cart.items.filter(x => x.id !== productId);
            cart = this.getTotals(cart);
            this.setActiveCart(cart);
        }
    }


    /**
     * @description
     * Actualiza el valor de los atributos `total` y `discount` en el carrito, sumando los precios de cada item contenido.
     * 
     * @param cart Carrito a actualizar
     * @returns El carrito actualizado
     */
    getTotals(cart: Cart): Cart {
        cart.total = 0;
        cart.discount = 0;

        cart.items.forEach(prod => {
            cart.total += prod.onSale ? prod.salePrice : prod.price;
            cart.discount += prod.onSale ? (prod.price - prod.salePrice) : 0;
        });

        return cart;
    }


    // ---  repositorio --- //

    /**
     * @description
     * Obtiene el carrito de compras del usuario activo
     * 
     * @param username usuario activo
     */
    findUserCart(username: string): Cart | undefined {
        return this.getCartList()?.find(x => x.username === username);
    }

    /**
     * @description
     * Obtiene la lista de todos los carritos de compra almacenados en _localStorage_
     */
    getCartList(): Cart[] | null {
        let cartList = localStorage.getItem(this.cartListKey);
        return cartList ? JSON.parse(cartList) : null;
    }

    /**
     * @description
     * Almacena la lista de todos los carritos de compra almacenados en _localStorage_
     * 
     * @param carts lista de carritos de compra
     */
    setCartList(carts: Cart[]) {
        localStorage.setItem(this.cartListKey, JSON.stringify(carts));
    }


}
