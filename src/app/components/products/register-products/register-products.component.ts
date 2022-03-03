import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

import { Product } from './../../../model/product';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css'],
})
export class RegisterProductsComponent implements OnInit {
  productItem: any;

  listProducts: Array<Product> = [];

  fileName = '';

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

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private _location: Location,
    private http: HttpClient
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http.post('http://localhost:3000/uploads', formData);

      upload$.subscribe();
    }
  }

  ngOnInit(): void {
    this.loadingProductList();
  }

  exemple() {
    this.listProducts.map((item) => {
      this.productItem = item;
    });
  }

  load() {
    location.reload();
  }

  goToBack() {
    this._location.back();
  }

  loadingProductList(): void {
    this.productsService.findAll().subscribe((back) => {
      this.listProducts = back;
    });
  }

  saveProduct(): void {
    this.productsService.registerProduct(this.product).subscribe((back) => {
      this.product = back;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi cadastrado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
      this.load();
      this.loadingProductList();
    });
  }
}
