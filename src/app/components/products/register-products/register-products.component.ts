import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css'],
})
export class RegisterProductsComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveProduct(): void {
    this.productsService.registerProduct(this.product).subscribe(returns => {
      this.product = returns;
      this.productsService.showMessage(
        'SISTEMA',
        `${this.product.name} foi cadastrado com sucesso. ID: ${this.product.id}`,
        'toast-success'
      );
      this.router.navigate(['/products']);
    });
  }
}
