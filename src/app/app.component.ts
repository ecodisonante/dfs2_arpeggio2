import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ProductService } from './services/product.service';
import { TestingData } from './models/testing-data';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';

/**
 * Componente principal
 */
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent]
})
export class AppComponent {
  /**
   * Titulo de la pagina
   */
  title = 'arpeggio2';

  /**
   * constructor
   */
  constructor(
    /**
     * Servicio de Productos
     */
    private productService: ProductService,
    /**
     * Servicio de Usuarios
     */
    private userService: UserService,
    /**
     * Servicio de Carrito de Compras
     */
    private cartService: CartService
  ) { }

  /**
  * ngOnInit
  */
  ngOnInit(): void { }
}
