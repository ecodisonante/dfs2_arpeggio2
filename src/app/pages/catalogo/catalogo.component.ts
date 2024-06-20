import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestingData } from '../../models/testing-data';

/**
 * @description
 * 
 */
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export default class CatalogoComponent implements OnInit {

  catalogo: Product[] = [];
  category: any;
  sale: any;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.sale = params['sale'];
      this.productFilter();
    });

  }


  productFilter() {
    if (this.sale != undefined)
      this.catalogo = TestingData.productList.filter(x => x.onSale);
    else
      this.catalogo = TestingData.productList;


    if (this.category) {
      this.catalogo = this.catalogo.filter(x => x.category.id == this.category);
    }

  }

  addToChart(id: number) {
    //TODO
  }

}

