import { Product } from 'src/app/model/product';
import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [
    {
      name: '',
      image: '',
      description: '',
      category_id: '',
      price: 0,
      stock: 0,
      status: true,
    },
  ];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadingProductList();
  }

  loadingProductList(): void {
    this.productsService.listAll().subscribe((back) => {
      this.listProducts = back;
    });
  }

  delete(product: Product): void {
    console.log('Deletando');
    this.productsService.deleteProduct(product.id!).subscribe(() => {
      this.productsService.showMessage(
        'SISTEMA',
        `${product.name} foi excluido com sucesso`,
        'toast-error'
      );
      this.loadingProductList();
    });
  }
}
