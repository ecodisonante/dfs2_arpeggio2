import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

/**
 * @description
 * 
 */
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export default class CatalogoComponent implements OnInit {

  catalogo: Product[] = [];
  category: any;
  sale: any;


  constructor(private route: ActivatedRoute, private router: Router, private catalogService: ProductService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.sale = params['sale'];
      this.productFilter(this.sale, this.category);
    });

  }

  productFilter(sale?: boolean, category?: number) {
    this.catalogo = this.catalogService.filterProducts(sale, category);
  }

  addToChart(id: number) {
    //TODO
  }

}

