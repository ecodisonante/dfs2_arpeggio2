import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ProductService } from './services/product.service';
import { TestingData } from './models/testing-data';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent]
})
export class AppComponent {
  title = 'arpeggio5';

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (!this.productService.getCatalog()) this.productService.setCatalog(TestingData.productList);
    if (!this.userService.getUserList()) this.userService.setUserList(TestingData.userList);
    if (!this.cartService.getCartList()) this.cartService.setCartList([]);
  }
}
