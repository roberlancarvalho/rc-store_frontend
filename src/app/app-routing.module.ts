import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ProductComponent } from './components/products/product/product.component';
import { RegisterProductsComponent } from './components/products/register-products/register-products.component';
import { UpdateProductsComponent } from './components/products/update-products/update-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListProductsComponent },
  { path: 'products/register', component: RegisterProductsComponent },
  { path: 'products/edit/:id', component: UpdateProductsComponent },
  { path: 'products/product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
