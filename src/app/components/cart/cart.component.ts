import { CommonModule, formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart!: Cart;
  user?: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser() ?? undefined;
    if (!this.user) this.router.navigate(['/user/login']);
    if (this.user?.isAdmin) this.router.navigate(['/']);

    this.getActiveCart();
  }

  getActiveCart() {
    this.cart = this.cartService.getActiveCart() ?? new Cart(this.user!.username, [], 0, 0);
  }


  removeFromChart(id: number) {
    this.cartService.removeFromActiveCart(id);
    this.getActiveCart();

  }

  clearChart() {
    this.cart = new Cart(this.user!.username, [], 0, 0);
    this.cartService.setActiveCart(this.cart);
  }

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
