import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      map(back => back),
      catchError(err => this.displayError(err))
    );
  }

  findById(id: string): Observable<Product> {
    console.log('findById ' + typeof id);
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(
      map(back => back),
      catchError(err => this.displayError(err))
    );
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product).pipe(
      map(back => back),
      catchError(err => this.displayError(err))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/${product.id}`, product).pipe(
      map(back => back),
      catchError(err => this.displayError(err))
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(
      map(back => back),
      catchError(err => this.displayError(err))
    );
  }

  displayError(e: any): Observable<any> {
    this.showMessage(
      'Erro',
      'Não foi possível realizar a opreção',
      'toast-error'
    );
    return EMPTY;
  }

  showMessage(title: string, message: string, type: string): void {
    this.toastr.show(
      title,
      message,
      { closeButton: true, progressBar: true },
      type
    );
  }
}
