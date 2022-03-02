import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listProducts: Array<Product> = [];

  id: string = '';
  name: string = '';
  description: string = '';
  stock: number = 0;
  price: number = 0;
  status: boolean = true;
  image: string = '';

  constructor(private productsService: ProductsService) {
    console.log('ID', this.id);
    console.log('Produto', this.name);
    console.log('Descrição', this.description);
    console.log('Estoque', this.stock);
    console.log('Preço', this.price);
    console.log('Status', this.status);
  }

  ngOnInit(): void {
    this.loadingProductList();
  }

  loadingProductList(): void {
    this.productsService.findAll().subscribe((back) => {
      this.listProducts = back;
    });
  }
}
