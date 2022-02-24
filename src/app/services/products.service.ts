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

  listAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      map((returns) => returns),
      catchError((error) => this.displayError(error))
    );
  }

  findById(id: string): Observable<Product> {
    console.log("findById " + typeof id)
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(
      map((returns) => returns),
      catchError((error) => this.displayError(error))
    );
  }

  registerProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product).pipe(
      map((returns) => returns),
      catchError((error) => this.displayError(error))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    console.log("É isso aqui: " + product.id)
    return this.http.put<Product>(`${this.URL}/${product.id}`, product).pipe(
      map((returns) => returns),
      catchError((error) => this.displayError(error))
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(
      map((returns) => returns),
      catchError((error) => this.displayError(error))
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
