import { Product } from 'src/app/model/product';
import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {

  productExemple: any;

  listProducts: Array<Product> = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadingProductList();
  }

  exemple() {
    this.listProducts.map((item) => {
      this.productExemple = item;
    });
  }

  load() {
    location.reload();
  }

  loadingProductList(): void {
    this.productsService.findAll().subscribe((back) => {
      this.listProducts = back;
      this.exemple();
    });
  }

  delete(product: Product): void {
    console.log('Deletando');
    this.productsService.deleteProduct(product.id!).subscribe(() => {
      this.productsService.showMessage(
        'RC Store',
        `${product.name} foi excluido com sucesso`,
        'toast-warning'
      );
      this.loadingProductList();
      this.load();
    });
  }
}
