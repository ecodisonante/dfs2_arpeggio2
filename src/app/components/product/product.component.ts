import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { TestingData } from '../../models/testing-data';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export  class ProductComponent {

  title: string = "";
  product?: Product;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) this.router.navigate(['/']);
      if (isNaN(Number(id))) this.router.navigate(['/']);

      this.product = TestingData.productList.find(c => c.id === Number(id));
      if (!this.product) this.router.navigate(['/']);

      this.title = this.product!.name;
    });
  }
}
