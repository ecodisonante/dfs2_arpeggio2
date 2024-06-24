import { CommonModule, formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * @description
 * Componente encargado de manejar el carrito de compras.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  /**
   * Carrito de compras
   */
  cart!: Cart;
  /**
   * Usuario registrado
   */
  user?: User;
  
  /**
   * constructor
   */
  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService
  ) { }

   /**
   * ngOnInit
   */
  ngOnInit():  void {
    this.user = this.userService.getUser() ?? undefined;
    if (!this.user) this.router.navigate(['/user/login']);
    if (this.user?.isAdmin) this.router.navigate(['/']);

    this.getActiveCart();
  }

  /**
   * @description
   * Obtiene el carrito de compras del usuario activo.
   */
  getActiveCart() {
    this.cart = this.cartService.getActiveCart() ?? new Cart(this.user!.username, [], 0, 0);
  }

  /**
   * @description
   * Elimina un producto del carrito de compras del usuario activo.
   */
  removeFromChart(id: number) {
    this.cartService.removeFromActiveCart(id);
    this.getActiveCart();
  }

  /**
   * @description
   * Elimina todos los productos del carrito de compras del usuario activo.
   */
  clearChart() {
    this.cart = new Cart(this.user!.username, [], 0, 0);
    this.cartService.setActiveCart(this.cart);
  }

  /**
   * @description
   * Procesa el pago de los productos que se encuentran en el carrito de compras del usuario activo.
   */
  pagar() {
    //TODO
    Swal.fire({
      icon: "success",
      title: "Tu compra se ha realizado.",
      text: "Recibirás un correo de confirmación indicando la fecha en que tu compra será despachada.",
      footer: "(mentira XD)"
    }).then(() => {
      this.clearChart();
      this.router.navigate(['/']);
    });

  }
}
