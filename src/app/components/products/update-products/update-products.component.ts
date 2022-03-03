import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  fileName = '';

  listProducts: Array<Product> = [];

  product: Product = {
    name: '',
    description: '',
    image: '',
    price: 0,
    stock: 0,
    status: true,
  };

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
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

    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productsService.findById(id).subscribe((product) => {
      this.product = product;
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
    this.productsService.updateProduct(this.product).subscribe((back) => {
      this.product = back;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi atualizado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
      this.load();
      this.loadingProductList();
    });
  }
}
