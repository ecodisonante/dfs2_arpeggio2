import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { TestingData } from '../../models/testing-data';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

/**
 * @description
 * Componente encargado de los detalles de un producto.
 */
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  /**
   * Formulario de edicion de producto
   */
  productForm!: FormGroup;
  /**
   * Título del componente
   */
  title: string = "";
  /**
   * Producto en edicion
   */
  product!: Product;
  
  /**
   * constructor
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService
  ) {
    if (!this.userService.checkAdmin()) this.router.navigate(['/']);

    this.productForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: [0, [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      onSale: [false],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      available: [true],
    });
  }

   /**
   * ngOnInit
   */
  ngOnInit():  void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) this.router.navigate(['/']);
      if (isNaN(Number(id))) this.router.navigate(['/']);

      this.product = this.productService.getProduct(Number(id))!;
      if (!this.product) this.router.navigate(['/']);

      this.title = this.product!.name;
    });

    this.productForm.patchValue(this.product!);
  }

  /**
   * @description
   * Persiste la modificacion de datos realizada a un producto.
   */
  edit() {
    if (this.productForm.valid) {
      let edited = this.productForm.value;
      edited.image = this.product.image;
      this.productService.updateProduct(edited);

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
      }).then(() => {
        this.router.navigate(['']);
      });
    }
  }

}
