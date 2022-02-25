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

  listProducts: Product[] = [
    {
      id: '',
      name: '',
      image: '',
      description: '',
      category_id: '',
      price: 0,
      stock: 0,
      status: true,
    },
  ];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productsService.findById(id).subscribe(product => {
      this.product = product;
    });

    this.loadingProductList();
  }

  loadingProductList(): void {
    this.productsService.findAll().subscribe((back) => {
      this.listProducts = back;
    });
  }

  saveProduct(): void {
    this.productsService.edit(this.product).subscribe((back) => {
      this.product = back;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi atualizado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
      this.loadingProductList();
    });
  }
}
