import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './../../../model/product';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    image: '',
    category: {
      id: '',
      name: '',
      description: '',
    },
    category_id: '',
    price: 0,
    stock: 0,
    status: true,
  };

  listProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}


  imageUrl: string = 'uploads/'

  goToBack() {
    this._location.back();
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productsService.findById(id).subscribe((product) => {
      this.product = product;
    });

    this.loadingProductList();
  }

  load() {
    location.reload();
  }

  loadingProductList(): void {
    this.productsService.findAll().subscribe((back) => {
      this.listProducts = back;
    });
  }

  saveProduct(): void {
    this.productsService.updateProduct(this.product).subscribe((back) => {
      this.product = back;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi atualizado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
      this.loadingProductList();
      this.load();
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
    });
  }
}
