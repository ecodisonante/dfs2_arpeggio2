import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

/**
 * @description
 * Componente encargado de manejar los productos en la pantalla principal.
 */
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  catalogo: Product[] = [];
  category: any;
  sale: any;
  isAdmin!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.isAdminAuth.subscribe((adminStatus: boolean) => { this.isAdmin = adminStatus; });

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.sale = params['sale'];
      this.productFilter(this.sale, this.category);
    });
  }

  /**
   * @description
   * Obtiene los productos que se mostraran en la pantalla principal.
   * 
   * @param sale [boolean] Indicador de ofertas. 
   * @param category [number] Indicador de categoría
   */
  productFilter(sale?: boolean, category?: number) {
    this.catalogo = this.productService.filterProducts(sale, category);
  }

  /**
   * @description
   * Agrega un producto al carro de compras activo
   * 
   * @param id identificador del producto que se va a agregar 
   */
  addToCart(id: number) {
    let prod = this.catalogo.find(x => x.id === id);
    this.cartService.addToActiveCart(prod!);

    Swal.fire({
      icon: "success",
      title: "Producto Agregado",
      showCancelButton: true,
      confirmButtonText: "Ver mi carrito",
      cancelButtonText: "Seguir comprando"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cart']);
      } else {
        return;
      }
    });
  }

}

