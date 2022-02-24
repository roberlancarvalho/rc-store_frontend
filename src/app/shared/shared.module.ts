import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './components/card-product/card-product.component';

@NgModule({
  declarations: [CardProductComponent],
  imports: [CommonModule],
  exports: [CardProductComponent],
})
export class SharedModule {}
