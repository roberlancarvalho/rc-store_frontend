import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './../../../model/product';
import { ProductsService } from './../../../services/products.service';


@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css'],
})
export class UpdateProductsComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    image: '',
    category_id: '',
    price: 0,
    stock: 0,
    status: true,
  };

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = String(this.activatedRouter.snapshot.paramMap.get('id'));
    console.log(id);
    this.productsService.findById(id).subscribe(returns => {
      console.log('Olá');
      this.product = returns;
    });
  }

  saveProduct(): void {
    this.productsService.updateProduct(this.product).subscribe(returns => {
      this.product = returns;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi atualizado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
    });
  }
}
