import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent implements OnInit {
  @Input() image?: string;
  @Input() name?: string;
  @Input() description?: string;
  @Input() category?: string;
  @Input() price?: number;
  @Input() stock?: string;
  @Input() status?: boolean;
  @Input() id?: string;

  constructor() {}

  ngOnInit(): void {}
}
