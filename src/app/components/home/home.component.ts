import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id: string = '2';
  name: string = 'Calça jeans';
  description: string = 'Calça jean masculina';
  category_id: string = 'Calças';
  stock: number = 0;
  price: number = 189.9;
  status: boolean = false;
  image: string = 'assets/img/banner.png';

  constructor() {
    console.log('ID', this.id);
    console.log('Produto', this.name);
    console.log('Descrição', this.description);
    console.log('Categoria', this.category_id);
    console.log('Estoque', this.stock);
    console.log('Preço', this.price);
    console.log('Status', this.status);
  }

  ngOnInit(): void {}
}
